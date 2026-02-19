import { defineTable } from "convex/server";
import { v } from "convex/values";

export const auditLogTable = defineTable({
  userId: v.id("users"),
  userName: v.string(),
  action: v.string(),
  targetType: v.string(),
  targetId: v.optional(v.string()),
  details: v.optional(v.string()),
  timestamp: v.number(),
})
  .index("by_userId", ["userId"])
  .index("by_timestamp", ["timestamp"])
  .index("by_action", ["action", "timestamp"]);
