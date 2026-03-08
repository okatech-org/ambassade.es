import { createFileRoute, Link } from "@tanstack/react-router";
import {
	AlertTriangle,
	ArrowRight,
	Baby,
	BookOpen,
	Briefcase,
	CheckCircle2,
	ChevronDown,
	Flag,
	GraduationCap,
	HandHeart,
	Heart,
	HeartHandshake,
	Home,
	Landmark,
	Lightbulb,
	MapPin,
	Phone,
	Scale,
	Shield,
	ShieldCheck,
	Siren,
	Users,
} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
	type ErreurItem,
	ErreursCourantesGrid,
	NumerosUtilesGrid,
	type NumeroUtile,
	SavoirVivreGrid,
	type SavoirVivreItem,
} from "@/components/guides";
import { CitizenCTA } from "@/components/home/CitizenCTA";
import { PageHero } from "@/components/PageHero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/integration")({
	component: IntegrationPage,
});

// ─── Types (page-specific: no links field) ───────────────────────────────────

interface GuideSection {
	id: string;
	icon: typeof Heart;
	title: string;
	color: string;
	iconBg: string;
	intro: string;
	items: { title: string; detail: string }[];
	tips: string[];
}

// ─── Data ────────────────────────────────────────────────────────────────────

const guideSections: GuideSection[] = [
	{
		id: "logement",
		icon: Home,
		title: "Logement",
		color: "text-blue-600 dark:text-blue-400",
		iconBg: "bg-blue-500/10",
		intro:
			"Le logement est souvent la première étape de votre installation. Voici les clés pour comprendre le marché locatif français et accéder à vos droits.",
		items: [
			{
				title: "Recherche de logement",
				detail:
					"Utilisez les plateformes officielles (Leboncoin, SeLoger, PAP) et les agences immobilières. Méfiez-vous des annonces trop avantageuses — ne versez jamais d'argent avant la visite et la signature du bail.",
			},
			{
				title: "Dossier locatif",
				detail:
					"Préparez : pièce d'identité, 3 derniers bulletins de salaire, contrat de travail, avis d'imposition, justificatif de domicile actuel. Un garant (ou le dispositif Visale gratuit) est souvent exigé.",
			},
			{
				title: "Aides au logement (CAF)",
				detail:
					"Vous pouvez bénéficier de l'APL (Aide Personnalisée au Logement) ou de l'ALS selon votre situation. Faites votre demande sur caf.fr dès la signature de votre bail.",
			},
			{
				title: "Droits du locataire",
				detail:
					"Le propriétaire ne peut pas vous demander : photo, relevé bancaire, carte vitale. Le dépôt de garantie est plafonné à 1 mois de loyer (hors charges). La trêve hivernale protège contre les expulsions du 1er novembre au 31 mars.",
			},
		],
		tips: [
			"Le dispositif Visale (gratuit, via Action Logement) remplace le garant physique",
			"Ouvrez un compte bancaire français rapidement — c'est indispensable pour le prélèvement du loyer",
			"Souscrivez une assurance habitation obligatoire dès l'entrée dans le logement",
		],
	},
	{
		id: "sante",
		icon: Heart,
		title: "Santé & Protection sociale",
		color: "text-red-600 dark:text-red-400",
		iconBg: "bg-red-500/10",
		intro:
			"La France dispose d'un système de santé universel. En tant que résident, vous avez droit à la couverture maladie. Voici comment en bénéficier.",
		items: [
			{
				title: "Inscription à la Sécurité sociale",
				detail:
					"Inscrivez-vous sur le site ameli.fr (CPAM) avec votre titre de séjour, justificatif de domicile et RIB. Le dispositif PUMA garantit la prise en charge des soins pour tout résident stable en France (plus de 3 mois).",
			},
			{
				title: "Complémentaire santé (Mutuelle)",
				detail:
					"La Sécurité sociale rembourse environ 70% des frais médicaux. Une mutuelle couvre le reste. Si vos revenus sont modestes, la Complémentaire Santé Solidaire (CSS, ex-CMU-C) est gratuite ou à moins de 1€/jour.",
			},
			{
				title: "Médecin traitant",
				detail:
					"Déclarez un médecin traitant auprès de votre CPAM — c'est obligatoire pour un remboursement optimal. Consultez l'annuaire-sante.ameli.fr pour trouver un médecin qui accepte de nouveaux patients.",
			},
			{
				title: "Urgences et numéros utiles",
				detail:
					"SAMU : 15 • Pompiers : 18 • Urgences européennes : 112 • SOS Médecins (consultations à domicile) • Pharmacies de garde (composez le 3237). Aux urgences hospitalières, vous serez soigné même sans carte vitale.",
			},
		],
		tips: [
			"Conservez toujours sur vous votre carte vitale (ou attestation provisoire)",
			"La téléconsultation est remboursée — pratique quand on ne trouve pas de médecin",
			"Les centres de santé municipaux proposent des consultations sans dépassement d'honoraires",
		],
	},
	{
		id: "education",
		icon: GraduationCap,
		title: "Éducation & Formation",
		color: "text-green-600 dark:text-green-400",
		iconBg: "bg-green-500/10",
		intro:
			"Le système éducatif français est accessible à tous les enfants résidant en France, quelle que soit la nationalité. Pour les adultes, de nombreuses formations existent.",
		items: [
			{
				title: "Scolarisation des enfants",
				detail:
					"L'instruction est obligatoire de 3 à 16 ans. Inscrivez votre enfant à la mairie de votre commune puis à l'école. Aucun document de séjour ne peut être exigé pour l'inscription scolaire d'un enfant.",
			},
			{
				title: "Études supérieures",
				detail:
					"Inscription via Parcoursup (lycéens en France) ou Campus France (depuis le Gabon). Les frais d'inscription publiques sont modérés (170€ à 380€/an). Demandez une bourse CROUS sur messervices.etudiant.gouv.fr.",
			},
			{
				title: "Reconnaissance des diplômes",
				detail:
					"Le centre ENIC-NARIC délivre des attestations de comparabilité de vos diplômes gabonais. Cette attestation facilite la recherche d'emploi et l'inscription en formation. Coût : environ 70€.",
			},
			{
				title: "Formation professionnelle (adultes)",
				detail:
					"Le Compte Personnel de Formation (CPF) finance des formations certifiantes. Pôle Emploi / France Travail propose aussi des formations gratuites pour les demandeurs d'emploi. La VAE permet de faire reconnaître votre expérience.",
			},
		],
		tips: [
			"Les cours de français (FLE) sont souvent gratuits dans les associations et les mairies",
			"La carte d'étudiant donne accès à de nombreuses réductions (transport, culture, restauration CROUS)",
			"Les bibliothèques municipales sont gratuites et offrent accès à internet, presse et formations en ligne",
		],
	},
	{
		id: "emploi",
		icon: Briefcase,
		title: "Emploi & Entrepreneuriat",
		color: "text-orange-600 dark:text-orange-400",
		iconBg: "bg-orange-500/10",
		intro:
			"Travailler en France nécessite un titre de séjour autorisant le travail. Voici les étapes clés pour accéder au marché de l'emploi ou créer votre activité.",
		items: [
			{
				title: "Autorisation de travail",
				detail:
					'Vérifiez que votre titre de séjour autorise le travail (mention "autorise son titulaire à travailler"). Les cartes de résident, les cartes "vie privée et familiale" et les cartes "salarié" autorisent le travail. Les visas étudiants permettent de travailler 964 heures/an.',
			},
			{
				title: "Recherche d'emploi",
				detail:
					"Inscrivez-vous à France Travail (ex-Pôle Emploi) pour bénéficier d'un accompagnement et d'indemnités si vous avez cotisé. Utilisez aussi : LinkedIn, Indeed, HelloWork, l'APEC (cadres). Le CV français est sans photo, concis (1-2 pages).",
			},
			{
				title: "Créer son entreprise",
				detail:
					"Le statut auto-entrepreneur (micro-entreprise) est le plus simple : inscription gratuite en ligne sur autoentrepreneur.urssaf.fr. Pour les activités plus importantes, consultez la CCI (Chambre de Commerce et d'Industrie) ou un accompagnateur BGE.",
			},
			{
				title: "Droits des salariés",
				detail:
					"SMIC 2025 : environ 1 426€ net/mois. 5 semaines de congés payés. Durée légale : 35h/semaine. Vous avez droit aux mêmes protections que tout salarié français (contrat de travail obligatoire, bulletin de paie, assurance chômage).",
			},
		],
		tips: [
			"L'aide ACRE exonère de charges sociales la première année de création d'entreprise",
			"Les missions locales accompagnent gratuitement les 16-25 ans dans l'emploi",
			'Attention au travail non déclaré ("au noir") : c\'est illégal et vous prive de toute protection sociale',
		],
	},
	{
		id: "droits",
		icon: Scale,
		title: "Droits, Séjour & Citoyenneté",
		color: "text-purple-600 dark:text-purple-400",
		iconBg: "bg-purple-500/10",
		intro:
			"Comprendre vos droits et les démarches liées à votre titre de séjour est essentiel pour vivre sereinement en France.",
		items: [
			{
				title: "Titre de séjour",
				detail:
					"Renouvelez votre titre 2 à 4 mois avant expiration sur le site de la préfecture (ANEF). Types principaux : VLS-TS (visa long séjour valant titre), carte de séjour temporaire (1 an), carte pluriannuelle (4 ans), carte de résident (10 ans).",
			},
			{
				title: "Recours OQTF — Vos droits",
				detail:
					"Si vous recevez une OQTF, ne l'ignorez JAMAIS. Trois recours existent : 1) Recours gracieux auprès du Préfet (2 mois, NE suspend PAS l'OQTF). 2) Recours hiérarchique auprès du Ministre de l'Intérieur (2 mois, NE suspend PAS l'OQTF). 3) Recours contentieux devant le Tribunal Administratif (30 jours, ou 48h si OQTF sans délai) — c'est le SEUL recours qui SUSPEND l'exécution de l'OQTF. L'aide juridictionnelle est accessible. Consultez immédiatement un avocat spécialisé.",
			},
			{
				title: "Régularisation de séjour",
				detail:
					"Options : admission exceptionnelle (circulaire Valls 2012 — ancienneté + insertion), régularisation par le travail (contrat ou promesse d'embauche), motif familial (parent d'enfant français, conjoint de Français), raisons médicales (traitement indisponible au Gabon), protection internationale (OFPRA). Documents essentiels : passeport, justificatifs de domicile, preuves de présence en France.",
			},
			{
				title: "Droit au travail étudiant (964 h/an)",
				detail:
					'Les étudiants étrangers avec un VLS-TS mention "étudiant" sont autorisés à travailler 964 heures/an (60% de la durée légale) sans autorisation supplémentaire. Pour la carte pluriannuelle étudiant : assiduité requise + ressources min. 615 €/mois. L\'APS après un Master (accord franco-gabonais du 5 juillet 2007) donne droit au travail à temps plein pendant 9 mois, renouvelable une fois (18 mois maximum).',
			},
			{
				title: "Changement d'adresse (obligatoire)",
				detail:
					"Tout étranger titulaire d'un titre de séjour doit signaler son changement d'adresse dans les 3 mois sur le portail ANEF ou en préfecture. Le non-respect entraîne une amende possible et des complications au renouvellement. Documents : titre de séjour + nouveau justificatif de domicile.",
			},
			{
				title: "Binationaux (Franco-Gabonais)",
				detail:
					"Le Gabon ne reconnaît pas officiellement la double nationalité, mais elle est tolérée en pratique. Un visa est obligatoire pour entrer au Gabon avec un passeport français — il s'obtient uniquement au Consulat Général du Gabon à Paris (26 bis avenue Raphaël, 75016), délai 3 jours ouvrés, présence physique requise. Conseil : entrez en France avec le passeport français, au Gabon avec le passeport gabonais.",
			},
			{
				title: "Regroupement familial",
				detail:
					"Vous pouvez faire venir votre conjoint et vos enfants mineurs si vous résidez légalement en France depuis au moins 18 mois, disposez de ressources stables et d'un logement adapté. Dossier à déposer auprès de l'OFII.",
			},
			{
				title: "Naturalisation française",
				detail:
					"Possible après 5 ans de résidence régulière en France (réduit dans certains cas). Conditions : maîtrise du français (niveau B1), connaissance des droits et devoirs, insertion professionnelle, absence de condamnation pénale.",
			},
			{
				title: "Aide juridique",
				detail:
					"L'aide juridictionnelle prend en charge vos frais d'avocat si vos revenus sont modestes. Les Maisons de Justice et du Droit offrent des consultations juridiques gratuites. Contactez aussi le Défenseur des droits (discrimination, droits fondamentaux). Numéro : 3039.",
			},
		],
		tips: [
			"Gardez toujours une copie numérique de vos documents (passeport, titre de séjour, bail) dans un cloud sécurisé",
			"Ne laissez jamais votre titre de séjour expirer — même en cas de retard de la préfecture, conservez votre récépissé",
			"Les associations comme la CIMADE, le GISTI ou la Ligue des droits de l'Homme peuvent vous aider gratuitement",
			"Ne jamais ignorer une OQTF — privilégiez le recours contentieux (tribunal administratif), c'est le SEUL suspensif",
			"Les étudiants doivent respecter le plafond de 964h/an sous peine de refus de renouvellement",
			"Un récépissé de première demande ne permet PAS de quitter la France — seul le titre définitif le permet",
		],
	},
	{
		id: "famille",
		icon: Baby,
		title: "Famille & Enfants",
		color: "text-pink-600 dark:text-pink-400",
		iconBg: "bg-pink-500/10",
		intro:
			"La France offre un soutien important aux familles. Voici les démarches essentielles et les aides auxquelles vous avez droit.",
		items: [
			{
				title: "Déclaration de naissance",
				detail:
					"Déclarez la naissance à la mairie du lieu d'accouchement dans les 5 jours. Puis faites transcrire l'acte au Consulat du Gabon pour que votre enfant soit reconnu comme gabonais. Apportez : acte de naissance français, passeports des parents, livret de famille.",
			},
			{
				title: "Allocations familiales (CAF)",
				detail:
					"Dès le 2ème enfant, vous recevez les allocations familiales automatiquement. La prime à la naissance (PAJE) aide dès la grossesse. L'allocation de rentrée scolaire (ARS) est versée en août pour les enfants de 6 à 18 ans. Inscrivez-vous sur caf.fr.",
			},
			{
				title: "Garde d'enfants",
				detail:
					"Modes de garde : crèche municipale (inscription dès la grossesse à la mairie), assistante maternelle agréée, micro-crèche. Le complément de libre choix du mode de garde (CMG) aide à financer les frais de garde.",
			},
			{
				title: "Mariage & État civil",
				detail:
					"Un mariage contracté en France doit être transcrit au Consulat pour être reconnu au Gabon. Pour un mariage mixte (gabonais-français), le consulat délivre le certificat de capacité à mariage. Anticipez les délais (2-3 mois).",
			},
		],
		tips: [
			"La PMI (Protection Maternelle et Infantile) offre des consultations gratuites pour les enfants de 0 à 6 ans",
			"Le livret de famille français est un document officiel — demandez-le à la mairie lors du mariage ou de la naissance du premier enfant",
			"L'assurance scolaire est quasi-obligatoire et coûte environ 10€/an",
		],
	},
];

