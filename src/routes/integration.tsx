import { createFileRoute, Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import {
  Heart,
  Home,
  GraduationCap,
  Briefcase,
  Scale,
  Baby,
  Shield,
  HandHeart,
  Landmark,
  AlertTriangle,
  BookOpen,
  Users,
  ChevronDown,
  Phone,
  MapPin,
  Lightbulb,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  HeartHandshake,
  Flag,
  Siren,
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PageHero } from '@/components/PageHero'
import { CitizenCTA } from '@/components/home/CitizenCTA'
import {
  SavoirVivreGrid,
  ErreursCourantesGrid,
  NumerosUtilesGrid,
  type SavoirVivreItem,
  type ErreurItem,
  type NumeroUtile,
} from '@/components/guides'

export const Route = createFileRoute('/integration')({
  component: IntegrationPage,
})

// ─── Types (page-specific: no links field) ───────────────────────────────────

interface GuideSection {
  id: string
  icon: typeof Heart
  title: string
  color: string
  iconBg: string
  intro: string
  items: { title: string; detail: string }[]
  tips: string[]
}

// ─── Data ────────────────────────────────────────────────────────────────────

const guideSections: GuideSection[] = [
  {
    id: 'logement',
    icon: Home,
    title: 'Logement',
    color: 'text-blue-600 dark:text-blue-400',
    iconBg: 'bg-blue-500/10',
    intro: 'Le logement est souvent la première étape de votre installation. Voici les clés pour comprendre le marché locatif français et accéder à vos droits.',
    items: [
      { title: 'Recherche de logement', detail: 'Utilisez les plateformes officielles (Leboncoin, SeLoger, PAP) et les agences immobilières. Méfiez-vous des annonces trop avantageuses — ne versez jamais d\'argent avant la visite et la signature du bail.' },
      { title: 'Dossier locatif', detail: 'Préparez : pièce d\'identité, 3 derniers bulletins de salaire, contrat de travail, avis d\'imposition, justificatif de domicile actuel. Un garant (ou le dispositif Visale gratuit) est souvent exigé.' },
      { title: 'Aides au logement (CAF)', detail: 'Vous pouvez bénéficier de l\'APL (Aide Personnalisée au Logement) ou de l\'ALS selon votre situation. Faites votre demande sur caf.fr dès la signature de votre bail.' },
      { title: 'Droits du locataire', detail: 'Le propriétaire ne peut pas vous demander : photo, relevé bancaire, carte vitale. Le dépôt de garantie est plafonné à 1 mois de loyer (hors charges). La trêve hivernale protège contre les expulsions du 1er novembre au 31 mars.' },
    ],
    tips: [
      'Le dispositif Visale (gratuit, via Action Logement) remplace le garant physique',
      'Ouvrez un compte bancaire français rapidement — c\'est indispensable pour le prélèvement du loyer',
      'Souscrivez une assurance habitation obligatoire dès l\'entrée dans le logement',
    ],
  },
  {
    id: 'sante',
    icon: Heart,
    title: 'Santé & Protection sociale',
    color: 'text-red-600 dark:text-red-400',
    iconBg: 'bg-red-500/10',
    intro: 'La France dispose d\'un système de santé universel. En tant que résident, vous avez droit à la couverture maladie. Voici comment en bénéficier.',
    items: [
      { title: 'Inscription à la Sécurité sociale', detail: 'Inscrivez-vous sur le site ameli.fr (CPAM) avec votre titre de séjour, justificatif de domicile et RIB. Le dispositif PUMA garantit la prise en charge des soins pour tout résident stable en France (plus de 3 mois).' },
      { title: 'Complémentaire santé (Mutuelle)', detail: 'La Sécurité sociale rembourse environ 70% des frais médicaux. Une mutuelle couvre le reste. Si vos revenus sont modestes, la Complémentaire Santé Solidaire (CSS, ex-CMU-C) est gratuite ou à moins de 1€/jour.' },
      { title: 'Médecin traitant', detail: 'Déclarez un médecin traitant auprès de votre CPAM — c\'est obligatoire pour un remboursement optimal. Consultez l\'annuaire-sante.ameli.fr pour trouver un médecin qui accepte de nouveaux patients.' },
      { title: 'Urgences et numéros utiles', detail: 'SAMU : 15 • Pompiers : 18 • Urgences européennes : 112 • SOS Médecins (consultations à domicile) • Pharmacies de garde (composez le 3237). Aux urgences hospitalières, vous serez soigné même sans carte vitale.' },
    ],
    tips: [
      'Conservez toujours sur vous votre carte vitale (ou attestation provisoire)',
      'La téléconsultation est remboursée — pratique quand on ne trouve pas de médecin',
      'Les centres de santé municipaux proposent des consultations sans dépassement d\'honoraires',
    ],
  },
  {
    id: 'education',
    icon: GraduationCap,
    title: 'Éducation & Formation',
    color: 'text-green-600 dark:text-green-400',
    iconBg: 'bg-green-500/10',
    intro: 'Le système éducatif français est accessible à tous les enfants résidant en France, quelle que soit la nationalité. Pour les adultes, de nombreuses formations existent.',
    items: [
      { title: 'Scolarisation des enfants', detail: 'L\'instruction est obligatoire de 3 à 16 ans. Inscrivez votre enfant à la mairie de votre commune puis à l\'école. Aucun document de séjour ne peut être exigé pour l\'inscription scolaire d\'un enfant.' },
      { title: 'Études supérieures', detail: 'Inscription via Parcoursup (lycéens en France) ou Campus France (depuis le Gabon). Les frais d\'inscription publiques sont modérés (170€ à 380€/an). Demandez une bourse CROUS sur messervices.etudiant.gouv.fr.' },
      { title: 'Reconnaissance des diplômes', detail: 'Le centre ENIC-NARIC délivre des attestations de comparabilité de vos diplômes gabonais. Cette attestation facilite la recherche d\'emploi et l\'inscription en formation. Coût : environ 70€.' },
      { title: 'Formation professionnelle (adultes)', detail: 'Le Compte Personnel de Formation (CPF) finance des formations certifiantes. Pôle Emploi / France Travail propose aussi des formations gratuites pour les demandeurs d\'emploi. La VAE permet de faire reconnaître votre expérience.' },
    ],
    tips: [
      'Les cours de français (FLE) sont souvent gratuits dans les associations et les mairies',
      'La carte d\'étudiant donne accès à de nombreuses réductions (transport, culture, restauration CROUS)',
      'Les bibliothèques municipales sont gratuites et offrent accès à internet, presse et formations en ligne',
    ],
  },
  {
    id: 'emploi',
    icon: Briefcase,
    title: 'Emploi & Entrepreneuriat',
    color: 'text-orange-600 dark:text-orange-400',
    iconBg: 'bg-orange-500/10',
    intro: 'Travailler en France nécessite un titre de séjour autorisant le travail. Voici les étapes clés pour accéder au marché de l\'emploi ou créer votre activité.',
    items: [
      { title: 'Autorisation de travail', detail: 'Vérifiez que votre titre de séjour autorise le travail (mention "autorise son titulaire à travailler"). Les cartes de résident, les cartes "vie privée et familiale" et les cartes "salarié" autorisent le travail. Les visas étudiants permettent de travailler 964 heures/an.' },
      { title: 'Recherche d\'emploi', detail: 'Inscrivez-vous à France Travail (ex-Pôle Emploi) pour bénéficier d\'un accompagnement et d\'indemnités si vous avez cotisé. Utilisez aussi : LinkedIn, Indeed, HelloWork, l\'APEC (cadres). Le CV français est sans photo, concis (1-2 pages).' },
      { title: 'Créer son entreprise', detail: 'Le statut auto-entrepreneur (micro-entreprise) est le plus simple : inscription gratuite en ligne sur autoentrepreneur.urssaf.fr. Pour les activités plus importantes, consultez la CCI (Chambre de Commerce et d\'Industrie) ou un accompagnateur BGE.' },
      { title: 'Droits des salariés', detail: 'SMIC 2025 : environ 1 426€ net/mois. 5 semaines de congés payés. Durée légale : 35h/semaine. Vous avez droit aux mêmes protections que tout salarié français (contrat de travail obligatoire, bulletin de paie, assurance chômage).' },
    ],
    tips: [
      'L\'aide ACRE exonère de charges sociales la première année de création d\'entreprise',
      'Les missions locales accompagnent gratuitement les 16-25 ans dans l\'emploi',
      'Attention au travail non déclaré ("au noir") : c\'est illégal et vous prive de toute protection sociale',
    ],
  },
  {
    id: 'droits',
    icon: Scale,
    title: 'Droits, Séjour & Citoyenneté',
    color: 'text-purple-600 dark:text-purple-400',
    iconBg: 'bg-purple-500/10',
    intro: 'Comprendre vos droits et les démarches liées à votre titre de séjour est essentiel pour vivre sereinement en France.',
    items: [
      { title: 'Titre de séjour', detail: 'Renouvelez votre titre 2 à 4 mois avant expiration sur le site de la préfecture (ANEF). Types principaux : VLS-TS (visa long séjour valant titre), carte de séjour temporaire (1 an), carte pluriannuelle (4 ans), carte de résident (10 ans).' },
      { title: 'Recours OQTF — Vos droits', detail: 'Si vous recevez une OQTF, ne l\'ignorez JAMAIS. Trois recours existent : 1) Recours gracieux auprès du Préfet (2 mois, NE suspend PAS l\'OQTF). 2) Recours hiérarchique auprès du Ministre de l\'Intérieur (2 mois, NE suspend PAS l\'OQTF). 3) Recours contentieux devant le Tribunal Administratif (30 jours, ou 48h si OQTF sans délai) — c\'est le SEUL recours qui SUSPEND l\'exécution de l\'OQTF. L\'aide juridictionnelle est accessible. Consultez immédiatement un avocat spécialisé.' },
      { title: 'Régularisation de séjour', detail: 'Options : admission exceptionnelle (circulaire Valls 2012 — ancienneté + insertion), régularisation par le travail (contrat ou promesse d\'embauche), motif familial (parent d\'enfant français, conjoint de Français), raisons médicales (traitement indisponible au Gabon), protection internationale (OFPRA). Documents essentiels : passeport, justificatifs de domicile, preuves de présence en France.' },
      { title: 'Droit au travail étudiant (964 h/an)', detail: 'Les étudiants étrangers avec un VLS-TS mention "étudiant" sont autorisés à travailler 964 heures/an (60% de la durée légale) sans autorisation supplémentaire. Pour la carte pluriannuelle étudiant : assiduité requise + ressources min. 615 €/mois. L\'APS après un Master (accord franco-gabonais du 5 juillet 2007) donne droit au travail à temps plein pendant 9 mois, renouvelable une fois (18 mois maximum).' },
      { title: 'Changement d\'adresse (obligatoire)', detail: 'Tout étranger titulaire d\'un titre de séjour doit signaler son changement d\'adresse dans les 3 mois sur le portail ANEF ou en préfecture. Le non-respect entraîne une amende possible et des complications au renouvellement. Documents : titre de séjour + nouveau justificatif de domicile.' },
      { title: 'Binationaux (Franco-Gabonais)', detail: 'Le Gabon ne reconnaît pas officiellement la double nationalité, mais elle est tolérée en pratique. Un visa est obligatoire pour entrer au Gabon avec un passeport français — il s\'obtient uniquement au Consulat Général du Gabon à Paris (26 bis avenue Raphaël, 75016), délai 3 jours ouvrés, présence physique requise. Conseil : entrez en France avec le passeport français, au Gabon avec le passeport gabonais.' },
      { title: 'Regroupement familial', detail: 'Vous pouvez faire venir votre conjoint et vos enfants mineurs si vous résidez légalement en France depuis au moins 18 mois, disposez de ressources stables et d\'un logement adapté. Dossier à déposer auprès de l\'OFII.' },
      { title: 'Naturalisation française', detail: 'Possible après 5 ans de résidence régulière en France (réduit dans certains cas). Conditions : maîtrise du français (niveau B1), connaissance des droits et devoirs, insertion professionnelle, absence de condamnation pénale.' },
      { title: 'Aide juridique', detail: 'L\'aide juridictionnelle prend en charge vos frais d\'avocat si vos revenus sont modestes. Les Maisons de Justice et du Droit offrent des consultations juridiques gratuites. Contactez aussi le Défenseur des droits (discrimination, droits fondamentaux). Numéro : 3039.' },
    ],
    tips: [
      'Gardez toujours une copie numérique de vos documents (passeport, titre de séjour, bail) dans un cloud sécurisé',
      'Ne laissez jamais votre titre de séjour expirer — même en cas de retard de la préfecture, conservez votre récépissé',
      'Les associations comme la CIMADE, le GISTI ou la Ligue des droits de l\'Homme peuvent vous aider gratuitement',
      'Ne jamais ignorer une OQTF — privilégiez le recours contentieux (tribunal administratif), c\'est le SEUL suspensif',
      'Les étudiants doivent respecter le plafond de 964h/an sous peine de refus de renouvellement',
      'Un récépissé de première demande ne permet PAS de quitter la France — seul le titre définitif le permet',
    ],
  },
  {
    id: 'famille',
    icon: Baby,
    title: 'Famille & Enfants',
    color: 'text-pink-600 dark:text-pink-400',
    iconBg: 'bg-pink-500/10',
    intro: 'La France offre un soutien important aux familles. Voici les démarches essentielles et les aides auxquelles vous avez droit.',
    items: [
      { title: 'Déclaration de naissance', detail: 'Déclarez la naissance à la mairie du lieu d\'accouchement dans les 5 jours. Puis faites transcrire l\'acte au Consulat du Gabon pour que votre enfant soit reconnu comme gabonais. Apportez : acte de naissance français, passeports des parents, livret de famille.' },
      { title: 'Allocations familiales (CAF)', detail: 'Dès le 2ème enfant, vous recevez les allocations familiales automatiquement. La prime à la naissance (PAJE) aide dès la grossesse. L\'allocation de rentrée scolaire (ARS) est versée en août pour les enfants de 6 à 18 ans. Inscrivez-vous sur caf.fr.' },
      { title: 'Garde d\'enfants', detail: 'Modes de garde : crèche municipale (inscription dès la grossesse à la mairie), assistante maternelle agréée, micro-crèche. Le complément de libre choix du mode de garde (CMG) aide à financer les frais de garde.' },
      { title: 'Mariage & État civil', detail: 'Un mariage contracté en France doit être transcrit au Consulat pour être reconnu au Gabon. Pour un mariage mixte (gabonais-français), le consulat délivre le certificat de capacité à mariage. Anticipez les délais (2-3 mois).' },
    ],
    tips: [
      'La PMI (Protection Maternelle et Infantile) offre des consultations gratuites pour les enfants de 0 à 6 ans',
      'Le livret de famille français est un document officiel — demandez-le à la mairie lors du mariage ou de la naissance du premier enfant',
      'L\'assurance scolaire est quasi-obligatoire et coûte environ 10€/an',
    ],
  },
]

// ─── Codes de conduite / Savoir-vivre ────────────────────────────────────────

const savoirVivre: SavoirVivreItem[] = [
  { icon: HandHeart, title: 'Respect et courtoisie', description: 'En France, les formules de politesse sont très importantes. Dites "Bonjour" en entrant dans un commerce, "Merci", "S\'il vous plaît", "Excusez-moi". Le vouvoiement est la règle avec les inconnus, les aînés et en contexte professionnel. Le tutoiement se fait entre amis proches.' },
  { icon: Landmark, title: 'Laïcité et vivre ensemble', description: 'La France est un État laïc. La liberté de culte est garantie, mais la religion relève de la sphère privée. Dans les services publics (école, mairie, hôpital), une attitude neutre est attendue. Le respect de toutes les croyances et de la non-croyance est un principe fondamental.' },
  { icon: Scale, title: 'Lois et règles de vie', description: 'Le respect des lois est non-négociable : code de la route, interdiction de fumer dans les lieux publics fermés, tri des déchets, respect du voisinage (bruit limité entre 22h et 7h). Les amendes sont réelles et peuvent impacter votre dossier de renouvellement de titre.' },
  { icon: Users, title: 'Relations de voisinage', description: 'Se présenter à ses voisins en emménageant est apprécié. Respectez le règlement de copropriété, les horaires de calme et les espaces communs. En cas de conflit, privilégiez le dialogue ou un médiateur municipal avant toute action juridique.' },
  { icon: Flag, title: 'Valeurs de la République', description: 'Liberté, Égalité, Fraternité : ces valeurs sont au cœur de la société française. L\'égalité homme-femme est un droit fondamental. Toute discrimination (origine, genre, religion, orientation) est punie par la loi. Vous avez les mêmes droits que tout résident.' },
  { icon: HeartHandshake, title: 'Engagement communautaire', description: 'Participer à la vie associative locale (associations gabonaises, associations de quartier, bénévolat) facilite l\'intégration et crée un réseau de solidarité. Restez connecté à la communauté gabonaise tout en vous ouvrant à la diversité culturelle française.' },
  { icon: Siren, title: 'Coopération avec les forces de l\'ordre', description: 'En cas d\'arrestation, restez calme et coopérez. Vous avez le droit de connaître le motif, de garder le silence, d\'avoir un avocat, de prévenir un proche et de contacter le consulat (Convention de Vienne, art. 36). La garde à vue dure 24h max (renouvelable 1 fois). Ne signez rien sans avoir lu et compris.' },
]

// ─── Erreurs courantes ───────────────────────────────────────────────────────

const erreursCourantes: ErreurItem[] = [
  { erreur: 'Laisser expirer son titre de séjour', conseil: 'Lancez le renouvellement 2 à 4 mois avant la date d\'expiration. Conservez le récépissé comme preuve de démarche en cours.' },
  { erreur: 'Ne pas souscrire d\'assurance habitation', conseil: 'C\'est obligatoire dès l\'entrée dans le logement. Sans elle, votre bail peut être résilié. Coût : à partir de 5€/mois.' },
  { erreur: 'Travailler sans autorisation', conseil: 'Le travail non déclaré vous prive de droits (chômage, retraite, accident du travail) et peut entraîner une OQTF (obligation de quitter le territoire).' },
  { erreur: 'Ignorer la déclaration d\'impôts', conseil: 'Même sans revenus, vous devez déclarer vos impôts chaque année (sur impots.gouv.fr). L\'avis d\'imposition est exigé pour de nombreuses démarches (logement, bourses, titre de séjour).' },
  { erreur: 'Ne pas transcrire les actes d\'état civil', conseil: 'Les naissances et mariages en France doivent être transcrits au Consulat pour être valables au Gabon. Ne tardez pas — les délais s\'allongent avec le temps.' },
  { erreur: 'Isolement et absence de réseau', conseil: 'Rejoignez les associations gabonaises locales, les groupes de quartier et participez aux événements du consulat. L\'isolement complique toutes les démarches.' },
  { erreur: 'Ignorer une OQTF', conseil: 'Une OQTF ne disparaît pas si vous ne faites rien. Consultez immédiatement un avocat spécialisé en droit des étrangers. Trois recours existent : gracieux (2 mois), hiérarchique (2 mois), et contentieux (30 jours) — seul le contentieux SUSPEND l\'exécution de l\'OQTF.' },
  { erreur: 'Voyager avec un simple récépissé de première demande', conseil: 'Le récépissé de PREMIÈRE DEMANDE de carte de séjour ne permet PAS de quitter la France et d\'y revenir. Seul le titre de séjour définitif ou le VLS-TS validé le permet. Le récépissé de renouvellement, en revanche, fait office de titre provisoire.' },
  { erreur: 'Signer des documents sans les lire (garde à vue)', conseil: 'En cas de garde à vue, ne signez AUCUN document sans avoir lu et compris. Demandez un avocat (commis d\'office si nécessaire), un interprète si besoin, et exigez que le consulat soit informé (Convention de Vienne, art. 36).' },
  { erreur: 'Oublier de signaler un changement d\'adresse', conseil: 'Tout étranger titulaire d\'un titre de séjour doit signaler son changement d\'adresse dans les 3 mois, en ligne sur le portail ANEF ou en préfecture. Une amende est possible en cas de non-déclaration.' },
  { erreur: 'Ne pas conserver de copies de ses documents', conseil: 'Gardez des photocopies papier ET numériques (cloud sécurisé) de votre passeport, titre de séjour, bail, actes d\'état civil. En cas de perte ou vol, ces copies accélèrent le remplacement.' },
  { erreur: 'Méconnaître ses droits au travail en tant qu\'étudiant', conseil: 'Les étudiants étrangers peuvent travailler 964 heures/an (environ 20h/semaine) sans autorisation supplémentaire. Vérifiez la mention sur votre titre de séjour.' },
]

// ─── Numéros utiles ──────────────────────────────────────────────────────────

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
  { label: 'Droit au logement', number: '0 806 000 113', color: 'bg-teal-500/10 text-teal-600' },
  { label: 'OFII', number: '01 53 69 53 70', color: 'bg-indigo-500/10 text-indigo-600' },
  { label: 'Préfecture en ligne (ANEF)', number: 'anef.interieur.gouv.fr', color: 'bg-cyan-500/10 text-cyan-600' },
  { label: 'Aide juridictionnelle', number: '3039', color: 'bg-emerald-500/10 text-emerald-600' },
  { label: 'OFPRA (Asile)', number: '01 58 68 10 10', color: 'bg-slate-500/10 text-slate-600' },
]

