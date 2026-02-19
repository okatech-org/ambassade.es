import { Id } from "../_generated/dataModel";
import { MutationCtx } from "../_generated/server";

export async function logAudit(
  ctx: MutationCtx,
  args: {
    userId: Id<"users">;
    userName: string;
    action: string;
    targetType: string;
    targetId?: string;
    details?: unknown;
  },
) {
  await ctx.db.insert("auditLog", {
    userId: args.userId,
    userName: args.userName,
    action: args.action,
    targetType: args.targetType,
    targetId: args.targetId,
    details: args.details === undefined ? undefined : JSON.stringify(args.details),
    timestamp: Date.now(),
  });
}
