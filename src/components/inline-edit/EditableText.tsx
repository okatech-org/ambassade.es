import { api } from "@convex/_generated/api";
import { Pencil } from "lucide-react";
import {
	type ElementType,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { useConvexQuery } from "@/integrations/convex/hooks";
import type { InlineFieldType } from "./InlineEditProvider";
import { InlineEditToolbar } from "./InlineEditToolbar";
import { useInlineEdit } from "./use-inline-edit";

interface EditableTextProps {
	contentKey: string;
	defaultValue: string;
	pagePath: string;
	sectionId: string;
	fieldType?: Extract<InlineFieldType, "text" | "richtext" | "link">;
	as?: ElementType;
	className?: string;
}

function RichHtmlContent({ html }: { html: string }) {
	const contentRef = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		if (!contentRef.current) return;
		if (contentRef.current.innerHTML !== html) {
			contentRef.current.innerHTML = html;
		}
	}, [html]);

	return <span ref={contentRef} suppressHydrationWarning />;
}

export function EditableText({
	contentKey,
	defaultValue,
	pagePath,
	sectionId,
	fieldType = "text",
	as = "span",
	className,
}: EditableTextProps) {
	const { data } = useConvexQuery(api.functions.inlineContent.getContent, {
		contentKey,
	});
	const { canEditContent, pendingChanges, setPendingChange, ready } =
		useInlineEdit();
	const [isEditing, setIsEditing] = useState(false);
	// Use state for the ref so toolbar re-renders once the DOM node is attached
	const [editNode, setEditNode] = useState<HTMLElement | null>(null);
	const editRef = useCallback((node: HTMLElement | null) => {
		setEditNode(node);
	}, []);

	// Resolved value: pending > convex > default
	const value = useMemo(() => {
		return pendingChanges[contentKey]?.value ?? data?.value ?? defaultValue;
	}, [pendingChanges, contentKey, data?.value, defaultValue]);

	const Component = as;

	const handleClick = useCallback(
		(e: React.MouseEvent) => {
			if (!canEditContent || !ready) return;
			e.preventDefault();
			e.stopPropagation();
			setIsEditing(true);
		},
		[canEditContent, ready],
	);

	// Sync the editable HTML content whenever value changes.
	useEffect(() => {
		if (!isEditing || !editNode) return;
		if (editNode.innerHTML !== value) {
			editNode.innerHTML = value;
		}
	}, [isEditing, editNode, value]);

	// Focus the editable element when it mounts.
	useEffect(() => {
		if (isEditing && editNode) {
			editNode.focus();
			// Place cursor at the end
			const range = document.createRange();
			const sel = window.getSelection();
			range.selectNodeContents(editNode);
			range.collapse(false);
			sel?.removeAllRanges();
			sel?.addRange(range);
		}
	}, [isEditing, editNode]);

	const handleBlur = useCallback(
		(e: React.FocusEvent) => {
			// Don't close if clicking on the toolbar
			const relatedTarget = e.relatedTarget as HTMLElement | null;
			if (relatedTarget?.closest("[data-inline-toolbar]")) return;
			if (!isEditing || !editNode) return;

			const newValue = editNode.innerHTML;
			setIsEditing(false);
			if (newValue !== value) {
				setPendingChange({
					contentKey,
					pagePath,
					sectionId,
					fieldType,
					value: newValue,
					defaultValue,
				});
			}
		},
		[
			isEditing,
			editNode,
			value,
			contentKey,
			pagePath,
			sectionId,
			fieldType,
			defaultValue,
			setPendingChange,
		],
	);

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			if (e.key === "Escape") {
				e.preventDefault();
				if (editNode) {
					editNode.innerHTML = value;
				}
				setIsEditing(false);
			}
		},
		[value, editNode],
	);

	const handleReset = useCallback(() => {
		if (editNode) {
			editNode.innerHTML = defaultValue;
		}
	}, [defaultValue, editNode]);

	// Not in content edit mode — render the content normally
	if (!canEditContent || !ready) {
		return (
			<Component className={className} suppressHydrationWarning>
				<RichHtmlContent html={value} />
			</Component>
		);
	}

	// Edit mode active, currently editing this field
	if (isEditing) {
		return (
			<>
				<InlineEditToolbar anchorEl={editNode} onReset={handleReset} />
				<Component
					ref={editRef}
					contentEditable
					suppressContentEditableWarning
					onBlur={handleBlur}
					onKeyDown={handleKeyDown}
					className={`${className ?? ""} cursor-text rounded outline outline-2 outline-primary bg-primary/5 focus:outline-primary`}
				/>
			</>
		);
	}

	// Edit mode active, not editing this field — show editable indicator
	return (
		<Component
			onClick={handleClick}
			className={`${className ?? ""} cursor-pointer rounded outline outline-1 outline-dashed outline-primary/40 hover:outline-primary/80 hover:bg-primary/5 transition-colors`}
			title="Cliquer pour éditer"
		>
			<Pencil className="inline-block w-3 h-3 mr-1 text-primary/50" />
			<RichHtmlContent html={value} />
		</Component>
	);
}
