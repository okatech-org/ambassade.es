import { defineTable } from "convex/server";
import { v } from "convex/values";

export const postsTable = defineTable({
  title: v.string(),
  slug: v.string(),
  excerpt: v.string(),
  content: v.string(),
  coverImage: v.optional(v.string()),
  category: v.union(
    v.literal("actualite"),
    v.literal("evenement"), 
    v.literal("communique")
  ),
  publishedAt: v.number(),
  status: v.union(v.literal("draft"), v.literal("published")),
})
  .index("by_slug", ["slug"])
  .index("by_status_date", ["status", "publishedAt"]);
