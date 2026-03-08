import { createFileRoute, Link } from "@tanstack/react-router";
import {
	AlertOctagon,
	AlertTriangle,
	ArrowRight,
	BookOpen,
	ClipboardList,
	CreditCard,
	Flag,
	HandHeart,
	HeartHandshake,
	Landmark,
	Phone,
	Plane,
	Scale,
	Shield,
	ShieldCheck,
	Siren,
	Train,
	UserCheck,
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
	SavoirVivreGrid,
	type SavoirVivreItem,
} from "@/components/guides";
import { CitizenCTA } from "@/components/home/CitizenCTA";
import { EditableText } from "@/components/inline-edit/EditableText";
import { PageHero } from "@/components/PageHero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSectionVisibility } from "@/hooks/useSectionVisibility";
import i18n from "@/integrations/i18n/i18n";

export const Route = createFileRoute("/venir-en-espagne")({
	component: VenirEnEspagnePage,
	head: () => {
		const isEn = (i18n.resolvedLanguage || i18n.language).startsWith("en");
		return {
			meta: [
				{
					title: isEn
						? "Coming to Spain — Complete Guide | Embassy of Gabon"
						: "Venir en Espagne — Guide Complet | Ambassade du Gabon",
				},
				{
					name: "description",
					content: isEn
						? "Complete guide for Gabonese nationals coming to Spain: admission, visa, integration, administrative steps, cultural norms and residency rights."
						: "Guide complet pour les Gabonais venant en Espagne : admission, visa, intégration, démarches administratives, codes culturels et droits de séjour.",
				},
			],
		};
	},
});

