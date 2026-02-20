"use client";

import { useClerk, useUser } from "@clerk/clerk-react";
import { useNavigate } from "@tanstack/react-router";
import { Bell, ChevronsUpDown, LogOut, Settings, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";

export function NavUser({
	user,
}: {
	user: {
		name: string;
		email: string;
		avatar: string;
		isPending?: boolean;
	};
}) {
	const { isMobile } = useSidebar();
	const { signOut } = useClerk();
	const navigate = useNavigate();

	// Use Clerk user as fallback when Convex data is still loading
	const clerkUser = useUser();
	const displayName =
		user.name ||
		clerkUser.user?.fullName ||
		clerkUser.user?.primaryEmailAddress?.emailAddress ||
		"Admin";
	const displayEmail =
		user.email || clerkUser.user?.primaryEmailAddress?.emailAddress || "";
	const displayAvatar = user.avatar || clerkUser.user?.imageUrl || "";
	const initials = displayName.slice(0, 2).toUpperCase();

	// Even while "pending", if we have Clerk data, show the user
	const isActuallyLoading = user.isPending && !clerkUser.user;

	if (isActuallyLoading) {
		return (
			<SidebarMenu>
				<SidebarMenuItem>
					<SidebarMenuButton size="lg" className="cursor-default">
						<Skeleton className="h-8 w-8 rounded-lg" />
						<div className="grid flex-1 gap-1">
							<Skeleton className="h-4 w-24" />
							<Skeleton className="h-3 w-32" />
						</div>
					</SidebarMenuButton>
				</SidebarMenuItem>
			</SidebarMenu>
		);
	}

	const handleSignOut = async () => {
		await signOut();
		navigate({ to: "/" });
	};

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<Avatar className="h-8 w-8 rounded-lg">
								<AvatarImage src={displayAvatar} alt={displayName} />
								<AvatarFallback className="rounded-lg bg-primary/10 text-primary text-xs font-semibold">
									{initials}
								</AvatarFallback>
							</Avatar>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-medium">{displayName}</span>
								<span className="truncate text-xs text-muted-foreground">
									{displayEmail}
								</span>
							</div>
							<ChevronsUpDown className="ml-auto size-4" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
						side={isMobile ? "bottom" : "right"}
						align="end"
						sideOffset={4}
					>
						<DropdownMenuLabel className="p-0 font-normal">
							<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
								<Avatar className="h-8 w-8 rounded-lg">
									<AvatarImage src={displayAvatar} alt={displayName} />
									<AvatarFallback className="rounded-lg bg-primary/10 text-primary text-xs font-semibold">
										{initials}
									</AvatarFallback>
								</Avatar>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-medium">{displayName}</span>
									<span className="truncate text-xs text-muted-foreground">
										{displayEmail}
									</span>
								</div>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem
								onClick={() => navigate({ to: "/admin/settings" })}
							>
								<Settings className="mr-2 h-4 w-4" />
								Paramètres
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => navigate({ to: "/admin/settings" })}
							>
								<Bell className="mr-2 h-4 w-4" />
								Notifications
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() =>
									navigate({
										to: `/admin/users/${encodeURIComponent(displayEmail)}`,
									})
								}
							>
								<User className="mr-2 h-4 w-4" />
								Mon profil
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							onClick={handleSignOut}
							className="text-destructive focus:text-destructive focus:bg-destructive/10"
						>
							<LogOut className="mr-2 h-4 w-4" />
							Se déconnecter
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
