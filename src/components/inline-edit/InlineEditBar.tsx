import { useLocation } from "@tanstack/react-router";
import {
	Brush,
	Image,
	LayoutGrid,
	Pencil,
	Save,
	Sparkles,
	X,
} from "lucide-react";
import { useEffect, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LAYOUT_SECTION_IDS, PAGE_REGISTRY } from "@/config/pages";
import { useUserData } from "@/hooks/use-user-data";
import type { EditLevel } from "./InlineEditProvider";
import { useInlineEdit } from "./use-inline-edit";

// ── Edit level definitions ───────────────────────────────────────────────────

const EDIT_LEVELS: {
	level: EditLevel;
	label: string;
	shortLabel: string;
	icon: React.ElementType;
	description: string;
	/** Which pagePermission action is required to show this level */
	requiredAction?: "edit_text" | "edit_image";
}[] = [
	{
		level: "design",
		label: "Design",
		shortLabel: "Design",
		icon: LayoutGrid,
		description: "Agencer blocs, sections, couleurs, boutons",
		// Design: only system admins
	},
	{
		level: "content",
		label: "Contenu",
		shortLabel: "Texte",
		icon: Pencil,
		description: "Éditer le texte dans les blocs",
		requiredAction: "edit_text",
	},
	{
		level: "images",
		label: "Images",
		shortLabel: "Images",
		icon: Image,
		description: "Changer les images et ajuster l'emplacement",
		requiredAction: "edit_image",
	},
	{
		level: "full",
		label: "Full",
		shortLabel: "Tout",
		icon: Sparkles,
		description: "Activer tous les niveaux d'édition",
		// Full: only if user has both text and image on this page
	},
];

const LEVEL_BADGES: Record<
	Exclude<EditLevel, "off">,
	{ label: string; className: string }
> = {
	design: {
		label: "🎨 Design",
		className:
			"bg-violet-500/15 text-violet-700 border-violet-200 dark:text-violet-300 dark:border-violet-800",
	},
	content: {
		label: "📝 Contenu",
		className:
			"bg-blue-500/15 text-blue-700 border-blue-200 dark:text-blue-300 dark:border-blue-800",
	},
	images: {
		label: "🖼 Images",
		className:
			"bg-emerald-500/15 text-emerald-700 border-emerald-200 dark:text-emerald-300 dark:border-emerald-800",
	},
	full: {
		label: "✨ Full",
		className:
			"bg-amber-500/15 text-amber-700 border-amber-200 dark:text-amber-300 dark:border-amber-800",
	},
};

// ── Reverse-map URL path → page slug ─────────────────────────────────────────

/** Build a lookup: publicPath → slug from PAGE_REGISTRY */
const PATH_TO_SLUG: Record<string, string> = {};
for (const [slug, page] of Object.entries(PAGE_REGISTRY)) {
	PATH_TO_SLUG[page.publicPath] = slug;
}

/** Get page slug from current browser path */
function getCurrentPageSlug(pathname: string): string | null {
	// Exact match first (most pages)
	if (PATH_TO_SLUG[pathname]) return PATH_TO_SLUG[pathname];

	// Strip trailing slash
	const clean = pathname.replace(/\/+$/, "") || "/";
	if (PATH_TO_SLUG[clean]) return PATH_TO_SLUG[clean];

	// Try first segment match (e.g. /actualites/some-article → actualites)
	const firstSegment = `/${clean.split("/").filter(Boolean)[0] ?? ""}`;
	if (firstSegment !== "/" && PATH_TO_SLUG[firstSegment])
		return PATH_TO_SLUG[firstSegment];

	return null;
}

// ── Component ────────────────────────────────────────────────────────────────

