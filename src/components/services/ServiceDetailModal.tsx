import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";
import { ServiceCategory } from "@convex/lib/validators";
import { useMutation } from "convex/react";
import {
	AlertTriangle,
	ArrowRight,
	BookOpen,
	BookOpenCheck,
	CalendarCheck,
	CheckCircle2,
	Clock,
	FileCheck,
	FileText,
	Globe,
	type LucideIcon,
	Plus,
	ShieldAlert,
	Trash2,
	Users,
} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { EditableEntityText } from "@/components/inline-edit/EditableEntityText";
import { useInlineEdit } from "@/components/inline-edit/use-inline-edit";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { markdownToHtml } from "@/lib/markdown-to-html";
import { localizeServiceForLanguage } from "@/lib/services-localization";

const CATEGORY_CONFIG: Record<string, { icon: LucideIcon; color: string }> = {
	[ServiceCategory.Identity]: { icon: BookOpenCheck, color: "bg-blue-500" },
	[ServiceCategory.Visa]: { icon: Globe, color: "bg-green-500" },
	[ServiceCategory.CivilStatus]: { icon: FileText, color: "bg-yellow-500" },
	[ServiceCategory.Registration]: { icon: BookOpen, color: "bg-purple-500" },
	[ServiceCategory.Certification]: { icon: FileCheck, color: "bg-orange-500" },
	[ServiceCategory.Assistance]: { icon: ShieldAlert, color: "bg-red-500" },
	[ServiceCategory.TravelDocument]: { icon: Globe, color: "bg-teal-500" },
	[ServiceCategory.Transcript]: { icon: FileCheck, color: "bg-emerald-500" },
	[ServiceCategory.Other]: { icon: FileText, color: "bg-gray-500" },
};

interface ServiceInfo {
	_id: string;
	title: string;
	slug: string;
	description: string;
	content?: string;
	category: string;
	delay?: string;
	validity?: string;
	isUrgent?: boolean;
	notes?: string;
	requirements?: string[];
	actionLink?: string;
	isOnline: boolean;
}

