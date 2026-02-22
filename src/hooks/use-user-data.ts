import { useConvexAuth } from "convex/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useImpersonation } from "@/components/admin/ImpersonationProvider";
import {
	useConvexMutationQuery,
	useConvexQuery,
} from "@/integrations/convex/hooks";
import type { AdminModule } from "@/lib/admin-modules";
import { api } from "../../convex/_generated/api";
import type {
	PageAction,
	PagePermission,
} from "../../convex/lib/adminPermissions";

export function useUserData() {
	const { isAuthenticated, isLoading } = useConvexAuth();
	const [ensureCompleted, setEnsureCompleted] = useState(false);
	const ensureRequestedRef = useRef(false);
	const {
		mutate: ensureUser,
		isPending: ensurePending,
		error: ensureError,
	} = useConvexMutationQuery(api.functions.users.ensureUser);

	// Impersonation overlay
	const { isImpersonating, impersonatedUser } = useImpersonation();

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
		data: realUserData,
		isPending: userPending,
		error,
	} = useConvexQuery(
		api.functions.users.getMe,
		isAuthenticated && ensureCompleted ? {} : "skip",
	);

	// Real user values (always based on the actual logged-in user)
	const realRole = realUserData?.role ?? "user";
	const realIsSystemAdmin = realRole === "system_admin";
	const realIsAdmin = realRole === "admin" || realIsSystemAdmin;

	// Effective values: use impersonated data when active, else real data
	const effectiveData =
		isImpersonating && impersonatedUser ? impersonatedUser : realUserData;

	const role = effectiveData?.role ?? "user";
	const allowedModules = (effectiveData?.allowedModules ?? []) as AdminModule[];
	const pagePermissions =
		(effectiveData?.pagePermissions as PagePermission[] | undefined) ?? [];
	const isSystemAdmin = role === "system_admin";
	const isAdmin = role === "admin" || isSystemAdmin;
	const hasModule = (moduleId: AdminModule) =>
		isSystemAdmin || allowedModules.includes(moduleId);

	/** Check if user can perform a specific action on a page/section */
	const hasPageAction = useCallback(
		(pageSlug: string, action: PageAction, sectionId?: string): boolean => {
			if (isSystemAdmin) return true;
			if (!pagePermissions.length) return false;
			const perm = pagePermissions.find((p) => p.pageSlug === pageSlug);
			if (!perm) return false;
			if (!perm.actions.includes(action)) return false;
			if (sectionId && perm.sections && perm.sections.length > 0) {
				return perm.sections.includes(sectionId);
			}
			return true;
		},
		[isSystemAdmin, pagePermissions],
	);

	return {
		userData: effectiveData,
		realUserData, // always the real logged-in user
		role,
		allowedModules,
		pagePermissions,
		isSystemAdmin,
		isAdmin,
		// For admin route access check, always use real user
		realIsAdmin,
		realIsSystemAdmin,
		isSuperAdmin: isSystemAdmin, // backward-compat
		isImpersonating,
		hasModule,
		hasPageAction,
		isPending:
			isLoading ||
			(isAuthenticated && !ensureCompleted) ||
			ensurePending ||
			userPending,
		error: error ?? ensureError,
	};
}
