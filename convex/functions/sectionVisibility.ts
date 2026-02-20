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
  },
  handler: async (ctx, args) => {
    const now = Date.now();

    const existing = await ctx.db
      .query("sectionVisibility")
      .withIndex("by_pagePath_sectionId", (q) =>
        q.eq("pagePath", args.pagePath).eq("sectionId", args.sectionId),
      )
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, {
        hidden: args.hidden,
        lastEditedBy: ctx.user._id,
        lastEditedAt: now,
      });
    } else {
      await ctx.db.insert("sectionVisibility", {
        pagePath: args.pagePath,
        sectionId: args.sectionId,
        hidden: args.hidden,
        lastEditedBy: ctx.user._id,
        lastEditedAt: now,
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
      },
    });

    return { success: true };
  },
});
