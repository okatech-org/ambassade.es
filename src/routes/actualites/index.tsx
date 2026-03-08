import { api } from "@convex/_generated/api";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery } from "convex/react";
import {
	ArrowRight,
	Calendar,
	FileText,
	MapPin,
	Megaphone,
	Newspaper,
	PartyPopper,
	Phone,
} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CitizenCTA } from "@/components/home/CitizenCTA";
import { EditableEntityText } from "@/components/inline-edit/EditableEntityText";
import { EditablePostImage } from "@/components/inline-edit/EditablePostImage";
import { EditableSection } from "@/components/inline-edit/EditableSection";
import { EditableText } from "@/components/inline-edit/EditableText";
import { SortableSectionList } from "@/components/inline-edit/SortableSectionList";
import { PageHero } from "@/components/PageHero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import i18n from "@/integrations/i18n/i18n";

export const Route = createFileRoute("/actualites/")({
	component: ActualitesPage,
	head: () => {
		const resolvedLang = (i18n.resolvedLanguage || i18n.language)
			.split("-")[0]
			.toLowerCase();
		const titles: Record<string, string> = {
			es: "Noticias y Eventos | Embajada de Gabón",
			en: "News & Events | General Consulate of Gabon",
			fr: "Actualités & Événements | Consulat Général du Gabon",
		};
		const descriptions: Record<string, string> = {
			es: "Últimas noticias, comunicados oficiales y eventos de la Embajada de Gabón en España.",
			en: "Latest news, official press releases and events from the General Consulate of Gabon in France.",
			fr: "Retrouvez les dernières actualités, communiqués officiels et événements du Ambassade du Gabon en Espagne.",
		};
		return {
			meta: [
				{ title: titles[resolvedLang] || titles.fr },
				{
					name: "description",
					content: descriptions[resolvedLang] || descriptions.fr,
				},
			],
		};
	},
});

const categoryColors: Record<
	string,
	{ color: string; gradient: string; icon: typeof Newspaper }
> = {
	communique: {
		color: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300",
		gradient: "from-blue-600/30 via-blue-500/15 to-indigo-400/10",
		icon: Megaphone,
	},
	evenement: {
		color:
			"bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300",
		gradient: "from-green-600/30 via-emerald-500/15 to-teal-400/10",
		icon: PartyPopper,
	},
	actualite: {
		color: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
		gradient: "from-slate-600/30 via-gray-500/15 to-zinc-400/10",
		icon: Newspaper,
	},
};

const filterKeys = [
	{ key: "all", icon: FileText },
	{ key: "communique", icon: Megaphone },
	{ key: "actualite", icon: Newspaper },
	{ key: "evenement", icon: PartyPopper },
];
const SKELETON_CARD_KEYS = [
	"news-skeleton-1",
	"news-skeleton-2",
	"news-skeleton-3",
	"news-skeleton-4",
	"news-skeleton-5",
	"news-skeleton-6",
];
const DEFAULT_SECTION_ORDER = [
	"hero",
	"filters",
	"content",
	"cta",
	"citizen-cta",
];

function formatDate(timestamp: number, lang: string = "fr") {
	const normalizedLang = lang.toLowerCase().split("-")[0];
	const locale =
		normalizedLang === "es"
			? "es-ES"
			: normalizedLang === "en"
				? "en-GB"
				: "fr-FR";
	return new Intl.DateTimeFormat(locale, {
		day: "numeric",
		month: "long",
		year: "numeric",
	}).format(new Date(timestamp));
}

/**
 * Sanitize a post title — never show raw URLs or JSON artifacts.
 */
