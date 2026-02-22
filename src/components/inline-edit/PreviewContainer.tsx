import { useLocation } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { PAGE_REGISTRY } from "@/config/pages";
import { PageManagementView } from "./PageEditorPanel";
import { useInlineEdit } from "./use-inline-edit";

interface PreviewContainerProps {
	children: ReactNode;
}

/**
 * Wraps page content to simulate a mobile viewport when
 * the editor's preview mode is set to "mobile".
 * It also displays the editor tools (PageEditorPanel)
 * on the left side of the split pane.
 * In "desktop" mode, renders children normally.
 */
export function PreviewContainer({ children }: PreviewContainerProps) {
	const { previewMode, isEditMode } = useInlineEdit();
	const location = useLocation();

	// Only apply mobile frame when actively editing in mobile mode
	if (!isEditMode || previewMode === "desktop") {
		return <>{children}</>;
	}

	// Find if the current route matches a configurable page
	const activePage = Object.values(PAGE_REGISTRY).find(
		(p) => p.publicPath === location.pathname,
	);

	return (
		<div className="flex h-full w-full bg-muted/30 overflow-hidden">
			{/* Left Editor Panel (Only visible if the page is configurable) */}
			{activePage && (
				<div className="w-[400px] border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-lg flex-shrink-0 h-full overflow-y-auto">
					<PageManagementView page={activePage} />
				</div>
			)}

			{/* Right Preview Frame */}
			<div className="flex-1 flex justify-center py-6 px-4 overflow-y-auto h-full items-start">
				<div
					className="relative w-[375px] h-[812px] bg-background rounded-[2rem] shadow-2xl border-[6px] border-foreground/10 overflow-hidden transition-all duration-300 flex-shrink-0"
					style={{ maxWidth: "375px" }}
				>
					{/* Notch */}
					<div className="absolute top-0 inset-x-0 z-50 flex justify-center py-2 bg-background/80 backdrop-blur-sm pointer-events-none">
						<div className="w-28 h-5 bg-foreground/10 rounded-full" />
					</div>

					{/* Page content rendered at mobile width */}
					<div className="h-full w-full overflow-y-auto pb-8 pt-8 relative z-0">
						{children}
					</div>

					{/* Bottom bar indicator */}
					<div className="absolute bottom-0 inset-x-0 z-50 flex justify-center py-2 bg-background/80 backdrop-blur-sm pointer-events-none">
						<div className="w-32 h-1 bg-foreground/15 rounded-full" />
					</div>
				</div>
			</div>
		</div>
	);
}
