import {
	BookOpen,
	Building2,
	FileText,
	Home,
	Image as ImageIcon,
	Layers,
	Link as LinkIcon,
	type LucideIcon,
	Menu,
	MessageSquare,
	Newspaper,
	PanelBottom,
	Phone,
	Plane,
	Type,
} from "lucide-react";

// ── Registry types ───────────────────────────────────────────────────────────

export type FieldDef = {
	contentKey: string;
	label: string;
	fieldType: "text" | "richtext" | "image" | "link";
	defaultValue: string;
};

export type SectionDef = {
	id: string;
	label: string;
	description: string;
	icon: LucideIcon;
	fields: FieldDef[];
	isLayoutShared?: boolean;
	viewport?: "desktop" | "mobile" | "all";
};

/** Section IDs that belong to the shared layout (header / footer). */
export const LAYOUT_SECTION_IDS = new Set([
	"header",
	"header_topbar",
	"header_nav",
	"header_mobile",
	"footer",
]);

export type PageDef = {
	slug: string;
	title: string;
	description: string;
	publicPath: string;
	icon: LucideIcon;
	color: string;
	sections: SectionDef[];
	/** Whether this page has a hero section (for permission UI) */
	hasHero?: boolean;
};

// ── Shared layout sections (Header / Footer) ────────────────────────────────

export const HEADER_SECTION: SectionDef = {
	id: "header",
	label: "En-tête (Desktop)",
	description: "Logo, marque, barre info, navigation desktop",
	icon: Menu,
	viewport: "desktop",
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

export const HEADER_TOPBAR_SECTION: SectionDef = {
	id: "header_topbar",
	label: "Barre supérieure",
	description: "Email, horaires, bouton contact",
	icon: Menu,
	viewport: "desktop",
	fields: [
		{
			contentKey: "layout.header.topbar.email",
			label: "Email",
			fieldType: "text",
			defaultValue: "contact@ambassadegabon.es",
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

export const HEADER_NAV_SECTION: SectionDef = {
	id: "header_nav",
	label: "Menu navigation",
	description: "Libellés des 7 liens du menu principal",
	icon: Menu,
	viewport: "desktop",
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

export const HEADER_MOBILE_SECTION: SectionDef = {
	id: "header_mobile",
	label: "En-tête (Mobile)",
	description: "Logo et marque du volet mobile",
	icon: Menu,
	viewport: "mobile",
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

export const FOOTER_SECTION: SectionDef = {
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

export const PAGE_REGISTRY: Record<string, PageDef> = {
	accueil: {
		slug: "accueil",
		title: "Accueil",
		description: "Page d'accueil du site — première impression des visiteurs",
		publicPath: "/",
		icon: Home,
		color: "blue",
		hasHero: true,
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
		hasHero: true,
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
						defaultValue: "contact@ambassadegabon.es",
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
		hasHero: true,
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
			{
				id: "citizen-cta",
				label: "Appel citoyen",
				description: "Section inscription consulaire (CitizenCTA)",
				icon: Layers,
				fields: [
					{
						contentKey: "services.citizenCta.title",
						label: "Titre",
						fieldType: "text",
						defaultValue: "Votre consulat,",
					},
					{
						contentKey: "services.citizenCta.titleHighlight",
						label: "Titre (accent)",
						fieldType: "text",
						defaultValue: "dans votre poche",
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
		hasHero: true,
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
	"venir-en-espagne": {
		slug: "venir-en-espagne",
		title: "Venir en France",
		description: "Visas et procédures d'entrée",
		publicPath: "/venir-en-espagne",
		icon: Plane,
		color: "sky",
		hasHero: true,
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
			{
				id: "citizen-cta",
				label: "Appel citoyen",
				description: "Section inscription consulaire (CitizenCTA)",
				icon: Layers,
				fields: [
					{
						contentKey: "venirFrance.citizenCta.title",
						label: "Titre",
						fieldType: "text",
						defaultValue: "Votre consulat,",
					},
					{
						contentKey: "venirFrance.citizenCta.titleHighlight",
						label: "Titre (accent)",
						fieldType: "text",
						defaultValue: "dans votre poche",
					},
				],
			},
			FOOTER_SECTION,
		],
	},
	"vie-en-espagne": {
		slug: "vie-en-espagne",
		title: "Vivre en France",
		description: "Guide pratique vie quotidienne",
		publicPath: "/vie-en-espagne",
		icon: BookOpen,
		color: "emerald",
		hasHero: true,
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
			{
				id: "citizen-cta",
				label: "Appel citoyen",
				description: "Section inscription consulaire (CitizenCTA)",
				icon: Layers,
				fields: [
					{
						contentKey: "vieFrance.citizenCta.title",
						label: "Titre",
						fieldType: "text",
						defaultValue: "Votre consulat,",
					},
					{
						contentKey: "vieFrance.citizenCta.titleHighlight",
						label: "Titre (accent)",
						fieldType: "text",
						defaultValue: "dans votre poche",
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
		hasHero: true,
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
			{
				id: "citizen-cta",
				label: "Appel citoyen",
				description: "Section inscription consulaire (CitizenCTA)",
				icon: Layers,
				fields: [
					{
						contentKey: "retourGabon.citizenCta.title",
						label: "Titre",
						fieldType: "text",
						defaultValue: "Votre consulat,",
					},
					{
						contentKey: "retourGabon.citizenCta.titleHighlight",
						label: "Titre (accent)",
						fieldType: "text",
						defaultValue: "dans votre poche",
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
		hasHero: true,
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
						defaultValue: "contact@ambassadegabon.es",
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

export const COLOR_MAP: Record<string, { bg: string; text: string }> = {
	blue: { bg: "bg-blue-500/10", text: "text-blue-600" },
	violet: { bg: "bg-violet-500/10", text: "text-violet-600" },
	green: { bg: "bg-green-500/10", text: "text-green-600" },
	amber: { bg: "bg-amber-500/10", text: "text-amber-600" },
	sky: { bg: "bg-sky-500/10", text: "text-sky-600" },
	emerald: { bg: "bg-emerald-500/10", text: "text-emerald-600" },
	orange: { bg: "bg-orange-500/10", text: "text-orange-600" },
	rose: { bg: "bg-rose-500/10", text: "text-rose-600" },
};

export const FIELD_ICON: Record<string, LucideIcon> = {
	text: Type,
	richtext: MessageSquare,
	image: ImageIcon,
	link: LinkIcon,
};
