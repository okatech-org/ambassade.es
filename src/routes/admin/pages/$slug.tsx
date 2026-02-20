import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useConvex, useMutation, useQuery } from "convex/react";
import {
	BookOpen,
	Building2,
	ChevronDown,
	ChevronRight,
	Clock,
	Edit3,
	ExternalLink,
	Eye,
	EyeOff,
	FileText,
	Home,
	Image as ImageIcon,
	Layers,
	Link as LinkIcon,
	Loader2,
	type LucideIcon,
	Menu,
	MessageSquare,
	Newspaper,
	PanelBottom,
	Phone,
	Plane,
	RotateCcw,
	Save,
	Type,
	Upload,
	X,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useAuthenticatedConvexQuery } from "@/integrations/convex/hooks";

export const Route = createFileRoute("/admin/pages/$slug")({
	component: AdminPageManager,
});

// ── Registry types ───────────────────────────────────────────────────────────

type FieldDef = {
	contentKey: string;
	label: string;
	fieldType: "text" | "richtext" | "image" | "link";
	defaultValue: string;
};

type SectionDef = {
	id: string;
	label: string;
	description: string;
	icon: LucideIcon;
	fields: FieldDef[];
	isLayoutShared?: boolean;
};

/** Section IDs that belong to the shared layout (header / footer). */
const LAYOUT_SECTION_IDS = new Set([
	"header",
	"header_topbar",
	"header_nav",
	"header_mobile",
	"footer",
]);

type PageDef = {
	slug: string;
	title: string;
	description: string;
	publicPath: string;
	icon: LucideIcon;
	color: string;
	sections: SectionDef[];
};

// ── Shared layout sections (Header / Footer) ────────────────────────────────

const HEADER_SECTION: SectionDef = {
	id: "header",
	label: "En-tête (Desktop)",
	description: "Logo, marque, barre info, navigation desktop",
	icon: Menu,
	fields: [
		{
			contentKey: "layout.header.logo",
			label: "Logo",
			fieldType: "image",
			defaultValue: "/sceau_gabon.png",
		},
		{
			contentKey: "layout.header.brand.line1",
			label: "Nom (ligne 1)",
			fieldType: "text",
			defaultValue: "CONSULAT GÉNÉRAL",
		},
		{
			contentKey: "layout.header.brand.line2",
			label: "Nom (ligne 2)",
			fieldType: "text",
			defaultValue: "Du Gabon en France",
		},
		{
			contentKey: "layout.header.brand.motto",
			label: "Devise",
			fieldType: "text",
			defaultValue: "Union - Travail - Justice",
		},
	],
};

const HEADER_TOPBAR_SECTION: SectionDef = {
	id: "header_topbar",
	label: "Barre supérieure",
	description: "Email, horaires, bouton contact",
	icon: Menu,
	fields: [
		{
			contentKey: "layout.header.topbar.email",
			label: "Email",
			fieldType: "text",
			defaultValue: "contact@consulatdugabon.fr",
		},
		{
			contentKey: "layout.header.topbar.hours",
			label: "Horaires",
			fieldType: "text",
			defaultValue: "Lun – Ven : 9h – 16h",
		},
		{
			contentKey: "layout.header.topbar.contactBtn",
			label: "Bouton contact",
			fieldType: "text",
			defaultValue: "Nous Contacter",
		},
	],
};

const HEADER_NAV_SECTION: SectionDef = {
	id: "header_nav",
	label: "Menu navigation",
	description: "Libellés des 7 liens du menu principal",
	icon: Menu,
	fields: [
		{
			contentKey: "layout.header.nav.home",
			label: "Accueil",
			fieldType: "text",
			defaultValue: "Accueil",
		},
		{
			contentKey: "layout.header.nav.consulat",
			label: "Consulat",
			fieldType: "text",
			defaultValue: "Consulat Général",
		},
		{
			contentKey: "layout.header.nav.services",
			label: "Services",
			fieldType: "text",
			defaultValue: "Services",
		},
		{
			contentKey: "layout.header.nav.news",
			label: "Actualités",
			fieldType: "text",
			defaultValue: "Actualités",
		},
		{
			contentKey: "layout.header.nav.venirFrance",
			label: "Venir en France",
			fieldType: "text",
			defaultValue: "Venir en France",
		},
		{
			contentKey: "layout.header.nav.vieFrance",
			label: "Vivre en France",
			fieldType: "text",
			defaultValue: "Vivre en France",
		},
		{
			contentKey: "layout.header.nav.retourGabon",
			label: "Retour au Gabon",
			fieldType: "text",
			defaultValue: "Retour au Gabon",
		},
	],
};

const HEADER_MOBILE_SECTION: SectionDef = {
	id: "header_mobile",
	label: "En-tête (Mobile)",
	description: "Logo et marque du volet mobile",
	icon: Menu,
	fields: [
		{
			contentKey: "layout.header.logo",
			label: "Logo",
			fieldType: "image",
			defaultValue: "/sceau_gabon.png",
		},
		{
			contentKey: "layout.header.mobile.brand.line1",
			label: "Nom (mobile)",
			fieldType: "text",
			defaultValue: "CONSULAT GÉNÉRAL",
		},
		{
			contentKey: "layout.header.mobile.brand.line2",
			label: "Sous-titre (mobile)",
			fieldType: "text",
			defaultValue: "Du Gabon en France",
		},
		{
			contentKey: "layout.header.mobile.brand.motto",
			label: "Devise (mobile)",
			fieldType: "text",
			defaultValue: "Union - Travail - Justice",
		},
	],
};

const FOOTER_SECTION: SectionDef = {
	id: "footer",
	label: "Pied de page",
	description: "Logo, nom, devise et liens du footer",
	icon: PanelBottom,
	fields: [
		{
			contentKey: "layout.footer.brand.line1",
			label: "Ligne 1",
			fieldType: "text",
			defaultValue: "CONSULAT GÉNÉRAL",
		},
		{
			contentKey: "layout.footer.brand.line2",
			label: "Ligne 2",
			fieldType: "text",
			defaultValue: "Du Gabon en France",
		},
		{
			contentKey: "layout.footer.brand.motto",
			label: "Devise",
			fieldType: "text",
			defaultValue: "Union - Travail - Justice",
		},
	],
};

// ── Page registry ────────────────────────────────────────────────────────────

