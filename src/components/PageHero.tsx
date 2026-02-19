import type { ReactNode } from "react";
import { EditableImage } from "@/components/inline-edit/EditableImage";

interface PageHeroProps {
	/** Background image URL (from /public) */
	image?: string;
	/** Content key prefix for inline-editing the hero image (e.g. "consulat.hero") */
	contentKey?: string;
	/** Page path for inline edit tracking */
	pagePath?: string;
	/** Optional overlay opacity (0–1), defaults to 0.7 */
	overlayOpacity?: number;
	/** Content rendered on the text side */
	children: ReactNode;
	/** Extra CSS class on the outer section */
	className?: string;
}

/**
 * Split-layout hero section: text content on the left, image on the right.
 * Used across all inner pages (Contact, Le Consulat, Integration, etc.).
 *
 * The home page does NOT use this component.
 */
export function PageHero({
	image,
	contentKey,
	pagePath,
	children,
	className = "",
}: PageHeroProps) {
	return (
		<section className={`relative overflow-hidden mt-6 md:mt-8 ${className}`}>
			<div className="flex flex-col md:flex-row items-stretch min-h-[280px] md:min-h-[360px]">
				{/* Text Side */}
				<div
					className={`relative ${image ? "md:w-1/2" : "w-full"} flex flex-col justify-center px-5 md:px-12 lg:px-16 py-6 md:py-8 bg-background`}
				>
					{/* Decorative gradient orbs (subtle) */}
					<div className="absolute top-10 right-10 w-72 h-72 bg-primary/8 rounded-full blur-3xl animate-pulse-glow pointer-events-none" />
					<div
						className="absolute bottom-10 left-10 w-48 h-48 bg-accent/8 rounded-full blur-3xl animate-pulse-glow pointer-events-none"
						style={{ animationDelay: "2s" }}
					/>

					<div className="relative z-10 max-w-xl">{children}</div>
				</div>

				{/* Image Side */}
				{image && (
					<div className="relative md:w-1/2 min-h-[280px] md:min-h-0 overflow-hidden">
						{contentKey && pagePath ? (
							<EditableImage
								contentKey={`${contentKey}.image`}
								defaultValue={image}
								pagePath={pagePath}
								sectionId="hero"
								alt=""
								className="absolute inset-0 w-full h-full object-cover object-center"
							/>
						) : (
							<img
								src={image}
								alt=""
								className="absolute inset-0 w-full h-full object-cover object-center"
							/>
						)}
						{/* Subtle overlay for consistency — pointer-events-none so it doesn't block EditableImage */}
						<div className="absolute inset-0 bg-background/10 pointer-events-none z-0" />
						{/* Gradient fade from text side */}
						<div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent hidden md:block pointer-events-none z-0" />
					</div>
				)}
			</div>
		</section>
	);
}
