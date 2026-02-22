"use client";

import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";
import type { PageAction, PagePermission } from "@convex/lib/adminPermissions";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
	ArrowLeft,
	Briefcase,
	Calendar,
	Check,
	Eye,
	ImageIcon,
	Loader2,
	Lock,
	Mail,
	PanelTop,
	Phone,
	Plus,
	Save,
	Shield,
	Trash2,
	Type,
} from "lucide-react";
import { useId, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { PAGE_REGISTRY } from "@/config/pages";
import { useUserData } from "@/hooks/use-user-data";
import {
	useAuthenticatedConvexQuery,
	useConvexMutationQuery,
} from "@/integrations/convex/hooks";

export const Route = createFileRoute("/admin/users/$userId")({
	component: UserDetailPage,
});

// ── Constants ────────────────────────────────────────────────────────────────

const ACTIONS: {
	id: PageAction;
	label: string;
	icon: typeof Eye;
	color: string;
}[] = [
	{ id: "read", label: "Lecture", icon: Eye, color: "text-blue-500" },
	{
		id: "edit_hero",
		label: "Héros",
		icon: PanelTop,
		color: "text-pink-500",
	},
	{ id: "edit_text", label: "Texte", icon: Type, color: "text-green-500" },
	{
		id: "edit_image",
		label: "Images",
		icon: ImageIcon,
		color: "text-purple-500",
	},
	{ id: "create", label: "Créer", icon: Plus, color: "text-amber-500" },
	{ id: "delete", label: "Supprimer", icon: Trash2, color: "text-red-500" },
];

const PRESETS = [
	{ label: "Lecture seule", actions: ["read"] as PageAction[] },
	{ label: "Éditeur texte", actions: ["read", "edit_text"] as PageAction[] },
	{
		label: "Éditeur complet",
		actions: ["read", "edit_hero", "edit_text", "edit_image"] as PageAction[],
	},
	{
		label: "Accès total",
		actions: [
			"read",
			"edit_hero",
			"edit_text",
			"edit_image",
			"create",
			"delete",
		] as PageAction[],
	},
];

const PAGE_SLUGS = Object.keys(PAGE_REGISTRY);

// ── Main Page ────────────────────────────────────────────────────────────────

function UserDetailPage() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { userId } = Route.useParams();
	const { isSystemAdmin } = useUserData();

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
					type="button"
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
		<div className="flex flex-1 flex-col gap-4 p-4 pt-6 max-w-4xl">
			<div className="flex items-center gap-4">
				<Button
					type="button"
					variant="ghost"
					size="sm"
					onClick={() => navigate({ to: "/admin/users" })}
				>
					<ArrowLeft className="mr-2 h-4 w-4" />
					{t("superadmin.common.back")}
				</Button>
			</div>

			{/* User Header */}
			<div className="flex items-start gap-6">
				<Avatar className="h-20 w-20">
					<AvatarImage src={user.avatarUrl} />
					<AvatarFallback className="text-2xl">{initials}</AvatarFallback>
				</Avatar>
				<div className="flex-1">
					<div className="flex items-center gap-3 flex-wrap">
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
					{user.poste && (
						<p className="text-sm text-primary font-medium mt-1 flex items-center gap-1.5">
							<Briefcase className="h-3.5 w-3.5" />
							{user.poste}
						</p>
					)}
					<p className="text-muted-foreground flex items-center gap-2 mt-1">
						<Mail className="h-4 w-4" />
						{user.email}
					</p>
				</div>
			</div>

			{/* Informations Card */}
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
								Inscrit le{" "}
								{new Date(user._creationTime).toLocaleDateString("fr-FR", {
									day: "numeric",
									month: "long",
									year: "numeric",
								})}
							</dd>
						</div>
						{user.poste && (
							<div className="flex items-center gap-2">
								<Briefcase className="h-4 w-4 text-muted-foreground" />
								<dd>{user.poste}</dd>
							</div>
						)}
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

			{/* Poste Editor — System Admin only */}
			{isSystemAdmin && (
				<PosteEditor userId={user._id} currentPoste={user.poste} />
			)}

			{/* Page Permissions Editor — System Admin only, for admin users */}
			{isSystemAdmin && user.role === "admin" && (
				<PagePermissionsEditor
					userId={user._id}
					currentPermissions={
						(user.pagePermissions as PagePermission[] | undefined) ?? []
					}
				/>
			)}

			{/* Audit Logs */}
			<Card>
				<CardHeader>
					<CardTitle>Historique d'activité</CardTitle>
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
											{typeof log.details === "string"
												? log.details
												: JSON.stringify(log.details)}
										</p>
									</div>
									<span className="text-xs text-muted-foreground">
										{new Date(log.timestamp).toLocaleString("fr-FR")}
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

// ─── Poste Editor Component ──────────────────────────────────────────────────

function PosteEditor({
	userId,
	currentPoste,
}: {
	userId: Id<"users">;
	currentPoste?: string;
}) {
	const posteId = useId();
	const [poste, setPoste] = useState(currentPoste ?? "");
	const [saved, setSaved] = useState(false);
	const { mutate: updatePoste, isPending } = useConvexMutationQuery(
		api.functions.admin.updateUserPoste,
	);

	const handleSave = async () => {
		try {
			await updatePoste({ userId, poste: poste.trim() || undefined });
			toast.success("Poste mis à jour");
			setSaved(true);
			setTimeout(() => setSaved(false), 2500);
		} catch {
			toast.error("Erreur lors de la mise à jour du poste");
		}
	};

	const hasChanged = poste !== (currentPoste ?? "");

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Briefcase className="h-5 w-5" />
					Poste / Fonction
				</CardTitle>
				<CardDescription>
					Attribuez une fonction officielle à cet utilisateur.
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="space-y-2">
					<Label htmlFor={posteId}>Intitulé du poste</Label>
					<Input
						id={posteId}
						value={poste}
						onChange={(e) => setPoste(e.target.value)}
						placeholder="Ex: Vice-Consule 2, Assistant du CG..."
						className="max-w-md"
					/>
				</div>
				<Separator />
				<div className="flex items-center gap-3">
					<Button
						type="button"
						onClick={handleSave}
						disabled={isPending || !hasChanged}
						className="min-w-[140px]"
					>
						{isPending ? (
							<Loader2 className="w-4 h-4 mr-2 animate-spin" />
						) : saved ? (
							<Check className="w-4 h-4 mr-2 text-green-400" />
						) : (
							<Save className="w-4 h-4 mr-2" />
						)}
						{saved ? "Enregistré !" : "Enregistrer"}
					</Button>
					{saved && (
						<span className="text-sm text-green-600 animate-in fade-in">
							Le poste a été mis à jour.
						</span>
					)}
				</div>
			</CardContent>
		</Card>
	);
}