// ─── Codes de conduite / Savoir-vivre ────────────────────────────────────────

const savoirVivre: SavoirVivreItem[] = [
	{
		icon: HandHeart,
		title: "Salutations et convivialité",
		description: `En Espagne, les salutations sont chaleureuses. On se fait "dos besos" (deux bisous sur les joues) entre amis et connaissances. Le tutoiement ("tú") est très courant, même en contexte professionnel. Le vouvoiement ("usted") est réservé aux personnes âgées ou aux contextes très formels.`,
	},
	{
		icon: Landmark,
		title: "Horaires à l'espagnole",
		description:
			"Les horaires espagnols sont décalés : déjeuner entre 14h et 15h30, dîner entre 21h et 23h. Beaucoup de commerces ferment entre 14h et 17h. La vie sociale se déroule en soirée — il est normal de sortir à 22h. Adaptez-vous à ce rythme pour vous intégrer.",
	},
	{
		icon: Scale,
		title: "Lois et règles de vie",
		description:
			"Le respect des lois est essentiel : empadronamiento obligatoire, interdiction de fumer dans les lieux publics fermés, tri des déchets, respect du voisinage (bruit limité entre 22h et 8h dans la plupart des communautés autonomes). Les amendes sont réelles et peuvent impacter votre dossier.",
	},
	{
		icon: Users,
		title: "La sobremesa et les relations sociales",
		description: `La "sobremesa" (rester à table après le repas pour discuter) est un rituel social important. Les Espagnols sont généralement très sociables et ouverts. Participer aux fêtes locales (fiestas, ferias, verbenas) est le meilleur moyen de s'intégrer.`,
	},
	{
		icon: Flag,
		title: "Constitución et communautés autonomes",
		description:
			"L'Espagne est une monarchie constitutionnelle avec 17 communautés autonomes, chacune ayant sa propre identité culturelle et parfois sa langue (catalan, basque, galicien). Le respect de cette diversité est fondamental. L'égalité homme-femme est un droit constitutionnel. Toute discrimination est punie par la loi.",
	},
	{
		icon: HeartHandshake,
		title: "Engagement communautaire",
		description:
			"Participer à la vie associative locale (asociaciones de vecinos, activités culturelles, bénévolat) facilite l'intégration et crée un réseau de solidarité. Restez connecté à la communauté gabonaise tout en vous ouvrant à la richesse culturelle espagnole.",
	},
	{
		icon: Siren,
		title: "Coopération avec les forces de l'ordre",
		description:
			"En cas de contrôle, restez calme et coopérez. En Espagne, il y a la Policía Nacional (villes), la Guardia Civil (zones rurales) et les polices autonomes (Mossos, Ertzaintza). Vous avez le droit à un avocat, un interprète, et de contacter l'Ambassade (Convention de Vienne, art. 36). Ne signez rien sans avoir lu et compris.",
	},
];

