import { v } from "convex/values";
import { query, mutation, internalMutation } from "../_generated/server";
import { authQuery, authMutation } from "../lib/customFunctions";
import { ALL_ADMIN_MODULES } from "../lib/adminPermissions";
import { getUserRole } from "../lib/auth";

const SYSTEM_ADMIN_EMAIL = "admin@okatech.fr";

function isSystemAdminEmail(email: string): boolean {
  return email.trim().toLowerCase() === SYSTEM_ADMIN_EMAIL;
}


/**
 * Get current authenticated user
 */
export const getMe = authQuery({
  args: {},
  handler: async (ctx) => {
    const role = getUserRole(ctx.user);
    return {
      ...ctx.user,
      role,
      allowedModules:
        role === "system_admin"
          ? ALL_ADMIN_MODULES
          : (ctx.user.allowedModules ?? []),
    };
  },
});

/**
 * Get user by ID
 */
export const getById = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.userId);
  },
});

/**
 * Get user by external ID
 */
export const getByClerkId = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_externalId", (q) => q.eq("externalId", args.clerkId))
      .unique();
  },
});

/**
 * Search users by name
 */
export const search = authQuery({
  args: {
    query: v.string(),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const searchQuery = args.query.toLowerCase().trim();
    const limit = args.limit ?? 10;

    if (!searchQuery || searchQuery.length < 2) {
      return [];
    }

    // Use search index
    const results = await ctx.db
      .query("users")
      .withSearchIndex("search_name", (q) => q.search("name", searchQuery))
      .take(limit);

    return results.map((user) => ({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatarUrl: user.avatarUrl,
    }));
  },
});

/**
 * Update current user profile
 */
export const updateMe = authMutation({
  args: {
    name: v.optional(v.string()),
    avatarUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const updates: Record<string, unknown> = {
      updatedAt: Date.now(),
    };

    if (args.name !== undefined) updates.name = args.name;
    if (args.avatarUrl !== undefined) updates.avatarUrl = args.avatarUrl;

    await ctx.db.patch(ctx.user._id, updates);
    return ctx.user._id;
  },
});

/**
 * Internal mutation to sync user from Clerk webhook
 */
export const syncFromClerk = internalMutation({
  args: {
    externalId: v.string(),
    email: v.string(),
    name: v.string(),
    avatarUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("by_externalId", (q) => q.eq("externalId", args.externalId))
      .unique();

    if (existing) {
      const shouldBeSystemAdmin = isSystemAdminEmail(args.email);
      await ctx.db.patch(existing._id, {
        email: args.email,
        name: args.name,
        avatarUrl: args.avatarUrl,
        role: shouldBeSystemAdmin ? "system_admin" : existing.role ?? "user",
        allowedModules: shouldBeSystemAdmin
          ? ALL_ADMIN_MODULES
          : existing.allowedModules,
        updatedAt: Date.now(),
      });
      return existing._id;
    }

    // Attempt to link by email (for invited users)
    const existingByEmail = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .unique();

    if (existingByEmail) {
      const shouldBeSystemAdmin = isSystemAdminEmail(args.email);
      // Update the placeholder user with real externalId
      await ctx.db.patch(existingByEmail._id, {
        externalId: args.externalId,
        name: args.name,
        avatarUrl: args.avatarUrl,
        role: shouldBeSystemAdmin ? "system_admin" : existingByEmail.role ?? "user",
        allowedModules: shouldBeSystemAdmin
          ? ALL_ADMIN_MODULES
          : existingByEmail.allowedModules,
        updatedAt: Date.now(),
      });
      return existingByEmail._id;
    }

    const shouldBeSystemAdmin = isSystemAdminEmail(args.email);
    return await ctx.db.insert("users", {
      externalId: args.externalId,
      email: args.email,
      name: args.name,
      avatarUrl: args.avatarUrl,
      isActive: true,
      role: shouldBeSystemAdmin ? "system_admin" : "user",
      allowedModules: shouldBeSystemAdmin ? ALL_ADMIN_MODULES : undefined,
      updatedAt: Date.now(),
    });
  },
});

/**
 * Ensure user exists (upsert from client)
 */
export const ensureUser = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const email = identity.email ?? "";
    const shouldBeSystemAdmin = isSystemAdminEmail(email);

    const existing = await ctx.db
      .query("users")
      .withIndex("by_externalId", (q) => q.eq("externalId", identity.subject))
      .unique();

    if (existing) {
      const existingRole = existing.role ?? "user";
      const targetRole = shouldBeSystemAdmin ? "system_admin" : existingRole;
      const targetModules = shouldBeSystemAdmin
        ? ALL_ADMIN_MODULES
        : existing.allowedModules;
      const shouldPatch =
        existing.email !== email ||
        existing.name !== (identity.name ?? existing.name) ||
        existing.avatarUrl !== identity.pictureUrl ||
        existing.role !== targetRole;

      if (shouldPatch) {
        await ctx.db.patch(existing._id, {
          email,
          name: identity.name ?? existing.name,
          avatarUrl: identity.pictureUrl,
          role: targetRole,
          allowedModules: targetModules,
          updatedAt: Date.now(),
        });
      }
      return existing._id;
    }

    if (email) {
      const existingByEmail = await ctx.db
        .query("users")
        .withIndex("by_email", (q) => q.eq("email", email))
        .unique();

      if (existingByEmail) {
        await ctx.db.patch(existingByEmail._id, {
          externalId: identity.subject,
          name: identity.name ?? existingByEmail.name,
          avatarUrl: identity.pictureUrl,
          role: shouldBeSystemAdmin ? "system_admin" : existingByEmail.role ?? "user",
          allowedModules: shouldBeSystemAdmin
            ? ALL_ADMIN_MODULES
            : existingByEmail.allowedModules,
          updatedAt: Date.now(),
        });
        return existingByEmail._id;
      }
    }

    // Create new user
    return await ctx.db.insert("users", {
      externalId: identity.subject,
      email,
      name: identity.name ?? email ?? "User",
      avatarUrl: identity.pictureUrl,
      isActive: true,
      role: shouldBeSystemAdmin ? "system_admin" : "user",
      allowedModules: shouldBeSystemAdmin ? ALL_ADMIN_MODULES : undefined,
      updatedAt: Date.now(),
    });
  },
});

/**
 * Internal: Create a placeholder user for an invite
 */
export const createInvitedUser = internalMutation({
  args: {
    email: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .unique();

    if (existing) return existing._id;

    // Create placeholder
    return await ctx.db.insert("users", {
      externalId: `invite_${args.email}`,
      email: args.email,
      name: args.name,
      isActive: true,
      role: isSystemAdminEmail(args.email) ? "system_admin" : "user",
      allowedModules: isSystemAdminEmail(args.email) ? ALL_ADMIN_MODULES : undefined,
      updatedAt: Date.now(),
    });
  },
});
