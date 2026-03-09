import { Link } from "@tanstack/react-router";
import { ArrowRight, Bot, Sparkles } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { EditableText } from "@/components/inline-edit/EditableText";
import { Button } from "../ui/button";

const HERO_IMAGES = [
	{
		src: "/images/IMG_5748.PNG",
		alt: "Ambassade du Gabon en Espagne",
		objectPosition: "center 30%",
		objectPositionSm: "center 60%",
	},
];

const SLIDE_INTERVAL = 6000; // ms between slides
const TRANSITION_DURATION = 1000; // ms for crossfade

export function Hero() {
	const { t } = useTranslation();
	const [isVisible, setIsVisible] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);
	const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

	// Entrance animation
	useEffect(() => {
		const timer = setTimeout(() => setIsVisible(true), 100);
		return () => clearTimeout(timer);
	}, []);

	// Auto-advance carousel
	const startAutoPlay = useCallback(() => {
		if (timerRef.current) clearInterval(timerRef.current);
		timerRef.current = setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
		}, SLIDE_INTERVAL);
	}, []);

	useEffect(() => {
		startAutoPlay();
		return () => {
			if (timerRef.current) clearInterval(timerRef.current);
		};
	}, [startAutoPlay]);

	const goToSlide = (index: number) => {
		setCurrentIndex(index);
		startAutoPlay(); // reset timer on manual navigation
	};

	return (
		<section className="relative min-h-[85vh] sm:min-h-[92vh] flex flex-col items-center justify-end">
			{/* Background Image Carousel */}
			<div className="absolute inset-0 z-0">
				{HERO_IMAGES.map((image, index) => (
					<img
						key={image.src}
						src={image.src}
						alt={image.alt}
						loading={index === 0 ? "eager" : "lazy"}
						className="absolute inset-0 w-full h-full object-cover"
						style={{
							objectPosition:
								typeof window !== "undefined" && window.innerWidth >= 640
									? image.objectPositionSm
									: image.objectPosition,
							opacity: index === currentIndex ? 1 : 0,
							transition: `opacity ${TRANSITION_DURATION}ms ease-in-out`,
							zIndex: index === currentIndex ? 1 : 0,
						}}
					/>
				))}
				{/* Gradient overlay for text readability */}
				<div className="absolute inset-0 z-[2] bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
			</div>

			{/* Carousel Indicators */}
			<div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
				{HERO_IMAGES.map((image, index) => (
					<button
						key={image.src}
						type="button"
						aria-label={`Aller à l'image ${index + 1}`}
						onClick={() => goToSlide(index)}
						className="group relative p-1"
					>
						<span
							className={`block rounded-full transition-all duration-300 ${
								index === currentIndex
									? "w-8 h-2 bg-[#EAB308]"
									: "w-2 h-2 bg-white/60 group-hover:bg-white/90"
							}`}
						/>
					</button>
				))}
			</div>

			{/* Main Content */}
			<div
				className={`relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 pt-0 pb-8 sm:pb-12 transition-all duration-700 ${
					isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
				}`}
			>
				<div className="flex flex-col lg:flex-row items-center lg:items-start gap-10">
					{/* Left — Title + CTA */}
					<div className="flex-1 text-center lg:text-left">
						{/* Mobile title — full message with highlight */}
						<h1 className="sm:hidden text-[2.05rem] font-extrabold text-white leading-[1.15] mb-4 tracking-tight drop-shadow-lg">
							<EditableText
								contentKey="home.hero.mobileTitle"
								defaultValue={t("hero.mobileTitle", "L'Ambassade du Gabon")}
								pagePath="/"
								sectionId="hero"
								as="span"
							/>
							<br />
							<EditableText
								contentKey="home.hero.mobileTitleHighlight"
								defaultValue={t(
									"hero.mobileTitleHighlight",
									"passe à l'ère de l'IA",
								)}
								pagePath="/"
								sectionId="hero"
								as="span"
								className="text-[#EAB308]"
							/>
						</h1>
						{/* Desktop title — single editable block */}
						<EditableText
							contentKey="home.hero.title"
							defaultValue={t(
								"hero.title",
								"Bienvenue à l'Ambassade du Gabon en Espagne",
							)}
							pagePath="/"
							sectionId="hero"
							as="h1"
							className="hidden sm:block text-4xl md:text-5xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-[0.7cm] tracking-tight drop-shadow-lg lg:whitespace-nowrap"
						/>

						{/* CTA Buttons — Google Style */}
						<div className="flex flex-nowrap items-center justify-center lg:justify-end gap-3 sm:gap-4 mb-6 sm:mb-[1.5cm]">
							<Button
								asChild
								size="lg"
								className="h-12 sm:h-14 px-5 sm:px-8 rounded-full text-sm sm:text-base shadow-lg shadow-[#EAB308]/30 bg-[#EAB308] hover:bg-[#D4A006] text-black transition-all font-semibold"
							>
								<a
									href="https://www.consulat.ga"
									target="_blank"
									rel="noopener noreferrer"
								>
									<Sparkles className="w-5 h-5 mr-2" />
									<EditableText
										contentKey="home.hero.cta1"
										defaultValue={t("hero.cta", "Découvrir Consulat.ga")}
										pagePath="/"
										sectionId="hero"
										as="span"
									/>
									<ArrowRight className="w-4 h-4 ml-2" />
								</a>
							</Button>

							<Button
								asChild
								size="lg"
								className="h-12 sm:h-14 px-5 sm:px-8 rounded-full text-sm sm:text-base shadow-lg shadow-[#1a5dab]/30 bg-[#1a5dab] hover:bg-[#174ea6] text-white transition-all font-semibold"
							>
								<Link to="/ambassade">
									<Bot className="w-5 h-5 mr-2" />
									<EditableText
										contentKey="home.hero.cta2"
										defaultValue={t("hero.services", "Voir nos services")}
										pagePath="/"
										sectionId="hero"
										as="span"
									/>
								</Link>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Hero;
