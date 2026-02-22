import { api } from "@convex/_generated/api";
import type { Doc, Id } from "@convex/_generated/dataModel";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
	Briefcase,
	ExternalLink,
	Eye,
	LayoutGrid,
	List,
	Mail,
	Shield,
} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CreateUserDialog } from "@/components/admin/CreateUserDialog";
import { useImpersonation } from "@/components/admin/ImpersonationProvider";
import { columns } from "@/components/admin/users-columns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserData } from "@/hooks/use-user-data";
import { useAuthenticatedConvexQuery } from "@/integrations/convex/hooks";

export const Route = createFileRoute("/admin/users/")({
	component: UsersPage,
});

function UsersPage() {
	const { t } = useTranslation();
	const { isSystemAdmin } = useUserData();
	const navigate = useNavigate();
	const { startImpersonation } = useImpersonation();
	const [viewMode, setViewMode] = useState<"table" | "cards">(() => {
		if (typeof window !== "undefined") {
			return (
				(localStorage.getItem("users_view_mode") as "table" | "cards") ||
				"cards"
			);
		}
		return "cards";
	});
	const [search, setSearch] = useState("");

	const {
		data: users,
		isPending,
		error,
	} = useAuthenticatedConvexQuery(api.functions.admin.listUsers, {});

	const toggleView = (mode: "table" | "cards") => {
		setViewMode(mode);
		localStorage.setItem("users_view_mode", mode);
	};

	const filterableColumns = [
		{
			id: "role",
			title: t("superadmin.users.filters.allRoles"),
			options: [
				{ label: t("superadmin.users.roles.user"), value: "user" },
				{ label: t("superadmin.users.roles.admin", "Admin"), value: "admin" },
				{
					label: t("superadmin.users.roles.system_admin", "System Admin"),
					value: "system_admin",
				},
			],
		},
		{
			id: "isActive",
			title: t("superadmin.users.filters.allStatus"),
			options: [
				{ label: t("superadmin.users.filters.active"), value: "true" },
				{ label: t("superadmin.users.filters.inactive"), value: "false" },
			],
		},
	];

	// Filter users for card view
	const filteredUsers = (users ?? []).filter((u) => {
		if (!search) return true;
		const q = search.toLowerCase();
		return (
			u.name?.toLowerCase().includes(q) ||
			u.email.toLowerCase().includes(q) ||
			u.poste?.toLowerCase().includes(q)
		);
	});

	if (error) {
		return (
			<div className="flex flex-1 flex-col gap-4 p-4 pt-6">
				<div className="text-destructive">{t("superadmin.common.error")}</div>
			</div>
		);
	}

	return (
		<div className="flex flex-1 flex-col gap-6 p-4 md:p-8 pt-6 max-w-[1600px] mx-auto w-full">
			<div className="flex items-center justify-between mb-2">
				<div>
					<h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gradient">
						{t("superadmin.users.title")}
					</h1>
					<p className="text-muted-foreground mt-1 font-medium">
						{t("superadmin.users.description")}
					</p>
				</div>
				<div className="flex items-center gap-2">
					{/* View Toggle */}
					<div className="flex items-center border rounded-lg p-0.5 bg-muted/50">
						<Button
							type="button"
							variant={viewMode === "cards" ? "default" : "ghost"}
							size="sm"
							className="h-7 px-2"
							onClick={() => toggleView("cards")}
							title="Vue cartes"
						>
							<LayoutGrid className="w-4 h-4" />
						</Button>
						<Button
							type="button"
							variant={viewMode === "table" ? "default" : "ghost"}
							size="sm"
							className="h-7 px-2"
							onClick={() => toggleView("table")}
							title="Vue tableau"
						>
							<List className="w-4 h-4" />
						</Button>
					</div>
					{isSystemAdmin && <CreateUserDialog />}
				</div>
			</div>

			{viewMode === "table" ? (
				<div className="glass-card p-4 rounded-xl">
					<DataTable
						columns={columns}
						data={users ?? []}
						searchKey="email"
						searchPlaceholder={t("superadmin.users.filters.searchPlaceholder")}
						filterableColumns={filterableColumns}
						isLoading={isPending}
					/>
				</div>
			) : (
				<>
					{/* Search bar for card view */}
					<Input
						placeholder="Rechercher par nom, email ou poste..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="max-w-sm"
					/>

					{isPending ? (
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
							{Array.from({ length: 8 }).map((_, i) => (
								<Skeleton
									key={`skel-${i.toString()}`}
									className="h-48 rounded-xl"
								/>
							))}
						</div>
					) : (
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
							{filteredUsers.map((user) => (
								<UserCard
									key={user._id}
									user={user}
									onView={() =>
										navigate({
											to: "/admin/users/$userId",
											params: { userId: String(user._id) } as never,
										})
									}
									onImpersonate={() => {
										startImpersonation(user._id as Id<"users">);
										navigate({ to: "/admin" });
									}}
								/>
							))}
							{filteredUsers.length === 0 && (
								<div className="col-span-full text-center text-muted-foreground py-12">
									Aucun utilisateur trouvé
								</div>
							)}
						</div>
					)}
				</>
			)}
		</div>
	);
}

