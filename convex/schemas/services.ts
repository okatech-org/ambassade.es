import { defineTable } from "convex/server";
import { v } from "convex/values";

export const servicesTable = defineTable({
  title: v.string(),
  slug: v.string(), 
  description: v.string(),
  content: v.optional(v.string()), // Detailed content if needed
  
  category: v.string(), // "Identité", "Etat Civil", etc.
  
  // Info fields
  price: v.optional(v.string()),
  delay: v.optional(v.string()),
  
  // Lists
  requirements: v.array(v.string()), // List of required documents/steps
  
  // Action
  actionLink: v.optional(v.string()),
  isOnline: v.boolean(),
  
  isActive: v.boolean(),
  order: v.optional(v.number()), // For sorting
})
  .index("by_slug", ["slug"])
  .index("by_category", ["category", "isActive"]);
