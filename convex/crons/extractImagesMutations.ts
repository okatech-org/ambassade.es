import { internalMutation } from "../_generated/server";
import { v } from "convex/values";

/**
 * List posts that have a linkedinUrl but no coverImage.
 */
export const listPostsWithoutImages = internalMutation({
  args: {},
  handler: async (ctx) => {
    const allPosts = await ctx.db
      .query("posts")
      .withIndex("by_status_date", (q) => q.eq("status", "published"))
      .collect();

    return allPosts
      .filter((p) => {
        if (!p.linkedinUrl) return false;
        // No image at all
        if (!p.coverImage && !p.coverImageStorageId) return true;
        // Has a LinkedIn CDN URL that's blocked by browsers (hotlink protection)
        if (
          p.coverImage &&
          !p.coverImageStorageId &&
          (p.coverImage.includes("licdn.com") ||
            p.coverImage.includes("linkedin.com"))
        )
          return true;
        return false;
      })
      .map((p) => ({
        _id: p._id,
        title: p.title,
        linkedinUrl: p.linkedinUrl!,
      }));
  },
});

/**
 * Update a post's coverImage URL field.
 */
export const setCoverImage = internalMutation({
  args: {
    id: v.id("posts"),
    coverImage: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { coverImage: args.coverImage });
  },
});

/**
 * Update a post's coverImageStorageId (uploaded to Convex storage).
 * Also clears the old coverImage URL to avoid confusion.
 */
export const setCoverImageStorage = internalMutation({
  args: {
    id: v.id("posts"),
    coverImageStorageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      coverImageStorageId: args.coverImageStorageId,
      coverImage: undefined,
    });
  },
});
