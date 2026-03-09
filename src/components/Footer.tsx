import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { EditableImage } from "@/components/inline-edit/EditableImage";
import { EditableText } from "@/components/inline-edit/EditableText";
import { ModeToggle } from "./mode-toggle";

export default function Footer() {
	const { t } = useTranslation();
	const year = new Date().getFullYear();

	const navLinks = [
		{ label: t("header.nav.home"), href: "/" },
		{ label: t("header.nav.services", "Services"), href: "/services" },
		{
			label: t("header.nav.cooperation", "Coopération"),
			href: "/cooperation",
		},
		{ label: t("header.nav.news", "Actualités"), href: "/actualites" },
		{
			label: t("header.nav.venirFrance", "Venir en France"),
			href: "/venir-en-espagne",
		},
		{
			label: t("header.nav.vieFrance", "Vivre en France"),
			href: "/vie-en-espagne",
		},
		{
			label: t("header.nav.retourGabon", "Retour au Gabon"),
			href: "/retour-au-gabon",
		},
		{ label: t("header.nav.contact", "Contact"), href: "/contact" },
	];

	return (
		<footer className="border-t border-border bg-card/50">
			<div className="mx-auto px-3 py-12">
				<div className="flex flex-col md:flex-row items-start justify-between gap-8">
					{/* Brand */}
					<Link to="/" className="flex items-center gap-3">
						<EditableImage
							contentKey="layout.footer.logo"
							defaultValue="/sceau_gabon.png"
							pagePath="/"
							sectionId="footer"
							alt="Logo Ambassade Gabon"
							className="h-[5rem] sm:h-[6rem] w-auto relative -mb-7 sm:-mb-8 -mt-[0.25cm] sm:-mt-[0.25cm] origin-top"
						/>
						<div>
							<EditableText
								contentKey="layout.footer.brand.line1"
								defaultValue={t("footer.brand.line1", "CONSULAT GÉNÉRAL")}
								pagePath="/"
								sectionId="footer"
								as="div"
								className="font-extrabold text-sm sm:text-base md:text-lg text-foreground leading-tight tracking-wide uppercase"
							/>
							<EditableText
								contentKey="layout.footer.brand.line2"
								defaultValue={t("footer.brand.line2", "Du Gabon en France")}
								pagePath="/"
								sectionId="footer"
								as="div"
								className="font-bold text-foreground/90 leading-snug text-[0.60rem] sm:text-[0.78rem] tracking-[0.185em]"
							/>
							<EditableText
								contentKey="layout.footer.brand.motto"
								defaultValue={t(
									"footer.brand.motto",
									"Union - Travail - Justice",
								)}
								pagePath="/"
								sectionId="footer"
								as="div"
								className="text-[0.65rem] sm:text-xs text-muted-foreground italic leading-snug"
							/>
						</div>
					</Link>

					{/* Nav Links */}
					<nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
						{navLinks.map((link) => (
							<Link
								key={link.href}
								to={link.href}
								className="text-sm text-muted-foreground hover:text-foreground transition-colors"
							>
								{link.label}
							</Link>
						))}
					</nav>

					{/* Social Icons */}
					<div className="flex items-center gap-4">
						<a
							href="https://x.com"
							target="_blank"
							rel="noopener noreferrer"
							className="text-muted-foreground hover:text-foreground transition-colors"
							aria-label="X (Twitter)"
						>
							<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
								<title>X (Twitter)</title>
								<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
							</svg>
						</a>
						<a
							href="https://facebook.com"
							target="_blank"
							rel="noopener noreferrer"
							className="text-muted-foreground hover:text-foreground transition-colors"
							aria-label="Facebook"
						>
							<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
								<title>Facebook</title>
								<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
							</svg>
						</a>
						<a
							href="https://youtube.com"
							target="_blank"
							rel="noopener noreferrer"
							className="text-muted-foreground hover:text-foreground transition-colors"
							aria-label="YouTube"
						>
							<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
								<title>YouTube</title>
								<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
							</svg>
						</a>
					</div>
				</div>
			</div>

			{/* Bottom Bar */}
			<div className="border-t border-border">
				<div className="mx-auto px-3 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
					<p className="text-xs text-muted-foreground">
						{t(
							"footer.copyright",
							"© {{year}} Consulat.ga — Tous droits réservés",
							{ year },
						)}
					</p>
					<div className="flex items-center gap-4 text-xs text-muted-foreground">
						<Link
							to="/mentions-legales"
							className="hover:text-foreground transition-colors"
						>
							{t("footer.links.legal", "Mentions Légales")}
						</Link>
						<span>·</span>
						<Link
							to="/confidentialite"
							className="hover:text-foreground transition-colors"
						>
							{t("footer.links.privacy", "Politique de Confidentialité")}
						</Link>
						<span>·</span>
						<Link
							to="/accessibilite"
							className="hover:text-foreground transition-colors"
						>
							{t("footer.links.accessibility", "Accessibilité")}
						</Link>
					</div>
					<div className="flex items-center gap-2">
						<Link
							to="/admin"
							className="inline-flex items-center rounded-full border border-border/60 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground/60 transition-colors hover:text-foreground hover:border-border"
							aria-label="Admin access"
						>
							Access
						</Link>
						<ModeToggle />
						<span className="text-xs text-muted-foreground">v1.0.0</span>
					</div>
				</div>
			</div>
		</footer>
	);
}
