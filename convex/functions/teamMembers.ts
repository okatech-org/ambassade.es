import { v } from "convex/values";
import { query, mutation } from "../_generated/server";
import { requireModule } from "../lib/auth";

// Public: List all active team members
export const list = query({
  args: {},
  handler: async (ctx) => {
    const members = await ctx.db
      .query("teamMembers")
      .withIndex("by_active", (q) => q.eq("isActive", true))
      .collect();
    
    // Sort by order
    members.sort((a, b) => a.order - b.order);
    
    // Get photo URLs for members with photos
    const membersWithPhotos = await Promise.all(
      members.map(async (member) => {
        let photoUrl: string | null = null;
        if (member.photoStorageId) {
          photoUrl = await ctx.storage.getUrl(member.photoStorageId);
        }
        return {
          ...member,
          photoUrl,
        };
      })
    );
    
    return membersWithPhotos;
  },
});

// Public: Get the Consul General
export const getConsulGeneral = query({
  args: {},
  handler: async (ctx) => {
    const consul = await ctx.db
      .query("teamMembers")
      .withIndex("by_consul_general", (q) => q.eq("isConsulGeneral", true))
      .filter((q) => q.eq(q.field("isActive"), true))
      .first();
    
    if (!consul) return null;
    
    let photoUrl: string | null = null;
    if (consul.photoStorageId) {
      photoUrl = await ctx.storage.getUrl(consul.photoStorageId);
    }
    
    return {
      ...consul,
      photoUrl,
    };
  },
});

// Admin: List all team members (including inactive)
export const listAll = query({
  args: {},
  handler: async (ctx) => {
    await requireModule(ctx, "team");
    
    const members = await ctx.db
      .query("teamMembers")
      .withIndex("by_order")
      .collect();
    
    const membersWithPhotos = await Promise.all(
      members.map(async (member) => {
        let photoUrl: string | null = null;
        if (member.photoStorageId) {
          photoUrl = await ctx.storage.getUrl(member.photoStorageId);
        }
        return {
          ...member,
          photoUrl,
        };
      })
    );
    
    return membersWithPhotos;
  },
});

// Admin: Get a single team member by ID
export const getById = query({
  args: { id: v.id("teamMembers") },
  handler: async (ctx, args) => {
    await requireModule(ctx, "team");
    
    const member = await ctx.db.get(args.id);
    if (!member) return null;
    
    let photoUrl: string | null = null;
    if (member.photoStorageId) {
      photoUrl = await ctx.storage.getUrl(member.photoStorageId);
    }
    
    return {
      ...member,
      photoUrl,
    };
  },
});

// Admin: Create team member
export const create = mutation({
  args: {
    firstName: v.string(),
    lastName: v.string(),
    role: v.string(),
    description: v.optional(v.string()),
    photoStorageId: v.optional(v.id("_storage")),
    email: v.optional(v.string()),
    linkedIn: v.optional(v.string()),
    isConsulGeneral: v.boolean(),
    isActive: v.boolean(),
  },
  handler: async (ctx, args) => {
    await requireModule(ctx, "team");
    
    // If this is the new Consul General, unset the previous one
    if (args.isConsulGeneral) {
      const currentConsul = await ctx.db
        .query("teamMembers")
        .withIndex("by_consul_general", (q) => q.eq("isConsulGeneral", true))
        .first();
      
      if (currentConsul) {
        await ctx.db.patch(currentConsul._id, { isConsulGeneral: false });
      }
    }
    
    // Get the max order to put this member at the end
    const allMembers = await ctx.db.query("teamMembers").collect();
    const maxOrder = allMembers.reduce((max, m) => Math.max(max, m.order), 0);
    
    return await ctx.db.insert("teamMembers", {
      ...args,
      order: maxOrder + 1,
    });
  },
});

// Admin: Update team member
export const update = mutation({
  args: {
    id: v.id("teamMembers"),
    firstName: v.string(),
    lastName: v.string(),
    role: v.string(),
    description: v.optional(v.string()),
    photoStorageId: v.optional(v.id("_storage")),
    email: v.optional(v.string()),
    linkedIn: v.optional(v.string()),
    isConsulGeneral: v.boolean(),
    isActive: v.boolean(),
  },
  handler: async (ctx, args) => {
    await requireModule(ctx, "team");
    
    const { id, ...fields } = args;
    
    const member = await ctx.db.get(id);
    if (!member) throw new Error("Team member not found");
    
    // If this is the new Consul General, unset the previous one
    if (fields.isConsulGeneral && !member.isConsulGeneral) {
      const currentConsul = await ctx.db
        .query("teamMembers")
        .withIndex("by_consul_general", (q) => q.eq("isConsulGeneral", true))
        .first();
      
      if (currentConsul && currentConsul._id !== id) {
        await ctx.db.patch(currentConsul._id, { isConsulGeneral: false });
      }
    }
    
    await ctx.db.patch(id, fields);
  },
});

// Admin: Delete team member
export const remove = mutation({
  args: { id: v.id("teamMembers") },
  handler: async (ctx, args) => {
    await requireModule(ctx, "team");
    
    const member = await ctx.db.get(args.id);
    if (!member) throw new Error("Team member not found");
    
    // Delete photo from storage if exists
    if (member.photoStorageId) {
      await ctx.storage.delete(member.photoStorageId);
    }
    
    await ctx.db.delete(args.id);
  },
});

// Admin: Reorder team members
export const reorder = mutation({
  args: {
    orderedIds: v.array(v.id("teamMembers")),
  },
  handler: async (ctx, args) => {
    await requireModule(ctx, "team");
    
    // Update order for each member
    for (let i = 0; i < args.orderedIds.length; i++) {
      await ctx.db.patch(args.orderedIds[i], { order: i + 1 });
    }
  },
});

// Admin: Toggle active status
export const toggleActive = mutation({
  args: { id: v.id("teamMembers") },
  handler: async (ctx, args) => {
    await requireModule(ctx, "team");
    
    const member = await ctx.db.get(args.id);
    if (!member) throw new Error("Team member not found");
    
    await ctx.db.patch(args.id, { isActive: !member.isActive });
  },
});

// Generate upload URL for photos
export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    await requireModule(ctx, "team");
    return await ctx.storage.generateUploadUrl();
  },
});
