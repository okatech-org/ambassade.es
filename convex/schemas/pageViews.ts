import { defineTable } from "convex/server";
import { v } from "convex/values";

export const pageViewsTable = defineTable({
  path: v.string(),
  title: v.optional(v.string()),
  viewCount: v.number(),
  lastViewedAt: v.number(),
  dailyCounts: v.optional(
    v.array(
      v.object({
        date: v.string(),
        count: v.number(),
      }),
    ),
  ),
})
  .index("by_path", ["path"])
  .index("by_viewCount", ["viewCount"]);