export function InlineEditBar() {
	const { hasModule, isSystemAdmin, pagePermissions } = useUserData();
	const canInlineEdit = hasModule("inline_edit");
	const location = useLocation();
	const {
		editLevel,
		setEditLevel,
		isEditMode,
		pendingCount,
		saveAll,
		isSaving,
		ready,
	} = useInlineEdit();

	// Detect what page the user is currently on
	const currentSlug = getCurrentPageSlug(location.pathname);

	// Find the user's permissions for this specific page
	const pageCaps = useMemo(() => {
		if (isSystemAdmin) {
			return { canText: true, canImages: true, canDesign: true };
		}
		if (!currentSlug)
			return { canText: false, canImages: false, canDesign: false };

		const perm = pagePermissions.find((p) => p.pageSlug === currentSlug);
		if (!perm) return { canText: false, canImages: false, canDesign: false };

		const canHero = perm.actions.includes("edit_hero");

		// Check if the page has any non-hero, non-layout image fields
		const pageConfig = PAGE_REGISTRY[currentSlug];
		const hasContentImages =
			pageConfig?.sections.some(
				(s) =>
					s.id !== "hero" &&
					!LAYOUT_SECTION_IDS.has(s.id) &&
					s.fields.some((f) => f.fieldType === "image"),
			) ?? false;

		return {
			canText: perm.actions.includes("edit_text") || canHero,
			// Images mode: only show if there are actual non-hero images to edit,
			// or if the user can edit the hero (which always has an image)
			canImages:
				(perm.actions.includes("edit_image") && hasContentImages) || canHero,
			canDesign: false, // Design is system_admin only
		};
	}, [isSystemAdmin, pagePermissions, currentSlug]);

	// Filter edit levels for this specific page
	const availableLevels = useMemo(() => {
		return EDIT_LEVELS.filter(({ level, requiredAction }) => {
			if (level === "design") return pageCaps.canDesign;
			if (level === "full") return pageCaps.canDesign;
			if (requiredAction === "edit_text") return pageCaps.canText;
			if (requiredAction === "edit_image") return pageCaps.canImages;
			return true;
		});
	}, [pageCaps]);

	// Auto-reset editLevel when navigating to a page where current level is unavailable
	useEffect(() => {
		if (!isEditMode || availableLevels.length === 0) return;
		const currentLevelAvailable = availableLevels.some(
			(l) => l.level === editLevel,
		);
		if (!currentLevelAvailable) {
			setEditLevel(availableLevels[0].level);
		}
	}, [availableLevels, editLevel, isEditMode, setEditLevel]);

	if (!canInlineEdit || !ready || availableLevels.length === 0) return null;

	// Default level when activating: first available
	const defaultLevel = availableLevels[0].level;

	// Off — show the floating activate button
	if (!isEditMode) {
		return (
			<div className="fixed bottom-4 right-4 z-[70]">
				<Button
					onClick={() => setEditLevel(defaultLevel)}
					className="shadow-lg"
				>
					<Brush className="h-4 w-4 mr-2" />
					Éditer
				</Button>
			</div>
		);
	}

	const badge = LEVEL_BADGES[editLevel as Exclude<EditLevel, "off">];

	return (
		<div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[70] bg-background/95 backdrop-blur border border-border rounded-xl px-3 py-2.5 shadow-xl flex items-center gap-2 flex-wrap justify-center">
			{/* Current level badge */}
			{badge && (
				<Badge
					variant="outline"
					className={`animate-pulse shrink-0 ${badge.className}`}
				>
					{badge.label}
				</Badge>
			)}

			{/* Level selector — only levels permitted on THIS page */}
			<div className="flex items-center gap-0.5 bg-muted/50 rounded-lg p-0.5">
				{availableLevels.map(
					({ level, shortLabel, icon: Icon, description }) => (
						<button
							key={level}
							type="button"
							title={description}
							onClick={() => setEditLevel(editLevel === level ? "off" : level)}
							className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all ${
								editLevel === level
									? "bg-primary text-primary-foreground shadow-sm"
									: "text-muted-foreground hover:text-foreground hover:bg-accent/60"
							}`}
						>
							<Icon className="h-3.5 w-3.5" />
							<span className="hidden sm:inline">{shortLabel}</span>
						</button>
					),
				)}
			</div>

			{/* Separator */}
			<div className="w-px h-6 bg-border" />

			{/* Pending changes */}
			<span className="text-xs text-muted-foreground shrink-0">
				{pendingCount} modif.
			</span>

			{/* Save */}
			<Button
				size="sm"
				onClick={() => void saveAll()}
				disabled={isSaving || pendingCount === 0}
			>
				<Save className="h-3.5 w-3.5 mr-1" />
				Sauver
			</Button>

			{/* Quit */}
			<Button size="sm" variant="outline" onClick={() => setEditLevel("off")}>
				<X className="h-3.5 w-3.5 mr-1" />
				Quitter
			</Button>
		</div>
	);
}
