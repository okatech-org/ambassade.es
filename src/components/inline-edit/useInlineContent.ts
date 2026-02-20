import { api } from "@convex/_generated/api";
import { useMemo } from "react";
import { useConvexQuery } from "@/integrations/convex/hooks";

/**
 * Lightweight hook to read inline content value for a given contentKey.
 * Returns the stored value or the defaultValue if none exists.
 * Useful for reading text values in non-editable contexts (e.g. top bar, nav labels).
 */
export function useInlineContent(
	contentKey: string,
	_pagePath: string,
	_sectionId: string,
	defaultValue: string,
) {
	const { data } = useConvexQuery(api.functions.inlineContent.getContent, {
		contentKey,
	});

	const value = useMemo(() => {
		return data?.value ?? defaultValue;
	}, [data?.value, defaultValue]);

	return { value, isLoaded: data !== undefined };
}
