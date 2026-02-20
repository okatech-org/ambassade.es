import { defineTable } from "convex/server";
import { v } from "convex/values";
import { adminModuleValidator, userRoleValidator } from "../lib/adminPermissions";

/**
 * Users table - synced from Clerk + global admin roles
 */
export const usersTable = defineTable({
  // Auth externe (Clerk)
  externalId: v.string(),

  // Données de base (sync depuis Clerk)
  email: v.string(),
  name: v.string(),
  phone: v.optional(v.string()),
  firstName: v.optional(v.string()),
  lastName: v.optional(v.string()),
  avatarUrl: v.optional(v.string()),
  poste: v.optional(v.string()), // Position title — e.g. "Vice-Consule 2"

  // Flags système
  isActive: v.boolean(),
  isSuperadmin: v.optional(v.boolean()), // TEMPORARY: kept for migration compat
  role: v.optional(userRoleValidator),
  allowedModules: v.optional(v.array(adminModuleValidator)),

  // Metadata (pas de _createdAt, utilise _creationTime natif)
  updatedAt: v.optional(v.number()),
})
  .index("by_externalId", ["externalId"])
  .index("by_phone", ["phone"])
  .index("by_email", ["email"])
  .searchIndex("search_name", { searchField: "name" });
