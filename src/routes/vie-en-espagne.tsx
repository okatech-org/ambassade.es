import { createFileRoute } from "@tanstack/react-router";
import {
	Baby,
	BookOpen,
	Briefcase,
	CheckCircle2,
	ExternalLink,
	GraduationCap,
	Heart,
	Home,
	Phone,
	Receipt,
	Scale,
	Shield,
	ShieldAlert,
} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
	type GuideSection,
	GuideSectionCard,
	SectionNav,
} from "@/components/guides";
import { CitizenCTA } from "@/components/home/CitizenCTA";
import { EditableText } from "@/components/inline-edit/EditableText";
import { PageHero } from "@/components/PageHero";
import { Badge } from "@/components/ui/badge";
import { useSectionVisibility } from "@/hooks/useSectionVisibility";
import i18n from "@/integrations/i18n/i18n";

export const Route = createFileRoute("/vie-en-espagne")({
	component: VieEnSpainPage,
	head: () => {
		const isEn = (i18n.resolvedLanguage || i18n.language).startsWith("en");
		return {
			meta: [
				{
					title: isEn
						? "Living in Spain — Practical Guide | Embassy of Gabon in Spain"
						: "Vie en Espagne — Guide Pratique | Ambassade du Gabon en Espagne",
				},
				{
					name: "description",
					content: isEn
						? "Comprehensive guide for Gabonese nationals in Spain: housing, health, education, employment, residency rights, family and daily-life procedures."
						: "Guide complet pour les Gabonais en Espagne : logement, santé, éducation, emploi, droits de séjour et famille. Toutes les informations pratiques pour votre vie quotidienne.",
				},
			],
		};
	},
});

