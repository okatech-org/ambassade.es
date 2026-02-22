"use client";

import { api } from "@convex/_generated/api";
import type { Doc } from "@convex/_generated/dataModel";
import { useNavigate } from "@tanstack/react-router";
import {
	Eye,
	MoreHorizontal,
	Shield,
	Trash2,
	UserCheck,
	UserX,
} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUserData } from "@/hooks/use-user-data";
import { useConvexMutationQuery } from "@/integrations/convex/hooks";
import { UserRoleDialog } from "./user-role-dialog";

interface UserActionsCellProps {
	user: Doc<"users">;
}

type UserWithRole = Doc<"users"> & { role?: string };

export function UserActionsCell({ user }: UserActionsCellProps) {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [showRoleDialog, setShowRoleDialog] = useState(false);
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);
	const { isSystemAdmin } = useUserData();
	const userRole = (user as UserWithRole).role ?? "user";

	const { mutate: enableUser, isPending: isEnabling } = useConvexMutationQuery(
		api.functions.admin.enableUser,
	);

	const { mutate: disableUser, isPending: isDisabling } =
		useConvexMutationQuery(api.functions.admin.disableUser);

	const { mutate: deleteUser, isPending: isDeleting } = useConvexMutationQuery(
		api.functions.admin.deleteUser,
	);

	const handleToggleStatus = async () => {
		if (userRole === "system_admin") {
			toast.error("Action non autorisée sur un system admin");
			return;
		}
		try {
			if (user.isActive) {
				await disableUser({ userId: user._id });
				toast.success(`${t("superadmin.users.actions.disable")} ✓`);
			} else {
				await enableUser({ userId: user._id });
				toast.success(`${t("superadmin.users.actions.enable")} ✓`);
			}
		} catch (_error) {
			toast.error(t("superadmin.common.error"));
		}
	};

	const handleDelete = async () => {
		try {
			await deleteUser({ userId: user._id });
			toast.success(
				t("superadmin.users.actions.deleted", "Utilisateur supprimé"),
			);
			setShowDeleteDialog(false);
		} catch (_error) {
			toast.error(t("superadmin.common.error"));
		}
	};

	const handleView = () => {
		navigate({
			to: "/admin/users/$userId",
			params: { userId: String(user._id) } as never,
		});
	};

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" className="h-8 w-8 p-0">
						<span className="sr-only">Open menu</span>
						<MoreHorizontal className="h-4 w-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuLabel>{user.email}</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						onClick={handleView}
						className="cursor-pointer focus:bg-muted focus:text-foreground"
					>
						<Eye className="mr-2 h-4 w-4" />
						{t("superadmin.common.view")}
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() => setShowRoleDialog(true)}
						disabled={!isSystemAdmin || userRole === "system_admin"}
						className="cursor-pointer focus:bg-muted focus:text-foreground"
					>
						<Shield className="mr-2 h-4 w-4" />
						{t("superadmin.users.actions.editRole")}
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={handleToggleStatus}
						disabled={isEnabling || isDisabling || userRole === "system_admin"}
						className="cursor-pointer focus:bg-muted focus:text-foreground"
					>
						{user.isActive ? (
							<>
								<UserX className="mr-2 h-4 w-4" />
								{t("superadmin.users.actions.disable")}
							</>
						) : (
							<>
								<UserCheck className="mr-2 h-4 w-4" />
								{t("superadmin.users.actions.enable")}
							</>
						)}
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						onClick={() => setShowDeleteDialog(true)}
						disabled={isDeleting || userRole === "system_admin"}
						className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive"
					>
						<Trash2 className="mr-2 h-4 w-4" />
						{t("superadmin.users.actions.delete", "Supprimer")}
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<UserRoleDialog
				user={user}
				open={showRoleDialog}
				onOpenChange={setShowRoleDialog}
			/>

			<AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>
							{t(
								"superadmin.users.delete.title",
								"Supprimer cet utilisateur ?",
							)}
						</AlertDialogTitle>
						<AlertDialogDescription>
							{t(
								"superadmin.users.delete.description",
								"Cette action est irréversible. L'utilisateur {{name}} ({{email}}) sera définitivement supprimé.",
							)
								.replace("{{name}}", user.name || "—")
								.replace("{{email}}", user.email)}
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>
							{t("superadmin.common.cancel", "Annuler")}
						</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleDelete}
							disabled={isDeleting}
							className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
						>
							{isDeleting
								? t("superadmin.common.deleting", "Suppression...")
								: t("superadmin.users.actions.delete", "Supprimer")}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}
