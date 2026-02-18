import { createFileRoute, Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import {
  Scale,
  Shield,
  HandHeart,
  Landmark,
  AlertTriangle,
  BookOpen,
  Users,
  ChevronDown,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Lightbulb,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  HeartHandshake,
  Flag,
  Siren,
  ExternalLink,
  Plane,
  AlertOctagon,
  UserCheck,
  ClipboardList,
  type LucideIcon,
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PageHero } from '@/components/PageHero'
import { CitizenCTA } from '@/components/home/CitizenCTA'

export const Route = createFileRoute('/venir-en-france')({
  component: VenirEnFrancePage,
  head: () => ({
    meta: [
      { title: 'Venir en France — Guide Complet | Consulat Général du Gabon' },
      {
        name: 'description',
        content:
          'Guide complet pour les Gabonais venant en France : admission, visa, intégration, démarches administratives, codes culturels et droits de séjour.',
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
  intro: string
  items: GuideItem[]
  tips: string[]
  links: UsefulLink[]
}

// ─── Data : Guide Sections ──────────────────────────────────────────────────
const guideSections: GuideSection[] = [
  {
    id: 'admission',
    icon: Plane,
    title: 'Admission en France',
    color: 'text-cyan-600 dark:text-cyan-400',
    iconBg: 'bg-cyan-500/10',
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
        title: "Refus d'entrée : que faire ?",
        detail:
          "La police aux frontières peut refuser l'entrée même avec un visa valide. En cas de refus, un recours est possible auprès du tribunal administratif dans les 48 heures. Conservez tous les documents remis par la police aux frontières.",
      },
      {
        title: "Première démarche OFII à l'arrivée",
        detail:
          "Si vous avez un VLS-TS (visa long séjour valant titre de séjour), validez-le sur le site de l'OFII dans les 3 mois suivant l'arrivée. Payez la taxe OFII (200 € à 400 €), passez la visite médicale obligatoire et signez le Contrat d'Intégration Républicaine (CIR).",
      },
    ],
    tips: [
      'Imprimez tous vos documents de voyage — ne comptez pas uniquement sur les versions numériques',
      'Arrivez à la frontière avec vos justificatifs de ressources, hébergement et assurance facilement accessibles',
      "Le CIR comprend une formation civique et linguistique obligatoire — planifiez votre emploi du temps en conséquence",
      'Conservez une copie de votre visa et de votre passeport dans un cloud sécurisé',
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
          "Base juridique : accord franco-gabonais du 5 juillet 2007. Après obtention d'un diplôme de niveau Master ou équivalent en France, vous pouvez demander une APS de 9 mois, renouvelable une fois (18 mois maximum). Elle permet de rechercher un emploi ou créer une entreprise en lien avec le diplôme, avec droit de travailler à temps plein. Demande à déposer 2 à 4 mois avant l'expiration du titre étudiant.",
      },
      {
        title: 'Changement de statut : étudiant → salarié',
        detail:
          "Conditions : emploi en relation avec le diplôme obtenu, rémunération ≥ 1,5x le SMIC (1x SMIC pour les métiers en tension). L'employeur dépose une demande d'autorisation de travail, puis vous déposez votre demande de changement de statut en préfecture. Délai : 2 à 4 mois.",
      },
    ],
    tips: [
      "L'APS dure 9 mois (renouvelable une fois) — demandez-la AVANT l'expiration de votre titre étudiant",
      "Les 964 heures de travail autorisées se calculent sur l'année civile du titre de séjour",
      "Le changement de statut étudiant → salarié nécessite un contrat ou une promesse d'embauche",
      "Conservez vos diplômes, relevés de notes et attestations — ils seront exigés pour le changement de statut",
    ],
    links: [
      { label: 'Campus France', url: 'https://www.campusfrance.org/fr', description: 'Études en France pour les étudiants internationaux' },
      { label: 'MesServices Étudiant', url: 'https://www.messervices.etudiant.gouv.fr', description: 'Bourse, logement CROUS et vie étudiante' },
      { label: 'Service-public.fr — APS', url: 'https://www.service-public.fr/particuliers/vosdroits/F17319', description: 'Autorisation provisoire de séjour' },
    ],
  },
  {
    id: 'demarches',
    icon: ClipboardList,
    title: 'Démarches administratives',
    color: 'text-sky-600 dark:text-sky-400',
    iconBg: 'bg-sky-500/10',
    intro:
      "Toutes les démarches administratives liées à votre arrivée et votre séjour en France : carte de séjour, validation VLS-TS, changement de statut, perte de documents.",
    items: [
      {
        title: 'Première carte de séjour — Procédure OFII',
        detail:
          "À votre arrivée avec un VLS-TS : 1) Validez le visa sur le site de l'OFII dans les 3 mois. 2) Payez la taxe OFII (200 € à 400 €). 3) Passez la visite médicale obligatoire. 4) Signez le Contrat d'Intégration Républicaine (CIR) qui comprend une formation civique et linguistique. Documents : passeport, formulaire cerfa n°15614, justificatif de domicile, photos, timbre fiscal. ⚠️ Le récépissé de première demande ne permet PAS de quitter la France et d'y revenir.",
      },
      {
        title: 'Renouvellement de carte de séjour',
        detail:
          "Anticipez : déposez votre demande 2 mois avant expiration, en ligne sur le portail ANEF ou en préfecture. Un récépissé de renouvellement vous sera délivré (valable 3 mois) en attendant la nouvelle carte.",
      },
      {
        title: 'APS pour diplômés (Master) — Accord franco-gabonais',
        detail:
          "Base juridique : accord franco-gabonais du 5 juillet 2007. L'APS est accordée pour 9 mois, renouvelable une fois (18 mois maximum) aux diplômés de niveau Master. Elle permet de chercher un emploi ou créer une entreprise en lien avec le diplôme.",
      },
      {
        title: 'Changement de statut : étudiant → salarié',
        detail:
          "Conditions : emploi en rapport avec le diplôme, rémunération ≥ 1,5x SMIC (1x SMIC pour les métiers en tension). Procédure : 1) L'employeur dépose la demande d'autorisation de travail. 2) Vous déposez la demande de changement de statut en préfecture (cerfa n°15187). 3) Instruction : 2 à 4 mois.",
      },
      {
        title: "Document de circulation pour mineur (DCM)",
        detail:
          "Destiné aux mineurs étrangers résidant en France dont les parents sont en situation régulière ou dont l'un est français. Le DCM permet au mineur de voyager à l'étranger et de revenir en France sans visa. Validité : 5 ans, renouvelable jusqu'aux 18 ans. ⚠️ À 18 ans, le jeune doit demander un titre de séjour propre.",
      },
      {
        title: "Déclaration de perte de documents",
        detail:
          "En cas de perte ou vol de passeport, titre de séjour ou carte consulaire : 1) Déclaration au commissariat (récépissé). 2) Pour le passeport : rendez-vous au consulat avec récépissé + photos + justificatifs d'identité. 3) Pour le titre de séjour : rendez-vous à la préfecture/ANEF.",
      },
      {
        title: "Changement d'adresse (obligatoire)",
        detail:
          "Tout étranger titulaire d'un titre de séjour doit signaler son changement d'adresse dans les 3 mois, en ligne sur le portail ANEF ou en préfecture.",
      },
    ],
    tips: [
      'Anticipez toujours le renouvellement de votre titre de séjour — 2 mois avant expiration',
      'Conservez des copies numériques de TOUS vos documents dans un cloud sécurisé',
      "Le portail ANEF est l'outil central pour la plupart des démarches de séjour en ligne",
      "Un récépissé de première demande ne permet PAS de quitter la France",
    ],
    links: [
      { label: 'Portail ANEF', url: 'https://administration-etrangers-en-france.interieur.gouv.fr', description: 'Démarches de titre de séjour en ligne' },
      { label: 'OFII', url: 'https://www.ofii.fr', description: "Office Français de l'Immigration et de l'Intégration" },
      { label: 'Service-public.fr', url: 'https://www.service-public.fr/particuliers/vosdroits/N19804', description: 'Droits des étrangers en France' },
    ],
  },
  {
    id: 'oqtf',
    icon: AlertOctagon,
    title: 'OQTF : que faire ?',
    color: 'text-rose-600 dark:text-rose-400',
    iconBg: 'bg-rose-500/10',
    intro:
      "L'Obligation de Quitter le Territoire Français (OQTF) est une décision grave. Il est essentiel de connaître vos droits et les recours possibles. NE JAMAIS ignorer une OQTF.",
    items: [
      {
        title: "Qu'est-ce qu'une OQTF ?",
        detail:
          "C'est une décision administrative enjoignant un étranger à quitter la France dans un délai de 30 jours (ou sans délai dans certains cas). Motifs : séjour irrégulier, refus de renouvellement de titre, refus de demande d'asile, menace à l'ordre public.",
      },
      {
        title: '1. Recours gracieux — auprès du Préfet',
        detail:
          "Délai : 2 mois à compter de la notification. Envoi par lettre recommandée avec accusé de réception. ⚠️ Ce recours NE SUSPEND PAS l'exécution de l'OQTF.",
      },
      {
        title: "2. Recours hiérarchique — auprès du Ministre de l'Intérieur",
        detail:
          "Délai : 2 mois à compter de la notification. ⚠️ Ce recours NE SUSPEND PAS l'exécution de l'OQTF.",
      },
      {
        title: '3. Recours contentieux — devant le Tribunal Administratif',
        detail:
          "Délai : 30 jours à compter de la notification (ou 48h si OQTF sans délai de départ). ✅ C'est le SEUL recours qui SUSPEND l'exécution de l'OQTF. L'aide juridictionnelle est accessible.",
      },
      {
        title: 'Saisir le Consul Général',
        detail:
          "Si tous les recours échouent, le ressortissant peut saisir le Consul Général du Gabon avec : copie de l'OQTF, copies des recours effectués et décisions rendues, pièce d'identité. Le consulat peut accompagner et orienter vers une aide juridique, mais NE PEUT PAS s'opposer juridiquement à une OQTF.",
      },
      {
        title: 'Régularisation administrative',
        detail:
          "Plusieurs options existent : admission exceptionnelle au séjour (circulaire Valls 2012), régularisation par le travail, motif familial, raisons médicales, ou protection internationale via l'OFPRA.",
      },
    ],
    tips: [
      "NE JAMAIS ignorer une OQTF — elle ne disparaît pas si vous ne faites rien",
      "Consultez IMMÉDIATEMENT un avocat spécialisé en droit des étrangers",
      "Privilégiez le recours contentieux (tribunal administratif) : c'est le SEUL qui suspend l'exécution",
      "Rassemblez tous les documents prouvant votre ancienneté de séjour et votre insertion en France",
    ],
    links: [
      { label: 'CIMADE', url: 'https://www.lacimade.org', description: 'Accompagnement juridique gratuit pour étrangers' },
      { label: 'GISTI', url: 'https://www.gisti.org', description: "Groupe d'information et de soutien des immigrés" },
      { label: 'Aide juridictionnelle', url: 'https://www.service-public.fr/particuliers/vosdroits/F18074', description: "Prise en charge des frais d'avocat" },
    ],
  },
]

// ─── Data: Savoir-vivre ─────────────────────────────────────────────────────
const savoirVivre = [
  {
    icon: HandHeart,
    title: 'Respect et courtoisie',
    description: 'En France, les formules de politesse sont très importantes. Dites "Bonjour" en entrant dans un commerce, "Merci", "S\'il vous plaît", "Excusez-moi". Le vouvoiement est la règle avec les inconnus, les aînés et en contexte professionnel.',
  },
  {
    icon: Landmark,
    title: 'Laïcité et vivre ensemble',
    description: 'La France est un État laïc. La liberté de culte est garantie, mais la religion relève de la sphère privée. Dans les services publics (école, mairie, hôpital), une attitude neutre est attendue.',
  },
  {
    icon: Scale,
    title: 'Lois et règles de vie',
    description: 'Le respect des lois est non-négociable : code de la route, interdiction de fumer dans les lieux publics fermés, tri des déchets, respect du voisinage (bruit limité entre 22h et 7h).',
  },
  {
    icon: Users,
    title: 'Relations de voisinage',
    description: 'Se présenter à ses voisins en emménageant est apprécié. Respectez le règlement de copropriété, les horaires de calme et les espaces communs.',
  },
  {
    icon: Flag,
    title: 'Valeurs de la République',
    description: 'Liberté, Égalité, Fraternité : ces valeurs sont au cœur de la société française. L\'égalité homme-femme est un droit fondamental. Toute discrimination est punie par la loi.',
  },
  {
    icon: HeartHandshake,
    title: 'Engagement communautaire',
    description: 'Participer à la vie associative locale facilite l\'intégration et crée un réseau de solidarité. Restez connecté à la communauté gabonaise tout en vous ouvrant à la diversité culturelle française.',
  },
  {
    icon: Siren,
    title: 'Coopération avec les forces de l\'ordre',
    description: 'En cas d\'arrestation, restez calme et coopérez. Vous avez le droit de connaître le motif, de garder le silence, d\'avoir un avocat, de prévenir un proche et de contacter le consulat (Convention de Vienne, art. 36).',
  },
]

// ─── Data: Erreurs courantes ────────────────────────────────────────────────
const erreursCourantes = [
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
const numerosUtiles = [
  { label: 'Consul Général du Gabon', number: '26 bis av. Raphaël, 75016', color: 'bg-emerald-500/10 text-emerald-600' },
  { label: 'Email Consulat', number: 'consulatgeneralgabon@yahoo.fr', color: 'bg-emerald-500/10 text-emerald-600' },
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

// ─── Accordion Component ────────────────────────────────────────────────────

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
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })
  }

  const Icon = section.icon

  return (
    <div id={section.id} className="scroll-mt-24">
      <div className="overflow-hidden glass-card rounded-2xl">
        <div className="p-6 md:p-8 border-b border-border/40 bg-muted/10">
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-2xl ${section.iconBg} shrink-0 backdrop-blur-sm`}>
              <Icon className={`w-7 h-7 ${section.color}`} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">{section.title}</h2>
              <p className="text-muted-foreground leading-relaxed">{section.intro}</p>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-6">
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
                <li key={tip} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <ChevronRight className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Useful Links */}
          {section.links.length > 0 && (
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
                    <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{link.label}</span>
                    <span className="text-xs text-muted-foreground mt-1">{link.description}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Main Page Component ─────────────────────────────────────────────────────

function VenirEnFrancePage() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1">

        {/* ── Hero Section ────────────────────────────────────────────────── */}
        <PageHero image="/images/heroes/hero-integration.png">
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
                {t('venirFrance.savoirVivre.badge', 'Savoir-vivre')}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t('venirFrance.savoirVivre.title', 'Codes culturels & Conventions')}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t('venirFrance.savoirVivre.description', 'Comprendre les codes de la société française pour mieux y évoluer. Ce n\'est pas renoncer à sa culture, c\'est en ajouter une autre.')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {savoirVivre.map((item, idx) => {
                const Icon = item.icon
                return (
                  <div key={idx} className="group glass-card rounded-2xl p-6 hover:-translate-y-2 transition-all duration-300">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-bold text-lg text-foreground">{item.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                )
              })}
            </div>
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
              {guideSections.map((section) => (
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

            <div className="grid md:grid-cols-2 gap-6">
              {erreursCourantes.map((item, idx) => (
                <div key={idx} className="glass-card border-orange-200/50 dark:border-orange-900/30 bg-orange-50/50 dark:bg-orange-950/20 rounded-2xl p-6 hover:-translate-y-1 transition-transform">
                  <div className="flex gap-5">
                    <div className="p-2.5 rounded-xl bg-orange-500/10 h-fit shrink-0">
                      <AlertTriangle className="w-6 h-6 text-orange-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-lg mb-2">{item.erreur}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.conseil}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {numerosUtiles.map((n, idx) => {
                const isEmail = n.number.includes('@')
                return (
                  <div key={idx} className="glass-card rounded-2xl p-6 text-center hover:-translate-y-1 transition-transform duration-300">
                    <div className={`w-14 h-14 rounded-full ${n.color} flex items-center justify-center mx-auto mb-4`}>
                      {isEmail ? <Mail className="w-6 h-6" /> : n.number.includes('av.') ? <MapPin className="w-6 h-6" /> : <Phone className="w-6 h-6" />}
                    </div>
                    <p className="text-xl font-bold text-foreground mb-1 tracking-tight">
                      {isEmail ? <a href={`mailto:${n.number}`} className="hover:text-primary transition-colors text-sm">{n.number}</a> : n.number}
                    </p>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{n.label}</p>
                  </div>
                )
              })}
            </div>
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
