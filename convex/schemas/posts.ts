import { defineTable } from "convex/server";
import { v } from "convex/values";

export const postsTable = defineTable({
  // === Champs communs ===
  title: v.string(),
  slug: v.string(),
  excerpt: v.string(),
  content: v.string(), // Markdown
  coverImage: v.optional(v.string()), // URL image de couverture
  category: v.union(
    v.literal("actualite"),
    v.literal("evenement"), 
    v.literal("communique")
  ),
  publishedAt: v.number(),
  status: v.union(v.literal("draft"), v.literal("published")),
  
  // === Champs spécifiques ÉVÉNEMENT ===
  eventDate: v.optional(v.number()),        // Date de l'événement (timestamp)
  eventEndDate: v.optional(v.number()),     // Date de fin (si plusieurs jours)
  eventTime: v.optional(v.string()),        // Heure ex: "15h00 - 18h00"
  eventLocation: v.optional(v.string()),    // Nom du lieu
  eventAddress: v.optional(v.string()),     // Adresse complète
  eventMapLink: v.optional(v.string()),     // Lien Google Maps
  ticketLink: v.optional(v.string()),       // Lien billetterie externe
  ticketPrice: v.optional(v.string()),      // Prix ex: "Gratuit" ou "15€"
  
  // === Champs spécifiques COMMUNIQUÉ ===
  documentUrl: v.optional(v.string()),      // URL du PDF officiel
  documentName: v.optional(v.string()),     // Nom du fichier
  referenceNumber: v.optional(v.string()),  // N° de référence officiel
})
  .index("by_slug", ["slug"])
  .index("by_status_date", ["status", "publishedAt"])
  .index("by_category", ["category", "status", "publishedAt"]);

