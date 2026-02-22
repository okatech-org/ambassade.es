"use client";

import type { ColumnDef } from "@tanstack/react-table";
import {
	Activity,
	Eye,
	EyeOff,
	Info,
	KeyRound,
	Pencil,
	Settings,
	Shield,
	Trash2,
	UserCog,
	UserMinus,
	UserPlus,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

interface AuditLogRow {
	_id: string;
	userId: string;
	userName: string;
	action: string;
	targetType: string;
	targetId?: string;
	details?: unknown;
	timestamp: number;
}

function formatDate(timestamp: number): string {
	return new Date(timestamp).toLocaleString("fr-FR", {
		year: "numeric",
		month: "short",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
	});
}

type ActionConfig = {
	label: string;
	icon: React.ElementType; // Better type for Lucid icons than just LucideIcon when used as a component
	variant: "default" | "secondary" | "destructive" | "outline";
};

const ACTION_MAP: Record<string, ActionConfig> = {
	inline_edit_create: {
		label: "Création de contenu",
		icon: Pencil,
		variant: "outline",
	},
	inline_edit_update: {
		label: "Modification de contenu",
		icon: Pencil,
		variant: "outline",
	},
	inline_edit_reset: {
		label: "Réinitialisation de contenu",
		icon: Trash2,
		variant: "destructive",
	},
	update_site_settings: {
		label: "Paramètres modifiés",
		icon: Settings,
		variant: "secondary",
	},
	update_security_config: {
		label: "Sécurité modifiée",
		icon: Shield,
		variant: "default",
	},
	set_universal_password: {
		label: "Mot de passe défini",
		icon: KeyRound,
		variant: "default",
	},
	clear_universal_password: {
		label: "Mot de passe supprimé",
		icon: KeyRound,
		variant: "destructive",
	},
	section_hide: {
		label: "Section masquée",
		icon: EyeOff,
		variant: "secondary",
	},
	section_show: {
		label: "Section affichée",
		icon: Eye,
		variant: "default",
	},
	update_user_poste: {
		label: "Poste modifié",
		icon: UserCog,
		variant: "secondary",
	},
	update_user_role: {
		label: "Rôle modifié",
		icon: Shield,
		variant: "default",
	},
	disable_user: {
		label: "Utilisateur désactivé",
		icon: UserMinus,
		variant: "destructive",
	},
	enable_user: {
		label: "Utilisateur activé",
		icon: UserPlus,
		variant: "default",
	},
	delete_user: {
		label: "Utilisateur supprimé",
		icon: Trash2,
		variant: "destructive",
	},
	create_admin: {
		label: "Promotion System Admin",
		icon: Shield,
		variant: "default",
	},
	update_admin_modules: {
		label: "Modules modifiés",
		icon: Settings,
		variant: "secondary",
	},
	revoke_admin: {
		label: "Révocation Admin",
		icon: Shield,
		variant: "destructive",
	},
};

function getActionConfig(action: string): ActionConfig {
	return (
		ACTION_MAP[action] || {
			label: action,
			icon: Activity,
			variant: "secondary",
		}
	);
}

export const columns: ColumnDef<AuditLogRow>[] = [
	{
		accessorKey: "timestamp",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Timestamp" />
		),
		cell: ({ row }) => formatDate(row.getValue("timestamp") as number),
	},
	{
		accessorKey: "userName",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="User" />
		),
		cell: ({ row }) => (
			<span className="text-sm">{row.getValue("userName") || "Unknown"}</span>
		),
	},
	{
		accessorKey: "action",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Action" />
		),
		cell: ({ row }) => {
			const actionConfig = getActionConfig(row.getValue("action"));
			const Icon = actionConfig.icon;
			return (
				<Badge
					variant={actionConfig.variant}
					className="flex items-center gap-1.5 w-max"
				>
					<Icon className="h-3 w-3" />
					{actionConfig.label}
				</Badge>
			);
		},
	},
	{
		accessorKey: "target",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Cible" />
		),
		cell: ({ row }) => {
			const targetType = String(row.original.targetType);
			const targetId = row.original.targetId;

			// Translate common target types
			const typeTranslation: Record<string, string> = {
				user: "Utilisateur",
				site_settings: "Paramètres Globaux",
				inline_content: "Contenu",
				section_visibility: "Section",
			};
			const displayType = typeTranslation[targetType] || targetType;

			return (
				<div className="flex flex-col gap-1">
					<span className="text-sm font-medium">{displayType}</span>
					{targetId && (
						<code className="text-xs text-muted-foreground truncate max-w-48 block">
							{targetId}
						</code>
					)}
				</div>
			);
		},
	},
	{
		accessorKey: "details",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Détails" />
		),
		cell: ({ row }) => {
			const details = row.getValue("details");
			if (!details || Object.keys(details).length === 0) {
				return <span className="text-muted-foreground text-sm">—</span>;
			}

			return (
				<Popover>
					<PopoverTrigger asChild>
						<Button variant="ghost" size="sm" className="h-8 gap-2">
							<Info className="h-4 w-4 text-blue-500" />
							<span>Inspecter</span>
						</Button>
					</PopoverTrigger>
					<PopoverContent
						className="w-[400px] p-0 shadow-lg border-muted"
						align="end"
					>
						<div className="px-4 py-3 border-b bg-muted/30">
							<h4 className="font-semibold text-sm">Informations détaillées</h4>
						</div>
						<div className="p-4 overflow-x-auto max-h-[300px] overflow-y-auto">
							<pre className="text-xs bg-muted/50 p-2 rounded-md font-mono text-muted-foreground">
								{JSON.stringify(details, null, 2)}
							</pre>
						</div>
					</PopoverContent>
				</Popover>
			);
		},
	},
];
