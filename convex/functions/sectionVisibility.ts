import { v } from "convex/values";
import { query } from "../_generated/server";
import { moduleMutation } from "../lib/customFunctions";
import { logAudit } from "../lib/audit";

/**
 * Public: load visibility state for all sections of a page.
 */
export const getPageSectionVisibility = query({
  args: { pagePath: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("sectionVisibility")
      .withIndex("by_pagePath", (q) => q.eq("pagePath", args.pagePath))
      .collect();
  },
});

/**
 * Module-protected: toggle section visibility (hidden/visible).
 */
export const toggleSectionVisibility = moduleMutation("inline_edit")({
  args: {
    pagePath: v.string(),
    sectionId: v.string(),
    hidden: v.boolean(),
    device: v.optional(v.union(v.literal("desktop"), v.literal("mobile"))),
  },
  handler: async (ctx, args) => {
    const now = Date.now();

    const existing = await ctx.db
      .query("sectionVisibility")
      .withIndex("by_pagePath_sectionId", (q) =>
        q.eq("pagePath", args.pagePath).eq("sectionId", args.sectionId),
      )
      .unique();

    const updatePayload: Record<string, any> = {
      lastEditedBy: ctx.user._id,
      lastEditedAt: now,
    };

    if (args.device === "desktop") {
      updatePayload.hiddenDesktop = args.hidden;
    } else if (args.device === "mobile") {
      updatePayload.hiddenMobile = args.hidden;
    } else {
      updatePayload.hidden = args.hidden;
    }

    if (existing) {
      await ctx.db.patch(existing._id, updatePayload);
    } else {
      await ctx.db.insert("sectionVisibility", {
        pagePath: args.pagePath,
        sectionId: args.sectionId,
        ...updatePayload,
      });
    }

    await logAudit(ctx, {
      userId: ctx.user._id,
      userName: ctx.user.name,
      action: args.hidden ? "section_hide" : "section_show",
      targetType: "section",
      targetId: `${args.pagePath}#${args.sectionId}`,
      details: {
        pagePath: args.pagePath,
        sectionId: args.sectionId,
        hidden: args.hidden,
        device: args.device,
      },
    });

    return { success: true };
  },
});