const PAGE_REGISTRY: Record<string, PageDef> = {
	accueil: {
		slug: "accueil",
		title: "Accueil",
		description: "Page d'accueil du site — première impression des visiteurs",
		publicPath: "/",
		icon: Home,
		color: "blue",
		sections: [
			HEADER_SECTION,
			HEADER_TOPBAR_SECTION,
			HEADER_NAV_SECTION,
			HEADER_MOBILE_SECTION,
			{
				id: "hero",
				label: "Bannière principale",
				description: "Image de fond, titre et boutons d'action",
				icon: ImageIcon,
				fields: [
					{
						contentKey: "home.hero.backgroundImage",
						label: "Image de fond",
						fieldType: "image",
						defaultValue: "/images/IMG_2415.PNG",
					},
					{
						contentKey: "home.hero.title",
						label: "Titre (desktop)",
						fieldType: "text",
						defaultValue: "Le Consulat passe à l'ère de l'IA",
					},
					{
						contentKey: "home.hero.mobileTitle",
						label: "Titre (mobile)",
						fieldType: "text",
						defaultValue: "Le Consulat Général passe à l'ère de l'IA",
					},
					{
						contentKey: "home.hero.cta1",
						label: "Bouton CTA principal",
						fieldType: "text",
						defaultValue: "Découvrir Consulat.ga",
					},
					{
						contentKey: "home.hero.cta2",
						label: "Bouton CTA secondaire",
						fieldType: "text",
						defaultValue: "Voir nos services",
					},
				],
			},
			{
				id: "services",
				label: "Services consulaires",
				description: "Badge, titre et description de la section services",
				icon: FileText,
				fields: [
					{
						contentKey: "home.services.badge",
						label: "Badge",
						fieldType: "text",
						defaultValue: "Nos Services",
					},
					{
						contentKey: "home.services.title",
						label: "Titre",
						fieldType: "text",
						defaultValue: "Services et démarches",
					},
					{
						contentKey: "home.services.titleHighlight",
						label: "Titre (accent)",
						fieldType: "text",
						defaultValue: "à la une",
					},
					{
						contentKey: "home.services.description",
						label: "Description",
						fieldType: "text",
						defaultValue:
							"Accédez rapidement à vos démarches administratives les plus courantes.",
					},
					{
						contentKey: "home.services.viewAll",
						label: "Bouton 'Voir tous'",
						fieldType: "text",
						defaultValue: "Voir tous les services",
					},
				],
			},
			{
				id: "guide",
				label: "Guide pratique",
				description: "Badge, titre et description du guide Vie en France",
				icon: BookOpen,
				fields: [
					{
						contentKey: "home.guide.badge",
						label: "Badge",
						fieldType: "text",
						defaultValue: "Vie en France",
					},
					{
						contentKey: "home.guide.title",
						label: "Titre",
						fieldType: "text",
						defaultValue: "Un Écosystème Complet en",
					},
					{
						contentKey: "home.guide.titleHighlight",
						label: "Titre (accent)",
						fieldType: "text",
						defaultValue: "6 Rubriques Essentielles",
					},
					{
						contentKey: "home.guide.description",
						label: "Description",
						fieldType: "text",
						defaultValue:
							"Chaque rubrique vous accompagne pas à pas dans votre vie quotidienne en France.",
					},
					{
						contentKey: "home.guide.viewAll",
						label: "Bouton 'Voir tout'",
						fieldType: "text",
						defaultValue: "Consulter le guide complet",
					},
				],
			},
			{
				id: "news",
				label: "Actualités",
				description: "Badge, titre et description de la section actualités",
				icon: Newspaper,
				fields: [
					{
						contentKey: "home.news.badge",
						label: "Badge",
						fieldType: "text",
						defaultValue: "Actualités & Événements",
					},
					{
						contentKey: "home.news.title",
						label: "Titre",
						fieldType: "text",
						defaultValue: "Restez",
					},
					{
						contentKey: "home.news.titleHighlight",
						label: "Titre (accent)",
						fieldType: "text",
						defaultValue: "Informé",
					},
					{
						contentKey: "home.news.description",
						label: "Description",
						fieldType: "text",
						defaultValue:
							"Communiqués officiels, événements communautaires et informations pratiques du consulat.",
					},
					{
						contentKey: "home.news.viewAll",
						label: "Bouton 'Voir toutes'",
						fieldType: "text",
						defaultValue: "Voir toutes les actualités",
					},
				],
			},
			{
				id: "cta",
				label: "Inscription consulaire",
				description: "Badge, titre, description, vidéo et boutons CTA",
				icon: Layers,
				fields: [
					{
						contentKey: "home.cta.badge",
						label: "Badge",
						fieldType: "text",
						defaultValue: "Application Consulat.ga",
					},
					{
						contentKey: "home.cta.title",
						label: "Titre",
						fieldType: "text",
						defaultValue: "Votre consulat,",
					},
					{
						contentKey: "home.cta.titleHighlight",
						label: "Titre (accent)",
						fieldType: "text",
						defaultValue: "dans votre poche",
					},
					{
						contentKey: "home.cta.description",
						label: "Description",
						fieldType: "text",
						defaultValue:
							"Vos démarches consulaires simplifiées : assistant IA, suivi en temps réel, zéro déplacement.",
					},
					{
						contentKey: "home.cta.video",
						label: "Vidéo de fond",
						fieldType: "text",
						defaultValue: "/videos/video_idn_ga.mp4",
					},
					{
						contentKey: "home.cta.cta1",
						label: "Bouton principal",
						fieldType: "text",
						defaultValue: "Créer mon compte gratuit",
					},
					{
						contentKey: "home.cta.cta2",
						label: "Bouton secondaire",
						fieldType: "text",
						defaultValue: "Découvrir l'app",
					},
				],
			},
			FOOTER_SECTION,
		],
	},
	"le-consulat": {
		slug: "le-consulat",
		title: "Consulat Général",
		description: "Présentation du Consulat, équipe et missions",
		publicPath: "/le-consulat",
		icon: Building2,
		color: "violet",
		sections: [
			HEADER_SECTION,
			HEADER_TOPBAR_SECTION,
			HEADER_NAV_SECTION,
			HEADER_MOBILE_SECTION,
			{
				id: "hero",
				label: "Bannière",
				description: "Image de fond, badge, titre, description et boutons",
				icon: ImageIcon,
				fields: [
					{
						contentKey: "consulat.hero.image",
						label: "Image de fond",
						fieldType: "image",
						defaultValue: "/images/Consult_general.jpeg",
					},
					{
						contentKey: "consulat.hero.badge",
						label: "Badge",
						fieldType: "text",
						defaultValue: "Institution Officielle",
					},
					{
						contentKey: "consulat.hero.title",
						label: "Titre",
						fieldType: "text",
						defaultValue: "Notre mission est de vous accompagner",
					},
					{
						contentKey: "consulat.hero.description",
						label: "Description",
						fieldType: "text",
						defaultValue:
							"Conformément à la Convention de Vienne sur les relations consulaires, le Consulat Général du Gabon en France assure la protection et l'assistance des ressortissants gabonais, délivre les documents officiels et favorise le développement des relations entre les deux pays.",
					},
					{
						contentKey: "consulat.hero.cta1",
						label: "Bouton principal",
						fieldType: "text",
						defaultValue: "Découvrir nos services",
					},
					{
						contentKey: "consulat.hero.cta2",
						label: "Bouton secondaire",
						fieldType: "text",
						defaultValue: "Nous rendre visite",
					},
				],
			},
			{
				id: "consul",
				label: "Mot du Consul",
				description: "Photo, titre et message du Consul Général",
				icon: MessageSquare,
				fields: [
					{
						contentKey: "consulat.consul.photo",
						label: "Photo du Consul",
						fieldType: "image",
						defaultValue: "/images/consul_general.jpg",
					},
					{
						contentKey: "consulat.consul.name",
						label: "Nom complet",
						fieldType: "text",
						defaultValue: "Jean-Rémy MAGANGA-NZAMBA",
					},
					{
						contentKey: "consulat.consul.role",
						label: "Fonction",
						fieldType: "text",
						defaultValue: "Consul Général du Gabon en France",
					},
					{
						contentKey: "consulat.consul.description",
						label: "Message / Bio",
						fieldType: "text",
						defaultValue:
							"Diplomate de carrière, le Consul Général assure la protection et l'assistance des ressortissants gabonais en France. Il veille au renforcement des relations bilatérales entre le Gabon et la France et à la modernisation des services consulaires.",
					},
					{
						contentKey: "consulat.consul.email",
						label: "Email",
						fieldType: "text",
						defaultValue: "contact@consulatdugabon.fr",
					},
				],
			},
			{
				id: "missions",
				label: "Nos missions",
				description: "Badge, titre et sous-titre de la section missions",
				icon: Layers,
				fields: [
					{
						contentKey: "consulat.missions.badge",
						label: "Badge",
						fieldType: "text",
						defaultValue: "Ce que nous faisons",
					},
					{
						contentKey: "consulat.missions.title",
						label: "Titre",
						fieldType: "text",
						defaultValue: "Nos Missions",
					},
					{
						contentKey: "consulat.missions.subtitle",
						label: "Sous-titre",
						fieldType: "text",
						defaultValue:
							"Les fonctions consulaires telles que définies par la Convention de Vienne de 1963",
					},
				],
			},
			{
				id: "team",
				label: "Équipe",
				description: "Badge, titre et sous-titre de la section équipe",
				icon: Layers,
				fields: [
					{
						contentKey: "consulat.team.badge",
						label: "Badge",
						fieldType: "text",
						defaultValue: "Notre équipe",
					},
					{
						contentKey: "consulat.team.title",
						label: "Titre",
						fieldType: "text",
						defaultValue: "Les membres de notre équipe",
					},
					{
						contentKey: "consulat.team.subtitle",
						label: "Sous-titre",
						fieldType: "text",
						defaultValue: "Des professionnels dévoués à votre service",
					},
				],
			},
			{
				id: "cta",
				label: "Appel à l'action",
				description: "Section inscription consulaire (CitizenCTA)",
				icon: Layers,
				fields: [
					{
						contentKey: "consulat.cta.title",
						label: "Titre",
						fieldType: "text",
						defaultValue: "Votre consulat,",
					},
					{
						contentKey: "consulat.cta.titleHighlight",
						label: "Titre (accent)",
						fieldType: "text",
						defaultValue: "dans votre poche",
					},
					{
						contentKey: "consulat.cta.description",
						label: "Description",
						fieldType: "text",
						defaultValue:
							"Vos démarches consulaires simplifiées : assistant IA, suivi en temps réel, zéro déplacement.",
					},
				],
			},
			FOOTER_SECTION,
		],
	},
	services: {
		slug: "services",
		title: "Services",
		description: "Services consulaires proposés aux usagers",
		publicPath: "/services",
		icon: FileText,
		color: "green",
		sections: [
			HEADER_SECTION,
			HEADER_TOPBAR_SECTION,
			HEADER_NAV_SECTION,
			HEADER_MOBILE_SECTION,
			{
				id: "hero",
				label: "En-tête",
				description: "Image de fond, badge, titre, accent et description",
				icon: Type,
				fields: [
					{
						contentKey: "services.hero.image",
						label: "Image de fond",
						fieldType: "image",
						defaultValue: "/images/Consult_general.jpeg",
					},
					{
						contentKey: "services.hero.badge",
						label: "Badge",
						fieldType: "text",
						defaultValue: "Nos Services",
					},
					{
						contentKey: "services.hero.title",
						label: "Titre",
						fieldType: "text",
						defaultValue: "Services Consulaires",
					},
					{
						contentKey: "services.hero.titleHighlight",
						label: "Titre (accent)",
						fieldType: "text",
						defaultValue: "Services",
					},
					{
						contentKey: "services.hero.description",
						label: "Description",
						fieldType: "text",
						defaultValue:
							"Découvrez l'ensemble des services proposés par les représentations consulaires de la République Gabonaise à l'étranger.",
					},
				],
			},
			{
				id: "services_list",
				label: "Liste des services",
				description: "Configuration de la liste des services",
				icon: Layers,
				fields: [
					{
						contentKey: "services.list.searchPlaceholder",
						label: "Placeholder recherche",
						fieldType: "text",
						defaultValue: "Rechercher un service...",
					},
					{
						contentKey: "services.list.noResults",
						label: "Message aucun résultat",
						fieldType: "text",
						defaultValue: "Aucun service ne correspond à votre recherche.",
					},
				],
			},
			FOOTER_SECTION,
		],
	},
	actualites: {
		slug: "actualites",
		title: "Actualités",
		description: "Articles d'actualité et publications",
		publicPath: "/actualites",
		icon: Newspaper,
		color: "amber",
		sections: [
			HEADER_SECTION,
			HEADER_TOPBAR_SECTION,
			HEADER_NAV_SECTION,
			HEADER_MOBILE_SECTION,
			{
				id: "hero",
				label: "En-tête",
				description: "Badge, titre, accent et description",
				icon: Type,
				fields: [
					{
						contentKey: "actualites.hero.badge",
						label: "Badge",
						fieldType: "text",
						defaultValue: "Actualités",
					},
					{
						contentKey: "actualites.hero.title",
						label: "Titre",
						fieldType: "text",
						defaultValue: "Toutes nos",
					},
					{
						contentKey: "actualites.hero.titleHighlight",
						label: "Titre (accent)",
						fieldType: "text",
						defaultValue: "actualités",
					},
					{
						contentKey: "actualites.hero.description",
						label: "Description",
						fieldType: "text",
						defaultValue:
							"Communiqués officiels, événements communautaires et informations pratiques du consulat.",
					},
				],
			},
			{
				id: "filters",
				label: "Filtres",
				description: "Labels de filtre et catégories",
				icon: Layers,
				fields: [
					{
						contentKey: "actualites.filters.all",
						label: "Label « Tous »",
						fieldType: "text",
						defaultValue: "Tous",
					},
					{
						contentKey: "actualites.filters.searchPlaceholder",
						label: "Placeholder recherche",
						fieldType: "text",
						defaultValue: "Rechercher un article...",
					},
				],
			},
			{
				id: "content",
				label: "Articles",
				description: "Configuration de la liste d'articles",
				icon: Newspaper,
				fields: [
					{
						contentKey: "actualites.content.readMore",
						label: "Bouton « Lire la suite »",
						fieldType: "text",
						defaultValue: "Lire la suite",
					},
					{
						contentKey: "actualites.content.noResults",
						label: "Message aucun résultat",
						fieldType: "text",
						defaultValue: "Aucun article ne correspond à vos critères.",
					},
				],
			},
			{
				id: "cta",
				label: "Restez informé",
				description: "Titre et description de la section newsletter",
				icon: Layers,
				fields: [
					{
						contentKey: "actualites.cta.title",
						label: "Titre",
						fieldType: "text",
						defaultValue: "Restez informé",
					},
					{
						contentKey: "actualites.cta.description",
						label: "Description",
						fieldType: "text",
						defaultValue:
							"Abonnez-vous pour recevoir les dernières actualités du consulat.",
					},
					{
						contentKey: "actualites.cta.button",
						label: "Bouton d'abonnement",
						fieldType: "text",
						defaultValue: "S'abonner",
					},
				],
			},
			{
				id: "citizen-cta",
				label: "Appel citoyen",
				description: "Section inscription consulaire (CitizenCTA)",
				icon: Layers,
				fields: [
					{
						contentKey: "actualites.citizenCta.title",
						label: "Titre",
						fieldType: "text",
						defaultValue: "Votre consulat,",
					},
					{
						contentKey: "actualites.citizenCta.titleHighlight",
						label: "Titre (accent)",
						fieldType: "text",
						defaultValue: "dans votre poche",
					},
				],
			},
			FOOTER_SECTION,
		],
	},
	"venir-en-france": {
		slug: "venir-en-france",
		title: "Venir en France",
		description: "Visas et procédures d'entrée",
		publicPath: "/venir-en-france",
		icon: Plane,
		color: "sky",
		sections: [
			HEADER_SECTION,
			HEADER_TOPBAR_SECTION,
			HEADER_NAV_SECTION,
			HEADER_MOBILE_SECTION,
			{
				id: "hero",
				label: "Bannière",
				description: "Image de fond, badge, titre, accent et description",
				icon: ImageIcon,
				fields: [
					{
						contentKey: "venirFrance.hero.image",
						label: "Image de fond",
						fieldType: "image",
						defaultValue: "/images/heroes/hero-vie-france.png",
					},
					{
						contentKey: "venirFrance.hero.badge",
						label: "Badge",
						fieldType: "text",
						defaultValue: "Guide d'arrivée & intégration",
					},
					{
						contentKey: "venirFrance.hero.title",
						label: "Titre",
						fieldType: "text",
						defaultValue: "Venir en France",
					},
					{
						contentKey: "venirFrance.hero.titleHighlight",
						label: "Titre (accent)",
						fieldType: "text",
						defaultValue: "& s'intégrer",
					},
					{
						contentKey: "venirFrance.hero.description",
						label: "Description",
						fieldType: "text",
						defaultValue:
							"Guide complet pour les Gabonais arrivant en France : admission, visa, démarches administratives, codes culturels et conseils pratiques pour une intégration réussie. Le Consulat Général du Gabon vous accompagne.",
					},
				],
			},
			{
				id: "savoir-vivre",
				label: "Savoir-vivre",
				description:
					"Badge, titre et description de la section codes culturels",
				icon: Layers,
				fields: [
					{
						contentKey: "venirFrance.savoirVivre.badge",
						label: "Badge",
						fieldType: "text",
						defaultValue: "Savoir-vivre",
					},
					{
						contentKey: "venirFrance.savoirVivre.title",
						label: "Titre",
						fieldType: "text",
						defaultValue: "Codes culturels & Conventions",
					},
					{
						contentKey: "venirFrance.savoirVivre.description",
						label: "Description",
						fieldType: "text",
						defaultValue:
							"Comprendre les codes de la société française pour mieux y évoluer. Ce n'est pas renoncer à sa culture, c'est en ajouter une autre.",
					},
				],
			},
			{
				id: "guides",
				label: "Guides complets",
				description: "Badge, titre et description de la section guides",
				icon: BookOpen,
				fields: [
					{
						contentKey: "venirFrance.guides.badge",
						label: "Badge",
						fieldType: "text",
						defaultValue: "Guides complets",
					},
					{
						contentKey: "venirFrance.guides.title",
						label: "Titre",
						fieldType: "text",
						defaultValue: "Vos démarches détaillées",
					},
					{
						contentKey: "venirFrance.guides.description",
						label: "Description",
						fieldType: "text",
						defaultValue:
							"Cliquez sur chaque thème pour découvrir les informations détaillées, les procédures et nos astuces pratiques.",
					},
				],
			},
			{
				id: "erreurs",
				label: "Erreurs à éviter",
				description: "Badge, titre et description de la section erreurs",
				icon: Layers,
				fields: [
					{
						contentKey: "venirFrance.erreurs.badge",
						label: "Badge",
						fieldType: "text",
						defaultValue: "À savoir absolument",
					},
					{
						contentKey: "venirFrance.erreurs.title",
						label: "Titre",
						fieldType: "text",
						defaultValue: "Erreurs courantes à éviter",
					},
					{
						contentKey: "venirFrance.erreurs.description",
						label: "Description",
						fieldType: "text",
						defaultValue:
							"Ces oublis peuvent avoir des conséquences sérieuses. Prenez-les au sérieux pour protéger vos droits.",
					},
				],
			},
			{
				id: "numeros",
				label: "Numéros utiles",
				description: "Badge, titre et description de la section numéros",
				icon: Phone,
				fields: [
					{
						contentKey: "venirFrance.numeros.badge",
						label: "Badge",
						fieldType: "text",
						defaultValue: "Numéros essentiels",
					},
					{
						contentKey: "venirFrance.numeros.title",
						label: "Titre",
						fieldType: "text",
						defaultValue: "Numéros utiles à conserver",
					},
					{
						contentKey: "venirFrance.numeros.description",
						label: "Description",
						fieldType: "text",
						defaultValue:
							"Enregistrez ces numéros dans votre téléphone. Ils peuvent sauver des vies.",
					},
				],
			},
			{
				id: "cta",
				label: "Appel à l'action",
				description: "Titre, description et boutons du CTA final",
				icon: Layers,
				fields: [
					{
						contentKey: "venirFrance.cta.title",
						label: "Titre",
						fieldType: "text",
						defaultValue: "Le Consulat est à vos côtés",
					},
					{
						contentKey: "venirFrance.cta.description",
						label: "Description",
						fieldType: "text",
						defaultValue:
							"Que vous soyez sur le point de partir ou nouvellement arrivé, le Consulat Général du Gabon en France est votre relais. N'hésitez pas à nous solliciter pour toute question.",
					},
					{
						contentKey: "venirFrance.cta.vieFrance",
						label: "Bouton « Guide de la vie en France »",
						fieldType: "text",
						defaultValue: "Guide de la vie en France",
					},
				],
			},
			FOOTER_SECTION,
		],
	},
	"vie-en-france": {
		slug: "vie-en-france",
		title: "Vivre en France",
		description: "Guide pratique vie quotidienne",
		publicPath: "/vie-en-france",
		icon: BookOpen,
		color: "emerald",
		sections: [
			HEADER_SECTION,
			HEADER_TOPBAR_SECTION,
			HEADER_NAV_SECTION,
			HEADER_MOBILE_SECTION,
			{
				id: "hero",
				label: "Bannière",
				description: "Image de fond, badge, titre, accent et description",
				icon: ImageIcon,
				fields: [
					{
						contentKey: "vieFrance.hero.image",
						label: "Image de fond",
						fieldType: "image",
						defaultValue: "/images/heroes/hero-vie-france.png",
					},
					{
						contentKey: "vieFrance.hero.badge",
						label: "Badge",
						fieldType: "text",
						defaultValue: "Guide pratique",
					},
					{
						contentKey: "vieFrance.hero.title",
						label: "Titre",
						fieldType: "text",
						defaultValue: "Vie en France",
					},
					{
						contentKey: "vieFrance.hero.titleHighlight",
						label: "Titre (accent)",
						fieldType: "text",
						defaultValue: "— Guide pratique",
					},
					{
						contentKey: "vieFrance.hero.description",
						label: "Description",
						fieldType: "text",
						defaultValue:
							"Guide complet pour les Gabonais vivant en France : logement, santé, éducation, emploi, droits de séjour et famille. Toutes les informations pratiques pour votre vie quotidienne.",
					},
				],
			},
			{
				id: "content",
				label: "Contenu principal",
				description: "Badge et titre de la section guides thématiques",
				icon: Layers,
				fields: [
					{
						contentKey: "vieFrance.content.badge",
						label: "Badge",
						fieldType: "text",
						defaultValue: "Rubriques",
					},
					{
						contentKey: "vieFrance.content.title",
						label: "Titre",
						fieldType: "text",
						defaultValue: "Votre guide au quotidien",
					},
					{
						contentKey: "vieFrance.content.description",
						label: "Description",
						fieldType: "text",
						defaultValue:
							"Explorez chaque thème pour trouver les informations pratiques dont vous avez besoin.",
					},
				],
			},
			FOOTER_SECTION,
		],
	},
	"retour-au-gabon": {
		slug: "retour-au-gabon",
		title: "Retour au Gabon",
		description: "Accompagnement retour et réinstallation",
		publicPath: "/retour-au-gabon",
		icon: Plane,
		color: "orange",
		sections: [
			HEADER_SECTION,
			HEADER_TOPBAR_SECTION,
			HEADER_NAV_SECTION,
			HEADER_MOBILE_SECTION,
			{
				id: "hero",
				label: "Bannière",
				description: "Image de fond, badge, titre, accent et description",
				icon: ImageIcon,
				fields: [
					{
						contentKey: "retourGabon.hero.image",
						label: "Image de fond",
						fieldType: "image",
						defaultValue: "/images/heroes/hero-consulat.png",
					},
					{
						contentKey: "retourGabon.hero.badge",
						label: "Badge",
						fieldType: "text",
						defaultValue: "Guide de retour",
					},
					{
						contentKey: "retourGabon.hero.title",
						label: "Titre",
						fieldType: "text",
						defaultValue: "Retour au Gabon",
					},
					{
						contentKey: "retourGabon.hero.titleHighlight",
						label: "Titre (accent)",
						fieldType: "text",
						defaultValue: "— Bien préparer",
					},
					{
						contentKey: "retourGabon.hero.description",
						label: "Description",
						fieldType: "text",
						defaultValue:
							"Guide complet pour les Gabonais rentrant au pays : démarches consulaires, déménagement, réinstallation, emploi, OQTF, aides et maintien de vos droits acquis en France.",
					},
				],
			},
			{
				id: "steps",
				label: "Étapes du retour",
				description: "Badge, titre et description de la section guides",
				icon: Layers,
				fields: [
					{
						contentKey: "retourGabon.steps.badge",
						label: "Badge",
						fieldType: "text",
						defaultValue: "Étapes du retour",
					},
					{
						contentKey: "retourGabon.steps.title",
						label: "Titre",
						fieldType: "text",
						defaultValue: "Préparez chaque étape",
					},
					{
						contentKey: "retourGabon.steps.description",
						label: "Description",
						fieldType: "text",
						defaultValue:
							"Du premier jour de préparation à votre réinstallation, chaque étape est détaillée avec des conseils pratiques et des liens utiles.",
					},
				],
			},
			{
				id: "aides",
				label: "Aides & Accompagnement",
				description: "Badge, titre et description de la section aides",
				icon: Layers,
				fields: [
					{
						contentKey: "retourGabon.aides.badge",
						label: "Badge",
						fieldType: "text",
						defaultValue: "Aides & Accompagnement",
					},
					{
						contentKey: "retourGabon.aides.title",
						label: "Titre",
						fieldType: "text",
						defaultValue: "Des aides pour votre retour",
					},
					{
						contentKey: "retourGabon.aides.description",
						label: "Description",
						fieldType: "text",
						defaultValue:
							"Plusieurs dispositifs existent pour faciliter votre réintégration au Gabon.",
					},
				],
			},
			{
				id: "erreurs",
				label: "Erreurs à éviter",
				description: "Badge, titre et description de la section erreurs",
				icon: Layers,
				fields: [
					{
						contentKey: "retourGabon.erreurs.badge",
						label: "Badge",
						fieldType: "text",
						defaultValue: "Erreurs à éviter",
					},
					{
						contentKey: "retourGabon.erreurs.title",
						label: "Titre",
						fieldType: "text",
						defaultValue: "Ne commettez pas ces erreurs",
					},
					{
						contentKey: "retourGabon.erreurs.description",
						label: "Description",
						fieldType: "text",
						defaultValue:
							"Ces oublis peuvent compliquer votre retour. Anticipez-les pour partir sereinement.",
					},
				],
			},
			{
				id: "numeros",
				label: "Contacts essentiels",
				description: "Badge, titre et description de la section numéros",
				icon: Phone,
				fields: [
					{
						contentKey: "retourGabon.numeros.badge",
						label: "Badge",
						fieldType: "text",
						defaultValue: "Contacts essentiels",
					},
					{
						contentKey: "retourGabon.numeros.title",
						label: "Titre",
						fieldType: "text",
						defaultValue: "Numéros utiles",
					},
					{
						contentKey: "retourGabon.numeros.description",
						label: "Description",
						fieldType: "text",
						defaultValue: "À conserver pour votre retour au Gabon.",
					},
				],
			},
			FOOTER_SECTION,
		],
	},
	contact: {
		slug: "contact",
		title: "Contact",
		description: "Formulaire et informations pratiques",
		publicPath: "/contact",
		icon: Phone,
		color: "rose",
		sections: [
			HEADER_SECTION,
			HEADER_TOPBAR_SECTION,
			HEADER_NAV_SECTION,
			HEADER_MOBILE_SECTION,
			{
				id: "hero",
				label: "En-tête",
				description: "Image de fond, badge, titre, accent et description",
				icon: Type,
				fields: [
					{
						contentKey: "contact.hero.image",
						label: "Image de fond",
						fieldType: "image",
						defaultValue: "/images/heroes/hero-contact.png",
					},
					{
						contentKey: "contact.hero.badge",
						label: "Badge",
						fieldType: "text",
						defaultValue: "Contact",
					},
					{
						contentKey: "contact.hero.title",
						label: "Titre",
						fieldType: "text",
						defaultValue: "Nous",
					},
					{
						contentKey: "contact.hero.titleHighlight",
						label: "Titre (accent)",
						fieldType: "text",
						defaultValue: "contacter",
					},
					{
						contentKey: "contact.hero.description",
						label: "Description",
						fieldType: "text",
						defaultValue:
							"Retrouvez toutes les informations pour nous joindre et vous rendre au Consulat.",
					},
				],
			},
			{
				id: "info",
				label: "Informations pratiques",
				description: "Adresse, téléphones, email et horaires",
				icon: Layers,
				fields: [
					{
						contentKey: "contact.info.address1",
						label: "Adresse — Ligne 1",
						fieldType: "text",
						defaultValue: "26 bis Avenue Raphaël",
					},
					{
						contentKey: "contact.info.address2",
						label: "Adresse — Ligne 2",
						fieldType: "text",
						defaultValue: "75016 Paris, France",
					},
					{
						contentKey: "contact.info.phoneStandard1",
						label: "Téléphone standard 1",
						fieldType: "text",
						defaultValue: "01 42 99 68 62",
					},
					{
						contentKey: "contact.info.phoneStandard2",
						label: "Téléphone standard 2",
						fieldType: "text",
						defaultValue: "07 51 02 52 92",
					},
					{
						contentKey: "contact.info.phoneEtatCivil1",
						label: "Téléphone état civil 1",
						fieldType: "text",
						defaultValue: "07 59 48 58 95",
					},
					{
						contentKey: "contact.info.phoneEtatCivil2",
						label: "Téléphone état civil 2",
						fieldType: "text",
						defaultValue: "07 59 30 26 37",
					},
					{
						contentKey: "contact.info.phoneUrgence",
						label: "Téléphone urgences",
						fieldType: "text",
						defaultValue: "07 44 23 95 84",
					},
					{
						contentKey: "contact.info.email",
						label: "Email",
						fieldType: "text",
						defaultValue: "contact@consulatdugabon.fr",
					},
				],
			},
			{
				id: "horaires",
				label: "Horaires d'ouverture",
				description: "Jours et heures de dépôt et retrait",
				icon: Layers,
				fields: [
					{
						contentKey: "contact.horaires.jours",
						label: "Jours ouvrables",
						fieldType: "text",
						defaultValue: "Lundi - Vendredi",
					},
					{
						contentKey: "contact.horaires.depot",
						label: "Heures de dépôt",
						fieldType: "text",
						defaultValue: "9h00 - 15h00",
					},
					{
						contentKey: "contact.horaires.retrait",
						label: "Heures de retrait",
						fieldType: "text",
						defaultValue: "15h00 - 16h30",
					},
					{
						contentKey: "contact.horaires.fermeture",
						label: "Note de fermeture",
						fieldType: "text",
						defaultValue:
							"Fermé les jours fériés chômés au Gabon et en France.",
					},
				],
			},
			{
				id: "transport",
				label: "Accès & Transport",
				description: "Métro, bus et stationnement",
				icon: Layers,
				fields: [
					{
						contentKey: "contact.transport.metro",
						label: "Métro",
						fieldType: "text",
						defaultValue: "Métro Ligne 9",
					},
					{
						contentKey: "contact.transport.metroStop",
						label: "Arrêt métro",
						fieldType: "text",
						defaultValue: "Arrêt Ranelagh (5 min à pied)",
					},
					{
						contentKey: "contact.transport.bus",
						label: "Bus",
						fieldType: "text",
						defaultValue: "Bus 22, 52",
					},
					{
						contentKey: "contact.transport.busStop",
						label: "Arrêt bus",
						fieldType: "text",
						defaultValue: "Arrêt Ranelagh",
					},
					{
						contentKey: "contact.transport.parking",
						label: "Stationnement",
						fieldType: "text",
						defaultValue: "Stationnement",
					},
					{
						contentKey: "contact.transport.parkingDesc",
						label: "Description stationnement",
						fieldType: "text",
						defaultValue: "Parking payant sur voie publique",
					},
				],
			},
			FOOTER_SECTION,
		],
	},
};

