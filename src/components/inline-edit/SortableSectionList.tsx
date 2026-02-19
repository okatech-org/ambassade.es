import {
	closestCenter,
	DndContext,
	type DragEndEvent,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import {
	SortableContext,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
	Children,
	cloneElement,
	isValidElement,
	type ReactElement,
	type ReactNode,
} from "react";
import { useInlineEdit } from "./use-inline-edit";
import { useDesignSettings } from "./useDesignSettings";

interface SortableSectionListProps {
	/** Page path for design settings storage */
	pagePath: string;
	/** Default section order (sectionIds) */
	defaultOrder: string[];
	/** Children must be EditableSection components with sectionId props */
	children: ReactNode;
}

/**
 * Wraps EditableSection children in a DndContext for drag-and-drop reordering.
 * Only active in Design mode.
 *
 * Usage:
 * ```tsx
 * <SortableSectionList pagePath="/le-consulat" defaultOrder={["hero", "missions", "team"]}>
 *   <EditableSection sectionId="hero" label="Hero">...</EditableSection>
 *   <EditableSection sectionId="missions" label="Missions">...</EditableSection>
 *   <EditableSection sectionId="team" label="Équipe">...</EditableSection>
 * </SortableSectionList>
 * ```
 */
export function SortableSectionList({
	pagePath,
	defaultOrder,
	children,
}: SortableSectionListProps) {
	const { canEditDesign, ready } = useInlineEdit();
	const {
		sectionOrder,
		getSectionStyle,
		reorderSections,
		updateSectionStyle,
		resetSectionStyle,
	} = useDesignSettings(pagePath, defaultOrder);

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: { distance: 8 },
		}),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		}),
	);

	// Build a map of children by their sectionId prop
	const childMap = new Map<string, ReactElement>();
	Children.forEach(children, (child) => {
		if (
			isValidElement(child) &&
			child.props &&
			typeof (child.props as Record<string, unknown>).sectionId === "string"
		) {
			childMap.set(
				(child.props as Record<string, unknown>).sectionId as string,
				child as ReactElement,
			);
		}
	});

	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event;
		if (!over || active.id === over.id) return;

		const oldIndex = sectionOrder.indexOf(active.id as string);
		const newIndex = sectionOrder.indexOf(over.id as string);
		if (oldIndex !== -1 && newIndex !== -1) {
			reorderSections(oldIndex, newIndex);
		}
	}

	// In non-design mode, render children in saved order with styles applied
	const orderedChildren = sectionOrder
		.map((id) => {
			const child = childMap.get(id);
			if (!child) return null;
			const style = getSectionStyle(id);
			return cloneElement(child, {
				key: id,
				style,
				onUpdateStyle: (patch: Record<string, unknown>) =>
					updateSectionStyle(
						id,
						patch as Partial<ReturnType<typeof getSectionStyle>>,
					),
				onResetStyle: () => resetSectionStyle(id),
			} as Record<string, unknown>);
		})
		.filter(Boolean);

	if (!canEditDesign || !ready) {
		return <>{orderedChildren}</>;
	}

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			onDragEnd={handleDragEnd}
		>
			<SortableContext
				items={sectionOrder}
				strategy={verticalListSortingStrategy}
			>
				{orderedChildren}
			</SortableContext>
		</DndContext>
	);
}
