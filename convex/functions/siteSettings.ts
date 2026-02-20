import { v } from "convex/values";
import {
  systemAdminMutation,
  systemAdminQuery,
} from "../lib/customFunctions";
import { mutation } from "../_generated/server";
import { logAudit } from "../lib/audit";

const SETTINGS_KEY = "global";

/**
 * Helper: get the singleton settings document (READ ONLY).
 */
async function findSettings(ctx: { db: any }) {
  return await ctx.db
    .query("siteSettings")
    .withIndex("by_key", (q: any) => q.eq("key", SETTINGS_KEY))
    .unique();
}

/**
 * Helper: get or create the singleton settings document (MUTATION context only).
 */
async function getOrCreateSettings(ctx: { db: any }) {
  const existing = await findSettings(ctx);
  if (existing) return existing;

  const id = await ctx.db.insert("siteSettings", {
    key: SETTINGS_KEY,
    updatedAt: Date.now(),
  });
  return await ctx.db.get(id);
}

/**
 * System admin: read site settings.
 */
export const getSettings = systemAdminQuery({
  args: {},
  handler: async (ctx) => {
    const settings = await findSettings(ctx);
    return {
      siteName: settings?.siteName ?? "Consulat.ga",
      adminEmail: settings?.adminEmail ?? "contact@consulatdugabon.fr",
      hasUniversalPassword: !!settings?.universalPassword,
      updatedAt: settings?.updatedAt ?? null,
    };
  },
});

/**
 * System admin: update general settings (siteName, adminEmail).
 */
export const updateGeneral = systemAdminMutation({
  args: {
    siteName: v.optional(v.string()),
    adminEmail: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const settings = await getOrCreateSettings(ctx);

    const patch: Record<string, unknown> = { updatedAt: Date.now(), updatedBy: ctx.user._id };
    if (args.siteName !== undefined) patch.siteName = args.siteName;
    if (args.adminEmail !== undefined) patch.adminEmail = args.adminEmail;

    await ctx.db.patch(settings._id, patch);

    await logAudit(ctx, {
      userId: ctx.user._id,
      userName: ctx.user.name,
      action: "update_site_settings",
      targetType: "settings",
      targetId: settings._id,
      details: { siteName: args.siteName, adminEmail: args.adminEmail },
    });

    return true;
  },
});

/**
 * System admin: set or clear the universal password.
 */
export const setUniversalPassword = systemAdminMutation({
  args: {
    password: v.optional(v.string()), // undefined or empty = clear
  },
  handler: async (ctx, args) => {
    const settings = await getOrCreateSettings(ctx);
    const newPassword = args.password?.trim() || undefined;

    await ctx.db.patch(settings._id, {
      universalPassword: newPassword,
      updatedAt: Date.now(),
      updatedBy: ctx.user._id,
    });

    await logAudit(ctx, {
      userId: ctx.user._id,
      userName: ctx.user.name,
      action: newPassword ? "set_universal_password" : "clear_universal_password",
      targetType: "settings",
      targetId: settings._id,
      details: {},
    });

    return true;
  },
});

/**
 * Public: verify if a provided password matches the universal password.
 * Does NOT expose the actual password value.
 */
export const verifyUniversalPassword = mutation({
  args: {
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const settings = await findSettings(ctx);

    if (!settings?.universalPassword) {
      return { valid: false, reason: "no_password_set" };
    }

    return {
      valid: args.password === settings.universalPassword,
      reason: args.password === settings.universalPassword ? "match" : "invalid",
    };
  },
});
