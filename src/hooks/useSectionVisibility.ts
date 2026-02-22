import { api } from "@convex/_generated/api";
import { useQuery } from "convex/react";
import { useCallback, useEffect, useMemo, useState } from "react";

/**
 * Hook to query section visibility for a page.
 * Returns a helper function `isSectionHidden(sectionId)`.
 */
export function useSectionVisibility(
	pagePath: string,
	previewMode?: "desktop" | "mobile" | "all",
) {
	const visibilityData = useQuery(
		api.functions.sectionVisibility.getPageSectionVisibility,
		{ pagePath },
	);

	const [isMobileWindow, setIsMobileWindow] = useState(false);

	useEffect(() => {
		const checkMobile = () => setIsMobileWindow(window.innerWidth < 768);
		checkMobile(); // Check on mount
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	const hiddenSet = useMemo(() => {
		const set = new Set<string>();
		if (visibilityData) {
			const activeDevice =
				previewMode && previewMode !== "all"
					? previewMode
					: isMobileWindow
						? "mobile"
						: "desktop";

			for (const item of visibilityData) {
				let isHidden = item.hidden ?? false;

				if (activeDevice === "desktop" && item.hiddenDesktop !== undefined) {
					isHidden = item.hiddenDesktop;
				} else if (
					activeDevice === "mobile" &&
					item.hiddenMobile !== undefined
				) {
					isHidden = item.hiddenMobile;
				}

				if (isHidden) set.add(item.sectionId);
			}
		}
		return set;
	}, [visibilityData, previewMode, isMobileWindow]);

	const isSectionHidden = useCallback(
		(sectionId: string) => hiddenSet.has(sectionId),
		[hiddenSet],
	);

	return { isSectionHidden, isLoaded: visibilityData !== undefined };
}
