import { api } from "@convex/_generated/api";
import { createFileRoute } from "@tanstack/react-router";
import {
	ArrowDownRight,
	ArrowUpRight,
	BarChart3,
	Calendar,
	Eye,
	FileText,
	Lightbulb,
	Minus,
	Sparkles,
	Target,
	TrendingDown,
	TrendingUp,
	Zap,
} from "lucide-react";
import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthenticatedConvexQuery } from "@/integrations/convex/hooks";

export const Route = createFileRoute("/admin/analytics/")({
	component: AdminAnalyticsPage,
});

const SECTION_COLORS = [
	"#2563eb",
	"#0ea5e9",
	"#10b981",
	"#f59e0b",
	"#ef4444",
	"#8b5cf6",
	"#ec4899",
	"#14b8a6",
];

const RECOMMENDATION_ICONS: Record<string, string> = {
	interest: "🎯",
	growth: "📈",
	decline: "📉",
	timing: "⏰",
	content: "📝",
	opportunity: "💡",
};

function AdminAnalyticsPage() {
	const { data: insights, isPending } = useAuthenticatedConvexQuery(
		api.functions.analytics.getAdvancedInsights,
		{},
	);
	const { data: topPages, isPending: topPending } = useAuthenticatedConvexQuery(
		api.functions.analytics.getTopPages,
		{ limit: 10 },
	);

	if (isPending) {
		return (
			<div className="flex flex-1 flex-col gap-6 p-4 md:p-6 pt-6">
				<div className="flex items-center gap-3">
					<div className="p-2.5 rounded-xl bg-primary/10">
						<BarChart3 className="w-6 h-6 text-primary" />
					</div>
					<div>
						<h1 className="text-2xl md:text-3xl font-bold tracking-tight">
							Analyse comportementale
						</h1>
						<p className="text-sm text-muted-foreground">
							Chargement des données...
						</p>
					</div>
				</div>
				<div className="grid gap-4 md:grid-cols-4">
					{[1, 2, 3, 4].map((i) => (
						<Skeleton key={i} className="h-28 w-full rounded-xl" />
					))}
				</div>
				<Skeleton className="h-64 w-full rounded-xl" />
			</div>
		);
	}

	if (!insights) return null;

	const {
		overview,
		dailyTrend,
		weekdayActivity,
		sectionInterests,
		pageGrowth,
		engagementCategories,
		recommendations,
	} = insights;

	const maxDaily = Math.max(...dailyTrend.map((d) => d.count), 1);
	const maxWeekday = Math.max(...weekdayActivity.map((d) => d.count), 1);
	const maxTop = Math.max(...(topPages ?? []).map((r) => r.viewCount), 1);
	const totalEngagement =
		engagementCategories.high +
		engagementCategories.medium +
		engagementCategories.low;

	return (
		<div className="flex flex-1 flex-col gap-6 p-4 md:p-6 pt-6">
			{/* ─── Header ──────────────────────────────────────────────── */}
			<div>
				<div className="flex items-center gap-3 mb-1">
					<div className="p-2.5 rounded-xl bg-primary/10">
						<BarChart3 className="w-6 h-6 text-primary" />
					</div>
					<div>
						<h1 className="text-2xl md:text-3xl font-bold tracking-tight">
							Analyse comportementale
						</h1>
						<p className="text-sm text-muted-foreground">
							Comprendre les intérêts des visiteurs pour améliorer vos services
						</p>
					</div>
				</div>
			</div>

			{/* ─── KPI Cards ───────────────────────────────────────────── */}
			<div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
				<KPICard
					title="Vues totales"
					value={overview.totalViews.toLocaleString("fr-FR")}
					icon={<Eye className="w-4 h-4" />}
					color="blue"
					subtitle={`${overview.uniquePages} pages uniques`}
				/>
				<KPICard
					title="Tendance hebdo"
					value={`${overview.growthPercent > 0 ? "+" : ""}${overview.growthPercent}%`}
					icon={
						overview.growthPercent >= 0 ? (
							<TrendingUp className="w-4 h-4" />
						) : (
							<TrendingDown className="w-4 h-4" />
						)
					}
					color={overview.growthPercent >= 0 ? "green" : "red"}
					subtitle={`${overview.thisWeekViews} vs ${overview.lastWeekViews}`}
				/>
				<KPICard
					title="Moy. par page"
					value={overview.avgViewsPerPage.toString()}
					icon={<FileText className="w-4 h-4" />}
					color="violet"
					subtitle="vues en moyenne"
				/>
				<KPICard
					title="Jour le plus actif"
					value={overview.peakDay}
					icon={<Calendar className="w-4 h-4" />}
					color="amber"
					subtitle="meilleure visibilité"
				/>
			</div>

			{/* ─── Daily Trend (30 days) ───────────────────────────────── */}
			<Card>
				<CardHeader>
					<div className="flex items-center justify-between">
						<div>
							<CardTitle className="text-base flex items-center gap-2">
								<TrendingUp className="w-4 h-4 text-primary" />
								Évolution du trafic
							</CardTitle>
							<CardDescription>
								30 derniers jours — vues quotidiennes
							</CardDescription>
						</div>
						<Badge variant="secondary" className="font-mono text-xs">
							{overview.thisWeekViews} cette semaine
						</Badge>
					</div>
				</CardHeader>
				<CardContent>
					<div className="flex items-end gap-[3px] h-44">
						{dailyTrend.map((entry, i) => {
							const heightPct = Math.max(4, (entry.count / maxDaily) * 100);
							const isThisWeek = i >= dailyTrend.length - 7;
							return (
								<div
									key={entry.date}
									className="flex-1 flex flex-col items-center gap-1 group"
								>
									<div className="w-full h-36 flex items-end">
										<div
											className={`w-full rounded-t transition-all duration-200 group-hover:opacity-80 ${
												isThisWeek ? "bg-primary" : "bg-primary/30"
											}`}
											style={{ height: `${heightPct}%` }}
											title={`${entry.date}: ${entry.count} vues`}
										/>
									</div>
									{(i % 5 === 0 || i === dailyTrend.length - 1) && (
										<span className="text-[9px] text-muted-foreground">
											{entry.date.slice(5)}
										</span>
									)}
								</div>
							);
						})}
					</div>
				</CardContent>
			</Card>

			{/* ─── Row 2: Interests + Weekday Activity ─────────────────── */}
			<div className="grid gap-6 lg:grid-cols-5">
				{/* Section Interests — 3/5 */}
				<Card className="lg:col-span-3">
					<CardHeader>
						<CardTitle className="text-base flex items-center gap-2">
							<Target className="w-4 h-4 text-primary" />
							Centres d'intérêt des visiteurs
						</CardTitle>
						<CardDescription>
							Répartition des consultations — identifiez les services les plus
							demandés
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-3">
						{sectionInterests.slice(0, 8).map((section, i) => (
							<div key={section.section} className="flex items-center gap-3">
								<span
									className="w-3 h-3 rounded-full shrink-0"
									style={{
										backgroundColor: SECTION_COLORS[i % SECTION_COLORS.length],
									}}
								/>
								<span className="text-sm font-medium flex-1 truncate">
									{section.label}
								</span>
								<div className="w-48 h-2.5 rounded-full bg-muted overflow-hidden shrink-0">
									<div
										className="h-full rounded-full transition-all duration-500"
										style={{
											width: `${section.percent}%`,
											backgroundColor:
												SECTION_COLORS[i % SECTION_COLORS.length],
										}}
									/>
								</div>
								<Badge
									variant="secondary"
									className="font-mono text-xs min-w-[3rem] justify-center"
								>
									{section.percent}%
								</Badge>
								<span className="text-xs text-muted-foreground min-w-[3rem] text-right">
									{section.count}
								</span>
							</div>
						))}
					</CardContent>
				</Card>

				{/* Weekday Activity — 2/5 */}
				<Card className="lg:col-span-2">
					<CardHeader>
						<CardTitle className="text-base flex items-center gap-2">
							<Calendar className="w-4 h-4 text-primary" />
							Activité par jour
						</CardTitle>
						<CardDescription>
							Quand vos visiteurs sont-ils les plus actifs ?
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="flex items-end gap-3 h-40">
							{weekdayActivity.map((day) => {
								const heightPct = Math.max(8, (day.count / maxWeekday) * 100);
								const isPeak = day.day === overview.peakDay.slice(0, 3);
								return (
									<div
										key={day.day}
										className="flex-1 flex flex-col items-center gap-2"
									>
										<span className="text-[10px] text-muted-foreground font-mono">
											{day.count}
										</span>
										<div className="w-full h-24 flex items-end">
											<div
												className={`w-full rounded-t transition-all ${
													isPeak
														? "bg-primary shadow-sm shadow-primary/30"
														: "bg-primary/25"
												}`}
												style={{ height: `${heightPct}%` }}
											/>
										</div>
										<span
											className={`text-xs ${
												isPeak
													? "font-bold text-primary"
													: "text-muted-foreground"
											}`}
										>
											{day.day}
										</span>
									</div>
								);
							})}
						</div>
					</CardContent>
				</Card>
			</div>

			{/* ─── Row 3: Engagement + Growing Pages ───────────────────── */}
			<div className="grid gap-6 lg:grid-cols-2">
				{/* Content Engagement */}
				<Card>
					<CardHeader>
						<CardTitle className="text-base flex items-center gap-2">
							<Zap className="w-4 h-4 text-primary" />
							Score d'engagement du contenu
						</CardTitle>
						<CardDescription>
							Classification de vos pages par niveau de consultation
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-3 gap-4">
							<EngagementBadge
								label="Fort"
								count={engagementCategories.high}
								total={totalEngagement}
								color="green"
							/>
							<EngagementBadge
								label="Moyen"
								count={engagementCategories.medium}
								total={totalEngagement}
								color="amber"
							/>
							<EngagementBadge
								label="Faible"
								count={engagementCategories.low}
								total={totalEngagement}
								color="red"
							/>
						</div>

						{/* Top Pages */}
						{!topPending && topPages && topPages.length > 0 && (
							<div className="mt-6 space-y-2">
								<p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
									Pages les plus consultées
								</p>
								{topPages.slice(0, 6).map((row) => (
									<div key={row._id} className="flex items-center gap-3">
										<div className="flex-1 min-w-0">
											<p className="text-sm truncate">
												{row.title ?? row.path}
											</p>
											<p className="text-[11px] text-muted-foreground truncate">
												{row.path}
											</p>
										</div>
										<div className="w-32 h-2 rounded-full bg-muted overflow-hidden shrink-0">
											<div
												className="h-full rounded-full bg-primary"
												style={{ width: `${(row.viewCount / maxTop) * 100}%` }}
											/>
										</div>
										<span className="text-xs font-mono text-muted-foreground min-w-[2.5rem] text-right">
											{row.viewCount}
										</span>
									</div>
								))}
							</div>
						)}
					</CardContent>
				</Card>

				{/* Pages en croissance */}
				<Card>
					<CardHeader>
						<CardTitle className="text-base flex items-center gap-2">
							<Sparkles className="w-4 h-4 text-primary" />
							Pages en croissance
						</CardTitle>
						<CardDescription>
							Contenus gagnant en popularité cette semaine vs la précédente
						</CardDescription>
					</CardHeader>
					<CardContent>
						{pageGrowth.length === 0 ? (
							<p className="text-sm text-muted-foreground text-center py-8">
								Pas encore assez de données pour détecter des tendances.
							</p>
						) : (
							<div className="space-y-3">
								{pageGrowth.map((page) => (
									<div key={page.path} className="flex items-center gap-3">
										<div className="flex-1 min-w-0">
											<p className="text-sm truncate font-medium">
												{page.title}
											</p>
											<p className="text-[11px] text-muted-foreground truncate">
												{page.path}
											</p>
										</div>
										<Badge
											variant="secondary"
											className={`font-mono text-xs shrink-0 ${
												page.growth > 0
													? "bg-green-500/10 text-green-600"
													: page.growth < 0
														? "bg-red-500/10 text-red-600"
														: ""
											}`}
										>
											{page.growth > 0 ? (
												<ArrowUpRight className="w-3 h-3 mr-1" />
											) : page.growth < 0 ? (
												<ArrowDownRight className="w-3 h-3 mr-1" />
											) : (
												<Minus className="w-3 h-3 mr-1" />
											)}
											{page.growth > 0 ? "+" : ""}
											{page.growth}%
										</Badge>
										<span className="text-xs text-muted-foreground font-mono min-w-[2rem] text-right">
											{page.recentViews}
										</span>
									</div>
								))}
							</div>
						)}
					</CardContent>
				</Card>
			</div>

			{/* ─── Recommendations ─────────────────────────────────────── */}
			{recommendations.length > 0 && (
				<Card className="border-primary/20 bg-primary/[0.02]">
					<CardHeader>
						<CardTitle className="text-base flex items-center gap-2">
							<Lightbulb className="w-4 h-4 text-primary" />
							Recommandations pour votre communication
						</CardTitle>
						<CardDescription>
							Actions suggérées basées sur l'analyse des données de
							fréquentation
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid gap-4 md:grid-cols-2">
							{recommendations.map((rec, i) => (
								<div
									key={`rec-${i}`}
									className="flex items-start gap-3 rounded-lg border bg-background p-4"
								>
									<span className="text-2xl shrink-0">
										{RECOMMENDATION_ICONS[rec.type] ?? "💡"}
									</span>
									<div>
										<p className="text-sm font-semibold">{rec.title}</p>
										<p className="text-xs text-muted-foreground leading-relaxed mt-1">
											{rec.description}
										</p>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			)}
		</div>
	);
}

// ─── KPI Card ────────────────────────────────────────────────────────────────

function KPICard({
	title,
	value,
	icon,
	color,
	subtitle,
}: {
	title: string;
	value: string;
	icon: React.ReactNode;
	color: "blue" | "green" | "red" | "violet" | "amber";
	subtitle: string;
}) {
	const colorClasses: Record<string, string> = {
		blue: "bg-blue-500/10 text-blue-600",
		green: "bg-green-500/10 text-green-600",
		red: "bg-red-500/10 text-red-600",
		violet: "bg-violet-500/10 text-violet-600",
		amber: "bg-amber-500/10 text-amber-600",
	};

	return (
		<Card>
			<CardContent className="p-5">
				<div className="flex items-center gap-3 mb-3">
					<div className={`p-1.5 rounded-lg ${colorClasses[color]}`}>
						{icon}
					</div>
					<span className="text-xs text-muted-foreground font-medium">
						{title}
					</span>
				</div>
				<p className="text-2xl font-bold tracking-tight">{value}</p>
				<p className="text-[11px] text-muted-foreground mt-1">{subtitle}</p>
			</CardContent>
		</Card>
	);
}

// ─── Engagement Badge ────────────────────────────────────────────────────────

function EngagementBadge({
	label,
	count,
	total,
	color,
}: {
	label: string;
	count: number;
	total: number;
	color: "green" | "amber" | "red";
}) {
	const pct = total > 0 ? Math.round((count / total) * 100) : 0;
	const colorClasses: Record<
		string,
		{ bg: string; ring: string; text: string }
	> = {
		green: {
			bg: "bg-green-500/10",
			ring: "ring-green-500/30",
			text: "text-green-600",
		},
		amber: {
			bg: "bg-amber-500/10",
			ring: "ring-amber-500/30",
			text: "text-amber-600",
		},
		red: { bg: "bg-red-500/10", ring: "ring-red-500/30", text: "text-red-600" },
	};
	const c = colorClasses[color];

	return (
		<div className={`${c.bg} rounded-xl p-4 text-center ring-1 ${c.ring}`}>
			<p className={`text-2xl font-bold ${c.text}`}>{count}</p>
			<p className="text-xs text-muted-foreground mt-1">{label}</p>
			<p className={`text-[11px] font-medium ${c.text} mt-0.5`}>{pct}%</p>
		</div>
	);
}
