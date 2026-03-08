import { internalMutation } from "../_generated/server";

/**
 * List ALL LinkedIn-sourced posts (for image assignment).
 */
export const listAllLinkedInPosts = internalMutation({
  args: {},
  handler: async (ctx) => {
    const allPosts = await ctx.db
      .query("posts")
      .withIndex("by_status_date", (q) => q.eq("status", "published"))
      .collect();

    return allPosts
      .filter((p) => !!p.linkedinUrl)
      .map((p) => ({
        _id: p._id,
        title: p.title,
        linkedinUrl: p.linkedinUrl!,
        coverImage: p.coverImage,
      }));
  },
});
