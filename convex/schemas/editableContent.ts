import { defineTable } from "convex/server";
import { v } from "convex/values";

export const editableContentTable = defineTable({
  contentKey: v.string(),
  pagePath: v.string(),
  sectionId: v.string(),
  fieldType: v.union(
    v.literal("text"),
    v.literal("richtext"),
    v.literal("image"),
    v.literal("link"),
  ),
  value: v.string(),
  defaultValue: v.string(),
  lastEditedBy: v.optional(v.id("users")),
  lastEditedAt: v.optional(v.number()),
})
  .index("by_contentKey", ["contentKey"])
  .index("by_pagePath", ["pagePath"]);
