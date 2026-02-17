import { createFileRoute, Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'convex/react'
import { useState } from 'react'
import {
  Calendar,
  Newspaper,
  Megaphone,
  PartyPopper,
  FileText,
  ArrowRight,
  MapPin,
  Phone,
} from 'lucide-react'
import { api } from '@convex/_generated/api'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { PageHero } from '@/components/PageHero'


export const Route = createFileRoute('/actualites/')({
  component: ActualitesPage,
  head: () => ({
    meta: [
      { title: 'Actualités & Événements | Consulat Général du Gabon' },
      {
        name: 'description',
        content:
          'Retrouvez les dernières actualités, communiqués officiels et événements du Consulat Général du Gabon en France.',
      },
    ],
  }),
})

const categoryConfig: Record<string, { label: string; color: string; gradient: string; icon: typeof Newspaper }> = {
  communique: {
    label: 'Communiqué',
    color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300',
    gradient: 'from-blue-600/30 via-blue-500/15 to-indigo-400/10',
    icon: Megaphone,
  },
  evenement: {
    label: 'Événement',
    color: 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300',
    gradient: 'from-green-600/30 via-emerald-500/15 to-teal-400/10',
    icon: PartyPopper,
  },
  actualite: {
    label: 'Actualité',
    color: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
    gradient: 'from-slate-600/30 via-gray-500/15 to-zinc-400/10',
    icon: Newspaper,
  },
}

const categoryFilters = [
  { key: 'all', label: 'Tout', icon: FileText },
  { key: 'communique', label: 'Communiqués', icon: Megaphone },
  { key: 'actualite', label: 'Actualités', icon: Newspaper },
  { key: 'evenement', label: 'Événements', icon: PartyPopper },
]

function formatDate(timestamp: number) {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(timestamp))
}

