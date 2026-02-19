export const ADMIN_MODULES = [
	"posts",
	"services",
	"announcements",
	"team",
	"users",
	"analytics",
	"settings",
	"inline_edit",
	"audit",
] as const;

export type AdminModule = (typeof ADMIN_MODULES)[number];

export const ADMIN_MODULE_LABELS: Record<
	AdminModule,
	{ name: string; description: string }
> = {
	posts: {
		name: "Actualités",
		description: "Créer, modifier, supprimer des articles",
	},
	services: {
		name: "Services",
		description: "Gérer les services consulaires",
	},
	announcements: {
		name: "Annonces",
		description: "Gérer les bannières d'annonces",
	},
	team: {
		name: "Équipe",
		description: "Gérer les membres de l'équipe",
	},
	users: {
		name: "Utilisateurs",
		description: "Voir et gérer la liste des utilisateurs",
	},
	analytics: {
		name: "Statistiques",
		description: "Accès au tableau de bord analytics",
	},
	settings: {
		name: "Paramètres",
		description: "Configuration du site",
	},
	inline_edit: {
		name: "Édition en ligne",
		description: "Modifier le contenu depuis le site public",
	},
	audit: {
		name: "Journal d'audit",
		description: "Consulter les logs d'activité",
	},
};
