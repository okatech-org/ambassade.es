import { v } from "convex/values";
import { systemAdminMutation, systemAdminQuery, adminQuery } from "../lib/customFunctions";
import {
  adminModuleValidator,
  ALL_ADMIN_MODULES,
  type AdminModule,
} from "../lib/adminPermissions";
import { error, ErrorCode } from "../lib/errors";
import { logAudit } from "../lib/audit";
import { getUserRole } from "../lib/auth";

function uniqueModules(modules: AdminModule[]) {
  return Array.from(new Set(modules));
}

/**
 * System admin: list all admin and system admin users.
 */
export const listAdmins = systemAdminQuery({
  args: {},
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();
    return users
      .filter((user) => {
        const role = getUserRole(user);
        return role === "admin" || role === "system_admin";
      })
      .sort((a, b) => a.email.localeCompare(b.email));
  },
});

/**
 * System admin: promote a user as admin and set allowed modules.
 */
export const createAdmin = systemAdminMutation({
  args: {
    userId: v.id("users"),
    allowedModules: v.array(adminModuleValidator),
  },
  handler: async (ctx, args) => {
    const target = await ctx.db.get(args.userId);
    if (!target) throw error(ErrorCode.USER_NOT_FOUND);

    const targetRole = getUserRole(target);
    if (targetRole === "system_admin") {
      throw error(ErrorCode.INSUFFICIENT_PERMISSIONS, "Cannot modify system admin role.");
    }

    const modules = uniqueModules(args.allowedModules);
    await ctx.db.patch(args.userId, {
      role: "admin",
      allowedModules: modules,
      updatedAt: Date.now(),
    });

    await logAudit(ctx, {
      userId: ctx.user._id,
      userName: ctx.user.name,
      action: "create_admin",
      targetType: "user",
      targetId: args.userId,
      details: {
        email: target.email,
        allowedModules: modules,
      },
    });

    return await ctx.db.get(args.userId);
  },
});

/**
 * System admin: update modules granted to an admin.
 */
export const updateAdminModules = systemAdminMutation({
  args: {
    userId: v.id("users"),
    allowedModules: v.array(adminModuleValidator),
  },
  handler: async (ctx, args) => {
    const target = await ctx.db.get(args.userId);
    if (!target) throw error(ErrorCode.USER_NOT_FOUND);

    const targetRole = getUserRole(target);
    if (targetRole !== "admin") {
      throw error(
        ErrorCode.INSUFFICIENT_PERMISSIONS,
        "Only admin users can receive module updates.",
      );
    }

    const modules = uniqueModules(args.allowedModules);
    await ctx.db.patch(args.userId, {
      allowedModules: modules,
      updatedAt: Date.now(),
    });

    await logAudit(ctx, {
      userId: ctx.user._id,
      userName: ctx.user.name,
      action: "update_admin_modules",
      targetType: "user",
      targetId: args.userId,
      details: {
        email: target.email,
        allowedModules: modules,
      },
    });

    return await ctx.db.get(args.userId);
  },
});

/**
 * System admin: revoke admin privileges.
 */
export const revokeAdmin = systemAdminMutation({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    if (ctx.user._id === args.userId) {
      throw error(ErrorCode.CANNOT_REMOVE_SELF);
    }

    const target = await ctx.db.get(args.userId);
    if (!target) throw error(ErrorCode.USER_NOT_FOUND);

    const targetRole = getUserRole(target);
    if (targetRole === "system_admin") {
      throw error(ErrorCode.INSUFFICIENT_PERMISSIONS, "Cannot revoke a system admin.");
    }

    await ctx.db.patch(args.userId, {
      role: "user",
      allowedModules: undefined,
      updatedAt: Date.now(),
    });

    await logAudit(ctx, {
      userId: ctx.user._id,
      userName: ctx.user.name,
      action: "revoke_admin",
      targetType: "user",
      targetId: args.userId,
      details: {
        email: target.email,
      },
    });

    return true;
  },
});

/**
 * Current admin permissions.
 */
export const getMyPermissions = adminQuery({
  args: {},
  handler: async (ctx) => {
    const role = getUserRole(ctx.user);
    const modules = role === "system_admin" ? ALL_ADMIN_MODULES : (ctx.user.allowedModules ?? []);
    return {
      role,
      allowedModules: modules,
      isSystemAdmin: role === "system_admin",
      isAdmin: role === "admin" || role === "system_admin",
    };
  },
});
