import { v } from "convex/values";
import { query, mutation } from "../_generated/server";
import { requireModule } from "../lib/auth";
import { serviceCategoryValidator } from "../lib/validators";

// Public: List all active services
export const list = query({
  args: {
    category: v.optional(serviceCategoryValidator),
  },
  handler: async (ctx, args) => {
    let services;
    if (args.category) {
      services = await ctx.db.query("services")
        .withIndex("by_category", (q) => 
          q.eq("category", args.category!).eq("isActive", true)
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

// Alias for /services page
export const listCatalog = query({
  args: {},
  handler: async (ctx) => {
    const services = await ctx.db.query("services")
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();
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
    await requireModule(ctx, "services");
    const services = await ctx.db.query("services").collect();
    return services.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  },
});

export const update = mutation({
  args: {
    id: v.id("services"),
    title: v.optional(v.string()), // FR
    titleEn: v.optional(v.string()), // EN
    titleEs: v.optional(v.string()), // ES
    description: v.optional(v.string()), // FR
    descriptionEn: v.optional(v.string()), // EN
    descriptionEs: v.optional(v.string()), // ES
    content: v.optional(v.string()),
    category: v.optional(serviceCategoryValidator),
    icon: v.optional(v.string()),
    price: v.optional(v.string()),
    delay: v.optional(v.string()),
    validity: v.optional(v.string()),
    isUrgent: v.optional(v.boolean()),
    notes: v.optional(v.string()),
    requirements: v.optional(v.array(v.string())),
    requiredDocuments: v.optional(v.array(v.object({
      type: v.string(),
      label: v.string(),
      required: v.boolean()
    }))),
    formSchema: v.optional(v.any()),
    actionLink: v.optional(v.string()),
    isOnline: v.optional(v.boolean()),
    isActive: v.optional(v.boolean()),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    await requireModule(ctx, "services");
    const { id, ...fields } = args;
    await ctx.db.patch(id, fields);
  },
});

// Seed/Create (Admin)
export const create = mutation({
  args: {
    title: v.string(), // FR
    titleEn: v.optional(v.string()), // EN
    titleEs: v.optional(v.string()), // ES
    slug: v.string(),
    description: v.string(), // FR
    descriptionEn: v.optional(v.string()), // EN
    descriptionEs: v.optional(v.string()), // ES
    content: v.optional(v.string()),
    category: serviceCategoryValidator,
    icon: v.optional(v.string()),
    price: v.optional(v.string()),
    delay: v.optional(v.string()),
    validity: v.optional(v.string()),
    isUrgent: v.optional(v.boolean()),
    notes: v.optional(v.string()),
    requirements: v.optional(v.array(v.string())),
    requiredDocuments: v.optional(v.array(v.object({
      type: v.string(),
      label: v.string(),
      required: v.boolean()
    }))),
    formSchema: v.optional(v.any()),
    actionLink: v.optional(v.string()),
    isOnline: v.boolean(),
    isActive: v.boolean(),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    await requireModule(ctx, "services");
    return await ctx.db.insert("services", args);
  },
});
