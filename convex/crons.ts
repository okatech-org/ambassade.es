import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

// Check for expiring documents daily
crons.daily(
  "check-expiring-documents",
  { hourUTC: 8, minuteUTC: 0 }, // Run at 8am UTC
  internal.crons.expiration.checkDocuments
);

// Sync LinkedIn posts weekly (Monday 6am UTC)
crons.weekly(
  "sync-linkedin-posts",
  { dayOfWeek: "monday", hourUTC: 6, minuteUTC: 0 },
  internal.crons.linkedinSync.syncLinkedInPosts
);

export default crons;
