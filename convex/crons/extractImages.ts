"use node";

import { internalAction } from "../_generated/server";
import { internal } from "../_generated/api";

/**
 * Fetch LinkedIn post pages, download images, and upload to Convex storage.
 * This avoids LinkedIn's ORB/hotlinking protection by storing images locally.
 */
export const extractLinkedInImages = internalAction({
  args: {},
  handler: async (ctx) => {
    console.log("[ImageExtract] Starting LinkedIn image extraction & upload...");

    // 1. Get posts without images
    const posts = await ctx.runMutation(
      internal.crons.extractImagesMutations.listPostsWithoutImages
    );

    console.log(`[ImageExtract] Found ${posts.length} posts without images`);

    if (posts.length === 0) {
      console.log("[ImageExtract] All posts already have images.");
      return;
    }

    let fixed = 0;
    let errors = 0;

    for (const post of posts) {
      try {
        console.log(`[ImageExtract] Processing: "${post.title}"`);

        // Step 1: Fetch the LinkedIn post page to extract image URL
        const linkedinHtml = await fetchLinkedInPage(post.linkedinUrl);
        if (!linkedinHtml) {
          console.warn(`[ImageExtract] Could not fetch LinkedIn page for: "${post.title}"`);
          errors++;
          continue;
        }

        const imageUrl = extractOgImage(linkedinHtml);
        if (!imageUrl) {
          console.warn(`[ImageExtract] No image found for: "${post.title}"`);
          errors++;
          continue;
        }

        console.log(`[ImageExtract] Found image: ${imageUrl.substring(0, 80)}...`);

        // Step 2: Download the image binary data
        const imageData = await downloadImage(imageUrl);
        if (!imageData) {
          console.warn(`[ImageExtract] Could not download image for: "${post.title}"`);
          errors++;
          continue;
        }

        // Step 3: Upload to Convex storage
        const storageId = await ctx.storage.store(imageData.blob);

        // Step 4: Update the post with the storage ID
        await ctx.runMutation(
          internal.crons.extractImagesMutations.setCoverImageStorage,
          {
            id: post._id,
            coverImageStorageId: storageId,
          }
        );

        console.log(`[ImageExtract] ✅ Image uploaded for: "${post.title}"`);
        fixed++;

        // Rate limit
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (err) {
        console.error(`[ImageExtract] Error for "${post.title}":`, err);
        errors++;
      }
    }

    console.log(
      `[ImageExtract] Done. Images uploaded: ${fixed}, Errors: ${errors}, Total: ${posts.length}`
    );
  },
});

/**
 * Fetch a LinkedIn page with browser-like headers.
 */
async function fetchLinkedInPage(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept-Language": "fr-FR,fr;q=0.9,en;q=0.8,es;q=0.7",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
      redirect: "follow",
    });
    if (!res.ok) {
      console.error(`[ImageExtract] HTTP ${res.status} for ${url}`);
      return null;
    }
    return await res.text();
  } catch (err) {
    console.error(`[ImageExtract] Fetch error for ${url}:`, err);
    return null;
  }
}

/**
 * Download an image and return it as a Blob.
 */
async function downloadImage(
  url: string
): Promise<{ blob: Blob } | null> {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        Accept: "image/*,*/*;q=0.8",
        Referer: "https://www.linkedin.com/",
      },
      redirect: "follow",
    });
    if (!res.ok) {
      console.error(`[ImageExtract] Image download failed: ${res.status}`);
      return null;
    }
    const blob = await res.blob();
    if (blob.size < 1000) {
      console.warn(`[ImageExtract] Image too small (${blob.size} bytes), skipping`);
      return null;
    }
    return { blob };
  } catch (err) {
    console.error(`[ImageExtract] Image download error:`, err);
    return null;
  }
}

/**
 * Extract og:image from HTML meta tags.
 */
function extractOgImage(html: string): string | undefined {
  // Try og:image first
  const ogMatch = html.match(
    /<meta\s+(?:property|name)="og:image"\s+content="([^"]+)"/i
  );
  if (ogMatch?.[1]) return ogMatch[1];

  // Try alternate order
  const ogMatch2 = html.match(
    /<meta\s+content="([^"]+)"\s+(?:property|name)="og:image"/i
  );
  if (ogMatch2?.[1]) return ogMatch2[1];

  // Try twitter:image
  const twitterMatch = html.match(
    /<meta\s+(?:property|name)="twitter:image(?::src)?"\s+content="([^"]+)"/i
  );
  if (twitterMatch?.[1]) return twitterMatch[1];

  const twitterMatch2 = html.match(
    /<meta\s+content="([^"]+)"\s+(?:property|name)="twitter:image(?::src)?"/i
  );
  if (twitterMatch2?.[1]) return twitterMatch2[1];

  // Fallback: LinkedIn CDN images
  const licdnRegex = /https:\/\/media\.licdn\.com\/dms\/image\/v2\/[^"'\s)]+/g;
  const matches = html.match(licdnRegex);
  if (matches && matches.length > 0) {
    const filtered = matches.filter(
      (url) =>
        !url.includes("profile-displayphoto") &&
        !url.includes("company-logo")
    );
    return filtered[0] || matches[0];
  }

  return undefined;
}
