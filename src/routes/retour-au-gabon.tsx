import { createFileRoute } from "@tanstack/react-router";
import {
	AlertOctagon,
	AlertTriangle,
	BookOpen,
	Briefcase,
	FileText,
	GraduationCap,
	HandCoins,
	Heart,
	Home,
	PackageCheck,
	Phone,
	Shield,
	Stethoscope,
	Users,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import {
	type ErreurItem,
	ErreursCourantesGrid,
	type GuideSection,
	GuideSectionCard,
	NumerosUtilesGrid,
	type NumeroUtile,
} from "@/components/guides";
import { CitizenCTA } from "@/components/home/CitizenCTA";
import { EditableText } from "@/components/inline-edit/EditableText";
import { PageHero } from "@/components/PageHero";
import { Badge } from "@/components/ui/badge";
import { useSectionVisibility } from "@/hooks/useSectionVisibility";
import i18n from "@/integrations/i18n/i18n";

export const Route = createFileRoute("/retour-au-gabon")({
	component: RetourAuGabonPage,
	head: () => {
		const isEn = (i18n.resolvedLanguage || i18n.language).startsWith("en");
		return {
			meta: [
				{
					title: isEn
						? "Returning to Gabon — Complete Guide | Embassy of Gabon in Spain"
						: "Retour au Gabon — Guide Complet | Ambassade du Gabon en Espagne",
				},
				{
					name: "description",
					content: isEn
						? "Complete guide to prepare your return to Gabon: consular procedures, moving logistics, resettlement, employment, Orden de Expulsión support and continuity of acquired rights."
						: "Guide complet pour préparer votre retour au Gabon : démarches consulaires, déménagement, réinstallation, emploi, Orden de Expulsión, aides et maintien de vos droits acquis en Espagne.",
				},
			],
		};
	},
});

// ─── Data : Guide Sections ──────────────────────────────────────────────────
const guideSections: GuideSection[] = [
	{
		id: "preparation",
		icon: FileText,
		title: "Préparer son retour",
		color: "text-blue-600 dark:text-blue-400",
		iconBg: "bg-blue-500/10",
		image: "/images/guide-droits.png",
		intro:
			"Un retour au Gabon se prépare idéalement 6 à 12 mois à l'avance. Voici les démarches administratives et consulaires à anticiper pour un retour serein.",
		items: [
			{
				title: "Démarches consulaires",
				detail:
					"Rendez-vous au Ambassade du Gabon en Espagne pour : renouveler votre passeport gabonais (si périmé), obtenir un certificat de nationalité, faire transcrire les actes d'état civil (naissances, mariages en Espagne), et signaler votre retour définitif. Prévoyez un délai de 2 à 4 semaines pour chaque procédure.",
			},
			{
				title: "Clôture des engagements en Espagne",
				detail:
					"Résiliez vos contrats : bail (préavis selon le type de location), assurance habitation, abonnements (Iberdrola/Endesa, téléphone, internet, Netflix, etc.). Faites votre dernière déclaration d'impôts auprès de l'Agencia Tributaria et demandez un certificado de estar al corriente si vous êtes entrepreneur. Informez Correos pour le suivi de courrier (réexpédition disponible).",
			},
			{
				title: "Transfert de dossier médical",
				detail:
					"Demandez votre dossier médical complet à votre médecin traitant (droit garanti par la loi). Récupérez vos radiographies, analyses et ordonnances. Vérifiez la disponibilité de vos traitements au Gabon et constituez un stock de médicaments pour 3 à 6 mois si nécessaire. Demandez des prescriptions en DCI (Dénomination Commune Internationale) pour faciliter les équivalences.",
			},
			{
				title: "Documents à rassembler",
				detail:
					"Préparez et conservez des copies numériques de : passeports (anciens et actuels), actes d'état civil (naissance, mariage, divorce), diplômes (avec apostille), contrats de travail et bulletins de salaire (nóminas), relevés de retraite (seg-social.es), attestations SEPE, permis de conduire international, Tarjeta Sanitaria et attestations de la Seguridad Social.",
			},
			{
				title: "Permis de conduire",
				detail:
					"Si vous avez un permis espagnol, demandez un permis de conduire international à la Oficina de Extranjería (gratuit, valable 3 ans, demande sur sede.dgt.gob.es). Au Gabon, vous devrez échanger votre permis espagnol contre un permis gabonais dans les 12 mois suivant votre installation. Conservez une copie du permis espagnol.",
			},
			{
				title: "Comptes bancaires et finances",
				detail:
					"NE FERMEZ PAS immédiatement votre compte bancaire espagnol — conservez-le au moins 6 mois après le retour pour : les virements de droits résiduels (retraite, chômage), les prélèvements en cours, et les transferts d'argent. Ouvrez un compte au Gabon (BGFI, Orabank, UGB) avant ou dès votre arrivée. Comparez les frais de transfert : Wise, WorldRemit, Orange Money.",
			},
		],
		tips: [
			"Commencez les démarches 6 à 12 mois avant le retour prévu",
			"Faites apostiller vos diplômes espagnols via le Ministerio de Justicia — c'est indispensable pour leur reconnaissance au Gabon",
			"Conservez votre numéro de Seguridad Social et vos identifiants sur seg-social.es — ils peuvent être utiles pour les droits acquis",
			"Informez les Servicios Sociales, la Seguridad Social et le SEPE de votre départ définitif pour éviter les trop-perçus",
			"Créez un dossier numérique (Google Drive, Dropbox) avec TOUS vos documents scannés",
		],
		links: [
			{
				label: "DGT",
				url: "https://sede.dgt.gob.es",
				description: "Permis de conduire international en ligne",
			},
			{
				label: "Seguridad Social",
				url: "https://www.seg-social.es/wps/portal/wss/internet/Trabajadores/PrestacionesPensionesTrabajadores/Jubilacion",
				description: "Relevé de carrière et droits à la retraite",
			},
			{
				label: "Correos — Réexpédition",
				url: "https://www.correos.es/es/es/atencion-al-cliente/reenvio-de-correspondencia",
				description: "Réexpédition du courrier après le départ",
			},
		],
	},
	{
		id: "demenagement",
		icon: PackageCheck,
		title: "Déménagement",
		color: "text-orange-600 dark:text-orange-400",
		iconBg: "bg-orange-500/10",

		intro:
			"Le transport de vos effets personnels et biens vers le Gabon nécessite une organisation rigoureuse. Comparez les options et anticipez les formalités douanières.",
		items: [
			{
				title: "Fret maritime (le plus économique)",
				detail:
					"Le fret maritime est l'option la plus rentable pour les volumes importants. Transit : 6 à 12 semaines depuis l'Espagne vers le port d'Owendo (Libreville). Obtenez au moins 3 devis auprès de transitaires spécialisés Afrique (AGS, Bolloré Logistics, Mediterranean Shipping). Comptez 2 000 € à 5 000 € pour un conteneur 20 pieds. Exigez une assurance transport couvrant la casse, la perte et le vol.",
			},
			{
				title: "Fret aérien (rapide mais coûteux)",
				detail:
					"Le fret aérien est adapté aux petits volumes urgents (documents, vêtements, objets de valeur). Délai : 3 à 7 jours. Coût : environ 5 à 10 €/kg. Transporteurs : Iberia Cargo, DHL, FedEx. N'envoyez pas de liquides ni de batteries lithium par avion.",
			},
			{
				title: "Franchise douanière",
				detail:
					"Les Gabonais de retour bénéficient d'une franchise douanière sur les effets personnels et le mobilier usagé sous conditions strictes : résidence à l'étranger > 2 ans, retour définitif justifié. Documents requis : attestation consulaire de retour, inventaire détaillé des biens, factures d'achat. Renseignez-vous auprès de la Direction Générale des Douanes du Gabon AVANT expédition.",
			},
			{
				title: "Véhicule",
				detail:
					"L'importation d'un véhicule au Gabon est soumise à des droits de douane (20 à 30% de la valeur) et à une restriction d'âge (véhicules de moins de 5 ans en général). Faites le calcul complet : droits de douane + transport maritime + assurance + mise en conformité. Il est souvent plus avantageux de vendre en Espagne et d'acheter sur place.",
			},
			{
				title: "Inventaire détaillé",
				detail:
					"Établissez un inventaire précis de TOUS les biens expédiés avec : description de chaque article, photos, valeur estimée. Ce document est exigé par les douanes gabonaises et par l'assurance en cas de litige. Conservez toutes les factures d'achat. L'inventaire doit être signé et daté.",
			},
		],
		tips: [
			"Comparez au moins 3 devis de transitaires — les prix varient considérablement",
			"Envoyez vos biens 2 à 3 mois avant votre départ pour qu'ils arrivent à temps",
			"Prévoyez un budget douane même avec la franchise — certains articles peuvent être taxés",
			"N'expédiez pas de produits interdits (armes, contrefaçons, certains médicaments sans ordonnance)",
			"Faites des photos de tous vos biens DANS le conteneur avant la fermeture",
		],
		links: [
			{
				label: "Douanes Gabon",
				url: "https://www.douanes.ga",
				description: "Direction Générale des Douanes du Gabon",
			},
		],
	},
	{
		id: "reinstallation",
		icon: Home,
		title: "Réinstallation au Gabon",
		color: "text-green-600 dark:text-green-400",
		iconBg: "bg-green-500/10",
		image: "/images/guide-logement.png",
		intro:
			"Se réinstaller au Gabon après plusieurs années en Espagne nécessite une période d'adaptation. Voici comment faciliter votre transition dans tous les aspects du quotidien.",
		items: [
			{
				title: "Logement à Libreville",
				detail:
					'Le marché locatif à Libreville est actif mais les prix varient fortement selon les quartiers. Quartiers résidentiels : Batterie IV, Charbonnages, Glass, Akébé-Plaine. Budget moyen : 250 000 à 500 000 FCFA/mois pour un appartement correct (800 000+ pour une villa). Utilisez les groupes Facebook locaux ("Immobilier Libreville"), les agences (GIMMO, Immobilier du Gabon) et le bouche-à-oreille. Visitez TOUJOURS avant de signer.',
			},
			{
				title: "Scolarisation des enfants",
				detail:
					"Inscrivez vos enfants dans les établissements gabonais (publics gratuits, privés payants) ou dans le réseau AEFE (français) si souhaité. L'inscription au lycée Blaise Pascal de Libreville se fait en ligne via l'AEFE — anticipez les délais (dossier dès mars pour la rentrée de septembre). Il existe aussi le Colegio Español de Libreville pour continuer un cursus en espagnol. Frais de scolarité AEFE : environ 2 000 000 à 3 500 000 FCFA/an.",
			},
			{
				title: "Vie quotidienne et adaptation",
				detail:
					'Le retour peut provoquer un "choc culturel inversé". Acceptez une période d\'adaptation de 3 à 6 mois. Les habitudes, les rythmes de travail et les codes sociaux diffèrent. Rejoignez les associations de Gabonais de retour pour partager votre expérience. Les supermarchés locaux (Casino, Prix Import, Géant Ckdo) proposent des produits importés.',
			},
			{
				title: "Banque et finances",
				detail:
					"Ouvrez un compte bancaire local (BGFI Bank, Orabank, UGB). Documents : pièce d'identité, justificatif de domicile, photo. Conservez votre compte espagnol pour les transferts et le maintien de vos droits. Mobile money (Airtel Money, Mobicash) est très utilisé au quotidien. Le coût de la vie à Libreville peut être étonnamment élevé pour certains produits importés.",
			},
			{
				title: "Télécommunications",
				detail:
					"Opérateurs mobiles : Airtel Gabon, Libertis (Gabon Telecom). Forfaits internet : fibre disponible dans certains quartiers de Libreville (50 000+ FCFA/mois). L'internet mobile 4G est la solution la plus courante. Récupérez un numéro local dès votre arrivée.",
			},
		],
		tips: [
			"Visitez les quartiers et le logement en personne avant de signer un bail",
			"Gardez votre compte bancaire espagnol ouvert pour faciliter les transferts pendant au moins 6 mois",
			"Inscrivez-vous au registre des Gabonais de retour auprès du ministère des Affaires étrangères",
			"Rejoignez les associations de Gabonais de retour pour bénéficier de conseils et d'un réseau de solidarité",
			"Prévoyez un budget de transition pour 3 à 6 mois — le retour a un coût",
		],
		links: [
			{
				label: "Lycée Blaise Pascal",
				url: "https://lfbp-libreville.net",
				description: "Lycée français de Libreville (AEFE)",
			},
			{
				label: "BGFI Bank",
				url: "https://www.bgfi.com",
				description: "Première banque d'Afrique Centrale",
			},
		],
	},
	{
		id: "emploi",
		icon: Briefcase,
		title: "Emploi & Entrepreneuriat",
		color: "text-purple-600 dark:text-purple-400",
		iconBg: "bg-purple-500/10",
		image: "/images/guide-emploi.png",
		intro:
			"Votre expérience et vos compétences acquises en Espagne sont un atout majeur sur le marché gabonais. Voici comment valoriser votre parcours et saisir les opportunités.",
		items: [
			{
				title: "Marché de l'emploi au Gabon",
				detail:
					"Secteurs porteurs : pétrole & mines (Total, Perenco, Comilog), BTP (infrastructure publique), nouvelles technologies (e-commerce, fintech), finance & banque, santé, éducation, hôtellerie/tourisme, économie verte. Les profils formés en Espagne sont recherchés pour leur expertise technique et leur bilinguisme. Consultez les offres : ONE (Office National de l'Emploi), Emploi.ga, LinkedIn, Bayt Gabon.",
			},
			{
				title: "Entrepreneuriat — Création d'entreprise",
				detail:
					"Le Gabon encourage l'entrepreneuriat via l'ANPI (Agence Nationale de Promotion des Investissements). Création d'entreprise possible en quelques jours au guichet unique. Secteurs porteurs pour les entrepreneurs de retour : agro-alimentaire (transformation locale), services numériques, logistique, tourisme vert, conseil aux entreprises. Le statut d'auto-entrepreneur existe aussi au Gabon.",
			},
			{
				title: "Reconnaissance des diplômes",
				detail:
					"Vos diplômes espagnols doivent être légalisés pour être reconnus au Gabon. Procédure : 1) Apostille via le Ministerio de Justicia espagnol (délai de 2 à 4 semaines). 2) Légalisation au ministère gabonais de l'Éducation Nationale. Prévoyez 1 à 3 mois de délai total. ⚠️ Faites cette démarche AVANT votre départ d'Espagne.",
			},
			{
				title: "Réseaux professionnels",
				detail:
					"Rejoignez la Cámara de Comercio Hispano-Gabonesa, le Club des Gabonais de retour, la CGPME Gabon, et participez aux salons professionnels (PROMOTE, Forum Emploi Gabon, SIEE). Le networking est ESSENTIEL au Gabon — la recommandation personnelle est souvent plus efficace qu'une candidature en ligne.",
			},
			{
				title: "Avantages fiscaux pour les investisseurs",
				detail:
					"Le Code des Investissements gabonais prévoit des exonérations fiscales pour les entreprises nouvellement créées : exonération de TVA sur les équipements importés, réduction d'impôt sur les bénéfices pendant 3 à 5 ans (selon la zone), facilités d'importation du matériel professionnel. Renseignez-vous auprès de l'ANPI pour votre projet spécifique.",
			},
		],
		tips: [
			"Faites reconnaître vos diplômes AVANT votre retour — les délais sont longs au Gabon",
			"Le bilinguisme espagnol-français est un atout majeur dans les entreprises internationales au Gabon",
			"Renseignez-vous sur les exonérations fiscales pour les entreprises nouvellement créées auprès de l'ANPI",
			"Consultez l'ICEX pour les opportunités d'affaires Espagne-Gabon",
			"Le réseau personnel est crucial — activez vos contacts avant même d'arriver",
		],
		links: [
			{
				label: "ANPI Gabon",
				url: "https://www.anpi.ga",
				description: "Agence Nationale de Promotion des Investissements",
			},
			{
				label: "ONE Gabon",
				url: "https://one.ga",
				description: "Office National de l'Emploi",
			},
			{
				label: "ICEX España",
				url: "https://www.icex.es",
				description: "Opportunités d'affaires Espagne-Gabon",
			},
		],
	},
	{
		id: "droits",
		icon: Shield,
		title: "Maintien des droits acquis",
		color: "text-teal-600 dark:text-teal-400",
		iconBg: "bg-teal-500/10",
		intro:
			"Quitter l'Espagne ne signifie pas perdre tous vos droits. Certains droits sociaux, de retraite et de protection sont maintenus ou transférables grâce aux conventions bilatérales. Anticipez les démarches.",
		items: [
			{
				title: "Retraite espagnole",
				detail:
					"Vos cotisations en Espagne sont acquises DÉFINITIVEMENT. La convention bilatérale Espagne-Gabon permet de cumuler les périodes travaillées dans les deux pays pour le calcul de votre retraite. Demandez un relevé de carrière (informe de vida laboral) sur seg-social.es AVANT votre départ. Vous pourrez percevoir votre retraite espagnole depuis le Gabon par virement bancaire.",
			},
			{
				title: "Droits à l'assurance chômage",
				detail:
					"En cas de retour définitif, vous perdez vos droits à l'allocation chômage espagnole. Cependant, si vous revenez en Espagne ultérieurement, vos droits résiduels peuvent être réactivés sous conditions (dans les 3 ans suivant votre dernier pointage). Renseignez-vous auprès de SEPE AVANT de partir. Demandez une attestation de droits.",
			},
			{
				title: "Sécurité sociale (Convenio Especial)",
				detail:
					"Le Convenio Especial de la Seguridad Social permet de conserver une couverture maladie espagnole depuis l'étranger. Adhésion volontaire, cotisations selon vos revenus. Alternative locale : la CNAMGS (Caisse Nationale d'Assurance Maladie et de Garantie Sociale) au Gabon. ⚠️ Le Convenio Especial est surtout utile si vous prévoyez des soins en Espagne ou un retour ultérieur.",
			},
			{
				title: "Fiscalité du départ",
				detail:
					"L'année de votre départ, vous devez effectuer votre déclaration de la Renta et informer l'Agencia Tributaria de votre changement de résidence fiscale. Vous restez imposable en Espagne sur vos revenus de SOURCE espagnole uniquement (revenus locatifs, retraite espagnole). Convention fiscale Espagne-Gabon : évite la double imposition.",
			},
			{
				title: "Droits civiques et consulaires",
				detail:
					"En tant que Gabonais au Gabon, vous retrouvez vos pleins droits civiques gabonais. Si vous avez la nationalité espagnole, vous pouvez voter aux élections espagnoles depuis le Gabon (inscription sur les listes consulaires à l'Ambassade d'Espagne à Libreville). Inscrivez-vous à l'Ambassade d'Espagne à Libreville pour maintenir votre protection consulaire espagnole.",
			},
		],
		tips: [
			"Demandez votre informe de vida laboral AVANT de quitter l'Espagne",
			"La convention Espagne-Gabon évite la double imposition — renseignez-vous sur les modalités",
			"Conservez votre numéro de Seguridad Social espagnol — il reste actif à vie",
			"Inscrivez-vous à l'Ambassade d'Espagne à Libreville si vous avez la nationalité espagnole",
			"Conservez vos nóminas et attestations — elles sont irremplaçables",
		],
		links: [
			{
				label: "Seguridad Social",
				url: "https://www.seg-social.es/wps/portal/wss/internet/Trabajadores/PrestacionesPensionesTrabajadores/Jubilacion",
				description: "Relevé de carrière et droits retraite",
			},
			{
				label: "Convenio Especial",
				url: "https://www.seg-social.es/wps/portal/wss/internet/InformacionUtil/44539/45958",
				description: "Couverture maladie depuis l'étranger",
			},
			{
				label: "Agencia Tributaria",
				url: "https://www.agenciatributaria.gob.es",
				description: "Déclaration de revenus et départ d'Espagne",
			},
		],
	},
	{
		id: "sante-gabon",
		icon: Stethoscope,
		title: "Santé & Bien-être au Gabon",
		color: "text-red-600 dark:text-red-400",
		iconBg: "bg-red-500/10",
		intro:
			"La transition sanitaire est un aspect important du retour. Le système de santé gabonais est en développement et présente des différences importantes avec le système espagnol.",
		items: [
			{
				title: "Système de santé gabonais",
				detail:
					"Le CHU de Libreville est le principal hôpital public. Les cliniques privées (El Rapha, Chambrier, La Peyrie) offrent des soins de meilleure qualité mais à des tarifs plus élevés. Pour les soins spécialisés non disponibles au Gabon, une évacuation sanitaire vers l'Espagne ou le Maroc peut être nécessaire. L'inscription à la CNAMGS est obligatoire pour bénéficier de la couverture maladie nationale.",
			},
			{
				title: "Couverture santé",
				detail:
					"Options : la CNAMGS (couverture nationale, obligatoire pour les salariés), le Convenio Especial (maintien de la couverture espagnole, volontaire), ou une assurance santé internationale privée (Allianz, AXA, BUPA). Pour les premiers mois, cumulez le Convenio Especial et la CNAMGS pour une couverture optimale. Prévoyez un budget santé conséquent les premiers mois.",
			},
			{
				title: "Vaccinations",
				detail:
					"Vérifiez vos vaccins avant le retour : fièvre jaune (obligatoire, certificat international exigé), hépatites A et B, typhoïde, méningite. Le paludisme est endémique au Gabon — prenez les précautions nécessaires : moustiquaire imprégnée, répulsifs, consultation rapide en cas de fièvre. Emportez une trousse de premiers soins et un traitement antipaludéen d'urgence.",
			},
			{
				title: "Médicaments et traitements",
				detail:
					"Certains médicaments disponibles en Espagne ne le sont pas au Gabon. Emportez un stock de 3 à 6 mois pour les traitements chroniques. Demandez des prescriptions en DCI (nom générique international) pour faciliter les équivalences. Les pharmacies de Libreville sont bien approvisionnées pour les médicaments courants.",
			},
			{
				title: "Bien-être et adaptation psychologique",
				detail: `Le retour au pays peut générer un "choc culturel inversé" : décalage avec les habitudes locales, nostalgie de l'Espagne, difficulté à retrouver ses repères. Ce phénomène est normal et temporaire (3 à 6 mois). Ne restez pas isolé — rejoignez les communautés de retournants. Si nécessaire, consultez un professionnel de santé mentale.`,
			},
		],
		tips: [
			"Souscrivez une assurance santé internationale pour les premiers mois — la transition prend du temps",
			"Emportez vos ordonnances espagnoles traduites en DCI pour faciliter les équivalences",
			"Vérifiez votre carnet de vaccination AVANT le départ — la fièvre jaune est obligatoire",
			"Constituez un stock de médicaments pour 3 à 6 mois pour vos traitements chroniques",
		],
		links: [
			{
				label: "CNAMGS",
				url: "https://www.cnamgs.com",
				description: "Caisse Nationale d'Assurance Maladie du Gabon",
			},
			{
				label: "Convenio Especial",
				url: "https://www.seg-social.es/wps/portal/wss/internet/InformacionUtil/44539/45958",
				description: "Maintien de la couverture maladie espagnole",
			},
			{
				label: "Institut Pasteur — Vaccins",
				url: "https://www.pasteur.fr/fr/centre-medical/preparer-son-voyage",
				description: "Recommandations vaccinales par pays",
			},
		],
	},
	{
		id: "oqtf-retour",
		icon: AlertOctagon,
		title: "Orden de Expulsión & Retour contraint",
		color: "text-rose-600 dark:text-rose-400",
		iconBg: "bg-rose-500/10",

		intro:
			"Si vous êtes sous Orden de Expulsión (Obligation de Quitter le Territoire Espagnol), l'Ambassade vous accompagne dans cette épreuve. Connaître vos droits et préparer votre retour dignement est essentiel.",
		items: [
			{
				title: "Comprendre votre situation",
				detail:
					"Une Orden de Expulsión ne signifie pas que votre vie s'arrête. C'est une décision administrative qui peut être contestée. Deux cas de figure : 1) Retour volontaire dans le délai de 30 jours — vous conservez le droit de revenir en Espagne ultérieurement avec un nouveau visa. 2) Retour forcé après expiration du délai — une interdiction de retour (IRTF) de 1 à 3 ans peut être prononcée. ⚠️ Le retour volontaire est TOUJOURS préférable au retour forcé.",
			},
			{
				title: "Vos droits avant le départ",
				detail:
					"Même sous Orden de Expulsión, vous conservez des droits fondamentaux : le droit de contester la décision (recours au Tribunal Contencioso-Administrativo), le droit à la protection consulaire (contactez l'Ambassade), le droit aux soins médicaux urgents, le droit de scolariser vos enfants jusqu'au départ effectif. Aucune administration ne peut vous refuser ces droits.",
			},
			{
				title: "Rôle du Ambassade",
				detail:
					"L'Ambassade peut : 1) Vous orienter vers un avocat spécialisé en droit des étrangers. 2) Vous aider à constituer votre dossier de régularisation le cas échéant. 3) Délivrer un laissez-passer consulaire pour le retour. 4) Vous mettre en contact avec les services d'aide au retour de l'Oficina de Extranjería. 5) Faciliter votre réinstallation au Gabon via le réseau consulaire. L'Ambassade ne peut PAS s'opposer juridiquement à l'Orden de Expulsión.",
			},
			{
				title: "Aide au retour volontaire (Oficina de Extranjería)",
				detail:
					"L'Oficina de Extranjería propose une aide financière au retour volontaire : billet d'avion pris en charge, allocation de réinstallation (jusqu'à 1 000 € par adulte, 500 € par enfant), aide à la création d'entreprise au Gabon (jusqu'à 5 000 €), accompagnement social et administratif. Conditions : accepter le retour volontaire, ne pas avoir bénéficié d'une aide au retour dans les 5 dernières années.",
			},
			{
				title: "Préparer le retour contraint",
				detail:
					"Si le retour est inévitable : 1) Sécurisez vos économies (transférez sur un compte au Gabon). 2) Récupérez votre dossier médical et vos ordonnances. 3) Faites apostiller vos diplômes et transcrire vos actes d'état civil à l'Ambassade. 4) Informez votre famille au Gabon. 5) Emportez tous vos documents originaux (passeport, diplômes, bulletins de salaire, relevé de carrière retraite). 6) Contactez les associations de retournants au Gabon.",
			},
			{
				title: "Vie après le retour — Rebondir",
				detail:
					"Un retour sous Orden de Expulsión n'est pas une fin. Votre expérience en Espagne (études, travail, compétences linguistiques) est un atout au Gabon. Les secteurs numériques, éducatifs et de services valorisent les profils internationaux. L'ANPI accompagne les Gabonais de la diaspora dans la création d'entreprise. Des programmes d'aide à la réinsertion existent via l'Oficina de Extranjería et les associations locales.",
			},
			{
				title: "Revenir en Espagne après une Orden de Expulsión",
				detail:
					"Le retour volontaire dans le délai préserve votre droit de redemander un visa. Si une IRTF a été prononcée, vous devez attendre la fin de la période d'interdiction (1 à 3 ans). Après l'expiration de l'IRTF, vous pouvez déposer une nouvelle demande de visa à l'Ambassade d'Espagne à Libreville. Un dossier solide (motif de voyage, ressources, garanties de retour) augmentera vos chances.",
			},
		],
		tips: [
			"Le retour VOLONTAIRE dans le délai de 30 jours est TOUJOURS préférable — il préserve vos droits futurs",
			"Contactez l'Ambassade DÈS la réception de l'Orden de Expulsión pour un accompagnement",
			"L'aide de l'Oficina de Extranjería peut atteindre 5 000 € pour un projet de création d'entreprise au Gabon",
			"Conservez TOUS vos documents espagnols — ils sont votre capital pour la suite au Gabon",
			"Ne restez pas isolé — les associations de retournants offrent un soutien moral et pratique",
		],
		links: [
			{
				label: "Programa de Retorno Voluntario",
				url: "https://extranjeros.inclusion.gob.es/es/Retorno_voluntario",
				description: "Programme d'aide au retour volontaire",
			},
			{
				label: "CEAR (ONG de ayuda)",
				url: "https://www.cear.es",
				description: "Accompagnement juridique gratuit",
			},
			{
				label: "ANPI Gabon",
				url: "https://www.anpi.ga",
				description: "Aide à la création d'entreprise au Gabon",
			},
			{
				label: "Defensor del Pueblo",
				url: "https://www.defensordelpueblo.es",
				description: "Recours en cas de litige avec l'administration",
			},
		],
	},
];

// ─── Additional data ─────────────────────────────────────────────────────────

const aides: { icon: typeof HandCoins; title: string; detail: string }[] = [
	{
		icon: HandCoins,
		title: "Aide au retour volontaire (Oficina de Extranjería)",
		detail:
			"L'Oficina de Extranjería propose une aide financière au retour volontaire incluant : billet d'avion, allocation de réinstallation (jusqu'à 1 000€/adulte), aide à la création d'entreprise (jusqu'à 5 000€), et accompagnement social et administratif.",
	},
	{
		icon: GraduationCap,
		title: "Programmes ANPI",
		detail:
			"L'Agence Nationale de Promotion des Investissements facilite l'installation des Gabonais de la diaspora : accompagnement dans la création d'entreprise, avantages fiscaux, mise en réseau avec les acteurs économiques locaux.",
	},
	{
		icon: Users,
		title: "Associations de la diaspora",
		detail:
			"Les associations comme le collectif des Gabonais de retour offrent un réseau de solidarité, des conseils pratiques sur la réinstallation et un soutien moral pour faciliter la réintégration dans le pays.",
	},
];

const erreurs: ErreurItem[] = [
	{
		erreur: "Partir sans faire apostiller ses diplômes",
		conseil:
			"Faites apostiller tous vos diplômes via le Ministerio de Justicia AVANT votre départ. Les délais sont de 2 à 4 semaines.",
	},
	{
		erreur: "Ne pas informer les administrations espagnoles",
		conseil:
			"Prévenez la Seguridad Social, le SEPE, l'Agencia Tributaria et les Servicios Sociales de votre départ définitif. Vous éviterez les trop-perçus et les pénalités.",
	},
	{
		erreur: "Fermer son compte bancaire espagnol trop tôt",
		conseil:
			"Gardez votre compte ouvert pendant au moins 6 mois après le retour pour les virements en cours et les droits résiduels (retraite, chômage).",
	},
	{
		erreur: "Ne pas transcrire les actes d'état civil",
		conseil:
			"Les naissances et mariages en Espagne doivent être transcrits à l'Ambassade AVANT le retour. Les démarches sont plus complexes depuis le Gabon.",
	},
	{
		erreur: "Sous-estimer les frais de réinstallation",
		conseil:
			"Prévoyez un budget conséquent pour les 3 à 6 premiers mois : logement, transport, santé, alimentation. Le coût de la vie à Libreville est élevé.",
	},
	{
		erreur: "Ignorer la franchise douanière",
		conseil:
			"Renseignez-vous auprès des douanes gabonaises AVANT d'expédier vos biens. Les conditions d'exonération sont strictes et les contrôles systématiques.",
	},
	{
		erreur: "Ne pas prendre de stock de médicaments",
		conseil:
			"Certains médicaments disponibles en Espagne sont introuvables au Gabon. Emportez un stock de 3 à 6 mois pour vos traitements chroniques.",
	},
];

const numerosUtiles: NumeroUtile[] = [
	{
		label: "Ambassadeur du Gabon à Madrid",
		number: "C. de Silva, 2, 28013 Madrid",
		color: "bg-emerald-500/10 text-emerald-600",
	},
	{
		label: "Email Ambassade du Gabon",
		number: "contact@ambassadegabon.es",
		color: "bg-emerald-500/10 text-emerald-600",
	},
	{
		label: "Urgence consulaire Gabon",
		number: "+34 91 XXX XX XX",
		color: "bg-green-500/10 text-green-600",
	},
	{
		label: "Oficina de Extranjería (Aide au retour)",
		number: "+34 900 150 000",
		color: "bg-blue-500/10 text-blue-600",
	},
	{
		label: "Douanes du Gabon",
		number: "+241 01 72 13 26",
		color: "bg-orange-500/10 text-orange-600",
	},
	{
		label: "ANPI Gabon",
		number: "+241 01 79 52 52",
		color: "bg-purple-500/10 text-purple-600",
	},
	{
		label: "ONE (Emploi Gabon)",
		number: "+241 01 76 01 11",
		color: "bg-indigo-500/10 text-indigo-600",
	},
	{
		label: "Ambassade d'Espagne à Libreville",
		number: "+241 01 79 70 00",
		color: "bg-red-500/10 text-red-600",
	},
	{
		label: "CNAMGS (Santé Gabon)",
		number: "+241 01 76 26 52",
		color: "bg-pink-500/10 text-pink-600",
	},
];

const guideSectionsEn: GuideSection[] = [
	{
		id: "preparation",
		icon: FileText,
		title: "Preparing Your Return",
		color: "text-blue-600 dark:text-blue-400",
		iconBg: "bg-blue-500/10",
		image: "/images/guide-droits.png",
		intro:
			"A return to Gabon is easier when planned early. Build your timeline 6 to 12 months in advance.",
		items: [
			{
				title: "Consular procedures",
				detail:
					"Update passports, civil records and essential consular files before departure to avoid delays after arrival.",
			},
			{
				title: "Closing obligations in Spain",
				detail:
					"Terminate housing and utility contracts, notify institutions, and keep proof of closure for every account.",
			},
			{
				title: "Medical record transfer",
				detail:
					"Request complete medical history, prescriptions and key reports before leaving Spain.",
			},
			{
				title: "Core document pack",
				detail:
					"Prepare identity, civil status, diploma, employment and retirement documents in both paper and secure digital copies.",
			},
			{
				title: "Banking transition",
				detail:
					"Keep your Spanish account active for a transition period while opening local banking services in Gabon.",
			},
		],
		tips: [
			"Start preparations at least 6 months before departure",
			"Digitize all documents and keep cloud backups",
			"Inform Seguridad Social, SEPE and Agencia Tributaria",
			"Do not close your Spanish bank account immediately",
		],
		links: [
			{
				label: "DGT",
				url: "https://sede.dgt.gob.es",
				description: "Spanish driving license and identity procedures",
			},
			{
				label: "Seguridad Social",
				url: "https://www.seg-social.es/wps/portal/wss/internet/Trabajadores/PrestacionesPensionesTrabajadores/Jubilacion",
				description: "Career statement and pension rights",
			},
			{
				label: "Correos — Forwarding",
				url: "https://www.correos.es/es/es/atencion-al-cliente/reenvio-de-correspondencia",
				description: "Mail forwarding service",
			},
		],
	},
	{
		id: "demenagement",
		icon: PackageCheck,
		title: "Moving Logistics",
		color: "text-orange-600 dark:text-orange-400",
		iconBg: "bg-orange-500/10",
		intro:
			"Shipping personal belongings requires cost comparisons, insurance and customs planning.",
		items: [
			{
				title: "Sea freight",
				detail:
					"Best option for larger volumes. Compare multiple quotations and verify transit timelines and insurance conditions.",
			},
			{
				title: "Air freight",
				detail:
					"Faster but more expensive; reserve for urgent and limited items.",
			},
			{
				title: "Customs exemptions",
				detail:
					"Returnees may benefit from exemptions under conditions. Confirm requirements before shipment.",
			},
			{
				title: "Vehicle import",
				detail:
					"Evaluate total import cost and compliance rules before deciding to ship a vehicle.",
			},
			{
				title: "Detailed inventory",
				detail:
					"Maintain a signed and dated inventory with estimated values and photos for customs and insurance.",
			},
		],
		tips: [
			"Request at least 3 transport quotes",
			"Ship early to avoid arrival gaps",
			"Check restricted goods lists before packing",
			"Photograph contents before container sealing",
		],
		links: [
			{
				label: "Douanes Gabon",
				url: "https://www.douanes.ga",
				description: "Gabon customs information",
			},
		],
	},
	{
		id: "reinstallation",
		icon: Home,
		title: "Resettlement in Gabon",
		color: "text-green-600 dark:text-green-400",
		iconBg: "bg-green-500/10",
		image: "/images/guide-logement.png",
		intro:
			"Returning home often requires practical and psychological adjustment. Plan housing, schools and daily services early.",
		items: [
			{
				title: "Housing in Libreville",
				detail:
					"Visit neighborhoods in person, compare rent levels and verify lease terms before signing.",
			},
			{
				title: "School enrollment",
				detail:
					"Public, private and AEFE options exist. Gather records early to secure placement deadlines.",
			},
			{
				title: "Daily adaptation",
				detail:
					"A reverse culture shock is common. Build support through trusted local and returnee networks.",
			},
			{
				title: "Banking and payments",
				detail:
					"Open local accounts and keep cross-border transfer options available during transition.",
			},
			{
				title: "Telecom and internet",
				detail:
					"Activate local mobile and connectivity services quickly to maintain admin and family communication.",
			},
		],
		tips: [
			"Plan a 3-to-6 month transition budget",
			"Inspect housing personally before commitment",
			"Use returnee associations for practical onboarding",
			"Maintain temporary financial redundancy during transition",
		],
		links: [
			{
				label: "Lycée Blaise Pascal",
				url: "https://lfbp-libreville.net",
				description: "French school network in Libreville (AEFE)",
			},
			{
				label: "BGFI Bank",
				url: "https://www.bgfi.com",
				description: "Regional banking services",
			},
		],
	},
	{
		id: "emploi",
		icon: Briefcase,
		title: "Employment & Entrepreneurship",
		color: "text-purple-600 dark:text-purple-400",
		iconBg: "bg-purple-500/10",
		image: "/images/guide-emploi.png",
		intro:
			"Skills acquired in Spain can be a strong advantage on the Gabonese market when positioned correctly.",
		items: [
			{
				title: "Job market overview",
				detail:
					"Priority sectors include energy, infrastructure, finance, digital services, health and education.",
			},
			{
				title: "Business creation",
				detail:
					"ANPI pathways and local support structures can accelerate project setup and compliance.",
			},
			{
				title: "Diploma recognition",
				detail:
					"Handle apostille/legalization procedures before departure whenever possible.",
			},
			{
				title: "Professional networking",
				detail:
					"Local networks and business communities are key for faster reintegration.",
			},
			{
				title: "Investment incentives",
				detail:
					"Depending on project and location, tax and import incentives may apply.",
			},
		],
		tips: [
			"Prepare credential recognition before leaving Spain",
			"Map your target sectors and contacts in advance",
			"Use ANPI and chamber resources for structured support",
			"Activate professional networks before arrival",
		],
		links: [
			{
				label: "ANPI Gabon",
				url: "https://www.anpi.ga",
				description: "Investment and business support agency",
			},
			{
				label: "ONE Gabon",
				url: "https://one.ga",
				description: "National employment office",
			},
			{
				label: "ICEX España",
				url: "https://www.icex.es",
				description: "Spain-Gabon business opportunities",
			},
		],
	},
	{
		id: "droits",
		icon: Shield,
		title: "Preserving Acquired Rights",
		color: "text-teal-600 dark:text-teal-400",
		iconBg: "bg-teal-500/10",
		intro:
			"Leaving Spain does not erase all rights. Retirement, taxation and healthcare continuity require proactive steps.",
		items: [
			{
				title: "Spanish pension rights",
				detail:
					"Contributed periods remain acquired. Request updated career records before departure.",
			},
			{
				title: "Unemployment rights transition",
				detail:
					"Rules change after definitive departure; request formal attestations before leaving.",
			},
			{
				title: "Healthcare continuity options",
				detail:
					"Assess CNAMGS, CFE and private coverage combinations for your profile.",
			},
			{
				title: "Tax departure obligations",
				detail:
					"Departure year may require dual declaration periods and source-income clarification.",
			},
			{
				title: "Consular and civic registrations",
				detail:
					"Update registrations based on your nationality profile and place of residence.",
			},
		],
		tips: [
			"Request pension records before departure",
			"Keep salary and employment certificates safely archived",
			"Clarify cross-border tax status early",
			"Maintain access credentials for key Spanish portals",
		],
		links: [
			{
				label: "Seguridad Social",
				url: "https://www.seg-social.es/wps/portal/wss/internet/Trabajadores/PrestacionesPensionesTrabajadores/Jubilacion",
				description: "Pension rights and records",
			},
			{
				label: "Convenio Especial",
				url: "https://www.seg-social.es/wps/portal/wss/internet/InformacionUtil/44539/45958",
				description: "Healthcare continuity abroad",
			},
			{
				label: "Agencia Tributaria",
				url: "https://www.agenciatributaria.gob.es",
				description: "Tax declarations and departure guidance",
			},
		],
	},
	{
		id: "sante-gabon",
		icon: Stethoscope,
		title: "Health & Well-Being in Gabon",
		color: "text-red-600 dark:text-red-400",
		iconBg: "bg-red-500/10",
		intro:
			"Healthcare organization differs from Spain. Prepare coverage, medications and preventive care before returning.",
		items: [
			{
				title: "Healthcare system overview",
				detail:
					"Combine public and private care options depending on availability and urgency.",
			},
			{
				title: "Coverage strategy",
				detail:
					"Evaluate CNAMGS, CFE and private international plans based on your risk profile.",
			},
			{
				title: "Vaccination and prevention",
				detail:
					"Update required vaccines and malaria prevention before travel.",
			},
			{
				title: "Medication continuity",
				detail:
					"Bring a transition stock of chronic treatment and generic-name prescriptions.",
			},
			{
				title: "Psychological adjustment",
				detail:
					"Reverse culture shock is common; seek support networks and professional help if needed.",
			},
		],
		tips: [
			"Plan health coverage before the move date",
			"Carry international generic prescriptions",
			"Verify yellow-fever and other vaccine requirements",
			"Prepare a 3-to-6 month treatment stock when possible",
		],
		links: [
			{
				label: "CNAMGS",
				url: "https://www.cnamgs.com",
				description: "National health insurance in Gabon",
			},
			{
				label: "Convenio Especial",
				url: "https://www.seg-social.es/wps/portal/wss/internet/InformacionUtil/44539/45958",
				description: "Spanish coverage continuity abroad",
			},
			{
				label: "Institut Pasteur — Vaccins",
				url: "https://www.pasteur.fr/fr/centre-medical/preparer-son-voyage",
				description: "Travel vaccine recommendations",
			},
		],
	},
	{
		id: "oqtf-retour",
		icon: AlertOctagon,
		title: "Orden de Expulsión & Forced Return",
		color: "text-rose-600 dark:text-rose-400",
		iconBg: "bg-rose-500/10",
		intro:
			"If you face an Orden de Expulsión, act quickly. Legal timelines and return choices strongly affect your long-term options.",
		items: [
			{
				title: "Understanding your case",
				detail:
					"Voluntary and forced return scenarios have different legal consequences and future visa impact.",
			},
			{
				title: "Rights before departure",
				detail:
					"Even with Orden de Expulsión, core rights remain, including legal challenge and consular support.",
			},
			{
				title: "Role of the Embassy",
				detail:
					"The Embassy can orient you, help organize documents and coordinate return assistance channels.",
			},
			{
				title: "Oficina de Extranjería voluntary return aid",
				detail:
					"Oficina de Extranjería may support travel, reintegration and project-based assistance under eligibility rules.",
			},
			{
				title: "Rebuilding after return",
				detail:
					"International skills remain valuable for reintegration and entrepreneurship in Gabon.",
			},
		],
		tips: [
			"Voluntary return is generally less damaging for future mobility",
			"Contact legal counsel and the Embassy immediately",
			"Preserve all documents related to your stay and appeals",
			"Use reintegration programs to structure your next steps",
		],
		links: [
			{
				label: "Programa de Retorno Voluntario",
				url: "https://extranjeros.inclusion.gob.es/es/Retorno_voluntario",
				description: "Voluntary return assistance",
			},
			{
				label: "CEAR (ONG de ayuda)",
				url: "https://www.cear.es",
				description: "Free legal support",
			},
			{
				label: "ANPI Gabon",
				url: "https://www.anpi.ga",
				description: "Entrepreneurship support in Gabon",
			},
			{
				label: "Defensor del Pueblo",
				url: "https://www.defensordelpueblo.es",
				description: "Rights defense and complaints",
			},
		],
	},
];

const aidesEn: { icon: typeof HandCoins; title: string; detail: string }[] = [
	{
		icon: HandCoins,
		title: "Oficina de Extranjería voluntary return aid",
		detail:
			"Depending on eligibility, Oficina de Extranjería may provide travel support, reintegration allowance and project assistance.",
	},
	{
		icon: GraduationCap,
		title: "ANPI support programmes",
		detail:
			"ANPI can help returnees structure business projects, identify incentives and connect to local ecosystems.",
	},
	{
		icon: Users,
		title: "Diaspora and returnee networks",
		detail:
			"Community organizations provide practical guidance, peer support and local orientation during reintegration.",
	},
];

const erreursEn: ErreurItem[] = [
	{
		erreur: "Leaving without apostille/legalization for diplomas",
		conseil: "Complete recognition steps before departure whenever possible.",
	},
	{
		erreur: "Not notifying Spanish administrations",
		conseil:
			"Inform Seguridad Social, SEPE and Agencia Tributaria to avoid overpayments and penalties.",
	},
	{
		erreur: "Closing your Spanish bank account too early",
		conseil:
			"Keep it active during transition for pending payments and rights settlements.",
	},
	{
		erreur: "Skipping civil-record transcription",
		conseil:
			"Handle key civil acts before departure to simplify procedures after return.",
	},
	{
		erreur: "Underestimating resettlement costs",
		conseil:
			"Budget at least several months for housing, health and transportation adjustments.",
	},
	{
		erreur: "Ignoring customs requirements",
		conseil:
			"Validate exemption rules and required documents before shipping belongings.",
	},
	{
		erreur: "Returning without medication continuity",
		conseil:
			"Bring a transition stock and prescriptions for chronic treatments.",
	},
];

const numerosUtilesEn: NumeroUtile[] = [
	{
		label: "Consul General of Gabon in Madrid",
		number: "C. de Silva, 2, 28013 Madrid",
		color: "bg-emerald-500/10 text-emerald-600",
	},
	{
		label: "Gabon Embassy Email",
		number: "contact@ambassadegabon.es",
		color: "bg-emerald-500/10 text-emerald-600",
	},
	{
		label: "Gabon Consular Emergency",
		number: "+34 91 XXX XX XX",
		color: "bg-green-500/10 text-green-600",
	},
	{
		label: "Oficina de Extranjería (Return aid)",
		number: "+34 900 150 000",
		color: "bg-blue-500/10 text-blue-600",
	},
	{
		label: "Gabon Customs",
		number: "+241 01 72 13 26",
		color: "bg-orange-500/10 text-orange-600",
	},
	{
		label: "ANPI Gabon",
		number: "+241 01 79 52 52",
		color: "bg-purple-500/10 text-purple-600",
	},
	{
		label: "ONE (Employment Gabon)",
		number: "+241 01 76 01 11",
		color: "bg-indigo-500/10 text-indigo-600",
	},
	{
		label: "Spanish Embassy in Libreville",
		number: "+241 01 79 70 00",
		color: "bg-red-500/10 text-red-600",
	},
	{
		label: "CNAMGS (Health Gabon)",
		number: "+241 01 76 26 52",
		color: "bg-pink-500/10 text-pink-600",
	},
];

// ─── Main Page Component ─────────────────────────────────────────────────────

function RetourAuGabonPage() {
	const { t, i18n } = useTranslation();
	const { isSectionHidden } = useSectionVisibility("/retour-au-gabon");
	const lang = i18n.resolvedLanguage || i18n.language;
	const isEn = lang.startsWith("en");
	const tSections = isEn ? guideSectionsEn : guideSections;
	const tErreurs = isEn ? erreursEn : erreurs;
	const tNumeros = isEn ? numerosUtilesEn : numerosUtiles;
	const tAides = isEn ? aidesEn : aides;

	return (
		<div className="min-h-screen bg-background flex flex-col">
			<div className="flex-1">
				{/* ── Hero ────────────────────────────────────────────────────────── */}
				<PageHero image="/images/heroes/hero-consulat.png">
					<Badge className="mb-4 bg-primary/10 text-primary border-primary/20 backdrop-blur-sm">
						<BookOpen className="w-3.5 h-3.5 mr-1.5" />
						<EditableText
							contentKey="retourGabon.hero.badge"
							defaultValue={t("retourGabon.badge", "Guide de retour")}
							pagePath="/retour-au-gabon"
							sectionId="hero"
							as="span"
						/>
					</Badge>

					<h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4">
						<EditableText
							contentKey="retourGabon.hero.title"
							defaultValue={t("retourGabon.heroTitle", "Retour au Gabon")}
							pagePath="/retour-au-gabon"
							sectionId="hero"
							as="span"
						/>{" "}
						<EditableText
							contentKey="retourGabon.hero.titleHighlight"
							defaultValue={t("retourGabon.heroHighlight", "— Bien préparer")}
							pagePath="/retour-au-gabon"
							sectionId="hero"
							as="span"
							className="text-gradient"
						/>
					</h1>

					<EditableText
						contentKey="retourGabon.hero.description"
						defaultValue={t(
							"retourGabon.heroDescription",
							"Guide complet pour les Gabonais rentrant au pays : démarches consulaires, déménagement, réinstallation, emploi, Orden de Expulsión, aides et maintien de vos droits acquis en Espagne.",
						)}
						pagePath="/retour-au-gabon"
						sectionId="hero"
						as="p"
						className="text-base text-muted-foreground mb-6 max-w-2xl leading-relaxed"
					/>

					<div className="flex flex-wrap gap-2">
						{tSections.map((s) => {
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

				{/* ── Guides thématiques ──────────────────────────────────────────── */}
				<section className="py-16 px-6 bg-background">
					<div className="max-w-4xl mx-auto">
						<div className="text-center mb-12">
							<Badge variant="outline" className="mb-4">
								<FileText className="w-3.5 h-3.5 mr-1.5" />
								<EditableText
									contentKey="retourGabon.steps.badge"
									defaultValue={t(
										"retourGabon.steps.badge",
										"Étapes du retour",
									)}
									pagePath="/retour-au-gabon"
									sectionId="steps"
									as="span"
								/>
							</Badge>
							<h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
								<EditableText
									contentKey="retourGabon.steps.title"
									defaultValue={t(
										"retourGabon.steps.title",
										"Préparez chaque étape",
									)}
									pagePath="/retour-au-gabon"
									sectionId="steps"
									as="span"
								/>
							</h2>
							<EditableText
								contentKey="retourGabon.steps.description"
								defaultValue={t(
									"retourGabon.steps.description",
									"Du premier jour de préparation à votre réinstallation, chaque étape est détaillée avec des conseils pratiques et des liens utiles.",
								)}
								pagePath="/retour-au-gabon"
								sectionId="steps"
								as="p"
								className="text-muted-foreground max-w-2xl mx-auto"
							/>
						</div>

						<div className="space-y-8">
							{tSections.map((section) => (
								<GuideSectionCard key={section.id} section={section} />
							))}
						</div>
					</div>
				</section>

				{/* ── Aides disponibles ───────────────────────────────────────────── */}
				<section className="py-16 px-6 bg-muted/20">
					<div className="max-w-5xl mx-auto">
						<div className="text-center mb-12">
							<Badge variant="outline" className="mb-4 bg-background/50">
								<Heart className="w-3.5 h-3.5 mr-1.5" />
								<EditableText
									contentKey="retourGabon.aides.badge"
									defaultValue={t(
										"retourGabon.aides.badge",
										"Aides & Accompagnement",
									)}
									pagePath="/retour-au-gabon"
									sectionId="aides"
									as="span"
								/>
							</Badge>
							<h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
								<EditableText
									contentKey="retourGabon.aides.title"
									defaultValue={t(
										"retourGabon.aides.title",
										"Des aides pour votre retour",
									)}
									pagePath="/retour-au-gabon"
									sectionId="aides"
									as="span"
								/>
							</h2>
							<EditableText
								contentKey="retourGabon.aides.description"
								defaultValue={t(
									"retourGabon.aides.description",
									"Plusieurs dispositifs existent pour faciliter votre réintégration au Gabon.",
								)}
								pagePath="/retour-au-gabon"
								sectionId="aides"
								as="p"
								className="text-muted-foreground max-w-2xl mx-auto"
							/>
						</div>

						<div className="grid md:grid-cols-3 gap-8">
							{tAides.map((aide, idx) => {
								const Icon = aide.icon;
								return (
									<div
										key={aide.title}
										className="glass-card rounded-2xl p-6 hover:-translate-y-2 transition-all duration-300"
									>
										<div className="p-3 rounded-xl bg-primary/10 w-fit mb-4">
											<Icon className="w-6 h-6 text-primary" />
										</div>
										<h3 className="font-bold text-lg text-foreground mb-2">
											{aide.title}
										</h3>
										<p className="text-sm text-muted-foreground leading-relaxed">
											{aide.detail}
										</p>
									</div>
								);
							})}
						</div>
					</div>
				</section>

				{/* ── Erreurs courantes ───────────────────────────────────────────── */}
				<section className="py-16 px-6 bg-background">
					<div className="max-w-5xl mx-auto">
						<div className="text-center mb-12">
							<Badge className="mb-4 bg-orange-500/10 text-orange-600 border-orange-200 dark:border-orange-800">
								<AlertTriangle className="w-3.5 h-3.5 mr-1.5" />
								<EditableText
									contentKey="retourGabon.erreurs.badge"
									defaultValue={t(
										"retourGabon.erreurs.badge",
										"Erreurs à éviter",
									)}
									pagePath="/retour-au-gabon"
									sectionId="erreurs"
									as="span"
								/>
							</Badge>
							<h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
								<EditableText
									contentKey="retourGabon.erreurs.title"
									defaultValue={t(
										"retourGabon.erreurs.title",
										"Ne commettez pas ces erreurs",
									)}
									pagePath="/retour-au-gabon"
									sectionId="erreurs"
									as="span"
								/>
							</h2>
							<EditableText
								contentKey="retourGabon.erreurs.description"
								defaultValue={t(
									"retourGabon.erreurs.description",
									"Ces oublis peuvent compliquer votre retour. Anticipez-les pour partir sereinement.",
								)}
								pagePath="/retour-au-gabon"
								sectionId="erreurs"
								as="p"
								className="text-muted-foreground max-w-2xl mx-auto"
							/>
						</div>

						<ErreursCourantesGrid items={tErreurs} />
					</div>
				</section>

				{/* ── Numéros utiles ──────────────────────────────────────────────── */}
				<section className="py-16 px-6 bg-muted/20">
					<div className="max-w-5xl mx-auto">
						<div className="text-center mb-12">
							<Badge variant="outline" className="mb-4 bg-background/50">
								<Phone className="w-3.5 h-3.5 mr-1.5" />
								<EditableText
									contentKey="retourGabon.numeros.badge"
									defaultValue={t(
										"retourGabon.numeros.badge",
										"Contacts essentiels",
									)}
									pagePath="/retour-au-gabon"
									sectionId="numeros"
									as="span"
								/>
							</Badge>
							<h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
								<EditableText
									contentKey="retourGabon.numeros.title"
									defaultValue={t(
										"retourGabon.numeros.title",
										"Numéros utiles",
									)}
									pagePath="/retour-au-gabon"
									sectionId="numeros"
									as="span"
								/>
							</h2>
							<EditableText
								contentKey="retourGabon.numeros.description"
								defaultValue={t(
									"retourGabon.numeros.description",
									"À conserver pour votre retour au Gabon.",
								)}
								pagePath="/retour-au-gabon"
								sectionId="numeros"
								as="p"
								className="text-muted-foreground max-w-2xl mx-auto"
							/>
						</div>

						<NumerosUtilesGrid items={tNumeros} />
					</div>
				</section>

				{!isSectionHidden("citizen-cta") && (
					<CitizenCTA
						pagePath="/retour-au-gabon"
						sectionId="citizen-cta"
						contentKeyPrefix="retourGabon.citizenCta"
					/>
				)}
			</div>
		</div>
	);
}
