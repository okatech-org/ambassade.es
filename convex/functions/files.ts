import { v } from "convex/values";
import { mutation, query } from "../_generated/server";
import { requireAdmin } from "../lib/auth";

/** General upload URL — any authenticated admin can upload */
export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);
    return await ctx.storage.generateUploadUrl();
  },
});

export const getFileUrl = query({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});
