import { QueryCtx, MutationCtx, ActionCtx } from "../_generated/server";
import { AdminModule, UserRole } from "./adminPermissions";
import { error, ErrorCode } from "./errors";

type AuthContext = QueryCtx | MutationCtx;
type UserRecord = Awaited<ReturnType<typeof getCurrentUser>>;

function normalizeRole(user: Record<string, unknown>): UserRole {
  const rawRole = user.role;
  if (rawRole === "user" || rawRole === "admin" || rawRole === "system_admin") {
    return rawRole;
  }
  return user.isSuperadmin === true ? "system_admin" : "user";
}

/**
 * Get user identity from auth provider (Clerk)
 */
export async function getIdentity(ctx: AuthContext | ActionCtx) {
  return await ctx.auth.getUserIdentity();
}

/**
 * Get the current user from database
 * Returns null if not authenticated or user not found
 */
export async function getCurrentUser(ctx: AuthContext) {
  const identity = await getIdentity(ctx);
  if (!identity) return null;

  const user = await ctx.db
    .query("users")
    .withIndex("by_externalId", (q) => q.eq("externalId", identity.subject))
    .unique();

  return user;
}

/**
 * Read user role with legacy fallback support.
 */
export function getUserRole(user: UserRecord | null): UserRole {
  if (!user) return "user";
  return normalizeRole(user as unknown as Record<string, unknown>);
}

/**
 * Require authentication - throws if not authenticated
 */
export async function requireAuth(ctx: AuthContext) {
  const identity = await getIdentity(ctx);
  if (!identity) {
    throw error(ErrorCode.NOT_AUTHENTICATED);
  }

  const user = await ctx.db
    .query("users")
    .withIndex("by_externalId", (q) => q.eq("externalId", identity.subject))
    .unique();

  if (!user) {
    throw error(ErrorCode.USER_NOT_FOUND);
  }

  if (!user.isActive) {
    throw error(ErrorCode.USER_INACTIVE);
  }

  return user;
}

/**
 * Require system_admin role
 */
export async function requireSystemAdmin(ctx: AuthContext) {
  const user = await requireAuth(ctx);

  if (getUserRole(user) !== "system_admin") {
    throw error(ErrorCode.INSUFFICIENT_PERMISSIONS);
  }

  return user;
}

/**
 * Require admin or system_admin role
 */
export async function requireAdmin(ctx: AuthContext) {
  const user = await requireAuth(ctx);
  const role = getUserRole(user);
  if (role === "admin" || role === "system_admin") return user;
  throw error(ErrorCode.INSUFFICIENT_PERMISSIONS);
}

/**
 * Require access to a specific module for admin users.
 * system_admin users always have full access.
 */
export async function requireModule(ctx: AuthContext, moduleId: AdminModule) {
  const user = await requireAdmin(ctx);
  if (getUserRole(user) === "system_admin") return user;
  if (!user.allowedModules?.includes(moduleId)) {
    throw error(ErrorCode.INSUFFICIENT_PERMISSIONS);
  }
  return user;
}

/**
 * Check if current user is system_admin.
 */
export async function isSystemAdmin(ctx: AuthContext): Promise<boolean> {
  const user = await getCurrentUser(ctx);
  return getUserRole(user) === "system_admin";
}

/**
 * Check if current user is admin or system_admin.
 */
export async function isAdmin(ctx: AuthContext): Promise<boolean> {
  const user = await getCurrentUser(ctx);
  const role = getUserRole(user);
  return role === "admin" || role === "system_admin";
}

// Backward-compat aliases
export const requireSuperadmin = requireSystemAdmin;
export const isSuperadmin = isSystemAdmin;
