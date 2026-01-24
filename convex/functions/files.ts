import { v } from "convex/values";
import { mutation } from "../_generated/server";
import { requireSuperadmin } from "../lib/auth";

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    await requireSuperadmin(ctx);
    return await ctx.storage.generateUploadUrl();
  },
});
