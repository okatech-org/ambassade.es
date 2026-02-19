import {
	Brush,
	Image,
	LayoutGrid,
	Pencil,
	Save,
	Sparkles,
	X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useUserData } from "@/hooks/use-user-data";
import type { EditLevel } from "./InlineEditProvider";
import { useInlineEdit } from "./use-inline-edit";

const EDIT_LEVELS: {
	level: EditLevel;
	label: string;
	shortLabel: string;
	icon: React.ElementType;
	description: string;
}[] = [
	{
		level: "design",
		label: "Design",
		shortLabel: "Design",
		icon: LayoutGrid,
		description: "Agencer blocs, sections, couleurs, boutons",
	},
	{
		level: "content",
		label: "Contenu",
		shortLabel: "Texte",
		icon: Pencil,
		description: "Éditer le texte dans les blocs",
	},
	{
		level: "images",
		label: "Images",
		shortLabel: "Images",
		icon: Image,
		description: "Changer les images et ajuster l'emplacement",
	},
	{
		level: "full",
		label: "Full",
		shortLabel: "Tout",
		icon: Sparkles,
		description: "Activer tous les niveaux d'édition",
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

export function InlineEditBar() {
	const { hasModule } = useUserData();
	const canInlineEdit = hasModule("inline_edit");
	const {
		editLevel,
		setEditLevel,
		isEditMode,
		pendingCount,
		saveAll,
		isSaving,
		ready,
	} = useInlineEdit();

	if (!canInlineEdit || !ready) return null;

	// Off — show the floating activate button
	if (!isEditMode) {
		return (
			<div className="fixed bottom-4 right-4 z-[70]">
				<Button onClick={() => setEditLevel("full")} className="shadow-lg">
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

			{/* Level selector */}
			<div className="flex items-center gap-0.5 bg-muted/50 rounded-lg p-0.5">
				{EDIT_LEVELS.map(({ level, shortLabel, icon: Icon, description }) => (
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
				))}
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