const COLOR_MAP: Record<string, { bg: string; text: string }> = {
	blue: { bg: "bg-blue-500/10", text: "text-blue-600" },
	violet: { bg: "bg-violet-500/10", text: "text-violet-600" },
	green: { bg: "bg-green-500/10", text: "text-green-600" },
	amber: { bg: "bg-amber-500/10", text: "text-amber-600" },
	sky: { bg: "bg-sky-500/10", text: "text-sky-600" },
	emerald: { bg: "bg-emerald-500/10", text: "text-emerald-600" },
	orange: { bg: "bg-orange-500/10", text: "text-orange-600" },
	rose: { bg: "bg-rose-500/10", text: "text-rose-600" },
};

const FIELD_ICON: Record<string, LucideIcon> = {
	text: Type,
	richtext: MessageSquare,
	image: ImageIcon,
	link: LinkIcon,
};

// ── Component ────────────────────────────────────────────────────────────────

function AdminPageManager() {
	const { slug } = Route.useParams();
	const page = PAGE_REGISTRY[slug];

	if (!page) {
		return (
			<div className="flex flex-1 flex-col items-center justify-center gap-4 p-6">
				<h1 className="text-2xl font-bold">Page introuvable</h1>
				<p className="text-muted-foreground">
					La page « {slug} » n'existe pas.
				</p>
				<Button asChild variant="outline">
					<Link to="/admin">Retour au tableau de bord</Link>
				</Button>
			</div>
		);
	}

	return <PageManagementView page={page} />;
}

