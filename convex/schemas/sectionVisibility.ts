import { defineTable } from "convex/server";
import { v } from "convex/values";

export const sectionVisibilityTable = defineTable({
  pagePath: v.string(),
  sectionId: v.string(),
  hidden: v.boolean(),
  lastEditedBy: v.optional(v.id("users")),
  lastEditedAt: v.optional(v.number()),
})
  .index("by_pagePath", ["pagePath"])
  .index("by_pagePath_sectionId", ["pagePath", "sectionId"]);
