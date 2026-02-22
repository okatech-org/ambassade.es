import { createFileRoute } from "@tanstack/react-router";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Edit, Trash2, ToggleLeft, ToggleRight } from "lucide-react";
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

export const Route = createFileRoute("/admin/announcements/")({
	component: AdminAnnouncementsPage,
});

const typeLabels: Record<string, { label: string; color: string }> = {
	info: { label: "Information", color: "bg-blue-500/10 text-blue-600" },
	warning: { label: "Attention", color: "bg-yellow-500/10 text-yellow-600" },
	danger: { label: "Urgent", color: "bg-red-500/10 text-red-600" },
};

type FormData = {
	message: string;
	link: string;
	type: "info" | "warning" | "danger";
	isActive: boolean;
};

function AdminAnnouncementsPage() {
	const { t } = useTranslation();
	const announcements = useQuery(api.functions.announcements.listAll);
	const createAnnouncement = useMutation(api.functions.announcements.create);
	const updateAnnouncement = useMutation(api.functions.announcements.update);
	const removeAnnouncement = useMutation(api.functions.announcements.remove);

	const [deleteId, setDeleteId] = useState<Id<"announcements"> | null>(null);
	const [editId, setEditId] = useState<Id<"announcements"> | null>(null);
	const [isCreating, setIsCreating] = useState(false);
	const [formData, setFormData] = useState<FormData>({
		message: "",
		link: "",
		type: "info",
		isActive: true,
	});

	const isLoading = announcements === undefined;

	const openCreate = () => {
		setFormData({ message: "", link: "", type: "info", isActive: true });
		setEditId(null);
		setIsCreating(true);
	};

	const openEdit = (
		announcement: NonNullable<typeof announcements>[number],
	) => {
		setFormData({
			message: announcement.message,
			link: announcement.link || "",
			type: announcement.type,
			isActive: announcement.isActive,
		});
		setEditId(announcement._id);
		setIsCreating(true);
	};

	const handleSave = async () => {
		if (!formData.message) {
			toast.error(
				t("admin.announcements.missingMessage", "Veuillez entrer un message"),
			);
			return;
		}

		try {
			if (editId) {
				await updateAnnouncement({
					id: editId,
					message: formData.message,
					link: formData.link || undefined,
					type: formData.type,
					isActive: formData.isActive,
				});
				toast.success(t("admin.announcements.updated", "Annonce mise à jour"));
			} else {
				await createAnnouncement({
					message: formData.message,
					link: formData.link || undefined,
					type: formData.type,
					isActive: formData.isActive,
				});
				toast.success(t("admin.announcements.created", "Annonce créée"));
			}
			setIsCreating(false);
			setEditId(null);
		} catch {
			toast.error(
				t("admin.announcements.saveError", "Erreur lors de l'enregistrement"),
			);
		}
	};

	const handleDelete = async () => {
		if (!deleteId) return;
		try {
			await removeAnnouncement({ id: deleteId });
			toast.success(t("admin.announcements.deleted", "Annonce supprimée"));
			setDeleteId(null);
		} catch {
			toast.error(
				t("admin.announcements.deleteError", "Erreur lors de la suppression"),
			);
		}
	};

	const toggleActive = async (
		announcement: NonNullable<typeof announcements>[number],
	) => {
		try {
			await updateAnnouncement({
				id: announcement._id,
				isActive: !announcement.isActive,
			});
			toast.success(
				announcement.isActive
					? t("admin.announcements.deactivated", "Annonce désactivée")
					: t("admin.announcements.activated", "Annonce activée"),
			);
		} catch {
			toast.error(
				t("admin.announcements.updateError", "Erreur lors de la mise à jour"),
			);
		}
	};

	return (
		<div className="flex flex-1 flex-col gap-4 p-4 pt-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">
						{t("admin.announcements.title", "Annonces")}
					</h1>
					<p className="text-muted-foreground">
						{t(
							"admin.announcements.description",
							"Gérer les annonces affichées en bannière",
						)}
					</p>
				</div>
				<Button onClick={openCreate}>
					<Plus className="mr-2 h-4 w-4" />
					{t("admin.announcements.new", "Nouvelle annonce")}
				</Button>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>
						{t("admin.announcements.list", "Liste des annonces")}
					</CardTitle>
					<CardDescription>
						{announcements?.length ?? 0}{" "}
						{t("admin.announcements.total", "annonce(s)")}
					</CardDescription>
				</CardHeader>
				<CardContent>
					{isLoading ? (
						<div className="space-y-3">
							{[1, 2].map((i) => (
								<Skeleton key={i} className="h-12 w-full" />
							))}
						</div>
					) : announcements?.length === 0 ? (
						<p className="text-center text-muted-foreground py-8">
							{t("admin.announcements.empty", "Aucune annonce pour le moment")}
						</p>
					) : (
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>
										{t("admin.announcements.columns.message", "Message")}
									</TableHead>
									<TableHead>
										{t("admin.announcements.columns.type", "Type")}
									</TableHead>
									<TableHead>
										{t("admin.announcements.columns.status", "Statut")}
									</TableHead>
									<TableHead className="text-right">
										{t("common.actions", "Actions")}
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{announcements?.map((announcement) => {
									const type = typeLabels[announcement.type] || typeLabels.info;
									return (
										<TableRow key={announcement._id}>
											<TableCell className="font-medium max-w-md truncate">
												{announcement.message}
											</TableCell>
											<TableCell>
												<Badge variant="secondary" className={type.color}>
													{type.label}
												</Badge>
											</TableCell>
											<TableCell>
												<Badge
													variant={
														announcement.isActive ? "default" : "outline"
													}
												>
													{announcement.isActive
														? t("admin.announcements.active", "Active")
														: t("admin.announcements.inactive", "Inactive")}
												</Badge>
											</TableCell>
											<TableCell className="text-right space-x-1">
												<Button
													variant="ghost"
													size="icon"
													onClick={() => toggleActive(announcement)}
													title={
														announcement.isActive ? "Désactiver" : "Activer"
													}
												>
													{announcement.isActive ? (
														<ToggleRight className="h-4 w-4 text-primary" />
													) : (
														<ToggleLeft className="h-4 w-4" />
													)}
												</Button>
												<Button
													variant="ghost"
													size="icon"
													onClick={() => openEdit(announcement)}
												>
													<Edit className="h-4 w-4" />
												</Button>
												<Button
													variant="ghost"
													size="icon"
													onClick={() => setDeleteId(announcement._id)}
												>
													<Trash2 className="h-4 w-4 text-destructive" />
												</Button>
											</TableCell>
										</TableRow>
									);
								})}
							</TableBody>
						</Table>
					)}
				</CardContent>
			</Card>

			{/* Create/Edit Dialog */}
			<Dialog open={isCreating} onOpenChange={setIsCreating}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>
							{editId
								? t("admin.announcements.editTitle", "Modifier l'annonce")
								: t("admin.announcements.newTitle", "Nouvelle annonce")}
						</DialogTitle>
						<DialogDescription>
							{t(
								"admin.announcements.formDesc",
								"Cette annonce sera affichée en bannière sur le site.",
							)}
						</DialogDescription>
					</DialogHeader>

					<div className="space-y-4 py-4">
						<div className="space-y-2">
							<Label htmlFor="message">
								{t("admin.announcements.form.message", "Message")} *
							</Label>
							<Input
								id="message"
								value={formData.message}
								onChange={(e) =>
									setFormData((prev) => ({ ...prev, message: e.target.value }))
								}
								placeholder={t(
									"admin.announcements.form.messagePlaceholder",
									"Contenu de l'annonce...",
								)}
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="link">
								{t("admin.announcements.form.link", "Lien (optionnel)")}
							</Label>
							<Input
								id="link"
								value={formData.link}
								onChange={(e) =>
									setFormData((prev) => ({ ...prev, link: e.target.value }))
								}
								placeholder="https://..."
							/>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label>{t("admin.announcements.form.type", "Type")}</Label>
								<Select
									value={formData.type}
									onValueChange={(value) =>
										setFormData((prev) => ({
											...prev,
											type: value as typeof prev.type,
										}))
									}
								>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="info">Information</SelectItem>
										<SelectItem value="warning">Attention</SelectItem>
										<SelectItem value="danger">Urgent</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div className="space-y-2">
								<Label>{t("admin.announcements.form.status", "Statut")}</Label>
								<Select
									value={formData.isActive ? "active" : "inactive"}
									onValueChange={(value) =>
										setFormData((prev) => ({
											...prev,
											isActive: value === "active",
										}))
									}
								>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="active">
											{t("admin.announcements.active", "Active")}
										</SelectItem>
										<SelectItem value="inactive">
											{t("admin.announcements.inactive", "Inactive")}
										</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>
					</div>

					<DialogFooter>
						<Button variant="outline" onClick={() => setIsCreating(false)}>
							{t("common.cancel", "Annuler")}
						</Button>
						<Button onClick={handleSave}>
							{t("common.save", "Enregistrer")}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* Delete Confirmation */}
			<AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>
							{t(
								"admin.announcements.deleteConfirmTitle",
								"Supprimer l'annonce ?",
							)}
						</AlertDialogTitle>
						<AlertDialogDescription>
							{t(
								"admin.announcements.deleteConfirmDesc",
								"Cette action est irréversible.",
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
