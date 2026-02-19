import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import {
	BookOpen,
	Building2,
	Calendar,
	Check,
	ChevronDown,
	FileText,
	Home,
	Mail,
	Menu,
	Newspaper,
	Phone,
	Plane,
	X,
} from "lucide-react";
import { Button } from "./ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ModeToggle } from "./mode-toggle";
import { ContactModal } from "./ContactModal";
import { EditableText } from "@/components/inline-edit/EditableText";

export default function Header() {
	const { t, i18n } = useTranslation();
	const [isOpen, setIsOpen] = useState(false);
	const [contactOpen, setContactOpen] = useState(false);
	const languages = [
		{ code: "fr", label: t("header.language.fr", "Français"), flag: "🇫🇷" },
		{ code: "en", label: t("header.language.en", "English"), flag: "🇬🇧" },
	] as const;
	const currentLang = (
		i18n.resolvedLanguage ||
		i18n.language ||
		"fr"
	).toLowerCase();

	const currentLanguage =
		languages.find((l) => currentLang.startsWith(l.code)) || languages[0];

	const changeLanguage = (lng: string) => {
		i18n.changeLanguage(lng);
	};

	const navLinks = [
		{ label: t("header.nav.home"), href: "/", icon: Home },
		{
			label: t("header.nav.consulat", "Consulat Général"),
			href: "/le-consulat",
			icon: Building2,
		},
		{ label: t("header.nav.services"), href: "/services", icon: FileText },
		{ label: t("header.nav.news"), href: "/actualites", icon: Newspaper },
		{
			label: t("header.nav.venirFrance", "Venir en France"),
			href: "/venir-en-france",
			icon: Plane,
		},
		{
			label: t("header.nav.vieFrance", "Vivre en France"),
			href: "/vie-en-france",
			icon: BookOpen,
		},
		{
			label: t("header.nav.retourGabon", "Retour au Gabon"),
			href: "/retour-au-gabon",
			icon: Plane,
		},
	];

	return (
		<>
			<div className="fixed top-0 left-0 right-0 z-50">
				{/* Top Bar */}
				<div className="bg-primary text-primary-foreground text-sm">
					<div className="max-w-7xl mx-auto px-3 py-2 flex justify-between items-center">
						<div className="flex items-center gap-4 sm:gap-6">
							{/* Mobile: Contact button on the left */}
							<Button
								variant="ghost"
								size="sm"
								onClick={() => setContactOpen(true)}
								className="sm:hidden text-primary-foreground hover:text-primary-foreground/80 hover:bg-white/10 h-7 px-2 font-medium"
							>
								<Phone className="w-3.5 h-3.5 mr-1" />
								Contact
							</Button>
							{/* Desktop: email + hours */}
							<a
								href="mailto:contact@consulatdugabon.fr"
								className="hidden sm:flex items-center gap-2 hover:opacity-80 transition-opacity"
							>
								<Mail className="w-4 h-4" />
								contact@consulatdugabon.fr
							</a>
							<span className="opacity-30 hidden sm:inline">|</span>
							<span
								className="hidden sm:flex items-center gap-2"
								suppressHydrationWarning
							>
								<Calendar className="w-4 h-4" />
								{t("header.hours")}
							</span>
						</div>
						<div className="flex items-center gap-2 sm:gap-3">
							{/* Desktop: Nous Contacter */}
							<Button
								variant="ghost"
								size="sm"
								onClick={() => setContactOpen(true)}
								className="hidden sm:inline-flex text-primary-foreground hover:text-primary-foreground/80 hover:bg-white/10 h-7 px-3 font-medium"
							>
								<Phone className="w-3.5 h-3.5 mr-1.5" />
								{t("header.nav.nousContacter", "Nous Contacter")}
							</Button>

							<span className="opacity-30">|</span>

							{/* Theme Toggle — Top bar (desktop only) */}
							<span className="hidden md:inline-flex">
								<ModeToggle variant="header" />
							</span>

							{/* Language Switcher Dropdown */}
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant="ghost"
										size="sm"
										className="text-primary-foreground hover:text-primary-foreground/80 hover:bg-white/10 h-7 px-2"
									>
										<span className="mr-1">{currentLanguage.flag}</span>
										{currentLanguage.code.toUpperCase()}
										<ChevronDown className="w-3 h-3 ml-1" />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end" className="min-w-[140px]">
									{languages.map((lang) => (
										<DropdownMenuItem
											key={lang.code}
											onClick={() => changeLanguage(lang.code)}
											className="flex items-center justify-between cursor-pointer"
										>
											<span className="flex items-center gap-2">
												<span>{lang.flag}</span>
												{lang.label}
											</span>
											{currentLang.startsWith(lang.code) && (
												<Check className="w-4 h-4 text-primary" />
											)}
										</DropdownMenuItem>
									))}
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>
				</div>

				{/* Main Header — Glass effect */}
				<header className="glass border-b border-border/40 overflow-visible">
					<div className="max-w-7xl mx-auto px-3 py-1.5 flex items-center justify-between">
						{/* Logo */}
						<Link to="/" className="flex items-center gap-3">
							<img
								src="/sceau_gabon.png"
								alt="Logo Consulat Gabon"
								className="h-[5rem] sm:h-[6rem] w-auto relative -mb-7 sm:-mb-8 -mt-[0.25cm] sm:-mt-[0.25cm] origin-top"
							/>
							<div>
								<EditableText
									contentKey="layout.header.brand.line1"
									defaultValue={t("header.brand.line1", "CONSULAT GÉNÉRAL")}
									pagePath="/"
									sectionId="header"
									as="div"
									className="font-extrabold text-sm sm:text-base md:text-lg text-foreground leading-tight tracking-wide uppercase"
								/>
								<EditableText
									contentKey="layout.header.brand.line2"
									defaultValue={t("header.brand.line2", "Du Gabon en France")}
									pagePath="/"
									sectionId="header"
									as="div"
									className="font-medium text-foreground/90 leading-snug text-[0.72rem] sm:text-[0.94rem] tracking-[0.185em]"
								/>
								<EditableText
									contentKey="layout.header.brand.motto"
									defaultValue={t(
										"header.brand.motto",
										"Union - Travail - Justice",
									)}
									pagePath="/"
									sectionId="header"
									as="div"
									className="text-[0.65rem] sm:text-xs text-muted-foreground italic leading-snug"
								/>
							</div>
						</Link>

						{/* Right Side: Navigation + Mobile Menu */}
						<div className="flex items-center gap-3">
							{/* Desktop Navigation */}
							<nav className="hidden lg:flex items-center gap-1">
								{navLinks.map((link) => (
									<Button
										key={link.label}
										asChild
										variant="ghost"
										size="sm"
										className="font-medium rounded-full"
									>
										<Link
											to={link.href}
											activeProps={{
												className:
													"bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground",
											}}
										>
											{link.label}
										</Link>
									</Button>
								))}
							</nav>

							{/* Mobile: Theme + Menu */}
							<div className="flex items-center gap-2 lg:hidden">
								<ModeToggle variant="header" />
								<Button
									variant="ghost"
									size="icon"
									onClick={() => setIsOpen(true)}
									className="rounded-xl bg-secondary/50 border border-border/50"
									aria-label={t("header.openMenu")}
								>
									<Menu className="w-5 h-5" />
								</Button>
							</div>
						</div>
					</div>
				</header>
			</div>

			{/* Mobile Sidebar Overlay */}
			{isOpen && (
				<div
					className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
					onClick={() => setIsOpen(false)}
				/>
			)}

			{/* Mobile Sidebar */}
			<aside
				className={`fixed top-0 left-0 h-full w-80 bg-card z-50 transform transition-transform duration-300 ease-out lg:hidden flex flex-col shadow-2xl ${
					isOpen ? "translate-x-0" : "-translate-x-full"
				}`}
			>
				{/* Sidebar Header */}
				<div className="flex items-center justify-between p-4 border-b border-border">
					<div className="flex items-center gap-3">
						<img
							src="/sceau_gabon.png"
							alt="Logo Consulat Gabon"
							className="h-20 w-auto"
						/>
						<div>
							<EditableText
								contentKey="layout.header.mobile.brand.line1"
								defaultValue={t("header.brand.line1", "CONSULAT GÉNÉRAL")}
								pagePath="/"
								sectionId="header_mobile"
								as="div"
								className="font-bold text-sm text-foreground tracking-wide uppercase"
							/>
							<EditableText
								contentKey="layout.header.mobile.brand.line2"
								defaultValue={t("header.brand.line2", "Du Gabon en France")}
								pagePath="/"
								sectionId="header_mobile"
								as="div"
								className="font-bold text-xs text-foreground/90"
							/>
							<EditableText
								contentKey="layout.header.mobile.brand.motto"
								defaultValue={t(
									"header.brand.motto",
									"Union - Travail - Justice",
								)}
								pagePath="/"
								sectionId="header_mobile"
								as="div"
								className="text-[10px] text-muted-foreground italic"
							/>
						</div>
					</div>
					<Button
						variant="ghost"
						size="icon"
						onClick={() => setIsOpen(false)}
						className="rounded-full"
						aria-label={t("header.closeMenu")}
					>
						<X className="w-5 h-5" />
					</Button>
				</div>

				{/* Mobile Language Switcher */}
				<div className="p-4 border-b border-border">
					<div className="flex gap-2">
						{languages.map((lang) => (
							<Button
								key={lang.code}
								variant={
									currentLang.startsWith(lang.code) ? "default" : "outline"
								}
								size="sm"
								onClick={() => changeLanguage(lang.code)}
								className="flex-1 rounded-full"
							>
								<span className="mr-1">{lang.flag}</span>
								{lang.label}
							</Button>
						))}
					</div>
				</div>

				{/* Sidebar Navigation */}
				<nav className="flex-1 p-4 overflow-y-auto">
					{navLinks.map((link) => (
						<Link
							key={link.label}
							to={link.href}
							onClick={() => setIsOpen(false)}
							className="flex items-center gap-3 p-3 rounded-full hover:bg-secondary transition-colors mb-1"
							activeProps={{
								className:
									"flex items-center gap-3 p-3 rounded-full bg-primary text-primary-foreground mb-1",
							}}
						>
							<link.icon className="w-5 h-5" />
							<span className="font-medium text-sm">{link.label}</span>
						</Link>
					))}

					{/* Mobile Contact Button */}
					<button
						onClick={() => {
							setIsOpen(false);
							setContactOpen(true);
						}}
						className="flex items-center gap-3 p-3 rounded-full bg-primary text-primary-foreground mt-2"
					>
						<Phone className="w-5 h-5" />
						<span className="font-medium text-sm">
							{t("header.nav.contact", "Contact")}
						</span>
					</button>
				</nav>

				{/* Sidebar Footer */}
				<div className="p-4 border-t border-border flex items-center justify-between">
					<p className="text-xs text-muted-foreground">
						© {new Date().getFullYear()} Consulat.ga
					</p>
					<ModeToggle />
				</div>
			</aside>

			{/* Contact Modal */}
			<ContactModal open={contactOpen} onOpenChange={setContactOpen} />
		</>
	);
}