// ─── Erreurs courantes ───────────────────────────────────────────────────────

const erreursCourantes: ErreurItem[] = [
	{
		erreur: "Laisser expirer son titre de séjour",
		conseil:
			"Lancez le renouvellement 2 à 4 mois avant la date d'expiration. Conservez le récépissé comme preuve de démarche en cours.",
	},
	{
		erreur: "Ne pas souscrire d'assurance habitation",
		conseil:
			"C'est obligatoire dès l'entrée dans le logement. Sans elle, votre bail peut être résilié. Coût : à partir de 5€/mois.",
	},
	{
		erreur: "Travailler sans autorisation",
		conseil:
			"Le travail non déclaré vous prive de droits (chômage, retraite, accident du travail) et peut entraîner une Orden de Expulsión.",
	},
	{
		erreur: "Ignorer la déclaration d'impôts",
		conseil:
			"Même sans revenus, vous devez déclarer vos impôts chaque année (sur agenciatributaria.gob.es). L'avis d'imposition est exigé pour de nombreuses démarches (logement, bourses, titre de séjour).",
	},
	{
		erreur: "Ne pas transcrire les actes d'état civil",
		conseil:
			"Les naissances et mariages en Espagne doivent être transcrits à l'Ambassade pour être valables au Gabon. Ne tardez pas — les délais s'allongent avec le temps.",
	},
	{
		erreur: "Isolement et absence de réseau",
		conseil:
			"Rejoignez les associations gabonaises locales, les groupes de quartier et participez aux événements de l'Ambassade. L'isolement complique toutes les démarches.",
	},
	{
		erreur: "Ignorer une Orden de Expulsión",
		conseil:
			"Une Orden de Expulsión ne disparaît pas si vous ne faites rien. Consultez immédiatement un avocat spécialisé en droit des étrangers. Deux recours existent : Recurso de Reposición et Recurso Contencioso-Administrativo — seul le contentieux SUSPEND l'exécution.",
	},
	{
		erreur: "Voyager avec un simple récépissé de première demande",
		conseil:
			"Le récépissé de PREMIÈRE DEMANDE de carte de séjour ne permet PAS de quitter l'Espagne et d'y revenir. Seul le titre définitif (TIE) ou une Autorización de regreso le permet.",
	},
	{
		erreur: "Signer des documents sans les lire (garde à vue)",
		conseil:
			"En cas de garde à vue, ne signez AUCUN document sans avoir lu et compris. Demandez un avocat (Turno de Oficio si nécessaire), un interprète si besoin, et exigez que l'Ambassade soit informée (Convention de Vienne, art. 36).",
	},
	{
		erreur: "Oublier de signaler un changement d'adresse",
		conseil:
			"Tout étranger titulaire d'un titre de séjour doit signaler son changement d'adresse dans les 3 mois, en ligne sur le portail ANEF ou en préfecture. Une amende est possible en cas de non-déclaration.",
	},
	{
		erreur: "Ne pas conserver de copies de ses documents",
		conseil:
			"Gardez des photocopies papier ET numériques (cloud sécurisé) de votre passeport, titre de séjour, bail, actes d'état civil. En cas de perte ou vol, ces copies accélèrent le remplacement.",
	},
	{
		erreur: "Méconnaître ses droits au travail en tant qu'étudiant",
		conseil:
			"Les étudiants étrangers peuvent travailler 964 heures/an (environ 20h/semaine) sans autorisation supplémentaire. Vérifiez la mention sur votre titre de séjour.",
	},
];