// ─── Page Permissions Editor Component ───────────────────────────────────────

function PagePermissionsEditor({
	userId,
	currentPermissions,
}: {
	userId: Id<"users">;
	currentPermissions: PagePermission[];
}) {
	const [perms, setPerms] = useState<Record<string, PageAction[]>>(() => {
		const map: Record<string, PageAction[]> = {};
		for (const p of currentPermissions) {
			map[p.pageSlug] = [...p.actions];
		}
		return map;
	});
	const [saved, setSaved] = useState(false);

	const { mutate: updatePermissions, isPending } = useConvexMutationQuery(
		api.functions.admin.updateUserPagePermissions,
	);

	const toggleAction = (slug: string, action: PageAction) => {
		setPerms((prev) => {
			const current = prev[slug] ?? [];
			const next = current.includes(action)
				? current.filter((a) => a !== action)
				: [...current, action];
			return { ...prev, [slug]: next };
		});
	};

	const applyPreset = (slug: string, preset: PageAction[]) => {
		setPerms((prev) => ({ ...prev, [slug]: [...preset] }));
	};

	const clearPage = (slug: string) => {
		setPerms((prev) => {
			const next = { ...prev };
			delete next[slug];
			return next;
		});
	};

	const handleSave = async () => {
		try {
			const pagePermissions = Object.entries(perms)
				.filter(([, actions]) => actions.length > 0)
				.map(([pageSlug, actions]) => ({ pageSlug, actions }));

			await updatePermissions({ userId, pagePermissions });
			toast.success("Permissions mises à jour");
			setSaved(true);
			setTimeout(() => setSaved(false), 2500);
		} catch {
			toast.error("Erreur lors de la mise à jour des permissions");
		}
	};

	// Check if permissions changed from initial
	const hasChanged = (() => {
		const initialMap: Record<string, PageAction[]> = {};
		for (const p of currentPermissions) {
			initialMap[p.pageSlug] = [...p.actions].sort();
		}
		const currentKeys = Object.keys(perms).filter(
			(k) => (perms[k]?.length ?? 0) > 0,
		);
		const initialKeys = Object.keys(initialMap);
		if (currentKeys.length !== initialKeys.length) return true;
		for (const key of currentKeys) {
			const cur = [...(perms[key] ?? [])].sort();
			const ini = initialMap[key] ?? [];
			if (cur.length !== ini.length || cur.some((a, i) => a !== ini[i]))
				return true;
		}
		return false;
	})();

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Lock className="h-5 w-5" />
					Permissions par page
				</CardTitle>
				<CardDescription>
					Définissez les actions autorisées pour chaque page du site.
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				{/* Actions legend */}
				<div className="flex flex-wrap gap-3 text-xs">
					{ACTIONS.map((a) => (
						<span key={a.id} className="flex items-center gap-1">
							<a.icon className={`w-3.5 h-3.5 ${a.color}`} />
							{a.label}
						</span>
					))}
				</div>

				<Separator />

				{/* Page grid */}
				<div className="space-y-3">
					{PAGE_SLUGS.map((slug) => {
						const page = PAGE_REGISTRY[slug];
						const pageActions = perms[slug] ?? [];
						const Icon = page.icon;

						return (
							<div
								key={slug}
								className="flex items-center gap-3 py-2 px-3 rounded-lg border border-border/40 hover:bg-accent/30 transition-colors"
							>
								{/* Page info */}
								<div className="flex items-center gap-2 min-w-[160px]">
									<Icon className="w-4 h-4 text-muted-foreground shrink-0" />
									<span className="text-sm font-medium truncate">
										{page.title}
									</span>
								</div>

								{/* Action checkboxes */}
								<div className="flex items-center gap-3 flex-1">
									{ACTIONS.map((action) => {
										// Hide "Héros" checkbox for pages without a hero section
										if (action.id === "edit_hero" && !page.hasHero) return null;
										const checked = pageActions.includes(action.id);
										return (
											<div
												key={action.id}
												className="flex items-center gap-1.5 cursor-pointer"
											>
												<Checkbox
													checked={checked}
													onCheckedChange={() => toggleAction(slug, action.id)}
												/>
												<action.icon
													className={`w-3.5 h-3.5 ${checked ? action.color : "text-muted-foreground/40"}`}
												/>
											</div>
										);
									})}
								</div>

								{/* Preset buttons */}
								<div className="flex items-center gap-1">
									{PRESETS.map((preset) => (
										<Button
											key={preset.label}
											type="button"
											variant="ghost"
											size="sm"
											className="h-6 px-1.5 text-[10px] text-muted-foreground hover:text-foreground"
											onClick={() => applyPreset(slug, preset.actions)}
											title={preset.label}
										>
											{preset.label.split(" ")[0]}
										</Button>
									))}
									<Button
										type="button"
										variant="ghost"
										size="sm"
										className="h-6 px-1.5 text-[10px] text-red-400 hover:text-red-600"
										onClick={() => clearPage(slug)}
										title="Retirer tout"
									>
										<Trash2 className="w-3 h-3" />
									</Button>
								</div>
							</div>
						);
					})}
				</div>

				<Separator />

				{/* Save */}
				<div className="flex items-center gap-3">
					<Button
						type="button"
						onClick={handleSave}
						disabled={isPending || !hasChanged}
						className="min-w-[140px]"
					>
						{isPending ? (
							<Loader2 className="w-4 h-4 mr-2 animate-spin" />
						) : saved ? (
							<Check className="w-4 h-4 mr-2 text-green-400" />
						) : (
							<Save className="w-4 h-4 mr-2" />
						)}
						{saved ? "Enregistré !" : "Enregistrer"}
					</Button>
					{saved && (
						<span className="text-sm text-green-600 animate-in fade-in">
							Les permissions ont été mises à jour.
						</span>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
