import { defineTable } from "convex/server";
import { v } from "convex/values";

export const announcementsTable = defineTable({
  message: v.string(),
  link: v.optional(v.string()),
  type: v.union(v.literal("info"), v.literal("warning"), v.literal("danger")),
  isActive: v.boolean(),
  startAt: v.optional(v.number()),
  endAt: v.optional(v.number()),
})
  .index("by_active", ["isActive"]);