// ─── Data : Guide Sections ──────────────────────────────────────────────────
const guideSections: GuideSection[] = [
	{
		id: "admission",
		icon: Plane,
		title: "Admission en Espagne",
		color: "text-cyan-600 dark:text-cyan-400",
		iconBg: "bg-cyan-500/10",
		image: "/images/guide-droits.png",
		intro:
			"Avant de voyager, assurez-vous de disposer de tous les documents requis à la frontière. Le visa ne garantit pas automatiquement l`entrée sur le territoire espagnol.",
		items: [
			{
				title: "Types de visas pour l'Espagne",
				detail:
					"Il existe deux grandes catégories. Le visa Schengen (type C) : tourisme, visite familiale, affaires — valable 90 jours sur 180 jours. Le visa national (type D) : études, travail, regroupement familial — valable plus de 90 jours. Le visa étudiant (Visado de Estudios) permet de poursuivre des études en Espagne. Le visa de travail (Visado de Trabajo) est requis pour tout emploi salarié ou non-salarié.",
			},
			{
				title: "Documents obligatoires à la frontière",
				detail:
					"Vous devez présenter à la Policía Nacional : un passeport en cours de validité (valable au minimum 3 mois après la date de retour prévue), un visa en cours de validité, une attestation d`hébergement (attestation d'hébergement ou contrat de location OU réservation d'hôtel), un billet d'avion retour (obligatoire pour court séjour), une assurance voyage couvrant les frais médicaux (minimum 30 000 €), et des justificatifs de ressources financières.",
			},
			{
				title:
					"Lettre d'invitation (Carta de Invitación) — Procédure détaillée",
				detail:
					"Si vous êtes hébergé par un particulier en Espagne, celui-ci doit demander une Carta de Invitación auprès du commissariat de la Policía Nacional de son lieu de résidence. Documents requis pour l'hébergeant : pièce d'identité, justificatif de domicile, preuve de propriété ou contrat de location. L'attestation est soumise au paiement de taxes (tasas d'environ 80 €) et doit être envoyée en original au visiteur. Sans cette attestation, le visa court séjour peut être refusé.",
			},
			{
				title: "Justificatifs de ressources financières",
				detail:
					"Montants minimum exigés : 120 €/jour si vous êtes hébergé à l'hôtel, ou 32,50 €/jour si vous êtes hébergé par un particulier disposant d'une attestation d'hébergement. Justificatifs acceptés : relevés bancaires des 3 derniers mois, attestation de bourse, lettre de prise en charge d'un garant avec justificatifs de revenus. ⚠️ Ces montants sont vérifiés à la frontière.",
			},
			{
				title: "Refus d'entrée : vos droits",
				detail:
					"La Policía Nacional peut refuser l'entrée même avec un visa valide si les justificatifs sont insuffisants. En cas de refus : 1) Vous recevez une notification écrite motivée. 2) Vous pouvez contacter l'Ambassade du Gabon (droit garanti par la Convention de Vienne, art. 36). 3) Un recours est possible devant le Juzgado de lo Contencioso-Administrativo. 4) Vous pouvez être maintenu en zone d'attente (sala de inadmitidos). Conservez TOUS les documents remis par la Policía Nacional.",
			},
			{
				title: "Premières démarches à l'arrivée (Empadronamiento et TIE)",
				detail:
					"Si vous avez un visa national (type D) de plus de 6 mois, vous devez OBLIGATOIREMENT demander votre carte d'identité d'étranger (TIE) dans le mois suivant votre arrivée. Étapes : 1) Inscrivez-vous à la mairie de votre domicile (Empadronamiento). 2) Prenez rendez-vous (Cita Previa) en ligne sur la plateforme des Administraciones Públicas pour la prise d'empreintes. 3) Payez la taxe correspondante (Tasa 790 código 012, environ 16 €). 4) Présentez-vous au rendez-vous. ⚠️ Le non-respect de ce délai peut entraîner des complications pour votre séjour.",
			},
		],
		tips: [
			"Imprimez TOUS vos documents de voyage en double exemplaire — ne comptez jamais uniquement sur les versions numériques",
			"Arrivez à la frontière avec vos justificatifs de ressources, hébergement et assurance facilement accessibles dans un seul dossier",
			"L'Empadronamiento est votre justificatif de domicile officiel en Espagne — c'est la première étape OBLIGATOIRE avant toute autre démarche",
			"Conservez une copie de votre visa et de votre passeport dans un cloud sécurisé (Google Drive, iCloud)",
			"Validez votre visa national (type D) dès votre arrivée — ne pas attendre le dernier moment des 3 mois",
		],
		links: [
			{
				label: "Sede Electrónica - Extranjería",
				url: "https://sede.administracionespublicas.gob.es/procedimientos/index/categoria/34",
				description: "Prise de rendez-vous (Cita Previa) et démarches",
			},
			{
				label: "Visas pour l'Espagne",
				url: "https://www.exteriores.gob.es/Consulados/libreville/es/ServiciosConsulares/Paginas/index.aspx",
				description: "Ambassade d'Espagne au Gabon",
			},
			{
				label: "Ministerio de Inclusión",
				url: "https://www.inclusion.gob.es/",
				description: "Informations officielles sur l'immigration",
			},
		],
	},
	{
		id: "etudiants",
		icon: UserCheck,
		title: "Vie étudiante",
		color: "text-indigo-600 dark:text-indigo-400",
		iconBg: "bg-indigo-500/10",
		image: "/images/guide-education.png",
		intro:
			"Les étudiants gabonais en Espagne bénéficient de droits spécifiques : droit au travail, carte pluriannuelle, et Autorisation Provisoire de Séjour après le diplôme. Voici tout ce qu`il faut savoir.",
		items: [
			{
				title: "Visa étudiant et Admission (UNEDasiss)",
				detail: `L'admission dans les universités espagnoles se fait souvent via le portail UNEDasiss pour la reconnaissance des baccalauréats étrangers, ou directement auprès de l'université (surtout pour les Masters et écoles privées). Étapes : 1) Inscription et admission par un établissement reconnu. 2) Dépôt de la demande de visa étudiant à l'Ambassade d'Espagne à Libreville avec la lettre d'admission. Le visa étudiant est valable 1 an et renouvelable.`,
			},
			{
				title: "Bourses et aides financières étudiantes",
				detail:
					"Bourses de l'État gabonais : via l'ANBG (Agence Nationale des Bourses du Gabon). Bourses espagnoles : Becas MEC (Ministère de l'Éducation) sous conditions de revenus et de réussite académique. Bourses d'excellence : Fondation Carolina, Erasmus+, bourses des Communautés Autonomes. Il n'existe pas d'équivalent au CROUS ou à la CAF en Espagne pour l'aide au logement étudiant.",
			},
			{
				title: "Droit au travail étudiant (30h / semaine)",
				detail:
					"Avec un visa et une TIE d'étudiant valides, vous êtes autorisé à travailler jusqu'à 30 heures par semaine (emploi à temps partiel), à condition que cela n'interfère pas avec vos études. Les stages conventionnés (Prácticas) font l'objet d'accords avec l'université et peuvent être rémunérés ou non, mais doivent désormais être cotisés à la Seguridad Social.",
			},
			{
				title: "Carte pluriannuelle et ressources minimum",
				detail:
					"Après la 1ère année, vous pouvez obtenir une carte de séjour pluriannuelle (2 à 4 ans). Conditions : assiduité et progression des études, ressources suffisantes (615 €/mois minimum). Justificatifs acceptés : compte bancaire, attestation de bourse, lettre de garant. La carte pluriannuelle simplifie vos démarches et vous évite le renouvellement annuel.",
			},
			{
				title: "Residencia para búsqueda de empleo (Diplômés supérieurs)",
				detail:
					"Après l'obtention d'un diplôme de l'enseignement supérieur (Grado, Master, Doctorat) en Espagne, vous pouvez demander une autorisation de séjour pour recherche d'emploi (Residencia para búsqueda de empleo) valable 12 mois, non renouvelable. Elle permet de chercher un emploi ou créer une entreprise en lien avec le diplôme. Attention : elle n'autorise pas à travailler, il faudra changer de statut une fois l'emploi trouvé.",
			},
			{
				title: "Changement de statut (Modificación) : étudiant → salarié",
				detail:
					"Conditions : avoir terminé ses études ou être en recherche d'emploi (depuis la Residencia para búsqueda de empleo). L'employeur doit vous fournir un contrat de travail et initier la demande d'autorisation de travail auprès de la Oficina de Extranjería de la province. La demande prend souvent plusieurs mois. ⚠️ Ne travaillez pas avant l'approbation de l'autorisation de travail.",
			},
			{
				title: "Logement étudiant (Colegios Mayores et Colocation)",
				detail:
					"En Espagne, les universités disposent de 'Colegios Mayores' ou de résidences universitaires, mais ils sont souvent assez chers. La colocation (compartir piso) est le mode de logement étudiant le plus répandu (recherche via Idealista, Badi ou Fotocasa). Les garants étrangers sont rarement acceptés, on vous demandera souvent plusieurs mois de caution ou un paiement anticipé.",
			},
		],
		tips: [
			"La Residencia para búsqueda de empleo dure 12 mois — demandez-la 60 jours AVANT ou 90 jours APRÈS l'expiration de la TIE étudiant",
			"Respectez scrupuleusement la limite de 30 heures par semaine pour le travail étudiant",
			"Le changement de statut étudiant → salarié nécessite un contrat ou une promesse d'embauche",
			"Conservez vos diplômes, relevés de notes et attestations — ils seront exigés pour le changement de statut",
			"Privilégiez les 'Comedores Universitarios' (cantines universitaires) pour des repas complets à prix réduit",
		],
		links: [
			{
				label: "SEPIE - Étudier en Espagne",
				url: "http://sepie.es/internacionalizacion/study-in-spain.html",
				description: "Portail officiel pour les étudiants internationaux",
			},
			{
				label: "UNEDasiss",
				url: "https://unedasiss.uned.es/home",
				description: "Accès à l'université pour étudiants étrangers",
			},
			{
				label: "Becas MEC",
				url: "https://www.educacionfpydeportes.gob.es/servicios-al-ciudadano/catalogo/estudiantes/becas-ayudas/para-estudiar.html",
				description: "Bourses du Ministère de l'Éducation",
			},
		],
	},
	{
		id: "demarches",
		icon: ClipboardList,
		title: "Démarches administratives",
		color: "text-sky-600 dark:text-sky-400",
		iconBg: "bg-sky-500/10",
		image: "/images/guide-emploi.png",
		intro:
			"Toutes les démarches administratives liées à votre arrivée et votre séjour en Espagne : carte de séjour, validation visa national (type D), changement de statut, perte de documents. Anticipez chaque étape.",
		items: [
			{
				title: "Première carte de séjour (TIE) — Extranjería et Police",
				detail:
					"À votre arrivée avec un visa de long séjour, vous devez demander la Tarjeta de Identidad de Extranjero (TIE). Étapes : 1) Obtenez votre Empadronamiento (mairie). 2) Prenez rendez-vous (Cita Previa) au commissariat de police ou Oficina de Extranjería. 3) Payez la taxe correspondante (Tasa 790-012, environ 16 €). 4) Déposez votre dossier (formulaire EX-17, passeport, Empadronamiento, photo) et prenez vos empreintes. ⚠️ Le 'resguardo' (récépissé) de prise d'empreintes ne permet pas toujours de voyager hors d'Espagne sans une 'Autorización de regreso'.",
			},
			{
				title: "Renouvellement de carte de séjour (Renovación)",
				detail:
					"Anticipez : vous pouvez déposer votre demande de renouvellement 60 jours avant l'expiration de votre TIE et jusqu'à 90 jours après (avec pénalité possible). La demande se fait en ligne via la plateforme Mercurio avec un certificat numérique (Certificado Digital). Une fois approuvée, vous devrez prendre un nouveau rendez-vous pour la prise d'empreintes de la nouvelle carte.",
			},
			{
				title: "Residencia para búsqueda de empleo",
				detail:
					"Cette résidence de 12 mois est destinée aux diplômés de l'enseignement supérieur (Grado, Master, Doctorat). Elle permet de chercher un emploi ou créer une entreprise. Demande à déposer via la plateforme d'Extranjería, accompagnée de votre diplôme et d'une preuve d'assurance maladie.",
			},
			{
				title: "Changement de statut : étudiant → salarié",
				detail:
					"Conditions : vous devez justifier de l'obtention de votre diplôme, et un employeur espagnol doit vous faire un contrat respectant les conditions légales. La procédure de 'Modificación' est initiée par l'employeur auprès de la Oficina de Extranjería. L'instruction peut prendre de 1 à 3 mois. ⚠️ Ne commencez pas à travailler avant l'accord (Resolución favorable).",
			},
			{
				title: "Résidence des mineurs et TIE",
				detail:
					"Si un mineur réside légalement en Espagne, il peut obtenir une TIE. Si l'enfant est né en Espagne de parents étrangers résidents, il peut acquérir la nationalité après 1 an. S'il n'est pas né en Espagne mais y réside, il peut demander un permis de résidence (Residencia de menor referenciado).",
			},
			{
				title: "Déclaration de perte ou vol de documents",
				detail:
					"En cas de perte ou vol : 1) Déposez une plainte (Denuncia) au commissariat de la Policía Nacional ou Guardia Civil. 2) Pour le passeport : rendez-vous à l'Ambassade du Gabon avec la denuncia, 2 photos et justificatifs d'identité. 3) Pour la TIE : prenez un rendez-vous (Cita Previa) au commissariat pour un duplicata (Duplicado por pérdida o robo) avec la denuncia + paiement d'une nouvelle taxe 790-012.",
			},
			{
				title: "Changement d'adresse (Empadronamiento et TIE)",
				detail:
					"À chaque déménagement, vous devez obligatoirement mettre à jour votre Empadronamiento à la mairie dans un délai de 30 jours, puis informer le commissariat de police ou la Oficina de Extranjería de ce changement. Le non-respect de cette obligation peut compliquer vos renouvellements de séjour.",
			},
			{
				title: "Inscription consulaire",
				detail:
					"Tout Gabonais résidant en Espagne doit s'inscrire à l'Ambassade du Gabon en Espagne. L'inscription permet : l'obtention de la carte consulaire, la transcription des actes d'état civil, le vote aux élections gabonaises, et la protection consulaire en cas de difficulté. Documents : passeport gabonais, justificatif de domicile (Empadronamiento), photos d'identité.",
			},
		],
		tips: [
			"Obtenez un Certificado Digital (FNMT) dès que possible, il est essentiel pour les démarches en ligne",
			"Conservez des copies numériques de TOUS vos documents dans un cloud sécurisé",
			"La plateforme Mercurio est l'outil central pour renouveler en ligne",
			"Demandez une 'Autorización de regreso' si vous devez voyager hors d'Espagne pendant un renouvellement de TIE",
			"Inscrivez-vous à l'Ambassade dès votre arrivée pour bénéficier de la protection consulaire",
		],
		links: [
			{
				label: "Sede Electrónica (Mercurio)",
				url: "https://sede.administracionespublicas.gob.es/mercurio/inicioMercurio.html",
				description: "Renouvellement et démarches de séjour en ligne",
			},
			{
				label: "Certificado Digital FNMT",
				url: "https://www.sede.fnmt.gob.es/certificados",
				description: "Obtention du certificat numérique pour signer en ligne",
			},
			{
				label: "Cita Previa Extranjería",
				url: "https://icp.administracionelectronica.gob.es/icpplus/index.html",
				description: "Rendez-vous prise d'empreintes et autres",
			},
		],
	},
	{
		id: "transport",
		icon: Train,
		title: "Transport & Mobilité",
		color: "text-emerald-600 dark:text-emerald-400",
		iconBg: "bg-emerald-500/10",
		image: "/images/guide-logement.png",
		intro:
			"L'Espagne dispose d'un réseau de transports en commun dense et efficace. Comprendre son fonctionnement vous fera gagner du temps et de l'argent dès votre arrivée.",
		items: [
			{
				title: "Transports à Madrid, Barcelone et grandes villes",
				detail:
					"Le réseau de chaque ville (Metro, Bus, Cercanías/Rodalies) est très développé. À Madrid (CRTM), l'Abono Transportes Joven (moins de 26 ans) coûte 20 €/mois pour toutes les zones. À Barcelone (TMB), la T-Jove et la T-Usual offrent des tarifs très avantageux. Les tickets à l'unité (Billete Sencillo) coûtent généralement entre 1,50 € et 2,40 €.",
			},
			{
				title: "Transports en région et interurbains",
				detail:
					"Chaque région gère son propre réseau de transport (EMT, Tussam, Tuzsa). L'Espagne possède d'excellents réseaux de bus interurbains (groupe Alsa, Avanza) qui sont souvent plus économiques que le train pour voyager entre les différentes provinces ou de l'aéroport au centre.",
			},
			{
				title: "Trains longue distance (AVE, Avlo, Ouigo, Iryo)",
				detail:
					"Le réseau ferroviaire espagnol est géré historiquement par Renfe (AVE, Avlo, Alvia) ainsi que par de nouveaux opérateurs à bas coûts comme Ouigo España et Iryo. Réservez tôt en ligne pour obtenir les meilleurs tarifs. Si vous avez moins de 50 ans, la carte 'Más Renfe Joven' offre des réductions allant jusqu'à 30%.",
			},
			{
				title: "Permis de conduire",
				detail:
					"Le permis de conduire gabonais est reconnu pendant vos 6 premiers mois en Espagne en tant que résident. Au-delà, l'absence d'accord de réciprocité (canje) nécessite souvent de repasser le permis (Code et Conduite) par l'intermédiaire de la DGT (Dirección General de Tráfico).",
			},
			{
				title: "Vélo et mobilité douce",
				detail:
					"Les grandes villes offrent des systèmes de vélos en libre-service : BiciMAD (Madrid), Bicing (Barcelone), Valenbisi (Valence). L'abonnement annuel coûte entre 25 € et 50 €. Les trottinettes électriques (Patinetes) sont soumises à de strictes règles : port du casque souvent requis, trottoirs interdits, etc.",
			},
		],
		tips: [
			"Téléchargez l'application officielle des transports de votre ville (ex. CRTM Madrid) pour la recharge sans contact",
			"Pour les jeunes, les abonnements sont extrêmement subventionnés : réclamez-les !",
			"Voyagez toujours avec un titre valide, les contrôles et amendes sont stricts (multa de 100€)",
			"L'Abono gratuit de Cercanías Renfe est renouvelé périodiquement (sous caution de 10€)",
		],
		links: [
			{
				label: "Renfe",
				url: "https://www.renfe.com",
				description: "Réseau ferroviaire et réservation de trains",
			},
			{
				label: "DGT",
				url: "https://www.dgt.es",
				description: "Informations sur le permis de conduire espagnol",
			},
			{
				label: "Alsa (Bus longue distance)",
				url: "https://www.alsa.es/",
				description: "Lignes de bus économiques en Espagne",
			},
		],
	},
	{
		id: "banque",
		icon: CreditCard,
		title: "Banque & Finances",
		color: "text-amber-600 dark:text-amber-400",
		iconBg: "bg-amber-500/10",
		image: "/images/guide-famille.png",
		intro:
			"Ouvrir un compte bancaire est l'une des premières démarches essentielles en Espagne. Sans compte bancaire, impossible de louer un logement, recevoir un salaire ou percevoir des aides.",
		items: [
			{
				title: "Ouverture de compte bancaire",
				detail:
					"Avec votre NIE, vous pouvez ouvrir un compte bancaire en Espagne (Cuenta Básica). Banques principales : BBVA, CaixaBank, Santander. Néo-banques très réputées : N26, Revolut, compte Nickel (souvent valides dès que vous avez un numéro d'identification). Documents requis : Passeport + TIE/NIE + justificatif de domicile (Empadronamiento).",
			},
			{
				title: "Transferts d'argent vers le Gabon",
				detail:
					"Plusieurs solutions pour envoyer de l'argent au Gabon : Wise (ex-TransferWise), WorldRemit, Western Union, Remitly, Ria ou MoneyGram. Comparez toujours les frais et le taux de change réel avant d'envoyer de l'argent depuis l'Espagne.",
			},
			{
				title: "Impôts et déclaration fiscale",
				detail:
					"La déclaration annuelle de revenus (La Renta) se fait au printemps (avril - juin) auprès de l'Agencia Tributaria (Hacienda). Si vous y êtes résident, la déclaration est souvent obligatoire (sous certaines conditions de revenus annuels) pour prouver vos revenus et garantir l'obtention ou le renouvellement de vos cartes de séjour ou l'accès aux aides.",
			},
			{
				title: "Aides sociales et prestations",
				detail:
					"Quelques aides sont accessibles aux résidents légaux de longue durée, via l'Instituto Nacional de la Seguridad Social (INSS). On relève des aides telles que l'Ingreso Mínimo Vital (IMV) et autres 'Rentas Mínimas' versées par les autorités régionales selon vos besoins et conditions.",
			},
			{
				title: "Protection contre les arnaques",
				detail:
					"Soyez vigilant : ne communiquez jamais vos clés d'accès (phishing). La banque ne vous les demandera jamais par SMS. En cas de fraude, bloquez votre carte dans l'application, contactez votre banque et déposez immédiatement plainte (Denuncia) auprès de la Polícia Nacional.",
			},
		],
		tips: [
			"Les néo-banques digitales sont souvent plus souples à l'ouverture pour les étrangers",
			"Ouvrez votre compte très tôt : sans compte local, impossible de louer un logement longue durée",
			"Déclarez vos impôts via 'Renta Web' (Agencia Tributaria) chaque année, même si vous ne devez rien",
			"Ayez toujours une photo de votre numéro de compte (IBAN espagnol commençant par ES) sur vous",
		],
		links: [
			{
				label: "Agencia Tributaria (Hacienda)",
				url: "https://sede.agenciatributaria.gob.es",
				description: "Taxes et déclaration de revenus (La Renta)",
			},
			{
				label: "Seguridad Social (INSS)",
				url: "https://www.seg-social.es/",
				description: "Plateforme pour la sécurité sociale et aides de base",
			},
			{
				label: "IMV - Ingreso Mínimo Vital",
				url: "https://imv.seg-social.es",
				description: "Simulateur pour le revenu d'insertion vital",
			},
		],
	},
	{
		id: "oqtf",
		icon: AlertOctagon,
		title: "Orden de Expulsión : comprendre & agir",
		color: "text-rose-600 dark:text-rose-400",
		iconBg: "bg-rose-500/10",
		image: "/images/guide-sante.png",
		intro:
			"L'Orden de Expulsión (Resolución de Expulsión) est une décision administrative grave. Il est essentiel de connaître vos droits, les recours possibles et les conséquences. NE JAMAIS ignorer une Orden de Expulsión.",
		items: [
			{
				title: "Qu'est-ce qu'une Orden de Expulsión ?",
				detail:
					"C'est une décision administrative (Ley de Extranjería, LO 4/2000) enjoignant un étranger à quitter l'Espagne. Deux types principaux : l'Expulsión avec un délai de sortie volontaire (7 à 30 jours pour quitter le territoire) ou l'Expulsión immédiate. Motifs courants : séjour irrégulier (infraction grave), antécédents pénaux, ou travail sans autorisation. L'expulsion entraîne toujours une interdiction d'entrée (Prohibición de entrada).",
			},
			{
				title: "Conséquences d'une Orden de Expulsión non exécutée",
				detail:
					"Une Orden de Expulsión non exécutée peut entraîner : une interdiction de retour sur le territoire espagnol (IRTF) de 1 à 3 ans, un signalement au Système d'Information Schengen (SIS) empêchant l'entrée dans tout l'espace Schengen, un placement en Centro de Internamiento de Extranjeros (CIE) en vue d'une expulsion forcée. ⚠️ L'Orden de Expulsión ne disparaît pas si vous ne faites rien — elle reste exécutoire.",
			},
			{
				title: "1. Recurso de Reposición (Administration)",
				detail:
					"Délai : 1 mois à compter de la notification. C'est un recours optionnel déposé devant l'autorité qui a dicté la résolution (Subdelegación del Gobierno). Vous y apportez les preuves justifiant l'annulation de la décision. ⚠️ Ce recours administratif NE SUSPEND GÉNÉRALEMENT PAS l'exécution de l'expulsion, sauf si expressément demandé et accordé.",
			},
			{
				title: "2. Recurso de Alzada (Hiérarchique)",
				detail:
					"Délai : 1 mois à compter de la notification. Déposé devant l'organe supérieur de celui qui a dicté l'acte, lorsque la résolution ne met pas fin à la voie administrative. ⚠️ Tout comme la Reposición, il NE SUSPEND PAS automatiquement l'ordre d'expulsion.",
			},
			{
				title: "3. Recurso Contencioso-Administrativo (Tribunal)",
				detail:
					"Délai : 2 mois (ou parfois moins selon les cas urgents). Vous pouvez demander des mesures cautélaires (medidas cautelares) pour SUSPENDRE l'expulsion pendant la durée du procès. Ce recours se fait obligatoirement avec un avocat et un avoué (procurador). Vous avez droit à l'assistance juridique gratuite (Asistencia Jurídica Gratuita) au Turno de Oficio en cas de revenus insuffisants.",
			},
			{
				title: "L'assistance de l'Ambassade du Gabon",
				detail:
					"L'Ambassade peut : 1) S'assurer du respect de vos droits si vous êtes retenu en CIE (Centro de Internamiento de Extranjeros). 2) Vous orienter vers de l'assistance juridique. 3) Délivrer un laissez-passer consulaire si le retour est inévitable et le passeport expiré. ⚠️ L'Ambassade n'a pas le pouvoir d'annuler une décision judiciaire espagnole.",
			},
			{
				title: "Voies de régularisation",
				detail:
					"Même sous Orden de Expulsión, des voies de régularisation existent : admission exceptionnelle au séjour (arraigo social (3 ans de résidence et offre d'emploi) ou arraigo laboral (2 ans de résidence et 6 mois de travail)), régularisation par le travail (promesse d'embauche et ancienneté de séjour), motif familial (parent d'enfant espagnol ou résidant légalement, conjoint de citoyen espagnol/UE), raisons médicales (si le traitement n'est pas disponible dans le pays d'origine), protection internationale via l'OAR (Oficina de Asilo y Refugio) (risque de persécution). Dossier à déposer en Oficina de Extranjería avec toutes les preuves d'insertion.",
			},
			{
				title: "Prévention : comment éviter une Orden de Expulsión",
				detail:
					"Les meilleurs remèdes sont préventifs : 1) Renouvelez votre titre de séjour 2 à 4 mois avant expiration. 2) Ne travaillez JAMAIS sans autorisation — le travail non déclaré est un motif courant d'Orden de Expulsión. 3) Gardez vos documents à jour (adresse, état civil). 4) Répondez à TOUTES les convocations de la Oficina de Extranjería. 5) En cas de difficulté, consultez un avocat AVANT que la situation ne devienne critique.",
			},
		],
		tips: [
			"NE JAMAIS ignorer une Orden de Expulsión — elle ne disparaît pas si vous ne faites rien et les conséquences s'aggravent",
			"Consultez IMMÉDIATEMENT un avocat spécialisé en droit des étrangers — le délai de recours est court",
			"Privilégiez TOUJOURS le recours contentieux (tribunal administratif) : c'est le SEUL qui SUSPEND l'exécution",
			"Rassemblez tous les documents prouvant votre ancienneté de séjour et votre insertion (bulletins de salaire, bail, scolarisation des enfants)",
			"L'Ambassade est là pour vous accompagner — n'hésitez pas à le saisir en parallèle de vos recours juridiques",
		],
		links: [
			{
				label: "CEAR",
				url: "https://www.lacimade.org",
				description: "Accompagnement juridique gratuit pour étrangers",
			},
			{
				label: "Cruz Roja Española",
				url: "https://www.gisti.org",
				description: "Groupe d'information et de soutien des immigrés",
			},
			{
				label: "Asistencia Jurídica Gratuita",
				url: "https://www.mjusticia.gob.es/es/ciudadanos/tramites/asistencia-juridica-gratuita",
				description: "Prise en charge des frais d'avocat au Turno de Oficio",
			},
			{
				label: "Defensor del Pueblo",
				url: "https://www.defensordelpueblo.es",
				description:
					"Recours indépendant en cas de litige avec l'administration",
			},
		],
	},
];

