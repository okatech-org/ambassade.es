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
import { Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";
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

export const Route = createFileRoute("/admin/posts/")({
	component: AdminPostsPage,
});

const categoryLabels: Record<string, { label: string; color: string }> = {
	actualite: { label: "Actualité", color: "bg-blue-500/10 text-blue-600" },
	evenement: { label: "Événement", color: "bg-green-500/10 text-green-600" },
	communique: {
		label: "Communiqué",
		color: "bg-orange-500/10 text-orange-600",
	},
};

function AdminPostsPage() {
	const { t } = useTranslation();
	const posts = useQuery(api.functions.posts.listAll);
	const removePost = useMutation(api.functions.posts.remove);
	const updatePost = useMutation(api.functions.posts.update);

	const [deleteId, setDeleteId] = useState<Id<"posts"> | null>(null);

	const isLoading = posts === undefined;

	const handleDelete = async () => {
		if (!deleteId) return;
		try {
			await removePost({ id: deleteId });
			toast.success(t("admin.posts.deleted", "Article supprimé"));
			setDeleteId(null);
		} catch {
			toast.error(
				t("admin.posts.deleteError", "Erreur lors de la suppression"),
			);
		}
	};

	const toggleStatus = async (post: NonNullable<typeof posts>[number]) => {
		try {
			await updatePost({
				id: post._id,
				title: post.title,
				slug: post.slug,
				excerpt: post.excerpt,
				content: post.content,
				category: post.category,
				status: post.status === "published" ? "draft" : "published",
				publishedAt: post.publishedAt,
			});
			toast.success(
				post.status === "published"
					? t("admin.posts.unpublished", "Article dépublié")
					: t("admin.posts.published", "Article publié"),
			);
		} catch {
			toast.error(
				t("admin.posts.updateError", "Erreur lors de la mise à jour"),
			);
		}
	};

	return (
		<div className="flex flex-1 flex-col gap-4 p-4 pt-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">
						{t("admin.posts.title", "Actualités")}
					</h1>
					<p className="text-muted-foreground">
						{t("admin.posts.description", "Gérer les articles et communiqués")}
					</p>
				</div>
				<Button asChild>
					<Link to="/admin/posts/new">
						<Plus className="mr-2 h-4 w-4" />
						{t("admin.posts.new", "Nouvel article")}
					</Link>
				</Button>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>{t("admin.posts.list", "Liste des articles")}</CardTitle>
					<CardDescription>
						{posts?.length ?? 0} {t("admin.posts.total", "article(s)")}
					</CardDescription>
				</CardHeader>
				<CardContent>
					{isLoading ? (
						<div className="space-y-3">
							{[1, 2, 3].map((i) => (
								<Skeleton key={i} className="h-12 w-full" />
							))}
						</div>
					) : posts?.length === 0 ? (
						<p className="text-center text-muted-foreground py-8">
							{t("admin.posts.empty", "Aucun article pour le moment")}
						</p>
					) : (
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>
										{t("admin.posts.columns.title", "Titre")}
									</TableHead>
									<TableHead>
										{t("admin.posts.columns.category", "Catégorie")}
									</TableHead>
									<TableHead>
										{t("admin.posts.columns.status", "Statut")}
									</TableHead>
									<TableHead>{t("admin.posts.columns.date", "Date")}</TableHead>
									<TableHead className="text-right">
										{t("common.actions", "Actions")}
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{posts?.map((post) => {
									const cat = categoryLabels[post.category] || {
										label: post.category,
										color: "bg-gray-500/10 text-gray-600",
									};
									return (
										<TableRow key={post._id}>
											<TableCell className="font-medium">
												{post.title}
											</TableCell>
											<TableCell>
												<Badge variant="secondary" className={cat.color}>
													{cat.label}
												</Badge>
											</TableCell>
											<TableCell>
												<Badge
													variant={
														post.status === "published" ? "default" : "outline"
													}
												>
													{post.status === "published"
														? t("admin.posts.published", "Publié")
														: t("admin.posts.draft", "Brouillon")}
												</Badge>
											</TableCell>
											<TableCell>
												{post.publishedAt
													? new Date(post.publishedAt).toLocaleDateString(
															"fr-FR",
														)
													: "-"}
											</TableCell>
											<TableCell className="text-right space-x-1">
												<Button
													variant="ghost"
													size="icon"
													onClick={() => toggleStatus(post)}
													title={
														post.status === "published"
															? "Dépublier"
															: "Publier"
													}
												>
													{post.status === "published" ? (
														<EyeOff className="h-4 w-4" />
													) : (
														<Eye className="h-4 w-4" />
													)}
												</Button>
												<Button variant="ghost" size="icon" asChild>
													<Link
														to="/admin/posts/$postId/edit"
														params={{ postId: post._id }}
													>
														<Edit className="h-4 w-4" />
													</Link>
												</Button>
												<Button
													variant="ghost"
													size="icon"
													onClick={() => setDeleteId(post._id)}
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

			<AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>
							{t("admin.posts.deleteConfirmTitle", "Supprimer l'article ?")}
						</AlertDialogTitle>
						<AlertDialogDescription>
							{t(
								"admin.posts.deleteConfirmDesc",
								"Cette action est irréversible. L'article sera définitivement supprimé.",
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
