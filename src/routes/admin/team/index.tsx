import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useQuery, useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";
import { useState } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Plus,
	Edit,
	Trash2,
	Eye,
	EyeOff,
	Crown,
	GripVertical,
} from "lucide-react";
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
import { toast } from "sonner";

export const Route = createFileRoute("/admin/team/")({
	component: AdminTeamPage,
});

function AdminTeamPage() {
	const { t } = useTranslation();
	const teamMembers = useQuery(api.functions.teamMembers.listAll);
	const removeMember = useMutation(api.functions.teamMembers.remove);
	const toggleActive = useMutation(api.functions.teamMembers.toggleActive);

	const [deleteId, setDeleteId] = useState<Id<"teamMembers"> | null>(null);

	const isLoading = teamMembers === undefined;

	const handleDelete = async () => {
		if (!deleteId) return;
		try {
			await removeMember({ id: deleteId });
			toast.success(t("admin.team.deleted", "Membre supprimé"));
			setDeleteId(null);
		} catch {
			toast.error(t("admin.team.deleteError", "Erreur lors de la suppression"));
		}
	};

	const handleToggleActive = async (id: Id<"teamMembers">) => {
		try {
			await toggleActive({ id });
			toast.success(t("admin.team.statusUpdated", "Statut mis à jour"));
		} catch {
			toast.error(t("admin.team.updateError", "Erreur lors de la mise à jour"));
		}
	};

	return (
		<div className="flex flex-1 flex-col gap-4 p-4 pt-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">
						{t("admin.team.title", "Équipe du Consulat")}
					</h1>
					<p className="text-muted-foreground">
						{t(
							"admin.team.description",
							"Gérer les membres de l'équipe consulaire",
						)}
					</p>
				</div>
				<Button asChild>
					<Link to="/admin/team/new">
						<Plus className="mr-2 h-4 w-4" />
						{t("admin.team.new", "Nouveau membre")}
					</Link>
				</Button>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>{t("admin.team.list", "Liste des membres")}</CardTitle>
					<CardDescription>
						{teamMembers?.length ?? 0} {t("admin.team.total", "membre(s)")}
					</CardDescription>
				</CardHeader>
				<CardContent>
					{isLoading ? (
						<div className="space-y-3">
							{[1, 2, 3].map((i) => (
								<Skeleton key={i} className="h-16 w-full" />
							))}
						</div>
					) : teamMembers?.length === 0 ? (
						<p className="text-center text-muted-foreground py-8">
							{t("admin.team.empty", "Aucun membre pour le moment")}
						</p>
					) : (
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className="w-12"></TableHead>
									<TableHead>
										{t("admin.team.columns.member", "Membre")}
									</TableHead>
									<TableHead>
										{t("admin.team.columns.role", "Fonction")}
									</TableHead>
									<TableHead>
										{t("admin.team.columns.status", "Statut")}
									</TableHead>
									<TableHead className="text-right">
										{t("common.actions", "Actions")}
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{teamMembers?.map((member) => (
									<TableRow key={member._id}>
										<TableCell>
											<GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
										</TableCell>
										<TableCell>
											<div className="flex items-center gap-3">
												<Avatar className="h-10 w-10">
													<AvatarImage
														src={member.photoUrl || undefined}
														alt={`${member.firstName} ${member.lastName}`}
													/>
													<AvatarFallback>
														{member.firstName.charAt(0)}
														{member.lastName.charAt(0)}
													</AvatarFallback>
												</Avatar>
												<div>
													<div className="flex items-center gap-2">
														<span className="font-medium">
															{member.firstName} {member.lastName}
														</span>
														{member.isConsulGeneral && (
															<span title="Consul Général">
																<Crown className="h-4 w-4 text-yellow-500" />
															</span>
														)}
													</div>
													{member.email && (
														<span className="text-sm text-muted-foreground">
															{member.email}
														</span>
													)}
												</div>
											</div>
										</TableCell>
										<TableCell>{member.role}</TableCell>
										<TableCell>
											<Badge variant={member.isActive ? "default" : "outline"}>
												{member.isActive
													? t("admin.team.active", "Actif")
													: t("admin.team.inactive", "Inactif")}
											</Badge>
										</TableCell>
										<TableCell className="text-right space-x-1">
											<Button
												variant="ghost"
												size="icon"
												onClick={() => handleToggleActive(member._id)}
												title={member.isActive ? "Désactiver" : "Activer"}
											>
												{member.isActive ? (
													<EyeOff className="h-4 w-4" />
												) : (
													<Eye className="h-4 w-4" />
												)}
											</Button>
											<Button variant="ghost" size="icon" asChild>
												<Link
													to="/admin/team/$memberId/edit"
													params={{ memberId: member._id }}
												>
													<Edit className="h-4 w-4" />
												</Link>
											</Button>
											<Button
												variant="ghost"
												size="icon"
												onClick={() => setDeleteId(member._id)}
											>
												<Trash2 className="h-4 w-4 text-destructive" />
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					)}
				</CardContent>
			</Card>

			<AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>
							{t("admin.team.deleteConfirmTitle", "Supprimer le membre ?")}
						</AlertDialogTitle>
						<AlertDialogDescription>
							{t(
								"admin.team.deleteConfirmDesc",
								"Cette action est irréversible. Le membre sera définitivement supprimé.",
							)}
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>
							{t("common.cancel", "Annuler")}
						</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleDelete}
							className="bg-destructive text-destructive-foreground"
						>
							{t("common.delete", "Supprimer")}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
