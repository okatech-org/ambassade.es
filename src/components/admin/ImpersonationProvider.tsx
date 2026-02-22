"use client";

import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";
import { useNavigate } from "@tanstack/react-router";
import { Eye, X } from "lucide-react";
import {
	createContext,
	useCallback,
	useContext,
	useMemo,
	useState,
} from "react";
import { Button } from "@/components/ui/button";
import { useConvexQuery } from "@/integrations/convex/hooks";

// ── Context ──────────────────────────────────────────────────────────────────

interface ImpersonationContextValue {
	/** The ID of the user being impersonated (null if not impersonating) */
	impersonatedUserId: Id<"users"> | null;
	/** The loaded impersonated user data (null if not loaded or not impersonating) */
	impersonatedUser: ImpersonatedUserData | null;
	/** Whether we are currently impersonating someone */
	isImpersonating: boolean;
	/** Start impersonating a user */
	startImpersonation: (userId: Id<"users">) => void;
	/** Stop impersonation */
	stopImpersonation: () => void;
}

export interface ImpersonatedUserData {
	_id: Id<"users">;
	name: string;
	email: string;
	role: string;
	poste?: string;
	avatarUrl?: string;
	allowedModules: string[];
	pagePermissions?: unknown[];
}

const ImpersonationContext = createContext<ImpersonationContextValue | null>(
	null,
);

const STORAGE_KEY = "impersonated_user_id";

// ── Provider ─────────────────────────────────────────────────────────────────

export function ImpersonationProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [impersonatedUserId, setImpersonatedUserId] =
		useState<Id<"users"> | null>(() => {
			if (typeof window === "undefined") return null;
			const stored = localStorage.getItem(STORAGE_KEY);
			return stored ? (stored as Id<"users">) : null;
		});

	// Load the impersonated user's data
	const { data: impersonatedUser } = useConvexQuery(
		api.functions.admin.getUser,
		impersonatedUserId ? { userId: impersonatedUserId } : "skip",
	);

	const startImpersonation = useCallback((userId: Id<"users">) => {
		setImpersonatedUserId(userId);
		localStorage.setItem(STORAGE_KEY, userId);
	}, []);

	const stopImpersonation = useCallback(() => {
		setImpersonatedUserId(null);
		localStorage.removeItem(STORAGE_KEY);
	}, []);

	const value = useMemo(
		() => ({
			impersonatedUserId,
			impersonatedUser: impersonatedUser
				? ({
						...impersonatedUser,
						allowedModules: impersonatedUser.allowedModules ?? [],
					} as ImpersonatedUserData)
				: null,
			isImpersonating: !!impersonatedUserId,
			startImpersonation,
			stopImpersonation,
		}),
		[
			impersonatedUserId,
			impersonatedUser,
			startImpersonation,
			stopImpersonation,
		],
	);

	return (
		<ImpersonationContext.Provider value={value}>
			{children}
		</ImpersonationContext.Provider>
	);
}

// ── Hook ─────────────────────────────────────────────────────────────────────

export function useImpersonation() {
	const ctx = useContext(ImpersonationContext);
	if (!ctx) {
		// Return a no-op if used outside provider
		return {
			impersonatedUserId: null,
			impersonatedUser: null,
			isImpersonating: false,
			startImpersonation: () => {},
			stopImpersonation: () => {},
		} as ImpersonationContextValue;
	}
	return ctx;
}

// ── Banner ───────────────────────────────────────────────────────────────────

export function ImpersonationBanner() {
	const { isImpersonating, impersonatedUser, stopImpersonation } =
		useImpersonation();
	const navigate = useNavigate();

	if (!isImpersonating || !impersonatedUser) return null;

	return (
		<div className="bg-amber-500 text-amber-950 flex items-center justify-between px-4 py-1.5 text-sm font-medium">
			<div className="flex items-center gap-2">
				<Eye className="w-4 h-4" />
				<span>
					Mode impersonation — <strong>{impersonatedUser.name}</strong> (
					{impersonatedUser.email})
					{impersonatedUser.poste && ` • ${impersonatedUser.poste}`}
				</span>
			</div>
			<Button
				type="button"
				variant="ghost"
				size="sm"
				className="h-6 px-2 text-amber-950 hover:bg-amber-600/50 hover:text-amber-950"
				onClick={() => {
					stopImpersonation();
					navigate({ to: "/admin/users" });
				}}
			>
				<X className="w-3.5 h-3.5 mr-1" />
				Quitter
			</Button>
		</div>
	);
}