function PageManagementView({ page }: { page: PageDef }) {
	const pageContent = useQuery(api.functions.inlineContent.getPageContent, {
		pagePath: page.publicPath,
	});
	const sectionVisData = useQuery(
		api.functions.sectionVisibility.getPageSectionVisibility,
		{ pagePath: page.publicPath },
	);
	const { data: pageViews } = useAuthenticatedConvexQuery(
		api.functions.analytics.getTopPages,
		{ limit: 50 },
	);

	const isAccueil = page.slug === "accueil";

	const contentPending = pageContent === undefined;
	const contentItems = pageContent ?? [];

	const pageStats = (pageViews ?? []).find((p) => p.path === page.publicPath);
	const viewCount = pageStats?.viewCount ?? 0;
	const lastViewed = pageStats?.lastViewedAt;

	// Content lookup
	const contentMap = new Map<string, { value: string; defaultValue: string }>();
	for (const item of contentItems) {
		contentMap.set(item.contentKey, {
			value: item.value,
			defaultValue: item.defaultValue,
		});
	}

	// Dynamic fields by section
	const dynamicFieldsBySection = new Map<string, typeof contentItems>();
	for (const item of contentItems) {
		const arr = dynamicFieldsBySection.get(item.sectionId) ?? [];
		arr.push(item);
		dynamicFieldsBySection.set(item.sectionId, arr);
	}

	const editedCount = contentItems.filter(
		(c) => c.value !== c.defaultValue,
	).length;
	const totalFields = contentItems.length;
	const Icon = page.icon;
	const colors = COLOR_MAP[page.color] ?? COLOR_MAP.blue;

	return (
		<div className="flex flex-1 flex-col gap-5 p-4 md:p-6 pt-5">
			{/* ─── Header ──────────────────────────────────────────── */}
			<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
				<div className="flex items-center gap-3">
					<div className={`p-2.5 rounded-xl ${colors.bg} ${colors.text}`}>
						<Icon className="w-5 h-5" />
					</div>
					<div>
						<h1 className="text-xl md:text-2xl font-bold tracking-tight">
							{page.title}
						</h1>
						<p className="text-xs text-muted-foreground">{page.description}</p>
					</div>
				</div>
				<Button asChild size="sm" className="gap-2 shadow-sm">
					<a href={page.publicPath} target="_blank" rel="noopener noreferrer">
						<Eye className="w-3.5 h-3.5" />
						Voir la page
						<ExternalLink className="w-3 h-3 opacity-60" />
					</a>
				</Button>
			</div>

			{/* ─── Compact Stats ───────────────────────────────────── */}
			<div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
				<MiniStat
					icon={Eye}
					label="Vues"
					value={viewCount.toLocaleString("fr-FR")}
					color="blue"
				/>
				<MiniStat
					icon={Layers}
					label="Champs"
					value={contentPending ? "…" : String(totalFields)}
					color="green"
				/>
				<MiniStat
					icon={Edit3}
					label="Modifiés"
					value={contentPending ? "…" : String(editedCount)}
					color="amber"
				/>
				<MiniStat
					icon={Clock}
					label="Dernière vue"
					value={
						lastViewed
							? new Date(lastViewed).toLocaleDateString("fr-FR", {
									day: "numeric",
									month: "short",
								})
							: "—"
					}
					color="violet"
				/>
			</div>

			{/* ─── Sections ────────────────────────────────────────── */}
			<div className="space-y-2">
				{page.sections.map((section) => {
					const isLayoutSection = LAYOUT_SECTION_IDS.has(section.id);
					const isHidden =
						sectionVisData?.some(
							(s) => s.sectionId === section.id && s.hidden,
						) ?? false;

					const predefinedKeys = new Set(
						section.fields.map((f) => f.contentKey),
					);
					const dynamicItems = (
						dynamicFieldsBySection.get(section.id) ?? []
					).filter((item) => !predefinedKeys.has(item.contentKey));

					return (
						<CompactSection
							key={section.id}
							section={section}
							pagePath={page.publicPath}
							contentMap={contentMap}
							dynamicItems={dynamicItems}
							contentPending={contentPending}
							isAccueil={isAccueil}
							isLayoutSection={isLayoutSection}
							isHidden={isHidden}
						/>
					);
				})}
			</div>
		</div>
	);
}

