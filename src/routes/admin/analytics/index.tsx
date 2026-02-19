import { api } from "@convex/_generated/api";
import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
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

const PIE_COLORS = [
	"#2563eb",
	"#0ea5e9",
	"#10b981",
	"#f59e0b",
	"#ef4444",
	"#8b5cf6",
];

function AdminAnalyticsPage() {
	const { data: topPages, isPending: topPending } = useAuthenticatedConvexQuery(
		api.functions.analytics.getTopPages,
		{ limit: 10 },
	);
	const { data: stats, isPending: statsPending } = useAuthenticatedConvexQuery(
		api.functions.analytics.getPageViewStats,
		{},
	);
	const { data: dailyStats, isPending: dailyPending } =
		useAuthenticatedConvexQuery(api.functions.analytics.getDailyStats, {
			days: 14,
		});

	const maxTop = Math.max(...(topPages ?? []).map((row) => row.viewCount), 1);
	const maxDaily = Math.max(...(dailyStats ?? []).map((row) => row.count), 1);

	const pieStyle = useMemo(() => {
		const sections = stats?.sectionBreakdown ?? [];
		const total = sections.reduce((acc, entry) => acc + entry.count, 0);
		if (!total || sections.length === 0) {
			return { background: "conic-gradient(#e5e7eb 0 100%)" };
		}

		let start = 0;
		const stops = sections.slice(0, PIE_COLORS.length).map((entry, index) => {
			const size = (entry.count / total) * 100;
			const end = start + size;
			const color = PIE_COLORS[index % PIE_COLORS.length];
			const segment = `${color} ${start.toFixed(2)}% ${end.toFixed(2)}%`;
			start = end;
			return segment;
		});
		return { background: `conic-gradient(${stops.join(", ")})` };
	}, [stats?.sectionBreakdown]);

	return (
		<div className="flex flex-1 flex-col gap-4 p-4 pt-6">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">Statistiques</h1>
				<p className="text-muted-foreground">
					Fréquentation des pages et tendances de consultation.
				</p>
			</div>

			<div className="grid gap-4 md:grid-cols-3">
				<Card>
					<CardHeader>
						<CardTitle>Vues totales</CardTitle>
					</CardHeader>
					<CardContent className="text-3xl font-bold">
						{statsPending ? (
							<Skeleton className="h-9 w-24" />
						) : (
							(stats?.totalViews ?? 0)
						)}
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Pages uniques</CardTitle>
					</CardHeader>
					<CardContent className="text-3xl font-bold">
						{statsPending ? (
							<Skeleton className="h-9 w-24" />
						) : (
							(stats?.uniquePages ?? 0)
						)}
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Dernière vue</CardTitle>
					</CardHeader>
					<CardContent className="text-sm text-muted-foreground">
						{statsPending ? (
							<Skeleton className="h-5 w-40" />
						) : stats?.lastViewedAt ? (
							new Date(stats.lastViewedAt).toLocaleString()
						) : (
							"Aucune donnée"
						)}
					</CardContent>
				</Card>
			</div>

			<div className="grid gap-4 lg:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle>Top 10 pages</CardTitle>
						<CardDescription>Pages les plus consultées</CardDescription>
					</CardHeader>
					<CardContent className="space-y-3">
						{topPending && <Skeleton className="h-32 w-full" />}
						{(topPages ?? []).map((row) => (
							<div key={row._id} className="space-y-1">
								<div className="flex items-center justify-between gap-3">
									<span className="text-sm truncate">{row.path}</span>
									<span className="text-xs text-muted-foreground">
										{row.viewCount}
									</span>
								</div>
								<div className="h-2 rounded bg-muted overflow-hidden">
									<div
										className="h-full bg-primary"
										style={{ width: `${(row.viewCount / maxTop) * 100}%` }}
									/>
								</div>
							</div>
						))}
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Évolution quotidienne</CardTitle>
						<CardDescription>14 derniers jours</CardDescription>
					</CardHeader>
					<CardContent className="flex items-end gap-2 h-56">
						{dailyPending && <Skeleton className="h-40 w-full" />}
						{(dailyStats ?? []).map((entry) => (
							<div
								key={entry.date}
								className="flex-1 flex flex-col items-center gap-2"
							>
								<div className="w-full h-40 flex items-end">
									<div
										className="w-full rounded-t bg-blue-500/80"
										style={{
											height: `${Math.max(6, (entry.count / maxDaily) * 100)}%`,
										}}
										title={`${entry.date}: ${entry.count}`}
									/>
								</div>
								<span className="text-[10px] text-muted-foreground">
									{entry.date.slice(5)}
								</span>
							</div>
						))}
					</CardContent>
				</Card>
			</div>

			<div className="grid gap-4 lg:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle>Répartition par section</CardTitle>
						<CardDescription>
							Vue synthétique des sections les plus visitées
						</CardDescription>
					</CardHeader>
					<CardContent className="flex items-center gap-8">
						<div className="w-40 h-40 rounded-full" style={pieStyle} />
						<div className="space-y-2">
							{(stats?.sectionBreakdown ?? [])
								.slice(0, PIE_COLORS.length)
								.map((entry, index) => (
									<div
										key={entry.section}
										className="flex items-center gap-2 text-sm"
									>
										<span
											className="w-3 h-3 rounded-full"
											style={{
												backgroundColor: PIE_COLORS[index % PIE_COLORS.length],
											}}
										/>
										<span>{entry.section}</span>
										<span className="text-muted-foreground">{entry.count}</span>
									</div>
								))}
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Données détaillées</CardTitle>
						<CardDescription>Export visuel rapide</CardDescription>
					</CardHeader>
					<CardContent className="space-y-2">
						{(topPages ?? []).map((row) => (
							<div
								key={`row-${row._id}`}
								className="text-sm flex justify-between border-b pb-2"
							>
								<span className="truncate">{row.path}</span>
								<span className="text-muted-foreground">{row.viewCount}</span>
							</div>
						))}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
