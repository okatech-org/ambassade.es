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
