import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { EyeOff, GripVertical, Palette, Settings } from "lucide-react";
import { type ReactNode, useState } from "react";
import { SectionColorPicker } from "./SectionColorPicker";
import { SectionSettingsPanel } from "./SectionSettingsPanel";
import { useInlineEdit } from "./use-inline-edit";
import type { SectionStyle } from "./useDesignSettings";

interface EditableSectionProps {
	/** Unique section identifier — used for DnD and design settings */
	sectionId: string;
	/** Label shown in the design mode overlay */
	label: string;
	/** Section style from design settings */
	style?: SectionStyle;
	/** Whether the section is hidden via Admin CMS */
	adminHidden?: boolean;
	/** Callback to update section style */
	onUpdateStyle?: (patch: Partial<SectionStyle>) => void;
	/** Callback to reset section style */
	onResetStyle?: () => void;
	/** The section content */
	children: ReactNode;
	/** Extra CSS class on the wrapper */
	className?: string;
}

/**
 * Wraps a page section to make it visible and interactable in Design editing mode.
 * Integrates with @dnd-kit for drag-and-drop reordering.
 */
export function EditableSection({
	sectionId,
	label,
	style,
	adminHidden,
	onUpdateStyle,
	onResetStyle,
	children,
	className = "",
}: EditableSectionProps) {
	const { canEditDesign, ready } = useInlineEdit();
	const [showColorPicker, setShowColorPicker] = useState(false);
	const [showSettings, setShowSettings] = useState(false);

	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id: sectionId, disabled: !canEditDesign || !ready });

	const dragStyle = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	// Not in design mode — render children with applied styles
	if (!canEditDesign || !ready) {
		// Admin CMS hidden takes priority
		if (adminHidden) return null;
		if (style?.hidden) return null;
		if (style?.bgColor) {
			return <div style={{ backgroundColor: style.bgColor }}>{children}</div>;
		}
		return <>{children}</>;
	}

	// Admin CMS hidden in design mode — show a collapsed placeholder
	if (adminHidden) {
		return (
			<div
				ref={setNodeRef}
				style={dragStyle}
				{...attributes}
				className="relative group/section my-1"
			>
				<div className="flex items-center gap-2 px-4 py-2 bg-orange-50 dark:bg-orange-950/20 border border-dashed border-orange-300 dark:border-orange-800 rounded-lg opacity-60">
					<button
						type="button"
						className="cursor-grab active:cursor-grabbing touch-none"
						{...listeners}
					>
						<GripVertical className="h-4 w-4 text-orange-400" />
					</button>
					<EyeOff className="h-3.5 w-3.5 text-orange-400" />
					<span className="text-xs font-medium text-orange-500">
						{label} — Masquée (Admin)
					</span>
				</div>
			</div>
		);
	}

	// Hidden in design mode — show a collapsed placeholder
	if (style?.hidden) {
		return (
			<div
				ref={setNodeRef}
				style={dragStyle}
				{...attributes}
				className="relative group/section my-1"
			>
				<div className="flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-950/20 border border-dashed border-red-300 dark:border-red-800 rounded-lg opacity-60">
					<button
						type="button"
						className="cursor-grab active:cursor-grabbing touch-none"
						{...listeners}
					>
						<GripVertical className="h-4 w-4 text-red-400" />
					</button>
					<EyeOff className="h-3.5 w-3.5 text-red-400" />
					<span className="text-xs font-medium text-red-500">
						{label} — Masquée
					</span>
					<button
						type="button"
						className="ml-auto text-xs text-red-500 hover:text-red-700 underline"
						onClick={() => onUpdateStyle?.({ hidden: false })}
					>
						Afficher
					</button>
				</div>
			</div>
		);
	}

	return (
		<div
			ref={setNodeRef}
			style={{
				...dragStyle,
				...(style?.bgColor ? { backgroundColor: style.bgColor } : {}),
			}}
			{...attributes}
			className={`relative group/section ${isDragging ? "opacity-50 z-50 shadow-2xl" : ""} ${className}`}
		>
			{/* Section outline — visible on hover */}
			<div className="absolute inset-0 rounded-lg border-2 border-dashed border-violet-400/0 group-hover/section:border-violet-400/60 transition-colors duration-200 pointer-events-none z-30" />

			{/* Section label — top-left badge with drag handle */}
			<div className="absolute -top-0 left-2 z-40 flex items-center gap-1 opacity-0 group-hover/section:opacity-100 transition-opacity duration-200">
				<span className="inline-flex items-center gap-1 rounded-b-lg bg-violet-500/90 px-2 py-1.5 text-xs font-semibold text-white shadow-lg">
					{/* Drag handle */}
					<button
						type="button"
						className="cursor-grab active:cursor-grabbing touch-none hover:bg-violet-600 rounded p-0.5 transition-colors"
						title="Glisser pour réorganiser"
						{...listeners}
					>
						<GripVertical className="h-3.5 w-3.5" />
					</button>
					{label}
				</span>
			</div>

			{/* Design controls — top-right */}
			<div className="absolute top-2 right-2 z-40 flex items-center gap-1 opacity-0 group-hover/section:opacity-100 transition-opacity duration-200">
				{/* Color picker */}
				<div className="relative">
					<button
						type="button"
						className="p-1.5 rounded-md bg-violet-500/90 text-white shadow-lg hover:bg-violet-600 transition-colors"
						title="Modifier les couleurs"
						onClick={() => {
							setShowColorPicker(!showColorPicker);
							setShowSettings(false);
						}}
					>
						<Palette className="h-3.5 w-3.5" />
					</button>
					{showColorPicker && (
						<SectionColorPicker
							currentColor={style?.bgColor ?? ""}
							onColorChange={(color) => onUpdateStyle?.({ bgColor: color })}
							onClose={() => setShowColorPicker(false)}
						/>
					)}
				</div>

				{/* Settings panel */}
				<div className="relative">
					<button
						type="button"
						className="p-1.5 rounded-md bg-violet-500/90 text-white shadow-lg hover:bg-violet-600 transition-colors"
						title="Paramètres de la section"
						onClick={() => {
							setShowSettings(!showSettings);
							setShowColorPicker(false);
						}}
					>
						<Settings className="h-3.5 w-3.5" />
					</button>
					{showSettings && style && (
						<SectionSettingsPanel
							style={style}
							onUpdate={(patch) => onUpdateStyle?.(patch)}
							onReset={() => onResetStyle?.()}
							onClose={() => setShowSettings(false)}
						/>
					)}
				</div>
			</div>

			{/* The actual section content */}
			{children}
		</div>
	);
}