// ─── Numéros utiles ──────────────────────────────────────────────────────────

const numerosUtiles: NumeroUtile[] = [
	{
		label: "Consul Général du Gabon",
		number: "26 bis av. Raphaël, 75016",
		color: "bg-emerald-500/10 text-emerald-600",
	},
	{
		label: "Email Consulat",
		number: "contact@consulatdugabon.fr",
		color: "bg-emerald-500/10 text-emerald-600",
	},
	{
		label: "Urgence consulaire Gabon",
		number: "07 44 23 95 84",
		color: "bg-green-500/10 text-green-600",
	},
	{
		label: "SAMU (urgences médicales)",
		number: "15",
		color: "bg-red-500/10 text-red-600",
	},
	{
		label: "Police / Gendarmerie",
		number: "17",
		color: "bg-blue-500/10 text-blue-600",
	},
	{
		label: "Pompiers",
		number: "18",
		color: "bg-orange-500/10 text-orange-600",
	},
	{
		label: "Urgences européennes",
		number: "112",
		color: "bg-purple-500/10 text-purple-600",
	},
	{
		label: "Violences femmes info",
		number: "3919",
		color: "bg-pink-500/10 text-pink-600",
	},
	{
		label: "Enfance en danger",
		number: "119",
		color: "bg-yellow-500/10 text-yellow-600",
	},
	{
		label: "Droit au logement",
		number: "0 806 000 113",
		color: "bg-teal-500/10 text-teal-600",
	},
	{
		label: "OFII",
		number: "01 53 69 53 70",
		color: "bg-indigo-500/10 text-indigo-600",
	},
	{
		label: "Préfecture en ligne (ANEF)",
		number: "anef.interieur.gouv.fr",
		color: "bg-cyan-500/10 text-cyan-600",
	},
	{
		label: "Aide juridictionnelle",
		number: "3039",
		color: "bg-emerald-500/10 text-emerald-600",
	},
	{
		label: "OFPRA (Asile)",
		number: "01 58 68 10 10",
		color: "bg-slate-500/10 text-slate-600",
	},
];