// ── Compact collapsible section ──────────────────────────────────────────────

type ContentEntry = { value: string; defaultValue: string };

function CompactSection({
	section,
	pagePath,
	contentMap,
	dynamicItems,
	contentPending,
	isAccueil,
	isLayoutSection,
	isHidden,
}: {
	section: SectionDef;
	pagePath: string;
	contentMap: Map<string, ContentEntry>;
	dynamicItems: Array<{
		_id: string;
		contentKey: string;
		sectionId: string;
		fieldType: string;
		value: string;
		defaultValue: string;
	}>;
	contentPending: boolean;
	isAccueil: boolean;
	isLayoutSection: boolean;
	isHidden: boolean;
}) {
	const [open, setOpen] = useState(false);
	const toggleVisibility = useMutation(
		api.functions.sectionVisibility.toggleSectionVisibility,
	);
	const allFieldCount = section.fields.length + dynamicItems.length;
	const modifiedCount =
		section.fields.filter((f) => {
			const stored = contentMap.get(f.contentKey);
			return stored && stored.value !== stored.defaultValue;
		}).length + dynamicItems.filter((d) => d.value !== d.defaultValue).length;

	const SectionIcon = section.icon;

	// ── Layout section on a non-accueil page → grayed-out, non-interactive ──
	if (isLayoutSection && !isAccueil) {
		return (
			<div className="w-full flex items-center gap-3 rounded-lg border border-dashed border-border/50 bg-muted/30 px-4 py-3 opacity-50 cursor-default select-none">
				<SectionIcon className="w-4 h-4 text-muted-foreground shrink-0" />
				<div className="flex-1 min-w-0">
					<span className="text-sm font-medium text-muted-foreground">
						{section.label}
					</span>
					<span className="text-xs text-muted-foreground/60 ml-2 hidden sm:inline">
						{section.description}
					</span>
				</div>
				<Badge
					variant="outline"
					className="text-[10px] shrink-0 border-muted-foreground/20 text-muted-foreground/60"
				>
					<Link
						to="/admin/pages/$slug"
						params={{ slug: "accueil" }}
						className="hover:underline"
					>
						Géré dans Accueil
					</Link>
				</Badge>
			</div>
		);
	}

	// ── Handle visibility toggle ──
	const handleToggleVisibility = async (e: React.MouseEvent) => {
		e.stopPropagation();
		try {
			await toggleVisibility({
				pagePath,
				sectionId: section.id,
				hidden: !isHidden,
			});
			toast.success(
				isHidden
					? `Section « ${section.label} » affichée`
					: `Section « ${section.label} » masquée`,
			);
		} catch {
			toast.error("Erreur lors du changement de visibilité");
		}
	};

	return (
		<Collapsible open={open} onOpenChange={setOpen}>
			<CollapsibleTrigger asChild>
				<button
					type="button"
					className={`w-full flex items-center gap-3 rounded-lg border bg-card px-4 py-3 text-left hover:bg-accent/50 transition-colors ${isHidden ? "opacity-50" : ""}`}
				>
					<SectionIcon className="w-4 h-4 text-muted-foreground shrink-0" />
					<div className="flex-1 min-w-0">
						<span className="text-sm font-medium">{section.label}</span>
						<span className="text-xs text-muted-foreground ml-2 hidden sm:inline">
							{section.description}
						</span>
					</div>

					{/* ── Visibility toggle (not for layout sections) ── */}
					{!isLayoutSection && (
						<button
							type="button"
							onClick={handleToggleVisibility}
							className={`p-1 rounded-md transition-colors shrink-0 ${
								isHidden
									? "text-muted-foreground/40 hover:text-orange-500 hover:bg-orange-500/10"
									: "text-muted-foreground hover:text-green-600 hover:bg-green-500/10"
							}`}
							title={
								isHidden
									? "Section masquée — cliquer pour afficher"
									: "Section visible — cliquer pour masquer"
							}
						>
							{isHidden ? (
								<EyeOff className="w-3.5 h-3.5" />
							) : (
								<Eye className="w-3.5 h-3.5" />
							)}
						</button>
					)}

					{isHidden ? (
						<Badge
							variant="outline"
							className="text-[10px] shrink-0 border-orange-200 text-orange-500 dark:border-orange-800"
						>
							Masquée
						</Badge>
					) : allFieldCount > 0 ? (
						<Badge
							variant="secondary"
							className={`text-[10px] shrink-0 ${
								modifiedCount > 0
									? "bg-amber-500/10 text-amber-600"
									: "bg-green-500/10 text-green-600"
							}`}
						>
							{modifiedCount > 0
								? `${modifiedCount}/${allFieldCount} modifié`
								: `${allFieldCount} champ${allFieldCount > 1 ? "s" : ""}`}
						</Badge>
					) : (
						<Badge variant="outline" className="text-[10px] shrink-0">
							auto
						</Badge>
					)}
					{open ? (
						<ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
					) : (
						<ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
					)}
				</button>
			</CollapsibleTrigger>

			<CollapsibleContent>
				<div className="ml-6 border-l border-border/60 pl-3 py-1 space-y-0.5">
					{contentPending ? (
						<Skeleton className="h-7 w-full rounded" />
					) : (
						<>
							{section.fields.map((field) => {
								const stored = contentMap.get(field.contentKey);
								return (
									<FieldEditor
										key={field.contentKey}
										contentKey={field.contentKey}
										label={field.label}
										fieldType={field.fieldType}
										currentValue={stored?.value ?? field.defaultValue}
										defaultValue={field.defaultValue}
										pagePath={pagePath}
										sectionId={section.id}
										isModified={
											stored ? stored.value !== stored.defaultValue : false
										}
									/>
								);
							})}
							{dynamicItems.map((item) => (
								<FieldEditor
									key={item.contentKey}
									contentKey={item.contentKey}
									label={prettifyKey(item.contentKey)}
									fieldType={item.fieldType as FieldDef["fieldType"]}
									currentValue={item.value}
									defaultValue={item.defaultValue}
									pagePath={pagePath}
									sectionId={section.id}
									isModified={item.value !== item.defaultValue}
								/>
							))}
							{section.fields.length === 0 && dynamicItems.length === 0 && (
								<p className="text-[11px] text-muted-foreground py-1 pl-1">
									Contenu dynamique
								</p>
							)}
						</>
					)}
				</div>
			</CollapsibleContent>
		</Collapsible>
	);
}

