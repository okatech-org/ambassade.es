import { ServiceCategory } from "@convex/lib/validators";
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
	ShieldAlert,
	Users,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
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
	const hasRequirements = (localizedService.requirements?.length ?? 0) > 0;

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
									{localizedService.title}
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
						<ReactMarkdown>{localizedService.description}</ReactMarkdown>
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
							<ReactMarkdown>{localizedService.content}</ReactMarkdown>
						</div>
					)}

					{/* Documents requis — compact 2-column grid */}
					{hasRequirements && (
						<div>
							<h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
								<FileText className="h-4 w-4 text-muted-foreground" />
								{t("services.modal.requiredDocuments")} (
								{localizedService.requirements?.length})
							</h4>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
								{localizedService.requirements?.map((doc, index) => (
									<div
										key={index}
										className="flex items-center gap-2 px-3 py-2 bg-muted/40 rounded-lg"
									>
										<span className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold shrink-0">
											{index + 1}
										</span>
										<span className="text-xs leading-snug">{doc}</span>
									</div>
								))}
							</div>
						</div>
					)}
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
