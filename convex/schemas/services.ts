import { defineTable } from "convex/server";
import { v } from "convex/values";
import { serviceCategoryValidator } from "../lib/validators";

export const servicesTable = defineTable({
  title: v.string(), // FR (default)
  titleEn: v.optional(v.string()), // EN
  titleEs: v.optional(v.string()), // ES
  slug: v.string(), 
  description: v.string(), // FR (default)
  descriptionEn: v.optional(v.string()), // EN
  descriptionEs: v.optional(v.string()), // ES
  content: v.optional(v.string()), // Detailed content if needed
  
  category: serviceCategoryValidator, // "Identité", "Etat Civil", etc.
  icon: v.optional(v.string()), // Lucide icon name or URL

  // Info fields
  price: v.optional(v.string()),
  delay: v.optional(v.string()),
  validity: v.optional(v.string()),  // e.g. "1 an", "30 jours"
  isUrgent: v.optional(v.boolean()), // For urgent badge display
  notes: v.optional(v.string()),     // Important notes about the service
  
  // Lists
  requirements: v.optional(v.array(v.string())), // Legacy list of required documents/steps
  requiredDocuments: v.optional(v.array(v.object({
    type: v.string(), // 'document', 'image', etc.
    label: v.string(),
    required: v.boolean()
  }))), // Structured requirements
  
  // Form Schema for dynamic services
  formSchema: v.optional(v.any()), // JSON schema

  // Action
  actionLink: v.optional(v.string()),
  isOnline: v.boolean(),
  
  isActive: v.boolean(),
  order: v.optional(v.number()), // For sorting
})
  .index("by_slug", ["slug"])
  .index("by_category", ["category", "isActive"]);