// ── Field Editor — ultra-compact single-row ──────────────────────────────────

function FieldEditor({
	contentKey,
	label,
	fieldType,
	currentValue,
	defaultValue,
	pagePath,
	sectionId,
	isModified,
}: {
	contentKey: string;
	label: string;
	fieldType: FieldDef["fieldType"];
	currentValue: string;
	defaultValue: string;
	pagePath: string;
	sectionId: string;
	isModified: boolean;
}) {
	const [editing, setEditing] = useState(false);
	const [localValue, setLocalValue] = useState(currentValue);
	const [saving, setSaving] = useState(false);
	const updateContent = useMutation(api.functions.inlineContent.updateContent);
	const resetContent = useMutation(api.functions.inlineContent.resetContent);
	const FieldIcon = FIELD_ICON[fieldType] ?? Type;

	const handleSave = useCallback(async () => {
		if (localValue === currentValue) {
			setEditing(false);
			return;
		}
		setSaving(true);
		try {
			await updateContent({
				contentKey,
				pagePath,
				sectionId,
				fieldType,
				value: localValue,
				defaultValue,
			});
			toast.success("Enregistré");
			setEditing(false);
		} catch {
			toast.error("Erreur");
		} finally {
			setSaving(false);
		}
	}, [
		localValue,
		currentValue,
		updateContent,
		contentKey,
		pagePath,
		sectionId,
		fieldType,
		defaultValue,
	]);

	const handleReset = useCallback(async () => {
		setSaving(true);
		try {
			await resetContent({ contentKey });
			setLocalValue(defaultValue);
			toast.success("Réinitialisé");
			setEditing(false);
		} catch {
			toast.error("Erreur");
		} finally {
			setSaving(false);
		}
	}, [resetContent, contentKey, defaultValue]);

	const handleCancel = useCallback(() => {
		setLocalValue(currentValue);
		setEditing(false);
	}, [currentValue]);

	if (fieldType === "image") {
		return (
			<ImageFieldEditor
				contentKey={contentKey}
				label={label}
				currentValue={currentValue}
				defaultValue={defaultValue}
				pagePath={pagePath}
				sectionId={sectionId}
				isModified={isModified}
			/>
		);
	}

	// ── Editing mode: input replaces the value ──
	if (editing) {
		return (
			<div className="flex items-center gap-2 py-1 group">
				<FieldIcon className="w-3 h-3 text-muted-foreground shrink-0" />
				<span className="text-[11px] font-medium text-muted-foreground w-24 shrink-0 truncate">
					{label}
				</span>
				{fieldType === "richtext" || currentValue.length > 80 ? (
					<Textarea
						value={localValue}
						onChange={(e) => setLocalValue(e.target.value)}
						className="text-xs min-h-[48px] flex-1"
						disabled={saving}
						autoFocus
					/>
				) : (
					<Input
						value={localValue}
						onChange={(e) => setLocalValue(e.target.value)}
						className="text-xs h-7 flex-1"
						disabled={saving}
						autoFocus
						onKeyDown={(e) => {
							if (e.key === "Enter") handleSave();
							if (e.key === "Escape") handleCancel();
						}}
					/>
				)}
				<div className="flex items-center gap-0.5 shrink-0">
					<Button
						variant="ghost"
						size="sm"
						className="h-6 w-6 p-0"
						onClick={handleCancel}
						disabled={saving}
					>
						<X className="w-3 h-3" />
					</Button>
					{isModified && (
						<Button
							variant="ghost"
							size="sm"
							className="h-6 w-6 p-0"
							onClick={handleReset}
							disabled={saving}
						>
							<RotateCcw className="w-3 h-3" />
						</Button>
					)}
					<Button
						size="sm"
						className="h-6 text-[11px] px-2 gap-1"
						onClick={handleSave}
						disabled={saving}
					>
						{saving ? (
							<Loader2 className="w-2.5 h-2.5 animate-spin" />
						) : (
							<Save className="w-2.5 h-2.5" />
						)}{" "}
						OK
					</Button>
				</div>
			</div>
		);
	}

	// ── Display mode: single compact row ──
	return (
		<button
			type="button"
			className={`w-full flex items-center gap-2 py-1.5 px-1 rounded-sm cursor-pointer hover:bg-accent/40 transition-colors group text-left ${
				isModified ? "bg-amber-50/40 dark:bg-amber-950/10" : ""
			}`}
			onClick={() => setEditing(true)}
			title="Cliquer pour modifier"
		>
			<FieldIcon className="w-3 h-3 text-muted-foreground shrink-0" />
			<span className="text-[11px] font-medium text-muted-foreground w-24 shrink-0 truncate">
				{label}
			</span>
			<span
				className={`text-xs flex-1 truncate ${isModified ? "text-amber-700 dark:text-amber-400" : "text-foreground/80"}`}
			>
				{currentValue || (
					<span className="italic text-muted-foreground">Vide</span>
				)}
			</span>
			{isModified && (
				<span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
			)}
			<Edit3 className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
		</button>
	);
}

