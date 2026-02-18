import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import {
  FileText,
  Home,
  Briefcase,
  Heart,
  Shield,
  BookOpen,

  Phone,


  PackageCheck,
  HandCoins,
  GraduationCap,
  Users,
  AlertTriangle,
  AlertOctagon,
  Stethoscope,
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'

import { PageHero } from '@/components/PageHero'
import { CitizenCTA } from '@/components/home/CitizenCTA'
import {
  GuideSectionCard,
  NumerosUtilesGrid,
  ErreursCourantesGrid,
  type GuideSection,
  type ErreurItem,
  type NumeroUtile,
} from '@/components/guides'

export const Route = createFileRoute('/retour-au-gabon')({
  component: RetourAuGabonPage,
  head: () => ({
    meta: [
      { title: 'Retour au Gabon — Guide Complet | Consulat Général du Gabon' },
      {
        name: 'description',
        content:
          'Guide complet pour préparer votre retour au Gabon : démarches consulaires, déménagement, réinstallation, emploi, OQTF, aides et maintien de vos droits acquis en France.',
      },
    ],
  }),
})

// ─── Data : Guide Sections ──────────────────────────────────────────────────
const guideSections: GuideSection[] = [
  {
    id: 'preparation',
    icon: FileText,
    title: 'Préparer son retour',
    color: 'text-blue-600 dark:text-blue-400',
    iconBg: 'bg-blue-500/10',
    image: '/images/guide-droits.png',
    intro: 'Un retour au Gabon se prépare idéalement 6 à 12 mois à l\'avance. Voici les démarches administratives et consulaires à anticiper pour un retour serein.',
    items: [
      { title: 'Démarches consulaires', detail: 'Rendez-vous au Consulat Général du Gabon pour : renouveler votre passeport gabonais (si périmé), obtenir un certificat de nationalité, faire transcrire les actes d\'état civil (naissances, mariages en France), et signaler votre retour définitif. Prévoyez un délai de 2 à 4 semaines pour chaque procédure.' },
      { title: 'Clôture des engagements en France', detail: 'Résiliez vos contrats : bail (préavis 1 à 3 mois selon le type de location), assurance habitation, abonnements (EDF/GDF, téléphone, internet, Netflix, etc.). Faites votre dernière déclaration d\'impôts et demandez un quitus fiscal si vous êtes entrepreneur. Informez La Poste pour le suivi de courrier (6 mois de réexpédition, 26,90 €).' },
      { title: 'Transfert de dossier médical', detail: 'Demandez votre dossier médical complet à votre médecin traitant (droit garanti par la loi). Récupérez vos radiographies, analyses et ordonnances. Vérifiez la disponibilité de vos traitements au Gabon et constituez un stock de médicaments pour 3 à 6 mois si nécessaire. Demandez des prescriptions en DCI (Dénomination Commune Internationale) pour faciliter les équivalences.' },
      { title: 'Documents à rassembler', detail: 'Préparez et conservez des copies numériques de : passeports (anciens et actuels), actes d\'état civil (naissance, mariage, divorce), diplômes (avec apostille ou légalisation), contrats de travail et bulletins de salaire, relevés de retraite (lassuranceretraite.fr), attestations France Travail, permis de conduire international, carte Vitale et attestations CPAM.' },
      { title: 'Permis de conduire', detail: 'Si vous avez un permis français, demandez un permis de conduire international à la préfecture (gratuit, valable 3 ans, demande sur ants.gouv.fr). Au Gabon, vous devrez échanger votre permis français contre un permis gabonais dans les 12 mois suivant votre installation. Conservez une copie du permis français.' },
      { title: 'Comptes bancaires et finances', detail: 'NE FERMEZ PAS immédiatement votre compte bancaire français — conservez-le au moins 6 mois après le retour pour : les virements de droits résiduels (retraite, chômage), les prélèvements en cours, et les transferts d\'argent. Ouvrez un compte au Gabon (BGFI, Orabank, UGB) avant ou dès votre arrivée. Comparez les frais de transfert : Wise, WorldRemit, Orange Money.' },
    ],
    tips: [
      'Commencez les démarches 6 à 12 mois avant le retour prévu',
      'Faites apostiller vos diplômes français au tribunal judiciaire — c\'est indispensable pour leur reconnaissance au Gabon',
      'Conservez votre numéro de sécurité sociale et vos identifiants Ameli.fr — ils peuvent être utiles pour les droits acquis',
      'Informez la CAF, la CPAM et France Travail de votre départ définitif pour éviter les trop-perçus',
      'Créez un dossier numérique (Google Drive, Dropbox) avec TOUS vos documents scannés',
    ],
    links: [
      { label: 'ANTS', url: 'https://ants.gouv.fr', description: 'Permis de conduire international en ligne' },
      { label: 'L\'Assurance Retraite', url: 'https://www.lassuranceretraite.fr', description: 'Relevé de carrière et droits à la retraite' },
      { label: 'La Poste — Réexpédition', url: 'https://www.laposte.fr/outils/reexpedition-courrier', description: 'Réexpédition du courrier après le départ' },
    ],
  },
  {
    id: 'demenagement',
    icon: PackageCheck,
    title: 'Déménagement',
    color: 'text-orange-600 dark:text-orange-400',
    iconBg: 'bg-orange-500/10',

    intro: 'Le transport de vos effets personnels et biens vers le Gabon nécessite une organisation rigoureuse. Comparez les options et anticipez les formalités douanières.',
    items: [
      { title: 'Fret maritime (le plus économique)', detail: 'Le fret maritime est l\'option la plus rentable pour les volumes importants. Transit : 6 à 12 semaines selon le port d\'arrivée (Owendo pour Libreville). Obtenez au moins 3 devis auprès de transitaires spécialisés Afrique (AGS, DTM, Bolloré Logistics). Comptez 2 000 € à 5 000 € pour un conteneur 20 pieds. Exigez une assurance transport couvrant la casse, la perte et le vol.' },
      { title: 'Fret aérien (rapide mais coûteux)', detail: 'Le fret aérien est adapté aux petits volumes urgents (documents, vêtements, objets de valeur). Délai : 3 à 7 jours. Coût : environ 5 à 10 €/kg. Transporteurs : Air France Cargo, DHL, FedEx. N\'envoyez pas de liquides ni de batteries lithium par avion.' },
      { title: 'Franchise douanière', detail: 'Les Gabonais de retour bénéficient d\'une franchise douanière sur les effets personnels et le mobilier usagé sous conditions strictes : résidence à l\'étranger > 2 ans, retour définitif justifié. Documents requis : attestation consulaire de retour, inventaire détaillé des biens, factures d\'achat. Renseignez-vous auprès de la Direction Générale des Douanes du Gabon AVANT expédition.' },
      { title: 'Véhicule', detail: 'L\'importation d\'un véhicule au Gabon est soumise à des droits de douane (20 à 30% de la valeur) et à une restriction d\'âge (véhicules de moins de 5 ans en général). Faites le calcul complet : droits de douane + transport maritime + assurance + mise en conformité. Il est souvent plus avantageux de vendre en France et d\'acheter sur place.' },
      { title: 'Inventaire détaillé', detail: 'Établissez un inventaire précis de TOUS les biens expédiés avec : description de chaque article, photos, valeur estimée. Ce document est exigé par les douanes gabonaises et par l\'assurance en cas de litige. Conservez toutes les factures d\'achat. L\'inventaire doit être signé et daté.' },
    ],
    tips: [
      'Comparez au moins 3 devis de transitaires — les prix varient considérablement',
      'Envoyez vos biens 2 à 3 mois avant votre départ pour qu\'ils arrivent à temps',
      'Prévoyez un budget douane même avec la franchise — certains articles peuvent être taxés',
      'N\'expédiez pas de produits interdits (armes, contrefaçons, certains médicaments sans ordonnance)',
      'Faites des photos de tous vos biens DANS le conteneur avant la fermeture',
    ],
    links: [
      { label: 'Douanes Gabon', url: 'https://www.douanes.ga', description: 'Direction Générale des Douanes du Gabon' },
    ],
  },
  {
    id: 'reinstallation',
    icon: Home,
    title: 'Réinstallation au Gabon',
    color: 'text-green-600 dark:text-green-400',
    iconBg: 'bg-green-500/10',
    image: '/images/guide-logement.png',
    intro: 'Se réinstaller au Gabon après plusieurs années en France nécessite une période d\'adaptation. Voici comment faciliter votre transition dans tous les aspects du quotidien.',
    items: [
      { title: 'Logement à Libreville', detail: 'Le marché locatif à Libreville est actif mais les prix varient fortement selon les quartiers. Quartiers résidentiels : Batterie IV, Charbonnages, Glass, Akébé-Plaine. Budget moyen : 250 000 à 500 000 FCFA/mois pour un appartement correct (800 000+ pour une villa). Utilisez les groupes Facebook locaux ("Immobilier Libreville"), les agences (GIMMO, Immobilier du Gabon) et le bouche-à-oreille. Visitez TOUJOURS avant de signer.' },
      { title: 'Scolarisation des enfants', detail: 'Inscrivez vos enfants dans les établissements gabonais (publics gratuits, privés payants) ou dans le réseau AEFE si vous souhaitez continuer le cursus français. L\'inscription au lycée Blaise Pascal de Libreville se fait en ligne via l\'AEFE — anticipez les délais (dossier dès mars pour la rentrée de septembre). Frais de scolarité AEFE : environ 2 000 000 à 3 500 000 FCFA/an.' },
      { title: 'Vie quotidienne et adaptation', detail: 'Le retour peut provoquer un "choc culturel inversé". Acceptez une période d\'adaptation de 3 à 6 mois. Les habitudes, les rythmes de travail et les codes sociaux diffèrent. Rejoignez les associations de Gabonais de retour pour partager votre expérience. Les supermarchés locaux (Casino, Prix Import, Géant Ckdo) proposent des produits importés.' },
      { title: 'Banque et finances', detail: 'Ouvrez un compte bancaire local (BGFI Bank, Orabank, UGB). Documents : pièce d\'identité, justificatif de domicile, photo. Conservez votre compte français pour les transferts et le maintien de vos droits. Mobile money (Airtel Money, Mobicash) est très utilisé au quotidien. Le coût de la vie à Libreville peut être étonnamment élevé pour certains produits importés.' },
      { title: 'Télécommunications', detail: 'Opérateurs mobiles : Airtel Gabon, Libertis (Gabon Telecom). Forfaits internet : fibre disponible dans certains quartiers de Libreville (50 000+ FCFA/mois). L\'internet mobile 4G est la solution la plus courante. Récupérez un numéro local dès votre arrivée.' },
    ],
    tips: [
      'Visitez les quartiers et le logement en personne avant de signer un bail',
      'Gardez votre compte bancaire français ouvert pour faciliter les transferts pendant au moins 6 mois',
      'Inscrivez-vous au registre des Gabonais de retour auprès du ministère des Affaires étrangères',
      'Rejoignez les associations de Gabonais de retour pour bénéficier de conseils et d\'un réseau de solidarité',
      'Prévoyez un budget de transition pour 3 à 6 mois — le retour a un coût',
    ],
    links: [
      { label: 'Lycée Blaise Pascal', url: 'https://lfbp-libreville.net', description: 'Lycée français de Libreville (AEFE)' },
      { label: 'BGFI Bank', url: 'https://www.bgfi.com', description: 'Première banque d\'Afrique Centrale' },
    ],
  },
  {
    id: 'emploi',
    icon: Briefcase,
    title: 'Emploi & Entrepreneuriat',
    color: 'text-purple-600 dark:text-purple-400',
    iconBg: 'bg-purple-500/10',
    image: '/images/guide-emploi.png',
    intro: 'Votre expérience et vos compétences acquises en France sont un atout majeur sur le marché gabonais. Voici comment valoriser votre parcours et saisir les opportunités.',
    items: [
      { title: 'Marché de l\'emploi au Gabon', detail: 'Secteurs porteurs : pétrole & mines (Total, Perenco, Comilog), BTP (infrastructure publique), nouvelles technologies (e-commerce, fintech), finance & banque, santé, éducation, hôtellerie/tourisme, économie verte. Les profils formés en France sont recherchés pour leur expertise technique et leur bilinguisme. Consultez les offres : ONE (Office National de l\'Emploi), Emploi.ga, LinkedIn, Bayt Gabon.' },
      { title: 'Entrepreneuriat — Création d\'entreprise', detail: 'Le Gabon encourage l\'entrepreneuriat via l\'ANPI (Agence Nationale de Promotion des Investissements). Création d\'entreprise possible en quelques jours au guichet unique. Secteurs porteurs pour les entrepreneurs de retour : agro-alimentaire (transformation locale), services numériques, logistique, tourisme vert, conseil aux entreprises. Le statut d\'auto-entrepreneur existe aussi au Gabon.' },
      { title: 'Reconnaissance des diplômes', detail: 'Vos diplômes français doivent être légalisés pour être reconnus au Gabon. Procédure : 1) Apostille au tribunal judiciaire français (gratuit, mais délai de 2 à 4 semaines). 2) Légalisation au ministère gabonais de l\'Éducation Nationale. Prévoyez 1 à 3 mois de délai total. ⚠️ Faites cette démarche AVANT votre départ de France.' },
      { title: 'Réseaux professionnels', detail: 'Rejoignez la Chambre de Commerce Franco-Gabonaise, le Club des Gabonais de retour, la CGPME Gabon, et participez aux salons professionnels (PROMOTE, Forum Emploi Gabon, SIEE). Le networking est ESSENTIEL au Gabon — la recommandation personnelle est souvent plus efficace qu\'une candidature en ligne.' },
      { title: 'Avantages fiscaux pour les investisseurs', detail: 'Le Code des Investissements gabonais prévoit des exonérations fiscales pour les entreprises nouvellement créées : exonération de TVA sur les équipements importés, réduction d\'impôt sur les bénéfices pendant 3 à 5 ans (selon la zone), facilités d\'importation du matériel professionnel. Renseignez-vous auprès de l\'ANPI pour votre projet spécifique.' },
    ],
    tips: [
      'Faites reconnaître vos diplômes AVANT votre retour — les délais sont longs au Gabon',
      'Le bilinguisme français-anglais est un atout majeur dans les entreprises internationales au Gabon',
      'Renseignez-vous sur les exonérations fiscales pour les entreprises nouvellement créées auprès de l\'ANPI',
      'Consultez Business France pour les opportunités d\'affaires France-Gabon',
      'Le réseau personnel est crucial — activez vos contacts avant même d\'arriver',
    ],
    links: [
      { label: 'ANPI Gabon', url: 'https://www.anpi.ga', description: 'Agence Nationale de Promotion des Investissements' },
      { label: 'ONE Gabon', url: 'https://one.ga', description: 'Office National de l\'Emploi' },
      { label: 'Business France', url: 'https://www.businessfrance.fr', description: 'Opportunités d\'affaires France-Gabon' },
    ],
  },
  {
    id: 'droits',
    icon: Shield,
    title: 'Maintien des droits acquis',
    color: 'text-teal-600 dark:text-teal-400',
    iconBg: 'bg-teal-500/10',
    intro: 'Quitter la France ne signifie pas perdre tous vos droits. Certains droits sociaux, de retraite et de protection sont maintenus ou transférables. Anticipez les démarches.',
    items: [
      { title: 'Retraite française', detail: 'Vos trimestres cotisés en France sont acquis DÉFINITIVEMENT. La convention bilatérale France-Gabon permet de cumuler les périodes travaillées dans les deux pays pour le calcul de votre retraite. Demandez un relevé de carrière sur lassuranceretraite.fr AVANT votre départ. Vous pourrez percevoir votre retraite française depuis le Gabon par virement bancaire.' },
      { title: 'Droits à l\'assurance chômage', detail: 'En cas de retour définitif, vous perdez vos droits à l\'allocation chômage française. Cependant, si vous revenez en France ultérieurement, vos droits résiduels peuvent être réactivés sous conditions (dans les 3 ans suivant votre dernier pointage). Renseignez-vous auprès de France Travail AVANT de partir. Demandez une attestation de droits.' },
      { title: 'Sécurité sociale (CFE)', detail: 'La Caisse des Français de l\'Étranger (CFE) permet de conserver une couverture maladie française depuis le Gabon. Adhésion volontaire, cotisations selon vos revenus (à partir de 100 €/mois). Alternative locale : la CNAMGS (Caisse Nationale d\'Assurance Maladie et de Garantie Sociale) au Gabon. ⚠️ La CFE est surtout utile si vous prévoyez des soins en France ou un retour ultérieur.' },
      { title: 'Fiscalité du départ', detail: 'L\'année de votre départ, vous faites DEUX déclarations d\'impôts : une au titre de résident (du 1er janvier à la date de départ) et une au titre de non-résident (du départ au 31 décembre). Vous restez imposable en France sur vos revenus de SOURCE française uniquement (revenus locatifs, retraite française). Convention fiscale France-Gabon : évite la double imposition.' },
      { title: 'Droits civiques et consulaires', detail: 'En tant que Gabonais au Gabon, vous retrouvez vos pleins droits civiques gabonais. Si vous êtes binational franco-gabonais, vous pouvez voter aux élections françaises depuis le Gabon (inscription sur les listes consulaires au consulat de France à Libreville). Inscrivez-vous au consulat de France à Libreville pour maintenir votre protection consulaire française.' },
    ],
    tips: [
      'Demandez votre relevé de carrière retraite AVANT de quitter la France',
      'La convention France-Gabon évite la double imposition — renseignez-vous sur les modalités',
      'Conservez votre numéro de sécurité sociale français — il reste actif à vie',
      'Inscrivez-vous au consulat de France à Libreville si vous êtes binational',
      'Conservez vos bulletins de salaire et attestations — ils sont irremplaçables',
    ],
    links: [
      { label: 'L\'Assurance Retraite', url: 'https://www.lassuranceretraite.fr', description: 'Relevé de carrière et droits retraite' },
      { label: 'CFE', url: 'https://www.cfe.fr', description: 'Caisse des Français de l\'Étranger — couverture maladie' },
      { label: 'Impots.gouv.fr', url: 'https://www.impots.gouv.fr', description: 'Déclaration de revenus et départ de France' },
    ],
  },
  {
    id: 'sante-gabon',
    icon: Stethoscope,
    title: 'Santé & Bien-être au Gabon',
    color: 'text-red-600 dark:text-red-400',
    iconBg: 'bg-red-500/10',
    intro: 'La transition sanitaire est un aspect important du retour. Le système de santé gabonais est en développement et présente des différences importantes avec le système français.',
    items: [
      { title: 'Système de santé gabonais', detail: 'Le CHU de Libreville est le principal hôpital public. Les cliniques privées (El Rapha, Chambrier, La Peyrie) offrent des soins de meilleure qualité mais à des tarifs plus élevés. Pour les soins spécialisés non disponibles au Gabon, une évacuation sanitaire vers la France ou le Maroc peut être nécessaire. L\'inscription à la CNAMGS est obligatoire pour bénéficier de la couverture maladie nationale.' },
      { title: 'Couverture santé', detail: 'Options : la CNAMGS (couverture nationale, obligatoire pour les salariés), la CFE (maintien de la couverture française, volontaire), ou une assurance santé internationale privée (Allianz, AXA, BUPA). Pour les premiers mois, cumulez la CFE et la CNAMGS pour une couverture optimale. Prévoyez un budget santé conséquent les premiers mois.' },
      { title: 'Vaccinations', detail: 'Vérifiez vos vaccins avant le retour : fièvre jaune (obligatoire, certificat international exigé), hépatites A et B, typhoïde, méningite. Le paludisme est endémique au Gabon — prenez les précautions nécessaires : moustiquaire imprégnée, répulsifs, consultation rapide en cas de fièvre. Emportez une trousse de premiers soins et un traitement antipaludéen d\'urgence.' },
      { title: 'Médicaments et traitements', detail: 'Certains médicaments disponibles en France ne le sont pas au Gabon. Emportez un stock de 3 à 6 mois pour les traitements chroniques. Demandez des prescriptions en DCI (nom générique international) pour faciliter les équivalences. Les pharmacies de Libreville sont bien approvisionnées pour les médicaments courants.' },
      { title: 'Bien-être et adaptation psychologique', detail: 'Le retour au pays peut générer un "choc culturel inversé" : décalage avec les habitudes locales, nostalgie de la France, difficulté à retrouver ses repères. Ce phénomène est normal et temporaire (3 à 6 mois). Ne restez pas isolé — rejoignez les communautés de retournants. Si nécessaire, consultez un professionnel de santé mentale.' },
    ],
    tips: [
      'Souscrivez une assurance santé internationale pour les premiers mois — la transition prend du temps',
      'Emportez vos ordonnances françaises traduites en DCI pour faciliter les équivalences',
      'Vérifiez votre carnet de vaccination AVANT le départ — la fièvre jaune est obligatoire',
      'Constituez un stock de médicaments pour 3 à 6 mois pour vos traitements chroniques',
    ],
    links: [
      { label: 'CNAMGS', url: 'https://www.cnamgs.com', description: 'Caisse Nationale d\'Assurance Maladie du Gabon' },
      { label: 'CFE', url: 'https://www.cfe.fr', description: 'Maintien de la couverture maladie française' },
      { label: 'Institut Pasteur — Vaccins', url: 'https://www.pasteur.fr/fr/centre-medical/preparer-son-voyage', description: 'Recommandations vaccinales par pays' },
    ],
  },
  {
    id: 'oqtf-retour',
    icon: AlertOctagon,
    title: 'OQTF & Retour contraint',
    color: 'text-rose-600 dark:text-rose-400',
    iconBg: 'bg-rose-500/10',

    intro: 'Si vous êtes sous OQTF (Obligation de Quitter le Territoire Français), le consulat vous accompagne dans cette épreuve. Connaître vos droits et préparer votre retour dignement est essentiel.',
    items: [
      { title: 'Comprendre votre situation', detail: 'Une OQTF ne signifie pas que votre vie s\'arrête. C\'est une décision administrative qui peut être contestée. Deux cas de figure : 1) Retour volontaire dans le délai de 30 jours — vous conservez le droit de revenir en France ultérieurement avec un nouveau visa. 2) Retour forcé après expiration du délai — une interdiction de retour (IRTF) de 1 à 3 ans peut être prononcée. ⚠️ Le retour volontaire est TOUJOURS préférable au retour forcé.' },
      { title: 'Vos droits avant le départ', detail: 'Même sous OQTF, vous conservez des droits fondamentaux : le droit de contester la décision (recours au tribunal administratif), le droit à la protection consulaire (contactez le consulat), le droit aux soins médicaux urgents, le droit de scolariser vos enfants jusqu\'au départ effectif. Aucune administration ne peut vous refuser ces droits.' },
      { title: 'Rôle du Consulat Général', detail: 'Le consulat peut : 1) Vous orienter vers un avocat spécialisé en droit des étrangers. 2) Vous aider à constituer votre dossier de régularisation le cas échéant. 3) Délivrer un laissez-passer consulaire pour le retour. 4) Vous mettre en contact avec les services d\'aide au retour de l\'OFII. 5) Faciliter votre réinstallation au Gabon via le réseau consulaire. Le consulat ne peut PAS s\'opposer juridiquement à l\'OQTF.' },
      { title: 'Aide au retour volontaire (OFII)', detail: 'L\'OFII propose une aide financière au retour volontaire : billet d\'avion pris en charge, allocation de réinstallation (jusqu\'à 1 000 € par adulte, 500 € par enfant), aide à la création d\'entreprise au Gabon (jusqu\'à 5 000 €), accompagnement social et administratif. Conditions : accepter le retour volontaire, ne pas avoir bénéficié d\'une aide au retour dans les 5 dernières années.' },
      { title: 'Préparer le retour contraint', detail: 'Si le retour est inévitable : 1) Sécurisez vos économies (transférez sur un compte au Gabon). 2) Récupérez votre dossier médical et vos ordonnances. 3) Faites apostiller vos diplômes et transcrire vos actes d\'état civil au consulat. 4) Informez votre famille au Gabon. 5) Emportez tous vos documents originaux (passeport, diplômes, bulletins de salaire, relevé de carrière retraite). 6) Contactez les associations de retournants au Gabon.' },
      { title: 'Vie après le retour — Rebondir', detail: 'Un retour sous OQTF n\'est pas une fin. Votre expérience en France (études, travail, compétences linguistiques) est un atout au Gabon. Les secteurs numériques, éducatifs et de services valorisent les profils internationaux. L\'ANPI accompagne les Gabonais de la diaspora dans la création d\'entreprise. Des programmes d\'aide à la réinsertion existent via l\'OFII et les associations locales.' },
      { title: 'Revenir en France après une OQTF', detail: 'Le retour volontaire dans le délai préserve votre droit de redemander un visa. Si une IRTF a été prononcée, vous devez attendre la fin de la période d\'interdiction (1 à 3 ans). Après l\'expiration de l\'IRTF, vous pouvez déposer une nouvelle demande de visa au consulat de France à Libreville. Un dossier solide (motif de voyage, ressources, garanties de retour) augmentera vos chances.' },
    ],
    tips: [
      'Le retour VOLONTAIRE dans le délai de 30 jours est TOUJOURS préférable — il préserve vos droits futurs',
      'Contactez le consulat DÈS la réception de l\'OQTF pour un accompagnement',
      'L\'aide de l\'OFII peut atteindre 5 000 € pour un projet de création d\'entreprise au Gabon',
      'Conservez TOUS vos documents français — ils sont votre capital pour la suite au Gabon',
      'Ne restez pas isolé — les associations de retournants offrent un soutien moral et pratique',
    ],
    links: [
      { label: 'OFII — Retour', url: 'https://www.ofii.fr/procedure/retourner-dans-son-pays', description: 'Programme d\'aide au retour volontaire' },
      { label: 'CIMADE', url: 'https://www.lacimade.org', description: 'Accompagnement juridique gratuit' },
      { label: 'ANPI Gabon', url: 'https://www.anpi.ga', description: 'Aide à la création d\'entreprise au Gabon' },
      { label: 'Défenseur des droits', url: 'https://www.defenseurdesdroits.fr', description: 'Recours en cas de litige avec l\'administration' },
    ],
  },
]

// ─── Additional data ─────────────────────────────────────────────────────────

const aides: { icon: typeof HandCoins; title: string; detail: string }[] = [
  { icon: HandCoins, title: 'Aide au retour volontaire (OFII)', detail: 'L\'OFII propose une aide financière au retour volontaire incluant : billet d\'avion, allocation de réinstallation (jusqu\'à 1 000€/adulte), aide à la création d\'entreprise (jusqu\'à 5 000€), et accompagnement social et administratif.' },
  { icon: GraduationCap, title: 'Programmes ANPI', detail: 'L\'Agence Nationale de Promotion des Investissements facilite l\'installation des Gabonais de la diaspora : accompagnement dans la création d\'entreprise, avantages fiscaux, mise en réseau avec les acteurs économiques locaux.' },
  { icon: Users, title: 'Associations de la diaspora', detail: 'Les associations comme le collectif des Gabonais de retour offrent un réseau de solidarité, des conseils pratiques sur la réinstallation et un soutien moral pour faciliter la réintégration dans le pays.' },
]

const erreurs: ErreurItem[] = [
  { erreur: 'Partir sans faire apostiller ses diplômes', conseil: 'Faites apostiller tous vos diplômes au tribunal judiciaire AVANT votre départ. C\'est gratuit mais les délais sont de 2 à 4 semaines.' },
  { erreur: 'Ne pas informer les administrations françaises', conseil: 'Prévenez la CAF, la CPAM, France Travail et les impôts de votre départ définitif. Vous éviterez les trop-perçus et les pénalités.' },
  { erreur: 'Fermer son compte bancaire français trop tôt', conseil: 'Gardez votre compte ouvert pendant au moins 6 mois après le retour pour les virements en cours et les droits résiduels (retraite, chômage).' },
  { erreur: 'Ne pas transcrire les actes d\'état civil', conseil: 'Les naissances et mariages en France doivent être transcrits au consulat AVANT le retour. Les démarches sont plus complexes depuis le Gabon.' },
  { erreur: 'Sous-estimer les frais de réinstallation', conseil: 'Prévoyez un budget conséquent pour les 3 à 6 premiers mois : logement, transport, santé, alimentation. Le coût de la vie à Libreville est élevé.' },
  { erreur: 'Ignorer la franchise douanière', conseil: 'Renseignez-vous auprès des douanes gabonaises AVANT d\'expédier vos biens. Les conditions d\'exonération sont strictes et les contrôles systématiques.' },
  { erreur: 'Ne pas prendre de stock de médicaments', conseil: 'Certains médicaments disponibles en France sont introuvables au Gabon. Emportez un stock de 3 à 6 mois pour vos traitements chroniques.' },
]

const numerosUtiles: NumeroUtile[] = [
  { label: 'Consul Général du Gabon à Paris', number: '26 bis av. Raphaël, 75016', color: 'bg-emerald-500/10 text-emerald-600' },
  { label: 'Email Consulat du Gabon', number: 'contact@consulatdugabon.fr', color: 'bg-emerald-500/10 text-emerald-600' },
  { label: 'Urgence consulaire Gabon', number: '07 44 23 95 84', color: 'bg-green-500/10 text-green-600' },
  { label: 'OFII (Aide au retour)', number: '01 53 69 53 70', color: 'bg-blue-500/10 text-blue-600' },
  { label: 'Douanes du Gabon', number: '+241 01 72 13 26', color: 'bg-orange-500/10 text-orange-600' },
  { label: 'ANPI Gabon', number: '+241 01 79 52 52', color: 'bg-purple-500/10 text-purple-600' },
  { label: 'ONE (Emploi Gabon)', number: '+241 01 76 01 11', color: 'bg-indigo-500/10 text-indigo-600' },
  { label: 'Ambassade de France à Libreville', number: '+241 01 79 70 00', color: 'bg-red-500/10 text-red-600' },
  { label: 'CNAMGS (Santé Gabon)', number: '+241 01 76 26 52', color: 'bg-pink-500/10 text-pink-600' },
]

// ─── Main Page Component ─────────────────────────────────────────────────────

function RetourAuGabonPage() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1">

        {/* ── Hero ────────────────────────────────────────────────────────── */}
        <PageHero image="/images/heroes/hero-consulat.png">
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 backdrop-blur-sm">
                <BookOpen className="w-3.5 h-3.5 mr-1.5" />
                {t('retourGabon.badge', 'Guide de retour')}
              </Badge>

              <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4">
                {t('retourGabon.heroTitle', 'Retour au Gabon')}{' '}
                <span className="text-gradient">{t('retourGabon.heroHighlight', '— Bien préparer')}</span>
              </h1>

              <p className="text-base text-muted-foreground mb-6 max-w-2xl leading-relaxed">
                {t('retourGabon.heroDescription', 'Guide complet pour les Gabonais rentrant au pays : démarches consulaires, déménagement, réinstallation, emploi, OQTF, aides et maintien de vos droits acquis en France.')}
              </p>

              <div className="flex flex-wrap gap-2">
                {guideSections.map((s) => {
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

        {/* ── Guides thématiques ──────────────────────────────────────────── */}
        <section className="py-16 px-6 bg-background">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                <FileText className="w-3.5 h-3.5 mr-1.5" />
                {t('retourGabon.steps.badge', 'Étapes du retour')}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t('retourGabon.steps.title', 'Préparez chaque étape')}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t('retourGabon.steps.description', 'Du premier jour de préparation à votre réinstallation, chaque étape est détaillée avec des conseils pratiques et des liens utiles.')}
              </p>
            </div>

            <div className="space-y-8">
              {guideSections.map((section) => (
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
                {t('retourGabon.aides.badge', 'Aides & Accompagnement')}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t('retourGabon.aides.title', 'Des aides pour votre retour')}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t('retourGabon.aides.description', 'Plusieurs dispositifs existent pour faciliter votre réintégration au Gabon.')}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {aides.map((aide, idx) => {
                const Icon = aide.icon
                return (
                  <div key={idx} className="glass-card rounded-2xl p-6 hover:-translate-y-2 transition-all duration-300">
                    <div className="p-3 rounded-xl bg-primary/10 w-fit mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg text-foreground mb-2">{aide.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{aide.detail}</p>
                  </div>
                )
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
                {t('retourGabon.erreurs.badge', 'Erreurs à éviter')}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t('retourGabon.erreurs.title', 'Ne commettez pas ces erreurs')}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t('retourGabon.erreurs.description', 'Ces oublis peuvent compliquer votre retour. Anticipez-les pour partir sereinement.')}
              </p>
            </div>

            <ErreursCourantesGrid items={erreurs} />
          </div>
        </section>

        {/* ── Numéros utiles ──────────────────────────────────────────────── */}
        <section className="py-16 px-6 bg-muted/20">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4 bg-background/50">
                <Phone className="w-3.5 h-3.5 mr-1.5" />
                {t('retourGabon.numeros.badge', 'Contacts essentiels')}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t('retourGabon.numeros.title', 'Numéros utiles')}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t('retourGabon.numeros.description', 'À conserver pour votre retour au Gabon.')}
              </p>
            </div>

            <NumerosUtilesGrid items={numerosUtiles} />
          </div>
        </section>




        <CitizenCTA />

      </div>
    </div>
  )
}
