import { useInlineEditContext } from "./InlineEditProvider";

export type { EditLevel } from "./InlineEditProvider";

export function useInlineEdit() {
	return useInlineEditContext();
}
