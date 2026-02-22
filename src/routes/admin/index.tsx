import { api } from "@convex/_generated/api";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
	BarChart3,
	Bell,
	FileText,
	Newspaper,
	Pencil,
	Plus,
	Users,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserData } from "@/hooks/use-user-data";
import { useAuthenticatedConvexQuery } from "@/integrations/convex/hooks";

export const Route = createFileRoute("/admin/")({
	component: SuperadminDashboard,
});

function SuperadminDashboard() {
	const { t } = useTranslation();
	const { hasModule } = useUserData();

	const { data: stats, isPending } = useAuthenticatedConvexQuery(
		api.functions.admin.getStats,
		{},
	);

	const canPosts = hasModule("posts");
	const canServices = hasModule("services");
	const canAnnouncements = hasModule("announcements");
	const canUsers = hasModule("users");
	const canAnalytics = hasModule("analytics");
	const canInlineEdit = hasModule("inline_edit");

	return (
		<div className="flex flex-1 flex-col gap-6 p-4 md:p-8 pt-6 max-w-[1600px] mx-auto w-full">
			<div className="flex items-center justify-between mb-2">
				<div>
					<h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gradient">
						{t("superadmin.dashboard.title")}
					</h1>
					<p className="text-muted-foreground mt-1 font-medium">
						{t("superadmin.dashboard.welcome")}
					</p>
				</div>
			</div>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				{canUsers && (
					<Card className="glass-card overflow-hidden group">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								{t("superadmin.dashboard.stats.users")}
							</CardTitle>
							<div className="p-2 bg-[var(--google-blue-bg)] rounded-xl text-blue-600 group-hover:scale-110 transition-transform">
								<Users className="h-4 w-4" />
							</div>
						</CardHeader>
						<CardContent>
							<div className="text-3xl font-bold">
								{isPending ? (
									<Skeleton className="h-8 w-16" />
								) : (
									(stats?.users.total ?? 0)
								)}
							</div>
							<p className="text-xs text-muted-foreground mt-1">
								{t("superadmin.dashboard.stats.totalUsers")}
							</p>
						</CardContent>
					</Card>
				)}

				{canPosts && (
					<Card className="glass-card overflow-hidden group">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								{t("superadmin.dashboard.stats.posts", "Actualités")}
							</CardTitle>
							<div className="p-2 bg-[var(--google-red-bg)] rounded-xl text-red-600 group-hover:scale-110 transition-transform">
								<Newspaper className="h-4 w-4" />
							</div>
						</CardHeader>
						<CardContent>
							<div className="text-3xl font-bold">
								{isPending ? (
									<Skeleton className="h-8 w-16" />
								) : (
									(stats?.posts?.published ?? 0)
								)}
							</div>
							<p className="text-xs text-muted-foreground mt-1">
								{t(
									"superadmin.dashboard.stats.publishedPosts",
									"Articles publiés",
								)}
							</p>
						</CardContent>
					</Card>
				)}

				{canServices && (
					<Card className="glass-card overflow-hidden group">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								{t("superadmin.dashboard.stats.services")}
							</CardTitle>
							<div className="p-2 bg-[var(--google-green-bg)] rounded-xl text-green-600 group-hover:scale-110 transition-transform">
								<FileText className="h-4 w-4" />
							</div>
						</CardHeader>
						<CardContent>
							<div className="text-3xl font-bold">
								{isPending ? (
									<Skeleton className="h-8 w-16" />
								) : (
									(stats?.services.active ?? 0)
								)}
							</div>
							<p className="text-xs text-muted-foreground mt-1">
								{t("superadmin.dashboard.stats.availableServices")}
							</p>
						</CardContent>
					</Card>
				)}

				{canAnnouncements && (
					<Card className="glass-card overflow-hidden group">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								{t("superadmin.dashboard.stats.announcements", "Annonces")}
							</CardTitle>
							<div className="p-2 bg-[var(--google-yellow-bg)] rounded-xl text-yellow-600 group-hover:scale-110 transition-transform">
								<Bell className="h-4 w-4" />
							</div>
						</CardHeader>
						<CardContent>
							<div className="text-3xl font-bold">
								{isPending ? (
									<Skeleton className="h-8 w-16" />
								) : (
									(stats?.announcements?.active ?? 0)
								)}
							</div>
							<p className="text-xs text-muted-foreground mt-1">
								{t(
									"superadmin.dashboard.stats.activeAnnouncements",
									"Annonces actives",
								)}
							</p>
						</CardContent>
					</Card>
				)}

				{canAnalytics && (
					<Card className="glass-card overflow-hidden group">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Pages les plus vues
							</CardTitle>
							<div className="p-2 bg-purple-500/10 rounded-xl text-purple-600 group-hover:scale-110 transition-transform">
								<BarChart3 className="h-4 w-4" />
							</div>
						</CardHeader>
						<CardContent>
							<div className="text-3xl font-bold">
								{isPending ? (
									<Skeleton className="h-8 w-16" />
								) : (
									(stats?.pageViews?.total ?? 0)
								)}
							</div>
							<p className="text-xs text-muted-foreground mt-1">
								Vues agrégées
							</p>
						</CardContent>
					</Card>
				)}
			</div>

			<div className="grid gap-4 md:grid-cols-2">
				<Card className="glass-card">
					<CardHeader>
						<CardTitle>{t("superadmin.dashboard.quickActions")}</CardTitle>
						<CardDescription>
							{t("superadmin.dashboard.quickActionsDesc")}
						</CardDescription>
					</CardHeader>
					<CardContent className="grid gap-2">
						{canPosts && (
							<Button variant="outline" asChild className="justify-start">
								<Link to="/admin/posts">
									<Newspaper className="mr-2 h-4 w-4" />
									{t("superadmin.nav.posts", "Actualités")}
								</Link>
							</Button>
						)}
						{canPosts && (
							<Button variant="outline" asChild className="justify-start">
								<Link to="/admin/posts/new">
									<Plus className="mr-2 h-4 w-4" />
									{t("superadmin.dashboard.addPost", "Nouvelle actualité")}
								</Link>
							</Button>
						)}
						{canServices && (
							<Button variant="outline" asChild className="justify-start">
								<Link to="/admin/services">
									<FileText className="mr-2 h-4 w-4" />
									{t("superadmin.nav.services")}
								</Link>
							</Button>
						)}
						{canAnnouncements && (
							<Button variant="outline" asChild className="justify-start">
								<Link to="/admin/announcements">
									<Bell className="mr-2 h-4 w-4" />
									{t("superadmin.nav.announcements", "Annonces")}
								</Link>
							</Button>
						)}
						{canAnalytics && (
							<Button variant="outline" asChild className="justify-start">
								<Link to="/admin/analytics">
									<BarChart3 className="mr-2 h-4 w-4" />
									Statistiques
								</Link>
							</Button>
						)}
						{canInlineEdit && (
							<Button
								variant="outline"
								className="justify-start"
								onClick={() => {
									if (typeof window !== "undefined") {
										window.localStorage.setItem("inline_edit_level", "full");
										window.location.href = "/";
									}
								}}
							>
								<Pencil className="mr-2 h-4 w-4" />
								Activer le mode édition
							</Button>
						)}
					</CardContent>
				</Card>

				<Card className="glass-card">
					<CardHeader>
						<CardTitle>
							{t("superadmin.dashboard.overview", "Aperçu")}
						</CardTitle>
						<CardDescription>
							{t("superadmin.dashboard.overviewDesc", "État actuel du site")}
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						{canServices && (
							<div className="flex items-center justify-between">
								<span className="text-sm text-muted-foreground">
									Services actifs
								</span>
								<span className="font-medium">
									{stats?.services.active ?? 0}
								</span>
							</div>
						)}
						{canPosts && (
							<div className="flex items-center justify-between">
								<span className="text-sm text-muted-foreground">
									Articles publiés
								</span>
								<span className="font-medium">
									{stats?.posts?.published ?? 0}
								</span>
							</div>
						)}
						{canAnnouncements && (
							<div className="flex items-center justify-between">
								<span className="text-sm text-muted-foreground">
									Annonces actives
								</span>
								<span className="font-medium">
									{stats?.announcements?.active ?? 0}
								</span>
							</div>
						)}
						{canUsers && (
							<div className="flex items-center justify-between">
								<span className="text-sm text-muted-foreground">
									Utilisateurs inscrits
								</span>
								<span className="font-medium">{stats?.users.total ?? 0}</span>
							</div>
						)}
						{canAnalytics && (
							<div className="flex items-center justify-between">
								<span className="text-sm text-muted-foreground">Top page</span>
								<span className="font-medium">
									{stats?.pageViews?.topPages?.[0]?.path ?? "—"}
								</span>
							</div>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
