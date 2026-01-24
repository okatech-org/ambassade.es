import { v } from "convex/values";
import { query, mutation } from "../_generated/server";
import { requireSuperadmin } from "../lib/auth";

// Public: List all active services
export const list = query({
  args: {
    category: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let services;
    if (args.category) {
      services = await ctx.db.query("services")
        .withIndex("by_category", (q) => 
          q.eq("category", args.category as string).eq("isActive", true)
        )
        .collect();
    } else {
      services = await ctx.db.query("services")
        .filter((q) => q.eq(q.field("isActive"), true))
        .collect();
    }
    // Sort by order or title
    return services.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("services")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
  },
});

// Admin: List all (including inactive)
export const listAll = query({
  args: {},
  handler: async (ctx) => {
    await requireSuperadmin(ctx);
    const services = await ctx.db.query("services").collect();
    return services.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  },
});

export const update = mutation({
  args: {
    id: v.id("services"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    content: v.optional(v.string()),
    category: v.optional(v.string()),
    price: v.optional(v.string()),
    delay: v.optional(v.string()),
    requirements: v.optional(v.array(v.string())),
    actionLink: v.optional(v.string()),
    isOnline: v.optional(v.boolean()),
    isActive: v.optional(v.boolean()),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    await requireSuperadmin(ctx);
    const { id, ...fields } = args;
    await ctx.db.patch(id, fields);
  },
});

// Seed/Create (Admin)
export const create = mutation({
  args: {
    title: v.string(),
    slug: v.string(),
    description: v.string(),
    content: v.optional(v.string()),
    category: v.string(),
    price: v.optional(v.string()),
    delay: v.optional(v.string()),
    requirements: v.array(v.string()),
    actionLink: v.optional(v.string()),
    isOnline: v.boolean(),
    isActive: v.boolean(),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    await requireSuperadmin(ctx);
    return await ctx.db.insert("services", args);
  },
});
