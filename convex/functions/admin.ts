import { v } from "convex/values";
import {
  adminQuery,
  moduleMutation,
  moduleQuery,
  systemAdminMutation,
} from "../lib/customFunctions";
import { adminModuleValidator, pagePermissionValidator } from "../lib/adminPermissions";
import { error, ErrorCode } from "../lib/errors";
import { getUserRole } from "../lib/auth";
import { logAudit } from "../lib/audit";

/**
 * List users (requires `users` module).
 */
export const listUsers = moduleQuery("users")({
  args: {},
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();
    return users
      .map((user) => ({
        ...user,
        role: getUserRole(user),
        allowedModules: user.allowedModules ?? [],
      }))
      .sort((a, b) => a.email.localeCompare(b.email));
  },
});

/**
 * Get one user (requires `users` module).
 */
export const getUser = moduleQuery("users")({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    if (!user) return null;
    return {
      ...user,
      role: getUserRole(user),
      allowedModules: user.allowedModules ?? [],
    };
  },
});

/**
 * System-admin: update a user's poste (position title).
 */
export const updateUserPoste = systemAdminMutation({
  args: {
    userId: v.id("users"),
    poste: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const target = await ctx.db.get(args.userId);
    if (!target) throw error(ErrorCode.USER_NOT_FOUND);

    await ctx.db.patch(args.userId, {
      poste: args.poste?.trim() || undefined,
      updatedAt: Date.now(),
    });

    await logAudit(ctx, {
      userId: ctx.user._id,
      userName: ctx.user.name,
      action: "update_user_poste",
      targetType: "user",
      targetId: args.userId,
      details: { email: target.email, poste: args.poste },
    });

    return true;
  },
});

/**
 * Get audit logs for one user.
 */
export const getUserAuditLogs = moduleQuery("audit")({
  args: {
    userId: v.id("users"),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = Math.max(1, Math.min(args.limit ?? 20, 200));
    return await ctx.db
      .query("auditLog")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .order("desc")
      .take(limit);
  },
});

/**
 * Global audit logs.
 */
export const getAuditLogs = moduleQuery("audit")({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = Math.max(1, Math.min(args.limit ?? 100, 500));
    return await ctx.db.query("auditLog").withIndex("by_timestamp").order("desc").take(limit);
  },
});

/**
 * Dashboard stats for admin.
 */
export const getStats = adminQuery({
  args: {},
  handler: async (ctx) => {
    const [users, services, posts, announcements] = await Promise.all([
      ctx.db.query("users").collect(),
      ctx.db
        .query("services")
        .filter((q) => q.eq(q.field("isActive"), true))
        .collect(),
      ctx.db
        .query("posts")
        .filter((q) => q.eq(q.field("status"), "published"))
        .collect(),
      ctx.db
        .query("announcements")
        .filter((q) => q.eq(q.field("isActive"), true))
        .collect(),
    ]);

    const role = getUserRole(ctx.user);
    const canSeeAnalytics =
      role === "system_admin" || ctx.user.allowedModules?.includes("analytics");
    const pageViewRows = canSeeAnalytics ? await ctx.db.query("pageViews").collect() : [];
    const totalPageViews = pageViewRows.reduce((acc, row) => acc + row.viewCount, 0);
    const topPages = [...pageViewRows].sort((a, b) => b.viewCount - a.viewCount).slice(0, 5);

    return {
      users: { total: users.length },
      services: { active: services.length },
      posts: { published: posts.length },
      announcements: { active: announcements.length },
      pageViews: {
        total: totalPageViews,
        topPages,
      },
    };
  },
});

/**
 * System-admin only: update user role.
 * Role `system_admin` is reserved and cannot be granted here.
 */
export const updateUserRole = systemAdminMutation({
  args: {
    userId: v.id("users"),
    role: v.union(v.literal("user"), v.literal("admin")),
    allowedModules: v.optional(v.array(adminModuleValidator)),
  },
  handler: async (ctx, args) => {
    if (ctx.user._id === args.userId) {
      // system admin cannot remove their own elevated privileges from this endpoint
      throw error(ErrorCode.CANNOT_REMOVE_SELF);
    }

    const target = await ctx.db.get(args.userId);
    if (!target) throw error(ErrorCode.USER_NOT_FOUND);
    if (getUserRole(target) === "system_admin") {
      throw error(ErrorCode.INSUFFICIENT_PERMISSIONS, "System admin role cannot be edited here.");
    }

    await ctx.db.patch(args.userId, {
      role: args.role,
      allowedModules: args.role === "admin" ? args.allowedModules ?? [] : undefined,
      updatedAt: Date.now(),
    });

    await logAudit(ctx, {
      userId: ctx.user._id,
      userName: ctx.user.name,
      action: "update_user_role",
      targetType: "user",
      targetId: args.userId,
      details: {
        role: args.role,
        allowedModules: args.allowedModules ?? [],
      },
    });

    return true;
  },
});

