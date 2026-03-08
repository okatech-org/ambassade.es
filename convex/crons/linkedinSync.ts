"use node";

import { internalAction } from "../_generated/server";
import { internal } from "../_generated/api";

const LINKEDIN_URL =
  "https://es.linkedin.com/company/ambassade-du-gabon-en-espagne";

/**
 * Sync latest posts from the LinkedIn company page.
 * Scrapes the public page HTML, extracts posts, and upserts new ones into Convex.
 */
export const syncLinkedInPosts = internalAction({
  args: {},
  handler: async (ctx) => {
    console.log("[LinkedIn Sync] Starting sync...");

    // 1. Fetch the public LinkedIn page
    let html: string;
    try {
      const res = await fetch(LINKEDIN_URL, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "Accept-Language": "fr-FR,fr;q=0.9,en;q=0.8",
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        },
      });
      if (!res.ok) {
        console.error(
          `[LinkedIn Sync] Failed to fetch page: ${res.status} ${res.statusText}`
        );
        return;
      }
      html = await res.text();
    } catch (err) {
      console.error("[LinkedIn Sync] Network error:", err);
      return;
    }

    // 2. Extract posts from HTML
    const posts = parseLinkedInPosts(html);
    console.log(`[LinkedIn Sync] Parsed ${posts.length} posts from HTML`);

    if (posts.length === 0) {
      console.warn(
        "[LinkedIn Sync] No posts parsed — LinkedIn may have changed their HTML structure"
      );
      return;
    }

    // Take at most 15 posts
    const latestPosts = posts.slice(0, 15);

    // 3. Upsert each post
    let created = 0;
    let skipped = 0;

    for (const post of latestPosts) {
      try {
        const wasCreated = await ctx.runMutation(
          internal.crons.linkedinSyncMutations.upsertLinkedInPost,
          {
            linkedinPostId: post.activityId,
            linkedinUrl: post.url,
            title: post.title,
            excerpt: post.excerpt,
            content: post.content,
            coverImage: post.imageUrl,
            publishedAt: post.publishedAt,
            slug: post.slug,
          }
        );
        if (wasCreated) {
          created++;
        } else {
          skipped++;
        }
      } catch (err) {
        console.error(
          `[LinkedIn Sync] Error upserting post ${post.activityId}:`,
          err
        );
      }
    }

    console.log(
      `[LinkedIn Sync] Done. Created: ${created}, Skipped (already exist): ${skipped}`
    );
  },
});

// ─── HTML Parsing Helpers ────────────────────────────────────────────

interface ParsedPost {
  activityId: string;
  url: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl?: string;
  publishedAt: number;
  slug: string;
}

/**
 * Parse LinkedIn company page HTML to extract posts.
 * The public company page includes post data in the initial HTML.
 */
