import { useConvexAuth } from "convex/react";
import { useEffect, useRef, useState } from "react";
import {
	useConvexMutationQuery,
	useConvexQuery,
} from "@/integrations/convex/hooks";
import type { AdminModule } from "@/lib/admin-modules";
import { api } from "../../convex/_generated/api";

export function useUserData() {
	const { isAuthenticated, isLoading } = useConvexAuth();
	const [ensureCompleted, setEnsureCompleted] = useState(false);
	const ensureRequestedRef = useRef(false);
	const {
		mutate: ensureUser,
		isPending: ensurePending,
		error: ensureError,
	} = useConvexMutationQuery(api.functions.users.ensureUser);

	useEffect(() => {
		if (!isAuthenticated) {
			ensureRequestedRef.current = false;
			setEnsureCompleted(false);
			return;
		}

		if (ensureRequestedRef.current) return;
		ensureRequestedRef.current = true;
		ensureUser(
			{},
			{
				onSettled: () => {
					setEnsureCompleted(true);
				},
			},
		);
	}, [isAuthenticated, ensureUser]);

	const {
		data: userData,
		isPending: userPending,
		error,
	} = useConvexQuery(
		api.functions.users.getMe,
		isAuthenticated && ensureCompleted ? {} : "skip",
	);

	const role = userData?.role ?? "user";
	const allowedModules = userData?.allowedModules ?? [];
	const isSystemAdmin = role === "system_admin";
	const isAdmin = role === "admin" || isSystemAdmin;
	const hasModule = (moduleId: AdminModule) =>
		isSystemAdmin || allowedModules.includes(moduleId);

	return {
		userData,
		role,
		allowedModules,
		isSystemAdmin,
		isAdmin,
		isSuperAdmin: isSystemAdmin, // backward-compat
		hasModule,
		isPending:
			isLoading ||
			(isAuthenticated && !ensureCompleted) ||
			ensurePending ||
			userPending,
		error: error ?? ensureError,
	};
}
