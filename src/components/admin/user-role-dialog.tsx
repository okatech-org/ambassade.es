"use client";

import { api } from "@convex/_generated/api";
import type { Doc } from "@convex/_generated/dataModel";
import { useId, useState } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useConvexMutationQuery } from "@/integrations/convex/hooks";
import {
	ADMIN_MODULE_LABELS,
	ADMIN_MODULES,
	type AdminModule,
} from "@/lib/admin-modules";

interface UserRoleDialogProps {
	user: Doc<"users">;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function UserRoleDialog({
	user,
	open,
	onOpenChange,
}: UserRoleDialogProps) {
	const { t } = useTranslation();
	const [selectedRole, setSelectedRole] = useState<"user" | "admin">(
		((user as any).role as "user" | "admin") || "user",
	);
	const [selectedModules, setSelectedModules] = useState<AdminModule[]>(
		(user as any).allowedModules || [],
	);
	const moduleIdBase = useId();

	const { mutate: updateRole, isPending } = useConvexMutationQuery(
		api.functions.admin.updateUserRole,
	);

	const userName =
		user.firstName && user.lastName
			? `${user.firstName} ${user.lastName}`
			: user.email;

	const toggleModule = (moduleId: AdminModule, checked: boolean) => {
		setSelectedModules((prev) => {
			if (checked) return Array.from(new Set([...prev, moduleId]));
			return prev.filter((m) => m !== moduleId);
		});
	};

	const handleConfirm = async () => {
		try {
			await updateRole({
				userId: user._id,
				role: selectedRole as any,
				allowedModules: selectedRole === "admin" ? selectedModules : undefined,
			});
			toast.success(t("superadmin.users.actions.editRole") + " ✓");
			onOpenChange(false);
		} catch (_error) {
			toast.error(t("superadmin.common.error"));
		}
	};

	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent className="max-h-[90vh] flex flex-col">
				<AlertDialogHeader>
					<AlertDialogTitle>
						{t("superadmin.users.roleDialog.title")}
					</AlertDialogTitle>
					<AlertDialogDescription>
						{t("superadmin.users.roleDialog.description", { name: userName })}
					</AlertDialogDescription>
				</AlertDialogHeader>

				<div className="py-2 flex-1 overflow-y-auto pr-2 -mr-2">
					<Label htmlFor="role-select" className="mb-2 block">
						{t("superadmin.users.columns.role")}
					</Label>
					<Select
						value={selectedRole}
						onValueChange={(value) =>
							setSelectedRole(value as "user" | "admin")
						}
					>
						<SelectTrigger id={`${moduleIdBase}-role-select`}>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="user">
								{t("superadmin.users.roles.user")}
							</SelectItem>
							<SelectItem value="admin">
								{t("superadmin.users.roles.admin", "Admin")}
							</SelectItem>
						</SelectContent>
					</Select>

					{selectedRole === "admin" && (
						<div className="mt-4 space-y-3">
							<Label className="block">
								{t(
									"superadmin.users.roleDialog.modules",
									"Permissions Modulaires",
								)}
							</Label>
							<div className="grid gap-2">
								{ADMIN_MODULES.map((moduleId) => (
									<Label
										key={moduleId}
										htmlFor={`${moduleIdBase}-${moduleId}`}
										className="flex items-start gap-3 rounded-md border border-border p-3 cursor-pointer hover:bg-muted/50 transition-colors"
									>
										<Checkbox
											id={`${moduleIdBase}-${moduleId}`}
											checked={selectedModules.includes(moduleId)}
											onCheckedChange={(checked) =>
												toggleModule(moduleId, Boolean(checked))
											}
										/>
										<div>
											<p className="font-medium text-sm">
												{ADMIN_MODULE_LABELS[moduleId].name}
											</p>
											<p className="text-xs text-muted-foreground">
												{ADMIN_MODULE_LABELS[moduleId].description}
											</p>
										</div>
									</Label>
								))}
							</div>
						</div>
					)}
				</div>

				<AlertDialogFooter className="mt-4">
					<AlertDialogCancel disabled={isPending}>
						{t("superadmin.users.roleDialog.cancel")}
					</AlertDialogCancel>
					<AlertDialogAction onClick={handleConfirm} disabled={isPending}>
						{isPending
							? t("superadmin.common.loading")
							: t("superadmin.users.roleDialog.confirm")}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