function parseLinkedInPosts(html: string): ParsedPost[] {
  const posts: ParsedPost[] = [];
  const now = Date.now();

  // Find all activity (post) URLs — these contain the activity IDs
  // Pattern: https://fr.linkedin.com/posts/ambassade-du-gabon-en-espagne_...-activity-XXXXX-YYYY
  const activityRegex =
    /https:\/\/[a-z]{2}\.linkedin\.com\/posts\/ambassade-du-gabon-en-espagne[^"'\s]*activity-(\d+)-[a-zA-Z0-9]+/g;
  const activityMatches = [...html.matchAll(activityRegex)];

  // Deduplicate by activity ID
  const seenIds = new Set<string>();
  const uniqueActivities: { url: string; id: string; position: number }[] = [];

  for (const match of activityMatches) {
    const id = match[1];
    if (!seenIds.has(id)) {
      seenIds.add(id);
      uniqueActivities.push({
        url: match[0],
        id,
        position: match.index ?? 0,
      });
    }
  }

  // For each activity, extract the surrounding post content
  for (let i = 0; i < uniqueActivities.length; i++) {
    const activity = uniqueActivities[i];
    const nextActivity = uniqueActivities[i + 1];

    // Get the HTML chunk for this post
    const startPos = activity.position;
    const endPos = nextActivity ? nextActivity.position : startPos + 15000;
    const chunk = html.substring(startPos, Math.min(endPos, startPos + 15000));

    // Extract post text content
    const textContent = extractPostText(chunk);

    // Extract title (first sentence or first line, max 120 chars)
    let title = "";
    if (textContent && textContent.length >= 30) {
      title = extractTitle(textContent);
    }

    // Fallback: generate title from URL slug if extraction failed
    if (!title || title.length < 10) {
      title = generateTitleFromUrl(activity.url);
    }
    if (!title) continue;

    // Extract excerpt (first 250 chars of clean text, never a URL)
    const cleanTextForExcerpt = (textContent || "")
      .replace(/https?:\/\/[^\s"']+/g, "")
      .replace(/[{}"]/g, "")
      .replace(/,\s*"text"\s*:\s*/g, "")
      .replace(/\s+/g, " ")
      .trim();
    const excerpt = cleanTextForExcerpt.substring(0, 250).trim() || title;

    // Extract image
    const imageUrl = extractImage(chunk);

    // Estimate published date from relative time text in the chunk
    const publishedAt = estimatePublishedDate(chunk, now);

    // Generate slug from title
    const slug = generateSlug(title);

    posts.push({
      activityId: activity.id,
      url: activity.url,
      title,
      excerpt,
      content: cleanTextForExcerpt || title,
      imageUrl,
      publishedAt,
      slug,
    });
  }

  return posts;
}

/**
 * Extract post text content from an HTML chunk.
 * Strips HTML tags and cleans up whitespace.
 */
function extractPostText(chunk: string): string {
  // Remove scripts and styles
  let text = chunk
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  // Remove LinkedIn boilerplate
  const boilerplatePatterns = [
    /Embajada de Gab[oó]n en Espa[nñ]a/g,
    /\d+ seguidores/g,
    /Denunciar esta publicaci[oó]n/g,
    /Recomendar/g,
    /Comentar/g,
    /Compartir/g,
    /\d+ comentario(s)?/g,
    /Editado/g,
    /… más/g,
  ];

  for (const pattern of boilerplatePatterns) {
    text = text.replace(pattern, "");
  }

  // Find the longest meaningful text block (likely the post content)
  const blocks = text.split(/\s{3,}/);
  let bestBlock = "";

  for (const block of blocks) {
    const cleaned = block.trim();
    if (cleaned.length > bestBlock.length && cleaned.length > 50) {
      // Check it's not just URLs or hashtags
      const alphaRatio =
        (cleaned.match(/[a-zA-ZÀ-ÿ]/g) || []).length / cleaned.length;
      if (alphaRatio > 0.4) {
        bestBlock = cleaned;
      }
    }
  }

  // Clean hashtags at the end (keep the words, remove #)
  bestBlock = bestBlock.replace(/#(\w+)/g, "$1");

  return bestBlock.trim();
}

/**
 * Extract a title from the post text.
 * Uses the first sentence or first line, limited to 120 characters.
 * NEVER returns a URL — falls back to generating a title from the URL slug.
 */
function extractTitle(text: string): string {
  // Clean text: remove URLs and JSON artifacts
  const cleanedText = text
    .replace(/https?:\/\/[^\s"']+/g, "")
    .replace(/[{}"]/g, "")
    .replace(/,\s*"text"\s*:\s*/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (!cleanedText || cleanedText.length < 15) {
    return "";
  }

  // Try first line (if it ends with a newline-like break)
  const firstLine = cleanedText.split(/[.\n]/)[0]?.trim();

  if (firstLine && firstLine.length >= 15 && firstLine.length <= 120 && !firstLine.includes("http")) {
    return firstLine;
  }

  // Otherwise take first 100 chars and cut at a word boundary
  const source = cleanedText.length <= 100 ? cleanedText : cleanedText.substring(0, 100);
  if (source.length <= 100 && !source.includes("http")) return source;

  const truncated = source.substring(0, 100);
  const lastSpace = truncated.lastIndexOf(" ");
  const title = (lastSpace > 50 ? truncated.substring(0, lastSpace) : truncated) + "…";

  // Final safety check: never return a URL
  if (title.includes("http")) return "";
  return title;
}

/**
 * Extract the first image URL from an HTML chunk.
 */
function extractImage(chunk: string): string | undefined {
  // Look for LinkedIn media images (hosted on media.licdn.com)
  const imgRegex = /https:\/\/media\.licdn\.com\/dms\/image\/[^"'\s)]+/g;
  const matches = chunk.match(imgRegex);

  if (matches && matches.length > 0) {
    return matches[0];
  }

  return undefined;
}

/**
 * Estimate published date from relative time text in the HTML.
 * LinkedIn shows times like "1 día", "2 semanas", "1 mes", etc.
 */
function estimatePublishedDate(chunk: string, now: number): number {
  const MS_HOUR = 3600000;
  const MS_DAY = MS_HOUR * 24;
  const MS_WEEK = MS_DAY * 7;
  const MS_MONTH = MS_DAY * 30;

  // Spanish relative time patterns
  if (/\b(\d+)\s*hora/i.test(chunk)) {
    const hours = Number.parseInt(RegExp.$1, 10);
    return now - hours * MS_HOUR;
  }
  if (/\b(\d+)\s*d[ií]a/i.test(chunk)) {
    const days = Number.parseInt(RegExp.$1, 10);
    return now - days * MS_DAY;
  }
  if (/\b(\d+)\s*semana/i.test(chunk)) {
    const weeks = Number.parseInt(RegExp.$1, 10);
    return now - weeks * MS_WEEK;
  }
  if (/\b(\d+)\s*mes/i.test(chunk)) {
    const months = Number.parseInt(RegExp.$1, 10);
    return now - months * MS_MONTH;
  }

  // Default: assume recent (yesterday)
  return now - MS_DAY;
}

/**
 * Generate a URL-friendly slug from a title.
 */
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/[^a-z0-9\s-]/g, "") // Remove non-alphanumeric
    .replace(/\s+/g, "-") // Spaces to hyphens
    .replace(/-+/g, "-") // Collapse hyphens
    .replace(/^-|-$/g, "") // Trim hyphens
    .substring(0, 80); // Max length
}

/**
 * Generate a human-readable title from a LinkedIn post URL.
 * Extracts the slug part and converts it to Title Case.
 * Example: "fitur-gabonfitur2026-businesstravel" → "Fitur Gabonfitur2026 Businesstravel"
 */
function generateTitleFromUrl(url: string): string {
  // Extract slug between company name and activity ID
  // Pattern: /posts/ambassade-du-gabon-en-espagne_SLUG-activity-XXXXX
  const match = url.match(
    /ambassade-du-gabon-en-espagne[_-](.+?)-activity-/i
  );
  if (!match || !match[1]) return "";

  const slug = match[1];

  // Convert slug to readable title
  return slug
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}
