#!/usr/bin/env node
/**
 * Local script to download LinkedIn post images and upload them to Convex storage.
 * Run: node scripts/download-linkedin-images.mjs
 *
 * This script runs LOCALLY (not on Convex servers) to bypass LinkedIn's CDN
 * restrictions on server-side downloads.
 */

import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api.js";
import fs from "node:fs";
import path from "node:path";

// Convex deployment URL
const CONVEX_URL = process.env.CONVEX_URL || "https://energized-chicken-312.convex.cloud";
const client = new ConvexHttpClient(CONVEX_URL);

// LinkedIn post URLs mapped to their og:image URLs
// These were extracted from the LinkedIn pages
const POST_IMAGES = [
  {
    title: "Le Gabon au Mobile World Congress 2026",
    linkedinActivity: "7435722820434759681",
    // Will be extracted from LinkedIn page
  },
  {
    title: "Prix Mujeres Avenir",
    linkedinActivity: "7435355732541292545",
  },
  {
    title: "écotourisme auprès d'ONUTourisme", 
    linkedinActivity: "7431738134968565760",
  },
  {
    title: "biodiversité",
    linkedinActivity: "7425168844295569408",
  },
  {
    title: "FITUR 2026 : Le Gabon triomphe",
    linkedinActivity: "7422993968520474624",
  },
  {
    title: "sport pour une diplomatie",
    linkedinActivity: "7421278497685286912",
  },
  {
    title: "Mayumba",
    linkedinActivity: "7421155951602216960",
  },
  {
    title: "Dernier Éden",
    linkedinActivity: "7421100842298068992",
  },
  {
    title: "Succès commercial à FITUR",
    linkedinActivity: "7420898925190750209",
  },
];

async function extractOgImage(url) {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml",
        "Accept-Language": "fr-FR,fr;q=0.9",
      },
      redirect: "follow",
    });
    if (!res.ok) return null;
    const html = await res.text();
    
    // Extract og:image
    const match = html.match(/property="og:image"\s+content="([^"]+)"/i)
      || html.match(/content="([^"]+)"\s+property="og:image"/i);
    
    return match?.[1] || null;
  } catch (err) {
    console.error(`  Failed to fetch page: ${err.message}`);
    return null;
  }
}

async function downloadImage(url) {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        "Accept": "image/*,*/*",
        "Referer": "https://www.linkedin.com/",
      },
      redirect: "follow",
    });
    if (!res.ok) {
      console.error(`  Download failed: ${res.status}`);
      return null;
    }
    const buffer = await res.arrayBuffer();
    if (buffer.byteLength < 1000) {
      console.error(`  Image too small: ${buffer.byteLength} bytes`);
      return null;
    }
    const contentType = res.headers.get("content-type") || "image/jpeg";
    return { buffer: Buffer.from(buffer), contentType };
  } catch (err) {
    console.error(`  Download error: ${err.message}`);
    return null;
  }
}

async function main() {
  console.log("🔍 Fetching posts from Convex...");
  
  // Get all published posts
  const postsResult = await client.query(api.functions.posts.list, {
    paginationOpts: { numItems: 50, cursor: null },
  });
  
  const posts = postsResult.page;
  console.log(`Found ${posts.length} total posts`);
  
  // Find posts that need images (have linkedinUrl but no working coverImage)
  const needImages = posts.filter(p => {
    if (p.coverImageStorageId) return false; // Already has stored image
    if (!p.linkedinUrl) return false;
    // Has no cover image or has a broken LinkedIn CDN URL
    if (!p.coverImage) return true;
    if (p.coverImage.includes("licdn.com") || p.coverImage.includes("linkedin.com")) return true;
    return false;
  });

  console.log(`\n📸 ${needImages.length} posts need images\n`);

  const tmpDir = "/tmp/linkedin-images";
  fs.mkdirSync(tmpDir, { recursive: true });

  let fixed = 0;
  for (const post of needImages) {
    console.log(`\n📝 "${post.title}"`);
    console.log(`   LinkedIn: ${post.linkedinUrl}`);

    // Step 1: Get og:image URL from LinkedIn page
    const ogImageUrl = await extractOgImage(post.linkedinUrl);
    if (!ogImageUrl) {
      console.log("   ⚠️ No og:image found");
      continue;
    }
    console.log(`   🖼️ Found: ${ogImageUrl.substring(0, 80)}...`);

    // Step 2: Download image locally
    const imageData = await downloadImage(ogImageUrl);
    if (!imageData) {
      console.log("   ❌ Could not download image");
      continue;
    }
    console.log(`   ✅ Downloaded: ${imageData.buffer.byteLength} bytes (${imageData.contentType})`);

    // Step 3: Save locally
    const ext = imageData.contentType.includes("png") ? "png" : "jpg";
    const filename = `post-${post._id}.${ext}`;
    const filepath = path.join(tmpDir, filename);
    fs.writeFileSync(filepath, imageData.buffer);
    console.log(`   💾 Saved: ${filepath}`);

    fixed++;

    // Rate limit
    await new Promise(r => setTimeout(r, 500));
  }

  console.log(`\n✅ Downloaded ${fixed} images to ${tmpDir}`);
  console.log(`\nNext: Upload these images via the Convex dashboard or CLI.`);
}

main().catch(console.error);