// ─── Data: Savoir-vivre ─────────────────────────────────────────────────────
const savoirVivre: SavoirVivreItem[] = [
	{
		icon: HandHeart,
		title: "Respect et courtoisie",
		description:
			'En Espagne, les formules de politesse sont très importantes. Dites "Bonjour" en entrant dans un commerce, "Merci", "S\'il vous plaît", "Excusez-moi". Le vouvoiement est la règle avec les inconnus, les aînés et en contexte professionnel.',
	},
	{
		icon: Landmark,
		title: "Laïcité et vivre ensemble",
		description:
			"L'Espagne est un État laïc. La liberté de culte est garantie, mais la religion relève de la sphère privée. Dans les services publics (école, mairie, hôpital), une attitude neutre est attendue.",
	},
	{
		icon: Scale,
		title: "Lois et règles de vie",
		description:
			"Le respect des lois est non-négociable : code de la route, interdiction de fumer dans les lieux publics fermés, tri des déchets, respect du voisinage (bruit limité entre 22h et 7h).",
	},
	{
		icon: Users,
		title: "Relations de voisinage",
		description:
			"Se présenter à ses voisins en emménageant est apprécié. Respectez le règlement de copropriété, les horaires de calme et les espaces communs.",
	},
	{
		icon: Flag,
		title: "Valeurs de la République",
		description:
			"Liberté, Égalité, Fraternité : ces valeurs sont au cœur de la société espagnole. L'égalité homme-femme est un droit fondamental. Toute discrimination est punie par la loi.",
	},
	{
		icon: HeartHandshake,
		title: "Engagement communautaire",
		description:
			"Participer à la vie associative locale facilite l'intégration et crée un réseau de solidarité. Restez connecté à la communauté gabonaise tout en vous ouvrant à la diversité culturelle espagnole.",
	},
	{
		icon: Siren,
		title: "Coopération avec les forces de l'ordre",
		description:
			"En cas d'arrestation, restez calme et coopérez. Vous avez le droit de connaître le motif, de garder le silence, d`avoir un avocat, de prévenir un proche et de contacter l'Ambassade (Convention de Vienne, art. 36).",
	},
];

