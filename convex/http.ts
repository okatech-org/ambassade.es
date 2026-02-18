import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";
import { Webhook } from "svix";

const http = httpRouter();

/**
 * Clerk Webhook Handler
 * Syncs user data when users are created/updated in Clerk.
 * Verifies Svix signature to prevent unauthorized requests.
 */
http.route({
  path: "/clerk-users-webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    // ── Verify Svix signature ──────────────────────────────
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error("CLERK_WEBHOOK_SECRET is not set");
      return new Response("Server misconfiguration", { status: 500 });
    }

    const svix_id = request.headers.get("svix-id");
    const svix_timestamp = request.headers.get("svix-timestamp");
    const svix_signature = request.headers.get("svix-signature");

    if (!svix_id || !svix_timestamp || !svix_signature) {
      return new Response("Missing Svix headers", { status: 400 });
    }

    const payloadString = await request.text();

    let result: { type: string; data: Record<string, unknown> };
    try {
      const wh = new Webhook(webhookSecret);
      result = wh.verify(payloadString, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as typeof result;
    } catch (err) {
      console.error("Svix verification failed:", err);
      return new Response("Invalid signature", { status: 401 });
    }

    // ── Process verified event ─────────────────────────────
    try {
      const { type, data } = result;

      if (type === "user.created" || type === "user.updated") {
        const firstName = (data.first_name as string) ?? "";
        const lastName = (data.last_name as string) ?? "";
        const name = `${firstName} ${lastName}`.trim();
        const emails = data.email_addresses as Array<{ email_address: string }>;

        await ctx.runMutation(internal.functions.users.syncFromClerk, {
          externalId: data.id as string,
          email: emails[0]?.email_address ?? "",
          name: name || emails[0]?.email_address || "User",
          avatarUrl: (data.image_url as string) ?? "",
        });
      }

      return new Response(null, { status: 200 });
    } catch (err) {
      console.error("Webhook processing error:", err);
      return new Response("Webhook Error", { status: 400 });
    }
  }),
});

export default http;