interface ServiceDetailModalProps {
	service: ServiceInfo | null;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function ServiceDetailModal({
	service,
	open,
	onOpenChange,
}: ServiceDetailModalProps) {
	const { t, i18n } = useTranslation();
	const updateService = useMutation(api.functions.services.update);

	if (!service) return null;
	const lang = i18n.resolvedLanguage || i18n.language;
	const localizedService = localizeServiceForLanguage(service, lang);

	const categoryKey = Object.values(ServiceCategory).includes(
		localizedService.category as any,
	)
		? localizedService.category
		: ServiceCategory.Other;

	const categoryConfig =
		CATEGORY_CONFIG[categoryKey] || CATEGORY_CONFIG[ServiceCategory.Other];
	const CategoryIcon = categoryConfig.icon;

	const categoryLabel = t(
		`services.categoriesMap.${localizedService.category}`,
	);

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-2xl w-[92vw] max-h-[85vh] flex flex-col overflow-hidden p-0 bg-background/85 backdrop-blur-xl border-border/50 shadow-2xl">
				{/* ── Header ── */}
				<DialogHeader className="px-6 pt-6 pb-0 shrink-0">
					<div className="flex items-start gap-3">
						<div
							className={`p-2.5 rounded-xl ${categoryConfig.color}/10 shrink-0`}
						>
							<CategoryIcon
								className={`h-6 w-6 text-${categoryConfig.color.replace("bg-", "")}`}
							/>
						</div>
						<div className="flex-1 min-w-0">
							<div className="flex items-center gap-2 flex-wrap">
								<DialogTitle className="text-xl leading-tight">
									<EditableEntityText
										value={localizedService.title}
										onSave={async (v) => {
											await updateService({
												id: service._id as Id<"services">,
												title: v,
											});
										}}
										pagePath={`/services/${service.slug}`}
										sectionId="content"
										as="span"
									/>
								</DialogTitle>
								{localizedService.isUrgent && (
									<Badge
										variant="destructive"
										className="gap-1 animate-pulse text-[10px] px-2 py-0.5"
									>
										<AlertTriangle className="w-3 h-3" />
										Urgent
									</Badge>
								)}
							</div>
							{/* Inline metadata badges */}
							<div className="flex flex-wrap items-center gap-1.5 mt-2">
								<Badge
									variant="outline"
									className="gap-1 text-[10px] px-2 py-0.5"
								>
									<CategoryIcon className="h-2.5 w-2.5" />
									{categoryLabel}
								</Badge>
								{localizedService.delay && (
									<Badge
										variant="outline"
										className="gap-1 text-[10px] px-2 py-0.5"
									>
										<Clock className="h-2.5 w-2.5" />
										{localizedService.delay}
									</Badge>
								)}
								{localizedService.validity && (
									<Badge
										variant="outline"
										className="gap-1 border-teal-500/30 text-teal-700 dark:text-teal-400 text-[10px] px-2 py-0.5"
									>
										<CalendarCheck className="h-2.5 w-2.5" />
										{localizedService.validity}
									</Badge>
								)}
								<Badge
									variant="secondary"
									className="gap-1 text-[10px] px-2 py-0.5"
								>
									<Users className="h-2.5 w-2.5" />
									🇬🇦{" "}
									{t(
										"services.modal.eligibleAudience",
										"Gabonese nationals in France",
									)}
								</Badge>
							</div>
						</div>
					</div>
				</DialogHeader>

				{/* ── Scrollable content ── */}
				<div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
					{/* DGDI Warning */}
					{[
						ServiceCategory.Identity,
						ServiceCategory.Visa,
						"Identité",
						"Visa",
					].includes(localizedService.category as any) && (
						<div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 flex items-start gap-2.5 text-xs">
							<ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
							<div>
								<span className="font-bold text-amber-700 dark:text-amber-500">
									{t(
										"services.passportVisaWarning.title",
										"Information Importante",
									)}{" "}
									—{" "}
								</span>
								<span className="text-muted-foreground">
									{t(
										"services.passportVisaWarning.message",
										"Les services Passeport et Visa sont de l'autorité de l'Antenne DGDI.",
									)}
								</span>
							</div>
						</div>
					)}

					{/* Description */}
					<div className="text-sm text-muted-foreground leading-relaxed prose prose-sm dark:prose-invert max-w-none">
						<EditableEntityText
							value={markdownToHtml(localizedService.description)}
							onSave={async (v) => {
								await updateService({
									id: service._id as Id<"services">,
									description: v,
								});
							}}
							pagePath={`/services/${service.slug}`}
							sectionId="content"
							fieldType="richtext"
							as="div"
						/>
					</div>

					{/* Notes */}
					{localizedService.notes && (
						<div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 flex items-start gap-2.5 text-xs">
							<AlertTriangle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
							<div>
								<span className="font-bold text-blue-700 dark:text-blue-400">
									{t("services.modal.noteLabel", "Note")} —{" "}
								</span>
								<span className="text-muted-foreground">
									{localizedService.notes}
								</span>
							</div>
						</div>
					)}

					{/* Detailed content */}
					{localizedService.content && (
						<div className="prose prose-sm dark:prose-invert max-w-none text-sm">
							<EditableEntityText
								value={markdownToHtml(localizedService.content)}
								onSave={async (v) => {
									await updateService({
										id: service._id as Id<"services">,
										content: v,
									});
								}}
								pagePath={`/services/${service.slug}`}
								sectionId="content"
								fieldType="richtext"
								as="div"
							/>
						</div>
					)}

					{/* Documents requis — editable */}
					<EditableRequirements
						requirements={localizedService.requirements ?? []}
						serviceId={service._id as Id<"services">}
						updateService={updateService}
					/>
				</div>

				{/* ── Sticky CTA footer ── */}
				<div className="px-6 py-4 border-t border-border/40 shrink-0 bg-background/60 backdrop-blur-md">
					<Button className="w-full gap-2 h-11" asChild>
						<a
							href="https://www.consulat.ga/"
							target="_blank"
							rel="noopener noreferrer"
						>
							{t("services.modal.makeRequest", "Faire la démarche")}
							<ArrowRight className="h-4 w-4" />
						</a>
					</Button>
					<p className="text-[10px] text-muted-foreground/60 text-center mt-2 flex items-center justify-center gap-1">
						<CheckCircle2 className="w-3 h-3" />
						{t(
							"services.modal.reservedAudience",
							"Reserved for Gabonese nationals residing in France (stay > 3 months)",
						)}
					</p>
				</div>
			</DialogContent>
		</Dialog>
	);
}

// ── EditableRequirements sub-component ──────────────────────────────────────