const guideSectionsEn: GuideSection[] = [
	{
		id: "logement",
		icon: Home,
		title: "Housing",
		color: "text-blue-600 dark:text-blue-400",
		iconBg: "bg-blue-500/10",
		intro:
			"Housing is usually the first step after arrival. These essentials help you rent safely and understand your rights.",
		items: [
			{
				title: "Finding accommodation",
				detail:
					"Use trusted platforms (Leboncoin, SeLoger, PAP) and agencies. Avoid scams: never send money before a visit and signed lease.",
			},
			{
				title: "Rental application file",
				detail:
					"Prepare ID, recent payslips, work contract, tax notice and proof of address. A guarantor is often required; Visale can replace a private guarantor.",
			},
			{
				title: "Housing support (CAF)",
				detail:
					"Depending on your situation, you may be eligible for APL/ALS. Apply on caf.fr as soon as your lease starts.",
			},
			{
				title: "Tenant rights",
				detail:
					"Landlords cannot request prohibited documents (e.g. health card). Security deposit is capped, and winter eviction protections apply from November to March.",
			},
		],
		tips: [
			"Visale is free and widely accepted by landlords",
			"Open a French bank account early to pay rent and bills",
			"Take out home insurance from day one of your lease",
		],
	},
	{
		id: "sante",
		icon: Heart,
		title: "Health & Social Protection",
		color: "text-red-600 dark:text-red-400",
		iconBg: "bg-red-500/10",
		intro:
			"France offers universal healthcare. As a resident, you can access care through the public system and optional complementary coverage.",
		items: [
			{
				title: "Joining social security",
				detail:
					"Register through ameli.fr with your residence permit, proof of address and bank details. PUMA covers stable residents after three months.",
			},
			{
				title: "Complementary insurance",
				detail:
					"Public insurance reimburses part of costs. A mutual plan covers the rest. Low-income residents can apply for CSS at reduced or no cost.",
			},
			{
				title: "Primary care doctor",
				detail:
					"Declare a regular doctor to receive better reimbursements. Use the Ameli directory to find doctors accepting new patients.",
			},
			{
				title: "Emergencies",
				detail:
					"Call 15 (SAMU), 18 (fire), or 112 (EU). Emergency hospital services remain accessible even if your paperwork is still in progress.",
			},
		],
		tips: [
			"Keep your Vitale card or temporary certificate with you",
			"Teleconsultation is reimbursed and useful in medical deserts",
			"Municipal health centers often avoid extra billing",
		],
	},
	{
		id: "education",
		icon: GraduationCap,
		title: "Education & Training",
		color: "text-green-600 dark:text-green-400",
		iconBg: "bg-green-500/10",
		intro:
			"Children have a right to education in France regardless of nationality. Adults can also access strong training and upskilling options.",
		items: [
			{
				title: "School enrollment for children",
				detail:
					"Schooling is mandatory from age 3 to 16. First register at your local town hall, then with the school.",
			},
			{
				title: "Higher education",
				detail:
					"Apply through Parcoursup (students in France) or Campus France (from abroad). Public tuition remains comparatively affordable.",
			},
			{
				title: "Degree recognition",
				detail:
					"ENIC-NARIC comparability statements can help with jobs and studies when you hold a foreign diploma.",
			},
			{
				title: "Adult training",
				detail:
					"CPF, France Travail and VAE pathways can finance or validate skills for career transitions.",
			},
		],
		tips: [
			"Many local associations offer free French classes (FLE)",
			"Student status unlocks transport and cultural discounts",
			"Public libraries provide free digital and training resources",
		],
	},
	{
		id: "emploi",
		icon: Briefcase,
		title: "Work & Entrepreneurship",
		color: "text-orange-600 dark:text-orange-400",
		iconBg: "bg-orange-500/10",
		intro:
			"To work legally, your residence status must authorize employment. Plan your strategy early: job search, contracts, or business creation.",
		items: [
			{
				title: "Work authorization",
				detail:
					"Check the wording on your residence permit. Most employee and family permits allow work; student permits are capped in hours.",
			},
			{
				title: "Job search channels",
				detail:
					"Register with France Travail and combine it with LinkedIn, Indeed, HelloWork and sector-specific networks.",
			},
			{
				title: "Starting a business",
				detail:
					"Micro-entrepreneur status is the fastest entry point. Register online and verify tax/social contribution obligations.",
			},
			{
				title: "Employee rights",
				detail:
					"You are entitled to a valid contract, payslips, paid leave and social protections. Undeclared work removes key rights.",
			},
		],
		tips: [
			"ACRE can reduce social charges in the first year",
			"Local missions support young adults with job access",
			"Avoid undeclared work: legal and social risks are high",
		],
	},
	{
		id: "droits",
		icon: Scale,
		title: "Rights, Residency & Citizenship",
		color: "text-purple-600 dark:text-purple-400",
		iconBg: "bg-purple-500/10",
		intro:
			"Understanding residency rules and legal options protects your stability in France and reduces administrative risk.",
		items: [
			{
				title: "Residence permit timelines",
				detail:
					"Renew 2 to 4 months before expiry through ANEF or prefecture channels to avoid status gaps.",
			},
			{
				title: "OQTF: immediate action",
				detail:
					"Never ignore an OQTF. Administrative and court appeals have strict deadlines, and only court action can suspend enforcement in many cases.",
			},
			{
				title: "Regularization paths",
				detail:
					"Possible routes include work-based, family-based, humanitarian or exceptional admission, depending on your case file.",
			},
			{
				title: "Student work cap",
				detail:
					"Students can work up to 964 hours/year. Exceeding this threshold can impact renewal decisions.",
			},
			{
				title: "Address change obligation",
				detail:
					"Report your new address within three months through ANEF or prefecture procedures.",
			},
			{
				title: "Dual nationality situations",
				detail:
					"Travel and visa rules may differ by passport used. Check entry requirements before each trip.",
			},
			{
				title: "Family reunification",
				detail:
					"You may request reunification if you meet legal residence, income and housing conditions.",
			},
			{
				title: "Naturalization",
				detail:
					"Naturalization usually requires long-term legal residence, language proficiency and integration.",
			},
			{
				title: "Legal aid",
				detail:
					"Legal aid and free rights clinics are available for low-income residents and discrimination cases.",
			},
		],
		tips: [
			"Keep secure digital copies of all identity and residence documents",
			"Do not let permits expire while waiting on administration",
			"Use specialized associations for legal orientation",
			"For OQTF, prioritize urgent legal advice and court deadlines",
			"Students should track work hours month by month",
			"A first-application receipt is not always valid for re-entry",
		],
	},
	{
		id: "famille",
		icon: Baby,
		title: "Family & Children",
		color: "text-pink-600 dark:text-pink-400",
		iconBg: "bg-pink-500/10",
		intro:
			"France provides significant support for families through civil registration, childcare and social benefits.",
		items: [
			{
				title: "Birth registration",
				detail:
					"Declare birth promptly at the local town hall, then complete consular transcription for Gabonese civil status recognition.",
			},
			{
				title: "Family benefits (CAF)",
				detail:
					"Family and early-childhood benefits may be available depending on household composition and income.",
			},
			{
				title: "Childcare options",
				detail:
					"Explore municipal daycare, licensed childminders and at-home care. Financial support may offset part of costs.",
			},
			{
				title: "Marriage and civil records",
				detail:
					"Acts issued in France often need transcription or legalization for recognition in Gabonese records.",
			},
		],
		tips: [
			"PMI centers provide free support for children aged 0-6",
			"Keep your family record book and civil documents updated",
			"School insurance is low-cost and strongly recommended",
		],
	},
];

