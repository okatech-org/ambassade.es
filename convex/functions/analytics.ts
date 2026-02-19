import { v } from "convex/values";
import { mutation } from "../_generated/server";
import { moduleQuery } from "../lib/customFunctions";

function dayKey(timestamp: number): string {
  return new Date(timestamp).toISOString().slice(0, 10);
}

function toSection(path: string): string {
  const segment = path.split("/").filter(Boolean)[0];
  return segment ? `/${segment}` : "/";
}

/**
 * Public lightweight page-view tracker.
 */
export const trackPageView = mutation({
  args: {
    path: v.string(),
    title: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const today = dayKey(now);
    const existing = await ctx.db
      .query("pageViews")
      .withIndex("by_path", (q) => q.eq("path", args.path))
      .unique();

    if (!existing) {
      await ctx.db.insert("pageViews", {
        path: args.path,
        title: args.title,
        viewCount: 1,
        lastViewedAt: now,
        dailyCounts: [{ date: today, count: 1 }],
      });
      return { ok: true };
    }

    const dailyCounts = [...(existing.dailyCounts ?? [])];
    const idx = dailyCounts.findIndex((entry) => entry.date === today);
    if (idx >= 0) {
      dailyCounts[idx] = { ...dailyCounts[idx], count: dailyCounts[idx].count + 1 };
    } else {
      dailyCounts.push({ date: today, count: 1 });
    }
    // Keep rolling recent window to avoid unbounded growth.
    const trimmedDailyCounts = dailyCounts.slice(-90);

    await ctx.db.patch(existing._id, {
      title: args.title ?? existing.title,
      viewCount: existing.viewCount + 1,
      lastViewedAt: now,
      dailyCounts: trimmedDailyCounts,
    });
    return { ok: true };
  },
});

/**
 * Module-protected: most visited pages.
 */
export const getTopPages = moduleQuery("analytics")({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = Math.max(1, Math.min(args.limit ?? 10, 100));
    return await ctx.db
      .query("pageViews")
      .withIndex("by_viewCount")
      .order("desc")
      .take(limit);
  },
});

/**
 * Module-protected: global page-view stats.
 */
export const getPageViewStats = moduleQuery("analytics")({
  args: {},
  handler: async (ctx) => {
    const rows = await ctx.db.query("pageViews").collect();
    const totalViews = rows.reduce((acc, row) => acc + row.viewCount, 0);
    const lastViewedAt = rows.reduce((max, row) => Math.max(max, row.lastViewedAt), 0);
    const topPages = [...rows].sort((a, b) => b.viewCount - a.viewCount).slice(0, 5);
    const sectionCounts = rows.reduce<Record<string, number>>((acc, row) => {
      const section = toSection(row.path);
      acc[section] = (acc[section] ?? 0) + row.viewCount;
      return acc;
    }, {});
    const sectionBreakdown = Object.entries(sectionCounts)
      .map(([section, count]) => ({ section, count }))
      .sort((a, b) => b.count - a.count);

    return {
      totalViews,
      uniquePages: rows.length,
      lastViewedAt: lastViewedAt || null,
      topPages,
      sectionBreakdown,
    };
  },
});

/**
 * Module-protected: daily aggregated stats for the last N days.
 */
export const getDailyStats = moduleQuery("analytics")({
  args: {
    days: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const days = Math.max(1, Math.min(args.days ?? 30, 365));
    const now = new Date();
    const wantedDates: string[] = [];
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      wantedDates.push(d.toISOString().slice(0, 10));
    }

    const wanted = new Set(wantedDates);
    const totals: Record<string, number> = {};
    for (const date of wantedDates) totals[date] = 0;

    const rows = await ctx.db.query("pageViews").collect();
    for (const row of rows) {
      for (const entry of row.dailyCounts ?? []) {
        if (wanted.has(entry.date)) {
          totals[entry.date] = (totals[entry.date] ?? 0) + entry.count;
        }
      }
    }

    return wantedDates.map((date) => ({
      date,
      count: totals[date] ?? 0,
    }));
  },
});
