import { v } from "convex/values";
import { query, mutation } from "../_generated/server";
import { requireModule } from "../lib/auth";

export const getActive = query({
  args: {},
  handler: async (ctx) => {
    const announcements = await ctx.db
      .query("announcements")
      .withIndex("by_active", (q) => q.eq("isActive", true))
      .collect();
      
    const now = Date.now();
    return announcements.filter(a => {
      if (a.startAt && a.startAt > now) return false;
      if (a.endAt && a.endAt < now) return false;
      return true;
    });
  },
});

export const listAll = query({
  args: {},
  handler: async (ctx) => {
    await requireModule(ctx, "announcements");
    return await ctx.db.query("announcements").collect();
  },
});

export const create = mutation({
  args: {
    message: v.string(),
    link: v.optional(v.string()),
    type: v.union(v.literal("info"), v.literal("warning"), v.literal("danger")),
    isActive: v.boolean(),
    startAt: v.optional(v.number()),
    endAt: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    await requireModule(ctx, "announcements");
    return await ctx.db.insert("announcements", args);
  },
});

export const update = mutation({
  args: {
    id: v.id("announcements"),
    message: v.optional(v.string()),
    link: v.optional(v.string()),
    type: v.optional(v.union(v.literal("info"), v.literal("warning"), v.literal("danger"))),
    isActive: v.optional(v.boolean()),
    startAt: v.optional(v.number()),
    endAt: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    await requireModule(ctx, "announcements");
    const { id, ...fields } = args;
    await ctx.db.patch(id, fields);
  },
});

export const remove = mutation({
  args: { id: v.id("announcements") },
  handler: async (ctx, args) => {
    await requireModule(ctx, "announcements");
    await ctx.db.delete(args.id);
  },
});
