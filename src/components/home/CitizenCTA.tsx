import {
	ArrowRight,
	CheckCircle2,
	Clock,
	FileDigit,
	MessageCircle,
	PhoneOff,
	ShieldCheck,
	Smartphone,
	Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { EditableText } from "../inline-edit/EditableText";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

interface CitizenCTAProps {
	pagePath?: string;
	sectionId?: string;
	contentKeyPrefix?: string;
}

export function CitizenCTA({
	pagePath = "/",
	sectionId = "cta",
	contentKeyPrefix,
}: CitizenCTAProps) {
	const { t } = useTranslation();
	const scrollRef = useRef<HTMLDivElement>(null);
	const [activeCard, setActiveCard] = useState(0);

	const advantages = [
		{
			icon: PhoneOff,
			title: t(
				"citizenCta.advantages.noWait.title",
				"Plus d'attente téléphonique",
			),
			description: t(
				"citizenCta.advantages.noWait.desc",
				"Posez vos questions en ligne, réponses immédiates.",
			),
		},
		{
			icon: FileDigit,
			title: t(
				"citizenCta.advantages.digital.title",
				"Démarches 100% digitalisées",
			),
			description: t(
				"citizenCta.advantages.digital.desc",
				"De la demande au suivi, tout se fait en ligne.",
			),
		},
		{
			icon: MessageCircle,
			title: t(
				"citizenCta.advantages.fast.title",
				"Réponses rapides à vos questions",
			),
			description: t(
				"citizenCta.advantages.fast.desc",
				"Assistant IA disponible pour toutes vos questions.",
			),
		},
		{
			icon: Clock,
			title: t(
				"citizenCta.advantages.available.title",
				"Disponible 24h/24, 7j/7",
			),
			description: t(
				"citizenCta.advantages.available.desc",
				"Accès à tout moment, tous fuseaux horaires.",
			),
		},
	];

	const trustIndicators = [
		{
			icon: Zap,
			label: t("citizenCta.trust.fast", "Inscription en 2 minutes"),
		},
		{
			icon: Smartphone,
			label: t("citizenCta.trust.online", "100% sur mobile"),
		},
		{
			icon: ShieldCheck,
			label: t("citizenCta.trust.secure", "Sécurisé & confidentiel"),
		},
	];

	// Track active card via scroll position (mobile carousel)
	useEffect(() => {
		const el = scrollRef.current;
		if (!el) return;
		const handleScroll = () => {
			const scrollLeft = el.scrollLeft;
			const cardWidth =
				el.firstElementChild?.getBoundingClientRect().width || 1;
			const idx = Math.round(scrollLeft / cardWidth);
			setActiveCard(Math.min(idx, advantages.length - 1));
		};
		el.addEventListener("scroll", handleScroll, { passive: true });
		return () => el.removeEventListener("scroll", handleScroll);
	}, [advantages.length]);

	const scrollToCard = (index: number) => {
		const el = scrollRef.current;
		if (!el) return;
		const cardWidth = el.firstElementChild?.getBoundingClientRect().width || 0;
		el.scrollTo({ left: cardWidth * index, behavior: "smooth" });
	};

	return (
		<section className="py-12 md:py-24 px-4 md:px-6">
			<div className="max-w-7xl mx-auto">
				{/* Main CTA Card */}
				<div className="relative overflow-hidden rounded-3xl glass-card border-border/50">
					{/* Decorative glow orbs */}
					<div className="absolute top-0 right-0 w-96 h-96 bg-[#1a5dab]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-float" />
					<div
						className="absolute bottom-0 left-0 w-72 h-72 bg-[#34a853]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 animate-float"
						style={{ animationDelay: "1.5s" }}
					/>

					<div className="relative grid lg:grid-cols-2 gap-0 items-stretch">
						{/* Image Side */}
						<div className="relative min-h-[300px] lg:min-h-[500px] overflow-hidden">
							<video
								src="/videos/video_idn_ga.mp4"
								autoPlay
								muted
								loop
								playsInline
								className="absolute inset-0 w-full h-full object-cover"
							/>
						</div>

						{/* Content Side */}
						<div className="relative p-6 md:p-10 lg:p-14 flex flex-col items-center justify-center text-center overflow-hidden">
							<Badge className="mb-6 w-fit bg-primary/10 text-primary border-primary/20 backdrop-blur-sm">
								<EditableText
									contentKey={
										contentKeyPrefix
											? `${contentKeyPrefix}.badge`
											: `citizenCta.${sectionId}.badge`
									}
									defaultValue={t(
										"citizenCta.badge",
										"Application Consulat.ga",
									)}
									pagePath={pagePath}
									sectionId={sectionId}
								/>
							</Badge>

							<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
								<EditableText
									contentKey={
										contentKeyPrefix
											? `${contentKeyPrefix}.title`
											: `citizenCta.${sectionId}.title`
									}
									defaultValue={t("citizenCta.titlePart1", "Votre consulat,")}
									pagePath={pagePath}
									sectionId={sectionId}
									as="span"
								/>{" "}
								<EditableText
									contentKey={
										contentKeyPrefix
											? `${contentKeyPrefix}.titleHighlight`
											: `citizenCta.${sectionId}.titleHighlight`
									}
									defaultValue={t(
										"citizenCta.titleHighlight",
										"dans votre poche",
									)}
									pagePath={pagePath}
									sectionId={sectionId}
									as="span"
									className="text-gradient"
								/>
							</h2>

							<EditableText
								contentKey={
									contentKeyPrefix
										? `${contentKeyPrefix}.description`
										: `citizenCta.${sectionId}.description`
								}
								defaultValue={t(
									"citizenCta.description",
									"Vos démarches consulaires simplifiées : assistant IA, suivi en temps réel, zéro déplacement.",
								)}
								pagePath={pagePath}
								sectionId={sectionId}
								as="p"
								className="text-muted-foreground text-base mb-8 leading-relaxed"
							/>

							{/* Advantages — Desktop Grid (hidden on mobile) */}
							<div className="hidden sm:grid sm:grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8 w-full md:scale-x-[1.15] md:origin-center">
								{advantages.map((advantage) => (
									<div
										key={advantage.title}
										className="flex items-start gap-3 p-3 rounded-xl bg-primary/5 border border-primary/10 text-left"
									>
										<div className="p-2 rounded-lg bg-primary/10 shrink-0">
											<advantage.icon className="w-4 h-4 text-primary" />
										</div>
										<div>
											<p className="text-sm font-semibold text-foreground">
												{advantage.title}
											</p>
											<p className="text-xs text-muted-foreground/80 mt-0.5 leading-relaxed">
												{advantage.description}
											</p>
										</div>
									</div>
								))}
							</div>

							{/* Advantages — Mobile Horizontal Scroll Carousel */}
							<div className="sm:hidden w-full mb-6">
								<div
									ref={scrollRef}
									className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide"
									style={{
										scrollbarWidth: "none",
										msOverflowStyle: "none",
										paddingLeft: "calc((100vw - 72vw) / 2)",
										paddingRight: "calc((100vw - 72vw) / 2)",
									}}
								>
									{advantages.map((advantage) => (
										<div
											key={advantage.title}
											className="snap-center shrink-0 w-[72vw] flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/10 text-left"
										>
											<div className="p-2 rounded-lg bg-primary/10 shrink-0">
												<advantage.icon className="w-4 h-4 text-primary" />
											</div>
											<div>
												<p className="text-sm font-semibold text-foreground">
													{advantage.title}
												</p>
												<p className="text-xs text-muted-foreground/80 mt-0.5 leading-relaxed">
													{advantage.description}
												</p>
											</div>
										</div>
									))}
								</div>

								{/* Dot indicators */}
								<div className="flex justify-center gap-2 mt-2">
									{advantages.map((_, i) => (
										<button
											key={`mob-adv-${i}`}
											type="button"
											onClick={() => scrollToCard(i)}
											className={`rounded-full transition-all duration-300 ${
												activeCard === i
													? "w-6 h-2.5 bg-primary"
													: "w-2.5 h-2.5 bg-muted-foreground/30"
											}`}
											aria-label={`Avantage ${i + 1}`}
										/>
									))}
								</div>
							</div>

							{/* CTA Buttons */}
							<div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6 md:mb-8">
								<Button
									asChild
									size="lg"
									className="h-12 sm:h-14 px-6 sm:px-8 rounded-full shadow-lg shadow-[#1a5dab]/20 bg-[#1a5dab] hover:bg-[#174ea6] text-white transition-all text-sm sm:text-base font-semibold w-full sm:w-auto"
								>
									<a
										href="https://www.consulat.ga/sign-up"
										target="_blank"
										rel="noopener noreferrer"
									>
										🚀{" "}
										<EditableText
											contentKey={`${sectionId === "cta" ? "home" : sectionId === "citizen-cta" ? pagePath.substring(1) : ""}.${sectionId}.cta1`}
											defaultValue={t(
												"citizenCta.cta",
												"Créer mon compte gratuit",
											)}
											pagePath={pagePath}
											sectionId={sectionId}
											as="span"
										/>
										<ArrowRight className="w-4 h-4 ml-2" />
									</a>
								</Button>

								<Button
									asChild
									size="lg"
									variant="outline"
									className="h-12 sm:h-14 px-6 sm:px-8 rounded-full text-sm sm:text-base border-[#1a5dab]/30 text-[#1a5dab] dark:text-[#8ab4f8] dark:border-[#8ab4f8]/30 hover:bg-[#1a5dab]/5 font-semibold w-full sm:w-auto"
								>
									<a
										href="https://www.consulat.ga"
										target="_blank"
										rel="noopener noreferrer"
									>
										<Smartphone className="w-4 h-4 mr-2" />
										<EditableText
											contentKey={`${sectionId === "cta" ? "home" : sectionId === "citizen-cta" ? pagePath.substring(1) : ""}.${sectionId}.cta2`}
											defaultValue={t(
												"citizenCta.ctaSecondary",
												"Découvrir l'app",
											)}
											pagePath={pagePath}
											sectionId={sectionId}
											as="span"
										/>
									</a>
								</Button>
							</div>

							{/* Trust Indicators */}
							<div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
								{trustIndicators.map((item) => (
									<span
										key={item.label}
										className="flex items-center gap-1.5 text-xs text-muted-foreground/70"
									>
										<CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
										{item.label}
									</span>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default CitizenCTA;