// ── User Card Component ──────────────────────────────────────────────────────

type UserWithRole = Doc<"users"> & { role?: string };

function UserCard({
	user,
	onView,
	onImpersonate,
}: {
	user: UserWithRole;
	onView: () => void;
	onImpersonate: () => void;
}) {
	const role = user.role ?? "user";
	const initials =
		user.name?.slice(0, 2).toUpperCase() || user.email[0].toUpperCase();

	const roleConfig = {
		system_admin: {
			label: "System Admin",
			variant: "destructive" as const,
			color: "border-red-500/30",
		},
		admin: {
			label: "Admin",
			variant: "default" as const,
			color: "border-blue-500/30",
		},
		user: {
			label: "Utilisateur",
			variant: "secondary" as const,
			color: "border-border",
		},
	};

	const cfg = roleConfig[role as keyof typeof roleConfig] ?? roleConfig.user;

	return (
		<Card
			className={`group relative overflow-hidden transition-all hover:shadow-lg hover:shadow-primary/5 cursor-pointer border-l-4 ${cfg.color}`}
			onClick={onView}
		>
			<CardHeader className="pb-3">
				<div className="flex items-start gap-3">
					<div className="relative">
						<Avatar className="h-12 w-12">
							<AvatarImage src={user.avatarUrl} />
							<AvatarFallback className="text-sm font-semibold bg-primary/10 text-primary">
								{initials}
							</AvatarFallback>
						</Avatar>
						{/* Status dot */}
						<div
							className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-background ${
								user.isActive ? "bg-green-500" : "bg-muted-foreground/50"
							}`}
						/>
					</div>
					<div className="flex-1 min-w-0">
						<h3 className="font-semibold text-sm truncate">{user.name}</h3>
						<Badge variant={cfg.variant} className="text-[10px] h-4 mt-0.5">
							<Shield className="w-2.5 h-2.5 mr-0.5" />
							{cfg.label}
						</Badge>
					</div>
				</div>
			</CardHeader>
			<CardContent className="pt-0 space-y-2">
				<div className="flex items-center gap-1.5 text-xs text-muted-foreground">
					<Mail className="w-3 h-3 shrink-0" />
					<span className="truncate">{user.email}</span>
				</div>
				{user.poste && (
					<div className="flex items-center gap-1.5 text-xs text-primary/80">
						<Briefcase className="w-3 h-3 shrink-0" />
						<span className="truncate">{user.poste}</span>
					</div>
				)}

				{/* Action buttons */}
				<div className="flex items-center gap-1.5 pt-2 border-t border-border/40">
					<Button
						type="button"
						variant="ghost"
						size="sm"
						className="h-7 px-2 text-xs flex-1 gap-1"
						onClick={(e) => {
							e.stopPropagation();
							onView();
						}}
					>
						<Eye className="w-3 h-3" />
						Profil
					</Button>
					<Button
						type="button"
						variant="ghost"
						size="sm"
						className="h-7 px-2 text-xs flex-1 gap-1 text-primary"
						onClick={(e) => {
							e.stopPropagation();
							onImpersonate();
						}}
						title="Accès direct à l'espace utilisateur"
					>
						<ExternalLink className="w-3 h-3" />
						Accès direct
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
