"use client";

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useAuthenticatedConvexQuery } from "@/integrations/convex/hooks";
import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Mail, Phone, Shield, Calendar } from "lucide-react";

export const Route = createFileRoute("/admin/users/$userId")({
	component: UserDetailPage,
});

function UserDetailPage() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { userId } = Route.useParams();

	const { data: user, isPending: isLoadingUser } = useAuthenticatedConvexQuery(
		api.functions.admin.getUser,
		{ userId: userId as Id<"users"> },
	);

	const { data: auditLogs, isPending: isLoadingLogs } =
		useAuthenticatedConvexQuery(api.functions.admin.getUserAuditLogs, {
			userId: userId as Id<"users">,
			limit: 20,
		});

	if (isLoadingUser) {
		return (
			<div className="flex flex-1 flex-col gap-4 p-4 pt-6">
				<Skeleton className="h-8 w-32" />
				<div className="flex gap-4">
					<Skeleton className="h-20 w-20 rounded-full" />
					<div className="space-y-2">
						<Skeleton className="h-8 w-48" />
						<Skeleton className="h-4 w-32" />
					</div>
				</div>
			</div>
		);
	}

	if (!user) {
		return (
			<div className="flex flex-1 flex-col gap-4 p-4 pt-6">
				<Button
					variant="ghost"
					size="sm"
					onClick={() => navigate({ to: "/admin/users" })}
				>
					<ArrowLeft className="mr-2 h-4 w-4" />
					{t("superadmin.common.back")}
				</Button>
				<div className="text-destructive">Utilisateur non trouvé</div>
			</div>
		);
	}

	const initials =
		user.name?.slice(0, 2).toUpperCase() || user.email[0].toUpperCase();
	const roleLabel =
		user.role === "system_admin"
			? "System Admin"
			: user.role === "admin"
				? "Admin"
				: "User";

	return (
		<div className="flex flex-1 flex-col gap-4 p-4 pt-6">
			<div className="flex items-center gap-4">
				<Button
					variant="ghost"
					size="sm"
					onClick={() => navigate({ to: "/admin/users" })}
				>
					<ArrowLeft className="mr-2 h-4 w-4" />
					{t("superadmin.common.back")}
				</Button>
			</div>

			<div className="flex items-start gap-6">
				<Avatar className="h-20 w-20">
					<AvatarImage src={user.avatarUrl} />
					<AvatarFallback className="text-2xl">{initials}</AvatarFallback>
				</Avatar>
				<div className="flex-1">
					<div className="flex items-center gap-3">
						<h1 className="text-3xl font-bold tracking-tight">{user.name}</h1>
						<Badge variant={user.isActive ? "default" : "outline"}>
							{user.isActive
								? t("superadmin.common.active")
								: t("superadmin.common.inactive")}
						</Badge>
						<Badge
							variant={
								user.role === "system_admin" ? "destructive" : "secondary"
							}
						>
							{roleLabel}
						</Badge>
					</div>
					<p className="text-muted-foreground flex items-center gap-2 mt-1">
						<Mail className="h-4 w-4" />
						{user.email}
					</p>
				</div>
			</div>

			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Shield className="h-5 w-5" />
						Informations
					</CardTitle>
				</CardHeader>
				<CardContent>
					<dl className="grid gap-3">
						{user.phone && (
							<div className="flex items-center gap-2">
								<Phone className="h-4 w-4 text-muted-foreground" />
								<dd>{user.phone}</dd>
							</div>
						)}
						<div className="flex items-center gap-2">
							<Calendar className="h-4 w-4 text-muted-foreground" />
							<dd>
								Inscrit le {new Date(user._creationTime).toLocaleDateString()}
							</dd>
						</div>
						{user.role === "admin" && (
							<div className="flex flex-wrap items-center gap-2">
								<span className="text-sm text-muted-foreground">Modules:</span>
								{(user.allowedModules ?? []).map((moduleId) => (
									<Badge key={moduleId} variant="secondary">
										{moduleId}
									</Badge>
								))}
							</div>
						)}
					</dl>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Historique d’activité</CardTitle>
					<CardDescription>Dernières actions enregistrées</CardDescription>
				</CardHeader>
				<CardContent>
					{isLoadingLogs ? (
						<div className="space-y-2">
							<Skeleton className="h-8 w-full" />
							<Skeleton className="h-8 w-full" />
						</div>
					) : auditLogs && auditLogs.length > 0 ? (
						<div className="space-y-2">
							{auditLogs.map((log) => (
								<div
									key={log._id}
									className="flex items-center justify-between py-2 border-b last:border-0"
								>
									<div>
										<p className="text-sm font-medium">{log.action}</p>
										<p className="text-xs text-muted-foreground">
											{log.details}
										</p>
									</div>
									<span className="text-xs text-muted-foreground">
										{new Date(log.timestamp).toLocaleString()}
									</span>
								</div>
							))}
						</div>
					) : (
						<p className="text-muted-foreground text-center py-4">
							Aucune activité enregistrée
						</p>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
