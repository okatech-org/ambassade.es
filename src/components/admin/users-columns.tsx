"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { UserActionsCell } from "@/components/admin/user-actions-cell";
import { Doc } from "@convex/_generated/dataModel";

type User = Doc<"users">;

function getInitials(name?: string, email?: string): string {
	if (name?.trim()) {
		const parts = name.trim().split(" ");
		if (parts.length >= 2) {
			return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
		}
		return name.slice(0, 2).toUpperCase();
	}
	if (email) {
		return email.slice(0, 2).toUpperCase();
	}
	return "??";
}

function formatDate(timestamp: number): string {
	return new Date(timestamp).toLocaleDateString();
}

function roleLabel(role: string) {
	if (role === "system_admin") return "System Admin";
	if (role === "admin") return "Admin";
	return "User";
}

export const columns: ColumnDef<User>[] = [
	{
		accessorKey: "avatarUrl",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Avatar" />
		),
		cell: ({ row }) => {
			const user = row.original;
			return (
				<Avatar className="h-8 w-8">
					<AvatarImage src={user.avatarUrl} alt={user.email} />
					<AvatarFallback className="text-xs">
						{getInitials(user.name, user.email)}
					</AvatarFallback>
				</Avatar>
			);
		},
		enableSorting: false,
	},
	{
		accessorKey: "name",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Name" />
		),
		cell: ({ row }) => {
			const user = row.original;
			return <span className="font-medium">{user.name || "—"}</span>;
		},
	},
	{
		accessorKey: "email",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Email" />
		),
		cell: ({ row }) => (
			<span className="text-muted-foreground">{row.getValue("email")}</span>
		),
	},
	{
		accessorKey: "phone",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Phone" />
		),
		cell: ({ row }) => (
			<span className="text-muted-foreground">
				{row.getValue("phone") || "—"}
			</span>
		),
	},
	{
		accessorKey: "role",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Role" />
		),
		cell: ({ row }) => {
			const role = (row.getValue("role") as string | undefined) || "user";
			const variant =
				role === "system_admin"
					? "destructive"
					: role === "admin"
						? "default"
						: "secondary";
			return <Badge variant={variant}>{roleLabel(role)}</Badge>;
		},
		filterFn: (row, id, value) => {
			return value === row.getValue(id);
		},
	},
	{
		accessorKey: "isActive",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Status" />
		),
		cell: ({ row }) => {
			const isActive = row.getValue("isActive") as boolean;
			return (
				<Badge variant={isActive ? "default" : "outline"}>
					{isActive ? "Active" : "Inactive"}
				</Badge>
			);
		},
		filterFn: (row, id, value) => {
			const isActive = row.getValue(id) as boolean;
			return value === String(isActive);
		},
	},
	{
		accessorKey: "_creationTime",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Created" />
		),
		cell: ({ row }) => formatDate(row.getValue("_creationTime") as number),
	},
	{
		id: "actions",
		cell: ({ row }) => <UserActionsCell user={row.original} />,
	},
];
