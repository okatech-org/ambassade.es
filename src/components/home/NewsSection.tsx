import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'convex/react'
import { Calendar, ArrowRight } from 'lucide-react'
import { api } from '@convex/_generated/api'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Skeleton } from '../ui/skeleton'

const categoryConfig: Record<string, { label: string; color: string; fallbackImage: string }> = {
  communique: {
    label: 'Communiqué',
    color: 'bg-[#1a5dab]/10 text-[#1a5dab] dark:bg-[#1a5dab]/20 dark:text-[#8ab4f8]',
    fallbackImage: '/images/heroes/hero-consulat.png',
  },
  evenement: {
    label: 'Événement',
    color: 'bg-[#34a853]/10 text-[#34a853] dark:bg-[#34a853]/20 dark:text-[#81c995]',
    fallbackImage: '/images/heroes/hero-integration.png',
  },
  actualite: {
    label: 'Actualité',
    color: 'bg-[#f9ab00]/10 text-[#e37400] dark:bg-[#f9ab00]/20 dark:text-[#fdd663]',
    fallbackImage: '/images/heroes/hero-services.png',
  },
}

function formatDate(timestamp: number) {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(timestamp))
}

function FeaturedSkeleton() {
  return (
    <div className="rounded-xl overflow-hidden border bg-card">
      <Skeleton className="h-64 w-full rounded-none" />
      <div className="p-0 space-y-3 p-6">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-7 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-32 mt-4" />
      </div>
    </div>
  )
}

function SecondarySkeleton() {
  return (
    <div className="flex items-start gap-4 p-5 border-b last:border-b-0">
      <Skeleton className="w-24 h-24 rounded-lg shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-3 w-28" />
      </div>
    </div>
  )
}

export function NewsSection() {
  const { t } = useTranslation()
  const posts = useQuery(api.functions.posts.list, {
    paginationOpts: { numItems: 4, cursor: null },
  })

  const isLoading = posts === undefined

  // Split posts: first one is featured, rest are secondary
  const featuredPost = posts?.page[0]
  const secondaryPosts = posts?.page.slice(1) || []

  return (
    <section className="py-12 md:py-24 px-4 md:px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
            <Calendar className="w-3.5 h-3.5 mr-1.5" />
            {t('news.badge', 'Actualités & Événements')}
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            {t('news.titlePart1', 'Restez')}{' '}
            <span className="text-gradient">
              {t('news.titleHighlight', 'Informé')}
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-6">
            {t('news.description', 'Communiqués officiels, événements communautaires et informations pratiques du consulat.')}
          </p>
          <Button asChild variant="outline" size="sm" className="rounded-full border-[#1a5dab]/30 text-[#1a5dab] hover:bg-[#1a5dab]/5">
            <Link to="/actualites">
              {t('news.viewAll', 'Voir toutes les actualités')}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>

        {/* Featured + Secondary Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Featured Post - Left Side (1/2 width) */}
          <div className="h-full">
            {isLoading ? (
              <FeaturedSkeleton />
            ) : !featuredPost ? (
              <div className="h-full flex items-center justify-center text-muted-foreground py-12 border rounded-xl">
                {t('news.empty', 'Aucune actualité pour le moment.')}
              </div>
            ) : (
              <Link
                to="/actualites/$slug"
                params={{ slug: featuredPost.slug }}
                className="group block h-full"
              >
                <div className="rounded-xl overflow-hidden glass-card hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                  {/* Featured Image */}
                  <img 
                    src={featuredPost.coverImage || categoryConfig[featuredPost.category]?.fallbackImage || categoryConfig.actualite.fallbackImage} 
                    alt={featuredPost.title}
                    className="w-full h-64 object-cover object-top"
                  />
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex-1">
                      <Badge className={`mb-4 ${categoryConfig[featuredPost.category]?.color || categoryConfig.actualite.color} border-0`}>
                        {categoryConfig[featuredPost.category]?.label || 'Actualité'}
                      </Badge>
                      <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors mb-3 line-clamp-3">
                        {featuredPost.title}
                      </h3>
                      <p className="text-muted-foreground line-clamp-3 mb-6">
                        {featuredPost.excerpt}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t">
                      <p className="text-sm text-muted-foreground font-medium">
                        {formatDate(featuredPost.publishedAt)}
                      </p>
                      <ArrowRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </div>
              </Link>
            )}
          </div>

          {/* Secondary Posts - Right Side (1/2 width) */}
          <div className="h-full">
            <div className="h-full rounded-xl glass-card overflow-hidden flex flex-col">
              <div className="flex-1 divide-y">
                {isLoading ? (
                  <>
                    <SecondarySkeleton />
                    <SecondarySkeleton />
                    <SecondarySkeleton />
                  </>
                ) : secondaryPosts.length === 0 ? (
                  <div className="p-6 text-center text-muted-foreground h-full flex items-center justify-center">
                    {t('news.noMore', 'Pas d\'autres actualités')}
                  </div>
                ) : (
                  secondaryPosts.map((post) => {
                    const config = categoryConfig[post.category] || categoryConfig.actualite
                    return (
                      <Link
                        key={post._id}
                        to="/actualites/$slug"
                        params={{ slug: post.slug }}
                        className="group block p-6 hover:bg-muted/50 transition-colors h-1/3"
                      >
                        <div className="flex gap-6 h-full items-center">
                          {/* Square Thumbnail Image */}
                          <div className="w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-muted">
                            <img 
                              src={post.coverImage || categoryConfig[post.category]?.fallbackImage || categoryConfig.actualite.fallbackImage} 
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          
                          <div className="flex-1 min-w-0 flex flex-col justify-center h-full">
                            <Badge className={`mb-2 w-fit text-xs ${config.color} border-0`}>
                              {config.label}
                            </Badge>
                            <h4 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                              {post.title}
                            </h4>
                            <p className="text-sm text-muted-foreground mt-auto">
                              {formatDate(post.publishedAt)}
                            </p>
                          </div>
                          
                          <div className="h-full flex items-center">
                            <ArrowRight className="w-5 h-5 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                          </div>
                        </div>
                      </Link>
                    )
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NewsSection
