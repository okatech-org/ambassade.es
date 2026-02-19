import { v } from "convex/values";
import { query } from "../_generated/server";
import { moduleMutation } from "../lib/customFunctions";
import { logAudit } from "../lib/audit";

const editableFieldTypeValidator = v.union(
  v.literal("text"),
  v.literal("richtext"),
  v.literal("image"),
  v.literal("link"),
);

/**
 * Public: load all editable content blocks for one page.
 */
export const getPageContent = query({
  args: { pagePath: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("editableContent")
      .withIndex("by_pagePath", (q) => q.eq("pagePath", args.pagePath))
      .collect();
  },
});

/**
 * Public: load one editable content block.
 */
export const getContent = query({
  args: { contentKey: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("editableContent")
      .withIndex("by_contentKey", (q) => q.eq("contentKey", args.contentKey))
      .unique();
  },
});

/**
 * Module-protected: update content value (or create if missing).
 */
export const updateContent = moduleMutation("inline_edit")({
  args: {
    contentKey: v.string(),
    pagePath: v.optional(v.string()),
    sectionId: v.optional(v.string()),
    fieldType: v.optional(editableFieldTypeValidator),
    value: v.string(),
    defaultValue: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const existing = await ctx.db
      .query("editableContent")
      .withIndex("by_contentKey", (q) => q.eq("contentKey", args.contentKey))
      .unique();

    if (!existing) {
      if (!args.pagePath || !args.sectionId || !args.fieldType || args.defaultValue === undefined) {
        throw new Error(
          "Missing metadata to create editable content. Provide pagePath, sectionId, fieldType and defaultValue.",
        );
      }
      const id = await ctx.db.insert("editableContent", {
        contentKey: args.contentKey,
        pagePath: args.pagePath,
        sectionId: args.sectionId,
        fieldType: args.fieldType,
        value: args.value,
        defaultValue: args.defaultValue,
        lastEditedBy: ctx.user._id,
        lastEditedAt: now,
      });

      await logAudit(ctx, {
        userId: ctx.user._id,
        userName: ctx.user.name,
        action: "inline_edit_create",
        targetType: "content",
        targetId: args.contentKey,
        details: { contentKey: args.contentKey, pagePath: args.pagePath },
      });

      return await ctx.db.get(id);
    }

    await ctx.db.patch(existing._id, {
      value: args.value,
      defaultValue: args.defaultValue ?? existing.defaultValue,
      lastEditedBy: ctx.user._id,
      lastEditedAt: now,
    });

    await logAudit(ctx, {
      userId: ctx.user._id,
      userName: ctx.user.name,
      action: "inline_edit_update",
      targetType: "content",
      targetId: args.contentKey,
      details: { contentKey: args.contentKey },
    });

    return await ctx.db.get(existing._id);
  },
});

/**
 * Module-protected: reset content to default value.
 */
export const resetContent = moduleMutation("inline_edit")({
  args: { contentKey: v.string() },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("editableContent")
      .withIndex("by_contentKey", (q) => q.eq("contentKey", args.contentKey))
      .unique();

    if (!existing) return null;

    await ctx.db.patch(existing._id, {
      value: existing.defaultValue,
      lastEditedBy: ctx.user._id,
      lastEditedAt: Date.now(),
    });

    await logAudit(ctx, {
      userId: ctx.user._id,
      userName: ctx.user.name,
      action: "inline_edit_reset",
      targetType: "content",
      targetId: args.contentKey,
      details: { contentKey: args.contentKey },
    });

    return await ctx.db.get(existing._id);
  },
});
