import { createFileRoute, Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import {
  Scale,
  Shield,
  HandHeart,
  Landmark,
  AlertTriangle,
  BookOpen,
  Users,
  Phone,
  ArrowRight,
  ShieldCheck,
  HeartHandshake,
  Flag,
  Siren,
  Plane,
  AlertOctagon,
  UserCheck,
  ClipboardList,
  Train,
  CreditCard,
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PageHero } from '@/components/PageHero'
import { CitizenCTA } from '@/components/home/CitizenCTA'
import i18n from '@/integrations/i18n/i18n'
import {
  GuideSectionCard,
  SavoirVivreGrid,
  ErreursCourantesGrid,
  NumerosUtilesGrid,
  type GuideSection,
  type SavoirVivreItem,
  type ErreurItem,
  type NumeroUtile,
} from '@/components/guides'

export const Route = createFileRoute('/venir-en-france')({
  component: VenirEnFrancePage,
  head: () => {
    const isEn = (i18n.resolvedLanguage || i18n.language).startsWith('en')
    return {
      meta: [
        {
          title: isEn
            ? 'Coming to France — Complete Guide | General Consulate of Gabon'
            : 'Venir en France — Guide Complet | Consulat Général du Gabon',
        },
        {
          name: 'description',
          content: isEn
            ? 'Complete guide for Gabonese nationals coming to France: admission, visa, integration, administrative steps, cultural norms and residency rights.'
            : 'Guide complet pour les Gabonais venant en France : admission, visa, intégration, démarches administratives, codes culturels et droits de séjour.',
        },
      ],
    }
  },
})

// ─── Data : Guide Sections ──────────────────────────────────────────────────
const guideSections: GuideSection[] = [
  {
    id: 'admission',
    icon: Plane,
    title: 'Admission en France',
    color: 'text-cyan-600 dark:text-cyan-400',
    iconBg: 'bg-cyan-500/10',
    image: '/images/guide-droits.png',
    intro:
      "Avant de voyager, assurez-vous de disposer de tous les documents requis à la frontière. Le visa ne garantit pas automatiquement l'entrée sur le territoire français.",
    items: [
      {
        title: 'Types de visas pour la France',
        detail:
          "Il existe deux grandes catégories. Le visa de court séjour (Schengen, type C) : tourisme, visite familiale, voyage d'affaires — valable 90 jours maximum sur 180 jours. Le visa de long séjour (type D ou VLS-TS) : études, travail, regroupement familial — valable plus de 90 jours. Le VLS-TS vaut titre de séjour pendant sa durée de validité (1 an maximum). Le visa \"passeport talent\" est destiné aux diplômés, chercheurs, artistes et créateurs d'entreprise (carte pluriannuelle de 4 ans).",
      },
      {
        title: 'Documents obligatoires à la frontière',
        detail:
          "Vous devez présenter à la Police aux Frontières (PAF) : un passeport en cours de validité (valable au minimum 3 mois après la date de retour prévue), un visa en cours de validité, une attestation d'hébergement (attestation d'accueil validée en mairie OU réservation d'hôtel), un billet d'avion retour (obligatoire pour court séjour), une assurance voyage couvrant les frais médicaux (minimum 30 000 €), et des justificatifs de ressources financières.",
      },
      {
        title: "Attestation d'accueil — Procédure détaillée",
        detail:
          "Si vous êtes hébergé par un particulier en France, celui-ci doit demander une attestation d'accueil en mairie. Documents requis pour l'hébergeant : pièce d'identité, justificatif de domicile, justificatif de revenus. L'attestation est payante (30 €) et doit être envoyée en original au visiteur. Sans cette attestation, le visa court séjour peut être refusé.",
      },
      {
        title: 'Justificatifs de ressources financières',
        detail:
          "Montants minimum exigés : 120 €/jour si vous êtes hébergé à l'hôtel, ou 32,50 €/jour si vous êtes hébergé par un particulier disposant d'une attestation d'accueil. Justificatifs acceptés : relevés bancaires des 3 derniers mois, attestation de bourse, lettre de prise en charge d'un garant avec justificatifs de revenus. ⚠️ Ces montants sont vérifiés à la frontière.",
      },
      {
        title: "Refus d'entrée : vos droits",
        detail:
          "La PAF peut refuser l'entrée même avec un visa valide si les justificatifs sont insuffisants. En cas de refus : 1) Vous recevez une notification écrite motivée. 2) Vous pouvez contacter le consulat du Gabon (droit garanti par la Convention de Vienne, art. 36). 3) Un recours est possible devant le tribunal administratif dans les 48 heures. 4) Vous pouvez être maintenu en zone d'attente pendant 4 jours maximum (prolongeable par un juge). Conservez TOUS les documents remis par la PAF.",
      },
      {
        title: "Première démarche OFII à l'arrivée",
        detail:
          "Si vous avez un VLS-TS, validez-le OBLIGATOIREMENT sur le site de l'OFII dans les 3 mois suivant l'arrivée. Étapes : 1) Créez votre compte sur administration-etrangers-en-france.interieur.gouv.fr. 2) Payez la taxe OFII (200 € à 400 € selon le type de visa). 3) Passez la visite médicale obligatoire (gratuite). 4) Signez le Contrat d'Intégration Républicaine (CIR) : il comprend une formation civique (2 jours) et un test de français. ⚠️ Si votre VLS-TS n'est pas validé dans les 3 mois, votre séjour devient irrégulier.",
      },
    ],
    tips: [
      'Imprimez TOUS vos documents de voyage en double exemplaire — ne comptez jamais uniquement sur les versions numériques',
      'Arrivez à la frontière avec vos justificatifs de ressources, hébergement et assurance facilement accessibles dans un seul dossier',
      "Le CIR comprend une formation civique et linguistique OBLIGATOIRE — planifiez votre emploi du temps en conséquence",
      'Conservez une copie de votre visa et de votre passeport dans un cloud sécurisé (Google Drive, iCloud)',
      'Validez votre VLS-TS dès votre arrivée — ne pas attendre le dernier moment des 3 mois',
    ],
    links: [
      { label: 'OFII', url: 'https://www.ofii.fr', description: "Office Français de l'Immigration et de l'Intégration" },
      { label: 'France-Visas', url: 'https://france-visas.gouv.fr', description: 'Portail officiel des visas pour la France' },
      { label: 'ANEF', url: 'https://administration-etrangers-en-france.interieur.gouv.fr', description: 'Validation du VLS-TS en ligne' },
    ],
  },
  {
    id: 'etudiants',
    icon: UserCheck,
    title: 'Vie étudiante',
    color: 'text-indigo-600 dark:text-indigo-400',
    iconBg: 'bg-indigo-500/10',
    image: '/images/guide-education.png',
    intro:
      "Les étudiants gabonais en France bénéficient de droits spécifiques : droit au travail, carte pluriannuelle, et Autorisation Provisoire de Séjour après le diplôme. Voici tout ce qu'il faut savoir.",
    items: [
      {
        title: 'Visa étudiant et procédure Campus France',
        detail:
          "Le visa étudiant long séjour est obtenu via Campus France (procédure \"Études en France\"). Étapes : 1) Inscription sur le site Campus France Gabon. 2) Constitution du dossier pédagogique. 3) Entretien avec un conseiller Campus France. 4) Acceptation par un établissement français. 5) Dépôt de la demande de visa au consulat de France à Libreville. Le VLS-TS mention \"étudiant\" est valable 1 an et renouvelable.",
      },
      {
        title: 'Bourses et aides financières étudiantes',
        detail:
          "Bourses de l'État gabonais : via l'ANBG (Agence Nationale des Bourses du Gabon). Bourses françaises : BCS (Bourse sur critères sociaux, via le CROUS — conditions de revenus). Bourses d'excellence : Eiffel \omain, Erasmus+, bourses régionales. Aide d'urgence : le CROUS peut attribuer une aide ponctuelle en cas de difficultés financières (FNAU). Aide au logement : simulez vos droits APL/ALS sur caf.fr.",
      },
      {
        title: 'Droit au travail étudiant (964 h/an)',
        detail:
          "Les étudiants étrangers sont autorisés à travailler 964 heures par an, soit 60% de la durée légale du travail (environ 20h/semaine). Aucune autorisation de travail supplémentaire n'est nécessaire. ⚠️ Le dépassement du plafond de 964h peut entraîner le non-renouvellement de votre titre de séjour. Les stages conventionnés de plus de 2 mois sont rémunérés (4,35 €/h minimum).",
      },
      {
        title: 'Carte pluriannuelle et ressources minimum',
        detail:
          "Après la 1ère année, vous pouvez obtenir une carte de séjour pluriannuelle (2 à 4 ans). Conditions : assiduité et progression des études, ressources suffisantes (615 €/mois minimum). Justificatifs acceptés : compte bancaire, attestation de bourse, lettre de garant. La carte pluriannuelle simplifie vos démarches et vous évite le renouvellement annuel.",
      },
      {
        title: 'APS — Autorisation Provisoire de Séjour (diplômés)',
        detail:
          "Base juridique : accord franco-gabonais du 5 juillet 2007. Après obtention d'un diplôme de niveau Master ou équivalent en France, vous pouvez demander une APS de 9 mois, renouvelable une fois (18 mois maximum). Droits : rechercher un emploi ou créer une entreprise en lien avec le diplôme, travailler à temps plein. Demande à déposer 2 à 4 mois AVANT l'expiration de votre titre étudiant. Documents : diplôme, relevé de notes, passeport, titre de séjour en cours de validité.",
      },
      {
        title: 'Changement de statut : étudiant → salarié',
        detail:
          "Conditions : emploi en relation avec le diplôme obtenu, rémunération ≥ 1,5x le SMIC (1x SMIC pour les métiers en tension). Procédure : 1) L'employeur dépose une demande d'autorisation de travail auprès de la DREETS. 2) Vous déposez votre demande de changement de statut en préfecture (cerfa n°15187). 3) Instruction : 2 à 4 mois. ⚠️ Commencez les démarches DÈS la promesse d'embauche, avant l'expiration de votre titre.",
      },
      {
        title: 'Logement étudiant (CROUS et alternatives)',
        detail:
          "Le CROUS propose des résidences universitaires à tarif modéré (de 200€ à 500€/mois selon la ville). Inscription via MesServices.etudiant.gouv.fr. Alternatives : résidences privées (Studelites, Nexity), colocation (LaCarteDesColocs), logement intergénérationnel. Le dispositif Visale remplace le garant (gratuit, inscription sur visale.fr).",
      },
    ],
    tips: [
      "L'APS dure 9 mois (renouvelable une fois) — demandez-la AVANT l'expiration de votre titre étudiant",
      "Respectez scrupuleusement le plafond de 964 heures — il est vérifié lors du renouvellement",
      "Le changement de statut étudiant → salarié nécessite un contrat ou une promesse d'embauche",
      "Conservez vos diplômes, relevés de notes et attestations — ils seront exigés pour le changement de statut",
      'Inscrivez-vous au restaurant CROUS (3,30 € le repas) et à la bibliothèque universitaire dès la rentrée',
    ],
    links: [
      { label: 'Campus France', url: 'https://www.campusfrance.org/fr', description: 'Études en France pour les étudiants internationaux' },
      { label: 'MesServices Étudiant', url: 'https://www.messervices.etudiant.gouv.fr', description: 'Bourse, logement CROUS et vie étudiante' },
      { label: 'Service-public.fr — APS', url: 'https://www.service-public.fr/particuliers/vosdroits/F17319', description: 'Autorisation provisoire de séjour' },
      { label: 'Visale', url: 'https://www.visale.fr', description: 'Garantie locative gratuite pour étudiants' },
    ],
  },
  {
    id: 'demarches',
    icon: ClipboardList,
    title: 'Démarches administratives',
    color: 'text-sky-600 dark:text-sky-400',
    iconBg: 'bg-sky-500/10',
    image: '/images/guide-emploi.png',
    intro:
      "Toutes les démarches administratives liées à votre arrivée et votre séjour en France : carte de séjour, validation VLS-TS, changement de statut, perte de documents. Anticipez chaque étape.",
    items: [
      {
        title: 'Première carte de séjour — Procédure OFII',
        detail:
          "À votre arrivée avec un VLS-TS : 1) Validez le visa sur le portail ANEF dans les 3 mois. 2) Payez la taxe OFII (200 € à 400 €). 3) Passez la visite médicale obligatoire (convocation par l'OFII). 4) Signez le CIR : formation civique de 2 jours + test de français. Documents à préparer : passeport, formulaire cerfa n°15614, justificatif de domicile de moins de 3 mois, 3 photos d'identité conformes, timbre fiscal. ⚠️ Le récépissé de première demande NE PERMET PAS de quitter la France et d'y revenir.",
      },
      {
        title: 'Renouvellement de carte de séjour',
        detail:
          "Anticipez : déposez votre demande 2 à 4 mois avant expiration sur le portail ANEF ou en préfecture. Un récépissé de renouvellement sera délivré (valable 3 mois, renouvelable). Ce récépissé vous permet de continuer à travailler et à voyager. Documents : titre de séjour actuel, passeport, justificatif de domicile, justificatif d'activité (contrat de travail, certificat de scolarité), photos.",
      },
      {
        title: 'APS pour diplômés (Master) — Accord franco-gabonais',
        detail:
          "Base juridique : accord franco-gabonais du 5 juillet 2007. L'APS est accordée pour 9 mois, renouvelable une fois (18 mois maximum) aux diplômés de niveau Master. Elle permet de chercher un emploi ou créer une entreprise en lien avec le diplôme. Demande sur le portail ANEF.",
      },
      {
        title: 'Changement de statut : étudiant → salarié',
        detail:
          "Conditions : emploi en rapport avec le diplôme, rémunération ≥ 1,5x SMIC (1x SMIC pour les métiers en tension). Procédure : 1) L'employeur dépose la demande d'autorisation de travail auprès de la DREETS. 2) Vous déposez la demande de changement de statut en préfecture (cerfa n°15187). 3) Instruction : 2 à 4 mois. Pièces complémentaires : diplôme, contrat de travail, fiche de paie si déjà en poste.",
      },
      {
        title: "Document de circulation pour mineur (DCM)",
        detail:
          "Destiné aux mineurs étrangers résidant en France dont les parents sont en situation régulière ou dont l'un est français. Le DCM permet à l'enfant de voyager à l'étranger et de revenir en France sans visa. Validité : 5 ans, renouvelable jusqu'aux 18 ans de l'enfant. Demande en préfecture. ⚠️ À 18 ans, le jeune doit OBLIGATOIREMENT demander un titre de séjour propre.",
      },
      {
        title: "Déclaration de perte ou vol de documents",
        detail:
          "En cas de perte ou vol : 1) Déposez une déclaration au commissariat (récépissé de déclaration de perte/vol). 2) Pour le passeport : rendez-vous au Consulat du Gabon avec le récépissé, 2 photos d'identité et justificatifs d'identité (copie du passeport, acte de naissance). 3) Pour le titre de séjour : rendez-vous en préfecture ou sur le portail ANEF avec le récépissé + justificatif de domicile. Un duplicata sera délivré (délai : 2 à 4 semaines).",
      },
      {
        title: "Changement d'adresse — Obligation légale",
        detail:
          "Tout étranger titulaire d'un titre de séjour doit signaler son changement d'adresse dans les 3 mois suivant le déménagement. Procédure en ligne sur le portail ANEF ou en préfecture. Documents : titre de séjour + nouveau justificatif de domicile. ⚠️ Le non-respect de cette obligation peut entraîner une amende (jusqu'à 750 €) et compliquer le renouvellement de votre titre.",
      },
      {
        title: 'Inscription consulaire',
        detail:
          "Tout Gabonais résidant en France doit s'inscrire au Consulat Général du Gabon à Paris. L'inscription permet : l'obtention de la carte consulaire, la transcription des actes d'état civil, le vote aux élections gabonaises, et la protection consulaire en cas de difficulté. Documents : passeport gabonais, justificatif de domicile, photos d'identité.",
      },
    ],
    tips: [
      'Anticipez toujours le renouvellement de votre titre de séjour — 2 à 4 mois avant expiration',
      'Conservez des copies numériques de TOUS vos documents dans un cloud sécurisé (Google Drive, Dropbox)',
      "Le portail ANEF est l'outil central pour la plupart des démarches de séjour en ligne",
      "Un récépissé de première demande NE PERMET PAS de quitter la France — seul le titre définitif ou le VLS-TS validé le permet",
      "Inscrivez-vous au consulat dès votre arrivée pour bénéficier de la protection consulaire",
    ],
    links: [
      { label: 'Portail ANEF', url: 'https://administration-etrangers-en-france.interieur.gouv.fr', description: 'Démarches de titre de séjour en ligne' },
      { label: 'OFII', url: 'https://www.ofii.fr', description: "Office Français de l'Immigration et de l'Intégration" },
      { label: 'Service-public.fr', url: 'https://www.service-public.fr/particuliers/vosdroits/N19804', description: 'Droits des étrangers en France' },
    ],
  },
  {
    id: 'transport',
    icon: Train,
    title: 'Transport & Mobilité',
    color: 'text-emerald-600 dark:text-emerald-400',
    iconBg: 'bg-emerald-500/10',
    image: '/images/guide-logement.png',
    intro:
      "La France dispose d'un réseau de transports en commun dense et efficace. Comprendre son fonctionnement vous fera gagner du temps et de l'argent dès votre arrivée.",
    items: [
      {
        title: 'Transports en Île-de-France (Paris)',
        detail:
          "Le réseau RATP/SNCF couvre métro, bus, RER et tramway. Le pass Navigo Découverte (5 €) est rechargeable au mois (86,40 €/mois, zones 1-5, tout Île-de-France). Le forfait Imagine R (étudiants de moins de 26 ans) : environ 350 €/an (moitié prix). Les tickets à l'unité coûtent 2,15 € (carnet de 10 : 17,35 €). L'application Île-de-France Mobilités vous guide en temps réel.",
      },
      {
        title: 'Transports en province',
        detail:
          "Chaque ville a son propre réseau (TAN à Nantes, TCL à Lyon, RTM à Marseille). Les tarifs mensuels varient de 30 € à 70 €. Des tarifs réduits existent pour les étudiants, les demandeurs d'emploi et les bénéficiaires de la CSS. Le TER (train régional) relie les villes de la même région.",
      },
      {
        title: 'Trains longue distance (TGV, Intercités)',
        detail:
          "La SNCF opère les TGV (grande vitesse) et les Intercités. Réservez tôt sur sncf-connect.com pour obtenir les meilleurs tarifs. La carte Avantage Jeune (moins de 27 ans, 49 €/an) donne -30% sur tous les trajets. BlaBlaCar est une alternative économique pour les trajets entre villes.",
      },
      {
        title: 'Permis de conduire',
        detail:
          "Le permis de conduire gabonais est reconnu pendant 1 an après votre installation en France. Au-delà, vous devez l'échanger contre un permis français (si convention bilatérale) ou repasser le permis. La demande d'échange se fait sur le portail ANTS (ants.gouv.fr). Le permis international gabonais est valide pour les courts séjours.",
      },
      {
        title: 'Vélo et mobilité douce',
        detail:
          "Les grandes villes offrent des systèmes de vélos en libre-service : Vélib' (Paris), Vélo'v (Lyon), V'Lille (Lille). Abonnement annuel : 30 € à 50 €. Les trottinettes électriques sont réglementées : interdites sur les trottoirs, vitesse max 25 km/h, port du gilet réfléchissant recommandé.",
      },
    ],
    tips: [
      'Téléchargez les applications Citymapper ou Google Maps pour vous orienter dans les transports',
      'Le pass Navigo est rentable dès 3 trajets par jour — privilégiez l\'abonnement mensuel',
      'En cas de contrôle sans titre de transport valide, l\'amende est de 50 € (majorée à 180 €)',
      'Les transports en commun sont gratuits pour les bénéficiaires du RSA en Île-de-France',
    ],
    links: [
      { label: 'RATP', url: 'https://www.ratp.fr', description: 'Transports en commun Paris et Île-de-France' },
      { label: 'SNCF Connect', url: 'https://www.sncf-connect.com', description: 'Réservation de billets de train' },
      { label: 'ANTS', url: 'https://ants.gouv.fr', description: 'Échange de permis de conduire étranger' },
    ],
  },
  {
    id: 'banque',
    icon: CreditCard,
    title: 'Banque & Finances',
    color: 'text-amber-600 dark:text-amber-400',
    iconBg: 'bg-amber-500/10',
    image: '/images/guide-famille.png',
    intro:
      "Ouvrir un compte bancaire est l'une des premières démarches essentielles en France. Sans compte bancaire, impossible de louer un logement, recevoir un salaire ou percevoir des aides.",
    items: [
      {
        title: 'Ouverture de compte bancaire',
        detail:
          "Droit au compte : même sans titre de séjour, la Banque de France peut désigner une banque obligée de vous ouvrir un compte (droit au compte, art. L312-1 du Code monétaire). Banques traditionnelles : BNP Paribas, Société Générale, La Banque Postale (la plus accessible). Néo-banques : Nickel (ouverture en bureau de tabac, 20 €/an), Revolut, N26. Documents requis : pièce d'identité + justificatif de domicile.",
      },
      {
        title: 'Transferts d\'argent vers le Gabon',
        detail:
          "Plusieurs solutions pour envoyer de l'argent au Gabon : Wise (ex-TransferWise) — frais les plus bas, taux de change réel. WorldRemit — retrait en cash ou sur mobile money. Western Union — réseau d'agences au Gabon, frais plus élevés. Orange Money — transfert direct sur mobile money au Gabon. Comparez toujours les frais et le taux de change avant d'envoyer.",
      },
      {
        title: 'Impôts et déclaration fiscale',
        detail:
          "Même sans revenus, vous devez déclarer vos revenus chaque année sur impots.gouv.fr (date limite : mai-juin). La déclaration est obligatoire pour obtenir un avis d'imposition ou de non-imposition, document souvent exigé pour les aides sociales, le logement et le renouvellement du titre de séjour. Les étudiants boursiers et les salariés à faibles revenus peuvent être non-imposables.",
      },
      {
        title: 'Aides sociales et prestations',
        detail:
          "Les principales aides accessibles aux résidents étrangers en situation régulière : APL/ALS (aide au logement, via CAF), Prime d'activité (pour les travailleurs à revenus modestes), RSA (Revenu de Solidarité Active, après 5 ans de résidence régulière), AAH (Allocation Adulte Handicapé). Simulez vos droits sur mes-aides.gouv.fr.",
      },
      {
        title: 'Protection contre les arnaques',
        detail:
          "Soyez vigilant face aux arnaques : ne communiquez jamais vos codes bancaires par téléphone ou email (phishing). La banque ne vous demandera jamais votre mot de passe. En cas de fraude, appelez immédiatement votre banque + déposez plainte en ligne sur pre-plainte-en-ligne.gouv.fr. Le numéro 0 805 805 817 (Info Escroqueries) est gratuit.",
      },
    ],
    tips: [
      'La Banque Postale est souvent la plus accessible pour les primo-arrivants',
      'Ouvrez votre compte bancaire le plus tôt possible — c\'est nécessaire pour le logement et le travail',
      'Déclarez vos impôts même sans revenus — l\'avis de non-imposition ouvre droit à de nombreuses aides',
      'Conservez toujours une photocopie de votre RIB à portée de main',
    ],
    links: [
      { label: 'Banque de France', url: 'https://www.banque-france.fr/fr/a-votre-service/particulier/droit-au-compte', description: 'Droit au compte bancaire' },
      { label: 'Impots.gouv.fr', url: 'https://www.impots.gouv.fr', description: 'Déclaration de revenus en ligne' },
      { label: 'Mes-aides.gouv.fr', url: 'https://www.mes-aides.gouv.fr', description: 'Simulateur de toutes les aides sociales' },
    ],
  },
  {
    id: 'oqtf',
    icon: AlertOctagon,
    title: 'OQTF : comprendre & agir',
    color: 'text-rose-600 dark:text-rose-400',
    iconBg: 'bg-rose-500/10',
    image: '/images/guide-sante.png',
    intro:
      "L'Obligation de Quitter le Territoire Français (OQTF) est une décision administrative grave. Il est essentiel de connaître vos droits, les recours possibles et les conséquences. NE JAMAIS ignorer une OQTF.",
    items: [
      {
        title: "Qu'est-ce qu'une OQTF ?",
        detail:
          "C'est une décision administrative (art. L611-1 du CESEDA) enjoignant un étranger à quitter la France. Deux types : OQTF avec délai de départ volontaire (30 jours pour quitter le territoire) ou OQTF sans délai (départ immédiat, en cas de menace à l'ordre public, risque de fuite, ou refus d'embarquement précédent). Motifs courants : séjour irrégulier, refus de renouvellement de titre, refus de demande d'asile, travail sans autorisation.",
      },
      {
        title: 'Conséquences d\'une OQTF non exécutée',
        detail:
          "Une OQTF non exécutée peut entraîner : une interdiction de retour sur le territoire français (IRTF) de 1 à 3 ans, un signalement au Système d'Information Schengen (SIS) empêchant l'entrée dans tout l'espace Schengen, un placement en centre de rétention administrative (CRA) en vue d'une expulsion forcée. ⚠️ L'OQTF ne disparaît pas si vous ne faites rien — elle reste exécutoire.",
      },
      {
        title: '1. Recours gracieux — auprès du Préfet',
        detail:
          "Délai : 2 mois à compter de la notification. Envoi par lettre recommandée avec accusé de réception au préfet qui a pris la décision. Joignez tous les éléments nouveaux justifiant votre maintien sur le territoire (contrat de travail, scolarisation des enfants, attaches familiales). ⚠️ Ce recours NE SUSPEND PAS l'exécution de l'OQTF.",
      },
      {
        title: "2. Recours hiérarchique — auprès du Ministre de l'Intérieur",
        detail:
          "Délai : 2 mois à compter de la notification. Même procédure que le recours gracieux mais adressé au ministre. ⚠️ Ce recours NE SUSPEND PAS non plus l'exécution de l'OQTF. Il peut être effectué en parallèle du recours contentieux.",
      },
      {
        title: '3. Recours contentieux — Tribunal Administratif (SEUL RECOURS SUSPENSIF)',
        detail:
          "Délai : 30 jours pour une OQTF avec délai de départ, ou 48 heures pour une OQTF sans délai. ✅ C'est le SEUL recours qui SUSPEND l'exécution de l'OQTF jusqu'à la décision du tribunal. L'aide juridictionnelle est accessible (prise en charge des frais d'avocat si revenus modestes). Le tribunal rend sa décision dans un délai de 6 semaines (OQTF avec délai) ou 96 heures (OQTF sans délai). Vous pouvez saisir un avocat spécialisé en droit des étrangers ou contacter la CIMADE/GISTI pour un accompagnement gratuit.",
      },
      {
        title: 'Saisir le Consul Général du Gabon',
        detail:
          "Le consulat peut : 1) Vous orienter vers un avocat spécialisé. 2) Vous aider à constituer votre dossier. 3) Intervenir diplomatiquement dans les cas graves (familles, mineurs, raisons humanitaires). 4) Délivrer un laissez-passer consulaire si le retour est inévitable. Documents à apporter : copie de l'OQTF, copies des recours effectués, pièce d'identité. ⚠️ Le consulat NE PEUT PAS s'opposer juridiquement à une OQTF.",
      },
      {
        title: 'Voies de régularisation',
        detail:
          "Même sous OQTF, des voies de régularisation existent : admission exceptionnelle au séjour (circulaire Valls 2012 — 10 ans de présence, ou 5 ans avec 8 bulletins de salaire), régularisation par le travail (promesse d'embauche et ancienneté de séjour), motif familial (parent d'enfant français, conjoint de Français), raisons médicales (si le traitement n'est pas disponible dans le pays d'origine), protection internationale via l'OFPRA (risque de persécution). Dossier à déposer en préfecture avec toutes les preuves d'insertion.",
      },
      {
        title: 'Prévention : comment éviter une OQTF',
        detail:
          "Les meilleurs remèdes sont préventifs : 1) Renouvelez votre titre de séjour 2 à 4 mois avant expiration. 2) Ne travaillez JAMAIS sans autorisation — le travail non déclaré est un motif courant d'OQTF. 3) Gardez vos documents à jour (adresse, état civil). 4) Répondez à TOUTES les convocations de la préfecture. 5) En cas de difficulté, consultez un avocat AVANT que la situation ne devienne critique.",
      },
    ],
    tips: [
      "NE JAMAIS ignorer une OQTF — elle ne disparaît pas si vous ne faites rien et les conséquences s'aggravent",
      "Consultez IMMÉDIATEMENT un avocat spécialisé en droit des étrangers — le délai de recours est court",
      "Privilégiez TOUJOURS le recours contentieux (tribunal administratif) : c'est le SEUL qui SUSPEND l'exécution",
      "Rassemblez tous les documents prouvant votre ancienneté de séjour et votre insertion (bulletins de salaire, bail, scolarisation des enfants)",
      "Le consulat est là pour vous accompagner — n'hésitez pas à le saisir en parallèle de vos recours juridiques",
    ],
    links: [
      { label: 'CIMADE', url: 'https://www.lacimade.org', description: 'Accompagnement juridique gratuit pour étrangers' },
      { label: 'GISTI', url: 'https://www.gisti.org', description: "Groupe d'information et de soutien des immigrés" },
      { label: 'Aide juridictionnelle', url: 'https://www.service-public.fr/particuliers/vosdroits/F18074', description: "Prise en charge des frais d'avocat" },
      { label: 'Défenseur des droits', url: 'https://www.defenseurdesdroits.fr', description: 'Recours indépendant en cas de litige avec l\'administration' },
    ],
  },
]

// ─── Data: Savoir-vivre ─────────────────────────────────────────────────────
const savoirVivre: SavoirVivreItem[] = [
  { icon: HandHeart, title: 'Respect et courtoisie', description: 'En France, les formules de politesse sont très importantes. Dites "Bonjour" en entrant dans un commerce, "Merci", "S\'il vous plaît", "Excusez-moi". Le vouvoiement est la règle avec les inconnus, les aînés et en contexte professionnel.' },
  { icon: Landmark, title: 'Laïcité et vivre ensemble', description: 'La France est un État laïc. La liberté de culte est garantie, mais la religion relève de la sphère privée. Dans les services publics (école, mairie, hôpital), une attitude neutre est attendue.' },
  { icon: Scale, title: 'Lois et règles de vie', description: 'Le respect des lois est non-négociable : code de la route, interdiction de fumer dans les lieux publics fermés, tri des déchets, respect du voisinage (bruit limité entre 22h et 7h).' },
  { icon: Users, title: 'Relations de voisinage', description: 'Se présenter à ses voisins en emménageant est apprécié. Respectez le règlement de copropriété, les horaires de calme et les espaces communs.' },
  { icon: Flag, title: 'Valeurs de la République', description: 'Liberté, Égalité, Fraternité : ces valeurs sont au cœur de la société française. L\'égalité homme-femme est un droit fondamental. Toute discrimination est punie par la loi.' },
  { icon: HeartHandshake, title: 'Engagement communautaire', description: 'Participer à la vie associative locale facilite l\'intégration et crée un réseau de solidarité. Restez connecté à la communauté gabonaise tout en vous ouvrant à la diversité culturelle française.' },
  { icon: Siren, title: 'Coopération avec les forces de l\'ordre', description: 'En cas d\'arrestation, restez calme et coopérez. Vous avez le droit de connaître le motif, de garder le silence, d\'avoir un avocat, de prévenir un proche et de contacter le consulat (Convention de Vienne, art. 36).' },
]

// ─── Data: Erreurs courantes ────────────────────────────────────────────────
const erreursCourantes: ErreurItem[] = [
  { erreur: 'Laisser expirer son titre de séjour', conseil: 'Lancez le renouvellement 2 à 4 mois avant la date d\'expiration.' },
  { erreur: 'Ne pas souscrire d\'assurance habitation', conseil: 'C\'est obligatoire dès l\'entrée dans le logement. Coût : à partir de 5€/mois.' },
  { erreur: 'Travailler sans autorisation', conseil: 'Le travail non déclaré vous prive de droits et peut entraîner une OQTF.' },
  { erreur: 'Ignorer la déclaration d\'impôts', conseil: 'Même sans revenus, vous devez déclarer chaque année sur impots.gouv.fr.' },
  { erreur: 'Ne pas transcrire les actes d\'état civil', conseil: 'Naissances et mariages en France doivent être transcrits au Consulat.' },
  { erreur: 'Ignorer une OQTF', conseil: 'Consultez immédiatement un avocat. Le recours contentieux est le SEUL suspensif.' },
  { erreur: 'Voyager avec un simple récépissé de première demande', conseil: 'Seul le titre définitif ou le VLS-TS validé permet de quitter la France et d\'y revenir.' },
  { erreur: 'Oublier de signaler un changement d\'adresse', conseil: 'Obligation dans les 3 mois. Amende possible en cas de non-déclaration.' },
  { erreur: 'Signer des documents sans les lire (garde à vue)', conseil: 'Demandez un avocat et ne signez rien sans avoir lu et compris.' },
]

// ─── Data: Numéros utiles ───────────────────────────────────────────────────
const numerosUtiles: NumeroUtile[] = [
  { label: 'Consul Général du Gabon', number: '26 bis av. Raphaël, 75016', color: 'bg-emerald-500/10 text-emerald-600' },
  { label: 'Email Consulat', number: 'contact@consulatdugabon.fr', color: 'bg-emerald-500/10 text-emerald-600' },
  { label: 'Urgence consulaire Gabon', number: '07 44 23 95 84', color: 'bg-green-500/10 text-green-600' },
  { label: 'SAMU (urgences médicales)', number: '15', color: 'bg-red-500/10 text-red-600' },
  { label: 'Police / Gendarmerie', number: '17', color: 'bg-blue-500/10 text-blue-600' },
  { label: 'Pompiers', number: '18', color: 'bg-orange-500/10 text-orange-600' },
  { label: 'Urgences européennes', number: '112', color: 'bg-purple-500/10 text-purple-600' },
  { label: 'Violences femmes info', number: '3919', color: 'bg-pink-500/10 text-pink-600' },
  { label: 'Enfance en danger', number: '119', color: 'bg-yellow-500/10 text-yellow-600' },
  { label: 'OFII', number: '01 53 69 53 70', color: 'bg-indigo-500/10 text-indigo-600' },
  { label: 'Préfecture en ligne (ANEF)', number: 'anef.interieur.gouv.fr', color: 'bg-cyan-500/10 text-cyan-600' },
  { label: 'Aide juridictionnelle', number: '3039', color: 'bg-emerald-500/10 text-emerald-600' },
]

const guideSectionsEn: GuideSection[] = [
  {
    id: 'admission',
    icon: Plane,
    title: 'Admission to France',
    color: 'text-cyan-600 dark:text-cyan-400',
    iconBg: 'bg-cyan-500/10',
    image: '/images/guide-droits.png',
    intro:
      'Before you travel, prepare all required entry documents. A visa alone does not guarantee admission at the border.',
    items: [
      {
        title: 'Visa categories',
        detail:
          'Short-stay visas (Schengen type C) cover tourism and family visits up to 90 days. Long-stay visas (type D / VLS-TS) are for studies, work and family settlement.',
      },
      {
        title: 'Border control checklist',
        detail:
          'Carry a valid passport, valid visa, accommodation proof, return ticket for short stays, travel insurance and proof of financial resources.',
      },
      {
        title: 'Hosting certificate',
        detail:
          'If hosted by a private person, an official hosting certificate issued by the town hall is often required for short-stay applications.',
      },
      {
        title: 'VLS-TS validation',
        detail:
          'After arrival, validate your VLS-TS online within three months through ANEF/OFII procedures to keep your stay regular.',
      },
    ],
    tips: [
      'Keep both paper and digital copies of travel documents',
      'Organize all supporting documents in one folder for border checks',
      'Do not delay VLS-TS validation after arrival',
      'Save emergency contacts before departure',
    ],
    links: [
      { label: 'OFII', url: 'https://www.ofii.fr', description: 'French Office for Immigration and Integration' },
      { label: 'France-Visas', url: 'https://france-visas.gouv.fr', description: 'Official French visa portal' },
      { label: 'ANEF', url: 'https://administration-etrangers-en-france.interieur.gouv.fr', description: 'Foreigners portal in France' },
    ],
  },
  {
    id: 'etudiants',
    icon: UserCheck,
    title: 'Student Life',
    color: 'text-indigo-600 dark:text-indigo-400',
    iconBg: 'bg-indigo-500/10',
    image: '/images/guide-education.png',
    intro:
      'Gabonese students in France have specific rights around work, residence renewal and post-graduation transitions.',
    items: [
      {
        title: 'Campus France pathway',
        detail:
          'Most long-stay student visas are prepared through Campus France, then finalized with the French consular process.',
      },
      {
        title: 'Scholarships and aid',
        detail:
          'You may combine Gabonese or French funding sources depending on eligibility: ANBG, CROUS social grants and emergency support.',
      },
      {
        title: 'Work during studies',
        detail:
          'Students can generally work up to 964 hours per year. Exceeding this limit can affect permit renewal.',
      },
      {
        title: 'After graduation',
        detail:
          'APS and status-change pathways can allow graduates to seek employment or start a business after completing eligible degrees.',
      },
    ],
    tips: [
      'Apply for residence renewal before your current permit expires',
      'Track your annual work hours from your first contract',
      'Keep transcripts and degree certificates ready for status changes',
      'Use CROUS services early (housing, meals, social support)',
    ],
    links: [
      { label: 'Campus France', url: 'https://www.campusfrance.org/fr', description: 'Study in France portal' },
      { label: 'MesServices Étudiant', url: 'https://www.messervices.etudiant.gouv.fr', description: 'Student services (grants and housing)' },
      { label: 'Service-public.fr — APS', url: 'https://www.service-public.fr/particuliers/vosdroits/F17319', description: 'Temporary post-study permit information' },
      { label: 'Visale', url: 'https://www.visale.fr', description: 'Free rental guarantee for eligible profiles' },
    ],
  },
  {
    id: 'demarches',
    icon: ClipboardList,
    title: 'Administrative Procedures',
    color: 'text-sky-600 dark:text-sky-400',
    iconBg: 'bg-sky-500/10',
    image: '/images/guide-emploi.png',
    intro:
      'Your legal stay in France depends on meeting key administrative deadlines and keeping your documents up to date.',
    items: [
      {
        title: 'First residence process',
        detail:
          'Validate your visa on ANEF, pay required taxes, and complete OFII steps where applicable during your first months.',
      },
      {
        title: 'Permit renewal',
        detail:
          'Submit renewal files 2 to 4 months before expiry. Keep your receipt and monitor your online case regularly.',
      },
      {
        title: 'Status changes',
        detail:
          'Switching from student to employee often requires a qualifying job offer, employer procedure, and prefecture submission.',
      },
      {
        title: 'Loss or theft of documents',
        detail:
          'Declare loss/theft immediately, then request replacement through the relevant authority (consulate, prefecture or ANEF).',
      },
    ],
    tips: [
      'Set reminders for every permit and filing deadline',
      'Store scanned copies of all identity and residence records',
      'Use ANEF as the primary channel when available',
      'Always keep proof of submission and receipts',
    ],
    links: [
      { label: 'Portail ANEF', url: 'https://administration-etrangers-en-france.interieur.gouv.fr', description: 'Residence procedures online' },
      { label: 'OFII', url: 'https://www.ofii.fr', description: 'Immigration and integration steps' },
      { label: 'Service-public.fr', url: 'https://www.service-public.fr/particuliers/vosdroits/N19804', description: 'Official guidance for foreigners in France' },
    ],
  },
  {
    id: 'transport',
    icon: Train,
    title: 'Transport & Mobility',
    color: 'text-emerald-600 dark:text-emerald-400',
    iconBg: 'bg-emerald-500/10',
    image: '/images/guide-logement.png',
    intro:
      'Understanding transport systems early will save you time and money, especially in your first months in France.',
    items: [
      {
        title: 'Paris and Ile-de-France',
        detail:
          'Metro, RER, tram and bus networks are extensive. Monthly passes are usually more cost-effective than single tickets for frequent travel.',
      },
      {
        title: 'Other cities',
        detail:
          'Every city has its own operator and fare system. Student and low-income discounts are often available.',
      },
      {
        title: 'Long-distance travel',
        detail:
          'Book trains early on SNCF Connect for better prices. Youth discount cards can reduce costs significantly.',
      },
      {
        title: 'Driving and local mobility',
        detail:
          'Check recognition rules for Gabonese driving licenses and exchange procedures through ANTS when applicable.',
      },
    ],
    tips: [
      'Use route apps (Citymapper/Google Maps) for real-time planning',
      'Keep transport tickets or subscriptions valid to avoid fines',
      'Compare monthly vs. pay-per-trip costs from your first week',
      'Verify local rules for bikes and electric scooters',
    ],
    links: [
      { label: 'RATP', url: 'https://www.ratp.fr', description: 'Public transport in Paris region' },
      { label: 'SNCF Connect', url: 'https://www.sncf-connect.com', description: 'Train booking platform' },
      { label: 'ANTS', url: 'https://ants.gouv.fr', description: 'Driving license administrative services' },
    ],
  },
  {
    id: 'banque',
    icon: CreditCard,
    title: 'Banking & Finances',
    color: 'text-amber-600 dark:text-amber-400',
    iconBg: 'bg-amber-500/10',
    image: '/images/guide-famille.png',
    intro:
      'A French bank account is essential for rent, salaries and benefits. Build financial stability early after arrival.',
    items: [
      {
        title: 'Opening a bank account',
        detail:
          'Traditional and digital options exist. If refused, you may use the legal right-to-an-account procedure through Banque de France.',
      },
      {
        title: 'Money transfers to Gabon',
        detail:
          'Compare providers carefully for fees and exchange rates before each transfer.',
      },
      {
        title: 'Tax obligations',
        detail:
          'Annual tax declaration is required in France, even with low or no income in many cases.',
      },
      {
        title: 'Fraud prevention',
        detail:
          'Never share banking codes by phone or email. In case of fraud, block cards immediately and file a complaint.',
      },
    ],
    tips: [
      'Open your account as soon as you secure accommodation',
      'Keep a copy of your bank details (RIB) ready for procedures',
      'Always compare exchange-rate spread and transfer fees',
      'Activate strong authentication in your banking app',
    ],
    links: [
      { label: 'Banque de France', url: 'https://www.banque-france.fr/fr/a-votre-service/particulier/droit-au-compte', description: 'Right-to-an-account process' },
      { label: 'Impots.gouv.fr', url: 'https://www.impots.gouv.fr', description: 'Tax portal and declarations' },
      { label: 'Mes-aides.gouv.fr', url: 'https://www.mes-aides.gouv.fr', description: 'Social aid simulator' },
    ],
  },
  {
    id: 'oqtf',
    icon: AlertOctagon,
    title: 'OQTF: Understand and Act',
    color: 'text-rose-600 dark:text-rose-400',
    iconBg: 'bg-rose-500/10',
    image: '/images/guide-sante.png',
    intro:
      'An OQTF is a serious administrative decision. Rapid legal action is critical to protect your rights and options.',
    items: [
      {
        title: 'What an OQTF means',
        detail:
          'It is an order to leave France, with or without a voluntary departure period, depending on your case.',
      },
      {
        title: 'Consequences if ignored',
        detail:
          'Ignoring an OQTF can lead to return bans, detention procedures and Schengen-wide consequences.',
      },
      {
        title: 'Appeal routes',
        detail:
          'Administrative and hierarchical appeals exist, but court appeals are often the only suspensive remedy within strict deadlines.',
      },
      {
        title: 'Consular support',
        detail:
          'The consulate can orient you to legal support, help document your case, and coordinate return-related assistance when required.',
      },
    ],
    tips: [
      'Do not wait: legal deadlines can be very short',
      'Prioritize specialized legal counsel in immigration law',
      'Organize all evidence of integration and residence history',
      'Contact the consulate in parallel with legal steps',
    ],
    links: [
      { label: 'CIMADE', url: 'https://www.lacimade.org', description: 'Free legal support for migrants' },
      { label: 'GISTI', url: 'https://www.gisti.org', description: 'Immigration rights resources' },
      { label: 'Aide juridictionnelle', url: 'https://www.service-public.fr/particuliers/vosdroits/F18074', description: 'Legal aid information' },
      { label: 'Défenseur des droits', url: 'https://www.defenseurdesdroits.fr', description: 'Independent rights authority' },
    ],
  },
]

const savoirVivreEn: SavoirVivreItem[] = [
  { icon: HandHeart, title: 'Respect and Courtesy', description: 'Politeness is central in everyday interactions. Greeting, thanking and using respectful language matter.' },
  { icon: Landmark, title: 'Secularism and Social Life', description: 'Public institutions follow secular principles and expect respectful coexistence across beliefs.' },
  { icon: Scale, title: 'Rules of Daily Life', description: 'Traffic, smoking, waste-sorting and neighborhood rules are enforced and should be taken seriously.' },
  { icon: Users, title: 'Neighborhood Relations', description: 'Introducing yourself to neighbors and respecting quiet hours helps your integration.' },
  { icon: Flag, title: 'Republican Values', description: 'Liberty, equality and fraternity are core values. Discrimination is prohibited.' },
  { icon: HeartHandshake, title: 'Community Engagement', description: 'Joining local and diaspora associations builds support networks and opportunities.' },
  { icon: Siren, title: 'Interaction with Law Enforcement', description: 'Stay calm and cooperate. You have legal rights, including lawyer access and consular contact.' },
]

const erreursCourantesEn: ErreurItem[] = [
  { erreur: 'Letting your residence permit expire', conseil: 'Start renewal 2 to 4 months before expiry.' },
  { erreur: 'Not taking home insurance', conseil: 'Insurance is mandatory from move-in and protects your lease.' },
  { erreur: 'Working without authorization', conseil: 'Undeclared work can lead to serious legal and administrative sanctions.' },
  { erreur: 'Ignoring annual tax filing', conseil: 'Declare every year, including low-income years when required.' },
  { erreur: 'Not transcribing civil records', conseil: 'Birth and marriage acts done in France should be transcribed at the consulate.' },
  { erreur: 'Ignoring an OQTF', conseil: 'Get legal counsel immediately. Court deadlines are short and decisive.' },
  { erreur: 'Traveling with first-request receipt only', conseil: 'A first-application receipt may not permit exit/re-entry.' },
  { erreur: 'Not reporting address changes', conseil: 'Address updates are mandatory within legal deadlines.' },
  { erreur: 'Signing documents without reading', conseil: 'Request legal support and never sign unclear records.' },
]

const numerosUtilesEn: NumeroUtile[] = [
  { label: 'Consul General of Gabon', number: '26 bis av. Raphaël, 75016', color: 'bg-emerald-500/10 text-emerald-600' },
  { label: 'Consulate Email', number: 'contact@consulatdugabon.fr', color: 'bg-emerald-500/10 text-emerald-600' },
  { label: 'Gabon Consular Emergency', number: '07 44 23 95 84', color: 'bg-green-500/10 text-green-600' },
  { label: 'SAMU (Medical emergency)', number: '15', color: 'bg-red-500/10 text-red-600' },
  { label: 'Police / Gendarmerie', number: '17', color: 'bg-blue-500/10 text-blue-600' },
  { label: 'Fire Brigade', number: '18', color: 'bg-orange-500/10 text-orange-600' },
  { label: 'European emergency', number: '112', color: 'bg-purple-500/10 text-purple-600' },
  { label: 'Women violence hotline', number: '3919', color: 'bg-pink-500/10 text-pink-600' },
  { label: 'Child protection hotline', number: '119', color: 'bg-yellow-500/10 text-yellow-600' },
  { label: 'OFII', number: '01 53 69 53 70', color: 'bg-indigo-500/10 text-indigo-600' },
  { label: 'Online prefecture (ANEF)', number: 'anef.interieur.gouv.fr', color: 'bg-cyan-500/10 text-cyan-600' },
  { label: 'Legal aid', number: '3039', color: 'bg-emerald-500/10 text-emerald-600' },
]

// ─── Main Page Component ─────────────────────────────────────────────────────

function VenirEnFrancePage() {
  const { t, i18n } = useTranslation()
  const lang = i18n.resolvedLanguage || i18n.language
  const isEn = lang.startsWith('en')
  const tSections = isEn ? guideSectionsEn : guideSections
  const tSavoirVivre = isEn ? savoirVivreEn : savoirVivre
  const tErreurs = isEn ? erreursCourantesEn : erreursCourantes
  const tNumeros = isEn ? numerosUtilesEn : numerosUtiles

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1">

        {/* ── Hero Section ────────────────────────────────────────────────── */}
        <PageHero image="/images/heroes/hero-vie-france.png">
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 backdrop-blur-sm">
                <BookOpen className="w-3.5 h-3.5 mr-1.5" />
                {t('venirFrance.badge', 'Guide d\'arrivée & intégration')}
              </Badge>

              <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4">
                {t('venirFrance.heroTitle', 'Venir en France')}{' '}
                <span className="text-gradient">{t('venirFrance.heroHighlight', '& s\'intégrer')}</span>
              </h1>

              <p className="text-base text-muted-foreground mb-6 max-w-2xl leading-relaxed">
                {t('venirFrance.heroDescription', 'Guide complet pour les Gabonais arrivant en France : admission, visa, démarches administratives, codes culturels et conseils pratiques pour une intégration réussie. Le Consulat Général du Gabon vous accompagne.')}
              </p>

              {/* Quick nav pills */}
              <div className="flex flex-wrap gap-2">
                {tSections.map((s) => {
                  const SIcon = s.icon
                  return (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-background/50 backdrop-blur-sm hover:bg-primary/10 hover:border-primary/30 transition-all text-xs font-medium text-foreground hover:text-primary"
                    >
                      <SIcon className={`w-4 h-4 ${s.color}`} />
                      {s.title}
                    </a>
                  )
                })}
              </div>
        </PageHero>

        {/* ── Savoir-vivre & Conventions ───────────────────────────────────── */}
        <section className="py-24 px-6 bg-muted/20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 bg-background/50 backdrop-blur-sm">
                <HandHeart className="w-3.5 h-3.5 mr-1.5" />
                {t('venirFrance.savoirVivre.badge', 'Savoir-vivre')}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t('venirFrance.savoirVivre.title', 'Codes culturels & Conventions')}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t('venirFrance.savoirVivre.description', 'Comprendre les codes de la société française pour mieux y évoluer. Ce n\'est pas renoncer à sa culture, c\'est en ajouter une autre.')}
              </p>
            </div>

            <SavoirVivreGrid items={tSavoirVivre} />
          </div>
        </section>

        {/* ── Guides thématiques (Cards) ──────────────────────────────────── */}
        <section className="py-16 px-6 bg-background">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                <Shield className="w-3.5 h-3.5 mr-1.5" />
                {t('venirFrance.guides.badge', 'Guides complets')}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t('venirFrance.guides.title', 'Vos démarches détaillées')}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t('venirFrance.guides.description', 'Cliquez sur chaque thème pour découvrir les informations détaillées, les procédures et nos astuces pratiques.')}
              </p>
            </div>

            <div className="space-y-4">
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
                {t('venirFrance.erreurs.badge', 'À savoir absolument')}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t('venirFrance.erreurs.title', 'Erreurs courantes à éviter')}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t('venirFrance.erreurs.description', 'Ces oublis peuvent avoir des conséquences sérieuses. Prenez-les au sérieux pour protéger vos droits.')}
              </p>
            </div>

            <ErreursCourantesGrid items={tErreurs} />
          </div>
        </section>

        {/* ── Numéros utiles ──────────────────────────────────────────────── */}
        <section className="py-24 px-6 bg-muted/20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 bg-background/50 backdrop-blur-sm">
                <Phone className="w-3.5 h-3.5 mr-1.5" />
                {t('venirFrance.numeros.badge', 'Numéros essentiels')}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t('venirFrance.numeros.title', 'Numéros utiles à conserver')}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t('venirFrance.numeros.description', 'Enregistrez ces numéros dans votre téléphone. Ils peuvent sauver des vies.')}
              </p>
            </div>

            <NumerosUtilesGrid items={tNumeros} />
          </div>
        </section>

        {/* ── CTA Final ───────────────────────────────────────────────────── */}
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 dark:bg-primary/10" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-digitalium-blue/20 rounded-full blur-[100px] animate-pulse-glow" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-digitalium-violet/20 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '2s' }} />

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="glass-panel p-10 md:p-16 rounded-3xl border-primary/20 shadow-2xl shadow-primary/5">
              <ShieldCheck className="w-16 h-16 mx-auto mb-6 text-primary" />
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
                {t('venirFrance.cta.title', 'Le Consulat est à vos côtés')}
              </h2>
              <p className="text-muted-foreground mb-10 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                {t('venirFrance.cta.description', 'Que vous soyez sur le point de partir ou nouvellement arrivé, le Consulat Général du Gabon en France est votre relais. N\'hésitez pas à nous solliciter pour toute question.')}
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Button size="lg" className="h-14 px-8 rounded-xl text-base shadow-lg shadow-primary/20" asChild>
                  <a href="tel:+33751025292">
                    <Phone className="w-5 h-5 mr-2" />
                    07 51 02 52 92
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-8 rounded-xl text-base bg-background/50 hover:bg-accent/10 border-foreground/10" asChild>
                  <Link to="/vie-en-france">
                    <ArrowRight className="w-5 h-5 mr-2" />
                    {t('venirFrance.cta.vieFrance', 'Guide de la vie en France')}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <CitizenCTA />

      </div>
    </div>
  )
}
