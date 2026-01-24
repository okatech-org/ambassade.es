import { v } from "convex/values";
import { query, mutation } from "../_generated/server";
import { requireSuperadmin } from "../lib/auth";
const paginationOptsValidator = v.object({
  numItems: v.number(),
  cursor: v.union(v.string(), v.null()),
});

// Public: Get published post by slug
export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const post = await ctx.db
      .query("posts")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();

    if (!post || post.status !== "published") {
      return null;
    }
    return post;
  },
});

// Admin: Get any post by slug
export const adminGetBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    await requireSuperadmin(ctx);
    return await ctx.db
      .query("posts")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
  },
});

// Public: List published posts
export const list = query({
  args: {
    category: v.optional(
      v.union(v.literal("actualite"), v.literal("evenement"), v.literal("communique"))
    ),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    let q = ctx.db.query("posts").withIndex("by_status_date", (q) => 
      q.eq("status", "published")
    );

    if (args.category) {
      q = q.filter((q) => q.eq(q.field("category"), args.category));
    }

    return await q.order("desc").paginate(args.paginationOpts);
  },
});

// Admin: Create Post
export const create = mutation({
  args: {
    title: v.string(),
    slug: v.string(),
    excerpt: v.string(),
    content: v.string(),
    category: v.union(v.literal("actualite"), v.literal("evenement"), v.literal("communique")),
    status: v.union(v.literal("draft"), v.literal("published")),
    publishedAt: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    await requireSuperadmin(ctx);
    
    // Check slug uniqueness
    const existing = await ctx.db
      .query("posts")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
    
    if (existing) {
      throw new Error("Slug already exists");
    }

    return await ctx.db.insert("posts", {
      ...args,
      publishedAt: args.publishedAt ?? Date.now(),
    });
  },
});

// Admin: Update Post
export const update = mutation({
  args: {
    id: v.id("posts"),
    title: v.string(),
    slug: v.string(),
    excerpt: v.string(),
    content: v.string(),
    category: v.union(v.literal("actualite"), v.literal("evenement"), v.literal("communique")),
    status: v.union(v.literal("draft"), v.literal("published")),
    publishedAt: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    await requireSuperadmin(ctx);
    const { id, ...fields } = args;
    
    // Check slug uniqueness if changed
    const post = await ctx.db.get(id);
    if (!post) throw new Error("Post not found");

    if (fields.slug !== post.slug) {
       const existing = await ctx.db
        .query("posts")
        .withIndex("by_slug", (q) => q.eq("slug", fields.slug))
        .unique();
      if (existing) throw new Error("Slug taken");
    }

    await ctx.db.patch(id, fields);
  },
});

// Admin: Delete Post
export const remove = mutation({
  args: { id: v.id("posts") },
  handler: async (ctx, args) => {
    await requireSuperadmin(ctx);
    await ctx.db.delete(args.id);
  },
});
