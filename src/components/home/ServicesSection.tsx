import { api } from "@convex/_generated/api";
import { ServiceCategory } from "@convex/lib/validators";
import { Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "convex/react";
import {
	ArrowRight,
	BookUser,
	CalendarPlus,
	CheckCircle2,
	FileText,
	Fingerprint,
	type LucideIcon,
	Scroll,
	Sparkles,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { EditableText } from "../inline-edit/EditableText";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

const categoryConfig: Record<
	string,
	{ icon: LucideIcon; color: string; gradient: string }
> = {
	[ServiceCategory.Identity]: {
		icon: Fingerprint,
		color: "bg-[#1a5dab]/10 text-[#1a5dab]",
		gradient: "from-[#1a5dab]/15 to-[#4285f4]/5",
	},
	[ServiceCategory.CivilStatus]: {
		icon: Scroll,
		color: "bg-[#f9ab00]/10 text-[#f9ab00]",
		gradient: "from-[#f9ab00]/15 to-[#f9ab00]/5",
	},
	[ServiceCategory.Registration]: {
		icon: BookUser,
		color: "bg-[#34a853]/10 text-[#34a853]",
		gradient: "from-[#34a853]/15 to-[#34a853]/5",
	},
	Voyage: {
		icon: FileText,
		color: "bg-[#ea4335]/10 text-[#ea4335]",
		gradient: "from-[#ea4335]/15 to-[#ea4335]/5",
	},
	default: {
		icon: FileText,
		color: "bg-[#5f6368]/10 text-[#5f6368]",
		gradient: "from-[#5f6368]/15 to-[#5f6368]/5",
	},
};

function ServiceSkeleton() {
	return (
		<div className="glass-card rounded-2xl p-6 space-y-4">
			<Skeleton className="h-12 w-12 rounded-xl" />
			<Skeleton className="h-5 w-3/4" />
			<Skeleton className="h-4 w-full" />
			<Skeleton className="h-4 w-2/3" />
		</div>
	);
}

function BentoServiceCard({
	service,
	config,
	slug,
	featured = false,
	image,
}: {
	service: any;
	config: { icon: LucideIcon; color: string; gradient: string };
	slug: string;
	featured?: boolean;
	image?: string;
}) {
	const { t } = useTranslation();
	const Icon = config.icon;

	// Special featured card for Carte Consulaire
	if (featured && slug === "carte-consulaire") {
		return (
			<div
				onClick={() => (window.location.href = `/services/${slug}`)}
				className="group relative text-left w-full cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 block md:col-span-2 md:row-span-2 border border-transparent hover:border-[var(--glass-panel-border)] hover:bg-[var(--glass-panel-bg)]"
			>
				{/* Background gradient — visible by default, fades on hover */}
				<div className="absolute inset-0 bg-gradient-to-br from-[#1a5dab]/15 via-[#1a5dab]/5 to-[#34a853]/10 opacity-100 group-hover:opacity-0 transition-opacity duration-500" />
				<div className="absolute inset-0 bg-[#1a5dab]/5 rounded-2xl group-hover:opacity-0 transition-opacity duration-500" />

				<div className="relative z-10 h-full flex flex-col md:min-h-[420px]">
					{/* ── Desktop Image — absolute overlay on right (hidden on mobile) ── */}
					<div className="hidden md:flex absolute -top-5 bottom-0 right-0 w-[70%] items-center justify-end pointer-events-none">
						<img
							src="/images/services/carte-consulaire.png"
							alt="Carte Consulaire Gabonaise"
							className="w-full h-full object-contain object-right scale-[1.125] origin-right drop-shadow-2xl group-hover:scale-[1.175] transition-transform duration-500"
						/>
					</div>

					{/* Text content */}
					<div className="relative z-20 p-5 md:p-8 flex flex-col h-full">
						{/* Header: Title then Badge below */}
						<div className="flex flex-col items-start gap-1 mb-3">
							<h3 className="text-xl md:text-3xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
								{t("services.carteConsulaire.title", "Votre pièce d'identité")}{" "}
								<span className="text-gradient">
									{t(
										"services.carteConsulaire.titleHighlight",
										"gabonaise en France",
									)}
								</span>
							</h3>
							<Badge className="bg-primary/10 text-primary border-primary/20 text-xs backdrop-blur-sm">
								{t(
									"services.carteConsulaire.badge",
									"✨ Nouvelle Carte Consulaire",
								)}
							</Badge>
						</div>

						{/* ── Mobile Image — aligned right, scaled up (hidden on desktop) ── */}
						<div className="md:hidden flex justify-end my-3 -mr-5 overflow-hidden">
							<img
								src="/images/services/carte-consulaire.png"
								alt="Carte Consulaire Gabonaise"
								className="w-[75%] object-contain drop-shadow-xl scale-[1.60] origin-right"
							/>
						</div>

						{/* Documents required */}
						<ul className="text-sm text-foreground/80 space-y-1.5 mb-4 max-w-sm">
							<li className="flex items-center gap-2">
								<span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
								{t(
									"services.carteConsulaire.doc1",
									"Une copie d'acte de naissance",
								)}
							</li>
							<li className="flex items-center gap-2">
								<span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
								{t("services.carteConsulaire.doc2", "Une copie du passeport")}
							</li>
							<li className="flex items-center gap-2">
								<span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
								{t(
									"services.carteConsulaire.doc3",
									"Un justificatif de domicile",
								)}
							</li>
							<li className="flex items-center gap-2">
								<span className="w-1.5 h-1.5 rounded-full bg-primary/50 shrink-0" />
								<span>
									{t(
										"services.carteConsulaire.doc4",
										"Une copie de la carte résident",
									)}{" "}
									<span className="text-muted-foreground italic">
										{t("services.carteConsulaire.doc4Note", "(Facultatif)")}
									</span>
								</span>
							</li>
						</ul>

						{/* CTA Button — external link */}
						<a
							href="https://www.consulat.ga/"
							target="_blank"
							rel="noopener noreferrer"
							className="w-full md:w-fit text-center rounded-full text-white shadow-lg hover:shadow-xl transition-all font-semibold px-6 py-3 md:py-2.5 inline-flex items-center justify-center gap-2 text-sm mb-4 bg-[#1a5dab] hover:bg-[#174ea6]"
							onClick={(e) => e.stopPropagation()}
						>
							{t("services.carteConsulaire.cta", "Demande de Carte Consulaire")}
							<ArrowRight className="w-4 h-4" />
						</a>

						{/* Description */}
						<p className="text-sm text-muted-foreground leading-relaxed mb-3 max-w-2xl line-clamp-2 md:mt-16">
							{t(
								"services.carteConsulaire.desc1",
								"La carte consulaire atteste de votre inscription au registre des Gabonais de l'étranger.",
							)}
							<br />
							{t(
								"services.carteConsulaire.desc2",
								"Elle facilite toutes vos démarches administratives et consulaires sur le territoire français.",
							)}
						</p>

						{/* Features */}
						<div className="flex flex-wrap items-center gap-2 md:gap-3">
							{[
								{
									label: t(
										"services.carteConsulaire.feat1",
										"Reconnaissance officielle",
									),
									icon: "🏛️",
								},
								{
									label: t(
										"services.carteConsulaire.feat2",
										"Démarches simplifiées",
									),
									icon: "⚡",
								},
								{
									label: t("services.carteConsulaire.feat3", "Validité 3 ans"),
									icon: "📅",
								},
							].map((feat) => (
								<div
									key={feat.label}
									className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-foreground/80 backdrop-blur-sm bg-background/60 rounded-md px-2 py-1 md:px-2.5 md:py-1.5"
								>
									<span>{feat.icon}</span>
									<span className="font-medium">{feat.label}</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		);
	}

	const navigate = useNavigate();

	const handleServiceClick = (slug: string) => {
		navigate({ to: "/services", search: { service: slug } });
	};

	return (
		<button
			type="button"
			onClick={() => handleServiceClick(slug)}
			className={`group relative text-left w-full cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 block ${
				featured ? "md:col-span-2 md:row-span-2" : ""
			} ${!image ? "border border-transparent hover:border-[var(--glass-panel-border)] hover:bg-[var(--glass-panel-bg)]" : ""}`}
		>
			{/* Background Image */}
			{image && (
				<div className="absolute inset-0 z-0">
					<img
						src={image}
						alt={service.title}
						className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
				</div>
			)}

			{/* Gradient background — visible by default, fades on hover to reveal white */}
			{!image && (
				<div
					className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-100 group-hover:opacity-0 transition-opacity duration-300`}
				/>
			)}
			{/* Solid colored background behind gradient for richer default look */}
			{!image && (
				<div
					className={`absolute inset-0 ${slug === "demande-audience" ? "bg-emerald-50/60 dark:bg-emerald-950/20" : config.color.split(" ")[0]} rounded-2xl group-hover:opacity-0 transition-opacity duration-300`}
				/>
			)}

			<div
				className={`relative z-10 p-6 ${featured ? "md:p-8" : ""} h-full flex flex-col`}
			>
				{/* Header with Icon + Title */}
				<div className="flex items-center gap-3 mb-3">
					<div
						className={`p-2.5 rounded-xl shrink-0 ${image ? "bg-white/10 backdrop-blur-md text-white" : "bg-white/60 dark:bg-white/10 backdrop-blur-sm group-hover:bg-transparent " + config.color.split(" ").slice(1).join(" ")}`}
					>
						<Icon className={`${featured ? "w-6 h-6" : "w-5 h-5"}`} />
					</div>
					<h3
						className={`font-bold transition-colors ${featured ? "text-xl" : "text-base"} ${image ? "text-white" : "text-foreground"}`}
					>
						{service.title}
					</h3>
				</div>

				{/* Description */}
				<p
					className={`leading-relaxed mb-4 flex-1 ${featured ? "text-base line-clamp-4" : "text-sm line-clamp-2"} ${image ? "text-gray-200" : "text-foreground/70 group-hover:text-muted-foreground"}`}
				>
					{service.description}
				</p>

				{/* Footer */}
				<div className="flex items-center justify-between mt-auto">
					{service.delay && (
						<span
							className={`text-xs flex items-center gap-1.5 ${image ? "text-gray-300" : "text-foreground/60 group-hover:text-muted-foreground"}`}
						>
							<CheckCircle2
								className={`w-3.5 h-3.5 ${image ? "text-emerald-400" : "text-emerald-500"}`}
							/>
							{service.delay}
						</span>
					)}
					<span
						className={`inline-flex items-center gap-1.5 text-sm font-medium transition-all ml-auto ${image ? "text-white opacity-90 group-hover:opacity-100" : "text-primary opacity-0 group-hover:opacity-100"}`}
					>
						{t("services.knowMore", "En savoir plus")}
						<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
					</span>
				</div>
			</div>
		</button>
	);
}

export function ServicesSection() {
	const { t } = useTranslation();
	const services = useQuery(api.functions.services.list, {});
	const scrollRef = useRef<HTMLDivElement>(null);
	const [activeCard, setActiveCard] = useState(0);

	const isLoading = services === undefined;

	const otherServices = services || [];

	// Define the exact layout order by slug
	const topRowSlugs = ["carte-consulaire", "laissez-passer", "tenant-lieu"];
	const bottomRowSlugs = [
		"transcription-naissance",
		"certificat-coutume-celibat",
		"demande-audience",
	];
	const carouselSlugs = [
		"laissez-passer",
		"tenant-lieu",
		"transcription-naissance",
		"certificat-coutume-celibat",
		"demande-audience",
	];

	const findBySlug = (slug: string) =>
		otherServices.find((s) => s.slug === slug);

	const topRow = topRowSlugs.map(findBySlug).filter(Boolean) as any[];
	const bottomRow = bottomRowSlugs.map(findBySlug).filter(Boolean) as any[];
	const carouselCards = carouselSlugs.map(findBySlug).filter(Boolean) as any[];

	// Carte consulaire only
	const carteConsulaire = findBySlug("carte-consulaire");

	// Track active card via scroll position
	useEffect(() => {
		const el = scrollRef.current;
		if (!el) return;
		const handleScroll = () => {
			const scrollLeft = el.scrollLeft;
			const cardWidth =
				el.firstElementChild?.getBoundingClientRect().width || 1;
			const idx = Math.round(scrollLeft / cardWidth);
			setActiveCard(Math.min(idx, carouselCards.length - 1));
		};
		el.addEventListener("scroll", handleScroll, { passive: true });
		return () => el.removeEventListener("scroll", handleScroll);
	}, [carouselCards.length]);

	const scrollToCard = (index: number) => {
		const el = scrollRef.current;
		if (!el) return;
		const cardWidth = el.firstElementChild?.getBoundingClientRect().width || 0;
		el.scrollTo({ left: cardWidth * index, behavior: "smooth" });
	};

	return (
		<section className="py-12 md:py-24 px-4 md:px-6" id="services">
			<div className="max-w-7xl mx-auto">
				{/* Section Header */}
				<div className="text-center mb-14">
					<Badge
						variant="secondary"
						className="mb-4 bg-primary/10 text-primary border-primary/20"
					>
						<Sparkles className="w-3.5 h-3.5 mr-1.5" />
						<EditableText
							contentKey="home.services.badge"
							defaultValue={t("services.badge", "Nos Services")}
							pagePath="/"
							sectionId="services"
						/>
					</Badge>
					<h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
						<EditableText
							contentKey="home.services.title"
							defaultValue={t("services.homeTitle", "Services et démarches")}
							pagePath="/"
							sectionId="services"
							as="span"
						/>{" "}
						<EditableText
							contentKey="home.services.titleHighlight"
							defaultValue={t("services.homeTitleHighlight", "à la une")}
							pagePath="/"
							sectionId="services"
							as="span"
							className="text-gradient"
						/>
					</h2>
					<EditableText
						contentKey="home.services.description"
						defaultValue={t(
							"services.homeDescription",
							"Accédez rapidement à vos démarches administratives les plus courantes.",
						)}
						pagePath="/"
						sectionId="services"
						as="p"
						className="text-muted-foreground text-lg max-w-2xl mx-auto"
					/>
				</div>

				{/* ── DESKTOP: Grid layout (hidden on mobile) ── */}
				<div className="hidden md:block">
					{/* Row 1: Carte Consulaire (large) + Laissez-Passer + Tenant Lieu */}
					<div className="grid grid-cols-3 gap-6 mb-6">
						{isLoading ? (
							<>
								<div className="col-span-2 row-span-2">
									<ServiceSkeleton />
								</div>
								<ServiceSkeleton />
								<ServiceSkeleton />
							</>
						) : topRow.length > 0 ? (
							topRow.map((service, i) => {
								const config =
									categoryConfig[service.category] || categoryConfig["default"];
								return (
									<BentoServiceCard
										key={service._id}
										service={service}
										config={config}
										slug={service.slug}
										featured={i === 0}
									/>
								);
							})
						) : (
							<div className="col-span-full text-center py-12 text-muted-foreground">
								{t(
									"services.empty",
									"Aucun service disponible pour le moment.",
								)}
							</div>
						)}
					</div>

					{/* Row 2: Transcription + Certificat de célibat + Demande d'Audience */}
					{!isLoading && bottomRow.length > 0 && (
						<div className="grid grid-cols-3 gap-6">
							{bottomRow.map((service) => {
								const isAudience = service.slug === "demande-audience";
								const config = isAudience
									? {
											icon: CalendarPlus,
											color: "bg-emerald-500/10 text-emerald-600",
											gradient: "from-emerald-500/15 to-emerald-400/5",
										}
									: categoryConfig[service.category] ||
										categoryConfig["default"];
								return (
									<BentoServiceCard
										key={service._id}
										service={service}
										config={config}
										slug={service.slug}
										featured={false}
									/>
								);
							})}
						</div>
					)}
				</div>

				{/* ── MOBILE: Carte Consulaire + Horizontal Scroll Carousel ── */}
				<div className="md:hidden">
					{/* Carte Consulaire card */}
					{isLoading ? (
						<ServiceSkeleton />
					) : carteConsulaire ? (
						<div className="mb-6">
							<BentoServiceCard
								service={carteConsulaire}
								config={
									categoryConfig[carteConsulaire.category] ||
									categoryConfig["default"]
								}
								slug="carte-consulaire"
								featured={true}
							/>
						</div>
					) : null}

					{/* Horizontal scroll carousel */}
					{!isLoading && carouselCards.length > 0 && (
						<div>
							<div
								ref={scrollRef}
								className="flex gap-4 overflow-x-auto snap-x snap-mandatory pt-2 pb-4 scrollbar-hide"
								style={{
									scrollbarWidth: "none",
									msOverflowStyle: "none",
									paddingLeft: "calc((100vw - 85vw) / 2)",
									paddingRight: "calc((100vw - 85vw) / 2)",
								}}
							>
								{carouselCards.map((service) => {
									const isAudience = service.slug === "demande-audience";
									const config = isAudience
										? {
												icon: CalendarPlus,
												color: "bg-emerald-500/10 text-emerald-600",
												gradient: "from-emerald-500/15 to-emerald-400/5",
											}
										: categoryConfig[service.category] ||
											categoryConfig["default"];
									return (
										<div
											key={service._id}
											className="snap-center shrink-0 w-[85vw]"
										>
											<BentoServiceCard
												service={service}
												config={config}
												slug={service.slug}
												featured={false}
											/>
										</div>
									);
								})}
							</div>

							{/* Dot indicators */}
							<div className="flex justify-center gap-2 mt-4">
								{carouselCards.map((_, i) => (
									<button
										key={i}
										onClick={() => scrollToCard(i)}
										className={`rounded-full transition-all duration-300 ${
											activeCard === i
												? "w-6 h-2.5 bg-primary"
												: "w-2.5 h-2.5 bg-muted-foreground/30"
										}`}
										aria-label={`Carte ${i + 1}`}
									/>
								))}
							</div>
						</div>
					)}
				</div>

				{/* View All */}
				<div className="text-center mt-12">
					<Button
						asChild
						variant="outline"
						size="lg"
						className="rounded-full border-[#1a5dab]/30 text-[#1a5dab] hover:bg-[#1a5dab]/5"
					>
						<Link to="/services">
							<EditableText
								contentKey="home.services.viewAll"
								defaultValue={t("services.viewAll", "Voir tous les services")}
								pagePath="/"
								sectionId="services"
								as="span"
							/>
							<ArrowRight className="w-4 h-4 ml-2" />
						</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}

export default ServicesSection;
