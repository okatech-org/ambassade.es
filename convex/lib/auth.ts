import { QueryCtx, MutationCtx, ActionCtx } from "../_generated/server";
import { error, ErrorCode } from "./errors";

type AuthContext = QueryCtx | MutationCtx;

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
 * Require superadmin role
 */
export async function requireSuperadmin(ctx: AuthContext) {
  const user = await requireAuth(ctx);

  if (!user.isSuperadmin) {
    throw error(ErrorCode.INSUFFICIENT_PERMISSIONS);
  }

  return user;
}

/**
 * Check if current user is superadmin
 */
export async function isSuperadmin(ctx: AuthContext): Promise<boolean> {
  const user = await getCurrentUser(ctx);
  return user?.isSuperadmin ?? false;
}
