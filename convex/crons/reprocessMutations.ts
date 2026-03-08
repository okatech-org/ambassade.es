import { internalMutation } from "../_generated/server";
import { v } from "convex/values";

/**
 * Internal mutation to list all posts that have broken LinkedIn data
 * (title contains a URL or JSON artifacts).
 */
export const listBrokenPosts = internalMutation({
  args: {},
  handler: async (ctx) => {
    const allPosts = await ctx.db
      .query("posts")
      .withIndex("by_status_date", (q) => q.eq("status", "published"))
      .collect();

    // Filter posts with broken titles (contain linkedin URL or JSON artifacts)
    return allPosts.filter(
      (p) =>
        p.title.includes("linkedin.com") ||
        p.title.includes("http") ||
        p.excerpt.includes('","text"') ||
        p.excerpt.includes("linkedin.com")
    );
  },
});

/**
 * Internal mutation to update a single post with cleaned data.
 */
export const updatePostData = internalMutation({
  args: {
    id: v.id("posts"),
    title: v.string(),
    excerpt: v.string(),
    content: v.string(),
    slug: v.string(),
    coverImage: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, slug, ...fields } = args;

    // Ensure slug uniqueness
    const existing = await ctx.db
      .query("posts")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .unique();

    let finalSlug = slug;
    if (existing && existing._id !== id) {
      // Slug taken by another post, append suffix
      let suffix = 1;
      while (true) {
        const candidate = `${slug}-${suffix}`;
        const check = await ctx.db
          .query("posts")
          .withIndex("by_slug", (q) => q.eq("slug", candidate))
          .unique();
        if (!check || check._id === id) {
          finalSlug = candidate;
          break;
        }
        suffix++;
      }
    }

    await ctx.db.patch(id, {
      ...fields,
      slug: finalSlug,
    });
  },
});