const savoirVivreEn: SavoirVivreItem[] = [
	{
		icon: HandHeart,
		title: "Greetings and Warmth",
		description:
			"Spanish greetings are warm — 'dos besos' (two cheek kisses) are common between friends. The informal 'tú' is widely used, even professionally. 'Usted' is reserved for elderly people or very formal settings.",
	},
	{
		icon: Landmark,
		title: "Spanish Schedules",
		description:
			"Spanish schedules are shifted: lunch is between 2–3:30 PM, dinner 9–11 PM. Many shops close between 2–5 PM. Social life happens in the evening — going out at 10 PM is perfectly normal.",
	},
	{
		icon: Scale,
		title: "Laws and Daily Rules",
		description:
			"Rules around empadronamiento, smoking bans, waste sorting and neighborhood noise are enforced and can impact your administrative record.",
	},
	{
		icon: Users,
		title: "Sobremesa and Social Life",
		description:
			"'Sobremesa' (staying at the table to chat after a meal) is a cherished Spanish tradition. Joining local fiestas, ferias and verbenas is the best way to integrate.",
	},
	{
		icon: Flag,
		title: "Constitution and Autonomous Communities",
		description:
			"Spain is a constitutional monarchy with 17 autonomous communities, each with its own cultural identity and sometimes its own language. Respecting this diversity is essential.",
	},
	{
		icon: HeartHandshake,
		title: "Community Engagement",
		description:
			"Joining local associations and community networks accelerates integration and support.",
	},
	{
		icon: Siren,
		title: "Interactions with Police",
		description:
			"Stay calm and cooperative. Spain has the Policía Nacional, Guardia Civil, and regional forces. You have rights, including legal counsel and Embassy contact.",
	},
];

const erreursCourantesEn: ErreurItem[] = [
	{
		erreur: "Letting your permit expire",
		conseil:
			"Start renewal procedures 2 to 4 months before expiry and keep your receipt as proof.",
	},
	{
		erreur: "No home insurance",
		conseil:
			"Insurance is mandatory from move-in day. Without it, your lease can be terminated.",
	},
	{
		erreur: "Working without authorization",
		conseil:
			"Undeclared or unauthorized work can lead to severe administrative penalties, including an Orden de Expulsión.",
	},
	{
		erreur: "Ignoring tax declaration",
		conseil:
			"You must file taxes every year through agenciatributaria.gob.es, even with little or no income.",
	},
	{
		erreur: "Not transcribing civil records",
		conseil:
			"Birth and marriage records completed in Spain should be transcribed at the Embassy for Gabonese administrative validity.",
	},
	{
		erreur: "Isolation and no support network",
		conseil:
			"Join local groups and trusted associations early to reduce administrative and social vulnerability.",
	},
	{
		erreur: "Ignoring an Orden de Expulsión",
		conseil:
			"Act immediately with legal support. Appeal deadlines are short and procedural strategy matters.",
	},
	{
		erreur: "Traveling with first-request receipt only",
		conseil:
			"A first-application receipt may not allow exit and re-entry. Only the TIE or an Autorización de regreso allows it.",
	},
	{
		erreur: "Signing documents without understanding",
		conseil:
			"During custody, request a lawyer (Turno de Oficio) and interpreter if needed; never sign unclear documents.",
	},
	{
		erreur: "Forgetting to report address change",
		conseil:
			"Update your Empadronamiento within 30 days and notify the Oficina de Extranjería.",
	},
	{
		erreur: "No backup copies of documents",
		conseil:
			"Keep both physical and secure digital copies of all key identity and residency records.",
	},
	{
		erreur: "Ignoring student work limits",
		conseil:
			"Track annual work hours carefully to protect student permit renewals.",
	},
];

