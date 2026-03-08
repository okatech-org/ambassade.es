"use node";

import { internalAction } from "../_generated/server";
import { internal } from "../_generated/api";
import { internalMutation } from "../_generated/server";
import { v } from "convex/values";

// This must be in a separate non-node file, but for simplicity,
// we'll use a combined approach with the existing mutation

/**
 * Apply generated images to LinkedIn posts.
 * This is a standalone action that finds posts by title and sets cover images.
 */
export const applyImages = internalAction({
  args: {},
  handler: async (ctx) => {
    console.log("[ApplyImages] Starting...");

    // Title keyword → image path mapping
    const IMAGE_MAP = [
      { keyword: "Succès commercial à FITUR", image: "/images/actualites/fitur-success-gabon.png" },
      { keyword: "Dernier Éden", image: "/images/actualites/fitur-dernier-eden.png" },
      { keyword: "Dernier Eden", image: "/images/actualites/fitur-dernier-eden.png" },
      { keyword: "Mayumba", image: "/images/actualites/mayumba-tourism.png" },
      { keyword: "sport pour une diplomatie", image: "/images/actualites/fitur-sport-diplomacy.png" },
      { keyword: "triomphe en diplomatie", image: "/images/actualites/fitur-triomphe.png" },
      { keyword: "biodiversité", image: "/images/actualites/gabon-biodiversity.png" },
      { keyword: "ONUTourisme", image: "/images/actualites/onu-ecotourism.png" },
      { keyword: "écotourisme auprès", image: "/images/actualites/onu-ecotourism.png" },
      { keyword: "Mujeres Avenir", image: "/images/actualites/mujeres-avenir-prix.png" },
      { keyword: "Mobile World Congress", image: "/images/actualites/mwc-barcelona.png" },
    ];

    // Get ALL LinkedIn-sourced posts to check
    const posts = await ctx.runMutation(
      internal.crons.setPostImagesMutations.listAllLinkedInPosts
    );

    console.log(`[ApplyImages] Found ${posts.length} LinkedIn posts`);

    let updated = 0;
    for (const post of posts) {
      const mapping = IMAGE_MAP.find((m) =>
        post.title.toLowerCase().includes(m.keyword.toLowerCase())
      );

      if (!mapping) {
        console.warn(`[ApplyImages] ⚠️ No image match for: "${post.title}"`);
        continue;
      }

      // Skip if already has correct image
      if (post.coverImage === mapping.image) {
        console.log(`[ApplyImages] ✓ Already set: "${post.title.substring(0, 50)}"`);
        continue;
      }

      await ctx.runMutation(
        internal.crons.extractImagesMutations.setCoverImage,
        {
          id: post._id,
          coverImage: mapping.image,
        }
      );

      console.log(`[ApplyImages] ✅ "${post.title}" → ${mapping.image}`);
      updated++;
    }

    console.log(`[ApplyImages] Done. Updated: ${updated}/${posts.length}`);
  },
});
