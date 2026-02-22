import { api } from "@convex/_generated/api";
import { ServiceCategory } from "@convex/lib/validators";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "convex/react";
import {
	ArrowRight,
	BookOpen,
	BookOpenCheck,
	CalendarPlus,
	FileCheck,
	FileText,
	Filter,
	Globe,
	type LucideIcon,
	Search,
	ShieldAlert,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { CitizenCTA } from "@/components/home/CitizenCTA";
import { ServiceCard } from "@/components/home/ServiceCard";
import { EditableText } from "@/components/inline-edit/EditableText";
import { PageHero } from "@/components/PageHero";
import { DGDIServiceBanner } from "@/components/services/DGDIServiceBanner";
import { ServiceDetailModal } from "@/components/services/ServiceDetailModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useSectionVisibility } from "@/hooks/useSectionVisibility";
import { localizeServiceForLanguage } from "@/lib/services-localization";

const servicesSearchSchema = z.object({
	query: z.string().optional(),
	category: z.string().optional(), // comma-separated
	service: z.string().optional(), // service slug for modal
});

export const Route = createFileRoute("/services/")({
	component: ServicesPage,
	validateSearch: (search) => servicesSearchSchema.parse(search),
});

const categoryConfig: Record<
	string,
	{ icon: LucideIcon; color: string; bgColor: string }
> = {
	[ServiceCategory.Identity]: {
		icon: BookOpenCheck,
		color: "text-blue-600 dark:text-blue-400",
		bgColor: "bg-blue-500/10",
	},
	[ServiceCategory.CivilStatus]: {
		icon: FileText,
		color: "text-yellow-600 dark:text-yellow-400",
		bgColor: "bg-yellow-500/10",
	},
	[ServiceCategory.Registration]: {
		icon: BookOpen,
		color: "text-purple-600 dark:text-purple-400",
		bgColor: "bg-purple-500/10",
	},
	[ServiceCategory.Certification]: {
		icon: FileCheck,
		color: "text-orange-600 dark:text-orange-400",
		bgColor: "bg-orange-500/10",
	},
	[ServiceCategory.Assistance]: {
		icon: ShieldAlert,
		color: "text-red-600 dark:text-red-400",
		bgColor: "bg-red-500/10",
	},
	[ServiceCategory.TravelDocument]: {
		icon: Globe,
		color: "text-teal-600 dark:text-teal-400",
		bgColor: "bg-teal-500/10",
	},
	[ServiceCategory.Transcript]: {
		icon: FileCheck,
		color: "text-emerald-600 dark:text-emerald-400",
		bgColor: "bg-emerald-500/10",
	},
	[ServiceCategory.Other]: {
		icon: FileText,
		color: "text-gray-600 dark:text-gray-400",
		bgColor: "bg-gray-500/10",
	},
};

function ServiceCardSkeleton() {
	return (
		<div className="glass-card p-6 h-full flex flex-col gap-4">
			<div className="flex items-center gap-4">
				<Skeleton className="h-12 w-12 rounded-xl" />
				<div className="space-y-2 flex-1">
					<Skeleton className="h-5 w-3/4" />
					<Skeleton className="h-4 w-20" />
				</div>
			</div>
			<Skeleton className="h-4 w-full mb-2" />
			<Skeleton className="h-4 w-2/3" />
		</div>
	);
}

function ServicesPage() {
	const { t, i18n } = useTranslation();
	const navigate = useNavigate({ from: Route.fullPath });
	const search = Route.useSearch();
	const services = useQuery(api.functions.services.listCatalog, {});
	const lang = i18n.resolvedLanguage || i18n.language;

	const [searchQuery, setSearchQuery] = useState(search.query || "");

	const localizedServices = useMemo(
		() => services?.map((service) => localizeServiceForLanguage(service, lang)),
		[services, lang],
	);

	// Find selected service from URL param
	const selectedService = useMemo(() => {
		if (!search.service || !localizedServices) return null;
		return localizedServices.find((s) => s.slug === search.service) || null;
	}, [search.service, localizedServices]);

	const modalOpen = !!search.service && !!selectedService;

	// Sync state with URL params
	const updateFilters = (updates: Partial<typeof search>) => {
		navigate({
			search: (prev) => ({ ...prev, ...updates }),
			replace: true,
		});
	};

	// Handle modal open/close with URL sync
	const handleServiceClick = (slug: string) => {
		updateFilters({ service: slug });
	};

	const handleModalClose = (open: boolean) => {
		if (!open) {
			updateFilters({ service: undefined });
		}
	};

	// Debounced search update
	useEffect(() => {
		const timer = setTimeout(() => {
			if (searchQuery !== search.query) {
				updateFilters({ query: searchQuery || undefined });
			}
		}, 300);
		return () => clearTimeout(timer);
	}, [searchQuery]);

	const selectedCategories = search.category ? search.category.split(",") : [];

	const toggleCategory = (cat: string) => {
		const current = selectedCategories;
		const next = current.includes(cat)
			? current.filter((c) => c !== cat)
			: [...current, cat];
		updateFilters({ category: next.join(",") || undefined });
	};

	const isLoading = services === undefined;

	const filteredServices = localizedServices?.filter((service) => {
		const matchesQuery =
			!search.query ||
			service.title.toLowerCase().includes(search.query.toLowerCase()) ||
			service.description.toLowerCase().includes(search.query.toLowerCase());

		const matchesCategory =
			selectedCategories.length === 0 ||
			selectedCategories.includes(service.category);

		return matchesQuery && matchesCategory;
	});

	const clearFilters = () => {
		setSearchQuery("");
		updateFilters({ query: undefined, category: undefined });
	};

	const activeFiltersCount = (search.query ? 1 : 0) + selectedCategories.length;
	const { isSectionHidden } = useSectionVisibility("/services");

	return (
		<div className="min-h-screen bg-background">
			{/* Hero Section */}
			{!isSectionHidden("hero") && (
				<PageHero image="/images/Consult_general.jpeg">
					<Badge
						variant="secondary"
						className="mb-2 lg:mb-4 bg-primary/10 text-primary border-primary/20 backdrop-blur-sm text-[10px] lg:text-xs"
					>
						<EditableText
							contentKey="services.hero.badge"
							defaultValue={t("services.badge", "Nos Services")}
							pagePath="/services"
							sectionId="hero"
						/>
					</Badge>
					<h1 className="text-2xl lg:text-6xl font-bold text-foreground mb-2 lg:mb-6">
						<EditableText
							contentKey="services.hero.title"
							defaultValue={t("services.pageTitle", "Services Consulaires")}
							pagePath="/services"
							sectionId="hero"
							as="span"
						/>{" "}
						<EditableText
							contentKey="services.hero.titleHighlight"
							defaultValue={t("services.pageTitleHighlight", "Services")}
							pagePath="/services"
							sectionId="hero"
							as="span"
							className="text-gradient hover:animate-shimmer bg-[length:200%_auto]"
						/>
					</h1>
					<EditableText
						contentKey="services.hero.description"
						defaultValue={t(
							"services.pageDescription",
							"Découvrez l'ensemble des services proposés par les représentations consulaires de la République Gabonaise à l'étranger.",
						)}
						pagePath="/services"
						sectionId="hero"
						as="p"
						className="text-sm lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-4 lg:mb-10 leading-relaxed"
					/>
				</PageHero>
			)}

			{/* Main Content */}
			<section className="py-8 lg:py-12 px-4 lg:px-6">
				<div className="max-w-7xl mx-auto">
					{/* ── Mobile: Inline filters (horizontal chips + search) ── */}
					<div className="lg:hidden mb-6 space-y-3">
						{/* Search bar — mobile */}
						<div className="relative">
							<Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
							<Input
								className="h-10 pl-9 pr-4 rounded-xl bg-background border-border/50 text-sm placeholder:text-muted-foreground/50"
								placeholder={t(
									"services.searchPlaceholder",
									"Rechercher un service...",
								)}
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
							/>
						</div>
						{/* Horizontal filter chips */}
						<div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-1 px-1">
							{activeFiltersCount > 0 && (
								<button
									onClick={clearFilters}
									className="shrink-0 text-[11px] font-medium text-red-500 hover:text-red-600 px-2.5 py-1.5 rounded-full border border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-800/30 transition-colors"
								>
									✕ {t("services.clear", "Effacer")}
								</button>
							)}
							{Object.values(ServiceCategory)
								.filter((cat) => cat !== ServiceCategory.Visa)
								.map((category) => {
									const label = t(`services.categoriesMap.${category}`);
									const config =
										categoryConfig[category] ||
										categoryConfig[ServiceCategory.Other];
									const Icon = config.icon;
									const isSelected = selectedCategories.includes(category);

									return (
										<button
											key={category}
											onClick={() => toggleCategory(category)}
											className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium border transition-all duration-200 ${
												isSelected
													? "bg-primary text-primary-foreground border-primary shadow-sm"
													: "bg-background border-border/50 text-muted-foreground hover:border-primary/30 hover:text-foreground"
											}`}
										>
											<Icon className="w-3 h-3" />
											{label}
										</button>
									);
								})}
						</div>
						{/* Demande d'Audience — mobile */}
						<Button
							size="sm"
							className="w-full h-10 rounded-xl gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-xs"
							onClick={() => handleServiceClick("demande-audience")}
						>
							<CalendarPlus className="w-4 h-4" />
							{t("services.requestAudience", "Demande d'Audience")}
							<ArrowRight className="w-3.5 h-3.5" />
						</Button>
						{/* DGDI Banner — mobile only (retractable) */}
						<DGDIServiceBanner />
					</div>

					<div className="flex flex-col lg:flex-row gap-8">
						{/* ── Desktop Sidebar: Filters + DGDI Banner ── */}
						<aside className="hidden lg:block w-72 shrink-0">
							<div className="lg:sticky lg:top-24 space-y-5">
								{/* Filter Panel */}
								<div className="glass-panel p-6 rounded-2xl border-border/40">
									<div className="flex items-center justify-between mb-6">
										<h3 className="font-bold text-lg flex items-center gap-2 text-foreground">
											<Filter className="w-4 h-4 text-primary" />
											{t("services.filters", "Filtres")}
										</h3>
										{activeFiltersCount > 0 && (
											<Button
												variant="ghost"
												size="sm"
												className="h-8 px-2 text-muted-foreground hover:text-red-500 transition-colors"
												onClick={clearFilters}
											>
												{t("services.clearAll", "Tout effacer")}
											</Button>
										)}
									</div>

									<div className="space-y-4">
										<div className="font-medium text-xs text-muted-foreground uppercase tracking-wider mb-3 pl-1">
											{t("services.categories", "Catégories")}
										</div>
										<div className="space-y-1">
											{Object.values(ServiceCategory)
												.filter((cat) => cat !== ServiceCategory.Visa)
												.map((category) => {
													const label = t(`services.categoriesMap.${category}`);
													const config =
														categoryConfig[category] ||
														categoryConfig[ServiceCategory.Other];
													const Icon = config.icon;
													const isSelected =
														selectedCategories.includes(category);

													return (
														<Label
															key={category}
															htmlFor={`cat-${category}`}
															className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all duration-200 ${isSelected ? "bg-primary/10 shadow-sm" : "hover:bg-muted/50"}`}
														>
															<Checkbox
																id={`cat-${category}`}
																checked={isSelected}
																onCheckedChange={() => toggleCategory(category)}
																className="border-border/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
															/>
															<span
																className={`p-1.5 rounded-md ${config.bgColor} ${config.color.split(" ")[0]}`}
															>
																<Icon className="w-3.5 h-3.5" />
															</span>
															<span
																className={`text-sm ${isSelected ? "font-medium text-foreground" : "text-muted-foreground"}`}
															>
																{label}
															</span>
														</Label>
													);
												})}
										</div>
									</div>
								</div>

								{/* DGDI Passeports & Visas Info */}
								<DGDIServiceBanner />
							</div>
						</aside>

						{/* Services Grid */}
						<div className="flex-1">
							<div className="mb-6 flex items-center justify-between">
								<h2 className="text-xl font-semibold">
									{filteredServices
										? `${filteredServices.length} ${filteredServices.length > 1 ? t("services.servicesCount", "services") : t("services.serviceCount", "service")}`
										: t("services.loading", "Chargement...")}
								</h2>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{isLoading ? (
									Array.from({ length: 6 }).map((_, i) => (
										<ServiceCardSkeleton key={i} />
									))
								) : filteredServices?.length === 0 ? (
									<div className="col-span-full py-16 text-center rounded-2xl glass-card border-dashed border-2 flex flex-col items-center justify-center">
										<div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mb-6">
											<Search className="w-10 h-10 text-primary/50" />
										</div>
										<h3 className="text-xl font-bold mb-3 text-foreground">
											<EditableText
												contentKey="services.list.noResults"
												defaultValue={t(
													"services.noResults",
													"Aucun service trouvé",
												)}
												pagePath="/services"
												sectionId="services_list"
												as="span"
											/>
										</h3>
										<p className="text-muted-foreground mb-8 max-w-md">
											{t(
												"services.noResultsDesc",
												"Nous n'avons trouvé aucun service correspondant à vos critères. Essayez de modifier vos filtres ou votre recherche.",
											)}
										</p>
										<Button
											onClick={clearFilters}
											variant="outline"
											className="h-12 px-8 rounded-xl border-primary/20 hover:bg-primary/5 text-primary"
										>
											{t("services.viewAllServices", "Voir tous les services")}
										</Button>
									</div>
								) : (
									<>
										{/* DGDI Service Cards — Passeport & Visa */}
										{!search.query && selectedCategories.length === 0 && (
											<a
												href="https://www.ae.dgdifrance.fr/"
												target="_blank"
												rel="noopener noreferrer"
												className="group hidden lg:block col-span-full"
											>
												<div className="dgdi-banner rounded-2xl border border-amber-400/30 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5 hover:-translate-y-1 transition-all duration-300">
													<div className="flex items-center gap-3">
														<div className="w-12 h-12 rounded-[14px] flex items-center justify-center bg-amber-700/15 border border-amber-600/30 shrink-0">
															<Globe className="w-6 h-6 text-amber-800" />
														</div>
														<div>
															<h3 className="text-lg font-bold text-amber-950 group-hover:text-amber-700 transition-colors">
																{t("services.dgdi.title", "Passeport & Visa")}
															</h3>
															<Badge className="text-[10px] bg-amber-600/10 text-amber-800 border-amber-600/25 border mt-1">
																DGDI
															</Badge>
														</div>
													</div>
													<p className="text-sm text-amber-800/70 leading-relaxed flex-1">
														{t(
															"services.dgdi.description",
															"Établissement, dépôt et retrait de passeports et visas. Services assurés par la DGDI (Délégation Générale à la Documentation et à l'Immigration) sur le territoire français.",
														)}
													</p>
													<span className="inline-flex items-center gap-2 text-sm font-semibold text-amber-800 group-hover:text-amber-900 transition-colors whitespace-nowrap shrink-0">
														{t("services.dgdi.cta", "Faire la démarche")}
														<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
													</span>
												</div>
											</a>
										)}

										{filteredServices?.map((service) => {
											// Special green styling for Demande d'Audience
											const isAudience = service.slug === "demande-audience";
											const config = isAudience
												? {
														icon: CalendarPlus,
														color: "text-emerald-600 dark:text-emerald-400",
														bgColor: "bg-emerald-500/10",
													}
												: categoryConfig[service.category] ||
													categoryConfig[ServiceCategory.Other];
											const categoryLabel = isAudience
												? t("services.audience", "Audience")
												: t(`services.categoriesMap.${service.category}`);

											return (
												<ServiceCard
													key={service._id}
													icon={config.icon}
													title={service.title}
													description={service.description}
													color={config.color}
													badge={categoryLabel}
													delay={service.delay}
													validity={service.validity}
													isUrgent={service.isUrgent}
													onInfoClick={() => handleServiceClick(service.slug)}
													greenHighlight={isAudience}
												/>
											);
										})}
									</>
								)}
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Service Detail Modal */}
			<ServiceDetailModal
				service={selectedService}
				open={modalOpen}
				onOpenChange={handleModalClose}
			/>

			{!isSectionHidden("citizen-cta") && (
				<CitizenCTA
					pagePath="/services"
					sectionId="citizen-cta"
					contentKeyPrefix="services.citizenCta"
				/>
			)}
		</div>
	);
}
