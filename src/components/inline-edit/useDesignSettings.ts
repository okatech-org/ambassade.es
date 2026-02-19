import { useCallback, useEffect, useMemo, useState } from "react";

export interface SectionStyle {
	bgColor: string;
	padding: "compact" | "normal" | "spacious" | "xl";
	hidden: boolean;
}

const DEFAULT_STYLE: SectionStyle = {
	bgColor: "",
	padding: "normal",
	hidden: false,
};

export const PADDING_VALUES: Record<SectionStyle["padding"], string> = {
	compact: "py-4 md:py-6 px-4 md:px-6",
	normal: "py-8 md:py-12 px-4 md:px-6",
	spacious: "py-12 md:py-20 px-4 md:px-6",
	xl: "py-16 md:py-28 px-4 md:px-6",
};

export const PADDING_LABELS: Record<SectionStyle["padding"], string> = {
	compact: "Compact",
	normal: "Normal",
	spacious: "Spacieux",
	xl: "Très spacieux",
};

interface DesignSettings {
	sectionOrder: string[];
	sectionStyles: Record<string, SectionStyle>;
}

function storageKey(pagePath: string) {
	return `design_settings_${pagePath}`;
}

function loadSettings(pagePath: string): DesignSettings | null {
	if (typeof window === "undefined") return null;
	try {
		const raw = localStorage.getItem(storageKey(pagePath));
		if (!raw) return null;
		return JSON.parse(raw) as DesignSettings;
	} catch {
		return null;
	}
}

function persistSettings(pagePath: string, settings: DesignSettings) {
	if (typeof window === "undefined") return;
	try {
		localStorage.setItem(storageKey(pagePath), JSON.stringify(settings));
	} catch {
		/* quota exceeded — ignore */
	}
}

/**
 * Hook to manage design settings (section order, styles) for a page.
 *
 * @param pagePath - The page path (e.g. "/le-consulat")
 * @param defaultOrder - The default section order (section IDs)
 */
export function useDesignSettings(pagePath: string, defaultOrder: string[]) {
	const [settings, setSettings] = useState<DesignSettings>(() => {
		const saved = loadSettings(pagePath);
		return saved ?? { sectionOrder: defaultOrder, sectionStyles: {} };
	});

	// Re-sync if defaultOrder changes (e.g. sections added/removed)
	useEffect(() => {
		setSettings((prev) => {
			const ordered = prev.sectionOrder;
			// Add any new sections that aren't in the saved order
			const missing = defaultOrder.filter((id) => !ordered.includes(id));
			// Remove any sections that no longer exist
			const cleaned = ordered.filter((id) => defaultOrder.includes(id));
			if (missing.length === 0 && cleaned.length === ordered.length) {
				return prev; // no changes needed
			}
			return { ...prev, sectionOrder: [...cleaned, ...missing] };
		});
	}, [defaultOrder]);

	// Persist on change
	useEffect(() => {
		persistSettings(pagePath, settings);
	}, [pagePath, settings]);

	const sectionOrder = settings.sectionOrder;

	const getSectionStyle = useCallback(
		(sectionId: string): SectionStyle => {
			return settings.sectionStyles[sectionId] ?? DEFAULT_STYLE;
		},
		[settings.sectionStyles],
	);

	const reorderSections = useCallback((fromIndex: number, toIndex: number) => {
		setSettings((prev) => {
			const newOrder = [...prev.sectionOrder];
			const [moved] = newOrder.splice(fromIndex, 1);
			newOrder.splice(toIndex, 0, moved);
			return { ...prev, sectionOrder: newOrder };
		});
	}, []);

	const updateSectionStyle = useCallback(
		(sectionId: string, patch: Partial<SectionStyle>) => {
			setSettings((prev) => ({
				...prev,
				sectionStyles: {
					...prev.sectionStyles,
					[sectionId]: {
						...(prev.sectionStyles[sectionId] ?? DEFAULT_STYLE),
						...patch,
					},
				},
			}));
		},
		[],
	);

	const resetSectionStyle = useCallback((sectionId: string) => {
		setSettings((prev) => {
			const { [sectionId]: _, ...rest } = prev.sectionStyles;
			return { ...prev, sectionStyles: rest };
		});
	}, []);

	const resetAll = useCallback(() => {
		setSettings({ sectionOrder: defaultOrder, sectionStyles: {} });
	}, [defaultOrder]);

	return useMemo(
		() => ({
			sectionOrder,
			getSectionStyle,
			reorderSections,
			updateSectionStyle,
			resetSectionStyle,
			resetAll,
		}),
		[
			sectionOrder,
			getSectionStyle,
			reorderSections,
			updateSectionStyle,
			resetSectionStyle,
			resetAll,
		],
	);
}
