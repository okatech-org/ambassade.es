import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

// Check for expiring documents daily
crons.daily(
  "check-expiring-documents",
  { hourUTC: 8, minuteUTC: 0 }, // Run at 8am UTC
  internal.crons.expiration.checkDocuments
);

export default crons;
