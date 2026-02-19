"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";

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
	return new Date(timestamp).toLocaleString();
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
		cell: ({ row }) => (
			<Badge variant="secondary">{String(row.getValue("action"))}</Badge>
		),
	},
	{
		accessorKey: "targetType",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Target Type" />
		),
		cell: ({ row }) => (
			<code className="text-xs bg-muted px-1 py-0.5 rounded">
				{String(row.getValue("targetType"))}
			</code>
		),
	},
	{
		accessorKey: "targetId",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Target ID" />
		),
		cell: ({ row }) => {
			const targetId = row.getValue("targetId") as string | undefined;
			if (!targetId) return <span className="text-muted-foreground">—</span>;
			return (
				<code className="text-xs bg-muted px-1 py-0.5 rounded truncate max-w-48 block">
					{targetId}
				</code>
			);
		},
	},
	{
		accessorKey: "details",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Details" />
		),
		cell: ({ row }) => {
			const details = row.getValue("details");
			if (!details) return <span className="text-muted-foreground">—</span>;
			return (
				<code className="text-xs bg-muted px-1 py-0.5 rounded max-w-64 block truncate">
					{typeof details === "string" ? details : JSON.stringify(details)}
				</code>
			);
		},
	},
];