// ─── Data: Erreurs courantes ────────────────────────────────────────────────
const erreursCourantes: ErreurItem[] = [
	{
		erreur: "Laisser expirer son titre de séjour",
		conseil: "Lancez le renouvellement 2 à 4 mois avant la date d`expiration.",
	},
	{
		erreur: "Ne pas souscrire d'assurance habitation",
		conseil:
			"C'est obligatoire dès l'entrée dans le logement. Coût : à partir de 5€/mois.",
	},
	{
		erreur: "Travailler sans autorisation",
		conseil:
			"Le travail non déclaré vous prive de droits et peut entraîner une Orden de Expulsión.",
	},
	{
		erreur: "Ignorer la déclaration d'impôts",
		conseil:
			"Même sans revenus, vous devez déclarer chaque année sur impots.gouv.fr.",
	},
	{
		erreur: "Ne pas transcrire les actes d'état civil",
		conseil:
			"Naissances et mariages en Espagne doivent être transcrits à l`Ambassade.",
	},
	{
		erreur: "Ignorer une Orden de Expulsión",
		conseil:
			"Consultez immédiatement un avocat. Le recours contentieux est le SEUL suspensif.",
	},
	{
		erreur: "Voyager avec un simple récépissé de première demande",
		conseil:
			"Seul le titre définitif ou le visa national (type D) validé permet de quitter l'Espagne et d`y revenir.",
	},
	{
		erreur: "Oublier de signaler un changement d'adresse",
		conseil:
			"Obligation dans les 3 mois. Amende possible en cas de non-déclaration.",
	},
	{
		erreur: "Signer des documents sans les lire (garde à vue)",
		conseil: "Demandez un avocat et ne signez rien sans avoir lu et compris.",
	},
];

