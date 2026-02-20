import { defineTable } from "convex/server";
import { v } from "convex/values";

/**
 * Site-wide settings — singleton document (key = "global").
 * Stores universal password, site name, admin email, etc.
 */
export const siteSettingsTable = defineTable({
  key: v.string(), // always "global"

  // General
  siteName: v.optional(v.string()),
  adminEmail: v.optional(v.string()),

  // Security
  universalPassword: v.optional(v.string()),

  // Metadata
  updatedAt: v.optional(v.number()),
  updatedBy: v.optional(v.id("users")),
}).index("by_key", ["key"]);