function ActualitesPage() {
  const { t } = useTranslation()
  const [activeFilter, setActiveFilter] = useState('all')
  const posts = useQuery(api.functions.posts.list, {
    paginationOpts: { numItems: 20, cursor: null },
  })

  const isLoading = posts === undefined

  const filteredPosts = posts?.page.filter((post) =>
    activeFilter === 'all' ? true : post.category === activeFilter
  )

  const postCounts = posts?.page.reduce(
    (acc, post) => {
      acc[post.category] = (acc[post.category] || 0) + 1
      acc.all = (acc.all || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <PageHero image="/images/heroes/hero-actualites.png">
          <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20 backdrop-blur-sm">
            <Newspaper className="w-3.5 h-3.5 mr-1.5" />
            {t('news.badge', 'Espace Presse')}
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            {t('news.pageTitle', 'Actualités')} <span className="text-gradient">&</span>{' '}
            {t('news.pageTitleHighlight', 'Événements')}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t(
              'news.pageDescription',
              'Retrouvez les dernières actualités, communiqués et événements du Consulat Général du Gabon en France.'
            )}
          </p>

          {/* Quick stats */}
          {!isLoading && posts.page.length > 0 && (
            <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm">
              <div className="flex items-center gap-2 text-foreground/80">
                <FileText className="w-5 h-5 text-primary" />
                <span className="font-medium">{posts.page.length} publications</span>
              </div>
              <div className="flex items-center gap-2 text-foreground/80">
                <Megaphone className="w-5 h-5 text-blue-500" />
                <span className="font-medium">{postCounts?.communique || 0} communiqués</span>
              </div>
              <div className="flex items-center gap-2 text-foreground/80">
                <PartyPopper className="w-5 h-5 text-green-500" />
                <span className="font-medium">{postCounts?.evenement || 0} événements</span>
              </div>
            </div>
          )}
      </PageHero>

      {/* Category Filter Pills */}
      <section className="px-6 relative z-20 -mt-4 mb-2">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3">
            {categoryFilters.map((filter) => {
              const Icon = filter.icon
              const isActive = activeFilter === filter.key
              const count = postCounts?.[filter.key] || 0
              return (
                <button
                  key={filter.key}
                  onClick={() => setActiveFilter(filter.key)}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                      : 'border border-border bg-background/50 backdrop-blur-sm hover:bg-primary/10 hover:border-primary/30 text-foreground hover:text-primary'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {filter.label}
                  {!isLoading && (
                    <span
                      className={`text-xs px-1.5 py-0.5 rounded-full ${
                        isActive ? 'bg-white/20' : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-10 px-6">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="glass-card overflow-hidden rounded-2xl">
                  <Skeleton className="h-52 w-full rounded-none" />
                  <div className="p-6 space-y-4">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : !filteredPosts || filteredPosts.length === 0 ? (
            <div className="text-center py-20 rounded-2xl glass-card border-dashed border-2">
              <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <Newspaper className="w-10 h-10 text-primary/40" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">
                {activeFilter === 'all'
                  ? t('news.empty', 'Aucune actualité pour le moment.')
                  : `Aucun ${categoryConfig[activeFilter]?.label.toLowerCase() || 'article'} pour le moment.`}
              </h3>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Revenez bientôt pour découvrir les dernières nouvelles du Consulat.
              </p>
              {activeFilter !== 'all' && (
                <Button
                  onClick={() => setActiveFilter('all')}
                  variant="outline"
                  className="h-12 px-8 rounded-xl border-primary/20 hover:bg-primary/5 text-primary"
                >
                  Voir toutes les publications
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => {
                const config = categoryConfig[post.category] || categoryConfig.actualite
                const FallbackIcon = config.icon
                return (
                  <Link
                    key={post._id}
                    to={`/actualites/$slug`}
                    params={{ slug: post.slug }}
                    className="group block"
                  >
                    <div className="glass-card overflow-hidden h-full group hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 rounded-2xl">
                      <div className="h-52 relative overflow-hidden">
                        {post.coverImage ? (
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div
                            className={`h-full w-full bg-gradient-to-br ${config.gradient} flex items-center justify-center relative`}
                          >
                            {/* Decorative pattern */}
                            <div className="absolute inset-0 opacity-[0.04]">
                              <div
                                className="w-full h-full"
                                style={{
                                  backgroundImage:
                                    'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
                                  backgroundSize: '24px 24px',
                                }}
                              />
                            </div>
                            <div className="relative">
                              <div className="w-20 h-20 rounded-2xl bg-background/60 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                <FallbackIcon className="w-10 h-10 text-primary/60" />
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="absolute top-4 left-4">
                          <Badge className={`${config.color} border-0 backdrop-blur-md shadow-sm`}>
                            {config.label}
                          </Badge>
                        </div>
                      </div>
                      <div className="p-6">
                        <h2 className="font-bold text-xl text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-3">
                          {post.title}
                        </h2>
                        <p className="text-muted-foreground line-clamp-3 mb-4 text-sm leading-relaxed">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between pt-4 border-t border-border/30">
                          <div className="flex items-center text-xs text-muted-foreground font-medium">
                            <Calendar className="w-3.5 h-3.5 mr-1.5 text-primary" />
                            {formatDate(post.publishedAt)}
                          </div>
                          <ArrowRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 dark:bg-primary/10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gabon-blue/20 rounded-full blur-[100px] animate-pulse-glow" />
        <div
          className="absolute bottom-0 left-0 w-96 h-96 bg-gabon-green/20 rounded-full blur-[100px] animate-pulse-glow"
          style={{ animationDelay: '2s' }}
        />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="glass-panel p-10 md:p-16 rounded-3xl border-primary/20 shadow-2xl shadow-primary/5">
            <Megaphone className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              {t('news.cta.title', 'Restez informé')}
            </h2>
            <p className="text-muted-foreground mb-10 text-lg max-w-2xl mx-auto leading-relaxed">
              {t(
                'news.cta.description',
                'Suivez-nous sur nos réseaux sociaux et consultez régulièrement cette page pour ne rien manquer des actualités du Consulat.'
              )}
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Button
                size="lg"
                className="h-14 px-8 rounded-xl text-base shadow-lg shadow-primary/20"
                asChild
              >
                <Link to="/contact">
                  <MapPin className="w-5 h-5 mr-2" />
                  {t('news.cta.contact', 'Nous contacter')}
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 rounded-xl text-base bg-background/50 hover:bg-accent/10 border-foreground/10"
                asChild
              >
                <a href="tel:+33751025292">
                  <Phone className="w-5 h-5 mr-2" />
                  07 51 02 52 92
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
