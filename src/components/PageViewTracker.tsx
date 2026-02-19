import { api } from "@convex/_generated/api";
import { useLocation } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { useConvexMutationQuery } from "@/integrations/convex/hooks";

export function PageViewTracker() {
	const location = useLocation();
	const lastPathRef = useRef<string>("");
	const isDisabledRef = useRef(false);
	const { mutate: trackPageView } = useConvexMutationQuery(
		api.functions.analytics.trackPageView,
	);

	useEffect(() => {
		// Avoid noisy mutation errors in local dev when Convex functions are not yet pushed.
		if (
			import.meta.env.DEV &&
			import.meta.env.VITE_ENABLE_PAGE_TRACKING !== "true"
		) {
			return;
		}
		if (isDisabledRef.current) return;

		const path = location.pathname;
		if (!path || path.startsWith("/admin")) return;
		if (lastPathRef.current === path) return;
		lastPathRef.current = path;

		trackPageView(
			{
				path,
				title: typeof document !== "undefined" ? document.title : undefined,
			},
			{
				onError: (error) => {
					const message =
						error instanceof Error ? error.message : String(error);
					if (message.includes("Could not find public function")) {
						isDisabledRef.current = true;
					}
				},
			},
		);
	}, [location.pathname, trackPageView]);

	return null;
}
