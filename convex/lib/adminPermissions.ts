import { v } from "convex/values";

export const USER_ROLES = ["user", "admin", "system_admin"] as const;
export type UserRole = (typeof USER_ROLES)[number];

export const ADMIN_MODULES = [
  "posts",
  "services",
  "announcements",
  "team",
  "users",
  "analytics",
  "settings",
  "inline_edit",
  "audit",
] as const;
export type AdminModule = (typeof ADMIN_MODULES)[number];

export const ALL_ADMIN_MODULES: AdminModule[] = [...ADMIN_MODULES];

// ── Granular page-level actions ──────────────────────────────────────────────

export const PAGE_ACTIONS = [
  "read",
  "edit_hero",
  "edit_text",
  "edit_image",
  "create",
  "delete",
] as const;
export type PageAction = (typeof PAGE_ACTIONS)[number];

export const pageActionValidator = v.union(
  v.literal("read"),
  v.literal("edit_hero"),
  v.literal("edit_text"),
  v.literal("edit_image"),
  v.literal("create"),
  v.literal("delete"),
);

export const pagePermissionValidator = v.object({
  pageSlug: v.string(),
  sections: v.optional(v.array(v.string())),
  actions: v.array(pageActionValidator),
});

export type PagePermission = {
  pageSlug: string;
  sections?: string[];
  actions: PageAction[];
};

// ── Validators ───────────────────────────────────────────────────────────────

export const userRoleValidator = v.union(
  v.literal("user"),
  v.literal("admin"),
  v.literal("system_admin"),
);

export const adminModuleValidator = v.union(
  v.literal("posts"),
  v.literal("services"),
  v.literal("announcements"),
  v.literal("team"),
  v.literal("users"),
  v.literal("analytics"),
  v.literal("settings"),
  v.literal("inline_edit"),
  v.literal("audit"),
);

export function isAdminRole(role: UserRole): boolean {
  return role === "admin" || role === "system_admin";
}

// ── Permission check helpers ─────────────────────────────────────────────────

/**
 * Check if a user has a specific action on a specific page/section.
 * system_admin always returns true.
 */
export function hasPagePermission(
  role: UserRole,
  pagePermissions: PagePermission[] | undefined,
  pageSlug: string,
  action: PageAction,
  sectionId?: string,
): boolean {
  if (role === "system_admin") return true;
  if (!pagePermissions) return false;

  const perm = pagePermissions.find((p) => p.pageSlug === pageSlug);
  if (!perm) return false;
  if (!perm.actions.includes(action)) return false;

  // If sections are restricted, check section access
  if (sectionId && perm.sections && perm.sections.length > 0) {
    return perm.sections.includes(sectionId);
  }

  return true;
}