// ─── Data: Numéros utiles ───────────────────────────────────────────────────
const numerosUtiles: NumeroUtile[] = [
	{
		label: "Ambassade du Gabon",
		number: "C. de Silva, 2, 28013 Madrid",
		color: "bg-emerald-500/10 text-emerald-600",
	},
	{
		label: "Email Ambassade",
		number: "contact@ambassadegabon.es",
		color: "bg-emerald-500/10 text-emerald-600",
	},
	{
		label: "Urgence consulaire Gabon",
		number: "+34 600 000 000",
		color: "bg-green-500/10 text-green-600",
	},
	{
		label: "Ambulances (Emergencias Médicas)",
		number: "061",
		color: "bg-red-500/10 text-red-600",
	},
	{
		label: "Police Nationale (Policía Nacional)",
		number: "091",
		color: "bg-blue-500/10 text-blue-600",
	},
	{
		label: "Pompiers (Bomberos)",
		number: "080",
		color: "bg-orange-500/10 text-orange-600",
	},
	{
		label: "Urgences générales",
		number: "112",
		color: "bg-purple-500/10 text-purple-600",
	},
	{
		label: "Violences de genre",
		number: "016",
		color: "bg-pink-500/10 text-pink-600",
	},
	{
		label: "Information administration de l'État",
		number: "060",
		color: "bg-yellow-500/10 text-yellow-600",
	},
	{
		label: "Asistencia Jurídica Gratuita",
		number: "Voir Colegio de Abogados",
		color: "bg-emerald-500/10 text-emerald-600",
	},
];

