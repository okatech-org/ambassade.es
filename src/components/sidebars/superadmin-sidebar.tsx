"use client";

import { Link } from "@tanstack/react-router";
import {
	BarChart3,
	BookOpen,
	Building2,
	FileText,
	Home,
	LayoutDashboard,
	type LucideIcon,
	Newspaper,
	Phone,
	Plane,
	ScrollText,
	Settings,
	Shield,
	Users,
} from "lucide-react";
import type * as React from "react";
import { useTranslation } from "react-i18next";

import { NavMain } from "@/components/sidebars/nav-main";
import { NavUser } from "@/components/sidebars/nav-user";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from "@/components/ui/sidebar";
import { useUserData } from "@/hooks/use-user-data";
import type { AdminModule } from "@/lib/admin-modules";

type SidebarItem = {
	title: string;
	url: string;
	icon: LucideIcon;
	isActive?: boolean;
	module?: AdminModule;
	systemAdminOnly?: boolean;
	items?: { title: string; url: string }[];
};

export function SuperadminSidebar({
	...props
}: React.ComponentProps<typeof Sidebar>) {
	const { t } = useTranslation();
	const userDataHook = useUserData();
	const { hasModule, isSystemAdmin } = userDataHook;

	const filterItems = (items: SidebarItem[]) =>
		items.filter((item) => {
			if (item.systemAdminOnly && !isSystemAdmin) return false;
			if (!item.module) return true;
			return hasModule(item.module);
		});

	// ── Section 1: Analytics et Opération ────────────────────────
	const analyticsItems: SidebarItem[] = filterItems([
		{
			title: t("superadmin.nav.analytics", "Statistiques"),
			url: "/admin/analytics",
			icon: BarChart3,
			module: "analytics",
		},
	]);

	// ── Section 2: Gestion et édition ────────────────────────────
	// Each link opens the admin management page; "Édition directe" redirects to the public page.
	const gestionItems: SidebarItem[] = [
		{
			title: t("header.nav.home", "Accueil"),
			url: "/admin/pages/accueil",
			icon: Home,
		},
		{
			title: t("header.nav.consulat", "Le Consulat"),
			url: "/admin/pages/ambassade",
			icon: Building2,
		},
		{
			title: t("header.nav.services", "Services"),
			url: "/admin/pages/services",
			icon: FileText,
		},
		{
			title: t("header.nav.news", "Actualités"),
			url: "/admin/pages/actualites",
			icon: Newspaper,
		},
		{
			title: t("header.nav.venirFrance", "Venir en France"),
			url: "/admin/pages/venir-en-espagne",
			icon: Plane,
		},
		{
			title: t("header.nav.vieFrance", "Vivre en France"),
			url: "/admin/pages/vie-en-espagne",
			icon: BookOpen,
		},
		{
			title: t("header.nav.retourGabon", "Retour au Gabon"),
			url: "/admin/pages/retour-au-gabon",
			icon: Plane,
		},
		{
			title: t("header.nav.contact", "Contact"),
			url: "/admin/pages/contact",
			icon: Phone,
		},
	];

	// ── Section 3: Système ───────────────────────────────────────
	const systemeItems: SidebarItem[] = [
		...filterItems([
			{
				title: t("superadmin.nav.users"),
				url: "/admin/users",
				icon: Users,
				module: "users",
			},
		]),
		...filterItems([
			{
				title: t("superadmin.nav.audit", "Journal d'audit"),
				url: "/admin/audit-logs",
				icon: ScrollText,
				module: "audit",
			},
		]),
		...filterItems([
			{
				title: t("superadmin.nav.settings"),
				url: "/admin/settings",
				icon: Settings,
				module: "settings",
			},
		]),
	];

	// ── User data ────────────────────────────────────────────────
	const user = userDataHook.userData;
	const userData = {
		name:
			user?.firstName && user?.lastName
				? `${user.firstName} ${user.lastName}`
				: user?.firstName || user?.name || "Admin",
		email: user?.email || "",
		avatar: user?.avatarUrl || "/avatars/default.jpg",
		isPending: userDataHook.isPending,
	};

	return (
		<Sidebar collapsible="icon" className="glass-panel border-r" {...props}>
			<SidebarHeader className="border-b/50 pb-4">
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							size="lg"
							asChild
							className="hover:bg-primary/5 transition-colors mt-2"
						>
							<Link to="/admin">
								<div className="bg-primary/10 text-primary flex aspect-square size-10 items-center justify-center rounded-xl">
									<Shield className="size-5" />
								</div>
								<div className="grid flex-1 text-left text-sm leading-tight ml-1">
									<span className="truncate text-lg font-bold text-gradient">
										Consulat.ga
									</span>
									<span className="truncate text-xs font-medium text-muted-foreground">
										Administration
									</span>
								</div>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain
					label="Tableau de bord"
					items={[
						{
							title: t("superadmin.nav.dashboard"),
							url: "/admin",
							icon: LayoutDashboard,
						},
					]}
				/>

				{analyticsItems.length > 0 && (
					<NavMain label="Analytics et Opération" items={analyticsItems} />
				)}

				{gestionItems.length > 0 && (
					<NavMain label="Gestion et édition" items={gestionItems} />
				)}

				{systemeItems.length > 0 && (
					<NavMain label="Système" items={systemeItems} />
				)}
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={userData} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
