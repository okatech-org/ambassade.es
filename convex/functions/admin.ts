import { v } from "convex/values";
import { superadminQuery, superadminMutation } from "../lib/customFunctions";
import { error, ErrorCode } from "../lib/errors";

/**
 * List all users
 */
export const listUsers = superadminQuery({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});

/**
 * Get single user
 */
export const getUser = superadminQuery({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.userId);
  },
});

/**
 * Get global stats for dashboard
 */
export const getStats = superadminQuery({
  args: {},
  handler: async (ctx) => {
    const [users, services, posts, announcements] = await Promise.all([
      ctx.db.query("users").collect(),
      ctx.db.query("services").filter(q => q.eq(q.field("isActive"), true)).collect(),
      ctx.db.query("posts").filter(q => q.eq(q.field("status"), "published")).collect(),
      ctx.db.query("announcements").filter(q => q.eq(q.field("isActive"), true)).collect(),
    ]);

    return {
      users: { total: users.length },
      services: { active: services.length },
      posts: { published: posts.length },
      announcements: { active: announcements.length },
    };
  },
});

/**
 * Update user role (global/admin)
 */
export const updateUserRole = superadminMutation({
  args: {
    userId: v.id("users"),
    role: v.string(), // "user" or "superadmin"
  },
  handler: async (ctx, args) => {
    if (ctx.user._id === args.userId) {
      throw error(ErrorCode.CANNOT_REMOVE_SELF); 
    }

    const { userId, role } = args;
    const isSuperadmin = role === "superadmin";

    await ctx.db.patch(userId, { isSuperadmin });
    return true;
  },
});

/**
 * Disable user
 */
export const disableUser = superadminMutation({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
     if (ctx.user._id === args.userId) {
      throw error(ErrorCode.CANNOT_REMOVE_SELF);
    }
    // @ts-ignore
    await ctx.db.patch(args.userId, { isActive: false });
  },
});

/**
 * Enable user
 */
export const enableUser = superadminMutation({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    // @ts-ignore
    await ctx.db.patch(args.userId, { isActive: true });
  },
});
