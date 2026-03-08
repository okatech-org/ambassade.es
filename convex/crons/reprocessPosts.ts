"use node";

import { internalAction } from "../_generated/server";
import { internal } from "../_generated/api";
import { GoogleGenAI } from "@google/genai";

/**
 * One-shot action to reprocess LinkedIn-synced posts that have broken data.
 * Uses Gemini AI to extract clean titles, excerpts, and images from the raw content.
 */
export const reprocessBrokenPosts = internalAction({
  args: {},
  handler: async (ctx) => {
    console.log("[Reprocess] Starting reprocessing of broken LinkedIn posts...");

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("[Reprocess] GEMINI_API_KEY not set");
      return;
    }

    const ai = new GoogleGenAI({ apiKey });

    // 1. Get all broken posts
    const brokenPosts = await ctx.runMutation(
      internal.crons.reprocessMutations.listBrokenPosts
    );

    console.log(`[Reprocess] Found ${brokenPosts.length} broken posts to fix`);

    if (brokenPosts.length === 0) {
      console.log("[Reprocess] No broken posts found, nothing to do.");
      return;
    }

    let fixed = 0;
    let errors = 0;

    for (const post of brokenPosts) {
      try {
        // Build context from available data
        const rawContent = [
          post.title,
          post.excerpt,
          post.content,
          post.linkedinUrl ?? "",
        ]
          .filter(Boolean)
          .join("\n\n");

        // Extract meaningful text and image using AI
        const prompt = `Tu es un assistant qui aide à nettoyer des données d'articles de presse.

Voici les données brutes d'un article de l'Ambassade du Gabon en Espagne, récupéré depuis LinkedIn. Les données sont mal formatées (URLs brutes comme titre, fragments JSON, etc.)

DONNÉES BRUTES :
---
${rawContent.substring(0, 3000)}
---

Extrais les informations suivantes au format JSON strict (pas de markdown, pas de commentaires) :
{
  "title": "un titre clair et professionnel en français, max 100 caractères, qui résume le sujet de l'article",
  "excerpt": "un résumé clair de l'article en français, max 250 caractères, informatif",
  "content": "le contenu nettoyé de l'article en français, organisé en paragraphes propres, sans URLs ni artéfacts techniques. Garde le sens original."
}

RÈGLES :
- Le titre doit être accrocheur et professionnel, JAMAIS une URL
- L'excerpt doit donner envie de lire l'article
- Le contenu doit être propre, en bon français, sans fragments JSON ni URLs LinkedIn
- Si le contenu mentionne un événement, inclure les détails (date, lieu) dans l'excerpt
- Garde les noms propres, titres officiels et acronymes tels quels`;

        const response = await ai.models.generateContent({
          model: "gemini-2.0-flash",
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          config: {
            temperature: 0.3,
            maxOutputTokens: 2048,
          },
        });

        const responseText = response.text ?? "";
        
        // Parse JSON from response (handle potential markdown fences)
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
          console.error(`[Reprocess] No JSON found in AI response for post ${post._id}`);
          errors++;
          continue;
        }

        const parsed = JSON.parse(jsonMatch[0]) as {
          title: string;
          excerpt: string;
          content: string;
        };

        // Validate parsed data
        if (!parsed.title || parsed.title.length < 5 || parsed.title.includes("linkedin.com")) {
          console.error(`[Reprocess] Invalid title from AI for post ${post._id}: ${parsed.title}`);
          errors++;
          continue;
        }

        // Generate slug from clean title
        const slug = generateSlug(parsed.title);

        // Try to extract image URL from the raw content
        const coverImage = extractImageFromContent(rawContent) || post.coverImage;

        // Update the post
        await ctx.runMutation(
          internal.crons.reprocessMutations.updatePostData,
          {
            id: post._id,
            title: parsed.title,
            excerpt: parsed.excerpt,
            content: parsed.content,
            slug,
            coverImage,
          }
        );

        console.log(`[Reprocess] ✅ Fixed post: "${parsed.title}"`);
        fixed++;

        // Rate limit: wait 500ms between AI calls
        await new Promise((resolve) => setTimeout(resolve, 500));
      } catch (err) {
        console.error(`[Reprocess] Error processing post ${post._id}:`, err);
        errors++;
      }
    }

    console.log(
      `[Reprocess] Done. Fixed: ${fixed}, Errors: ${errors}, Total: ${brokenPosts.length}`
    );
  },
});

/**
 * Extract image URLs from content (LinkedIn CDN images).
 */
function extractImageFromContent(content: string): string | undefined {
  // Look for LinkedIn media images
  const licdnRegex = /https:\/\/media\.licdn\.com\/dms\/image\/[^"'\s)\]]+/g;
  const matches = content.match(licdnRegex);
  if (matches && matches.length > 0) {
    return matches[0];
  }

  // Look for any other image URLs
  const imgRegex = /https?:\/\/[^\s"'<>]+\.(?:jpg|jpeg|png|webp|gif)(?:\?[^\s"'<>]*)?/gi;
  const imgMatches = content.match(imgRegex);
  if (imgMatches && imgMatches.length > 0) {
    return imgMatches[0];
  }

  return undefined;
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
