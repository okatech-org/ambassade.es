#!/usr/bin/env node
/**
 * Script to update posts with generated cover images.
 * Maps article titles to image paths and updates via Convex.
 */

import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api.js";

const CONVEX_URL = "https://energized-chicken-312.convex.cloud";
const client = new ConvexHttpClient(CONVEX_URL);

// Map title keywords to image paths
const IMAGE_MAP = [
  { keyword: "Succès commercial à FITUR", image: "/images/actualites/fitur-success-gabon.png" },
  { keyword: "Dernier Éden", image: "/images/actualites/fitur-dernier-eden.png" },
  { keyword: "Mayumba", image: "/images/actualites/mayumba-tourism.png" },
  { keyword: "sport pour une diplomatie", image: "/images/actualites/fitur-sport-diplomacy.png" },
  { keyword: "triomphe en diplomatie", image: "/images/actualites/fitur-triomphe.png" },
  { keyword: "biodiversité", image: "/images/actualites/gabon-biodiversity.png" },
  { keyword: "ONUTourisme", image: "/images/actualites/onu-ecotourism.png" },
  { keyword: "écotourisme auprès", image: "/images/actualites/onu-ecotourism.png" },
  { keyword: "Mujeres Avenir", image: "/images/actualites/mujeres-avenir-prix.png" },
  { keyword: "Mobile World Congress", image: "/images/actualites/mwc-barcelona.png" },
];

async function main() {
  console.log("🔍 Fetching posts from Convex...");
  
  const postsResult = await client.query(api.functions.posts.list, {
    paginationOpts: { numItems: 50, cursor: null },
  });
  
  const posts = postsResult.page;
  console.log(`Found ${posts.length} posts\n`);
  
  let updated = 0;

  for (const post of posts) {
    // Check if this post needs an image (has LinkedIn CDN URL or no image)
    const needsImage = !post.coverImageUrl || 
      (post.coverImage && (post.coverImage.includes("licdn.com") || post.coverImage.includes("linkedin.com")));
    
    if (!needsImage) {
      continue;
    }

    // Find matching image
    const mapping = IMAGE_MAP.find(m => post.title.includes(m.keyword));
    if (!mapping) {
      console.log(`  ⚠️ No image match for: "${post.title}"`);
      continue;
    }

    console.log(`📝 "${post.title}"`);
    console.log(`   → ${mapping.image}`);
    
    // Update the post via the public API
    try {
      await client.mutation(api.functions.posts.update, {
        id: post._id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        status: post.status,
        coverImage: mapping.image,
      });
      console.log(`   ✅ Updated\n`);
      updated++;
    } catch (err) {
      console.error(`   ❌ Error: ${err.message}\n`);
    }
  }

  console.log(`\n✅ Updated ${updated} posts with images`);
}

main().catch(console.error);
