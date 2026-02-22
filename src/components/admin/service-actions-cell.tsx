"use client";

import { api } from "@convex/_generated/api";
import type { Doc } from "@convex/_generated/dataModel";
import { useNavigate } from "@tanstack/react-router";
import { Edit, MoreHorizontal, Power, PowerOff } from "lucide-react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useConvexMutationQuery } from "@/integrations/convex/hooks";

interface ServiceActionsCellProps {
	service: Doc<"services">;
}

export function ServiceActionsCell({ service }: ServiceActionsCellProps) {
	const { t } = useTranslation();
	const navigate = useNavigate();

	const { mutate: toggleService, isPending } = useConvexMutationQuery(
		api.functions.services.update,
	);

	const handleToggleStatus = async () => {
		try {
			await toggleService({ id: service._id, isActive: !service.isActive });
			toast.success(
				service.isActive
					? t("superadmin.services.actions.disabled")
					: t("superadmin.services.actions.enabled"),
			);
		} catch (_error) {
			toast.error(t("superadmin.common.error"));
		}
	};

	const handleEdit = () => {
		navigate({ to: `/admin/services/${service._id}/edit` as any });
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="h-8 w-8 p-0">
					<span className="sr-only">Open menu</span>
					<MoreHorizontal className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="min-w-max" align="end">
				<DropdownMenuLabel>{service.title}</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={handleEdit}>
					<Edit className="mr-2 h-4 w-4" />
					{t("superadmin.common.edit")}
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={handleToggleStatus} disabled={isPending}>
					{service.isActive ? (
						<>
							<PowerOff className="mr-2 h-4 w-4" />
							{t("superadmin.services.actions.disable")}
						</>
					) : (
						<>
							<Power className="mr-2 h-4 w-4" />
							{t("superadmin.services.actions.enable")}
						</>
					)}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
