import { api } from "@convex/_generated/api";
import { useQuery } from "convex/react";
import { useCallback, useMemo } from "react";

/**
 * Hook to query section visibility for a page.
 * Returns a helper function `isSectionHidden(sectionId)`.
 */
export function useSectionVisibility(pagePath: string) {
	const visibilityData = useQuery(
		api.functions.sectionVisibility.getPageSectionVisibility,
		{ pagePath },
	);

	const hiddenSet = useMemo(() => {
		const set = new Set<string>();
		if (visibilityData) {
			for (const item of visibilityData) {
				if (item.hidden) set.add(item.sectionId);
			}
		}
		return set;
	}, [visibilityData]);

	const isSectionHidden = useCallback(
		(sectionId: string) => hiddenSet.has(sectionId),
		[hiddenSet],
	);

	return { isSectionHidden, isLoaded: visibilityData !== undefined };
}