const numerosUtilesEn: NumeroUtile[] = [
	{
		label: "Consul General of Gabon",
		number: "26 bis av. Raphaël, 75016",
		color: "bg-emerald-500/10 text-emerald-600",
	},
	{
		label: "Consulate Email",
		number: "contact@consulatdugabon.fr",
		color: "bg-emerald-500/10 text-emerald-600",
	},
	{
		label: "Gabon Consular Emergency",
		number: "07 44 23 95 84",
		color: "bg-green-500/10 text-green-600",
	},
	{
		label: "SAMU (Medical emergency)",
		number: "15",
		color: "bg-red-500/10 text-red-600",
	},
	{
		label: "Police / Gendarmerie",
		number: "17",
		color: "bg-blue-500/10 text-blue-600",
	},
	{
		label: "Fire Brigade",
		number: "18",
		color: "bg-orange-500/10 text-orange-600",
	},
	{
		label: "European emergency",
		number: "112",
		color: "bg-purple-500/10 text-purple-600",
	},
	{
		label: "Women violence hotline",
		number: "3919",
		color: "bg-pink-500/10 text-pink-600",
	},
	{
		label: "Child protection hotline",
		number: "119",
		color: "bg-yellow-500/10 text-yellow-600",
	},
	{
		label: "Housing rights hotline",
		number: "0 806 000 113",
		color: "bg-teal-500/10 text-teal-600",
	},
	{
		label: "OFII",
		number: "01 53 69 53 70",
		color: "bg-indigo-500/10 text-indigo-600",
	},
	{
		label: "Online prefecture (ANEF)",
		number: "anef.interieur.gouv.fr",
		color: "bg-cyan-500/10 text-cyan-600",
	},
	{
		label: "Legal aid",
		number: "3039",
		color: "bg-emerald-500/10 text-emerald-600",
	},
	{
		label: "OFPRA (Asylum)",
		number: "01 58 68 10 10",
		color: "bg-slate-500/10 text-slate-600",
	},
];

// ─── Accordion Component (page-specific: no links) ──────────────────────────