// ─── Data ────────────────────────────────────────────────────────────────────
const guideSections: GuideSection[] = [
	{
		id: "logement",
		icon: Home,
		title: "Logement",
		color: "text-blue-600 dark:text-blue-400",
		iconBg: "bg-blue-500/10",
		gradientFrom: "from-blue-500/5",
		gradientTo: "to-blue-600/10",
		image: "/images/guide-logement.png",
		intro:
			"Trouver un logement en Espagne peut être un défi, surtout sans garant ou historique locatif. Ce guide vous accompagne pas à pas dans la recherche, les aides financières et vos droits en tant que locataire.",
		items: [
			{
				title: "Recherche de logement",
				detail:
					"Sites incontournables : Idealista, Fotocasa, Pisos.com, Habitaclia, Milanuncios. Pour les logements sociaux (Vivienda de Protección Oficial — VPO), déposez une demande auprès de la Comunidad Autónoma correspondante via vivienda.gob.es. Délai d'attente variable selon la ville. Résidences universitaires : inscription via le portail de chaque université ou les Colegios Mayores.",
			},
			{
				title: "Fianza et garantie locative",
				detail:
					"En Espagne, le propriétaire exige une fianza (caution) équivalente à 1 mois de loyer (non meublé) ou 2 mois (meublé), déposée auprès de l'organisme régional compétent. Il peut aussi demander des garanties supplémentaires (aval bancario, mois d'avance). Pour les Gabonais sans garant, le recours à un aval bancaire ou une assurance de loyers impayés est la meilleure solution.",
			},
			{
				title: "Aides au logement",
				detail:
					"Le Plan Estatal de Vivienda propose des aides au loyer pour les personnes à faibles revenus, les jeunes (moins de 35 ans) et les familles nombreuses. Les Comunidades Autónomas gèrent leurs propres programmes d'aide. Renseignez-vous auprès des Servicios Sociales de votre municipalité ou sur le portail de votre communauté autonome.",
			},
			{
				title: "Droits des locataires",
				detail:
					"Le bail d'habitation est encadré par la Ley de Arrendamientos Urbanos (LAU). Les baux résidentiels ont une durée minimale de 5 ans (7 ans si le propriétaire est une entreprise). L'augmentation du loyer est encadrée par l'IPC (indice des prix). Le propriétaire doit fournir un logement en bon état. En cas de litige, adressez-vous aux Juntas de Arbitraje ou au tribunal.",
			},
			{
				title: "Assurance habitation (seguro del hogar)",
				detail:
					"L'assurance habitation n'est pas obligatoire pour les locataires en Espagne, mais fortement recommandée. Elle couvre les risques locatifs (incendie, dégât des eaux, vol). Comparez les offres sur Rastreator.com ou Acierto.com. Budget : 15€ à 40€/mois. Le propriétaire peut l'exiger dans le contrat de bail.",
			},
			{
				title: "Empadronamiento (inscription municipale)",
				detail:
					"L'empadronamiento est l'inscription au registre municipal (padrón) de votre commune. C'est une démarche essentielle dès votre installation : elle est requise pour accéder aux services de santé, scolariser les enfants et obtenir le NIE. Rendez-vous à la mairie (Ayuntamiento) avec votre contrat de bail et votre passeport.",
			},
		],
		tips: [
			"Faites l'empadronamiento dès votre arrivée — c'est la première démarche indispensable en Espagne",
			"Ouvrez un compte bancaire espagnol rapidement — c'est indispensable pour le prélèvement du loyer",
			"Demandez un aval bancario si vous n'avez pas de garant — c'est la solution la plus acceptée",
			"Conservez tous vos échanges écrits avec le propriétaire (emails, burofax)",
			"Photographiez le logement à l'entrée et vérifiez l'inventaire joint au contrat",
		],
		links: [
			{
				label: "Idealista",
				url: "https://www.idealista.com",
				description: "Principal portail immobilier en Espagne",
			},
			{
				label: "Plan Estatal de Vivienda",
				url: "https://www.mdsocialesa2030.gob.es/derechos-sociales/vivienda",
				description: "Aides au logement de l'État",
			},
			{
				label: "Vivienda social (VPO)",
				url: "https://www.mdsocialesa2030.gob.es/derechos-sociales/vivienda/vivienda-social",
				description: "Demande de logement social",
			},
		],
	},
	{
		id: "sante",
		icon: Heart,
		title: "Santé & Protection sociale",
		color: "text-red-600 dark:text-red-400",
		iconBg: "bg-red-500/10",
		gradientFrom: "from-red-500/5",
		gradientTo: "to-red-600/10",
		image: "/images/guide-sante.png",
		intro:
			"L'Espagne dispose d'un système de santé universel parmi les meilleurs au monde. En tant que résident, vous avez droit à la couverture maladie. Voici comment en bénéficier et naviguer dans le système de soins.",
		items: [
			{
				title: "Inscription à la Seguridad Social",
				detail:
					"Dès votre arrivée, demandez votre numéro de Seguridad Social via seg-social.es ou à la Tesorería General. Si vous travaillez, votre employeur lance la procédure automatiquement. Sinon, avec l'empadronamiento et votre NIE, vous pouvez accéder au Sistème National de Santé (SNS). Vous recevrez votre Tarjeta Sanitaria (carte de santé) en quelques semaines auprès de votre Centre de Salud.",
			},
			{
				title: "Couverture santé universelle",
				detail:
					"Le système de santé espagnol (SNS) est universel et financé par l'impôt. Les consultations médicales, hospitalisations et urgences sont gratuites. Les médicaments sont partiellement pris en charge (40% pour les actifs, 10% pour les retraités). Pour les revenus modestes, des exonérations existent.",
			},
			{
				title: "Médecin de famille (Médico de Cabecera)",
				detail:
					"Inscrivez-vous à votre Centro de Salud le plus proche pour être assigné à un médecin de famille. C'est votre premier point de contact pour toute consultation. Il vous orientera vers les spécialistes si nécessaire. Pour les rendez-vous, utilisez le portail SAS/SERMAS de votre communauté autonome ou l'application SaludResponde.",
			},
			{
				title: "Santé mentale et soutien psychologique",
				detail:
					"Le SNS propose un accès gratuit à des psychologues et psychiatres via le médecin de famille. Les Centros de Salud Mental offrent des consultations spécialisées gratuites. L'isolement, le choc culturel et les difficultés administratives peuvent peser : n'hésitez pas à consulter. Le Téléphone de l'Espoir (717 003 717) est disponible 24h/24.",
			},
			{
				title: "Pediatría pour enfants",
				detail:
					"Le système de santé espagnol assigne un pédiatre à chaque enfant de 0 à 14 ans via le Centro de Salud. Les consultations, vaccinations et suivis de croissance sont entièrement gratuits. Aucun justificatif de régularité de séjour n'est demandé pour les mineurs.",
			},
			{
				title: "Urgences médicales",
				detail:
					"En cas d'urgence vitale : appelez le 112 (numéro unique d'urgence en Espagne) ou le 061 (urgences médicales dans certaines communautés). Les urgences hospitalières (Urgencias) sont accessibles 24h/24 sans rendez-vous. Pour une consultation urgente non vitale : rendez-vous au Centro de Salud ou aux Puntos de Atención Continuada (PAC) le soir et le week-end.",
			},
		],
		tips: [
			"Conservez toujours sur vous votre Tarjeta Sanitaria (carte de santé)",
			"Inscrivez-vous au Centro de Salud de votre quartier dès l'empadronamiento fait",
			"Les Centros de Salud proposent des consultations gratuites sans dépassement d'honoraires",
			"Utilisez le portail de votre communauté autonome pour prendre rendez-vous en ligne",
			"Le 112 est le numéro unique d'urgence en Espagne — retenez-le absolument",
		],
		links: [
			{
				label: "Seguridad Social",
				url: "https://www.seg-social.es",
				description: "Site officiel de la Seguridad Social",
			},
			{
				label: "TopDoctors",
				url: "https://www.topdoctors.es",
				description: "Trouver un médecin spécialiste en Espagne",
			},
			{
				label: "Ministerio de Sanidad",
				url: "https://www.sanidad.gob.es",
				description: "Ministère de la Santé espagnol",
			},
			{
				label: "Salud Mental",
				url: "https://www.sanidad.gob.es/ciudadanos/saludMental",
				description: "Soutien psychologique et santé mentale",
			},
		],
	},
	{
		id: "education",
		icon: GraduationCap,
		title: "Éducation & Formation",
		color: "text-green-600 dark:text-green-400",
		iconBg: "bg-green-500/10",
		gradientFrom: "from-green-500/5",
		gradientTo: "to-green-600/10",
		image: "/images/guide-education.png",
		intro:
			"Le système éducatif espagnol est accessible à tous les enfants résidant en Espagne, quelle que soit la nationalité ou la situation administrative des parents. Pour les adultes, de nombreuses formations et dispositifs d'accompagnement existent.",
		items: [
			{
				title: "Scolarisation des enfants",
				detail:
					"L'instruction est obligatoire de 3 à 16 ans. Inscrivez votre enfant à la mairie de votre domicile, puis contactez l'école. L'inscription ne peut être refusée pour motif de nationalité ou de situation administrative des parents.",
			},
			{
				title: "Inscription à l'université (Selectividad / UNEDasiss)",
				detail:
					"Les bacheliers résidant en Espagne passent la Selectividad (EvAU/EBAU) pour accéder à l'université. Les étudiants venant du Gabon passent par UNEDasiss (unedasiss.uned.es) pour l'homologation de leur baccalauréat. Les frais d'inscription varient de 700€ à 1 500€ selon la communauté autonome et la formation.",
			},
			{
				title: "Bourses et aides financières",
				detail:
					"Le Ministerio de Educación attribue des Becas MEC (bourses générales) sur critères sociaux et académiques. Les étudiants gabonais peuvent aussi solliciter des bourses de l'État gabonais via l'ANBG. Les communautés autonomes proposent également des aides complémentaires.",
			},
			{
				title: "Équivalence des diplômes (Homologación)",
				detail:
					"L'Espagne exige une homologación (reconnaissance officielle) des diplômes étrangers via le Ministerio de Educación (educacionyfp.gob.es). Délai : 6 à 12 mois. Pour les diplômes universitaires, une credencial de equivalencia peut être demandée auprès de l'université d'accueil.",
			},
			{
				title: "Reconnaissance des acquis professionnels",
				detail:
					"Si vous avez une expérience professionnelle significative, l'Espagne propose la Acreditación de Competencias Profesionales pour obtenir un certificat de professionnalisme reconnu. Renseignez-vous auprès du SEPE ou des Comunidades Autónomas.",
			},
		],
		tips: [
			"Les cours d'espagnol pour étrangers (ELE) sont souvent gratuits dans les mairies et associations",
			"La carte d'étudiant (Carnet Joven) donne accès à de nombreuses réductions (transport, culture, loisirs)",
			"Les bibliothèques municipales sont gratuites et offrent accès à internet, presse et formations en ligne",
			"L'Escuela Oficial de Idiomas (EOI) propose des cours de langues à tarifs très réduits",
		],
		links: [
			{
				label: "Universidades.gob.es",
				url: "https://www.universidades.gob.es",
				description: "Portail des universités espagnoles",
			},
			{
				label: "UNEDasiss",
				url: "https://www.uned.es/universidad/inicio/en/unedasiss.html",
				description: "Études en Espagne pour les étudiants internationaux",
			},
			{
				label: "Homologación de títulos",
				url: "https://www.educacionyfp.gob.es/contenidos/estudiantes/titulos-equivalencias.html",
				description: "Reconnaissance des diplômes étrangers",
			},
		],
	},
	{
		id: "emploi",
		icon: Briefcase,
		title: "Emploi & Entrepreneuriat",
		color: "text-orange-600 dark:text-orange-400",
		iconBg: "bg-orange-500/10",
		gradientFrom: "from-orange-500/5",
		gradientTo: "to-orange-600/10",
		image: "/images/guide-emploi.png",
		intro:
			"Travailler en Espagne nécessite un titre de séjour autorisant le travail. Voici les étapes clés pour accéder au marché de l'emploi ou créer votre propre activité.",
		items: [
			{
				title: "Autorisation de travail",
				detail:
					'Votre titre de séjour (tarjeta de residencia) doit mentionner l\'autorisation de travailler. Les autorisations "por cuenta ajena" (salarié), "por cuenta propia" (indépendant) et "étudiant" (20h/semaine max) permettent de travailler. Vérifiez la mention sur votre titre.',
			},
			{
				title: "SEPE (Servicio Público de Empleo Estatal)",
				detail:
					"Inscrivez-vous au SEPE (sepe.es) dès que vous êtes en recherche d'emploi. Vous bénéficierez d'un accompagnement personnalisé, d'offres d'emploi ciblées et potentiellement de la prestación por desempleo si vous avez cotisé suffisamment.",
			},
			{
				title: "Travailler comme Autónomo",
				detail:
					"Pour devenir travailleur indépendant (autónomo), inscrivez-vous à la Seguridad Social (Régime Spécial des Travailleurs Autonomes — RETA) et à l'Agencia Tributaria. La tarifa plana permet aux nouveaux autónomos de payer une cotisation réduite de 80€/mois la première année.",
			},
			{
				title: "Tarifa plana pour autónomos",
				detail:
					"La tarifa plana est une réduction des cotisations sociales pour les nouveaux autónomos : 80€/mois la première année (au lieu de ~300€). Conditions : ne pas avoir été autónomo au cours des 2 dernières années. Inscription sur sede.seg-social.gob.es.",
			},
			{
				title: "Cámaras de Comercio",
				detail:
					"Les Cámaras de Comercio proposent des formations, un accompagnement à la création d'entreprise et des mises en réseau. Des programmes spécifiques comme PICE (Plan Integral de Cualificación y Empleo) accompagnent les jeunes vers l'emploi.",
			},
		],
		tips: [
			"La tarifa plana réduit les cotisations à 80€/mois la première année pour les nouveaux autónomos",
			"Le SEPE propose des formations gratuites pour les demandeurs d'emploi",
			'Attention au travail non déclaré ("en negro") : c\'est illégal et vous prive de toute protection sociale',
			"Le portail Garantía Juvenil (garantiajuvenil.gob.es) recense les offres adaptées aux jeunes de moins de 30 ans",
		],
		links: [
			{
				label: "SEPE",
				url: "https://www.sepe.es",
				description: "Recherche d'emploi et accompagnement",
			},
			{
				label: "Autónomo (RETA)",
				url: "https://www.seg-social.es/wps/portal/wss/internet/Trabajadores/TrabajadoresCuentaPropia",
				description: "Inscription comme travailleur indépendant",
			},
			{
				label: "Garantía Juvenil",
				url: "https://www.garantiajuvenil.gob.es",
				description: "Emploi, formation et aides pour les jeunes",
			},
		],
	},
	{
		id: "droits",
		icon: Scale,
		title: "Droits & Séjour",
		color: "text-purple-600 dark:text-purple-400",
		iconBg: "bg-purple-500/10",
		gradientFrom: "from-purple-500/5",
		gradientTo: "to-purple-600/10",
		image: "/images/guide-droits.png",
		intro:
			"Comprendre vos droits et les démarches liées à votre titre de séjour est essentiel pour vivre sereinement en Espagne. Le non-respect des délais peut entraîner des situations complexes.",
		items: [
			{
				title: "NIE et Tarjeta de Residencia",
				detail:
					"Le NIE (Número de Identidad de Extranjero) est votre numéro d'identification fiscale en Espagne. Demandez-le à la Oficina de Extranjería ou au consulat espagnol dès votre arrivée. La Tarjeta de Identidad de Extranjero (TIE) est votre carte de séjour physique, valider dans les 30 jours. Le renouvellement se fait 60 jours avant expiration via sede.administracionespublicas.gob.es.",
			},
			{
				title: "Le récépissé (resguardo) — Attention",
				detail:
					"⚠️ Le resguardo (récépissé) de première demande de carte de séjour ne permet PAS de quitter l'Espagne et d'y revenir dans certains cas. Seule la TIE définitive ou un visa en cours de validité le permet. Le resguardo de renouvellement, en revanche, fait office de titre de séjour provisoire pendant l'instruction de votre dossier.",
			},
			{
				title: "Carte de séjour pluriannuelle",
				detail:
					"Après un premier titre d'un an, vous pouvez obtenir une carte de 2 ans, puis de 5 ans. Les conditions varient selon le motif : travail, études, regroupement familial. Demande en Oficina de Extranjería ou en ligne via sede.administracionespublicas.gob.es.",
			},
			{
				title: "Empadronamiento — Obligation légale",
				detail:
					"Tout étranger résidant en Espagne doit s'inscrire au padrón municipal (empadronamiento) dès son arrivée et signaler tout changement d'adresse. Procédure en mairie (Ayuntamiento). Documents requis : passeport + justificatif de domicile (contrat de bail ou facture). L'empadronamiento est indispensable pour accéder à la santé, la scolarité et les aides sociales.",
			},
			{
				title: "Régularisation administrative (Arraigo)",
				detail:
					"Plusieurs voies de régularisation existent en Espagne : arraigo social (3 ans de présence + contrat de travail ou insertion), arraigo laboral (2 ans + preuve de travail), arraigo familiar (parent d'enfant espagnol ou d'Espagnol). Demande de titre de séjour à l'Oficina de Extranjería. La protection internationale se demande auprès de l'OAR (Oficina de Asilo y Refugio).",
			},
			{
				title: "Autorisation de retour (Autorización de Regreso)",
				detail:
					"Si votre TIE est en cours de renouvellement, demandez une Autorización de Regreso à la Oficina de Extranjería avant de voyager. Ce document vous permet de quitter et revenir en Espagne pendant l'instruction de votre dossier. Validité : 90 jours. Documents : passeport, resguardo de renouvellement, justificatif de voyage.",
			},
			{
				title: "Binationaux (Hispano-Gabonais)",
				detail:
					"Le Gabon ne reconnaît pas officiellement la double nationalité (sauf exceptions), mais en pratique de nombreux Gabonais possèdent les deux nationalités. Un visa est obligatoire pour entrer au Gabon avec un passeport espagnol — il s'obtient à l'Ambassade du Gabon en Espagne à Madrid. Conseil : entrez en Espagne avec le passeport espagnol, au Gabon avec le passeport gabonais.",
			},
			{
				title: "Regroupement familial (Reagrupación Familiar)",
				detail:
					"Vous pouvez faire venir votre conjoint et enfants mineurs si vous résidez régulièrement en Espagne depuis au moins 1 an, disposez de revenus stables (au moins le SMI — Salario Mínimo Interprofesional) et d'un logement adapté (rapport d'adéquation). Demande auprès de l'Oficina de Extranjería.",
			},
			{
				title: "Naturalisation (Nacionalidad)",
				detail:
					"Après 10 ans de résidence régulière et continue en Espagne, vous pouvez demander la nationalité espagnole (réduit à 2 ans pour les ressortissants de pays ibero-américains). Conditions : maîtrise de l'espagnol (examen DELE A2), réussite au test CCSE (connaissance de la société espagnole), casier judiciaire vierge, bonne conduite civique.",
			},
			{
				title: "Aide juridictionnelle (Justicia Gratuita)",
				detail:
					"Si vos revenus sont modestes, la Justicia Gratuita prend en charge tout ou partie de vos frais d'avocat. Demande auprès du Colegio de Abogados de votre ville ou en ligne. Le Defensor del Pueblo (defensordelpueblo.es) est également gratuit et indépendant.",
			},
		],
		tips: [
			"Gardez toujours une copie numérique de vos documents (passeport, TIE, bail) dans un cloud sécurisé",
			"Ne laissez jamais votre titre de séjour expirer — faites le renouvellement 60 jours avant",
			"Les associations comme CEAR, ACCEM ou Red Acoge peuvent vous aider gratuitement",
			"En cas de contrôle d'identité, vous devez présenter votre TIE ou votre resguardo",
			"Mettez à jour votre empadronamiento à chaque changement d'adresse",
			"Les binationaux doivent toujours voyager avec le passeport du pays dans lequel ils entrent",
			"Demandez une Autorización de Regreso avant tout voyage si votre TIE est en renouvellement",
		],
		links: [
			{
				label: "Sede Electrónica - Extranjería",
				url: "https://sede.administracionespublicas.gob.es/icpplus",
				description: "Démarches de titre de séjour en ligne",
			},
			{
				label: "Defensor del Pueblo",
				url: "https://www.defensordelpueblo.es",
				description: "Recours gratuit en cas de discrimination",
			},
			{
				label: "CEAR",
				url: "https://www.cear.es",
				description: "Accompagnement juridique gratuit pour les étrangers",
			},
			{
				label: "Ambassade du Gabon",
				url: "https://ambassade.ga",
				description: "Services consulaires — Madrid",
			},
			{
				label: "Extranjería - Migraciones",
				url: "https://www.inclusion.gob.es/web/migraciones/extranjeros",
				description: "Informations complètes sur les titres de séjour",
			},
		],
	},
	{
		id: "famille",
		icon: Baby,
		title: "Famille & Enfants",
		color: "text-pink-600 dark:text-pink-400",
		iconBg: "bg-pink-500/10",
		gradientFrom: "from-pink-500/5",
		gradientTo: "to-pink-600/10",
		image: "/images/guide-famille.png",
		intro:
			"L'Espagne offre un système de prestations familiales important. En tant que parent résidant en Espagne, vous avez droit à de nombreuses aides et services pour votre famille.",
		items: [
			{
				title: "Déclaration de naissance",
				detail:
					"Toute naissance sur le sol espagnol doit être déclarée au Registro Civil dans les 72 heures. Depuis 2023, la déclaration peut se faire directement à l'hôpital. Présentez vos pièces d'identité et le certificat médical d'accouchement. N'oubliez pas de faire transcrire l'acte à l'Ambassade du Gabon.",
			},
			{
				title: "Transcription à l'Ambassade",
				detail:
					"L'acte de naissance espagnol doit être transcrit au registre d'état civil gabonais via l'Ambassade. C'est indispensable pour que votre enfant obtienne la nationalité gabonaise et un passeport gabonais. Délai : environ 3 mois.",
			},
			{
				title: "Prestaciones familiares (Aides familiales)",
				detail:
					"L'Espagne propose plusieurs aides familiales : la prestación por hijo a cargo (allocation par enfant à charge sous conditions de ressources), l'Ingreso Mínimo Vital (IMV) avec supplément par enfant, et la deducción por maternidad (déduction fiscale de 1 200€/an pour les mères actives ayant des enfants de moins de 3 ans). Inscrivez-vous auprès des Servicios Sociales de votre municipalité.",
			},
			{
				title: "Prestación por nacimiento (Aide à la naissance)",
				detail:
					"En Espagne, le congé de paternité et de maternité est de 16 semaines chacun (rémunéré à 100%). Certaines communautés autonomes versent des aides supplémentaires à la naissance. Renseignez-vous auprès de la Seguridad Social et de votre communauté autonome.",
			},
			{
				title: "Modes de garde (Escuelas infantiles)",
				detail:
					"Escuela infantil publique (inscription en mairie, gratuite pour les 0-3 ans dans plusieurs communautés), guardería privée, ou garde à domicile. Le chèque guardería (déduction fiscale de jusqu'à 1 000€/an) est accessible aux mères actives. Les Servicios Sociales de votre commune vous informent gratuitement sur les options disponibles.",
			},
		],
		tips: [
			"Déclarez la naissance au Registro Civil ET à l'Ambassade pour que votre enfant ait la double nationalité",
			"Inscrivez-vous aux Servicios Sociales de votre commune dès votre arrivée — même sans enfant, d'autres aides existent",
			"Le pédiatre assigné au Centro de Salud offre un suivi gratuit pour les enfants de 0 à 14 ans",
			"Le congé de paternité et de maternité est de 16 semaines chacun, rémunéré à 100%",
		],
		links: [
			{
				label: "Servicios Sociales",
				url: "https://www.mdsocialesa2030.gob.es/derechos-sociales/familias",
				description: "Aides familiales et services sociaux",
			},
			{
				label: "Ingreso Mínimo Vital",
				url: "https://www.seg-social.es/wps/portal/wss/internet/Trabajadores/PrestacionesPensionesTrabajadores/65850d68-8f0a-4b04-a7e7-1607bd3e23b5",
				description: "Revenu minimum garanti + supplément familial",
			},
			{
				label: "Prestaciones familiares",
				url: "https://www.mdsocialesa2030.gob.es/derechos-sociales/familias/Paginas/index.aspx",
				description: "Droits et démarches familiales",
			},
		],
	},
	{
		id: "impots",
		icon: Receipt,
		title: "Impôts & Fiscalité",
		color: "text-teal-600 dark:text-teal-400",
		iconBg: "bg-teal-500/10",
		gradientFrom: "from-teal-500/5",
		gradientTo: "to-teal-600/10",
		intro:
			"Tout résident en Espagne est soumis à l'obligation de déclarer ses revenus, même en l'absence de revenus. Comprendre le système fiscal espagnol est essentiel pour éviter les pénalités et accéder aux aides.",
		items: [
			{
				title: "Déclaration annuelle de revenus (Declaración de la Renta)",
				detail:
					"Chaque année entre avril et juin, déclarez vos revenus sur agenciatributaria.gob.es (Campaña de la Renta). C'est OBLIGATOIRE si vos revenus dépassent certains seuils (22 000€/an pour un seul employeur). Même en dessous, la déclaration est recommandée car vous pourriez bénéficier d'un remboursement. L'avis (certificado de IRPF) est essentiel pour de nombreuses démarches administratives.",
			},
			{
				title: "Retenciones (Prélèvement à la source)",
				detail:
					"En Espagne, l'impôt sur le revenu (IRPF) est prélevé directement sur votre salaire par l'employeur sous forme de retenciones. Le taux varie selon vos revenus et votre situation familiale. Lors de la déclaration annuelle, un ajustement est effectué et vous pouvez recevoir un remboursement si les retenciones étaient trop élevées.",
			},
			{
				title: "IBI (Impôt foncier) et autres taxes locales",
				detail:
					"L'IBI (Impuesto sobre Bienes Inmuebles) est la taxe foncière espagnole, uniquement pour les propriétaires. Si vous êtes locataire, vous n'avez aucune taxe foncière à payer. La tasa de basuras (taxe d'enlèvement des ordures) peut être à la charge du locataire selon le contrat de bail.",
			},
			{
				title: "Convention fiscale Espagne-Gabon",
				detail:
					"Si vous percevez des revenus au Gabon tout en résidant en Espagne, ces revenus doivent être déclarés en Espagne via le formulaire de double imposition. Consultez un asesor fiscal (conseiller fiscal) ou l'Agencia Tributaria pour votre situation particulière.",
			},
		],
		tips: [
			"Déclarez vos impôts MÊME SANS REVENUS — l'avis de non-imposition est indispensable pour de nombreuses démarches",
			"Votre première déclaration doit se faire en papier au centre des impôts de votre domicile",
			"Conservez vos avis d'imposition pendant au moins 3 ans — l'administration peut contrôler sur cette période",
			"En cas de difficulté, demandez un délai de paiement au centre des impôts (gratuit et souvent accordé)",
		],
		links: [
			{
				label: "Agencia Tributaria",
				url: "https://www.agenciatributaria.gob.es",
				description: "Déclaration de revenus en ligne",
			},
			{
				label: "Simulateur d'impôt",
				url: "https://www.agenciatributaria.gob.es/AEAT.sede/Inicio/Procedimientos_Simuladores.shtml",
				description: "Estimez votre impôt sur le revenu",
			},
		],
	},
	{
		id: "discriminations",
		icon: ShieldAlert,
		title: "Discriminations & Recours",
		color: "text-amber-600 dark:text-amber-400",
		iconBg: "bg-amber-500/10",
		gradientFrom: "from-amber-500/5",
		gradientTo: "to-amber-600/10",
		intro:
			"La loi espagnole protège contre toute forme de discrimination. En tant que Gabonais en Espagne, connaître vos droits et les recours disponibles est essentiel pour vivre dignement.",
		items: [
			{
				title: "Qu'est-ce qu'une discrimination ?",
				detail:
					"La Ley integral para la igualdad de trato y la no discriminación (2022) protège contre la discrimination fondée sur l'origine, la nationalité, la race, la religion, le sexe, l'orientation sexuelle, le handicap, etc. La discrimination peut se manifester au travail, dans le logement, dans les services publics ou dans les lieux de loisirs.",
			},
			{
				title: "Discrimination au logement",
				detail:
					"Il est illégal pour un propriétaire de refuser un locataire en raison de son origine, de son nom ou de sa couleur de peau. Si vous suspectez une discrimination, constituez un dossier de preuves (emails, SMS, témoignages). Contactez SOS Racismo ou le Defensor del Pueblo.",
			},
			{
				title: "Discrimination au travail",
				detail:
					"L'employeur ne peut pas refuser une embauche, une promotion ou un licenciement basé sur des critères discriminatoires. Le Juzgado de lo Social est compétent pour les litiges liés au travail. L'Inspección de Trabajo peut également être saisie. Les syndicats CCOO et UGT peuvent vous accompagner gratuitement.",
			},
			{
				title: "Contrôles d'identité : vos droits",
				detail:
					"Lors d'un contrôle d'identité, vous devez présenter votre TIE ou resguardo. Un contrôle au faciès est illégal. Si vous estimez être victime d'un contrôle discriminatoire : notez le lieu, l'heure, le numéro d'identification des agents, et saisissez le Defensor del Pueblo ou déposez une plainte auprès de l'Asuntos Internos de la police.",
			},
			{
				title: "Recours disponibles",
				detail:
					"1) Defensor del Pueblo (defensordelpueblo.es) — gratuit, indépendant, saisine en ligne. 2) Dépôt de plainte (denuncia) au commissariat ou directement auprès du Ministerio Fiscal. 3) Associations spécialisées : SOS Racismo, Movimiento contra la Intolerancia, CEAR. 4) Aide juridictionnelle gratuite (Justicia Gratuita) si revenus modestes.",
			},
		],
		tips: [
			"Conservez toujours des preuves écrites (emails, SMS, captures d'appels) en cas de discrimination",
			"Le Defensor del Pueblo est gratuit et peut être saisi en ligne — 99% des dossiers sont traités",
			"En cas d'agression raciste, déposez plainte immédiatement et consultez un médecin pour certificat",
			"Contactez l'Ambassade si vous avez besoin d'accompagnement dans vos démarches",
		],
		links: [
			{
				label: "Defensor del Pueblo",
				url: "https://www.defensordelpueblo.es",
				description: "Recours gratuit contre les discriminations",
			},
			{
				label: "SOS Racisme",
				url: "https://www.sosracismo.eu",
				description: "Assistance juridique contre le racisme",
			},
			{
				label: "LICRA",
				url: "https://www.movimientocontralaintolerancia.com",
				description: "Ligue internationale contre le racisme",
			},
		],
	},
];