function EditableRequirements({
	requirements,
	serviceId,
	updateService,
}: {
	requirements: string[];
	serviceId: Id<"services">;
	updateService: ReturnType<typeof useMutation>;
}) {
	const { t } = useTranslation();
	const { canEditContent, ready } = useInlineEdit();
	const canEdit = canEditContent && ready;

	const [editingIdx, setEditingIdx] = useState<number | null>(null);
	const [editValue, setEditValue] = useState("");
	const [newDoc, setNewDoc] = useState("");
	const [isSaving, setIsSaving] = useState(false);

	const saveRequirements = async (updated: string[]) => {
		setIsSaving(true);
		try {
			await (updateService as any)({ id: serviceId, requirements: updated });
		} finally {
			setIsSaving(false);
		}
	};

	const handleEdit = (idx: number) => {
		setEditingIdx(idx);
		setEditValue(requirements[idx]);
	};

	const handleSaveEdit = async () => {
		if (editingIdx === null || !editValue.trim()) return;
		const updated = [...requirements];
		updated[editingIdx] = editValue.trim();
		await saveRequirements(updated);
		setEditingIdx(null);
		setEditValue("");
	};

	const handleDelete = async (idx: number) => {
		const updated = requirements.filter((_, i) => i !== idx);
		await saveRequirements(updated);
	};

	const handleAdd = async () => {
		if (!newDoc.trim()) return;
		const updated = [...requirements, newDoc.trim()];
		await saveRequirements(updated);
		setNewDoc("");
	};

	if (requirements.length === 0 && !canEdit) return null;

	return (
		<div>
			<h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
				<FileText className="h-4 w-4 text-muted-foreground" />
				{t("services.modal.requiredDocuments", "Documents requis")} (
				{requirements.length})
			</h4>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
				{requirements.map((doc, index) => (
					<div
						key={`req-${doc.slice(0, 20)}-${index}`}
						className="flex items-center gap-2 px-3 py-2 bg-muted/40 rounded-lg group"
					>
						<span className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold shrink-0">
							{index + 1}
						</span>
						{editingIdx === index ? (
							<form
								onSubmit={(e) => {
									e.preventDefault();
									void handleSaveEdit();
								}}
								className="flex-1 flex gap-1"
							>
								<input
									value={editValue}
									onChange={(e) => setEditValue(e.target.value)}
									className="flex-1 text-xs bg-background border border-border rounded px-2 py-1 focus:ring-1 focus:ring-primary outline-none"
									autoFocus
									onBlur={() => void handleSaveEdit()}
									disabled={isSaving}
								/>
							</form>
						) : (
							<>
								<span
									className={`text-xs leading-snug flex-1 ${canEdit ? "cursor-pointer hover:text-primary transition-colors" : ""}`}
									onClick={() => canEdit && handleEdit(index)}
									onKeyDown={(e) => {
										if (canEdit && (e.key === "Enter" || e.key === " "))
											handleEdit(index);
									}}
									role={canEdit ? "button" : undefined}
									tabIndex={canEdit ? 0 : undefined}
								>
									{doc}
								</span>
								{canEdit && (
									<button
										type="button"
										onClick={() => void handleDelete(index)}
										className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded hover:bg-red-500/10 text-red-500 shrink-0"
										title={t("common.delete", "Supprimer")}
										disabled={isSaving}
									>
										<Trash2 className="h-3 w-3" />
									</button>
								)}
							</>
						)}
					</div>
				))}
			</div>

			{/* Add new document */}
			{canEdit && (
				<form
					onSubmit={(e) => {
						e.preventDefault();
						void handleAdd();
					}}
					className="flex items-center gap-2 mt-2"
				>
					<input
						value={newDoc}
						onChange={(e) => setNewDoc(e.target.value)}
						placeholder={t(
							"services.modal.addDocument",
							"Ajouter un document...",
						)}
						className="flex-1 text-xs bg-background border border-dashed border-primary/30 rounded-lg px-3 py-2 focus:ring-1 focus:ring-primary outline-none placeholder:text-muted-foreground/50"
						disabled={isSaving}
					/>
					<button
						type="submit"
						disabled={!newDoc.trim() || isSaving}
						className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
						title={t("common.add", "Ajouter")}
					>
						<Plus className="h-3.5 w-3.5" />
					</button>
				</form>
			)}
		</div>
	);
}
