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

/**
 * Module-protected: advanced behavioural insights.
 * Computes engagement trends, section interest breakdown, growth metrics,
 * and actionable communication recommendations from existing pageViews data.
 */
export const getAdvancedInsights = moduleQuery("analytics")({
  args: {},
  handler: async (ctx) => {
    const rows = await ctx.db.query("pageViews").collect();
    const totalViews = rows.reduce((acc, row) => acc + row.viewCount, 0);

    // ── 1. Daily aggregation (last 30 days) ──────────────────────────
    const now = new Date();
    const last30: string[] = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      last30.push(d.toISOString().slice(0, 10));
    }

    const dailyTotals: Record<string, number> = {};
    for (const d of last30) dailyTotals[d] = 0;
    for (const row of rows) {
      for (const entry of row.dailyCounts ?? []) {
        if (entry.date in dailyTotals) {
          dailyTotals[entry.date] += entry.count;
        }
      }
    }

    const dailyArray = last30.map((date) => ({ date, count: dailyTotals[date] }));

    // ── 2. Growth trend (this week vs last week) ─────────────────────
    const thisWeek = dailyArray.slice(-7).reduce((a, d) => a + d.count, 0);
    const lastWeek = dailyArray.slice(-14, -7).reduce((a, d) => a + d.count, 0);
    const growthPercent = lastWeek > 0 ? Math.round(((thisWeek - lastWeek) / lastWeek) * 100) : 0;

    // ── 3. Peak activity (best day of week) ──────────────────────────
    const dayOfWeekTotals: Record<number, number> = {};
    for (const entry of dailyArray) {
      const dow = new Date(entry.date).getDay();
      dayOfWeekTotals[dow] = (dayOfWeekTotals[dow] ?? 0) + entry.count;
    }
    const dayNames = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    const peakDow = Object.entries(dayOfWeekTotals).sort(([, a], [, b]) => b - a)[0];
    const peakDay = peakDow ? dayNames[Number(peakDow[0])] : "N/A";
    const weekdayActivity = dayNames.map((name, i) => ({
      day: name.slice(0, 3),
      count: dayOfWeekTotals[i] ?? 0,
    }));

    // ── 4. Section interests with percentages ────────────────────────
    const sectionTotals: Record<string, number> = {};
    for (const row of rows) {
      const section = toSection(row.path);
      sectionTotals[section] = (sectionTotals[section] ?? 0) + row.viewCount;
    }

    const sectionLabels: Record<string, string> = {
      "/": "Accueil",
      "/services": "Services consulaires",
      "/actualites": "Actualités",
      "/admin": "Administration",
      "/demarches": "Démarches",
      "/contact": "Contact",
      "/a-propos": "À propos",
      "/rendez-vous": "Rendez-vous",
      "/faq": "FAQ",
    };

    const sectionInterests = Object.entries(sectionTotals)
      .map(([section, count]) => ({
        section,
        label: sectionLabels[section] ?? section,
        count,
        percent: totalViews > 0 ? Math.round((count / totalViews) * 100) : 0,
      }))
      .sort((a, b) => b.count - a.count);

    // ── 5. Top growing pages (comparing recent vs older daily counts) ─
    const recentDates = new Set(last30.slice(-7));
    const olderDates = new Set(last30.slice(0, 7));

    const pageGrowth = rows
      .map((row) => {
        let recent = 0;
        let older = 0;
        for (const entry of row.dailyCounts ?? []) {
          if (recentDates.has(entry.date)) recent += entry.count;
          if (olderDates.has(entry.date)) older += entry.count;
        }
        const growth = older > 0 ? Math.round(((recent - older) / older) * 100) : recent > 0 ? 100 : 0;
        return {
          path: row.path,
          title: row.title ?? row.path,
          recentViews: recent,
          growth,
        };
      })
      .filter((p) => p.recentViews > 0)
      .sort((a, b) => b.growth - a.growth)
      .slice(0, 8);

    // ── 6. Content engagement score ──────────────────────────────────
    const avgViews = totalViews / Math.max(rows.length, 1);
    const engagementCategories = {
      high: rows.filter((r) => r.viewCount > avgViews * 1.5).length,
      medium: rows.filter((r) => r.viewCount >= avgViews * 0.5 && r.viewCount <= avgViews * 1.5).length,
      low: rows.filter((r) => r.viewCount < avgViews * 0.5).length,
    };

    // ── 7. Actionable recommendations ────────────────────────────────
    const recommendations: Array<{ type: string; title: string; description: string }> = [];

    // Top interest recommendation
    const topSection = sectionInterests[0];
    if (topSection && topSection.percent > 20) {
      recommendations.push({
        type: "interest",
        title: `${topSection.label} est votre contenu phare`,
        description: `${topSection.percent}% des consultations concernent "${topSection.label}". Enrichissez cette section avec du contenu détaillé et des FAQ.`,
      });
    }

    // Growth recommendation
    if (growthPercent > 10) {
      recommendations.push({
        type: "growth",
        title: `Trafic en hausse de ${growthPercent}%`,
        description: "Profitez de cet élan pour publier du contenu frais et des annonces importantes.",
      });
    } else if (growthPercent < -10) {
      recommendations.push({
        type: "decline",
        title: `Baisse de fréquentation (${growthPercent}%)`,
        description: "Relancez l'engagement avec des annonces, des rappels de services, ou une newsletter.",
      });
    }

    // Peak day recommendation
    if (peakDay !== "N/A") {
      recommendations.push({
        type: "timing",
        title: `${peakDay} est votre jour le plus actif`,
        description: `Publiez vos communications importantes le ${peakDay} pour maximiser la visibilité.`,
      });
    }

    // Low engagement pages
    if (engagementCategories.low > 3) {
      recommendations.push({
        type: "content",
        title: `${engagementCategories.low} pages à faible engagement`,
        description: "Révisez ou fusionnez ces pages peu consultées pour une meilleure expérience.",
      });
    }

    // Under-explored sections
    const underExplored = sectionInterests.filter((s) => s.percent > 0 && s.percent < 5);
    if (underExplored.length > 0) {
      recommendations.push({
        type: "opportunity",
        title: "Sections sous-exploitées",
        description: `${underExplored.map((s) => s.label).join(", ")} ont peu de visites. Ajoutez des liens depuis les pages populaires.`,
      });
    }

    return {
      overview: {
        totalViews,
        uniquePages: rows.length,
        avgViewsPerPage: Math.round(avgViews),
        growthPercent,
        thisWeekViews: thisWeek,
        lastWeekViews: lastWeek,
        peakDay,
      },
      dailyTrend: dailyArray,
      weekdayActivity,
      sectionInterests,
      pageGrowth,
      engagementCategories,
      recommendations,
    };
  },
});
