import { createFileRoute } from "@tanstack/react-router";
import { useSectionVisibility } from "@/hooks/useSectionVisibility";
import { CitizenCTA } from "../components/home/CitizenCTA";
import { GuidePratiqueSection } from "../components/home/GuidePratiqueSection";
import { Hero } from "../components/home/Hero";
import { NewsSection } from "../components/home/NewsSection";
import { ServicesSection } from "../components/home/ServicesSection";

export const Route = createFileRoute("/")({ component: App });

function App() {
	const { isSectionHidden } = useSectionVisibility("/");

	return (
		<div className="min-h-screen bg-background">
			{/* Hero Section — Stats integrated */}
			{!isSectionHidden("hero") && <Hero />}

			{/* Services Section — Priority content */}
			{!isSectionHidden("services") && <ServicesSection />}

			{/* Guide Pratique — Vie en France */}
			{!isSectionHidden("guide") && <GuidePratiqueSection />}

			{/* Latest News */}
			{!isSectionHidden("news") && <NewsSection />}

			{/* Inscription Consulaire CTA */}
			{!isSectionHidden("cta") && (
				<CitizenCTA contentKeyPrefix="home.cta" pagePath="/" sectionId="cta" />
			)}
		</div>
	);
}
