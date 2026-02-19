import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import {
  Home,
  Heart,
  GraduationCap,
  Briefcase,
  Scale,
  Baby,
  BookOpen,
  ExternalLink,

  CheckCircle2,
  Phone,
  Shield,

  Receipt,
  ShieldAlert,
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'

import { PageHero } from '@/components/PageHero'
import { CitizenCTA } from '@/components/home/CitizenCTA'
import { GuideSectionCard, SectionNav, type GuideSection } from '@/components/guides'
import i18n from '@/integrations/i18n/i18n'


export const Route = createFileRoute('/vie-en-france')({
  component: VieEnFrancePage,
  head: () => {
    const isEn = (i18n.resolvedLanguage || i18n.language).startsWith('en')
    return {
      meta: [
        {
          title: isEn
            ? 'Living in France — Practical Guide | General Consulate of Gabon'
            : 'Vie en France — Guide Pratique | Consulat Général du Gabon',
        },
        {
          name: 'description',
          content: isEn
            ? 'Comprehensive guide for Gabonese nationals in France: housing, health, education, employment, residency rights, family and daily-life procedures.'
            : 'Guide complet pour les Gabonais en France : logement, santé, éducation, emploi, droits de séjour et famille. Toutes les informations pratiques pour votre vie quotidienne.',
        },
      ],
    }
  },
})

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
    image: '/images/guide-logement.png',
    intro:
      'Trouver un logement en France peut être un défi, surtout sans garant ou historique locatif. Ce guide vous accompagne pas à pas dans la recherche, les aides financières et vos droits en tant que locataire.',
    items: [
      {
        title: 'Recherche de logement',
        detail:
          "Sites incontournables : LeBonCoin, SeLoger, PAP, Jinka, Bien'ici. Pour les logements sociaux (HLM), déposez une demande sur demande-logement-social.gouv.fr (numéro unique régional). Délai d'attente variable : de 6 mois en province à plusieurs années en Île-de-France. Résidences CROUS : réservées aux étudiants boursiers (inscription via MesServices.étudiant.gouv.fr).",
      },
      {
        title: 'Garantie locative (Visale)',
        detail:
          "Le dispositif Visale (gratuit, géré par Action Logement) se porte garant pour vous auprès du propriétaire. Ouvert aux moins de 30 ans, aux salariés en mobilité, et aux titulaires d'un bail mobilité. L'inscription se fait en ligne sur visale.fr en quelques minutes. C'est la solution n°1 pour les Gabonais sans garant en France.",
      },
      {
        title: 'Aides au logement (APL / ALS)',
        detail:
          "L'APL (Aide Personnalisée au Logement) ou l'ALS (Allocation de Logement Sociale) sont versées par la CAF. Le montant dépend de vos revenus, du loyer et de la zone géographique. Simulez vos droits sur caf.fr. La demande se fait en ligne dès l'entrée dans le logement. Délai de versement : environ 2 mois (rétroactif au 1er mois).",
      },
      {
        title: 'Droits des locataires',
        detail:
          "Le bail d'habitation est encadré par la loi ALUR. Droits fondamentaux : le propriétaire ne peut pas vous expulser durant la trêve hivernale (1er novembre au 31 mars). Le dépôt de garantie est limité à 1 mois de loyer hors charges (non meublé) ou 2 mois (meublé). Le propriétaire doit fournir un logement décent (chauffage, eau, électricité, surface minimale). En cas de litige, saisissez la commission de conciliation gratuite ou le tribunal.",
      },
      {
        title: "Assurance habitation (obligatoire)",
        detail:
          "L'assurance habitation est obligatoire pour tout locataire dès l'entrée dans le logement. Elle couvre les risques locatifs (incendie, dégât des eaux, etc.). Comparez les offres sur LeLynx.fr ou Assurland.com. Budget : 10€ à 30€/mois. Le propriétaire peut résilier le bail si vous ne souscrivez pas d'assurance.",
      },
      {
        title: 'État des lieux : entrée et sortie',
        detail:
          "L'état des lieux d'entrée est un document essentiel : il décrit l'état du logement à votre arrivée. Prenez des photos de chaque pièce. Sans état des lieux, vous êtes présumé avoir reçu le logement en bon état. À la sortie, l'état des lieux de sortie est comparé : toute dégradation non signalée peut être retenue sur le dépôt de garantie.",
      },
    ],
    tips: [
      'Le dispositif Visale (gratuit, via Action Logement) remplace le garant physique — solution idéale pour les Gabonais',
      "Ouvrez un compte bancaire français rapidement — c'est indispensable pour le prélèvement du loyer",
      "Souscrivez une assurance habitation AVANT d'emménager — le propriétaire l'exigera",
      "Conservez tous vos échanges écrits avec le propriétaire (emails, courriers recommandés)",
      "Prenez des photos détaillées le jour de l'état des lieux d'entrée",
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
    image: '/images/guide-sante.png',
    intro:
      "La France dispose d'un système de santé universel parmi les meilleurs au monde. En tant que résident, vous avez droit à la couverture maladie. Voici comment en bénéficier et naviguer dans le système de soins.",
    items: [
      {
        title: 'Inscription à la Sécurité sociale',
        detail:
          "Dès votre arrivée, inscrivez-vous à la CPAM (Caisse Primaire d'Assurance Maladie) via ameli.fr. Si vous travaillez, votre employeur lance la procédure automatiquement. Sinon, la PUMA (Protection Universelle Maladie) vous couvre après 3 mois de résidence stable et régulière. Vous recevrez votre carte Vitale en 2 à 4 semaines (une attestation provisoire est disponible en attendant).",
      },
      {
        title: 'Complémentaire santé solidaire (CSS)',
        detail:
          "Ex CMU-C, la CSS est une mutuelle gratuite ou à faible coût pour les revenus modestes (plafond : environ 9 700 €/an pour une personne seule). Elle couvre : ticket modérateur, lunettes (jusqu'à 200 €), soins dentaires, prothèses auditives. Demande sur ameli.fr ou en CPAM. Décision sous 2 mois.",
      },
      {
        title: 'Médecin traitant',
        detail:
          "Déclarez un médecin traitant auprès de la CPAM pour bénéficier du meilleur remboursement (70% au lieu de 30% sans médecin traitant). En cas de difficulté pour en trouver un, consultez les centres de santé municipaux ou les maisons de santé pluriprofessionnelles. L'application Doctolib permet de trouver des créneaux disponibles.",
      },
      {
        title: 'Santé mentale et soutien psychologique',
        detail:
          "Le dispositif 'Mon soutien psy' permet 8 séances gratuites par an avec un psychologue conventionné (sur prescription du médecin traitant). Les Centres Médico-Psychologiques (CMP) offrent des consultations gratuites avec psychiatres et psychologues. L'isolement, le choc culturel et les difficultés administratives peuvent peser : n'hésitez pas à consulter.",
      },
      {
        title: 'PMI pour enfants (0-6 ans)',
        detail:
          "La Protection Maternelle et Infantile (PMI) offre des consultations entièrement gratuites pour les enfants de 0 à 6 ans : vaccinations, suivi de croissance, conseils de puériculture, dépistage précoce. Renseignez-vous auprès de votre mairie. Aucun justificatif de régularité de séjour n'est demandé.",
      },
      {
        title: 'Urgences médicales',
        detail:
          "En cas d'urgence vitale : appelez le 15 (SAMU) ou le 112 (numéro européen). Les urgences hospitalières sont accessibles 24h/24 sans rendez-vous. Pour une consultation urgente non vitale : SOS Médecins (3624), maisons médicales de garde (le soir et le week-end), ou les pharmacies de garde.",
      },
    ],
    tips: [
      'Conservez toujours sur vous votre carte Vitale (ou attestation provisoire)',
      'La téléconsultation est remboursée — pratique quand on ne trouve pas de médecin',
      "Les centres de santé municipaux proposent des consultations sans dépassement d'honoraires",
      "Inscrivez-vous sur Doctolib pour trouver des créneaux disponibles rapidement",
      "Le 114 permet de contacter les urgences par SMS (personnes sourdes ou en danger silencieux)",
    ],
    links: [
      { label: 'Ameli.fr', url: 'https://www.ameli.fr', description: 'Site officiel de la Sécurité sociale' },
      { label: 'Doctolib', url: 'https://www.doctolib.fr', description: 'Prise de rendez-vous médical en ligne' },
      { label: 'CSS', url: 'https://www.complementaire-sante-solidaire.gouv.fr', description: 'Mutuelle gratuite sous conditions' },
      { label: 'Mon soutien psy', url: 'https://www.ameli.fr/assure/remboursements/rembourse/consultations/mon-soutien-psy', description: '8 séances psy gratuites par an' },
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
    image: '/images/guide-education.png',
    intro:
      "Le système éducatif français est accessible à tous les enfants résidant en France, quelle que soit la nationalité ou la situation administrative des parents. Pour les adultes, de nombreuses formations et dispositifs d'accompagnement existent.",
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
    image: '/images/guide-emploi.png',
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
    image: '/images/guide-droits.png',
    intro:
      "Comprendre vos droits et les démarches liées à votre titre de séjour est essentiel pour vivre sereinement en France. Le non-respect des délais peut entraîner des situations complexes.",
    items: [
      {
        title: 'Titre de séjour',
        detail:
          "Le VLS-TS (Visa Long Séjour valant Titre de Séjour) doit être validé en ligne sur administration-etrangers-en-france.interieur.gouv.fr dans les 3 mois suivant votre arrivée. Le renouvellement se fait 2 mois avant expiration sur la même plateforme.",
      },
      {
        title: 'Le récépissé — Attention',
        detail:
          "⚠️ Le récépissé de première demande de carte de séjour ne permet PAS de quitter la France et d'y revenir. Seul le titre de séjour définitif ou le VLS-TS validé le permet. Le récépissé de renouvellement, en revanche, fait office de titre de séjour provisoire pendant l'instruction de votre dossier.",
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
        title: 'Document de circulation pour mineur (DCM)',
        detail:
          "Les mineurs étrangers résidant en France, dont les parents sont en situation régulière ou dont l'un des parents est français, peuvent obtenir un DCM à la préfecture. Validité : 5 ans, renouvelable jusqu'aux 18 ans de l'enfant. Ce document permet au mineur de voyager à l'étranger et de revenir en France sans visa. Documents : acte de naissance, passeport de l'enfant, titre de séjour des parents, certificat de scolarité, photos d'identité. ⚠️ À 18 ans, le jeune doit obligatoirement demander un titre de séjour propre (mention 'étudiant' ou 'vie privée et familiale' selon sa situation).",
      },
      {
        title: 'Binationaux (Franco-Gabonais)',
        detail:
          "Le Gabon ne reconnaît pas officiellement la double nationalité (sauf exceptions), mais en pratique de nombreux Gabonais possèdent les deux nationalités. Un visa est obligatoire pour entrer au Gabon avec un passeport français — il s'obtient au Consulat Général du Gabon à Paris (26 bis avenue Raphaël, 75016). Délai : 3 jours ouvrés. La présence physique est requise, pas de visa express. Documents : passeport français, acte de naissance gabonais, photos, formulaire de visa, justificatif du motif du voyage. Conseil : entrez en France avec le passeport français, au Gabon avec le passeport gabonais.",
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
      "Un récépissé de première demande ne permet PAS de quitter la France — seul le titre définitif ou le VLS-TS validé le permet",
    ],
    links: [
      { label: 'ANEF - Étrangers en France', url: 'https://administration-etrangers-en-france.interieur.gouv.fr', description: 'Démarches de titre de séjour en ligne' },
      { label: 'Défenseur des droits', url: 'https://www.defenseurdesdroits.fr', description: 'Recours gratuit en cas de discrimination' },
      { label: 'CIMADE', url: 'https://www.lacimade.org', description: 'Accompagnement juridique gratuit' },
      { label: 'Consulat du Gabon', url: 'https://consulat.ga', description: 'Visa pour le Gabon — 26 bis av. Raphaël, Paris 16e' },
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
    image: '/images/guide-famille.png',
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
    id: 'impots',
    icon: Receipt,
    title: 'Impôts & Fiscalité',
    color: 'text-teal-600 dark:text-teal-400',
    iconBg: 'bg-teal-500/10',
    gradientFrom: 'from-teal-500/5',
    gradientTo: 'to-teal-600/10',
    intro:
      "Tout résident en France est soumis à l'obligation de déclarer ses revenus, même en l'absence de revenus. Comprendre le système fiscal français est essentiel pour éviter les pénalités et accéder aux aides.",
    items: [
      {
        title: 'Déclaration annuelle de revenus',
        detail:
          "Chaque année entre avril et juin, déclarez vos revenus sur impots.gouv.fr. C'est OBLIGATOIRE même si vous n'avez pas de revenus ou si vous êtes étudiant. Créez votre espace en ligne avec votre numéro fiscal (obtenu lors de la première déclaration papier au centre des impôts de votre domicile). L'avis d'imposition ou de NON-imposition est un document essentiel pour : APL, logement social, renouvellement de titre de séjour, CSS.",
      },
      {
        title: 'Prélèvement à la source',
        detail:
          "Depuis 2019, l'impôt sur le revenu est prélevé directement sur votre salaire par l'employeur. Le taux est personnalisé en fonction de votre déclaration. Si vous n'êtes pas imposable, le taux est de 0%. Vous pouvez modifier votre taux en cours d'année sur impots.gouv.fr (mariage, naissance, changement de revenus).",
      },
      {
        title: 'Taxe d\'habitation et taxe foncière',
        detail:
          "La taxe d'habitation sur les résidences principales a été supprimée pour tous depuis 2023. La taxe foncière concerne uniquement les propriétaires. Si vous êtes locataire, aucune taxe foncière ne vous sera demandée. La contribution à l'audiovisuel public (redevance TV) a également été supprimée.",
      },
      {
        title: 'Convention fiscale France-Gabon',
        detail:
          "La convention fiscale entre la France et le Gabon évite la double imposition. Si vous percevez des revenus au Gabon tout en résidant en France, ces revenus doivent être déclarés en France mais un crédit d'impôt peut s'appliquer. Consultez un conseiller fiscal ou le centre des impôts pour votre situation particulière.",
      },
    ],
    tips: [
      'Déclarez vos impôts MÊME SANS REVENUS — l\'avis de non-imposition est indispensable pour de nombreuses démarches',
      'Votre première déclaration doit se faire en papier au centre des impôts de votre domicile',
      'Conservez vos avis d\'imposition pendant au moins 3 ans — l\'administration peut contrôler sur cette période',
      'En cas de difficulté, demandez un délai de paiement au centre des impôts (gratuit et souvent accordé)',
    ],
    links: [
      { label: 'Impots.gouv.fr', url: 'https://www.impots.gouv.fr', description: 'Déclaration de revenus en ligne' },
      { label: 'Simulateur d\'impôt', url: 'https://www.impots.gouv.fr/simulateurs', description: 'Estimez votre impôt sur le revenu' },
    ],
  },
  {
    id: 'discriminations',
    icon: ShieldAlert,
    title: 'Discriminations & Recours',
    color: 'text-amber-600 dark:text-amber-400',
    iconBg: 'bg-amber-500/10',
    gradientFrom: 'from-amber-500/5',
    gradientTo: 'to-amber-600/10',
    intro:
      "La loi française protège contre toute forme de discrimination. En tant que Gabonais en France, connaître vos droits et les recours disponibles est essentiel pour vivre dignement.",
    items: [
      {
        title: 'Qu\'est-ce qu\'une discrimination ?',
        detail:
          "La loi française reconnaît 25 critères de discrimination interdits, incluant : l'origine, le nom de famille, l'apparence physique, la couleur de peau, la nationalité, la religion, le sexe, l'orientation sexuelle. La discrimination peut se manifester au travail, dans le logement, dans les services publics ou dans les lieux de loisirs.",
      },
      {
        title: 'Discrimination au logement',
        detail:
          "Il est illégal pour un propriétaire de refuser un locataire en raison de son origine, de son nom ou de sa couleur de peau. Si vous suspectez une discrimination, constituez un dossier de preuves (emails, SMS, témoignages). Contactez SOS Racisme (01 40 35 36 55) ou le Défenseur des droits (09 69 39 00 00, gratuit).",
      },
      {
        title: 'Discrimination au travail',
        detail:
          "L'employeur ne peut pas refuser une embauche, une promotion ou un licenciement basé sur des critères discriminatoires. Le Conseil de Prud'hommes est compétent pour les litiges liés au travail. L'inspection du travail peut également être saisie. Les syndicats CFDT, CGT et FO peuvent vous accompagner gratuitement.",
      },
      {
        title: 'Contrôles d\'identité : vos droits',
        detail:
          "Lors d'un contrôle d'identité, vous devez présenter votre titre de séjour ou récépissé. Un contrôle au faciès (basé uniquement sur l'apparence) est illégal. Si vous estimez être victime d'un contrôle discriminatoire : notez le lieu, l'heure, le numéro d'équipage, et saisissez l'IGPN (inspection générale de la police) ou le Défenseur des droits.",
      },
      {
        title: 'Recours disponibles',
        detail:
          "1) Défenseur des droits (defenseurdesdroits.fr) — gratuit, indépendant, saisine en ligne. 2) Dépôt de plainte au commissariat ou directement au procureur de la République. 3) Associations spécialisées : SOS Racisme, LICRA, MRAP, LDH. 4) Aide juridictionnelle si revenus modestes. La discrimination est punie de 3 ans de prison et 45 000 € d'amende.",
      },
    ],
    tips: [
      'Conservez toujours des preuves écrites (emails, SMS, captures d\'appels) en cas de discrimination',
      'Le Défenseur des droits est gratuit et peut être saisi en ligne — 99% des dossiers sont traités',
      'En cas d\'agression raciste, déposez plainte immédiatement et consultez un médecin pour certificat',
      'Contactez le consulat si vous avez besoin d\'accompagnement dans vos démarches',
    ],
    links: [
      { label: 'Défenseur des droits', url: 'https://www.defenseurdesdroits.fr', description: 'Recours gratuit contre les discriminations' },
      { label: 'SOS Racisme', url: 'https://sos-racisme.org', description: 'Assistance juridique contre le racisme' },
      { label: 'LICRA', url: 'https://www.licra.org', description: 'Ligue internationale contre le racisme' },
    ],
  },
]

const guideSectionsEn: GuideSection[] = [
  {
    id: 'logement',
    icon: Home,
    title: 'Housing',
    color: 'text-blue-600 dark:text-blue-400',
    iconBg: 'bg-blue-500/10',
    gradientFrom: 'from-blue-500/5',
    gradientTo: 'to-blue-600/10',
    image: '/images/guide-logement.png',
    intro:
      'Finding accommodation in France can be difficult at first. This section helps you secure housing, benefits and legal protections.',
    items: [
      {
        title: 'Where to search',
        detail:
          'Use trusted platforms and agencies. For social housing, file a formal request and expect potentially long wait times in large cities.',
      },
      {
        title: 'Rental guarantee (Visale)',
        detail:
          'Visale can replace a private guarantor for many profiles and is free to use.',
      },
      {
        title: 'Housing benefits (APL/ALS)',
        detail:
          'CAF support depends on income, rent and location. Apply online as soon as your lease starts.',
      },
      {
        title: 'Tenant rights',
        detail:
          'Security deposits are regulated and landlord obligations are strict. In disputes, mediation or legal channels are available.',
      },
      {
        title: 'Move-in and move-out inventory',
        detail:
          'Document property condition with photos at entry and exit to protect your deposit.',
      },
    ],
    tips: [
      'Use Visale early if you do not have a guarantor',
      'Open a French bank account before signing your lease',
      'Take mandatory home insurance before moving in',
      'Keep written communication with your landlord',
      'Photograph every room on move-in day',
    ],
    links: [
      { label: 'CAF — Simulateur APL', url: 'https://www.caf.fr', description: 'Estimate housing benefit eligibility' },
      { label: 'Visale', url: 'https://www.visale.fr', description: 'Free rental guarantee' },
      { label: 'Demande logement social', url: 'https://www.demande-logement-social.gouv.fr', description: 'Apply for social housing' },
    ],
  },
  {
    id: 'sante',
    icon: Heart,
    title: 'Health & Social Protection',
    color: 'text-red-600 dark:text-red-400',
    iconBg: 'bg-red-500/10',
    gradientFrom: 'from-red-500/5',
    gradientTo: 'to-red-600/10',
    image: '/images/guide-sante.png',
    intro:
      'France provides broad healthcare access. As a resident, you can enroll in the public system and complete your coverage with a complementary plan.',
    items: [
      {
        title: 'Social security registration',
        detail:
          'Register with CPAM through ameli.fr. Your employer may initiate this process if you are employed.',
      },
      {
        title: 'Complementary health plan (CSS)',
        detail:
          'CSS can reduce or remove out-of-pocket costs for low-income households.',
      },
      {
        title: 'Primary doctor pathway',
        detail:
          'Declaring a regular doctor improves reimbursement rates and care coordination.',
      },
      {
        title: 'Mental health support',
        detail:
          'Public and subsidized support exists for psychological care, including referral-based schemes.',
      },
      {
        title: 'Emergency care',
        detail:
          'Call 15 or 112 in urgent situations; emergency departments are open 24/7.',
      },
    ],
    tips: [
      'Always keep your Vitale card or temporary certificate',
      'Teleconsultation can help when local availability is low',
      'Municipal health centers often limit extra fees',
      'Use Doctolib or official directories for appointments',
      'Emergency SMS service (114) is available in specific situations',
    ],
    links: [
      { label: 'Ameli.fr', url: 'https://www.ameli.fr', description: 'Official health insurance portal' },
      { label: 'Doctolib', url: 'https://www.doctolib.fr', description: 'Online medical appointment booking' },
      { label: 'CSS', url: 'https://www.complementaire-sante-solidaire.gouv.fr', description: 'Complementary health coverage' },
      { label: 'Mon soutien psy', url: 'https://www.ameli.fr/assure/remboursements/rembourse/consultations/mon-soutien-psy', description: 'Psychological support scheme' },
    ],
  },
  {
    id: 'education',
    icon: GraduationCap,
    title: 'Education & Training',
    color: 'text-green-600 dark:text-green-400',
    iconBg: 'bg-green-500/10',
    gradientFrom: 'from-green-500/5',
    gradientTo: 'to-green-600/10',
    image: '/images/guide-education.png',
    intro:
      'Children and adults can access strong education and training pathways in France, with dedicated support for international students.',
    items: [
      {
        title: 'Schooling for children',
        detail:
          'School attendance is mandatory from ages 3 to 16 and cannot be denied on nationality grounds.',
      },
      {
        title: 'Higher education admission',
        detail:
          'Apply through Parcoursup (in France) or Campus France pathways depending on your profile.',
      },
      {
        title: 'Scholarships and grants',
        detail:
          'CROUS and other support schemes may be available based on social and academic criteria.',
      },
      {
        title: 'Diploma recognition',
        detail:
          'ENIC-NARIC comparability certificates can support job applications and academic admissions.',
      },
      {
        title: 'Professional validation (VAE)',
        detail:
          'VAE can convert work experience into recognized qualifications.',
      },
    ],
    tips: [
      'Free or low-cost French classes are widely available',
      'Student cards unlock transport and cultural discounts',
      'Public libraries provide free resources and internet access',
      'Use official portals for applications and deadlines',
    ],
    links: [
      { label: 'Parcoursup', url: 'https://www.parcoursup.fr', description: 'Higher education application platform' },
      { label: 'Campus France', url: 'https://www.campusfrance.org/fr', description: 'Study in France information' },
      { label: 'ENIC-NARIC', url: 'https://www.france-education-international.fr', description: 'Foreign diploma recognition' },
    ],
  },
  {
    id: 'emploi',
    icon: Briefcase,
    title: 'Employment & Entrepreneurship',
    color: 'text-orange-600 dark:text-orange-400',
    iconBg: 'bg-orange-500/10',
    gradientFrom: 'from-orange-500/5',
    gradientTo: 'to-orange-600/10',
    image: '/images/guide-emploi.png',
    intro:
      'Working in France requires the right residence status. You can pursue employment, self-employment or supported business creation.',
    items: [
      {
        title: 'Work authorization',
        detail:
          'Check your permit wording carefully to confirm your right to work and any hour limitations.',
      },
      {
        title: 'France Travail support',
        detail:
          'Register for job-search support, training and potential compensation based on your contribution history.',
      },
      {
        title: 'Micro-business creation',
        detail:
          'Micro-entrepreneur status offers a simplified setup and tax framework for many activities.',
      },
      {
        title: 'ACRE support',
        detail:
          'ACRE may reduce social charges during the first year for eligible founders.',
      },
      {
        title: 'Chamber of commerce resources',
        detail:
          'CCI networks provide guidance, training and business support programs.',
      },
    ],
    tips: [
      'Use ACRE and youth-employment support schemes where eligible',
      'Avoid undeclared work: legal and social risk is high',
      'Track residence and work-permit deadlines alongside contracts',
      'Build a network early through local associations and platforms',
    ],
    links: [
      { label: 'France Travail', url: 'https://www.francetravail.fr', description: 'Jobs and employment support' },
      { label: 'Auto-entrepreneur', url: 'https://autoentrepreneur.urssaf.fr', description: 'Micro-business registration' },
      { label: '1jeune1solution', url: 'https://www.1jeune1solution.gouv.fr', description: 'Youth jobs and training offers' },
    ],
  },
  {
    id: 'droits',
    icon: Scale,
    title: 'Rights & Residency',
    color: 'text-purple-600 dark:text-purple-400',
    iconBg: 'bg-purple-500/10',
    gradientFrom: 'from-purple-500/5',
    gradientTo: 'to-purple-600/10',
    image: '/images/guide-droits.png',
    intro:
      'Understanding your rights and residence obligations is essential for long-term stability and legal security in France.',
    items: [
      {
        title: 'Residence permit validity',
        detail:
          'Validate and renew permits on time through official ANEF/prefecture channels.',
      },
      {
        title: 'Receipt limitations',
        detail:
          'Some first-application receipts do not authorize international travel and re-entry.',
      },
      {
        title: 'Multi-year permits',
        detail:
          'After an initial permit, multi-year cards may be available depending on your status.',
      },
      {
        title: 'Address change obligation',
        detail:
          'You must declare address changes within legal deadlines to avoid penalties.',
      },
      {
        title: 'Regularization options',
        detail:
          'Possible paths include work-based, family-based, humanitarian and protection routes.',
      },
      {
        title: 'Family reunification and naturalization',
        detail:
          'Both require strict criteria on residence duration, resources, language and integration.',
      },
    ],
    tips: [
      'Keep digital backups of all official documents',
      'Never let a permit expire without proof of renewal filing',
      'Use specialized legal associations for complex cases',
      'Report address changes quickly',
      'Verify travel rights before crossing borders with receipts',
    ],
    links: [
      { label: 'ANEF - Étrangers en France', url: 'https://administration-etrangers-en-france.interieur.gouv.fr', description: 'Residence procedures online' },
      { label: 'Défenseur des droits', url: 'https://www.defenseurdesdroits.fr', description: 'Independent rights and discrimination body' },
      { label: 'CIMADE', url: 'https://www.lacimade.org', description: 'Free legal support' },
      { label: 'Consulat du Gabon', url: 'https://consulat.ga', description: 'Gabonese consular support in France' },
      { label: 'Service-public.fr — DCME', url: 'https://www.service-public.fr/particuliers/vosdroits/F2710', description: 'Travel document for minors' },
    ],
  },
  {
    id: 'famille',
    icon: Baby,
    title: 'Family & Children',
    color: 'text-pink-600 dark:text-pink-400',
    iconBg: 'bg-pink-500/10',
    gradientFrom: 'from-pink-500/5',
    gradientTo: 'to-pink-600/10',
    image: '/images/guide-famille.png',
    intro:
      'Families can access substantial support in France through child benefits, health services and civil registration pathways.',
    items: [
      {
        title: 'Birth registration',
        detail:
          'Declare birth at the town hall first, then complete consular transcription for Gabonese records.',
      },
      {
        title: 'Family benefits',
        detail:
          'CAF provides different types of support depending on family size, income and child age.',
      },
      {
        title: 'Childcare options',
        detail:
          'Municipal daycare, licensed childminders and home care are available with potential financial support.',
      },
      {
        title: 'Civil status procedures',
        detail:
          'Marriage and family records often need formal transcription for cross-border legal validity.',
      },
    ],
    tips: [
      'Complete both French and consular registration for children',
      'Open your CAF account early to avoid delays',
      'Use PMI services for preventive care for young children',
      'Keep family documents updated and accessible',
    ],
    links: [
      { label: 'CAF', url: 'https://www.caf.fr', description: 'Family benefits and social support' },
      { label: 'Mon-enfant.fr', url: 'https://www.mon-enfant.fr', description: 'Find childcare options' },
      { label: 'Service-public.fr — Famille', url: 'https://www.service-public.fr/particuliers/vosdroits/N156', description: 'Family rights and procedures' },
    ],
  },
  {
    id: 'impots',
    icon: Receipt,
    title: 'Taxes & Fiscal Rules',
    color: 'text-teal-600 dark:text-teal-400',
    iconBg: 'bg-teal-500/10',
    gradientFrom: 'from-teal-500/5',
    gradientTo: 'to-teal-600/10',
    intro:
      'Tax filing is a key annual obligation in France and is often required for housing, social aid and residence renewals.',
    items: [
      {
        title: 'Annual tax declaration',
        detail:
          'File returns each year through impots.gouv.fr. Even low-income situations may still require declaration.',
      },
      {
        title: 'Withholding tax system',
        detail:
          'Income tax is generally deducted at source and adjusted based on your household declaration.',
      },
      {
        title: 'Local taxes and changes',
        detail:
          'Primary-residence housing tax has largely been removed, but property owners may still owe other taxes.',
      },
      {
        title: 'France-Gabon tax convention',
        detail:
          'The bilateral convention helps avoid double taxation for eligible cross-border income situations.',
      },
    ],
    tips: [
      'File on time every year to avoid penalties',
      'Keep tax notices for major administrative procedures',
      'Ask tax offices for support if your situation is complex',
      'Report family and income changes quickly to update your rate',
    ],
    links: [
      { label: 'Impots.gouv.fr', url: 'https://www.impots.gouv.fr', description: 'Official tax portal' },
      { label: 'Simulateur d\'impôt', url: 'https://www.impots.gouv.fr/simulateurs', description: 'Income tax simulation tools' },
    ],
  },
  {
    id: 'discriminations',
    icon: ShieldAlert,
    title: 'Discrimination & Legal Remedies',
    color: 'text-amber-600 dark:text-amber-400',
    iconBg: 'bg-amber-500/10',
    gradientFrom: 'from-amber-500/5',
    gradientTo: 'to-amber-600/10',
    intro:
      'French law prohibits discrimination in housing, work and public services. Knowing your remedies helps protect your rights.',
    items: [
      {
        title: 'What counts as discrimination',
        detail:
          'Protected criteria include origin, nationality, religion, gender, disability and other legally defined factors.',
      },
      {
        title: 'Housing discrimination',
        detail:
          'Refusals based on origin or identity markers are illegal. Keep evidence and contact competent organizations quickly.',
      },
      {
        title: 'Workplace discrimination',
        detail:
          'Hiring, promotion and dismissal decisions cannot lawfully rely on discriminatory criteria.',
      },
      {
        title: 'Identity checks',
        detail:
          'You must carry valid documents, but discriminatory checks can be challenged through formal complaint channels.',
      },
      {
        title: 'Available remedies',
        detail:
          'You can contact the Defender of Rights, file a police/prosecutor complaint and request legal aid if eligible.',
      },
    ],
    tips: [
      'Keep written proof and screenshots when incidents occur',
      'Use the Defender of Rights online channels early',
      'Seek medical and legal documentation after violent incidents',
      'Request consular orientation when needed',
    ],
    links: [
      { label: 'Défenseur des droits', url: 'https://www.defenseurdesdroits.fr', description: 'Free anti-discrimination remedy' },
      { label: 'SOS Racisme', url: 'https://sos-racisme.org', description: 'Legal assistance against racism' },
      { label: 'LICRA', url: 'https://www.licra.org', description: 'Anti-racism advocacy organization' },
    ],
  },
]

// ─── Page ────────────────────────────────────────────────────────────────────

function VieEnFrancePage() {
  const { t, i18n } = useTranslation()
  const lang = i18n.resolvedLanguage || i18n.language
  const isEn = lang.startsWith('en')
  const tSections = isEn ? guideSectionsEn : guideSections
  const [activeSection, setActiveSection] = useState(tSections[0].id)

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
                <span className="font-medium">{t('vieFrance.stats.themes', '6 rubriques thématiques')}</span>
              </div>
              <div className="flex items-center gap-2 text-foreground/80">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span className="font-medium">{t('vieFrance.stats.procedures', '50+ démarches détaillées')}</span>
              </div>
              <div className="flex items-center gap-2 text-foreground/80">
                <ExternalLink className="w-5 h-5 text-blue-500" />
                <span className="font-medium">{t('vieFrance.stats.links', 'Liens officiels vérifiés')}</span>
              </div>
            </div>
      </PageHero>

      {/* Mobile Section Navigation */}
      <div className="lg:hidden sticky top-16 z-40 bg-background/80 backdrop-blur-md border-b border-border/50 px-4 py-3">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {tSections.map((section) => {
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
                  <h3 className="text-lg font-bold text-foreground">{t('vieFrance.emergency.title', 'Numéros d\'urgence')}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t('vieFrance.emergency.subtitle', 'À conserver dans votre téléphone')}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { number: '15', label: t('vieFrance.emergency.samu', 'SAMU — Urgences médicales') },
                  { number: '17', label: t('vieFrance.emergency.police', 'Police — Secours') },
                  { number: '18', label: t('vieFrance.emergency.pompiers', 'Pompiers') },
                  { number: '112', label: t('vieFrance.emergency.european', 'Numéro européen d\'urgence') },
                  { number: '114', label: t('vieFrance.emergency.sms', 'Urgences par SMS (sourds/malentendants)') },
                  { number: '07 44 23 95 84', label: t('vieFrance.emergency.consulat', 'Urgence consulaire Gabon 24h/24') },
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



      <CitizenCTA />
    </div>
  )
}