function GuideSectionAccordion({ section }: { section: GuideSection }) {
	const { t } = useTranslation();
	const [isOpen, setIsOpen] = useState(false);
	const Icon = section.icon;

	return (
		<div id={section.id} className="scroll-mt-24">
			<div
				className={`overflow-hidden glass-card rounded-2xl transition-all duration-300 ${isOpen ? "shadow-lg border-primary/20" : "hover:shadow-md hover:-translate-y-0.5"}`}
			>
				<button
					type="button"
					onClick={() => setIsOpen(!isOpen)}
					className="w-full text-left p-6 md:p-8"
				>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-4">
							<div
								className={`p-3 rounded-xl ${section.iconBg} ${section.color} backdrop-blur-sm`}
							>
								<Icon className="w-6 h-6" />
							</div>
							<div>
								<h3 className="text-lg md:text-xl font-bold text-foreground">
									{section.title}
								</h3>
								<p className="text-sm text-muted-foreground mt-1 font-normal leading-relaxed max-w-2xl">
									{section.intro}
								</p>
							</div>
						</div>
						<ChevronDown
							className={`w-5 h-5 text-muted-foreground shrink-0 ml-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
						/>
					</div>
				</button>

				<div
					className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}`}
				>
					<div className="px-6 md:px-8 pb-8 space-y-6 pt-0">
						{/* Detailed items */}
						<div className="space-y-4">
							{section.items.map((item, idx) => (
								<div
									key={idx}
									className="flex gap-4 p-4 rounded-xl bg-muted/40 hover:bg-muted/60 transition-colors"
								>
									<CheckCircle2
										className={`w-5 h-5 shrink-0 mt-0.5 ${section.color}`}
									/>
									<div>
										<h4 className="font-semibold text-foreground mb-1">
											{item.title}
										</h4>
										<p className="text-sm text-muted-foreground leading-relaxed">
											{item.detail}
										</p>
									</div>
								</div>
							))}
						</div>

						{/* Tips */}
						<div className="bg-primary/5 rounded-xl p-5 border border-primary/10 glass-panel">
							<div className="flex items-center gap-2 mb-3">
								<Lightbulb className="w-5 h-5 text-primary" />
								<h4 className="font-semibold text-foreground">
									{t("guides.practicalTips", "Practical tips")}
								</h4>
							</div>
							<ul className="space-y-2">
								{section.tips.map((tip, idx) => (
									<li
										key={idx}
										className="flex gap-3 text-sm text-muted-foreground"
									>
										<ArrowRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
										<span>{tip}</span>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

// ─── Main Page Component ─────────────────────────────────────────────────────

function IntegrationPage() {
	const { t, i18n } = useTranslation();
	const lang = i18n.resolvedLanguage || i18n.language;
	const isEn = lang.startsWith("en");
	const localizedGuideSections = isEn ? guideSectionsEn : guideSections;
	const localizedSavoirVivre = isEn ? savoirVivreEn : savoirVivre;
	const localizedErreurs = isEn ? erreursCourantesEn : erreursCourantes;
	const localizedNumeros = isEn ? numerosUtilesEn : numerosUtiles;

	return (
		<div className="min-h-screen bg-background flex flex-col">
			<div className="flex-1">
				{/* ── Hero Section ────────────────────────────────────────────────── */}
				<PageHero image="/images/heroes/hero-integration.png">
					<Badge className="mb-4 bg-primary/10 text-primary border-primary/20 backdrop-blur-sm">
						<BookOpen className="w-3.5 h-3.5 mr-1.5" />
						{t("integration.badge", "Guide d'intégration")}
					</Badge>

					<h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4">
						{t("integration.heroTitle", "S'intégrer et")}{" "}
						<span className="text-gradient">
							{t("integration.heroHighlight", "réussir en France")}
						</span>
					</h1>

					<p className="text-base text-muted-foreground mb-6 max-w-2xl leading-relaxed">
						{t(
							"integration.heroDescription",
							"Guide complet pour les Gabonais résidant en France : vos droits, vos démarches, les codes culturels et les astuces pratiques pour une intégration réussie. Le Consulat Général du Gabon vous accompagne.",
						)}
					</p>

					{/* Quick nav pills */}
					<div className="flex flex-wrap gap-2">
						{localizedGuideSections.map((s) => {
							const SIcon = s.icon;
							return (
								<a
									key={s.id}
									href={`#${s.id}`}
									className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-background/50 backdrop-blur-sm hover:bg-primary/10 hover:border-primary/30 transition-all text-xs font-medium text-foreground hover:text-primary"
								>
									<SIcon className={`w-4 h-4 ${s.color}`} />
									{s.title}
								</a>
							);
						})}
					</div>
				</PageHero>

				{/* ── Savoir-vivre & Conventions ───────────────────────────────────── */}
				<section className="py-24 px-6 bg-muted/20">
					<div className="max-w-7xl mx-auto">
						<div className="text-center mb-16">
							<Badge
								variant="outline"
								className="mb-4 bg-background/50 backdrop-blur-sm"
							>
								<HandHeart className="w-3.5 h-3.5 mr-1.5" />
								{t("integration.savoirVivre.badge", "Savoir-vivre")}
							</Badge>
							<h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
								{t(
									"integration.savoirVivre.title",
									"Codes culturels & Conventions",
								)}
							</h2>
							<p className="text-muted-foreground max-w-2xl mx-auto">
								{t(
									"integration.savoirVivre.description",
									"Comprendre les codes de la société française pour mieux y évoluer. Ce n'est pas renoncer à sa culture, c'est en ajouter une autre.",
								)}
							</p>
						</div>

						<SavoirVivreGrid items={localizedSavoirVivre} />
					</div>
				</section>

				{/* ── Guides thématiques (Accordéons) ──────────────────────────────── */}
				<section className="py-16 px-6 bg-background">
					<div className="max-w-4xl mx-auto">
						<div className="text-center mb-12">
							<Badge variant="outline" className="mb-4">
								<Shield className="w-3.5 h-3.5 mr-1.5" />
								{t("integration.guides.badge", "Guides complets")}
							</Badge>
							<h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
								{t("integration.guides.title", "Vos démarches détaillées")}
							</h2>
							<p className="text-muted-foreground max-w-2xl mx-auto">
								{t(
									"integration.guides.description",
									"Cliquez sur chaque thème pour découvrir les informations détaillées, les procédures et nos astuces pratiques.",
								)}
							</p>
						</div>

						<div className="space-y-4">
							{localizedGuideSections.map((section) => (
								<GuideSectionAccordion key={section.id} section={section} />
							))}
						</div>
					</div>
				</section>

				{/* ── Erreurs courantes à éviter ───────────────────────────────────── */}
				<section className="py-16 px-6 bg-muted/30">
					<div className="max-w-5xl mx-auto">
						<div className="text-center mb-12">
							<Badge className="mb-4 bg-orange-500/10 text-orange-600 border-orange-200 dark:border-orange-800">
								<AlertTriangle className="w-3.5 h-3.5 mr-1.5" />
								{t("integration.erreurs.badge", "À savoir absolument")}
							</Badge>
							<h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
								{t("integration.erreurs.title", "Erreurs courantes à éviter")}
							</h2>
							<p className="text-muted-foreground max-w-2xl mx-auto">
								{t(
									"integration.erreurs.description",
									"Ces oublis peuvent avoir des conséquences sérieuses. Prenez-les au sérieux pour protéger vos droits.",
								)}
							</p>
						</div>

						<ErreursCourantesGrid items={localizedErreurs} />
					</div>
				</section>

				{/* ── Numéros utiles ──────────────────────────────────────────────── */}
				<section className="py-24 px-6 bg-muted/20">
					<div className="max-w-7xl mx-auto">
						<div className="text-center mb-16">
							<Badge
								variant="outline"
								className="mb-4 bg-background/50 backdrop-blur-sm"
							>
								<Phone className="w-3.5 h-3.5 mr-1.5" />
								{t("integration.numeros.badge", "Numéros essentiels")}
							</Badge>
							<h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
								{t("integration.numeros.title", "Numéros utiles à conserver")}
							</h2>
							<p className="text-muted-foreground max-w-2xl mx-auto">
								{t(
									"integration.numeros.description",
									"Enregistrez ces numéros dans votre téléphone. Ils peuvent sauver des vies.",
								)}
							</p>
						</div>

						<NumerosUtilesGrid items={localizedNumeros} />
					</div>
				</section>

				<CitizenCTA />
			</div>
		</div>
	);
}