// ─── Accordion Component (page-specific: no links) ──────────────────────────

function GuideSectionAccordion({ section }: { section: GuideSection }) {
  const [isOpen, setIsOpen] = useState(false)
  const Icon = section.icon

  return (
    <div id={section.id} className="scroll-mt-24">
      <div className={`overflow-hidden glass-card rounded-2xl transition-all duration-300 ${isOpen ? 'shadow-lg border-primary/20' : 'hover:shadow-md hover:-translate-y-0.5'}`}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full text-left p-6 md:p-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${section.iconBg} ${section.color} backdrop-blur-sm`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold text-foreground">{section.title}</h3>
                <p className="text-sm text-muted-foreground mt-1 font-normal leading-relaxed max-w-2xl">{section.intro}</p>
              </div>
            </div>
            <ChevronDown className={`w-5 h-5 text-muted-foreground shrink-0 ml-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
          </div>
        </button>

        <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="px-6 md:px-8 pb-8 space-y-6 pt-0">
            {/* Detailed items */}
            <div className="space-y-4">
              {section.items.map((item, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-xl bg-muted/40 hover:bg-muted/60 transition-colors">
                  <CheckCircle2 className={`w-5 h-5 shrink-0 mt-0.5 ${section.color}`} />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Tips */}
            <div className="bg-primary/5 rounded-xl p-5 border border-primary/10 glass-panel">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-5 h-5 text-primary" />
                <h4 className="font-semibold text-foreground">Astuces pratiques</h4>
              </div>
              <ul className="space-y-2">
                {section.tips.map((tip, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-muted-foreground">
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
  )
}

// ─── Main Page Component ─────────────────────────────────────────────────────

function IntegrationPage() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1">

        {/* ── Hero Section ────────────────────────────────────────────────── */}
        <PageHero image="/images/heroes/hero-integration.png">
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 backdrop-blur-sm">
                <BookOpen className="w-3.5 h-3.5 mr-1.5" />
                {t('integration.badge', 'Guide d\'intégration')}
              </Badge>

              <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4">
                {t('integration.heroTitle', 'S\'intégrer et')}{' '}
                <span className="text-gradient">{t('integration.heroHighlight', 'réussir en France')}</span>
              </h1>

              <p className="text-base text-muted-foreground mb-6 max-w-2xl leading-relaxed">
                {t('integration.heroDescription', 'Guide complet pour les Gabonais résidant en France : vos droits, vos démarches, les codes culturels et les astuces pratiques pour une intégration réussie. Le Consulat Général du Gabon vous accompagne.')}
              </p>

              {/* Quick nav pills */}
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

        {/* ── Savoir-vivre & Conventions ───────────────────────────────────── */}
        <section className="py-24 px-6 bg-muted/20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 bg-background/50 backdrop-blur-sm">
                <HandHeart className="w-3.5 h-3.5 mr-1.5" />
                {t('integration.savoirVivre.badge', 'Savoir-vivre')}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t('integration.savoirVivre.title', 'Codes culturels & Conventions')}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t('integration.savoirVivre.description', 'Comprendre les codes de la société française pour mieux y évoluer. Ce n\'est pas renoncer à sa culture, c\'est en ajouter une autre.')}
              </p>
            </div>

            <SavoirVivreGrid items={savoirVivre} />
          </div>
        </section>

        {/* ── Guides thématiques (Accordéons) ──────────────────────────────── */}
        <section className="py-16 px-6 bg-background">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                <Shield className="w-3.5 h-3.5 mr-1.5" />
                {t('integration.guides.badge', 'Guides complets')}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t('integration.guides.title', 'Vos démarches détaillées')}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t('integration.guides.description', 'Cliquez sur chaque thème pour découvrir les informations détaillées, les procédures et nos astuces pratiques.')}
              </p>
            </div>

            <div className="space-y-4">
              {guideSections.map((section) => (
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
                {t('integration.erreurs.badge', 'À savoir absolument')}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t('integration.erreurs.title', 'Erreurs courantes à éviter')}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t('integration.erreurs.description', 'Ces oublis peuvent avoir des conséquences sérieuses. Prenez-les au sérieux pour protéger vos droits.')}
              </p>
            </div>

            <ErreursCourantesGrid items={erreursCourantes} />
          </div>
        </section>

        {/* ── Numéros utiles ──────────────────────────────────────────────── */}
        <section className="py-24 px-6 bg-muted/20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 bg-background/50 backdrop-blur-sm">
                <Phone className="w-3.5 h-3.5 mr-1.5" />
                {t('integration.numeros.badge', 'Numéros essentiels')}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t('integration.numeros.title', 'Numéros utiles à conserver')}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t('integration.numeros.description', 'Enregistrez ces numéros dans votre téléphone. Ils peuvent sauver des vies.')}
              </p>
            </div>

            <NumerosUtilesGrid items={numerosUtiles} />
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
                {t('integration.cta.title', 'Le Consulat est à vos côtés')}
              </h2>
              <p className="text-muted-foreground mb-10 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                {t('integration.cta.description', 'Que vous soyez nouvellement arrivé ou installé depuis longtemps, le Consulat Général du Gabon en France est votre relais. N\'hésitez pas à nous solliciter pour toute question.')}
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Button size="lg" className="h-14 px-8 rounded-xl text-base shadow-lg shadow-primary/20" asChild>
                  <Link to="/contact">
                    <MapPin className="w-5 h-5 mr-2" />
                    {t('integration.cta.contact', 'Nous rendre visite')}
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-8 rounded-xl text-base bg-background/50 hover:bg-accent/10 border-foreground/10" asChild>
                  <a href="tel:+33751025292">
                    <Phone className="w-5 h-5 mr-2" />
                    07 51 02 52 92
                  </a>
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