function safeTitle(title: string, excerpt?: string): string {
	if (!title || title.includes("linkedin.com") || title.startsWith("http")) {
		// Try excerpt as fallback
		if (
			excerpt &&
			!excerpt.includes("linkedin.com") &&
			!excerpt.startsWith("http")
		) {
			const cleaned = excerpt
				.replace(/[{}"]/g, "")
				.replace(/,\s*"text"\s*:\s*/g, "")
				.replace(/https?:\/\/[^\s]+/g, "")
				.trim();
			if (cleaned.length > 15) {
				return cleaned.length > 100 ? `${cleaned.substring(0, 97)}…` : cleaned;
			}
		}
		return "Article de l'Ambassade";
	}
	return title;
}

/**
 * Sanitize an excerpt — never show raw URLs or JSON artifacts.
 */
function safeExcerpt(excerpt: string): string {
	if (!excerpt) return "";
	return excerpt
		.replace(/https?:\/\/[^\s"']+/g, "")
		.replace(/[{}"]/g, "")
		.replace(/,\s*"?text"?\s*:\s*/gi, "")
		.replace(/\\n/g, " ")
		.replace(/^[\s,.:]+/, "")
		.replace(/\s+/g, " ")
		.trim();
}

function ActualitesPage() {
	const { t, i18n } = useTranslation();
	const lang = i18n.language;
	const [activeFilter, setActiveFilter] = useState("all");
	const updatePost = useMutation(api.functions.posts.update);
	const posts = useQuery(api.functions.posts.list, {
		paginationOpts: { numItems: 20, cursor: null },
	});

	const isLoading = posts === undefined;

	const filteredPosts = posts?.page.filter((post) =>
		activeFilter === "all" ? true : post.category === activeFilter,
	);

	const postCounts = posts?.page.reduce(
		(acc, post) => {
			acc[post.category] = (acc[post.category] || 0) + 1;
			acc.all = (acc.all || 0) + 1;
			return acc;
		},
		{} as Record<string, number>,
	);

	return (
		<div className="min-h-screen bg-background">
			<SortableSectionList
				pagePath="/actualites"
				defaultOrder={DEFAULT_SECTION_ORDER}
			>
				{/* Hero Section */}
				<EditableSection sectionId="hero" label="Section Hero">
					<PageHero image="/images/heroes/hero-actualites.png">
						<Badge
							variant="secondary"
							className="mb-4 bg-primary/10 text-primary border-primary/20 backdrop-blur-sm"
						>
							<Newspaper className="w-3.5 h-3.5 mr-1.5" />
							<EditableText
								contentKey="actualites.hero.badge"
								defaultValue={t("news.badge", "Espace Presse")}
								pagePath="/actualites"
								sectionId="hero"
								as="span"
							/>
						</Badge>
						<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
							<EditableText
								contentKey="actualites.hero.title"
								defaultValue={t("news.pageTitle", "Actualités")}
								pagePath="/actualites"
								sectionId="hero"
								as="span"
							/>{" "}
							<EditableText
								contentKey="actualites.hero.titleHighlight"
								defaultValue={t("news.pageTitleHighlight", "Événements")}
								pagePath="/actualites"
								sectionId="hero"
								as="span"
								className="text-gradient"
							/>
						</h1>
						<EditableText
							contentKey="actualites.hero.description"
							defaultValue={t(
								"news.pageDescription",
								"Retrouvez les dernières actualités, communiqués et événements du Ambassade du Gabon en Espagne.",
							)}
							pagePath="/actualites"
							sectionId="hero"
							as="p"
							className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
						/>

						{/* Quick stats */}
						{!isLoading && posts.page.length > 0 && (
							<div className="flex flex-wrap justify-center gap-6 mt-8 text-sm">
								<div className="flex items-center gap-2 text-foreground/80">
									<FileText className="w-5 h-5 text-primary" />
									<span className="font-medium">
										{posts.page.length}{" "}
										{t("newsPage.publications", "publications")}
									</span>
								</div>
								<div className="flex items-center gap-2 text-foreground/80">
									<Megaphone className="w-5 h-5 text-blue-500" />
									<span className="font-medium">
										{postCounts?.communique || 0}{" "}
										{t("newsPage.pressReleases", "communiqués")}
									</span>
								</div>
								<div className="flex items-center gap-2 text-foreground/80">
									<PartyPopper className="w-5 h-5 text-green-500" />
									<span className="font-medium">
										{postCounts?.evenement || 0}{" "}
										{t("newsPage.events", "événements")}
									</span>
								</div>
							</div>
						)}
					</PageHero>
				</EditableSection>

				{/* Category Filter Pills */}
				<EditableSection sectionId="filters" label="Filtres">
					<section className="px-6 relative z-20 -mt-4 mb-2">
						<div className="max-w-7xl mx-auto">
							<div className="flex flex-wrap gap-3">
								{filterKeys.map((filter) => {
									const Icon = filter.icon;
									const isActive = activeFilter === filter.key;
									const count = postCounts?.[filter.key] || 0;
									const label =
										filter.key === "all" ? (
											<EditableText
												contentKey="actualites.filters.all"
												defaultValue={t("newsPage.filters.all", "Tous")}
												pagePath="/actualites"
												sectionId="filters"
												as="span"
											/>
										) : (
											t(`newsPage.filters.${filter.key}`, filter.key)
										);
									return (
										<button
											type="button"
											key={filter.key}
											onClick={() => setActiveFilter(filter.key)}
											className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
												isActive
													? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
													: "border border-border bg-background/50 backdrop-blur-sm hover:bg-primary/10 hover:border-primary/30 text-foreground hover:text-primary"
											}`}
										>
											<Icon className="w-4 h-4" />
											{label}
											{!isLoading && (
												<span
													className={`text-xs px-1.5 py-0.5 rounded-full ${
														isActive
															? "bg-white/20"
															: "bg-muted text-muted-foreground"
													}`}
												>
													{count}
												</span>
											)}
										</button>
									);
								})}
							</div>
						</div>
					</section>
				</EditableSection>

				{/* Content */}
				<EditableSection sectionId="content" label="Articles">
					<section className="py-10 px-6">
						<div className="max-w-7xl mx-auto">
							{isLoading ? (
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
									{SKELETON_CARD_KEYS.map((skeletonKey) => (
										<div
											key={skeletonKey}
											className="glass-card overflow-hidden rounded-2xl"
										>
											<Skeleton className="h-52 w-full rounded-none" />
											<div className="p-6 space-y-4">
												<Skeleton className="h-4 w-24" />
												<Skeleton className="h-6 w-full" />
												<Skeleton className="h-4 w-full" />
												<Skeleton className="h-4 w-2/3" />
											</div>
										</div>
									))}
								</div>
							) : !filteredPosts || filteredPosts.length === 0 ? (
								<div className="text-center py-20 rounded-2xl glass-card border-dashed border-2">
									<div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6">
										<Newspaper className="w-10 h-10 text-primary/40" />
									</div>
									<h3 className="text-xl font-bold mb-3 text-foreground">
										{activeFilter === "all" ? (
											<EditableText
												contentKey="actualites.content.noResults"
												defaultValue={t(
													"news.empty",
													"Aucune actualité pour le moment.",
												)}
												pagePath="/actualites"
												sectionId="content"
												as="span"
											/>
										) : (
											t(
												"newsPage.noFilterResults",
												`Aucun ${categoryColors[activeFilter] ? t(`news.categories.${activeFilter}`) : "article"} pour le moment.`,
											)
										)}
									</h3>
									<p className="text-muted-foreground mb-8 max-w-md mx-auto">
										{t(
											"newsPage.comeBack",
											"Revenez bientôt pour découvrir les dernières nouvelles du Consulat.",
										)}
									</p>
									{activeFilter !== "all" && (
										<Button
											onClick={() => setActiveFilter("all")}
											variant="outline"
											className="h-12 px-8 rounded-xl border-primary/20 hover:bg-primary/5 text-primary"
										>
											{t(
												"newsPage.viewAllPublications",
												"Voir toutes les publications",
											)}
										</Button>
									)}
								</div>
							) : (
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
									{filteredPosts.map((post) => {
										const config =
											categoryColors[post.category] || categoryColors.actualite;
										const FallbackIcon = config.icon;
										return (
											<Link
												key={post._id}
												to={`/actualites/$slug`}
												params={{ slug: post.slug }}
												className="group block"
											>
												<div className="glass-card overflow-hidden h-full group hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 rounded-2xl">
													<div className="h-52 relative overflow-hidden">
														{post.coverImage ? (
															<EditablePostImage
																postId={post._id}
																src={post.coverImage}
																alt={post.title}
																objectPosition={post.coverImagePosition}
																className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
															/>
														) : (
															<EditablePostImage
																postId={post._id}
																src={undefined}
																alt={post.title}
																objectPosition={post.coverImagePosition}
																className="w-full h-full object-cover"
																fallback={
																	<div
																		className={`h-full w-full bg-gradient-to-br ${config.gradient} flex items-center justify-center relative`}
																	>
																		{/* Decorative pattern */}
																		<div className="absolute inset-0 opacity-[0.04]">
																			<div
																				className="w-full h-full"
																				style={{
																					backgroundImage:
																						"radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
																					backgroundSize: "24px 24px",
																				}}
																			/>
																		</div>
																		<div className="relative">
																			<div className="w-20 h-20 rounded-2xl bg-background/60 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
																				<FallbackIcon className="w-10 h-10 text-primary/60" />
																			</div>
																		</div>
																	</div>
																}
															/>
														)}
														<div className="absolute top-4 left-4">
															<Badge
																className={`${(categoryColors[post.category] || categoryColors.actualite).color} border-0 backdrop-blur-md shadow-sm`}
															>
																{t(
																	`news.categories.${post.category}`,
																	post.category,
																)}
															</Badge>
														</div>
													</div>
													<div className="p-6">
														<EditableEntityText
															value={safeTitle(post.title, post.excerpt)}
															onSave={async (v) => {
																await updatePost({
																	id: post._id,
																	title: v,
																	slug: post.slug,
																	excerpt: post.excerpt,
																	content: post.content,
																	category: post.category,
																	status: post.status,
																});
															}}
															pagePath={`/actualites/${post.slug}`}
															sectionId="content"
															as="h2"
															className="font-bold text-xl text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-3"
														/>
														<EditableEntityText
															value={safeExcerpt(post.excerpt)}
															onSave={async (v) => {
																await updatePost({
																	id: post._id,
																	title: post.title,
																	slug: post.slug,
																	excerpt: v,
																	content: post.content,
																	category: post.category,
																	status: post.status,
																});
															}}
															pagePath={`/actualites/${post.slug}`}
															sectionId="content"
															as="p"
															className="text-muted-foreground line-clamp-3 mb-4 text-sm leading-relaxed"
														/>
														<div className="flex items-center justify-between pt-4 border-t border-border/30">
															<div className="flex items-center text-xs text-muted-foreground font-medium">
																<Calendar className="w-3.5 h-3.5 mr-1.5 text-primary" />
																{formatDate(post.publishedAt, lang)}
															</div>
															<ArrowRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-1 transition-all" />
														</div>
													</div>
												</div>
											</Link>
										);
									})}
								</div>
							)}
						</div>
					</section>
				</EditableSection>

				{/* CTA Section */}
				<EditableSection sectionId="cta" label="Restez informé">
					<section className="py-24 px-6 relative overflow-hidden">
						<div className="absolute inset-0 bg-primary/5 dark:bg-primary/10" />
						<div className="absolute top-0 right-0 w-96 h-96 bg-gabon-blue/20 rounded-full blur-[100px] animate-pulse-glow" />
						<div
							className="absolute bottom-0 left-0 w-96 h-96 bg-gabon-green/20 rounded-full blur-[100px] animate-pulse-glow"
							style={{ animationDelay: "2s" }}
						/>

						<div className="max-w-4xl mx-auto text-center relative z-10">
							<div className="glass-panel p-10 md:p-16 rounded-3xl border-primary/20 shadow-2xl shadow-primary/5">
								<Megaphone className="w-12 h-12 text-primary mx-auto mb-6" />
								<h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
									<EditableText
										contentKey="actualites.cta.title"
										defaultValue={t("news.cta.title", "Restez informé")}
										pagePath="/actualites"
										sectionId="cta"
										as="span"
									/>
								</h2>
								<EditableText
									contentKey="actualites.cta.description"
									defaultValue={t(
										"news.cta.description",
										"Suivez-nous sur nos réseaux sociaux et consultez régulièrement cette page pour ne rien manquer des actualités du Consulat.",
									)}
									pagePath="/actualites"
									sectionId="cta"
									as="p"
									className="text-muted-foreground mb-10 text-lg max-w-2xl mx-auto leading-relaxed"
								/>
								<div className="flex flex-wrap justify-center gap-6">
									<Button
										size="lg"
										className="h-14 px-8 rounded-xl text-base shadow-lg shadow-primary/20"
										asChild
									>
										<Link to="/contact">
											<MapPin className="w-5 h-5 mr-2" />
											<EditableText
												contentKey="actualites.cta.button"
												defaultValue={t("news.cta.contact", "Nous contacter")}
												pagePath="/actualites"
												sectionId="cta"
												as="span"
											/>
										</Link>
									</Button>
									<Button
										size="lg"
										variant="outline"
										className="h-14 px-8 rounded-xl text-base bg-background/50 hover:bg-accent/10 border-foreground/10"
										asChild
									>
										<a href="tel:+33751025292">
											<Phone className="w-5 h-5 mr-2" />
											07 51 02 52 92
										</a>
									</Button>
								</div>
							</div>
						</div>
					</section>
				</EditableSection>

				<EditableSection sectionId="citizen-cta" label="Appel citoyen">
					<CitizenCTA
						pagePath="/actualites"
						sectionId="citizen-cta"
						contentKeyPrefix="actualites.citizenCta"
					/>
				</EditableSection>
			</SortableSectionList>
		</div>
	);
}