/**
 * Disable user (requires `users` module).
 */
export const disableUser = moduleMutation("users")({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    if (ctx.user._id === args.userId) {
      throw error(ErrorCode.CANNOT_REMOVE_SELF);
    }

    const target = await ctx.db.get(args.userId);
    if (!target) throw error(ErrorCode.USER_NOT_FOUND);
    if (getUserRole(target) === "system_admin") {
      throw error(ErrorCode.INSUFFICIENT_PERMISSIONS, "Cannot disable system admin.");
    }

    await ctx.db.patch(args.userId, { isActive: false, updatedAt: Date.now() });

    await logAudit(ctx, {
      userId: ctx.user._id,
      userName: ctx.user.name,
      action: "disable_user",
      targetType: "user",
      targetId: args.userId,
      details: { email: target.email },
    });
  },
});

/**
 * Enable user (requires `users` module).
 */
export const enableUser = moduleMutation("users")({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const target = await ctx.db.get(args.userId);
    if (!target) throw error(ErrorCode.USER_NOT_FOUND);

    await ctx.db.patch(args.userId, { isActive: true, updatedAt: Date.now() });

    await logAudit(ctx, {
      userId: ctx.user._id,
      userName: ctx.user.name,
      action: "enable_user",
      targetType: "user",
      targetId: args.userId,
      details: { email: target.email },
    });
  },
});

/**
 * Delete user permanently (requires `users` module).
 */
export const deleteUser = moduleMutation("users")({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    if (ctx.user._id === args.userId) {
      throw error(ErrorCode.CANNOT_REMOVE_SELF);
    }

    const target = await ctx.db.get(args.userId);
    if (!target) throw error(ErrorCode.USER_NOT_FOUND);
    if (getUserRole(target) === "system_admin") {
      throw error(ErrorCode.INSUFFICIENT_PERMISSIONS, "Cannot delete system admin.");
    }

    await ctx.db.delete(args.userId);

    await logAudit(ctx, {
      userId: ctx.user._id,
      userName: ctx.user.name,
      action: "delete_user",
      targetType: "user",
      targetId: args.userId,
      details: { email: target.email, name: target.name },
    });
  },
});

// ── Create user (system_admin only) ──────────────────────────────────────────

/**
 * System-admin: create a managed user (placeholder until Clerk login).
 */
export const createManagedUser = systemAdminMutation({
  args: {
    email: v.string(),
    name: v.string(),
    role: v.union(v.literal("user"), v.literal("admin")),
    poste: v.optional(v.string()),
    allowedModules: v.optional(v.array(adminModuleValidator)),
    pagePermissions: v.optional(v.array(pagePermissionValidator)),
  },
  handler: async (ctx, args) => {
    const email = args.email.trim().toLowerCase();

    // Check for existing user
    const existing = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", email))
      .unique();
    if (existing) {
      throw error(ErrorCode.PROFILE_ALREADY_EXISTS, `Un utilisateur avec l'email ${email} existe déjà.`);
    }

    const userId = await ctx.db.insert("users", {
      externalId: `managed_${email}`,
      email,
      name: args.name.trim(),
      isActive: true,
      role: args.role,
      poste: args.poste?.trim() || undefined,
      allowedModules: args.role === "admin" ? args.allowedModules ?? [] : undefined,
      pagePermissions: args.role === "admin" ? args.pagePermissions : undefined,
      updatedAt: Date.now(),
    });

    await logAudit(ctx, {
      userId: ctx.user._id,
      userName: ctx.user.name,
      action: "create_managed_user",
      targetType: "user",
      targetId: userId,
      details: { email, name: args.name, role: args.role },
    });

    return userId;
  },
});

// ── Update page permissions (system_admin only) ──────────────────────────────

/**
 * System-admin: update granular page permissions for a user.
 */
export const updateUserPagePermissions = systemAdminMutation({
  args: {
    userId: v.id("users"),
    pagePermissions: v.array(pagePermissionValidator),
  },
  handler: async (ctx, args) => {
    const target = await ctx.db.get(args.userId);
    if (!target) throw error(ErrorCode.USER_NOT_FOUND);
    if (getUserRole(target) === "system_admin") {
      throw error(
        ErrorCode.INSUFFICIENT_PERMISSIONS,
        "Les permissions du system admin ne peuvent pas être modifiées.",
      );
    }

    await ctx.db.patch(args.userId, {
      pagePermissions: args.pagePermissions,
      updatedAt: Date.now(),
    });

    await logAudit(ctx, {
      userId: ctx.user._id,
      userName: ctx.user.name,
      action: "update_user_page_permissions",
      targetType: "user",
      targetId: args.userId,
      details: {
        email: target.email,
        pagePermissions: args.pagePermissions,
      },
    });

    return true;
  },
});
