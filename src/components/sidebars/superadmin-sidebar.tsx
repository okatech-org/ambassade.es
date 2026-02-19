"use client";

import { Link } from "@tanstack/react-router";
import {
	BarChart3,
	Bell,
	FileText,
	LayoutDashboard,
	type LucideIcon,
	Newspaper,
	ScrollText,
	Settings,
	Shield,
	ShieldCheck,
	Users,
	UsersRound,
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

export function SuperadminSidebar({
	...props
}: React.ComponentProps<typeof Sidebar>) {
	const { t } = useTranslation();
	const userDataHook = useUserData();
	const { hasModule, isSystemAdmin } = userDataHook;

	type SidebarItem = {
		title: string;
		url: string;
		icon: LucideIcon;
		isActive?: boolean;
		module?: AdminModule;
		systemAdminOnly?: boolean;
		items?: { title: string; url: string }[];
	};

	const baseNavItems: SidebarItem[] = [
		{
			title: t("superadmin.nav.dashboard"),
			url: "/admin",
			icon: LayoutDashboard,
			isActive: true,
		},
		{
			title: t("superadmin.nav.posts", "Actualités"),
			url: "/admin/posts",
			icon: Newspaper,
			module: "posts",
			items: [
				{
					title: t("superadmin.nav.allPosts", "Tous les articles"),
					url: "/admin/posts",
				},
				{
					title: t("superadmin.nav.newPost", "Nouvel article"),
					url: "/admin/posts/new",
				},
			],
		},
		{
			title: t("superadmin.nav.services"),
			url: "/admin/services",
			icon: FileText,
			module: "services",
			items: [
				{ title: t("superadmin.nav.commonServices"), url: "/admin/services" },
			],
		},
		{
			title: t("superadmin.nav.announcements", "Annonces"),
			url: "/admin/announcements",
			icon: Bell,
			module: "announcements",
		},
		{
			title: t("superadmin.nav.team", "Équipe"),
			url: "/admin/team",
			icon: UsersRound,
			module: "team",
			items: [
				{
					title: t("superadmin.nav.allTeamMembers", "Tous les membres"),
					url: "/admin/team",
				},
				{
					title: t("superadmin.nav.newTeamMember", "Nouveau membre"),
					url: "/admin/team/new",
				},
			],
		},
		{
			title: t("superadmin.nav.users"),
			url: "/admin/users",
			icon: Users,
			module: "users",
			items: [{ title: t("superadmin.nav.allUsers"), url: "/admin/users" }],
		},
		{
			title: t("superadmin.nav.adminManagement", "Gestion Admins"),
			url: "/admin/admin-management",
			icon: ShieldCheck,
			systemAdminOnly: true,
		},
		{
			title: t("superadmin.nav.analytics", "Statistiques"),
			url: "/admin/analytics",
			icon: BarChart3,
			module: "analytics",
		},
		{
			title: t("superadmin.nav.audit", "Journal d'audit"),
			url: "/admin/audit-logs",
			icon: ScrollText,
			module: "audit",
		},
		{
			title: t("superadmin.nav.settings"),
			url: "/admin/settings",
			icon: Settings,
			module: "settings",
		},
	];

	const superadminNavItems = baseNavItems.filter((item) => {
		if (item.systemAdminOnly && !isSystemAdmin) {
			return false;
		}
		const moduleId = item.module;
		if (!moduleId) return true;
		return hasModule(moduleId);
	});

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
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild>
							<Link to="/admin">
								<div className="bg-primary text-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
									<Shield className="size-4" />
								</div>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-semibold">Consulat.ga</span>
									<span className="truncate text-xs text-muted-foreground">
										Administration
									</span>
								</div>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={superadminNavItems} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={userData} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
