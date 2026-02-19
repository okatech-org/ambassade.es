import { Link } from "@tanstack/react-router";
import { ArrowRight, Bot, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { EditableImage } from "@/components/inline-edit/EditableImage";
import { EditableText } from "@/components/inline-edit/EditableText";
import { Button } from "../ui/button";

export function Hero() {
	const { t } = useTranslation();
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setIsVisible(true), 100);
		return () => clearTimeout(timer);
	}, []);

	return (
		<section className="relative min-h-[69vh] sm:min-h-[92vh] flex flex-col items-center justify-end overflow-hidden">
			{/* Background Image */}
			<div className="absolute inset-0 z-0">
				<EditableImage
					contentKey="home.hero.backgroundImage"
					defaultValue="/images/IMG_2415.PNG"
					pagePath="/"
					sectionId="hero"
					alt="Consulat de l'ère IA"
					className="w-full h-full object-cover object-[center_calc(60%-3cm)] sm:object-[center_60%]"
				/>
				{/* Subtle bottom gradient for text readability */}
				<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
			</div>

			{/* Main Content */}
			<div
				className={`relative z-10 w-full max-w-6xl mx-auto px-6 pt-0 pb-12 top-[2cm] sm:top-0 transition-all duration-700 ${
					isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
				}`}
			>
				<div className="flex flex-col lg:flex-row items-center lg:items-start gap-10">
					{/* Left — Title + CTA */}
					<div className="flex-1 text-center lg:text-left">
						{/* Mobile title — single editable block */}
						<EditableText
							contentKey="home.hero.mobileTitle"
							defaultValue={t(
								"hero.mobileTitle",
								"Le Consulat Général passe à l'ère de l'IA",
							)}
							pagePath="/"
							sectionId="hero"
							as="h1"
							className="sm:hidden text-3xl font-extrabold text-white leading-[1.1] mb-[0.7cm] tracking-tight drop-shadow-lg"
						/>
						{/* Desktop title — single editable block */}
						<EditableText
							contentKey="home.hero.title"
							defaultValue={t(
								"hero.title",
								"Le Consulat passe à l'ère de l'IA",
							)}
							pagePath="/"
							sectionId="hero"
							as="h1"
							className="hidden sm:block text-4xl md:text-5xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-[0.7cm] tracking-tight drop-shadow-lg"
						/>

						{/* CTA Buttons — Google Style */}
						<div className="flex flex-wrap items-center justify-center lg:justify-end gap-4 mb-[1.5cm]">
							<Button
								asChild
								size="lg"
								className="h-14 px-8 rounded-full text-base shadow-lg shadow-[#EAB308]/30 bg-[#EAB308] hover:bg-[#D4A006] text-black transition-all font-semibold"
							>
								<a
									href="https://www.consulat.ga"
									target="_blank"
									rel="noopener noreferrer"
								>
									<Sparkles className="w-5 h-5 mr-2" />
									{t("hero.cta", "Découvrir Consulat.ga")}
									<ArrowRight className="w-4 h-4 ml-2" />
								</a>
							</Button>

							<Button
								asChild
								size="lg"
								className="h-14 px-8 rounded-full text-base shadow-lg shadow-[#1a5dab]/30 bg-[#1a5dab] hover:bg-[#174ea6] text-white transition-all font-semibold"
							>
								<Link to="/services">
									<Bot className="w-5 h-5 mr-2" />
									{t("hero.services", "Voir nos services")}
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
