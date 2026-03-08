import { internalMutation } from "../_generated/server";
import { v } from "convex/values";

/**
 * Internal mutation to upsert a single LinkedIn post.
 * Returns true if created, false if already existed.
 * Separated from the action file because Convex mutations cannot run in Node.js runtime.
 */
export const upsertLinkedInPost = internalMutation({
  args: {
    linkedinPostId: v.string(),
    linkedinUrl: v.string(),
    title: v.string(),
    excerpt: v.string(),
    content: v.string(),
    coverImage: v.optional(v.string()),
    publishedAt: v.number(),
    slug: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if this LinkedIn post has already been synced
    const existing = await ctx.db
      .query("posts")
      .withIndex("by_linkedinPostId", (q) =>
        q.eq("linkedinPostId", args.linkedinPostId)
      )
      .unique();

    if (existing) {
      return false; // Already synced
    }

    // Ensure slug uniqueness: append a suffix if needed
    let slug = args.slug;
    let slugSuffix = 0;
    // biome-ignore lint/no-constant-condition: loop until unique slug found
    while (true) {
      const candidateSlug = slugSuffix === 0 ? slug : `${slug}-${slugSuffix}`;
      const slugExists = await ctx.db
        .query("posts")
        .withIndex("by_slug", (q) => q.eq("slug", candidateSlug))
        .unique();
      if (!slugExists) {
        slug = candidateSlug;
        break;
      }
      slugSuffix++;
    }

    await ctx.db.insert("posts", {
      title: args.title,
      slug,
      excerpt: args.excerpt,
      content: args.content,
      coverImage: args.coverImage,
      category: "actualite",
      status: "published",
      publishedAt: args.publishedAt,
      linkedinPostId: args.linkedinPostId,
      linkedinUrl: args.linkedinUrl,
    });

    return true;
  },
});
