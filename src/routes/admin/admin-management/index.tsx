import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { useMemo, useState } from "react";
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

export const Route = createFileRoute("/admin/admin-management/")({
	component: AdminManagementPage,
});

function AdminManagementPage() {
	const { t } = useTranslation();
	const { isSystemAdmin } = useUserData();
	const [selectedUserId, setSelectedUserId] = useState<string>("");
	const [selectedModules, setSelectedModules] = useState<AdminModule[]>([
		"posts",
		"services",
	]);

	const { data: admins, isPending: adminsPending } =
		useAuthenticatedConvexQuery(api.functions.permissions.listAdmins, {});
	const { data: users, isPending: usersPending } = useAuthenticatedConvexQuery(
		api.functions.admin.listUsers,
		{},
	);

	const { mutate: createAdmin, isPending: createPending } =
		useConvexMutationQuery(api.functions.permissions.createAdmin);
	const { mutate: revokeAdmin, isPending: revokePending } =
		useConvexMutationQuery(api.functions.permissions.revokeAdmin);

	const userCandidates = useMemo(
		() => (users ?? []).filter((u) => u.role === "user"),
		[users],
	);

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

	const toggleModule = (moduleId: AdminModule, checked: boolean) => {
		setSelectedModules((prev) => {
			if (checked) return Array.from(new Set([...prev, moduleId]));
			return prev.filter((m) => m !== moduleId);
		});
	};

	const handleCreateAdmin = async () => {
		if (!selectedUserId) {
			toast.error("Sélectionnez un utilisateur");
			return;
		}
		try {
			await createAdmin({
				userId: selectedUserId as Id<"users">,
				allowedModules: selectedModules,
			});
			toast.success("Admin créé");
			setSelectedUserId("");
		} catch {
			toast.error(t("superadmin.common.error"));
		}
	};

	const handleRevoke = async (userId: Id<"users">) => {
		try {
			await revokeAdmin({ userId });
			toast.success("Droits admin révoqués");
		} catch {
			toast.error(t("superadmin.common.error"));
		}
	};

	return (
		<div className="flex flex-1 flex-col gap-4 p-4 pt-6">
			<div>
				<h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
					<ShieldCheck className="h-7 w-7 text-primary" />
					Gestion des Admins
				</h1>
				<p className="text-muted-foreground">
					Promouvez des utilisateurs et configurez leurs permissions modulaires.
				</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Promouvoir un utilisateur</CardTitle>
					<CardDescription>
						Seul le System Admin peut créer ou révoquer des admins.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					{usersPending ? (
						<Skeleton className="h-10 w-full" />
					) : (
						<select
							className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
							value={selectedUserId}
							onChange={(e) => setSelectedUserId(e.target.value)}
						>
							<option value="">Sélectionner un utilisateur</option>
							{userCandidates.map((user) => (
								<option key={user._id} value={user._id}>
									{user.name} ({user.email})
								</option>
							))}
						</select>
					)}

					<div className="grid gap-3 md:grid-cols-2">
						{ADMIN_MODULES.map((moduleId) => (
							<Label
								key={moduleId}
								htmlFor={`module-${moduleId}`}
								className="flex items-start gap-3 rounded-md border border-border p-3"
							>
								<Checkbox
									id={`module-${moduleId}`}
									checked={selectedModules.includes(moduleId)}
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

					<Button
						onClick={handleCreateAdmin}
						disabled={createPending || !selectedUserId}
					>
						Créer l’admin
					</Button>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Admins existants</CardTitle>
				</CardHeader>
				<CardContent className="space-y-3">
					{adminsPending && <Skeleton className="h-16 w-full" />}
					{!adminsPending && (admins?.length ?? 0) === 0 && (
						<p className="text-sm text-muted-foreground">
							Aucun admin secondaire.
						</p>
					)}
					{(admins ?? []).map((admin) => (
						<div
							key={admin._id}
							className="rounded-lg border border-border p-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between"
						>
							<div>
								<div className="font-medium">
									{admin.name}{" "}
									<span className="text-muted-foreground">({admin.email})</span>
								</div>
								<div className="mt-1 flex flex-wrap gap-1.5">
									{admin.role === "system_admin" && <Badge>System Admin</Badge>}
									{admin.role === "admin" &&
										(admin.allowedModules ?? []).map((moduleId) => (
											<Badge
												key={`${admin._id}-${moduleId}`}
												variant="secondary"
											>
												{moduleId}
											</Badge>
										))}
								</div>
							</div>
							<div className="flex gap-2">
								{admin.role === "admin" && (
									<>
										<Button asChild variant="outline" size="sm">
											<Link
												to="/admin/admin-management/$adminId"
												params={{ adminId: admin._id as string }}
											>
												Modifier
											</Link>
										</Button>
										<Button
											variant="destructive"
											size="sm"
											disabled={revokePending}
											onClick={() => handleRevoke(admin._id as Id<"users">)}
										>
											Révoquer
										</Button>
									</>
								)}
							</div>
						</div>
					))}
				</CardContent>
			</Card>
		</div>
	);
}
