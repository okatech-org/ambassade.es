import { api } from "@convex/_generated/api";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import { toast } from "sonner";
import { useConvexMutationQuery } from "@/integrations/convex/hooks";

export type InlineFieldType = "text" | "richtext" | "image" | "link";

/**
 * Editing levels:
 * - "off"     — No editing
 * - "design"  — Level 0: layout, blocks, sections, colors, buttons, links
 * - "content" — Level 1: text content within blocks
 * - "images"  — Level 2: image replacement and positioning
 * - "full"    — All levels active
 */
export type EditLevel = "off" | "design" | "content" | "images" | "full";

export interface PendingInlineChange {
	contentKey: string;
	pagePath: string;
	sectionId: string;
	fieldType: InlineFieldType;
	value: string;
	defaultValue: string;
}

interface InlineEditContextValue {
	/** Current editing level */
	editLevel: EditLevel;
	/** Set the editing level */
	setEditLevel: (level: EditLevel) => void;
	/** Backward-compat: true when any editing level is active */
	isEditMode: boolean;
	/** Toggle between full edit and off (backward compat) */
	toggleEditMode: () => void;

	/** Level-specific helpers */
	canEditDesign: boolean;
	canEditContent: boolean;
	canEditImages: boolean;

	pendingChanges: Record<string, PendingInlineChange>;
	pendingCount: number;
	setPendingChange: (change: PendingInlineChange) => void;
	clearPendingChange: (contentKey: string) => void;
	saveAll: () => Promise<void>;
	isSaving: boolean;
	/** True once the edit-mode state has been read from storage */
	ready: boolean;
}

const InlineEditContext = createContext<InlineEditContextValue | null>(null);
const EDIT_LEVEL_STORAGE_KEY = "inline_edit_level";

export function InlineEditProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	// Keep SSR and first client render identical, then hydrate from localStorage.
	const [editLevel, setEditLevelState] = useState<EditLevel>("off");
	const [ready, setReady] = useState(false);
	const [pendingChanges, setPendingChanges] = useState<
		Record<string, PendingInlineChange>
	>({});

	const { mutate: updateContent, isPending: isSaving } = useConvexMutationQuery(
		api.functions.inlineContent.updateContent,
	);

	useEffect(() => {
		if (typeof window === "undefined") return;
		try {
			const stored = window.localStorage.getItem(EDIT_LEVEL_STORAGE_KEY);
			// Migrate old boolean format
			if (stored === "true") {
				setEditLevelState("full");
			} else if (stored && stored !== "false") {
				setEditLevelState(stored as EditLevel);
			}
		} finally {
			setReady(true);
		}
	}, []);

	useEffect(() => {
		if (typeof window === "undefined" || !ready) return;
		window.localStorage.setItem(EDIT_LEVEL_STORAGE_KEY, editLevel);
	}, [editLevel, ready]);

	// Computed permission helpers
	const isEditMode = editLevel !== "off";
	const canEditDesign = editLevel === "design" || editLevel === "full";
	const canEditContent = editLevel === "content" || editLevel === "full";
	const canEditImages = editLevel === "images" || editLevel === "full";

	const setEditLevel = useCallback((level: EditLevel) => {
		setEditLevelState(level);
	}, []);

	const toggleEditMode = useCallback(() => {
		setEditLevelState((prev) => (prev === "off" ? "full" : "off"));
	}, []);

	const setPendingChange = useCallback((change: PendingInlineChange) => {
		setPendingChanges((prev) => ({
			...prev,
			[change.contentKey]: change,
		}));
	}, []);

	const clearPendingChange = useCallback((contentKey: string) => {
		setPendingChanges((prev) => {
			const next = { ...prev };
			delete next[contentKey];
			return next;
		});
	}, []);

	const saveAll = useCallback(async () => {
		const changes = Object.values(pendingChanges);
		if (changes.length === 0) {
			toast.info("Aucune modification à sauvegarder");
			return;
		}

		try {
			for (const change of changes) {
				await updateContent({
					contentKey: change.contentKey,
					pagePath: change.pagePath,
					sectionId: change.sectionId,
					fieldType: change.fieldType,
					value: change.value,
					defaultValue: change.defaultValue,
				});
			}
			setPendingChanges({});
			toast.success("Modifications sauvegardées");
		} catch {
			toast.error("Erreur lors de la sauvegarde des modifications");
		}
	}, [pendingChanges, updateContent]);

	const value = useMemo(
		() => ({
			editLevel,
			setEditLevel,
			isEditMode,
			toggleEditMode,
			canEditDesign,
			canEditContent,
			canEditImages,
			pendingChanges,
			pendingCount: Object.keys(pendingChanges).length,
			setPendingChange,
			clearPendingChange,
			saveAll,
			isSaving,
			ready,
		}),
		[
			editLevel,
			setEditLevel,
			isEditMode,
			toggleEditMode,
			canEditDesign,
			canEditContent,
			canEditImages,
			pendingChanges,
			setPendingChange,
			clearPendingChange,
			saveAll,
			isSaving,
			ready,
		],
	);

	return (
		<InlineEditContext.Provider value={value}>
			{children}
		</InlineEditContext.Provider>
	);
}

export function useInlineEditContext() {
	const context = useContext(InlineEditContext);
	if (!context) {
		throw new Error(
			"useInlineEditContext must be used inside InlineEditProvider",
		);
	}
	return context;
}
