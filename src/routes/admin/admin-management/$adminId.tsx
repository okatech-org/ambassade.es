import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserData } from "@/hooks/use-user-data";
import {
	useAuthenticatedConvexQuery,
	useConvexMutationQuery,
} from "@/integrations/convex/hooks";
import {
	ADMIN_MODULE_LABELS,
	ADMIN_MODULES,
	type AdminModule,
} from "@/lib/admin-modules";

export const Route = createFileRoute("/admin/admin-management/$adminId")({
	component: AdminDetailPage,
});

function AdminDetailPage() {
	const { t } = useTranslation();
	const { adminId } = Route.useParams();
	const { isSystemAdmin } = useUserData();
	const [modules, setModules] = useState<AdminModule[]>([]);

	const { data: adminUser, isPending } = useAuthenticatedConvexQuery(
		api.functions.admin.getUser,
		{ userId: adminId as Id<"users"> },
	);
	const { data: auditLogs } = useAuthenticatedConvexQuery(
		api.functions.admin.getUserAuditLogs,
		{ userId: adminId as Id<"users">, limit: 20 },
	);

	const { mutate: updateModules, isPending: savePending } =
		useConvexMutationQuery(api.functions.permissions.updateAdminModules);

	useEffect(() => {
		if (adminUser?.role === "admin") {
			setModules((adminUser.allowedModules ?? []) as AdminModule[]);
		}
	}, [adminUser]);

	if (!isSystemAdmin) {
		return (
			<div className="flex flex-1 flex-col gap-4 p-4 pt-6">
				<Card>
					<CardHeader>
						<CardTitle>Accès refusé</CardTitle>
						<CardDescription>
							Cette section est réservée au System Admin.
						</CardDescription>
					</CardHeader>
				</Card>
			</div>
		);
	}

	if (isPending) {
		return (
			<div className="flex flex-1 flex-col gap-4 p-4 pt-6">
				<Skeleton className="h-24 w-full" />
				<Skeleton className="h-64 w-full" />
			</div>
		);
	}

	if (!adminUser || adminUser.role !== "admin") {
		return (
			<div className="flex flex-1 flex-col gap-4 p-4 pt-6">
				<Card>
					<CardHeader>
						<CardTitle>Admin non trouvé</CardTitle>
						<CardDescription>
							L’utilisateur demandé n’est pas un admin modifiable.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Button asChild variant="outline">
							<Link to="/admin/admin-management">Retour</Link>
						</Button>
					</CardContent>
				</Card>
			</div>
		);
	}

	const toggleModule = (moduleId: AdminModule, checked: boolean) => {
		setModules((prev) => {
			if (checked) return Array.from(new Set([...prev, moduleId]));
			return prev.filter((m) => m !== moduleId);
		});
	};

	const handleSave = async () => {
		try {
			await updateModules({
				userId: adminUser._id,
				allowedModules: modules,
			});
			toast.success("Permissions mises à jour");
		} catch {
			toast.error(t("superadmin.common.error"));
		}
	};

	return (
		<div className="flex flex-1 flex-col gap-4 p-4 pt-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">
						Permissions Admin
					</h1>
					<p className="text-muted-foreground">
						{adminUser.name} ({adminUser.email})
					</p>
				</div>
				<Button asChild variant="outline">
					<Link to="/admin/admin-management">Retour</Link>
				</Button>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Modules autorisés</CardTitle>
					<CardDescription>
						Activez/désactivez les permissions de cet admin.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="grid gap-3 md:grid-cols-2">
						{ADMIN_MODULES.map((moduleId) => (
							<Label
								key={moduleId}
								htmlFor={`module-${moduleId}`}
								className="flex items-start gap-3 rounded-md border border-border p-3"
							>
								<Checkbox
									id={`module-${moduleId}`}
									checked={modules.includes(moduleId)}
									onCheckedChange={(checked) =>
										toggleModule(moduleId, Boolean(checked))
									}
								/>
								<div>
									<p className="font-medium">
										{ADMIN_MODULE_LABELS[moduleId].name}
									</p>
									<p className="text-xs text-muted-foreground">
										{ADMIN_MODULE_LABELS[moduleId].description}
									</p>
								</div>
							</Label>
						))}
					</div>
					<Button onClick={handleSave} disabled={savePending}>
						Enregistrer
					</Button>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Historique d’activité</CardTitle>
				</CardHeader>
				<CardContent className="space-y-2">
					{(auditLogs ?? []).length === 0 && (
						<p className="text-sm text-muted-foreground">Aucune activité.</p>
					)}
					{(auditLogs ?? []).map((log) => (
						<div key={log._id} className="rounded-md border border-border p-3">
							<div className="flex items-center justify-between gap-4">
								<Badge variant="secondary">{log.action}</Badge>
								<span className="text-xs text-muted-foreground">
									{new Date(log.timestamp).toLocaleString()}
								</span>
							</div>
							{log.details && (
								<pre className="text-xs mt-2 whitespace-pre-wrap break-all text-muted-foreground">
									{log.details}
								</pre>
							)}
						</div>
					))}
				</CardContent>
			</Card>
		</div>
	);
}
