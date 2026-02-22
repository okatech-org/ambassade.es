import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Outlet,
	Scripts,
	useLocation,
	useMatches,
} from "@tanstack/react-router";

import { useEffect, useRef } from "react";
import { ImpersonationProvider } from "@/components/admin/ImpersonationProvider";
import { InlineEditBar } from "@/components/inline-edit/InlineEditBar";
import { InlineEditProvider } from "@/components/inline-edit/InlineEditProvider";
import { PreviewContainer } from "@/components/inline-edit/PreviewContainer";
import { PageViewTracker } from "@/components/PageViewTracker";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { MrRayChatbot } from "../components/MrRayChatbot";
import ClerkProvider from "../integrations/clerk/provider";
import ConvexProvider from "../integrations/convex/provider";
import i18n from "../integrations/i18n/i18n";
import I18nProvider from "../integrations/i18n/provider";

import appCss from "../styles.css?url";

interface MyRouterContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	head: () => {
		const isEn = (i18n.resolvedLanguage || i18n.language).startsWith("en");
		return {
			meta: [
				{
					charSet: "utf-8",
				},
				{
					name: "viewport",
					content: "width=device-width, initial-scale=1",
				},
				{
					title: isEn
						? "General Consulate of Gabon in France - Official Website"
						: "Consulat Général du Gabon en France - Site Officiel",
				},
				{
					name: "description",
					content: isEn
						? "Official information website of the General Consulate of Gabon in France. Find consular procedures, news and practical information."
						: "Site officiel d'information du Consulat Général du Gabon en France. Retrouvez toutes les démarches consulaires, actualités, et informations pratiques.",
				},
				{
					property: "og:title",
					content: isEn
						? "General Consulate of Gabon in France"
						: "Consulat Général du Gabon en France",
				},
				{
					property: "og:description",
					content: isEn
						? "Official information website of the General Consulate of Gabon in France."
						: "Site officiel d'information du Consulat Général du Gabon en France.",
				},
				{
					property: "og:type",
					content: "website",
				},
				{
					name: "theme-color",
					content: "#009E60", // Gabon Green
				},
			],
			links: [
				{
					rel: "stylesheet",
					href: appCss,
				},
			],
		};
	},

	shellComponent: RootDocument,
	component: RootLayout,
});

const routesWithOwnLayout = ["/admin"];

function RootLayout() {
	const matches = useMatches();
	const location = useLocation();

	const hasOwnLayout = matches.some((match) =>
		routesWithOwnLayout.some((route) => match.fullPath.startsWith(route)),
	);

	const mainRef = useRef<HTMLElement>(null);

	// biome-ignore lint/correctness/useExhaustiveDependencies: intentionally scroll on route change
	useEffect(() => {
		if (mainRef.current) {
			mainRef.current.scrollTop = 0;
		}
	}, [location]);

	useEffect(() => {
		if (hasOwnLayout) return;

		const handleWheel = (e: WheelEvent) => {
			if (!mainRef.current) return;

			let target = e.target as HTMLElement | null;

			while (target) {
				if (target === mainRef.current) {
					return;
				}

				const style = window.getComputedStyle(target);
				const overflowY = style.overflowY;
				const isScrollable =
					(overflowY === "auto" || overflowY === "scroll") &&
					target.scrollHeight > target.clientHeight;

				if (isScrollable) {
					return;
				}

				target = target.parentElement;
			}

			mainRef.current.scrollTop += e.deltaY;
		};

		window.addEventListener("wheel", handleWheel);
		return () => window.removeEventListener("wheel", handleWheel);
	}, [hasOwnLayout]);

	return (
		<>
			<PageViewTracker />
			{!hasOwnLayout && <Header />}
			<main
				ref={mainRef}
				className="overflow-y-auto"
				style={{
					marginTop: hasOwnLayout
						? "0"
						: "clamp(64px, calc(64px + 36px), 100px)",
					height: hasOwnLayout
						? "100vh"
						: "calc(100vh - clamp(64px, calc(64px + 36px), 100px))",
				}}
			>
				<PreviewContainer>
					<Outlet />
				</PreviewContainer>
				{!hasOwnLayout && <Footer />}
				{!hasOwnLayout && <MrRayChatbot />}
			</main>
			{!hasOwnLayout && <InlineEditBar />}
		</>
	);
}

function RootDocument({ children }: { children: React.ReactNode }) {
	const htmlLang = (i18n.resolvedLanguage || i18n.language).startsWith("en")
		? "en"
		: "fr";

	return (
		<html
			lang={htmlLang}
			className="h-full overflow-hidden"
			suppressHydrationWarning
		>
			<head>
				<HeadContent />
				{/* Anti-FOUC: hide body until CSS is loaded */}
				<script
					dangerouslySetInnerHTML={{
						__html: `(function(){var d=document.documentElement;d.style.opacity='0';d.style.transition='opacity 0.15s ease-in';window.addEventListener('DOMContentLoaded',function(){requestAnimationFrame(function(){d.style.opacity='1'})})})()`,
					}}
				/>
				<noscript>
					<style
						dangerouslySetInnerHTML={{ __html: "html{opacity:1!important}" }}
					/>
				</noscript>
			</head>
			<body className="h-full overflow-hidden" suppressHydrationWarning>
				<I18nProvider>
					<ClerkProvider>
						<ConvexProvider>
							<ThemeProvider
								attribute="class"
								defaultTheme="system"
								enableSystem
							>
								<ImpersonationProvider>
									<InlineEditProvider>{children}</InlineEditProvider>
								</ImpersonationProvider>
							</ThemeProvider>
						</ConvexProvider>
					</ClerkProvider>
				</I18nProvider>

				<Scripts />
			</body>
		</html>
	);
}
