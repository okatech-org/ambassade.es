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
	const { hasModule, isSystemAdmin } = useUserData();

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
	const canAdminManagement = isSystemAdmin;

	return (
		<div className="flex flex-1 flex-col gap-4 p-4 pt-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">
						{t("superadmin.dashboard.title")}
					</h1>
					<p className="text-muted-foreground">
						{t("superadmin.dashboard.welcome")}
					</p>
				</div>
			</div>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				{canUsers && (
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								{t("superadmin.dashboard.stats.users")}
							</CardTitle>
							<Users className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">
								{isPending ? (
									<Skeleton className="h-8 w-16" />
								) : (
									(stats?.users.total ?? 0)
								)}
							</div>
							<p className="text-xs text-muted-foreground">
								{t("superadmin.dashboard.stats.totalUsers")}
							</p>
						</CardContent>
					</Card>
				)}

				{canPosts && (
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								{t("superadmin.dashboard.stats.posts", "Actualités")}
							</CardTitle>
							<Newspaper className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">
								{isPending ? (
									<Skeleton className="h-8 w-16" />
								) : (
									(stats?.posts?.published ?? 0)
								)}
							</div>
							<p className="text-xs text-muted-foreground">
								{t(
									"superadmin.dashboard.stats.publishedPosts",
									"Articles publiés",
								)}
							</p>
						</CardContent>
					</Card>
				)}

				{canServices && (
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								{t("superadmin.dashboard.stats.services")}
							</CardTitle>
							<FileText className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">
								{isPending ? (
									<Skeleton className="h-8 w-16" />
								) : (
									(stats?.services.active ?? 0)
								)}
							</div>
							<p className="text-xs text-muted-foreground">
								{t("superadmin.dashboard.stats.availableServices")}
							</p>
						</CardContent>
					</Card>
				)}

				{canAnnouncements && (
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								{t("superadmin.dashboard.stats.announcements", "Annonces")}
							</CardTitle>
							<Bell className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">
								{isPending ? (
									<Skeleton className="h-8 w-16" />
								) : (
									(stats?.announcements?.active ?? 0)
								)}
							</div>
							<p className="text-xs text-muted-foreground">
								{t(
									"superadmin.dashboard.stats.activeAnnouncements",
									"Annonces actives",
								)}
							</p>
						</CardContent>
					</Card>
				)}

				{canAnalytics && (
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Pages les plus vues
							</CardTitle>
							<BarChart3 className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">
								{isPending ? (
									<Skeleton className="h-8 w-16" />
								) : (
									(stats?.pageViews?.total ?? 0)
								)}
							</div>
							<p className="text-xs text-muted-foreground">Vues agrégées</p>
						</CardContent>
					</Card>
				)}
			</div>

			<div className="grid gap-4 md:grid-cols-2">
				<Card>
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
						{canAdminManagement && (
							<Button variant="outline" asChild className="justify-start">
								<Link to="/admin/admin-management">
									<Users className="mr-2 h-4 w-4" />
									Gestion Admins
								</Link>
							</Button>
						)}
					</CardContent>
				</Card>

				<Card>
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
