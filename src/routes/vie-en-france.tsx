import { createFileRoute, Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import {
  Home,
  Heart,
  GraduationCap,
  Briefcase,
  Scale,
  Baby,
  ChevronDown,
  ChevronRight,
  Lightbulb,
  ExternalLink,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Phone,
  BookOpen,
  Shield,
  Building2,
  Plane,
  AlertOctagon,
  UserCheck,
  ClipboardList,
  type LucideIcon,
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PageHero } from '@/components/PageHero'


export const Route = createFileRoute('/vie-en-france')({
  component: VieEnFrancePage,
  head: () => ({
    meta: [
      { title: 'Vie en France — Guide Pratique | Consulat Général du Gabon' },
      {
        name: 'description',
        content:
          'Guide complet pour les Gabonais en France : logement, santé, éducation, emploi, droits de séjour et famille. Toutes les informations pratiques pour votre vie quotidienne.',
      },
    ],
  }),
})

// ─── Types ───────────────────────────────────────────────────────────────────
interface GuideItem {
  title: string
  detail: string
}

interface UsefulLink {
  label: string
  url: string
  description: string
}

interface GuideSection {
  id: string
  icon: LucideIcon
  title: string
  color: string
  iconBg: string
  gradientFrom: string
  gradientTo: string
  intro: string
  items: GuideItem[]
  tips: string[]
  links: UsefulLink[]
}

// ─── Data ────────────────────────────────────────────────────────────────────
const guideSections: GuideSection[] = [
  {
    id: 'logement',
    icon: Home,
    title: 'Logement',
    color: 'text-blue-600 dark:text-blue-400',
    iconBg: 'bg-blue-500/10',
    gradientFrom: 'from-blue-500/5',
    gradientTo: 'to-blue-600/10',
    intro:
      'Trouver un logement en France peut être un défi, surtout sans garant ou historique locatif. Ce guide vous accompagne pas à pas dans la recherche, les aides financières et vos droits en tant que locataire.',
    items: [
      {
        title: 'Recherche de logement',
        detail:
          "Consultez des sites comme LeBonCoin, SeLoger, PAP, ou Jinka. Pour les logements sociaux, déposez une demande sur demande-logement-social.gouv.fr. Les résidences CROUS sont réservées aux étudiants boursiers.",
      },
      {
        title: 'Garantie locative (Visale)',
        detail:
          "Le dispositif Visale (gratuit, géré par Action Logement) se porte garant pour vous auprès du propriétaire. Il est ouvert aux moins de 30 ans, aux salariés en mobilité et aux titulaires d'un bail mobilité. Inscription sur visale.fr.",
      },
      {
        title: 'Aides au logement (APL / ALS)',
        detail:
          "L'APL (Aide Personnalisée au Logement) ou l'ALS (Allocation de Logement Sociale) sont versées par la CAF. Le montant dépend de vos revenus, du loyer et de la zone géographique. Simulez vos droits sur caf.fr.",
      },
      {
        title: 'Droits des locataires',
        detail:
          "Le bail d'habitation est encadré par la loi ALUR. Le propriétaire ne peut pas vous expulser durant la trêve hivernale (1er novembre au 31 mars). Le dépôt de garantie est limité à 1 mois de loyer hors charges pour un logement non meublé.",
      },
      {
        title: "Assurance habitation",
        detail:
          "L'assurance habitation est obligatoire pour tout locataire. Elle couvre les risques locatifs (incendie, dégât des eaux, etc.). Comparez les offres sur LeLynx.fr ou Assurland.com. Comptez entre 10€ et 30€/mois.",
      },
    ],
    tips: [
      'Le dispositif Visale (gratuit, via Action Logement) remplace le garant physique',
      "Ouvrez un compte bancaire français rapidement — c'est indispensable pour le prélèvement du loyer",
      "Souscrivez une assurance habitation obligatoire dès l'entrée dans le logement",
      "Conservez tous vos échanges écrits avec le propriétaire (emails, courriers recommandés)",
    ],
    links: [
      { label: 'CAF — Simulateur APL', url: 'https://www.caf.fr', description: 'Calculez vos droits aux aides au logement' },
      { label: 'Visale', url: 'https://www.visale.fr', description: 'Garantie locative gratuite' },
      { label: 'Demande logement social', url: 'https://www.demande-logement-social.gouv.fr', description: 'Demande de logement HLM' },
    ],
  },
  {
    id: 'sante',
    icon: Heart,
    title: 'Santé & Protection sociale',
    color: 'text-red-600 dark:text-red-400',
    iconBg: 'bg-red-500/10',
    gradientFrom: 'from-red-500/5',
    gradientTo: 'to-red-600/10',
    intro:
      "La France dispose d'un système de santé universel. En tant que résident, vous avez droit à la couverture maladie. Voici comment en bénéficier et naviguer dans le système de soins.",
    items: [
      {
        title: 'Inscription à la Sécurité sociale',
        detail:
          "Dès votre arrivée, inscrivez-vous à la CPAM (Caisse Primaire d'Assurance Maladie) via ameli.fr. Si vous travaillez, votre employeur lance la procédure. Sinon, la PUMA (Protection Universelle Maladie) vous couvre après 3 mois de résidence stable.",
      },
      {
        title: 'Complémentaire santé solidaire (CSS)',
        detail:
          "Ex CMU-C, la CSS est une mutuelle gratuite ou à faible coût pour les revenus modestes. Elle couvre le ticket modérateur, les lunettes, le dentaire et les prothèses auditives. Demande sur ameli.fr.",
      },
      {
        title: 'Médecin traitant',
        detail:
          "Déclarez un médecin traitant auprès de la CPAM pour bénéficier du meilleur remboursement. En cas de difficulté pour en trouver un, consultez les centres de santé municipaux ou les maisons de santé pluriprofessionnelles.",
      },
      {
        title: 'PMI pour enfants',
        detail:
          "La Protection Maternelle et Infantile (PMI) offre des consultations gratuites pour les enfants de 0 à 6 ans : vaccinations, suivi de croissance, conseils de puériculture. Renseignez-vous auprès de votre mairie.",
      },
      {
        title: 'Urgences médicales',
        detail:
          "En cas d'urgence, appelez le 15 (SAMU) ou le 112 (numéro européen). Les urgences hospitalières sont accessibles 24h/24. Pour une consultation sans rendez-vous, les maisons médicales de garde assurent la permanence.",
      },
    ],
    tips: [
      'Conservez toujours sur vous votre carte vitale (ou attestation provisoire)',
      'La téléconsultation est remboursée — pratique quand on ne trouve pas de médecin',
      "Les centres de santé municipaux proposent des consultations sans dépassement d'honoraires",
      "Inscrivez-vous sur Doctolib pour trouver des créneaux de rendez-vous disponibles",
    ],
    links: [
      { label: 'Ameli.fr', url: 'https://www.ameli.fr', description: 'Site officiel de la Sécurité sociale' },
      { label: 'Doctolib', url: 'https://www.doctolib.fr', description: 'Prise de rendez-vous médical en ligne' },
      { label: 'CSS - Complémentaire santé', url: 'https://www.complementaire-sante-solidaire.gouv.fr', description: 'Mutuelle gratuite sous conditions' },
    ],
  },
  {
    id: 'education',
    icon: GraduationCap,
    title: 'Éducation & Formation',
    color: 'text-green-600 dark:text-green-400',
    iconBg: 'bg-green-500/10',
    gradientFrom: 'from-green-500/5',
    gradientTo: 'to-green-600/10',
    intro:
      "Le système éducatif français est accessible à tous les enfants résidant en France, quelle que soit la nationalité. Pour les adultes, de nombreuses formations et dispositifs d'accompagnement existent.",
    items: [
      {
        title: 'Scolarisation des enfants',
        detail:
          "L'instruction est obligatoire de 3 à 16 ans. Inscrivez votre enfant à la mairie de votre domicile, puis contactez l'école. L'inscription ne peut être refusée pour motif de nationalité ou de situation administrative des parents.",
      },
      {
        title: "Inscription à l'université (Parcoursup / Campus France)",
        detail:
          "Les bacheliers résidant en France utilisent Parcoursup (parcoursup.fr) pour candidater. Les étudiants venant du Gabon passent par Campus France (campusfrance.org/fr). Les frais d'inscription varient de 170€ à 601€ selon le niveau.",
      },
      {
        title: 'Bourses et aides financières',
        detail:
          "Le CROUS attribue des bourses sur critères sociaux (BCS) aux étudiants. Les étudiants gabonais peuvent aussi solliciter des bourses de l'État gabonais via l'ANBG. Le montant varie selon l'échelon (0 bis à 7).",
      },
      {
        title: 'Équivalence des diplômes',
        detail:
          "La France ne délivre pas d'équivalence automatique des diplômes étrangers. Demandez une attestation de comparabilité au centre ENIC-NARIC (france-education-international.fr). Délai : environ 4 mois.",
      },
      {
        title: 'Validation des Acquis de l\'Expérience (VAE)',
        detail:
          "Si vous avez au moins 1 an d'expérience, la VAE permet d'obtenir un diplôme reconnu sans retourner en cours. Renseignez-vous sur vae.centre-inffo.fr ou auprès d'un Point Relais Conseil.",
      },
    ],
    tips: [
      'Les cours de français (FLE) sont souvent gratuits dans les associations et les mairies',
      "La carte d'étudiant donne accès à de nombreuses réductions (transport, culture, restauration CROUS)",
      'Les bibliothèques municipales sont gratuites et offrent accès à internet, presse et formations en ligne',
      "Le dispositif OFII propose 400h de cours de français gratuits pour les primo-arrivants",
    ],
    links: [
      { label: 'Parcoursup', url: 'https://www.parcoursup.fr', description: "Plateforme d'admission post-bac" },
      { label: 'Campus France', url: 'https://www.campusfrance.org/fr', description: 'Études en France pour les étudiants internationaux' },
      { label: 'ENIC-NARIC', url: 'https://www.france-education-international.fr', description: 'Reconnaissance des diplômes étrangers' },
    ],
  },
  {
    id: 'emploi',
    icon: Briefcase,
    title: 'Emploi & Entrepreneuriat',
    color: 'text-orange-600 dark:text-orange-400',
    iconBg: 'bg-orange-500/10',
    gradientFrom: 'from-orange-500/5',
    gradientTo: 'to-orange-600/10',
    intro:
      "Travailler en France nécessite un titre de séjour autorisant le travail. Voici les étapes clés pour accéder au marché de l'emploi ou créer votre propre activité.",
    items: [
      {
        title: 'Autorisation de travail',
        detail:
          "Votre titre de séjour doit mentionner l'autorisation de travailler. Les cartes de séjour \"salarié\", \"vie privée et familiale\" et \"étudiant\" (20h/semaine max) permettent de travailler. Vérifiez la mention sur votre titre.",
      },
      {
        title: 'France Travail (ex Pôle Emploi)',
        detail:
          "Inscrivez-vous sur francetravail.fr dès que vous êtes en recherche d'emploi. Vous bénéficierez d'un accompagnement personnalisé, d'offres d'emploi ciblées et potentiellement d'indemnités (ARE) si vous avez cotisé.",
      },
      {
        title: "Création d'auto-entreprise",
        detail:
          "Créez votre auto-entreprise en ligne sur autoentrepreneur.urssaf.fr. Formalités simplifiées, régime fiscal avantageux. Plafond de CA : 77 700€ (services) ou 188 700€ (commerce). Vous pouvez cumuler emploi salarié et auto-entreprise.",
      },
      {
        title: "Aide ACRE",
        detail:
          "L'Aide à la Création ou Reprise d'Entreprise (ACRE) exonère partiellement de charges sociales pendant la première année. Conditions : être demandeur d'emploi, bénéficiaire RSA/ASS, ou avoir moins de 26 ans.",
      },
      {
        title: 'Chambre de commerce (CCI)',
        detail:
          "Les CCI proposent des formations, un accompagnement à la création d'entreprise et des mises en réseau. Des dispositifs spécifiques existent pour les entrepreneurs issus de l'immigration.",
      },
    ],
    tips: [
      "L'aide ACRE exonère de charges sociales la première année de création d'entreprise",
      "Les missions locales accompagnent gratuitement les 16-25 ans dans l'emploi",
      "Attention au travail non déclaré (\"au noir\") : c'est illégal et vous prive de toute protection sociale",
      "Le site 1jeune1solution.gouv.fr recense les offres adaptées aux jeunes",
    ],
    links: [
      { label: 'France Travail', url: 'https://www.francetravail.fr', description: "Recherche d'emploi et accompagnement" },
      { label: 'Auto-entrepreneur', url: 'https://autoentrepreneur.urssaf.fr', description: "Création d'auto-entreprise" },
      { label: '1jeune1solution', url: 'https://www.1jeune1solution.gouv.fr', description: 'Emploi, formation et aides pour les jeunes' },
    ],
  },
  {
    id: 'droits',
    icon: Scale,
    title: 'Droits & Séjour',
    color: 'text-purple-600 dark:text-purple-400',
    iconBg: 'bg-purple-500/10',
    gradientFrom: 'from-purple-500/5',
    gradientTo: 'to-purple-600/10',
    intro:
      "Comprendre vos droits et les démarches liées à votre titre de séjour est essentiel pour vivre sereinement en France. Le non-respect des délais peut entraîner des situations complexes.",
    items: [
      {
        title: 'Titre de séjour',
        detail:
          "Le VLS-TS (Visa Long Séjour valant Titre de Séjour) doit être validé en ligne sur administration-etrangers-en-france.interieur.gouv.fr dans les 3 mois suivant votre arrivée. Le renouvellement se fait 2 à 4 mois avant expiration sur la même plateforme.",
      },
      {
        title: 'Carte de séjour pluriannuelle',
        detail:
          "Après un premier titre d'un an, vous pouvez obtenir une carte pluriannuelle (2 à 4 ans). Les conditions varient selon le motif : salarié, vie privée et familiale, étudiant, passeport talent. Demande en préfecture ou en ligne.",
      },
      {
        title: 'Changement d\'adresse — Obligation légale',
        detail:
          "Tout étranger titulaire d'un titre de séjour doit signaler son changement d'adresse dans les 3 mois. Procédure en ligne sur le portail ANEF ou en préfecture. Documents requis : titre de séjour + nouveau justificatif de domicile. Le non-respect de cette obligation peut entraîner une amende et des complications pour le renouvellement de votre titre.",
      },
      {
        title: 'Régularisation administrative',
        detail:
          "Plusieurs voies de régularisation existent : admission exceptionnelle au séjour (circulaire Valls 2012), régularisation par le travail (promesse d'embauche ou contrat), motif familial (parent d'enfant français, conjoint de Français), raisons médicales, ou protection internationale (OFPRA). Dossier à déposer en préfecture avec preuves d'ancienneté de séjour et d'insertion.",
      },
      {
        title: 'Document de circulation pour mineur (DCME)',
        detail:
          "Les mineurs étrangers résidant en France, dont les parents sont en situation régulière ou dont l'un des parents est français, peuvent obtenir un DCME à la préfecture. Ce document leur permet de voyager à l'étranger et de revenir en France sans visa. Prévoir : acte de naissance, passeport de l'enfant, titre de séjour des parents, certificat de scolarité.",
      },
      {
        title: 'Binationaux (Franco-Gabonais)',
        detail:
          "Le Gabon ne reconnaît pas officiellement la double nationalité (sauf exceptions), mais en pratique de nombreux Gabonais possèdent les deux nationalités. Un visa est nécessaire pour entrer au Gabon avec un passeport français (e-Visa sur evisa.dgdi.ga). Conseil : entrez et sortez de France avec votre passeport français, et entrez au Gabon avec votre passeport gabonais.",
      },
      {
        title: 'Regroupement familial',
        detail:
          "Vous pouvez faire venir votre conjoint et enfants mineurs si vous résidez régulièrement en France depuis au moins 18 mois, disposez de revenus stables (au moins le SMIC) et d'un logement adapté. Demande auprès de l'OFII.",
      },
      {
        title: 'Naturalisation',
        detail:
          "Après 5 ans de résidence régulière (réduit à 2 ans pour les diplômés de l'enseignement supérieur français), vous pouvez demander la naturalisation. Conditions : maîtrise du français (B1 oral), connaissance de l'histoire et des valeurs, casier vierge.",
      },
      {
        title: 'Aide juridictionnelle',
        detail:
          "Si vos revenus sont modestes, l'aide juridictionnelle prend en charge tout ou partie de vos frais d'avocat. Demande au tribunal judiciaire de votre domicile. Aussi : le défenseur des droits (defenseurdesdroits.fr) est gratuit et indépendant.",
      },
    ],
    tips: [
      'Gardez toujours une copie numérique de vos documents (passeport, titre de séjour, bail) dans un cloud sécurisé',
      'Ne laissez jamais votre titre de séjour expirer — même en cas de retard de la préfecture, conservez votre récépissé',
      "Les associations comme la CIMADE, le GISTI ou la Ligue des droits de l'Homme peuvent vous aider gratuitement",
      "En cas de contrôle d'identité, vous devez présenter votre titre de séjour ou récépissé",
      "Tout changement d'adresse doit être signalé dans les 3 mois — l'oubli peut coûter cher",
      "Les binationaux doivent toujours voyager avec le passeport du pays dans lequel ils entrent",
    ],
    links: [
      { label: 'ANEF - Étrangers en France', url: 'https://administration-etrangers-en-france.interieur.gouv.fr', description: 'Démarches de titre de séjour en ligne' },
      { label: 'Défenseur des droits', url: 'https://www.defenseurdesdroits.fr', description: 'Recours gratuit en cas de discrimination' },
      { label: 'CIMADE', url: 'https://www.lacimade.org', description: 'Accompagnement juridique gratuit' },
      { label: 'e-Visa Gabon', url: 'https://evisa.dgdi.ga', description: 'Visa en ligne pour le Gabon' },
      { label: 'Service-public.fr — DCME', url: 'https://www.service-public.fr/particuliers/vosdroits/F2710', description: 'Document de circulation pour mineur' },
    ],
  },
  {
    id: 'famille',
    icon: Baby,
    title: 'Famille & Enfants',
    color: 'text-pink-600 dark:text-pink-400',
    iconBg: 'bg-pink-500/10',
    gradientFrom: 'from-pink-500/5',
    gradientTo: 'to-pink-600/10',
    intro:
      "La France offre un système de prestations familiales parmi les plus généreux au monde. En tant que parent résidant en France, vous avez droit à de nombreuses aides et services pour votre famille.",
    items: [
      {
        title: 'Déclaration de naissance',
        detail:
          "Toute naissance sur le sol français doit être déclarée en mairie dans les 5 jours. Présentez le certificat d'accouchement de l'hôpital, vos pièces d'identité et votre livret de famille. N'oubliez pas de faire transcrire l'acte au consulat.",
      },
      {
        title: 'Transcription au consulat',
        detail:
          "L'acte de naissance français doit être transcrit au registre d'état civil gabonais via le consulat. C'est indispensable pour que votre enfant obtienne la nationalité gabonaise et un passeport gabonais. Délai : environ 3 mois.",
      },
      {
        title: 'Allocations familiales (CAF)',
        detail:
          "Dès le 2e enfant à charge, vous percevez les allocations familiales (sans condition de ressources). La prime à la naissance (1 003,95€) est versée au 7e mois de grossesse sous condition de ressources. Inscrivez-vous sur caf.fr.",
      },
      {
        title: "PAJE — Prestation d'accueil du jeune enfant",
        detail:
          "La PAJE comprend : la prime à la naissance, l'allocation de base mensuelle, et le complément libre choix du mode de garde (CMG) pour financer crèche ou assistante maternelle. Demande auprès de la CAF.",
      },
      {
        title: 'Modes de garde',
        detail:
          "Crèche municipale (inscription en mairie dès la grossesse), assistante maternelle agréée (liste sur mon-enfant.fr), ou garde à domicile. Le CMG couvre une partie des frais. Les Relais Petite Enfance (RPE) vous informent gratuitement.",
      },
    ],
    tips: [
      "Déclarez la naissance en mairie ET au consulat pour que votre enfant ait la double nationalité",
      "Inscrivez-vous à la CAF dès votre arrivée en France, même sans enfant — d'autres aides existent (APL, prime d'activité)",
      "Les centres de PMI offrent un suivi gratuit pour les enfants de 0 à 6 ans",
      "Le congé paternité est de 28 jours (dont 7 obligatoires) depuis 2021",
    ],
    links: [
      { label: 'CAF', url: 'https://www.caf.fr', description: 'Allocations familiales et aides sociales' },
      { label: 'Mon-enfant.fr', url: 'https://www.mon-enfant.fr', description: 'Trouver un mode de garde près de chez vous' },
      { label: 'Service-public.fr — Famille', url: 'https://www.service-public.fr/particuliers/vosdroits/N156', description: 'Droits et démarches familiales' },
    ],
  },
  {
    id: 'demarches',
    icon: ClipboardList,
    title: 'Démarches en France',
    color: 'text-sky-600 dark:text-sky-400',
    iconBg: 'bg-sky-500/10',
    gradientFrom: 'from-sky-500/5',
    gradientTo: 'to-sky-600/10',
    intro:
      "Toutes les démarches administratives liées à votre séjour en France : carte de séjour, régularisation, changement de statut, perte de documents… Le consulat vous accompagne et vous oriente.",
    items: [
      {
        title: 'Régularisation administrative',
        detail:
          "Plusieurs voies existent : admission exceptionnelle au séjour (circulaire Valls 2012), régularisation par le travail (promesse d'embauche ou contrat), motif familial (parent d'enfant français, conjoint de Français), raisons médicales (traitement indisponible au Gabon), protection internationale (OFPRA). Dossier à déposer en préfecture ou sur le portail ANEF. Délai moyen : 3 à 6 mois.",
      },
      {
        title: 'Première carte de séjour — Procédure OFII',
        detail:
          "À votre arrivée avec un VLS-TS : 1) Validez le visa sur le site de l'OFII dans les 3 mois. 2) Payez la taxe OFII (200 € à 400 €). 3) Passez la visite médicale obligatoire. 4) Signez le Contrat d'Intégration Républicaine (CIR) qui comprend une formation civique et linguistique. Documents : passeport, formulaire cerfa n°15614, justificatif de domicile, photos, timbre fiscal.",
      },
      {
        title: 'Renouvellement de carte de séjour',
        detail:
          "Anticipez : déposez votre demande 2 à 4 mois avant expiration, en ligne sur le portail ANEF ou en préfecture. Un récépissé vous sera délivré en attendant la nouvelle carte — il vaut titre de séjour provisoire. Documents : carte en cours/expirée, passeport valide, justificatifs de domicile récents, justificatifs selon le motif, timbres fiscaux, photos.",
      },
      {
        title: 'APS pour diplômés (Master)',
        detail:
          "L'Autorisation Provisoire de Séjour est accordée pour 12 mois (non renouvelable) aux diplômés de niveau Master. Elle permet de chercher un emploi ou créer une entreprise en lien avec le diplôme. Droit de travailler à temps plein. Important : faites la demande AVANT l'expiration de votre titre étudiant. Documents : titre étudiant, diplôme Master, justificatif de domicile.",
      },
      {
        title: 'Changement de statut : étudiant → salarié',
        detail:
          "Conditions : emploi en rapport avec le diplôme, rémunération ≥ 1,5x SMIC (1x SMIC pour les métiers en tension). Procédure : 1) L'employeur dépose la demande d'autorisation de travail sur la plateforme du ministère. 2) Vous déposez la demande de changement de statut en préfecture (cerfa n°15187). 3) Instruction : 2 à 4 mois. 4) Délivrance d'un titre \"salarié\" ou \"travailleur temporaire\".",
      },
      {
        title: 'Document de circulation pour mineur (DCME)',
        detail:
          "Destiné aux mineurs étrangers résidant en France dont les parents sont en situation régulière ou dont l'un est français. Le DCME permet au mineur de voyager à l'étranger et de revenir en France sans visa. Documents : acte de naissance, passeport de l'enfant, titre de séjour des parents, justificatif de domicile, certificat de scolarité, photos. Délai : 1 à 2 mois.",
      },
      {
        title: 'Déclaration de perte de documents',
        detail:
          "En cas de perte ou vol de passeport, titre de séjour ou carte consulaire : 1) Déclaration au commissariat (récépissé). 2) Pour le passeport : rendez-vous au consulat avec récépissé + photos + justificatifs d'identité. 3) Pour le titre de séjour : rendez-vous à la préfecture/ANEF avec le récépissé. Conseil : conservez TOUJOURS des copies papier ET numériques de vos documents.",
      },
      {
        title: 'Changement d\'adresse (obligatoire)',
        detail:
          "Tout étranger titulaire d'un titre de séjour doit signaler son changement d'adresse dans les 3 mois, en ligne sur le portail ANEF ou en préfecture. Documents : titre de séjour + nouveau justificatif de domicile. Attention : le non-respect peut entraîner une amende et des complications lors du renouvellement de votre titre de séjour.",
      },
      {
        title: 'Visa binationaux (Franco-Gabonais)',
        detail:
          "Le Gabon ne reconnaît pas officiellement la double nationalité (sauf exceptions), mais en pratique de nombreux Gabonais possèdent les deux nationalités. Un visa est nécessaire pour entrer au Gabon avec un passeport français — obtenez-le en e-Visa sur evisa.dgdi.ga ou au consulat. Conseil : entrez et sortez de France avec le passeport français, entrez au Gabon avec le passeport gabonais.",
      },
      {
        title: 'Assistance en cas d\'arrestation',
        detail:
          "Vos droits : connaître le motif, garder le silence, avoir un avocat (commis d'office si nécessaire), prévenir un proche, contacter le consulat (Convention de Vienne, art. 36), demander un interprète, examen médical. Garde à vue : 24h max, renouvelable une fois (48h). Le consulat peut vous rendre visite, vérifier vos conditions de détention et vous mettre en relation avec un avocat. Numéro d'urgence : 07 44 23 95 84.",
      },
    ],
    tips: [
      'Anticipez toujours le renouvellement de votre titre de séjour — 2 à 4 mois avant expiration',
      'Conservez des copies numériques de TOUS vos documents dans un cloud sécurisé',
      'Le portail ANEF est l\'outil central pour la plupart des démarches de séjour en ligne',
      'En cas d\'arrestation, demandez immédiatement à contacter le consulat',
      'Les étudiants doivent demander l\'APS AVANT l\'expiration de leur titre étudiant',
      'Tout changement d\'adresse doit être déclaré dans les 3 mois — sous peine d\'amende',
    ],
    links: [
      { label: 'Portail ANEF', url: 'https://administration-etrangers-en-france.interieur.gouv.fr', description: 'Démarches de titre de séjour en ligne' },
      { label: 'OFII', url: 'https://www.ofii.fr', description: 'Office Français de l\'Immigration et de l\'Intégration' },
      { label: 'Service-public.fr', url: 'https://www.service-public.fr/particuliers/vosdroits/N19804', description: 'Droits des étrangers en France' },
      { label: 'CIMADE', url: 'https://www.lacimade.org', description: 'Accompagnement juridique gratuit' },
      { label: 'e-Visa Gabon', url: 'https://evisa.dgdi.ga', description: 'Visa en ligne pour le Gabon' },
      { label: 'Consulat.ga', url: 'https://consulat.ga', description: 'Site officiel du Consulat du Gabon' },
    ],
  },
  {
    id: 'admission',
    icon: Plane,
    title: 'Admission en France',
    color: 'text-cyan-600 dark:text-cyan-400',
    iconBg: 'bg-cyan-500/10',
    gradientFrom: 'from-cyan-500/5',
    gradientTo: 'to-cyan-600/10',
    intro:
      "Avant de voyager, assurez-vous de disposer de tous les documents requis à la frontière. Le visa ne garantit pas automatiquement l'entrée sur le territoire français.",
    items: [
      {
        title: 'Documents obligatoires à la frontière',
        detail:
          "Vous devez présenter : un passeport en cours de validité, un visa (court ou long séjour selon le motif), une attestation d'hébergement ou réservation d'hôtel, un billet d'avion retour (court séjour), une assurance voyage couvrant les frais médicaux (minimum 30 000 €).",
      },
      {
        title: 'Justificatifs de ressources financières',
        detail:
          "Vous devez justifier de ressources suffisantes : minimum 120 €/jour si vous êtes hébergé à l'hôtel, ou 32,50 €/jour si vous êtes hébergé par un particulier titulaire d'une attestation d'accueil. Présentez des relevés bancaires récents.",
      },
      {
        title: 'Refus d\'entrée : que faire ?',
        detail:
          "La police aux frontières peut refuser l'entrée même avec un visa valide. En cas de refus, un recours est possible auprès du tribunal administratif dans les 48 heures. Conservez tous les documents remis par la police aux frontières.",
      },
      {
        title: 'Première démarche OFII à l\'arrivée',
        detail:
          "Si vous avez un VLS-TS (visa long séjour valant titre de séjour), validez-le sur le site de l'OFII dans les 3 mois suivant l'arrivée. Payez la taxe OFII (200 € à 400 €), passez la visite médicale obligatoire et signez le Contrat d'Intégration Républicaine (CIR).",
      },
    ],
    tips: [
      'Imprimez tous vos documents de voyage — ne comptez pas uniquement sur les versions numériques',
      'Arrivez à la frontière avec vos justificatifs de ressources, hébergement et assurance facilement accessibles',
      'Le CIR comprend une formation civique et linguistique obligatoire — planifiez votre emploi du temps en conséquence',
      'Conservez une copie de votre visa et de votre passeport dans un cloud sécurisé',
    ],
    links: [
      { label: 'OFII', url: 'https://www.ofii.fr', description: 'Office Français de l\'Immigration et de l\'Intégration' },
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
    gradientFrom: 'from-indigo-500/5',
    gradientTo: 'to-indigo-600/10',
    intro:
      "Les étudiants gabonais en France bénéficient de droits spécifiques : droit au travail, carte pluriannuelle, et Autorisation Provisoire de Séjour après le diplôme.",
    items: [
      {
        title: 'Visa étudiant et procédure Campus France',
        detail:
          "Le visa étudiant long séjour est obtenu via Campus France (procédure \"Études en France\"). Le VLS-TS mention \"étudiant\" est valable 1 an et renouvelable. Après la 1ère année, vous pouvez obtenir une carte de séjour pluriannuelle (2 à 4 ans).",
      },
      {
        title: 'Droit au travail étudiant (964 h/an)',
        detail:
          "Les étudiants étrangers sont autorisés à travailler 964 heures par an, soit 60% de la durée légale du travail. Aucune autorisation de travail supplémentaire n'est nécessaire. Cela représente environ 20 heures par semaine.",
      },
      {
        title: 'Carte pluriannuelle et ressources minimum',
        detail:
          "Conditions pour la carte pluriannuelle : assiduité et progression des études, ressources suffisantes (615 €/mois minimum). Ce montant peut être justifié par un compte bancaire, une attestation de bourse ou un garant.",
      },
      {
        title: 'APS — Autorisation Provisoire de Séjour (diplômés)',
        detail:
          "Après obtention d'un diplôme de niveau Master ou équivalent en France, vous pouvez demander une APS de 12 mois (non renouvelable). Elle vous permet de rechercher un emploi ou créer une entreprise en lien avec votre diplôme, avec droit de travailler à temps plein.",
      },
      {
        title: 'Changement de statut : étudiant → salarié',
        detail:
          "Conditions : emploi en relation avec le diplôme obtenu, rémunération ≥ 1,5x le SMIC (1x SMIC pour les métiers en tension). L'employeur dépose une demande d'autorisation de travail, puis vous déposez votre demande de changement de statut en préfecture. Délai : 2 à 4 mois.",
      },
    ],
    tips: [
      'Demandez l\'APS AVANT l\'expiration de votre titre de séjour étudiant',
      'Les 964 heures de travail autorisées se calculent sur l\'année civile du titre de séjour',
      'Le changement de statut étudiant → salarié nécessite un contrat ou une promesse d\'embauche',
      'Conservez vos diplômes, relevés de notes et attestations — ils seront exigés pour le changement de statut',
    ],
    links: [
      { label: 'Campus France', url: 'https://www.campusfrance.org/fr', description: 'Études en France pour les étudiants internationaux' },
      { label: 'MesServices Étudiant', url: 'https://www.messervices.etudiant.gouv.fr', description: 'Bourse, logement CROUS et vie étudiante' },
      { label: 'Service-public.fr — APS', url: 'https://www.service-public.fr/particuliers/vosdroits/F17319', description: 'Autorisation provisoire de séjour' },
    ],
  },
  {
    id: 'oqtf',
    icon: AlertOctagon,
    title: 'OQTF : que faire ?',
    color: 'text-rose-600 dark:text-rose-400',
    iconBg: 'bg-rose-500/10',
    gradientFrom: 'from-rose-500/5',
    gradientTo: 'to-rose-600/10',
    intro:
      "L'Obligation de Quitter le Territoire Français (OQTF) est une décision grave. Il est essentiel de connaître vos droits et les recours possibles. NE JAMAIS ignorer une OQTF.",
    items: [
      {
        title: 'Qu\'est-ce qu\'une OQTF ?',
        detail:
          "C'est une décision administrative enjoignant un étranger à quitter la France dans un délai de 30 jours (ou sans délai dans certains cas). Motifs : séjour irrégulier, refus de renouvellement de titre, refus de demande d'asile, menace à l'ordre public.",
      },
      {
        title: 'Recours possibles',
        detail:
          "Recours gracieux auprès du préfet (dans les 30 jours). Recours contentieux devant le tribunal administratif (30 jours, ou 48h si OQTF sans délai). Le recours est suspensif — l'exécution de l'OQTF est suspendue pendant l'examen. L'aide juridictionnelle est accessible.",
      },
      {
        title: 'Rôle du consulat',
        detail:
          "Le consulat peut vous accompagner en vous informant sur vos droits et en vous orientant vers une aide juridique. Le consulat NE PEUT PAS s'opposer juridiquement à une OQTF. Contactez-le pour un accompagnement et une mise en relation avec un avocat spécialisé.",
      },
      {
        title: 'Régularisation administrative',
        detail:
          "Plusieurs options existent : admission exceptionnelle au séjour (circulaire Valls 2012), régularisation par le travail (promesse d'embauche/contrat), motif familial (parent d'enfant français, conjoint de Français), raisons médicales, ou protection internationale via l'OFPRA.",
      },
      {
        title: 'Documents à rassembler',
        detail:
          "Passeport valide ou périmé, justificatifs de domicile (3 derniers mois), photos d'identité (normes ANTS), preuves de présence en France (avis d'imposition, attestations médicales, courriers administratifs), justificatifs selon le motif (contrat de travail, acte de naissance d'enfant français, etc.).",
      },
    ],
    tips: [
      'NE JAMAIS ignorer une OQTF — elle ne disparaît pas si vous ne faites rien',
      'Consultez IMMÉDIATEMENT un avocat spécialisé en droit des étrangers',
      'Rassemblez tous les documents prouvant votre ancienneté de séjour et votre insertion en France',
      'Le dépôt du dossier de régularisation se fait à la préfecture ou en ligne sur administration-etrangers-en-france.interieur.gouv.fr',
    ],
    links: [
      { label: 'CIMADE', url: 'https://www.lacimade.org', description: 'Accompagnement juridique gratuit pour étrangers' },
      { label: 'GISTI', url: 'https://www.gisti.org', description: 'Groupe d\'information et de soutien des immigrés' },
      { label: 'Aide juridictionnelle', url: 'https://www.service-public.fr/particuliers/vosdroits/F18074', description: 'Prise en charge des frais d\'avocat' },
    ],
  },
]

// ─── Components ──────────────────────────────────────────────────────────────

function SectionNav({
  sections,
  activeSection,
  onSelect,
}: {
  sections: GuideSection[]
  activeSection: string
  onSelect: (id: string) => void
}) {
  return (
    <nav className="hidden lg:block sticky top-24 space-y-1">
      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
        Rubriques
      </h3>
      {sections.map((section) => {
        const Icon = section.icon
        const isActive = section.id === activeSection
        return (
          <button
            key={section.id}
            onClick={() => onSelect(section.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-sm font-medium transition-all ${
              isActive
                ? 'bg-primary/10 text-primary shadow-sm glass-border'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            <span className={`p-1.5 rounded-lg ${isActive ? section.iconBg : 'bg-muted/50'}`}>
              <Icon className={`w-4 h-4 ${isActive ? section.color : ''}`} />
            </span>
            {section.title}
          </button>
        )
      })}
    </nav>
  )
}

function GuideAccordionItem({
  item,
  isOpen,
  onToggle,
  color,
}: {
  item: GuideItem
  isOpen: boolean
  onToggle: () => void
  color: string
}) {
  return (
    <div className="border border-border/60 rounded-xl overflow-hidden transition-all hover:border-border">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          <CheckCircle2 className={`w-5 h-5 ${color} shrink-0`} />
          <span className="font-medium text-foreground">{item.title}</span>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div className="px-4 pb-4 pt-0">
          <div className="pl-8">
            <p className="text-sm text-muted-foreground leading-relaxed">{item.detail}</p>
          </div>
        </div>
      )}
    </div>
  )
}

function GuideSectionCard({ section }: { section: GuideSection }) {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set())

  const toggleItem = (index: number) => {
    setOpenItems((prev) => {
      const next = new Set(prev)
      if (next.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
      }
      return next
    })
  }

  const Icon = section.icon

  return (
    <div id={section.id} className="scroll-mt-24">
      <div className="overflow-hidden glass-card rounded-2xl">
        {/* Section Header */}
        <div
          className={`bg-gradient-to-r ${section.gradientFrom} ${section.gradientTo} p-6 md:p-8 border-b border-border/40`}
        >
          <div className="flex items-start gap-4">
            <div
              className={`p-3 rounded-2xl ${section.iconBg} shrink-0 backdrop-blur-sm`}
            >
              <Icon className={`w-7 h-7 ${section.color}`} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">{section.title}</h2>
              <p className="text-muted-foreground leading-relaxed">{section.intro}</p>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-6">
          {/* Accordion Items */}
          <div className="space-y-3">
            {section.items.map((item, index) => (
              <GuideAccordionItem
                key={item.title}
                item={item}
                isOpen={openItems.has(index)}
                onToggle={() => toggleItem(index)}
                color={section.color}
              />
            ))}
          </div>

          {/* Tips */}
          <div className="rounded-xl bg-amber-500/5 border border-amber-500/20 p-5 glass-panel">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-5 h-5 text-amber-500" />
              <h4 className="font-semibold text-foreground text-sm">Conseils pratiques</h4>
            </div>
            <ul className="space-y-2">
              {section.tips.map((tip) => (
                <li
                  key={tip}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <ChevronRight className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              Liens utiles
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {section.links.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col p-3 rounded-xl border border-border/60 hover:border-primary/30 hover:bg-primary/5 transition-all text-left"
                >
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {link.label}
                  </span>
                  <span className="text-xs text-muted-foreground mt-1">{link.description}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-muted-foreground/50 mt-2 group-hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

function VieEnFrancePage() {
  const { t } = useTranslation()
  const [activeSection, setActiveSection] = useState(guideSections[0].id)

  const scrollToSection = (id: string) => {
    setActiveSection(id)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <PageHero image="/images/heroes/hero-vie-france.png">
            <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
              <BookOpen className="w-3.5 h-3.5 mr-1.5" />
              {t('vieFrance.badge', 'Guide Pratique')}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              {t('vieFrance.title', 'Vivre en France')}{' '}
              <span className="text-gradient">
                {t('vieFrance.titleHighlight', 'en toute sérénité')}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
              {t(
                'vieFrance.subtitle',
                'Toutes les informations essentielles pour votre installation et votre vie quotidienne en France. Le Consulat vous accompagne dans chaque étape.'
              )}
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-foreground/80">
                <BookOpen className="w-5 h-5 text-primary" />
                <span className="font-medium">10 rubriques thématiques</span>
              </div>
              <div className="flex items-center gap-2 text-foreground/80">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span className="font-medium">50+ démarches détaillées</span>
              </div>
              <div className="flex items-center gap-2 text-foreground/80">
                <ExternalLink className="w-5 h-5 text-blue-500" />
                <span className="font-medium">Liens officiels vérifiés</span>
              </div>
            </div>
      </PageHero>

      {/* Mobile Section Navigation */}
      <div className="lg:hidden sticky top-16 z-30 bg-background/80 backdrop-blur-md border-b border-border/50 px-4 py-3">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {guideSections.map((section) => {
            const Icon = section.icon
            return (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`shrink-0 flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium transition-all ${
                  activeSection === section.id
                    ? 'bg-primary/10 text-primary border border-primary/20'
                    : 'bg-muted/50 text-muted-foreground border border-transparent'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {section.title}
              </button>
            )
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
                sections={guideSections}
                activeSection={activeSection}
                onSelect={scrollToSection}
              />
            </div>

            {/* Content */}
            <div className="flex-1 space-y-8">
              {guideSections.map((section) => (
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
                  <h3 className="text-lg font-bold text-foreground">Numéros d'urgence</h3>
                  <p className="text-sm text-muted-foreground">
                    À conserver dans votre téléphone
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { number: '15', label: 'SAMU — Urgences médicales' },
                  { number: '17', label: 'Police — Secours' },
                  { number: '18', label: 'Pompiers' },
                  { number: '112', label: 'Numéro européen d\'urgence' },
                  { number: '114', label: 'Urgences par SMS (sourds/malentendants)' },
                  { number: '07 44 23 95 84', label: 'Urgence consulaire Gabon 24h/24' },
                ].map((item) => (
                  <div
                    key={item.number}
                    className="flex items-center gap-3 p-3 rounded-xl bg-background/50 border border-border/60 hover:bg-background/80 transition-colors"
                  >
                    <Phone className="w-4 h-4 text-red-500 shrink-0" />
                    <div>
                      <p className="font-bold text-foreground text-sm">{item.number}</p>
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-8 md:p-14 rounded-3xl glass-panel relative overflow-hidden">
             {/* Gradient glow */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <Building2 className="w-12 h-12 text-primary mx-auto mb-6" />
              <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
                Le Consulat est à vos côtés
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8 text-lg">
                Que vous soyez nouvellement arrivé ou installé depuis longtemps, le Consulat Général du
                Gabon en France est votre relais. N'hésitez pas à nous solliciter pour toute question.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="h-12 px-8 rounded-xl shadow-lg shadow-primary/20">
                  <Link to="/contact">
                    <MapPin className="w-5 h-5 mr-2" />
                    Nous rendre visite
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 px-8 rounded-xl bg-background/50 hover:bg-accent/10"
                >
                  <Link to="/integration">
                    <ArrowRight className="w-5 h-5 mr-2" />
                    Guide d'intégration
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