const guideSectionsEn: GuideSection[] = [
	{
		id: "logement",
		icon: Home,
		title: "Housing",
		color: "text-blue-600 dark:text-blue-400",
		iconBg: "bg-blue-500/10",
		gradientFrom: "from-blue-500/5",
		gradientTo: "to-blue-600/10",
		image: "/images/guide-logement.png",
		intro:
			"Finding accommodation in Spain can be difficult at first. This section helps you secure housing, benefits and legal protections.",
		items: [
			{
				title: "Where to search",
				detail:
					"Use trusted platforms and agencies. For social housing, file a formal request and expect potentially long wait times in large cities.",
			},
			{
				title: "Rental guarantee (Visale)",
				detail:
					"Visale can replace a private guarantor for many profiles and is free to use.",
			},
			{
				title: "Housing benefits (APL/ALS)",
				detail:
					"CAF support depends on income, rent and location. Apply online as soon as your lease starts.",
			},
			{
				title: "Tenant rights",
				detail:
					"Security deposits are regulated and landlord obligations are strict. In disputes, mediation or legal channels are available.",
			},
			{
				title: "Move-in and move-out inventory",
				detail:
					"Document property condition with photos at entry and exit to protect your deposit.",
			},
		],
		tips: [
			"Use Visale early if you do not have a guarantor",
			"Open a Spanish bank account before signing your lease",
			"Take mandatory home insurance before moving in",
			"Keep written communication with your landlord",
			"Photograph every room on move-in day",
		],
		links: [
			{
				label: "CAF — Simulateur APL",
				url: "https://www.mdsocialesa2030.gob.es/derechos-sociales/vivienda",
				description: "Estimate housing benefit eligibility",
			},
			{
				label: "Visale",
				url: "https://www.idealista.com",
				description: "Free rental guarantee",
			},
			{
				label: "Demande logement social",
				url: "https://www.mdsocialesa2030.gob.es/derechos-sociales/vivienda/vivienda-social",
				description: "Apply for social housing",
			},
		],
	},
	{
		id: "sante",
		icon: Heart,
		title: "Health & Social Protection",
		color: "text-red-600 dark:text-red-400",
		iconBg: "bg-red-500/10",
		gradientFrom: "from-red-500/5",
		gradientTo: "to-red-600/10",
		image: "/images/guide-sante.png",
		intro:
			"Spain provides broad healthcare access. As a resident, you can enroll in the public system and complete your coverage with a complementary plan.",
		items: [
			{
				title: "Social security registration",
				detail:
					"Register with CPAM through seg-social.es. Your employer may initiate this process if you are employed.",
			},
			{
				title: "Complementary health plan (CSS)",
				detail:
					"CSS can reduce or remove out-of-pocket costs for low-income households.",
			},
			{
				title: "Primary doctor pathway",
				detail:
					"Declaring a regular doctor improves reimbursement rates and care coordination.",
			},
			{
				title: "Mental health support",
				detail:
					"Public and subsidized support exists for psychological care, including referral-based schemes.",
			},
			{
				title: "Emergency care",
				detail:
					"Call 15 or 112 in urgent situations; emergency departments are open 24/7.",
			},
		],
		tips: [
			"Always keep your Vitale card or temporary certificate",
			"Teleconsultation can help when local availability is low",
			"Municipal health centers often limit extra fees",
			"Use Doctolib or official directories for appointments",
			"Emergency SMS service (114) is available in specific situations",
		],
		links: [
			{
				label: "Ameli.fr",
				url: "https://www.seg-social.es",
				description: "Official health insurance portal",
			},
			{
				label: "Doctolib",
				url: "https://www.topdoctors.es",
				description: "Online medical appointment booking",
			},
			{
				label: "CSS",
				url: "https://www.sanidad.gob.es/ciudadanos/prestaciones",
				description: "Complementary health coverage",
			},
			{
				label: "Mon soutien psy",
				url: "https://www.sanidad.gob.es/ciudadanos/saludMental",
				description: "Psychological support scheme",
			},
		],
	},
	{
		id: "education",
		icon: GraduationCap,
		title: "Education & Training",
		color: "text-green-600 dark:text-green-400",
		iconBg: "bg-green-500/10",
		gradientFrom: "from-green-500/5",
		gradientTo: "to-green-600/10",
		image: "/images/guide-education.png",
		intro:
			"Children and adults can access strong education and training pathways in Spain, with dedicated support for international students.",
		items: [
			{
				title: "Schooling for children",
				detail:
					"School attendance is mandatory from ages 3 to 16 and cannot be denied on nationality grounds.",
			},
			{
				title: "Higher education admission",
				detail:
					"Apply through Parcoursup (in Spain) or UNEDasiss pathways depending on your profile.",
			},
			{
				title: "Scholarships and grants",
				detail:
					"Becas MEC and other support schemes may be available based on social and academic criteria.",
			},
			{
				title: "Diploma recognition",
				detail:
					"ENIC-NARIC comparability certificates can support job applications and academic admissions.",
			},
			{
				title: "Professional validation (VAE)",
				detail:
					"VAE can convert work experience into recognized qualifications.",
			},
		],
		tips: [
			"Free or low-cost Spanish classes are widely available",
			"Student cards unlock transport and cultural discounts",
			"Public libraries provide free resources and internet access",
			"Use official portals for applications and deadlines",
		],
		links: [
			{
				label: "Parcoursup",
				url: "https://www.universidades.gob.es",
				description: "Higher education application platform",
			},
			{
				label: "UNEDasiss",
				url: "https://www.uned.es/universidad/inicio/en/unedasiss.html",
				description: "Study in Spain information",
			},
			{
				label: "ENIC-NARIC",
				url: "https://www.educacionyfp.gob.es/contenidos/estudiantes/titulos-equivalencias.html",
				description: "Foreign diploma recognition",
			},
		],
	},
	{
		id: "emploi",
		icon: Briefcase,
		title: "Employment & Entrepreneurship",
		color: "text-orange-600 dark:text-orange-400",
		iconBg: "bg-orange-500/10",
		gradientFrom: "from-orange-500/5",
		gradientTo: "to-orange-600/10",
		image: "/images/guide-emploi.png",
		intro:
			"Working in Spain requires the right residence status. You can pursue employment, self-employment or supported business creation.",
		items: [
			{
				title: "Work authorization",
				detail:
					"Check your permit wording carefully to confirm your right to work and any hour limitations.",
			},
			{
				title: "SEPE support",
				detail:
					"Register for job-search support, training and potential compensation based on your contribution history.",
			},
			{
				title: "Micro-business creation",
				detail:
					"Micro-entrepreneur status offers a simplified setup and tax framework for many activities.",
			},
			{
				title: "ACRE support",
				detail:
					"ACRE may reduce social charges during the first year for eligible founders.",
			},
			{
				title: "Chamber of commerce resources",
				detail:
					"CCI networks provide guidance, training and business support programs.",
			},
		],
		tips: [
			"Use ACRE and youth-employment support schemes where eligible",
			"Avoid undeclared work: legal and social risk is high",
			"Track residence and work-permit deadlines alongside contracts",
			"Build a network early through local associations and platforms",
		],
		links: [
			{
				label: "SEPE",
				url: "https://www.sepe.es",
				description: "Jobs and employment support",
			},
			{
				label: "Auto-entrepreneur",
				url: "https://www.seg-social.es/wps/portal/wss/internet/Trabajadores/TrabajadoresCuentaPropia",
				description: "Micro-business registration",
			},
			{
				label: "1jeune1solution",
				url: "https://www.garantiajuvenil.gob.es",
				description: "Youth jobs and training offers",
			},
		],
	},
	{
		id: "droits",
		icon: Scale,
		title: "Rights & Residency",
		color: "text-purple-600 dark:text-purple-400",
		iconBg: "bg-purple-500/10",
		gradientFrom: "from-purple-500/5",
		gradientTo: "to-purple-600/10",
		image: "/images/guide-droits.png",
		intro:
			"Understanding your rights and residence obligations is essential for long-term stability and legal security in Spain.",
		items: [
			{
				title: "Residence permit validity",
				detail:
					"Validate and renew permits on time through official Mercurio/prefecture channels.",
			},
			{
				title: "Receipt limitations",
				detail:
					"Some first-application receipts do not authorize international travel and re-entry.",
			},
			{
				title: "Multi-year permits",
				detail:
					"After an initial permit, multi-year cards may be available depending on your status.",
			},
			{
				title: "Address change obligation",
				detail:
					"You must declare address changes within legal deadlines to avoid penalties.",
			},
			{
				title: "Regularization options",
				detail:
					"Possible paths include work-based, family-based, humanitarian and protection routes.",
			},
			{
				title: "Family reunification and naturalization",
				detail:
					"Both require strict criteria on residence duration, resources, language and integration.",
			},
		],
		tips: [
			"Keep digital backups of all official documents",
			"Never let a permit expire without proof of renewal filing",
			"Use specialized legal associations for complex cases",
			"Report address changes quickly",
			"Verify travel rights before crossing borders with receipts",
		],
		links: [
			{
				label: "Mercurio - Étrangers en Espagne",
				url: "https://sede.administracionespublicas.gob.es/icpplus",
				description: "Residence procedures online",
			},
			{
				label: "Defensor del Pueblo",
				url: "https://www.defensordelpueblo.es",
				description: "Independent rights and discrimination body",
			},
			{
				label: "CEAR (ONG de ayuda)",
				url: "https://www.cear.es",
				description: "Free legal support",
			},
			{
				label: "Ambassade du Gabon",
				url: "https://ambassade.ga",
				description: "Gabonese consular support in Spain",
			},
			{
				label: "Service-public.fr — DCME",
				url: "https://www.inclusion.gob.es/web/migraciones/extranjeros",
				description: "Travel document for minors",
			},
		],
	},
	{
		id: "famille",
		icon: Baby,
		title: "Family & Children",
		color: "text-pink-600 dark:text-pink-400",
		iconBg: "bg-pink-500/10",
		gradientFrom: "from-pink-500/5",
		gradientTo: "to-pink-600/10",
		image: "/images/guide-famille.png",
		intro:
			"Families can access substantial support in Spain through child benefits, health services and civil registration pathways.",
		items: [
			{
				title: "Birth registration",
				detail:
					"Declare birth at the town hall first, then complete consular transcription for Gabonese records.",
			},
			{
				title: "Family benefits",
				detail:
					"CAF provides different types of support depending on family size, income and child age.",
			},
			{
				title: "Childcare options",
				detail:
					"Municipal daycare, licensed childminders and home care are available with potential financial support.",
			},
			{
				title: "Civil status procedures",
				detail:
					"Marriage and family records often need formal transcription for cross-border legal validity.",
			},
		],
		tips: [
			"Complete both Spanish and consular registration for children",
			"Open your CAF account early to avoid delays",
			"Use PMI services for preventive care for young children",
			"Keep family documents updated and accessible",
		],
		links: [
			{
				label: "CAF",
				url: "https://www.mdsocialesa2030.gob.es/derechos-sociales/vivienda",
				description: "Family benefits and social support",
			},
			{
				label: "Mon-enfant.fr",
				url: "https://www.mdsocialesa2030.gob.es/derechos-sociales/familias",
				description: "Find childcare options",
			},
			{
				label: "Service-public.fr — Famille",
				url: "https://www.mdsocialesa2030.gob.es/derechos-sociales/familias/Paginas/index.aspx",
				description: "Family rights and procedures",
			},
		],
	},
	{
		id: "impots",
		icon: Receipt,
		title: "Taxes & Fiscal Rules",
		color: "text-teal-600 dark:text-teal-400",
		iconBg: "bg-teal-500/10",
		gradientFrom: "from-teal-500/5",
		gradientTo: "to-teal-600/10",
		intro:
			"Tax filing is a key annual obligation in Spain and is often required for housing, social aid and residence renewals.",
		items: [
			{
				title: "Annual tax declaration",
				detail:
					"File returns each year through agenciatributaria.gob.es. Even low-income situations may still require declaration.",
			},
			{
				title: "Withholding tax system",
				detail:
					"Income tax is generally deducted at source and adjusted based on your household declaration.",
			},
			{
				title: "Local taxes and changes",
				detail:
					"Primary-residence housing tax has largely been removed, but property owners may still owe other taxes.",
			},
			{
				title: "Spain-Gabon tax convention",
				detail:
					"The bilateral convention helps avoid double taxation for eligible cross-border income situations.",
			},
		],
		tips: [
			"File on time every year to avoid penalties",
			"Keep tax notices for major administrative procedures",
			"Ask tax offices for support if your situation is complex",
			"Report family and income changes quickly to update your rate",
		],
		links: [
			{
				label: "Agencia Tributaria",
				url: "https://www.agenciatributaria.gob.es",
				description: "Official tax portal",
			},
			{
				label: "Simulateur d'impôt",
				url: "https://www.agenciatributaria.gob.es/AEAT.sede/Inicio/Procedimientos_Simuladores.shtml",
				description: "Income tax simulation tools",
			},
		],
	},
	{
		id: "discriminations",
		icon: ShieldAlert,
		title: "Discrimination & Legal Remedies",
		color: "text-amber-600 dark:text-amber-400",
		iconBg: "bg-amber-500/10",
		gradientFrom: "from-amber-500/5",
		gradientTo: "to-amber-600/10",
		intro:
			"Spanish law prohibits discrimination in housing, work and public services. Knowing your remedies helps protect your rights.",
		items: [
			{
				title: "What counts as discrimination",
				detail:
					"Protected criteria include origin, nationality, religion, gender, disability and other legally defined factors.",
			},
			{
				title: "Housing discrimination",
				detail:
					"Refusals based on origin or identity markers are illegal. Keep evidence and contact competent organizations quickly.",
			},
			{
				title: "Workplace discrimination",
				detail:
					"Hiring, promotion and dismissal decisions cannot lawfully rely on discriminatory criteria.",
			},
			{
				title: "Identity checks",
				detail:
					"You must carry valid documents, but discriminatory checks can be challenged through formal complaint channels.",
			},
			{
				title: "Available remedies",
				detail:
					"You can contact the Defender of Rights, file a police/prosecutor complaint and request legal aid if eligible.",
			},
		],
		tips: [
			"Keep written proof and screenshots when incidents occur",
			"Use the Defender of Rights online channels early",
			"Seek medical and legal documentation after violent incidents",
			"Request consular orientation when needed",
		],
		links: [
			{
				label: "Defensor del Pueblo",
				url: "https://www.defensordelpueblo.es",
				description: "Free anti-discrimination remedy",
			},
			{
				label: "SOS Racisme",
				url: "https://www.sosracismo.eu",
				description: "Legal assistance against racism",
			},
			{
				label: "LICRA",
				url: "https://www.movimientocontralaintolerancia.com",
				description: "Anti-racism advocacy organization",
			},
		],
	},
];