const guideSectionsEn: GuideSection[] = [
	{
		id: "admission",
		icon: Plane,
		title: "Admission to Espagne",
		color: "text-cyan-600 dark:text-cyan-400",
		iconBg: "bg-cyan-500/10",
		image: "/images/guide-droits.png",
		intro:
			"Before you travel, prepare all required entry documents. A visa alone does not guarantee admission at the border.",
		items: [
			{
				title: "Visa categories",
				detail:
					"Short-stay visas (Schengen type C) cover tourism and family visits up to 90 days. Long-stay visas (type D / visa national) are for studies, work and family settlement.",
			},
			{
				title: "Border control checklist",
				detail:
					"Carry a valid passport, valid visa, accommodation proof, return ticket for short stays, travel insurance and proof of financial resources.",
			},
			{
				title: "Carta de Invitación (Letter of Invitation)",
				detail:
					"If hosted by a private person, an official Carta de Invitación issued by the National Police is commonly required for your visa application.",
			},
			{
				title: "First Steps (Empadronamiento & TIE)",
				detail:
					"After arrival, register at your local town hall (Empadronamiento) and apply for your foreigner identity card (TIE) at the Police or Extranjería within one month.",
			},
		],
		tips: [
			"Keep both paper and digital copies of travel documents",
			"Organize all supporting documents in one folder for border checks",
			"Do not delay your TIE application after arrival",
			"Save emergency contacts before departure",
		],
		links: [
			{
				label: "Sede Electrónica Extranjería",
				url: "https://sede.administracionespublicas.gob.es/procedimientos/index/categoria/34",
				description: "Cita Previa and administrative procedures",
			},
			{
				label: "Visas for Spain",
				url: "https://www.exteriores.gob.es/Consulados/libreville/es/ServiciosConsulares/Paginas/index.aspx",
				description: "Spanish Embassy in Gabon",
			},
			{
				label: "Ministerio de Inclusión",
				url: "https://www.inclusion.gob.es/",
				description: "Official Spanish immigration portal",
			},
		],
	},
	{
		id: "etudiants",
		icon: UserCheck,
		title: "Student Life",
		color: "text-indigo-600 dark:text-indigo-400",
		iconBg: "bg-indigo-500/10",
		image: "/images/guide-education.png",
		intro:
			"Gabonese students in Espagne have specific rights around work, residence renewal and post-graduation transitions.",
		items: [
			{
				title: "Student Visa and Admission",
				detail:
					"Most long-stay student visas are processed through the Spanish Embassy in Libreville after securing direct university admission or via the UNEDasiss portal for degree recognition.",
			},
			{
				title: "Scholarships and aid",
				detail:
					"You may combine Gabonese (ANBG) or Spanish funding sources (Becas MEC or regional grants) depending on eligibility. There are fewer social housing aids compared to other European countries.",
			},
			{
				title: "Work during studies",
				detail:
					"Students can generally work up to 30 hours per week (part-time). Internship agreements (prácticas) must be registered with social security.",
			},
			{
				title: "After graduation",
				detail:
					"A 12-month non-renewable job search permit (Residencia para búsqueda de empleo) allows graduates to seek employment or start a business after completing an eligible higher education degree.",
			},
		],
		tips: [
			"Apply for your TIE renewal using your Digital Certificate before it expires",
			"Ensure your work hours don't exceed the 30h/week limit",
			"Keep transcripts and degree certificates ready for status changes",
			"Explore shared housing (Colocation/Piso Compartido)",
		],
		links: [
			{
				label: "SEPIE - Study in Spain",
				url: "http://sepie.es/internacionalizacion/study-in-spain.html",
				description: "Study in Spain higher education portal",
			},
			{
				label: "UNEDasiss",
				url: "https://unedasiss.uned.es/home",
				description: "Access to Spanish universities for foreigners",
			},
			{
				label: "Becas MEC",
				url: "https://www.educacionfpydeportes.gob.es/servicios-al-ciudadano/catalogo/estudiantes/becas-ayudas/para-estudiar.html",
				description: "Ministry of Education scholarships",
			},
		],
	},
	{
		id: "demarches",
		icon: ClipboardList,
		title: "Administrative Procedures",
		color: "text-sky-600 dark:text-sky-400",
		iconBg: "bg-sky-500/10",
		image: "/images/guide-emploi.png",
		intro:
			"Your legal stay in Espagne depends on meeting key administrative deadlines and keeping your documents up to date.",
		items: [
			{
				title: "First residence process (TIE)",
				detail:
					"Register at the town hall (Empadronamiento), pay the Tasa 790-012, and get your fingerprints taken at the Extranjería or national police station for your Foreigner Identity Card.",
			},
			{
				title: "Permit renewal (Renovación)",
				detail:
					"Submit renewal files up to 60 days before expiry or up to 90 days after (with possible penalty). Keep your application receipt to prove legal stay.",
			},
			{
				title: "Status changes (Modificación)",
				detail:
					"Switching from student to employee requires a qualifying job offer and an employer-initiated procedure at the relevant Extranjería office.",
			},
			{
				title: "Loss or theft of documents",
				detail:
					"Declare loss/theft immediately to the police (Denuncia), then request replacement through the relevant authority (Embassy for passport, Extranjería/Police for TIE).",
			},
		],
		tips: [
			"Get a Digital Certificate (FNMT) to complete nearly all procedures online",
			"Store scanned copies of all identity and residence records",
			"Use the Sede Electrónica / Mercurio platform when available",
			"Always keep proof of submission and receipts",
		],
		links: [
			{
				label: "Sede Electrónica (Mercurio)",
				url: "https://sede.administracionespublicas.gob.es/mercurio/inicioMercurio.html",
				description: "Residence procedures online renewal",
			},
			{
				label: "Digital Certificate FNMT",
				url: "https://www.sede.fnmt.gob.es/certificados",
				description: "Essential tool for online identity and signing",
			},
			{
				label: "Cita Previa Extranjería",
				url: "https://icp.administracionelectronica.gob.es/icpplus/index.html",
				description: "Book appointments for fingerprinting and other steps",
			},
		],
	},
	{
		id: "transport",
		icon: Train,
		title: "Transport & Mobility",
		color: "text-emerald-600 dark:text-emerald-400",
		iconBg: "bg-emerald-500/10",
		image: "/images/guide-logement.png",
		intro:
			"Understanding transport systems early will save you time and money, especially in your first months in Espagne.",
		items: [
			{
				title: "Madrid, Barcelona and major cities",
				detail:
					"Metro, Cercanías, tram and bus networks are extensive. Monthly passes (like Abono Transportes in Madrid or T-Jove in Barcelona) are highly subsidized for youth.",
			},
			{
				title: "Other cities",
				detail:
					"Every city has its own operator and fare system. Spain also has an excellent intercity bus network (Alsa, Avanza) that is often cheaper than trains.",
			},
			{
				title: "Long-distance travel",
				detail:
					"Book trains early on Renfe, Ouigo or Iryo for better prices. Youth discount cards like 'Más Renfe Joven' can reduce costs significantly.",
			},
			{
				title: "Driving and local mobility",
				detail:
					"Check recognition rules for Gabonese driving licenses and exchange (canje) procedures through DGT. Otherwise, you may need to pass the Spanish test.",
			},
		],
		tips: [
			"Use official local transit apps for real-time planning and mobile tickets",
			"Keep transport tickets valid to avoid strict fines (multas)",
			"Compare monthly vs. pay-per-trip costs from your first week",
			"Verify local rules for public bikes (BiciMAD, Bicing) and electric scooters",
		],
		links: [
			{
				label: "Renfe",
				url: "https://www.renfe.com",
				description: "National railway and high-speed trains",
			},
			{
				label: "DGT",
				url: "https://www.dgt.es",
				description: "Driving license administrative services",
			},
			{
				label: "ALSA",
				url: "https://www.alsa.es/",
				description: "Long-distance bus network",
			},
		],
	},
	{
		id: "banque",
		icon: CreditCard,
		title: "Banking & Finances",
		color: "text-amber-600 dark:text-amber-400",
		iconBg: "bg-amber-500/10",
		image: "/images/guide-famille.png",
		intro:
			"A Spanish bank account is essential for rent, salaries and benefits. Build financial stability early after arrival.",
		items: [
			{
				title: "Opening a bank account",
				detail:
					"Traditional and digital options exist (BBVA, Santander, N26, Revolut). A TIE/NIE and Empadronamiento are generally required. You have a legal right to a basic account (Cuenta Básica).",
			},
			{
				title: "Money transfers to Gabon",
				detail:
					"Compare providers like Wise, Remitly or WorldRemit carefully for fees and exchange rates before each transfer.",
			},
			{
				title: "Tax obligations (La Renta)",
				detail:
					"Annual tax declaration (La Renta) is handled by Agencia Tributaria. It is highly recommended to file it to access social benefits and ease residence renewals.",
			},
			{
				title: "Fraud prevention",
				detail:
					"Never share PINs or passwords by phone or SMS. In case of fraud, block cards in your app and file a police report (Denuncia).",
			},
		],
		tips: [
			"Open your account as soon as you secure your TIE/NIE",
			"Keep your Spanish IBAN handy (starts with ES) for direct debits",
			"Always compare exchange-rate spread and transfer fees",
			"Activate strong authentication in your banking app",
		],
		links: [
			{
				label: "Agencia Tributaria",
				url: "https://sede.agenciatributaria.gob.es",
				description: "Tax portal (Hacienda) and declarations",
			},
			{
				label: "Seguridad Social (INSS)",
				url: "https://www.seg-social.es/",
				description: "Social security and benefits info",
			},
			{
				label: "Ingreso Mínimo Vital",
				url: "https://imv.seg-social.es",
				description: "Social aid simulator",
			},
		],
	},
	{
		id: "oqtf",
		icon: AlertOctagon,
		title: "Orden de Expulsión: Understand and Act",
		color: "text-rose-600 dark:text-rose-400",
		iconBg: "bg-rose-500/10",
		image: "/images/guide-sante.png",
		intro:
			"An Orden de Expulsión is a serious administrative decision. Rapid legal action is critical to protect your rights and options.",
		items: [
			{
				title: "What an Orden de Expulsión means",
				detail:
					"It is a legal order to leave Spain. It generally carries a prohibition of entry (prohibición de entrada) for up to several years. You may or may not be granted a voluntary departure period.",
			},
			{
				title: "Consequences if ignored",
				detail:
					"Ignoring an Orden de Expulsión can lead to forced removal, detention in a CIE (Centro de Internamiento de Extranjeros), and Schengen-wide travel bans.",
			},
			{
				title: "Appeal routes",
				detail:
					"You can file administrative appeals (Reposición or Alzada), but the court appeal (Recurso Contencioso-Administrativo) allows requesting 'medidas cautelares' to suspend the expulsion.",
			},
			{
				title: "Embassy support",
				detail:
					"The Embassy can refer you to legal support, assure your rights are upheld in a CIE, and coordinate a safe return if necessary. It cannot overturn Spanish judicial orders.",
			},
		],
		tips: [
			"Do not wait: court deadlines (plazos) are strict and non-negotiable",
			"Prioritize a specialized immigration lawyer (abogado de extranjería)",
			"Organize all evidence of your integration, ties, or family in Spain",
			"Contact the Embassy to ensure you receive consular assistance",
		],
		links: [
			{
				label: "CEAR",
				url: "https://www.cear.es",
				description: "Support for refugees and migrants",
			},
			{
				label: "Free Legal Aid",
				url: "https://www.mjusticia.gob.es/es/ciudadanos/tramites/asistencia-juridica-gratuita",
				description: "Apply for public defenders (Turno de Oficio)",
			},
			{
				label: "Defensor del Pueblo",
				url: "https://www.defensordelpueblo.es",
				description: "Ombudsman for institutional disputes",
			},
		],
	},
];

