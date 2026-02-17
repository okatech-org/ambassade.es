import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import {
  GraduationCap,
  Heart,
  Home,
  Briefcase,
  Scale,
  Baby,
  ArrowRight,
  BookOpen,
  CheckCircle2,
} from 'lucide-react'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'

const guides = [
  {
    icon: Home,
    titleKey: 'guidePratique.logement.title',
    descKey: 'guidePratique.logement.desc',
    defaultTitle: 'Logement',
    defaultDesc:
      'Trouver un logement, aides au logement (APL/ALS), droits des locataires et démarches administratives.',
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    tag: 'Vie quotidienne',
    anchor: 'logement',
    features: ['Recherche de logement', 'APL / ALS', 'Garantie Visale'],
    image: '/images/guide-logement.png',
  },
  {
    icon: Heart,
    titleKey: 'guidePratique.sante.title',
    descKey: 'guidePratique.sante.desc',
    defaultTitle: 'Santé & Protection sociale',
    defaultDesc:
      'Inscription à la Sécurité sociale, mutuelle, accès aux soins et droits à la couverture maladie.',
    color: 'text-red-500',
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
    tag: 'Santé',
    anchor: 'sante',
    features: ['Sécurité sociale', 'Mutuelle', 'CMU-C / ACS'],
    image: '/images/guide-sante.png',
  },
  {
    icon: GraduationCap,
    titleKey: 'guidePratique.education.title',
    descKey: 'guidePratique.education.desc',
    defaultTitle: 'Éducation & Formation',
    defaultDesc:
      "Inscription scolaire, bourses d'études, reconnaissance des diplômes gabonais et formation professionnelle.",
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    tag: 'Éducation',
    anchor: 'education',
    features: ['Inscription scolaire', 'Bourses CROUS', 'Équivalence diplômes'],
    image: '/images/guide-education.png',
  },
  {
    icon: Briefcase,
    titleKey: 'guidePratique.emploi.title',
    descKey: 'guidePratique.emploi.desc',
    defaultTitle: 'Emploi & Entrepreneuriat',
    defaultDesc:
      "Recherche d'emploi, création d'entreprise, titre de séjour autorisant le travail et aides à l'emploi.",
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    tag: 'Emploi',
    anchor: 'emploi',
    features: ['Pôle Emploi', 'Auto-entrepreneur', 'Titre de travail'],
    image: '/images/guide-emploi.png',
  },
  {
    icon: Scale,
    titleKey: 'guidePratique.droits.title',
    descKey: 'guidePratique.droits.desc',
    defaultTitle: 'Droits & Titre de séjour',
    defaultDesc:
      'Renouvellement de titre de séjour, regroupement familial, naturalisation et aide juridique gratuite.',
    color: 'text-violet-500',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20',
    tag: 'Juridique',
    anchor: 'droits',
    features: ['Titre de séjour', 'Regroupement familial', 'Naturalisation'],
    image: '/images/guide-droits.png',
  },
  {
    icon: Baby,
    titleKey: 'guidePratique.famille.title',
    descKey: 'guidePratique.famille.desc',
    defaultTitle: 'Famille & Enfants',
    defaultDesc:
      "Déclaration de naissance, allocations familiales, garde d'enfants et transcription d'actes d'état civil.",
    color: 'text-pink-500',
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/20',
    tag: 'Famille',
    anchor: 'famille',
    features: ['Naissance', 'Allocations CAF', 'Garde enfants'],
    image: '/images/guide-famille.png',
  },
]

export function GuidePratiqueSection() {
  const { t } = useTranslation()

  return (
    <section className="py-24 px-6 glass-section">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
            <BookOpen className="w-3.5 h-3.5 mr-1.5" />
            {t('guidePratique.badge', 'Vie en France')}
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            {t('guidePratique.titlePart1', 'Un Écosystème Complet en')}{' '}
            <span className="text-gradient">
              {t('guidePratique.titleHighlight', '6 Rubriques Essentielles')}
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t(
              'guidePratique.description',
              "Chaque rubrique vous accompagne pas à pas dans votre vie quotidienne en France."
            )}
          </p>
        </div>

        {/* Guides Grid — 3 per row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {guides.map((guide) => (
            <Link
              key={guide.titleKey}
              to="/vie-en-france"
              hash={guide.anchor}
              className="block group h-full"
            >
              <div className="h-full glass-card rounded-2xl overflow-hidden hover:-translate-y-2 transition-all duration-300 flex flex-col shadow-sm hover:shadow-xl hover:shadow-primary/5 ring-1 ring-border/50">
                
                {/* Image Header */}
                <div className="h-48 relative overflow-hidden bg-muted">
                  <img 
                    src={guide.image} 
                    alt={guide.defaultTitle} 
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                  
                  <div className={`absolute top-4 left-4 p-2.5 rounded-xl backdrop-blur-md bg-background/80 shadow-sm ${guide.color}`}>
                    <guide.icon className="w-5 h-5" />
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <Badge
                      variant="outline"
                      className="text-xs font-semibold border-white/20 text-white bg-white/10 backdrop-blur-md"
                    >
                      {t(`guidePratique.tags.${guide.tag}`, guide.tag)}
                    </Badge>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  {/* Title */}
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {t(guide.titleKey, guide.defaultTitle)}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                    {t(guide.descKey, guide.defaultDesc)}
                  </p>

                  {/* Feature checklist */}
                  <div className="space-y-2.5 pt-4 border-t border-border/40 mt-auto">
                    {guide.features.map((f) => (
                      <div key={f} className="flex items-center gap-2.5 text-sm text-foreground/80">
                        <CheckCircle2 className={`w-4 h-4 ${guide.color} shrink-0`} />
                        <span className="font-medium">{f}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Action */}
                  <div className="mt-6 pt-2 flex items-center text-primary font-semibold text-sm">
                    {t('guidePratique.readMore', 'Consulter le guide')}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg" className="rounded-xl">
            <Link to="/vie-en-france">
              {t('guidePratique.viewAll', 'Consulter le guide complet')}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default GuidePratiqueSection
