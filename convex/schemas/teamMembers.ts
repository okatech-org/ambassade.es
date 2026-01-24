import { defineTable } from "convex/server";
import { v } from "convex/values";

export const teamMembersTable = defineTable({
  firstName: v.string(),
  lastName: v.string(),
  role: v.string(),
  description: v.optional(v.string()),
  photoStorageId: v.optional(v.id("_storage")),
  email: v.optional(v.string()),
  linkedIn: v.optional(v.string()),
  order: v.number(),
  isConsulGeneral: v.boolean(),
  isActive: v.boolean(),
})
  .index("by_order", ["order"])
  .index("by_consul_general", ["isConsulGeneral"])
  .index("by_active", ["isActive"]);
