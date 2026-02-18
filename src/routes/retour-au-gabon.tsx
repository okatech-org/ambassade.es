import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import {
  Plane,
  Package,
  Building2,
  FileText,
  Landmark,
  HandCoins,
  ChevronDown,
  Phone,
  Lightbulb,
  CheckCircle2,
  ArrowRight,
  Shield,
  MapPin,
  ExternalLink,
  type LucideIcon,
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PageHero } from '@/components/PageHero'
import { CitizenCTA } from '@/components/home/CitizenCTA'

export const Route = createFileRoute('/retour-au-gabon')({
  component: RetourAuGabonPage,
  head: () => ({
    meta: [
      { title: 'Retour au Gabon — Guide Pratique | Consulat Général du Gabon' },
      {
        name: 'description',
        content:
          'Guide complet pour préparer votre retour au Gabon : démarches administratives, déménagement, réinstallation, aides disponibles et maintien des droits acquis en France.',
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

// ─── Data ────────────────────────────────────────────────────────────────────
const guideSections: GuideSection[] = [
  {
    id: 'preparation',
    icon: FileText,
    title: 'Préparer son retour',
    color: 'text-blue-600 dark:text-blue-400',
    iconBg: 'bg-blue-500/10',
    intro:
      'Le retour au Gabon se prépare plusieurs mois à l\'avance. Voici les étapes administratives essentielles pour un départ serein.',
    items: [
      {
        title: 'Résiliation du bail',
        detail:
          'Envoyez votre préavis au propriétaire par lettre recommandée avec accusé de réception. Le délai est de 1 mois (zone tendue) ou 3 mois (zone non tendue). Réalisez l\'état des lieux de sortie et récupérez votre dépôt de garantie.',
      },
      {
        title: 'Clôture des comptes et abonnements',
        detail:
          'Résiliez vos abonnements (téléphone, internet, électricité, gaz). Prévenez votre banque — vous pouvez conserver un compte si vous le souhaitez. Fermez votre compte CAF après avoir perçu vos dernières aides.',
      },
      {
        title: 'Assurance et mutuelle',
        detail:
          'Résiliez votre assurance habitation, votre mutuelle santé et vos éventuelles assurances auto. Conservez les attestations de résiliation comme justificatifs.',
      },
      {
        title: 'Inscription au registre consulaire',
        detail:
          'Signalez votre départ au Consulat Général du Gabon à Paris. Mettez à jour vos coordonnées dans le registre des Gabonais de l\'étranger. Si vous êtes inscrit au registre français (bi-nationaux), signalez aussi votre départ auprès du consulat de France à Libreville.',
      },
      {
        title: 'Impôts et déclarations',
        detail:
          'Déclarez votre départ au centre des impôts. Vous devrez déposer une déclaration de revenus l\'année suivante pour les revenus de l\'année de départ. Signalez votre changement d\'adresse sur impots.gouv.fr.',
      },
    ],
    tips: [
      'Commencez les démarches au moins 3 mois avant votre départ',
      'Conservez des copies numériques de tous vos documents français (avis d\'imposition, bulletins de salaire, attestations)',
      'Faites une procuration à un proche en France pour gérer les éventuels courriers après votre départ',
    ],
    links: [
      { label: 'Service-public.fr — Départ de France', url: 'https://www.service-public.fr/particuliers/vosdroits/F33326', description: 'Démarches officielles en cas de départ' },
      { label: 'Impots.gouv.fr', url: 'https://www.impots.gouv.fr', description: 'Déclaration de revenus et changement d\'adresse' },
    ],
  },
  {
    id: 'demenagement',
    icon: Package,
    title: 'Déménagement',
    color: 'text-orange-600 dark:text-orange-400',
    iconBg: 'bg-orange-500/10',
    intro:
      'Organiser le transport de vos affaires personnelles vers le Gabon nécessite de l\'anticipation. Voici les options et formalités douanières.',
    items: [
      {
        title: 'Envoi par conteneur maritime',
        detail:
          'C\'est la solution la plus économique pour les gros volumes. Délai : 4 à 8 semaines vers Libreville. Demandez plusieurs devis auprès de transitaires spécialisés (AGS, Demeco, Bollore Logistics). Prévoyez un inventaire détaillé de tous les biens.',
      },
      {
        title: 'Fret aérien',
        detail:
          'Plus rapide (2-5 jours) mais nettement plus cher. Adapté pour les envois urgents ou de petit volume. Les compagnies comme Air France Cargo, Ethiopian Cargo proposent ce service.',
      },
      {
        title: 'Formalités douanières au Gabon',
        detail:
          'Les effets personnels sont en franchise de droits de douane si vous justifiez d\'un séjour de plus de 6 mois à l\'étranger. Documents exigés : passeport, attestation consulaire de résidence, inventaire détaillé et signé, certificat de changement de résidence délivré par le consulat.',
      },
      {
        title: 'Véhicule',
        detail:
          'L\'importation d\'un véhicule au Gabon est soumise à des conditions d\'âge (moins de 3 ans en général). Les droits de douane sont élevés. Renseignez-vous auprès de la Direction Générale des Douanes du Gabon avant d\'engager les frais de transport.',
      },
    ],
    tips: [
      'Faites établir le certificat de changement de résidence par le consulat AVANT votre départ',
      'Photographiez et numérisez l\'inventaire de vos biens pour le dédouanement',
      'Regroupez vos envois pour négocier de meilleurs tarifs avec les transitaires',
    ],
    links: [
      { label: 'Direction Générale des Douanes — Gabon', url: 'https://dgdi.ga', description: 'Réglementation douanière gabonaise' },
    ],
  },
  {
    id: 'reinstallation',
    icon: Building2,
    title: 'Réinstallation au Gabon',
    color: 'text-green-600 dark:text-green-400',
    iconBg: 'bg-green-500/10',
    intro:
      'Votre expérience en France est un atout considérable. Voici comment valoriser vos compétences et vous réinstaller professionnellement au Gabon.',
    items: [
      {
        title: 'Reconnaissance des diplômes français',
        detail:
          'Les diplômes français sont généralement reconnus au Gabon sans procédure d\'équivalence formelle. Pour les professions réglementées (médecine, droit, ingénierie), une vérification par l\'ordre professionnel gabonais peut être nécessaire.',
      },
      {
        title: 'Création d\'entreprise au Gabon',
        detail:
          'L\'ANPI (Agence Nationale de Promotion des Investissements) accompagne la création d\'entreprise. La procédure est simplifiée via le Guichet Unique. Zones économiques spéciales (ZERP) avec avantages fiscaux. La Chambre de Commerce de Libreville est aussi un interlocuteur clé.',
      },
      {
        title: 'Emploi au Gabon',
        detail:
          'Les secteurs porteurs incluent : pétrole et gaz, mines, bois, services numériques, BTP, agriculture. Consultez les offres sur les plateformes locales (Emploi.ga, LinkedIn Gabon) et les cabinets de recrutement (Adecco Gabon, Africsearch).',
      },
      {
        title: 'Transfert de compétences',
        detail:
          'Votre expérience française est recherchée. Les organisations internationales (BAD, ONU, Banque mondiale) recrutent régulièrement des profils bilingues avec une expérience internationale. Le secteur privé gabonais valorise aussi ces parcours.',
      },
    ],
    tips: [
      'Rejoignez les réseaux d\'anciens élèves gabonais diplômés en France avant votre retour',
      'Les zones ZERP offrent des exonérations fiscales significatives pour la création d\'entreprise',
      'Faites authentifier vos diplômes français par le Consulat avant votre départ',
    ],
    links: [
      { label: 'ANPI Gabon', url: 'https://www.anpi-gabon.com', description: 'Agence Nationale de Promotion des Investissements' },
      { label: 'Emploi.ga', url: 'https://www.emploi.ga', description: 'Portail de l\'emploi au Gabon' },
    ],
  },
  {
    id: 'aides',
    icon: HandCoins,
    title: 'Aides au retour',
    color: 'text-purple-600 dark:text-purple-400',
    iconBg: 'bg-purple-500/10',
    intro:
      'Des dispositifs d\'aide existent pour accompagner votre retour au pays. Le consulat peut vous orienter vers les bons interlocuteurs.',
    items: [
      {
        title: 'Aide au retour volontaire (OFII)',
        detail:
          'L\'OFII propose une aide au retour volontaire pour les ressortissants étrangers souhaitant rentrer dans leur pays. Elle comprend : prise en charge du billet d\'avion, allocation forfaitaire (jusqu\'à 650€ par adulte), aide à la réinsertion. Conditions : être en situation régulière ou en procédure d\'éloignement.',
      },
      {
        title: 'Aide à la réinsertion économique',
        detail:
          'L\'aide à la réinsertion permet de monter un micro-projet économique au Gabon. L\'OFII peut financer jusqu\'à 6 500€ de matériel ou de fonds de roulement. Un accompagnement par un opérateur local est prévu pendant 12 mois.',
      },
      {
        title: 'Accompagnement consulaire',
        detail:
          'Le Consulat Général du Gabon peut vous délivrer les attestations nécessaires (certificat de résidence, attestation de changement de domicile). Il peut aussi vous mettre en relation avec les services gabonais compétents pour faciliter votre réinstallation.',
      },
    ],
    tips: [
      'Renseignez-vous auprès de l\'OFII au moins 2 mois avant votre départ prévu',
      'Le dispositif de réinsertion économique nécessite un projet structuré — préparez un business plan',
    ],
    links: [
      { label: 'OFII — Aide au retour', url: 'https://www.ofii.fr/procedure/retourner-dans-votre-pays', description: 'Aide au retour volontaire' },
    ],
  },
  {
    id: 'droits',
    icon: Shield,
    title: 'Maintien des droits',
    color: 'text-indigo-600 dark:text-indigo-400',
    iconBg: 'bg-indigo-500/10',
    intro:
      'Certains droits acquis en France peuvent être conservés après votre retour au Gabon. Voici ce qu\'il faut savoir pour protéger vos acquis.',
    items: [
      {
        title: 'Retraite française',
        detail:
          'Les trimestres cotisés en France sont acquis définitivement. Vous pouvez demander votre retraite française depuis le Gabon via le site lassuranceretraite.fr. La convention de sécurité sociale entre la France et le Gabon permet de totaliser les périodes cotisées dans les deux pays.',
      },
      {
        title: 'Portabilité de l\'assurance chômage',
        detail:
          'Les droits à l\'assurance chômage ne sont PAS exportables au Gabon. Vous perdez vos droits ARE si vous quittez la France. Exception : si vous partez temporairement (moins de 35 jours par an) pour recherche d\'emploi, vos droits sont maintenus.',
      },
      {
        title: 'Prestations familiales',
        detail:
          'Les allocations CAF ne sont plus versées après votre départ de France. Prévenez la CAF de votre changement de situation. Les trop-perçus devront être remboursés.',
      },
      {
        title: 'Documents à conserver',
        detail:
          'Conservez IMPÉRATIVEMENT : tous vos bulletins de salaire français, avis d\'imposition, relevé de carrière (CNAV), attestations d\'employeur, diplômes, documents d\'état civil transcrits. Ces documents seront essentiels pour faire valoir vos droits à la retraite.',
      },
    ],
    tips: [
      'Créez votre espace personnel sur lassuranceretraite.fr AVANT votre départ pour consulter votre relevé de carrière',
      'La convention franco-gabonaise de sécurité sociale du 2 octobre 1980 prévoit la totalisation des périodes d\'assurance',
      'Conservez des copies numériques sécurisées de tous vos bulletins de salaire et relevés de carrière',
    ],
    links: [
      { label: 'L\'Assurance Retraite', url: 'https://www.lassuranceretraite.fr', description: 'Votre retraite française depuis l\'étranger' },
      { label: 'CLEISS', url: 'https://www.cleiss.fr/docs/textes/conv_gabon.html', description: 'Convention de sécurité sociale France-Gabon' },
    ],
  },
]

// ─── Components ──────────────────────────────────────────────────────────────

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
        {/* Section Header */}
        <div className={`bg-gradient-to-r from-${section.color.includes('blue') ? 'blue' : section.color.includes('orange') ? 'orange' : section.color.includes('green') ? 'green' : section.color.includes('purple') ? 'purple' : 'indigo'}-500/5 to-${section.color.includes('blue') ? 'blue' : section.color.includes('orange') ? 'orange' : section.color.includes('green') ? 'green' : section.color.includes('purple') ? 'purple' : 'indigo'}-600/10 p-6 md:p-8 border-b border-border/40`}>
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
          {/* Accordion Items */}
          <div className="space-y-3">
            {section.items.map((item, index) => (
              <div key={item.title} className="border border-border/60 rounded-xl overflow-hidden transition-all hover:border-border">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className={`w-5 h-5 ${section.color} shrink-0`} />
                    <span className="font-medium text-foreground">{item.title}</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${openItems.has(index) ? 'rotate-180' : ''}`} />
                </button>
                {openItems.has(index) && (
                  <div className="px-4 pb-4 pt-0">
                    <div className="pl-8">
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.detail}</p>
                    </div>
                  </div>
                )}
              </div>
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
                  <ArrowRight className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

// ─── Page ────────────────────────────────────────────────────────────────────

function RetourAuGabonPage() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <PageHero image="/images/heroes/hero-integration.png">
        <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
          <Plane className="w-3.5 h-3.5 mr-1.5" />
          {t('retourGabon.badge', 'Guide de retour')}
        </Badge>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
          {t('retourGabon.title', 'Retour au')}{' '}
          <span className="text-gradient">
            {t('retourGabon.titleHighlight', 'Gabon')}
          </span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
          {t(
            'retourGabon.subtitle',
            'Préparez sereinement votre retour au pays. Démarches administratives, déménagement, réinstallation professionnelle et maintien de vos droits acquis en France.'
          )}
        </p>

        {/* Quick nav pills */}
        <div className="flex flex-wrap justify-center gap-2">
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

      {/* Mobile Section Navigation */}
      <div className="lg:hidden sticky top-16 z-40 bg-background/80 backdrop-blur-md border-b border-border/50 px-4 py-3">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {guideSections.map((section) => {
            const Icon = section.icon
            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="shrink-0 flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium transition-all bg-muted/50 text-muted-foreground border border-transparent hover:bg-primary/10 hover:text-primary"
              >
                <Icon className="w-3.5 h-3.5" />
                {section.title}
              </a>
            )
          })}
        </div>
      </div>

      {/* Main Content */}
      <section className="py-8 md:py-12 px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {guideSections.map((section) => (
            <GuideSectionCard key={section.id} section={section} />
          ))}
        </div>
      </section>

      {/* Emergency Numbers Card */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card border-primary/20 bg-primary/5 rounded-2xl overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-primary/10">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Contacts utiles au Gabon</h3>
                  <p className="text-sm text-muted-foreground">
                    À conserver pour votre arrivée
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { number: '1730', label: 'Numéro vert — Urgences Gabon' },
                  { number: '+241 011 76 32 10', label: 'Ambassade de France à Libreville' },
                  { number: '01 42 99 68 62', label: 'Consulat du Gabon à Paris' },
                  { number: '07 44 23 95 84', label: 'Urgence consulaire 24h/24' },
                ].map((item) => (
                  <div
                    key={item.number}
                    className="flex items-center gap-3 p-3 rounded-xl bg-background/50 border border-border/60 hover:bg-background/80 transition-colors"
                  >
                    <Phone className="w-4 h-4 text-primary shrink-0" />
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
      <section className="py-12 md:py-24 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-6 md:p-8 lg:p-14 rounded-3xl glass-panel relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <Landmark className="w-12 h-12 text-primary mx-auto mb-6" />
              <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
                Le Consulat vous accompagne
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8 text-lg">
                Que votre retour soit temporaire ou définitif, le Consulat Général du Gabon en France
                est à vos côtés pour faciliter toutes vos démarches.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="h-12 px-8 rounded-xl shadow-lg shadow-primary/20">
                  <a href="tel:+33142996862">
                    <Phone className="w-5 h-5 mr-2" />
                    Nous appeler
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 px-8 rounded-xl bg-background/50 hover:bg-accent/10"
                >
                  <a href="mailto:contact@consulatdugabon.fr">
                    <MapPin className="w-5 h-5 mr-2" />
                    Nous écrire
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CitizenCTA />
    </div>
  )
}