// ─── Page ────────────────────────────────────────────────────────────────────

function VieEnSpainPage() {
	const { t, i18n } = useTranslation();
	const { isSectionHidden } = useSectionVisibility("/vie-en-espagne");
	const lang = i18n.resolvedLanguage || i18n.language;
	const isEn = lang.startsWith("en");
	const tSections = isEn ? guideSectionsEn : guideSections;
	const [activeSection, setActiveSection] = useState(tSections[0].id);

	const scrollToSection = (id: string) => {
		setActiveSection(id);
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: "smooth", block: "start" });
		}
	};

	return (
		<div className="min-h-screen bg-background">
			{/* Hero Section */}
			<PageHero image="/images/heroes/hero-vie-france.png">
				<Badge
					variant="secondary"
					className="mb-4 bg-primary/10 text-primary border-primary/20"
				>
					<BookOpen className="w-3.5 h-3.5 mr-1.5" />
					<EditableText
						contentKey="vieSpain.hero.badge"
						defaultValue={t("vieSpain.badge", "Guide Pratique")}
						pagePath="/vie-en-espagne"
						sectionId="hero"
						as="span"
					/>
				</Badge>
				<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
					<EditableText
						contentKey="vieSpain.hero.title"
						defaultValue={t("vieSpain.title", "Vivre en Espagne")}
						pagePath="/vie-en-espagne"
						sectionId="hero"
						as="span"
					/>{" "}
					<EditableText
						contentKey="vieSpain.hero.titleHighlight"
						defaultValue={t("vieSpain.titleHighlight", "en toute sérénité")}
						pagePath="/vie-en-espagne"
						sectionId="hero"
						as="span"
						className="text-gradient"
					/>
				</h1>
				<EditableText
					contentKey="vieSpain.hero.description"
					defaultValue={t(
						"vieSpain.subtitle",
						"Toutes les informations essentielles pour votre installation et votre vie quotidienne en Espagne. L'Ambassade vous accompagne dans chaque étape.",
					)}
					pagePath="/vie-en-espagne"
					sectionId="hero"
					as="p"
					className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed"
				/>

				{/* Quick Stats */}
				<div className="flex flex-wrap justify-center gap-6 text-sm">
					<div className="flex items-center gap-2 text-foreground/80">
						<BookOpen className="w-5 h-5 text-primary" />
						<span className="font-medium">
							{t("vieSpain.stats.themes", "6 rubriques thématiques")}
						</span>
					</div>
					<div className="flex items-center gap-2 text-foreground/80">
						<CheckCircle2 className="w-5 h-5 text-emerald-500" />
						<span className="font-medium">
							{t("vieSpain.stats.procedures", "50+ démarches détaillées")}
						</span>
					</div>
					<div className="flex items-center gap-2 text-foreground/80">
						<ExternalLink className="w-5 h-5 text-blue-500" />
						<span className="font-medium">
							{t("vieSpain.stats.links", "Liens officiels vérifiés")}
						</span>
					</div>
				</div>
			</PageHero>

			{/* Mobile Section Navigation */}
			<div className="lg:hidden sticky top-16 z-40 bg-background/80 backdrop-blur-md border-b border-border/50 px-4 py-3">
				<div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
					{tSections.map((section) => {
						const Icon = section.icon;
						return (
							<button
								type="button"
								key={section.id}
								onClick={() => scrollToSection(section.id)}
								className={`shrink-0 flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium transition-all ${
									activeSection === section.id
										? "bg-primary/10 text-primary border border-primary/20"
										: "bg-muted/50 text-muted-foreground border border-transparent"
								}`}
							>
								<Icon className="w-3.5 h-3.5" />
								{section.title}
							</button>
						);
					})}
				</div>
			</div>

			{/* Main Content */}
			<section className="py-8 md:py-12 px-6">
				<div className="max-w-7xl mx-auto">
					<div className="flex gap-8">
						{/* Sidebar Navigation (Desktop) */}
						<div className="w-64 shrink-0 hidden lg:block">
							<SectionNav
								sections={tSections}
								activeSection={activeSection}
								onSelect={scrollToSection}
							/>
						</div>

						{/* Content */}
						<div className="flex-1 space-y-8">
							{tSections.map((section) => (
								<GuideSectionCard key={section.id} section={section} />
							))}
						</div>
					</div>
				</div>
			</section>

			{/* Emergency Numbers Card */}
			<section className="py-12 px-6">
				<div className="max-w-4xl mx-auto">
					<div className="glass-card border-red-500/20 bg-red-500/5 rounded-2xl overflow-hidden">
						<div className="p-6 md:p-8">
							<div className="flex items-center gap-3 mb-6">
								<div className="p-2.5 rounded-xl bg-red-500/10">
									<Shield className="w-6 h-6 text-red-500" />
								</div>
								<div>
									<h3 className="text-lg font-bold text-foreground">
										{t("vieSpain.emergency.title", "Numéros d'urgence")}
									</h3>
									<p className="text-sm text-muted-foreground">
										{t(
											"vieSpain.emergency.subtitle",
											"À conserver dans votre téléphone",
										)}
									</p>
								</div>
							</div>

							<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
								{[
									{
										number: "112",
										label: t(
											"vieSpain.emergency.samu",
											"112 — Urgences générales (médicales, police, pompiers)",
										),
									},
									{
										number: "091",
										label: t("vieSpain.emergency.police", "Policía Nacional"),
									},
									{
										number: "080",
										label: t("vieSpain.emergency.pompiers", "Bomberos"),
									},
									{
										number: "061",
										label: t(
											"vieSpain.emergency.european",
											"Urgences médicales (SAMUR/061)",
										),
									},
									{
										number: "092",
										label: t(
											"vieSpain.emergency.sms",
											"Policía Local / Municipal",
										),
									},
									{
										number: "+34 91 XXX XX XX",
										label: t(
											"vieSpain.emergency.consulat",
											"Urgence consulaire Gabon 24h/24",
										),
									},
								].map((item) => (
									<div
										key={item.number}
										className="flex items-center gap-3 p-3 rounded-xl bg-background/50 border border-border/60 hover:bg-background/80 transition-colors"
									>
										<Phone className="w-4 h-4 text-red-500 shrink-0" />
										<div>
											<p className="font-bold text-foreground text-sm">
												{item.number}
											</p>
											<p className="text-xs text-muted-foreground">
												{item.label}
											</p>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>

			{!isSectionHidden("citizen-cta") && (
				<CitizenCTA
					pagePath="/vie-en-espagne"
					sectionId="citizen-cta"
					contentKeyPrefix="vieSpain.citizenCta"
				/>
			)}
		</div>
	);
}