const savoirVivreEn: SavoirVivreItem[] = [
	{
		icon: HandHeart,
		title: "Respect and Courtesy",
		description:
			"Politeness is central in everyday interactions. Greeting, thanking and using respectful language matter.",
	},
	{
		icon: Landmark,
		title: "Secularism and Social Life",
		description:
			"Public institutions follow secular principles and expect respectful coexistence across beliefs.",
	},
	{
		icon: Scale,
		title: "Rules of Daily Life",
		description:
			"Traffic, smoking, waste-sorting and neighborhood rules are enforced and should be taken seriously.",
	},
	{
		icon: Users,
		title: "Neighborhood Relations",
		description:
			"Introducing yourself to neighbors and respecting quiet hours helps your integration.",
	},
	{
		icon: Flag,
		title: "Republican Values",
		description:
			"Liberty, equality and fraternity are core values. Discrimination is prohibited.",
	},
	{
		icon: HeartHandshake,
		title: "Community Engagement",
		description:
			"Joining local and diaspora associations builds support networks and opportunities.",
	},
	{
		icon: Siren,
		title: "Interaction with Law Enforcement",
		description:
			"Stay calm and cooperate. You have legal rights, including lawyer access and consular contact.",
	},
];

const erreursCourantesEn: ErreurItem[] = [
	{
		erreur: "Letting your residence permit expire",
		conseil: "Start renewal 2 to 4 months before expiry.",
	},
	{
		erreur: "Not taking home insurance",
		conseil: "Insurance is mandatory from move-in and protects your lease.",
	},
	{
		erreur: "Working without authorization",
		conseil:
			"Undeclared work can lead to serious legal and administrative sanctions.",
	},
	{
		erreur: "Ignoring annual tax filing",
		conseil: "Declare every year, including low-income years when required.",
	},
	{
		erreur: "Not transcribing civil records",
		conseil:
			"Birth and marriage acts done in Spain should be transcribed at the Embassy.",
	},
	{
		erreur: "Ignoring an Orden de Expulsión",
		conseil:
			"Get legal counsel immediately. Court deadlines are short and decisive.",
	},
	{
		erreur: "Traveling with first-request receipt only",
		conseil: "A first-application receipt may not permit exit/re-entry.",
	},
	{
		erreur: "Not reporting address changes",
		conseil: "Address updates are mandatory within legal deadlines.",
	},
	{
		erreur: "Signing documents without reading",
		conseil: "Request legal support and never sign unclear records.",
	},
];

const numerosUtilesEn: NumeroUtile[] = [
	{
		label: "Embassy of Gabon",
		number: "C. de Silva, 2, 28013 Madrid",
		color: "bg-emerald-500/10 text-emerald-600",
	},
	{
		label: "Embassy Email",
		number: "contact@ambassadegabon.es",
		color: "bg-emerald-500/10 text-emerald-600",
	},
	{
		label: "Gabon Consular Emergency",
		number: "+34 600 000 000",
		color: "bg-green-500/10 text-green-600",
	},
	{
		label: "Ambulances (Medical emergency)",
		number: "061",
		color: "bg-red-500/10 text-red-600",
	},
	{
		label: "National Police",
		number: "091",
		color: "bg-blue-500/10 text-blue-600",
	},
	{
		label: "Fire Brigade",
		number: "080",
		color: "bg-orange-500/10 text-orange-600",
	},
	{
		label: "General Emergency",
		number: "112",
		color: "bg-purple-500/10 text-purple-600",
	},
	{
		label: "Gender violence hotline",
		number: "016",
		color: "bg-pink-500/10 text-pink-600",
	},
	{
		label: "State administration info",
		number: "060",
		color: "bg-yellow-500/10 text-yellow-600",
	},
	{
		label: "Free Legal Aid",
		number: "Colegio de Abogados",
		color: "bg-emerald-500/10 text-emerald-600",
	},
];

