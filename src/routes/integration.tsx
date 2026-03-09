import { createFileRoute } from "@tanstack/react-router";
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
	Phone,
	Scale,
	Shield,
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
			"Le logement est souvent la première étape de votre installation en Espagne. Voici les clés pour comprendre le marché locatif espagnol et accéder à vos droits.",
		items: [
			{
				title: "Recherche de logement",
				detail:
					"Utilisez les plateformes de référence : Idealista, Fotocasa, Pisos.com, Habitaclia. Méfiez-vous des annonces trop avantageuses — ne versez jamais d'argent avant la visite et la signature du bail (contrato de arrendamiento).",
			},
			{
				title: "Empadronamiento (inscription au padrón)",
				detail:
					"C'est la PREMIÈRE démarche obligatoire en Espagne. Inscrivez-vous au padrón municipal de votre mairie (Ayuntamiento) dès votre installation. Il est nécessaire pour la santé, la scolarité, le NIE et presque toutes les démarches. Documents : passeport + contrat de location ou attestation d'hébergement.",
			},
			{
				title: "Aides au logement",
				detail:
					"Des aides existent via le Plan Estatal de Vivienda et les programmes des Comunidades Autónomas. À Madrid, consultez la Empresa Municipal de la Vivienda y Suelo (EMVS). Les jeunes de moins de 35 ans peuvent bénéficier du Bono Alquiler Joven (250€/mois).",
			},
			{
				title: "Droits du locataire",
				detail:
					"La Ley de Arrendamientos Urbanos (LAU) encadre les droits des locataires. La fianza (caution) est plafonnée à 1 mois de loyer (non meublé) ou 2 mois (meublé). La durée minimale d'un bail est de 5 ans (7 ans si le propriétaire est une entreprise). Le propriétaire ne peut pas augmenter le loyer librement pendant la durée du contrat.",
			},
		],
		tips: [
			"L'empadronamiento est GRATUIT et se fait à la mairie — ne payez JAMAIS un intermédiaire pour cette démarche",
			"Ouvrez un compte bancaire espagnol rapidement — c'est indispensable pour le prélèvement du loyer",
			"Souscrivez une assurance habitation (seguro del hogar) dès l'entrée dans le logement",
		],
	},
	{
		id: "sante",
		icon: Heart,
		title: "Santé & Protection sociale",
		color: "text-red-600 dark:text-red-400",
		iconBg: "bg-red-500/10",
		intro:
			"L'Espagne dispose d'un système de santé universel (SNS). En tant que résident, vous avez droit à la couverture maladie. Voici comment en bénéficier.",
		items: [
			{
				title: "Inscription à la Seguridad Social",
				detail:
					"Inscrivez-vous à la Seguridad Social (seg-social.es) pour obtenir votre Tarjeta Sanitaria (carte de santé). Avec l'empadronamiento et votre NIE/TIE, rendez-vous au Centro de Salud de votre quartier pour être assigné à un médecin de famille (Médico de Cabecera).",
			},
			{
				title: "Système National de Santé (SNS)",
				detail:
					"Le SNS est gratuit pour les résidents : consultations chez le médecin de famille, spécialistes (sur orientation), urgences hospitalières. Les médicaments sont partiellement pris en charge (40% à 60% de réduction selon votre situation). La couverture est universelle, quelle que soit votre nationalité.",
			},
			{
				title: "Médecin de famille (Médico de Cabecera)",
				detail:
					"Votre Centro de Salud vous attribuera un médecin de famille et un pédiatre pour vos enfants. C'est votre premier interlocuteur médical — il vous orientera vers les spécialistes si nécessaire. Prenez rendez-vous via l'application de votre communauté autonome ou par téléphone.",
			},
			{
				title: "Urgences et numéros utiles",
				detail:
					"Numéro unique d'urgence : 112 • Urgences médicales : 061 • Aux urgences hospitalières, vous serez soigné quelle que soit votre situation administrative. Pour les gardes de nuit en pharmacie (farmacia de guardia), consultez le site de votre mairie.",
			},
		],
		tips: [
			"Conservez toujours sur vous votre Tarjeta Sanitaria (ou récépissé d'inscription)",
			"Santé mentale : consultations gratuites aux Centros de Salud Mental, ligne d'aide Teléfono de la Esperanza (717 003 717)",
			"Les Centros de Salud sont gratuits et proposent des consultations sans dépassement d'honoraires",
		],
	},
	{
		id: "education",
		icon: GraduationCap,
		title: "Éducation & Formation",
		color: "text-green-600 dark:text-green-400",
		iconBg: "bg-green-500/10",
		intro:
			"Le système éducatif espagnol est accessible à tous les enfants résidant en Espagne, quelle que soit la nationalité. Pour les adultes, de nombreuses formations existent.",
		items: [
			{
				title: "Scolarisation des enfants",
				detail:
					"L'instruction est obligatoire de 3 à 16 ans. Inscrivez votre enfant auprès de la Consejería de Educación de votre communauté autonome. Aucun document de séjour ne peut être exigé pour l'inscription scolaire d'un enfant. L'empadronamiento est cependant requis.",
			},
			{
				title: "Études supérieures",
				detail:
					"Les bacheliers gabonais doivent faire homologuer leur diplôme via UNEDasiss (unedasiss.uned.es) pour s'inscrire dans une université espagnole. Les frais d'inscription publiques varient de 700€ à 2 000€/an selon la communauté autonome. Demandez une bourse Becas MEC via le Ministerio de Educación.",
			},
			{
				title: "Reconnaissance des diplômes (Homologación)",
				detail:
					"L'homologación permet de faire reconnaître vos diplômes gabonais en Espagne. La demande se fait auprès du Ministerio de Educación. Délai : 3 à 12 mois. Pour les professions réglementées (médecin, avocat, ingénieur), une procédure spécifique est requise.",
			},
			{
				title: "Formation professionnelle (adultes)",
				detail:
					"Le SEPE (sepe.es) propose des formations gratuites pour les demandeurs d'emploi. Les Escuelas Oficiales de Idiomas offrent des cours de langues accessibles. Les certificados de profesionalidad valident vos compétences professionnelles.",
			},
		],
		tips: [
			"Les cours d'espagnol sont souvent gratuits dans les centres d'accueil et les mairies (Centros de Participación e Integración)",
			"La carte d'étudiant donne accès à de nombreuses réductions (abono joven transport, culture, restauration universitaire)",
			"Les bibliothèques municipales (bibliotecas públicas) sont gratuites et offrent accès à internet et formations en ligne",
		],
	},
	{
		id: "emploi",
		icon: Briefcase,
		title: "Emploi & Entrepreneuriat",
		color: "text-orange-600 dark:text-orange-400",
		iconBg: "bg-orange-500/10",
		intro:
			"Travailler en Espagne nécessite un titre de séjour autorisant le travail. Voici les étapes clés pour accéder au marché de l'emploi ou créer votre activité.",
		items: [
			{
				title: "Autorisation de travail",
				detail:
					"Votre TIE (Tarjeta de Identidad de Extranjero) doit mentionner l'autorisation de travail. Les permis de résidence et travail, les autorisations de residencia y trabajo por cuenta ajena ou propia autorisent le travail. Les étudiants peuvent travailler 964 heures/an (environ 20h/semaine).",
			},
			{
				title: "Recherche d'emploi",
				detail:
					"Inscrivez-vous au SEPE (Servicio Público de Empleo Estatal — sepe.es) pour bénéficier d'un accompagnement et d'indemnités si vous avez cotisé. Utilisez aussi : InfoJobs, LinkedIn, Indeed, Trabajos.com. Le CV espagnol est concis (1-2 pages) et peut inclure une photo.",
			},
			{
				title: "Créer son entreprise (Autónomo)",
				detail:
					"Le statut Autónomo est le plus courant pour les entrepreneurs individuels. Inscription auprès de la Seguridad Social (régime RETA). La tarifa plana réduit les cotisations à 80€/mois la première année. Pour les sociétés, consultez la Ventanilla Única Empresarial ou la Cámara de Comercio.",
			},
			{
				title: "Droits des salariés",
				detail:
					"Salario Mínimo Interprofesional (SMI) 2025 : environ 1 134€ net/mois (14 pagas). 30 jours ouvrables de congés payés. Durée légale : 40h/semaine. Vous avez droit aux mêmes protections que tout salarié espagnol (contrato de trabajo obligatoire, nómina, cotisations sociales, prestación por desempleo).",
			},
		],
		tips: [
			"La tarifa plana Autónomo réduit les cotisations à 80€/mois la première année de création d'activité",
			"Les oficinas de empleo accompagnent gratuitement les demandeurs d'emploi — inscription obligatoire pour percevoir le paro",
			'Attention au travail non déclaré ("en negro") : c\'est illégal et vous prive de toute protection sociale, et peut entraîner une Orden de Expulsión',
		],
	},
	{
		id: "droits",
		icon: Scale,
		title: "Droits, Séjour & Citoyenneté",
		color: "text-purple-600 dark:text-purple-400",
		iconBg: "bg-purple-500/10",
		intro:
			"Comprendre vos droits et les démarches liées à votre titre de séjour est essentiel pour vivre sereinement en Espagne.",
		items: [
			{
				title: "NIE & TIE",
				detail:
					"Le NIE (Número de Identidad de Extranjero) est votre numéro d'identification fiscale — indispensable pour travailler, ouvrir un compte bancaire, signer un bail. La TIE (Tarjeta de Identidad de Extranjero) est la carte physique de séjour. Demande à l'Oficina de Extranjería ou au commissariat (Comisaría de Policía).",
			},
			{
				title: "Recours Orden de Expulsión — Vos droits",
				detail:
					"Si vous recevez une Orden de Expulsión, ne l'ignorez JAMAIS. Deux recours existent : 1) Recurso de Reposición (recours gracieux, 1 mois, NE suspend PAS l'exécution). 2) Recurso Contencioso-Administrativo devant le Tribunal Contencioso-Administrativo — c'est le SEUL recours qui SUSPEND l'exécution de l'ordre. L'aide juridictionnelle gratuite (Justicia Gratuita) est accessible. Consultez immédiatement un avocat spécialisé en extranjería.",
			},
			{
				title: "Régularisation de séjour (Arraigo)",
				detail:
					"Options : Arraigo social (3 ans de présence + contrat de travail ou moyens de subsistance + rapport d'intégration), Arraigo laboral (2 ans de présence + preuve de travail irrégulier de l'employeur), Arraigo familiar (parent d'un enfant espagnol ou conjoint d'un résident), Arraigo para la formación (étudiants en formation). Documents essentiels : passeport, empadronamiento, preuves de présence en Espagne.",
			},
			{
				title: "Droit au travail étudiant (964 h/an)",
				detail:
					"Les étudiants étrangers avec un visa d'études sont autorisés à travailler 964 heures/an (environ 20h/semaine) sans autorisation supplémentaire. Pour la carte pluriannuelle étudiant : assiduité requise + ressources suffisantes. Après un Master, possibilité de demander une modification de statut vers un permis de travail.",
			},
			{
				title: "Changement d'adresse (obligatoire)",
				detail:
					"Tout étranger titulaire d'un titre de séjour doit mettre à jour son empadronamiento en cas de déménagement. Des complications au renouvellement de la TIE peuvent survenir si l'adresse n'est pas à jour. Faites-le à la mairie de votre nouveau domicile.",
			},
			{
				title: "Binationaux (Hispano-Gabonais)",
				detail:
					"Le Gabon ne reconnaît pas officiellement la double nationalité, mais elle est tolérée en pratique. Un visa est obligatoire pour entrer au Gabon avec un passeport espagnol — il s'obtient auprès de l'Ambassade du Gabon à Madrid (Calle de la Silva, 2 — 28013 Madrid). Conseil : entrez en Espagne avec le passeport espagnol, au Gabon avec le passeport gabonais.",
			},
			{
				title: "Regroupement familial (Reagrupación Familiar)",
				detail:
					"Vous pouvez faire venir votre conjoint et vos enfants mineurs si vous résidez légalement en Espagne depuis au moins 1 an, disposez de ressources stables et d'un logement adapté. Dossier à déposer auprès de l'Oficina de Extranjería.",
			},
			{
				title: "Naturalisation espagnole",
				detail:
					"Possible après 10 ans de résidence régulière en Espagne (réduit à 2 ans pour les ressortissants de pays ibéro-américains, mais 10 ans pour les Gabonais). Conditions : examen DELE A2 (espagnol) + examen CCSE (connaissances constitutionnelles et socioculturelles), absence de casier judiciaire.",
			},
			{
				title: "Aide juridique (Justicia Gratuita)",
				detail:
					"L'aide juridictionnelle gratuite (Justicia Gratuita) prend en charge vos frais d'avocat si vos revenus sont modestes. Demande via le Turno de Oficio (Colegio de Abogados). Le Defensor del Pueblo (defensordelpueblo.es) intervient en cas de discrimination ou de violation des droits fondamentaux.",
			},
		],
		tips: [
			"Gardez toujours une copie numérique de vos documents (passeport, TIE, bail) dans un cloud sécurisé",
			"Ne laissez jamais votre TIE expirer — lancez le renouvellement 60 jours avant l'expiration via sede.administracionespublicas.gob.es",
			"Les associations comme CEAR, SOS Racismo ou la Red Acoge peuvent vous aider gratuitement",
			"Ne jamais ignorer une Orden de Expulsión — le Recurso Contencioso-Administrativo est le SEUL recours suspensif",
			"Les étudiants doivent respecter le plafond de 964h/an sous peine de refus de renouvellement",
			"Un récépissé de première demande de TIE ne permet PAS toujours de voyager — demandez une Autorización de Regreso si nécessaire",
		],
	},
	{
		id: "famille",
		icon: Baby,
		title: "Famille & Enfants",
		color: "text-pink-600 dark:text-pink-400",
		iconBg: "bg-pink-500/10",
		intro:
			"L'Espagne offre un soutien important aux familles. Voici les démarches essentielles et les aides auxquelles vous avez droit.",
		items: [
			{
				title: "Déclaration de naissance",
				detail:
					"Déclarez la naissance au Registro Civil dans les 72 heures. Puis faites transcrire l'acte à l'Ambassade du Gabon pour que votre enfant soit reconnu comme gabonais. Apportez : acte de naissance espagnol (certificado literal), passeports des parents, Libro de Familia.",
			},
			{
				title: "Prestations familiales (Seguridad Social)",
				detail:
					"L'Ingreso Mínimo Vital (IMV) aide les foyers à faibles revenus. La prestación por nacimiento y cuidado de menor accorde 16 semaines de congé rémunéré à 100% pour chaque parent. La déduction par maternité (1 200€/an) est disponible pour les mères actives. Demandes sur seg-social.es.",
			},
			{
				title: "Garde d'enfants",
				detail:
					"Modes de garde : Escuelas Infantiles (crèches publiques, inscription auprès de la Comunidad Autónoma), guarderías privées. Le cheque guardería exonère fiscalement les frais de crèche. L'inscription se fait généralement en mars-avril pour la rentrée de septembre.",
			},
			{
				title: "Mariage & État civil",
				detail:
					"Un mariage contracté en Espagne (mairie ou Registro Civil) doit être transcrit à l'Ambassade du Gabon pour être reconnu au Gabon. Pour un mariage mixte (gabonais-espagnol), l'Ambassade délivre le certificat de coutume et de célibat. Anticipez les délais (2-3 mois).",
			},
		],
		tips: [
			"Les Centros de Salud offrent un suivi gratuit pour les femmes enceintes et les enfants de 0 à 14 ans (Programa del Niño Sano)",
			"Le Libro de Familia espagnol est un document officiel — demandez-le au Registro Civil lors du mariage ou de la naissance du premier enfant",
			"L'assurance scolaire est recommandée pour les activités extrascolaires",
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
		label: "Ambassade du Gabon à Madrid",
		number: "C. de la Silva, 2, 28013 Madrid",
		color: "bg-emerald-500/10 text-emerald-600",
		category: "espagne",
		type: "address",
		description: "Siège de l'Ambassade",
	},
	{
		label: "Email Ambassade",
		number: "contact@ambassadegabon.es",
		color: "bg-emerald-500/10 text-emerald-600",
		category: "espagne",
		type: "email",
		description: "Lun-Ven 9h00-16h00",
	},
	{
		label: "Urgences (numéro unique)",
		number: "112",
		color: "bg-red-500/10 text-red-600",
		category: "espagne",
		type: "phone",
		description: "Ambulance, pompiers, police",
	},
	{
		label: "Urgences médicales",
		number: "061",
		color: "bg-red-500/10 text-red-600",
		category: "espagne",
		type: "phone",
		description: "SAMUR / Urgencias sanitarias",
	},
	{
		label: "Policía Nacional",
		number: "091",
		color: "bg-blue-500/10 text-blue-600",
		category: "espagne",
		type: "phone",
		description: "Villes & agglomérations",
	},
	{
		label: "Guardia Civil",
		number: "062",
		color: "bg-blue-500/10 text-blue-600",
		category: "espagne",
		type: "phone",
		description: "Zones rurales & routes",
	},
	{
		label: "Violences de genre",
		number: "016",
		color: "bg-pink-500/10 text-pink-600",
		category: "espagne",
		type: "phone",
		description: "24h/24, confidentiel",
	},
	{
		label: "Enfance en danger",
		number: "116 111",
		color: "bg-yellow-500/10 text-yellow-600",
		category: "espagne",
		type: "phone",
		description: "Ligne européenne",
	},
	{
		label: "Teléfono de la Esperanza",
		number: "717 003 717",
		color: "bg-teal-500/10 text-teal-600",
		category: "espagne",
		type: "phone",
		description: "Aide psychologique 24h/24",
	},
	{
		label: "Oficina de Extranjería",
		number: "+34 900 150 000",
		color: "bg-indigo-500/10 text-indigo-600",
		category: "espagne",
		type: "phone",
		description: "Information extranjería",
	},
	{
		label: "Seguridad Social (sede)",
		number: "seg-social.es",
		color: "bg-cyan-500/10 text-cyan-600",
		category: "espagne",
		type: "phone",
		description: "Démarches en ligne",
	},
	{
		label: "Defensor del Pueblo",
		number: "900 101 025",
		color: "bg-emerald-500/10 text-emerald-600",
		category: "espagne",
		type: "phone",
		description: "Recours droits fondamentaux",
	},
	{
		label: "Agencia Tributaria",
		number: "agenciatributaria.gob.es",
		color: "bg-slate-500/10 text-slate-600",
		category: "espagne",
		type: "phone",
		description: "Impôts et fiscalité",
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
		label: "Embassy of Gabon in Madrid",
		number: "C. de la Silva, 2, 28013 Madrid",
		color: "bg-emerald-500/10 text-emerald-600",
		category: "espagne",
		type: "address",
		description: "Embassy headquarters",
	},
	{
		label: "Embassy Email",
		number: "contact@ambassadegabon.es",
		color: "bg-emerald-500/10 text-emerald-600",
		category: "espagne",
		type: "email",
		description: "Mon-Fri 9am-4pm",
	},
	{
		label: "Emergency (all services)",
		number: "112",
		color: "bg-red-500/10 text-red-600",
		category: "espagne",
		type: "phone",
		description: "Ambulance, fire, police",
	},
	{
		label: "Medical emergency",
		number: "061",
		color: "bg-red-500/10 text-red-600",
		category: "espagne",
		type: "phone",
		description: "SAMUR / Health emergencies",
	},
	{
		label: "Policía Nacional",
		number: "091",
		color: "bg-blue-500/10 text-blue-600",
		category: "espagne",
		type: "phone",
		description: "Urban areas",
	},
	{
		label: "Guardia Civil",
		number: "062",
		color: "bg-blue-500/10 text-blue-600",
		category: "espagne",
		type: "phone",
		description: "Rural areas & roads",
	},
	{
		label: "Gender violence hotline",
		number: "016",
		color: "bg-pink-500/10 text-pink-600",
		category: "espagne",
		type: "phone",
		description: "24/7, confidential",
	},
	{
		label: "Child protection hotline",
		number: "116 111",
		color: "bg-yellow-500/10 text-yellow-600",
		category: "espagne",
		type: "phone",
		description: "European helpline",
	},
	{
		label: "Teléfono de la Esperanza",
		number: "717 003 717",
		color: "bg-teal-500/10 text-teal-600",
		category: "espagne",
		type: "phone",
		description: "Mental health support 24/7",
	},
	{
		label: "Oficina de Extranjería",
		number: "+34 900 150 000",
		color: "bg-indigo-500/10 text-indigo-600",
		category: "espagne",
		type: "phone",
		description: "Immigration information",
	},
	{
		label: "Seguridad Social (portal)",
		number: "seg-social.es",
		color: "bg-cyan-500/10 text-cyan-600",
		category: "espagne",
		type: "phone",
		description: "Online procedures",
	},
	{
		label: "Defensor del Pueblo",
		number: "900 101 025",
		color: "bg-emerald-500/10 text-emerald-600",
		category: "espagne",
		type: "phone",
		description: "Fundamental rights appeals",
	},
	{
		label: "Agencia Tributaria",
		number: "agenciatributaria.gob.es",
		color: "bg-slate-500/10 text-slate-600",
		category: "espagne",
		type: "phone",
		description: "Tax and fiscal matters",
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
							{section.items.map((item) => (
								<div
									key={item.title}
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
								{section.tips.map((tip) => (
									<li
										key={tip}
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