// ── Image field — compact inline thumbnail ───────────────────────────────────

function ImageFieldEditor({
	contentKey,
	label,
	currentValue,
	defaultValue,
	pagePath,
	sectionId,
	isModified,
}: {
	contentKey: string;
	label: string;
	currentValue: string;
	defaultValue: string;
	pagePath: string;
	sectionId: string;
	isModified: boolean;
}) {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const convex = useConvex();
	const generateUploadUrl = useMutation(api.functions.files.generateUploadUrl);
	const updateContent = useMutation(api.functions.inlineContent.updateContent);
	const resetContent = useMutation(api.functions.inlineContent.resetContent);
	const [isUploading, setIsUploading] = useState(false);

	const handleUpload = useCallback(
		async (e: React.ChangeEvent<HTMLInputElement>) => {
			const file = e.target.files?.[0];
			if (!file) return;
			if (!file.type.startsWith("image/")) {
				toast.error("Format image requis");
				return;
			}
			if (file.size > 10 * 1024 * 1024) {
				toast.error("Max 10 Mo");
				return;
			}
			setIsUploading(true);
			try {
				const postUrl = await generateUploadUrl();
				const res = await fetch(postUrl, {
					method: "POST",
					headers: { "Content-Type": file.type },
					body: file,
				});
				if (!res.ok) throw new Error("Upload failed");
				const { storageId } = (await res.json()) as {
					storageId: Id<"_storage">;
				};
				const fileUrl = await convex.query(api.functions.files.getFileUrl, {
					storageId,
				});
				if (!fileUrl) throw new Error("URL resolution failed");
				await updateContent({
					contentKey,
					pagePath,
					sectionId,
					fieldType: "image",
					value: fileUrl,
					defaultValue,
				});
				toast.success("Image mise à jour");
			} catch {
				toast.error("Échec");
			} finally {
				setIsUploading(false);
				if (fileInputRef.current) fileInputRef.current.value = "";
			}
		},
		[
			generateUploadUrl,
			convex,
			updateContent,
			contentKey,
			pagePath,
			sectionId,
			defaultValue,
		],
	);

	const handleReset = useCallback(async () => {
		try {
			await resetContent({ contentKey });
			toast.success("Réinitialisé");
		} catch {
			toast.error("Erreur");
		}
	}, [resetContent, contentKey]);

	return (
		<div
			className={`flex items-center gap-2 py-1.5 px-1 rounded-sm ${isModified ? "bg-amber-50/40 dark:bg-amber-950/10" : ""}`}
		>
			<ImageIcon className="w-3 h-3 text-muted-foreground shrink-0" />
			<span className="text-[11px] font-medium text-muted-foreground w-24 shrink-0 truncate">
				{label}
			</span>
			<div className="rounded overflow-hidden border bg-muted/30 h-10 w-20 shrink-0">
				<img
					src={currentValue}
					alt={label}
					className="w-full h-full object-cover"
				/>
			</div>
			{isModified && (
				<span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
			)}
			<div className="flex-1" />
			<div className="flex items-center gap-0.5 shrink-0">
				{isModified && (
					<Button
						variant="ghost"
						size="sm"
						className="h-6 text-[11px] px-1.5"
						onClick={handleReset}
					>
						<RotateCcw className="w-2.5 h-2.5" />
					</Button>
				)}
				<Button
					variant="outline"
					size="sm"
					className="h-6 text-[11px] px-2 gap-1"
					onClick={() => fileInputRef.current?.click()}
					disabled={isUploading}
				>
					{isUploading ? (
						<Loader2 className="w-2.5 h-2.5 animate-spin" />
					) : (
						<Upload className="w-2.5 h-2.5" />
					)}
					{isUploading ? "…" : "Changer"}
				</Button>
			</div>
			<input
				ref={fileInputRef}
				type="file"
				accept="image/*"
				onChange={handleUpload}
				className="hidden"
				disabled={isUploading}
			/>
		</div>
	);
}

// ── Mini stat card ───────────────────────────────────────────────────────────

function MiniStat({
	icon: Icon,
	label,
	value,
	color,
}: {
	icon: LucideIcon;
	label: string;
	value: string;
	color: string;
}) {
	const c = COLOR_MAP[color] ?? COLOR_MAP.blue;
	return (
		<div className="flex items-center gap-2.5 rounded-lg border bg-card p-3">
			<div className={`p-1.5 rounded-md ${c.bg} ${c.text}`}>
				<Icon className="w-3.5 h-3.5" />
			</div>
			<div>
				<p className="text-[11px] text-muted-foreground leading-none mb-0.5">
					{label}
				</p>
				<p className="text-base font-bold leading-none">{value}</p>
			</div>
		</div>
	);
}

function prettifyKey(key: string): string {
	const last = key.split(".").pop() ?? key;
	return last
		.replace(/([A-Z])/g, " $1")
		.replace(/[_-]/g, " ")
		.trim()
		.replace(/^\w/, (c) => c.toUpperCase());
}