// ─── Main Page Component ─────────────────────────────────────────────────────

function VenirEnEspagnePage() {
	const { t, i18n } = useTranslation();
	const { isSectionHidden } = useSectionVisibility("/venir-en-espagne");
	const lang = i18n.resolvedLanguage || i18n.language;
	const isEn = lang.startsWith("en");
	const tSections = isEn ? guideSectionsEn : guideSections;
	const tSavoirVivre = isEn ? savoirVivreEn : savoirVivre;
	const tErreurs = isEn ? erreursCourantesEn : erreursCourantes;
	const tNumeros = isEn ? numerosUtilesEn : numerosUtiles;

	return (
		<div className="min-h-screen bg-background flex flex-col">
			<div className="flex-1">
				{/* ── Hero Section ────────────────────────────────────────────────── */}
				<PageHero image="/images/hero-venir.png">
					<Badge className="mb-4 bg-primary/10 text-primary border-primary/20 backdrop-blur-sm">
						<BookOpen className="w-3.5 h-3.5 mr-1.5" />
						<EditableText
							contentKey="venirEspagne.hero.badge"
							defaultValue={t("venirEspagne.badge", "Guide d'installation")}
							pagePath="/venir-en-espagne"
							sectionId="hero"
							as="span"
						/>
					</Badge>

					<h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4">
						<EditableText
							contentKey="venirEspagne.hero.title"
							defaultValue={t("venirEspagne.heroTitle", "S`installer au ")}
							pagePath="/venir-en-espagne"
							sectionId="hero"
							as="span"
						/>
						<br />
						<EditableText
							contentKey="venirEspagne.hero.subtitle"
							defaultValue={t("venirEspagne.heroSubtitle", "Royaume d'Espagne")}
							pagePath="/venir-en-espagne"
							sectionId="hero"
							as="span"
							className="text-foreground"
						/>{" "}
						<EditableText
							contentKey="venirEspagne.hero.highlight"
							defaultValue={t("venirEspagne.heroHighlight", "& s`y intégrer")}
							pagePath="/venir-en-espagne"
							sectionId="hero"
							as="span"
							className="text-gradient"
						/>
					</h1>

					<EditableText
						contentKey="venirEspagne.hero.description"
						defaultValue={t(
							"venirEspagne.heroDescription",
							"Guide complet pour les Gabonais arrivant en Espagne : admission, visa, démarches administratives, codes culturels et conseils pratiques pour une intégration réussie. L'Ambassade du Gabon vous accompagne.",
						)}
						pagePath="/venir-en-espagne"
						sectionId="hero"
						as="p"
						className="text-base text-muted-foreground mb-6 max-w-2xl leading-relaxed"
					/>

					{/* Quick nav pills */}
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

				{/* ── Savoir-vivre & Conventions ───────────────────────────────────── */}
				<section className="py-24 px-6 bg-muted/20">
					<div className="max-w-7xl mx-auto">
						<div className="text-center mb-16">
							<Badge
								variant="outline"
								className="mb-4 bg-background/50 backdrop-blur-sm"
							>
								<HandHeart className="w-3.5 h-3.5 mr-1.5" />
								<EditableText
									contentKey="venirEspagne.savoirVivre.badge"
									defaultValue={t(
										"venirEspagne.savoirVivre.badge",
										"Savoir-vivre",
									)}
									pagePath="/venir-en-espagne"
									sectionId="savoir-vivre"
									as="span"
								/>
							</Badge>
							<h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
								<EditableText
									contentKey="venirEspagne.savoirVivre.title"
									defaultValue={t(
										"venirEspagne.savoirVivre.title",
										"Codes culturels & Conventions",
									)}
									pagePath="/venir-en-espagne"
									sectionId="savoir-vivre"
									as="span"
								/>
							</h2>
							<EditableText
								contentKey="venirEspagne.savoirVivre.description"
								defaultValue={t(
									"venirEspagne.savoirVivre.description",
									"Comprendre les codes de la société espagnole pour mieux y évoluer. Ce n'est pas renoncer à sa culture, c'est en ajouter une autre.",
								)}
								pagePath="/venir-en-espagne"
								sectionId="savoir-vivre"
								as="p"
								className="text-muted-foreground max-w-2xl mx-auto"
							/>
						</div>

						<SavoirVivreGrid items={tSavoirVivre} />
					</div>
				</section>

				{/* ── Guides thématiques (Cards) ──────────────────────────────────── */}
				<section className="py-16 px-6 bg-background">
					<div className="max-w-7xl mx-auto">
						<div className="text-center mb-12">
							<Badge variant="outline" className="mb-4">
								<Shield className="w-3.5 h-3.5 mr-1.5" />
								<EditableText
									contentKey="venirEspagne.guides.badge"
									defaultValue={t(
										"venirEspagne.guides.badge",
										"Guides complets",
									)}
									pagePath="/venir-en-espagne"
									sectionId="guides"
									as="span"
								/>
							</Badge>
							<h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
								<EditableText
									contentKey="venirEspagne.guides.title"
									defaultValue={t(
										"venirEspagne.guides.title",
										"Vos démarches détaillées",
									)}
									pagePath="/venir-en-espagne"
									sectionId="guides"
									as="span"
								/>
							</h2>
							<EditableText
								contentKey="venirEspagne.guides.description"
								defaultValue={t(
									"venirEspagne.guides.description",
									"Cliquez sur chaque thème pour découvrir les informations détaillées, les procédures et nos astuces pratiques.",
								)}
								pagePath="/venir-en-espagne"
								sectionId="guides"
								as="p"
								className="text-muted-foreground max-w-2xl mx-auto"
							/>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
							{tSections.map((section) => (
								<GuideSectionCard key={section.id} section={section} />
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
								{t("venirEspagne.erreurs.badge", "À savoir absolument")}
							</Badge>
							<h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
								{t("venirEspagne.erreurs.title", "Erreurs courantes à éviter")}
							</h2>
							<p className="text-muted-foreground max-w-2xl mx-auto">
								{t(
									"venirEspagne.erreurs.description",
									"Ces oublis peuvent avoir des conséquences sérieuses. Prenez-les au sérieux pour protéger vos droits.",
								)}
							</p>
						</div>

						<ErreursCourantesGrid items={tErreurs} />
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
								{t("venirEspagne.numeros.badge", "Numéros essentiels")}
							</Badge>
							<h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
								{t("venirEspagne.numeros.title", "Numéros utiles à conserver")}
							</h2>
							<p className="text-muted-foreground max-w-2xl mx-auto">
								{t(
									"venirEspagne.numeros.description",
									"Enregistrez ces numéros dans votre téléphone. Ils peuvent sauver des vies.",
								)}
							</p>
						</div>

						<NumerosUtilesGrid items={tNumeros} />
					</div>
				</section>

				{!isSectionHidden("citizen-cta") && (
					<CitizenCTA
						pagePath="/venir-en-espagne"
						sectionId="citizen-cta"
						contentKeyPrefix="venirEspagne.citizenCta"
					/>
				)}
			</div>
		</div>
	);
}
