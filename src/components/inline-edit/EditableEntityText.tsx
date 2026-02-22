import { Loader2, Pencil } from "lucide-react";
import {
	type ElementType,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import { toast } from "sonner";
import { useUserData } from "@/hooks/use-user-data";
import { InlineEditToolbar } from "./InlineEditToolbar";
import { useInlineEdit } from "./use-inline-edit";

interface EditableEntityTextProps {
	value: string;
	onSave: (newValue: string) => Promise<void>;
	pagePath: string;
	sectionId: string;
	fieldType?: "text" | "richtext";
	as?: ElementType;
	className?: string;
}

function RichHtmlContent({
	html,
	as = "span",
}: {
	html: string;
	as?: ElementType;
}) {
	const contentRef = useRef<HTMLElement>(null);
	const Component = as;

	useEffect(() => {
		if (!contentRef.current) return;
		if (contentRef.current.innerHTML !== html) {
			contentRef.current.innerHTML = html;
		}
	}, [html]);

	return <Component ref={contentRef} suppressHydrationWarning />;
}

/** Derive page slug from pagePath for permission checks */
function getPageSlug(pagePath: string): string {
	const clean = pagePath.replace(/^\/+|\/+$/g, "");
	// "actualites/123" -> "actualites"
	const base = clean.split("/")[0];
	return base || "accueil";
}

export function EditableEntityText({
	value,
	onSave,
	pagePath,
	sectionId,
	fieldType = "text",
	as = "span",
	className,
}: EditableEntityTextProps) {
	const { canEditContent, ready } = useInlineEdit();
	const { hasPageAction, isAdmin } = useUserData();
	const [isEditing, setIsEditing] = useState(false);
	const [isSaving, setIsSaving] = useState(false);

	// Permission check
	const pageSlug = getPageSlug(pagePath);
	const requiredAction = sectionId === "hero" ? "edit_hero" : "edit_text";
	const hasPermission =
		!isAdmin || hasPageAction(pageSlug, requiredAction, sectionId);
	const canEdit = canEditContent && hasPermission;

	const [editNode, setEditNode] = useState<HTMLElement | null>(null);
	const editRef = useCallback((node: HTMLElement | null) => {
		setEditNode(node);
	}, []);

	const Component = as;

	const handleClick = useCallback(
		(e: React.MouseEvent) => {
			if (!canEdit || !ready || isSaving) return;
			e.preventDefault();
			e.stopPropagation();
			setIsEditing(true);
		},
		[canEdit, ready, isSaving],
	);

	// Sync content initially
	useEffect(() => {
		if (!isEditing || !editNode) return;
		if (editNode.innerHTML !== value) {
			editNode.innerHTML = value;
		}
	}, [isEditing, editNode, value]);

	// Focus the editable element when it mounts
	useEffect(() => {
		if (isEditing && editNode) {
			editNode.focus();
			const range = document.createRange();
			const sel = window.getSelection();
			range.selectNodeContents(editNode);
			range.collapse(false);
			sel?.removeAllRanges();
			sel?.addRange(range);
		}
	}, [isEditing, editNode]);

	const saveChanges = useCallback(
		async (newValue: string) => {
			if (newValue === value) {
				setIsEditing(false);
				return;
			}

			setIsSaving(true);
			try {
				await onSave(newValue);
				toast.success("Modification enregistrée");
			} catch (error) {
				console.error("Save error:", error);
				toast.error("Erreur lors de l'enregistrement");
				if (editNode) editNode.innerHTML = value; // Revert
			} finally {
				setIsSaving(false);
				setIsEditing(false);
			}
		},
		[value, onSave, editNode],
	);

	const handleBlur = useCallback(
		(e: React.FocusEvent) => {
			// Don't close if clicking on the formatting toolbar
			const relatedTarget = e.relatedTarget as HTMLElement | null;
			if (relatedTarget?.closest("[data-inline-toolbar]")) return;
			if (!isEditing || !editNode || isSaving) return;

			const newValue = editNode.innerHTML;
			void saveChanges(newValue);
		},
		[isEditing, editNode, isSaving, saveChanges],
	);

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			if (e.key === "Escape") {
				e.preventDefault();
				if (editNode) {
					editNode.innerHTML = value;
				}
				setIsEditing(false);
			} else if (e.key === "Enter" && fieldType === "text" && !e.shiftKey) {
				// For simple text, Enter saves
				e.preventDefault();
				if (editNode) {
					editNode.blur(); // Triggers handleBlur
				}
			}
		},
		[value, editNode, fieldType],
	);

	const handleReset = useCallback(() => {
		if (editNode) {
			editNode.innerHTML = value;
		}
	}, [value, editNode]);

	if (!canEdit || !ready) {
		return (
			<Component className={className} suppressHydrationWarning>
				<RichHtmlContent html={value} />
			</Component>
		);
	}

	// Edit mode active, currently editing this field
	if (isEditing) {
		return (
			<div className="relative inline-block w-full">
				<InlineEditToolbar anchorEl={editNode} onReset={handleReset} />
				<Component
					ref={editRef}
					contentEditable={!isSaving}
					suppressContentEditableWarning
					onBlur={handleBlur}
					onKeyDown={handleKeyDown}
					className={`${className ?? ""} cursor-text rounded outline outline-2 outline-emerald-500 bg-emerald-500/5 focus:outline-emerald-500 transition-colors ${isSaving ? "opacity-50 pointer-events-none" : ""}`}
				/>
				{isSaving && (
					<div className="absolute top-2 right-2 flex items-center justify-center pointer-events-none">
						<Loader2 className="w-4 h-4 text-emerald-600 animate-spin" />
					</div>
				)}
			</div>
		);
	}

	// Hover-to-edit state
	return (
		<Component
			onClick={handleClick}
			className={`${className ?? ""} cursor-pointer rounded outline outline-1 outline-dashed outline-emerald-500/40 hover:outline-emerald-500/80 hover:bg-emerald-500/5 transition-colors relative group/entity-edit`}
			title="Cliquer pour éditer le contenu"
		>
			<Pencil className="absolute -top-3 -right-3 w-5 h-5 p-1 bg-emerald-500 text-white rounded-full opacity-0 group-hover/entity-edit:opacity-100 transition-opacity shadow-sm z-10" />
			<RichHtmlContent html={value} />
		</Component>
	);
}
