import { internalMutation, mutation } from "../_generated/server";
import { v } from "convex/values";
import { ALL_ADMIN_MODULES } from "../lib/adminPermissions";
import { error, ErrorCode } from "../lib/errors";
import { getUserRole } from "../lib/auth";

const DEFAULT_SYSTEM_ADMIN_EMAIL = "admin@okatech.fr";

async function migrateRolesInternal(
  ctx: { db: any },
  systemAdminEmail: string,
) {
  const users = await ctx.db.query("users").collect();
  const normalizedSystemEmail = systemAdminEmail.trim().toLowerCase();

  let migrated = 0;

  for (const user of users) {
    const raw = user as Record<string, unknown>;
    const roleFromLegacy = getUserRole(user);
    const role =
      user.email.trim().toLowerCase() === normalizedSystemEmail
        ? "system_admin"
        : roleFromLegacy;

    const patch: Record<string, unknown> = {};
    if (raw.role !== role) patch.role = role;

    if (role === "system_admin") {
      const currentModules = Array.isArray(raw.allowedModules) ? raw.allowedModules : [];
      const hasAllModules =
        ALL_ADMIN_MODULES.every((moduleId) => currentModules.includes(moduleId)) &&
        currentModules.length === ALL_ADMIN_MODULES.length;
      if (!hasAllModules) {
        patch.allowedModules = ALL_ADMIN_MODULES;
      }
    } else if (role === "admin") {
      if (!Array.isArray(raw.allowedModules)) {
        patch.allowedModules = [];
      }
    } else if (raw.allowedModules !== undefined) {
      patch.allowedModules = undefined;
    }

    if (raw.isSuperadmin !== undefined) {
      patch.isSuperadmin = undefined;
    }

    if (Object.keys(patch).length > 0) {
      patch.updatedAt = Date.now();
      await ctx.db.patch(user._id, patch);
      migrated += 1;
    }
  }

  // Ensure uniqueness of system_admin.
  const updatedUsers = await ctx.db.query("users").collect();
  const systemAdmins = updatedUsers.filter((u: any) => u.role === "system_admin");
  if (systemAdmins.length > 1) {
    const canonical =
      systemAdmins.find((u: any) => u.email.trim().toLowerCase() === normalizedSystemEmail) ??
      systemAdmins[0];

    for (const admin of systemAdmins) {
      if (admin._id === canonical._id) continue;
      await ctx.db.patch(admin._id, {
        role: "admin",
        allowedModules: admin.allowedModules ?? [],
        updatedAt: Date.now(),
      });
      migrated += 1;
    }
  }

  return {
    migratedUsers: migrated,
    totalUsers: users.length,
    systemAdminEmail: normalizedSystemEmail,
  };
}

/**
 * One-shot migration (internal).
 */
export const run = internalMutation({
  args: {
    systemAdminEmail: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await migrateRolesInternal(
      ctx,
      args.systemAdminEmail ?? DEFAULT_SYSTEM_ADMIN_EMAIL,
    );
  },
});

/**
 * Bootstrap migration callable by the designated system admin email.
 */
export const bootstrap = mutation({
  args: {
    systemAdminEmail: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw error(ErrorCode.NOT_AUTHENTICATED);

    const targetEmail = (args.systemAdminEmail ?? DEFAULT_SYSTEM_ADMIN_EMAIL)
      .trim()
      .toLowerCase();
    if ((identity.email ?? "").trim().toLowerCase() !== targetEmail) {
      throw error(
        ErrorCode.INSUFFICIENT_PERMISSIONS,
        "Only the designated system admin email can run bootstrap migration.",
      );
    }

    return await migrateRolesInternal(ctx, targetEmail);
  },
});

/**
 * One-time setup: promote specific emails to admin with all modules.
 */
export const setupAdmins = internalMutation({
  args: {},
  handler: async (ctx) => {
    const adminsToSetup = [
      { email: "madinaandjayi@gmail.com", name: "Madina CHIROL" },
      { email: "ray15ng@yahoo.fr", name: "Ray NGOMONDJAMI" },
    ];

    const results = [];
    for (const admin of adminsToSetup) {
      const user = await ctx.db
        .query("users")
        .withIndex("by_email", (q) => q.eq("email", admin.email))
        .unique();

      if (!user) {
        results.push({ email: admin.email, status: "not_found" });
        continue;
      }

      await ctx.db.patch(user._id, {
        role: "admin",
        allowedModules: ALL_ADMIN_MODULES,
        updatedAt: Date.now(),
      });

      results.push({
        email: admin.email,
        name: admin.name,
        userId: user._id,
        status: "promoted_to_admin",
        modules: ALL_ADMIN_MODULES,
      });
    }

    return results;
  },
});

