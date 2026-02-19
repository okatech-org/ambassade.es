import {
	SignedIn,
	SignedOut,
	SignInButton,
	SignOutButton,
} from "@clerk/clerk-react";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Lock, Shield } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SuperadminSidebar } from "@/components/sidebars/superadmin-sidebar";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { useUserData } from "@/hooks/use-user-data";

export const Route = createFileRoute("/admin")({
	component: AdminRoute,
});

function AdminRoute() {
	const { isPending, isAdmin, userData } = useUserData();

	return (
		<>
			<SignedIn>
				{isPending ? (
					<AdminLoadingPage />
				) : isAdmin ? (
					<SuperadminLayout />
				) : (
					<AdminAccessDeniedPage email={userData?.email} />
				)}
			</SignedIn>
			<SignedOut>
				<AdminLoginPage />
			</SignedOut>
		</>
	);
}

function AdminLoadingPage() {
	return (
		<div className="min-h-screen bg-gradient-to-b from-primary/5 to-background flex items-center justify-center p-4">
			<Card className="w-full max-w-md">
				<CardHeader className="text-center">
					<CardTitle>Chargement...</CardTitle>
					<CardDescription>
						Vérification des permissions d’administration
					</CardDescription>
				</CardHeader>
			</Card>
		</div>
	);
}

function AdminAccessDeniedPage({ email }: { email?: string }) {
	const { t } = useTranslation();

	return (
		<div className="min-h-screen bg-gradient-to-b from-primary/5 to-background flex items-center justify-center p-4">
			<Card className="w-full max-w-md">
				<CardHeader className="text-center">
					<div className="mx-auto w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
						<Shield className="w-8 h-8 text-destructive" />
					</div>
					<CardTitle className="text-2xl">
						{t("admin.login.accessDeniedTitle", "Accès refusé")}
					</CardTitle>
					<CardDescription>
						{t(
							"admin.login.accessDeniedDescription",
							"Votre compte ne dispose pas des droits administrateur.",
						)}
					</CardDescription>
					{email ? (
						<p className="text-xs text-muted-foreground mt-2">
							Connecté avec: <span className="font-medium">{email}</span>
						</p>
					) : null}
				</CardHeader>
				<CardContent>
					<SignOutButton>
						<Button variant="outline" className="w-full">
							Se déconnecter et changer de compte
						</Button>
					</SignOutButton>
				</CardContent>
			</Card>
		</div>
	);
}

function AdminLoginPage() {
	const { t } = useTranslation();

	return (
		<div className="min-h-screen bg-gradient-to-b from-primary/5 to-background flex items-center justify-center p-4">
			<Card className="w-full max-w-md">
				<CardHeader className="text-center">
					<div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
						<Shield className="w-8 h-8 text-primary" />
					</div>
					<CardTitle className="text-2xl">
						{t("admin.login.title", "Administration")}
					</CardTitle>
					<CardDescription>
						{t(
							"admin.login.description",
							"Connectez-vous pour accéder au panneau d'administration du Consulat.",
						)}
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<SignInButton mode="modal">
						<Button className="w-full" size="lg">
							<Lock className="w-4 h-4 mr-2" />
							{t("admin.login.signIn", "Se connecter")}
						</Button>
					</SignInButton>
					<p className="text-xs text-muted-foreground text-center">
						{t(
							"admin.login.restricted",
							"Accès réservé au personnel autorisé du Consulat.",
						)}
					</p>
				</CardContent>
			</Card>
		</div>
	);
}

function SuperadminLayout() {
	const { t } = useTranslation();

	return (
		<SidebarProvider>
			<SuperadminSidebar />
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
					<SidebarTrigger className="-ml-1" />
					<Separator orientation="vertical" className="mr-2 h-4" />
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem className="hidden md:block">
								<BreadcrumbLink href="/admin">Consulat.ga</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator className="hidden md:block" />
							<BreadcrumbItem>
								<BreadcrumbPage>{t("superadmin.nav.dashboard")}</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</header>
				<main className="flex-1 min-w-0 overflow-x-hidden overflow-y-auto p-4 pt-0">
					<Outlet />
				</main>
			</SidebarInset>
		</SidebarProvider>
	);
}
