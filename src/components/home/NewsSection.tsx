import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'convex/react'
import { Calendar, ArrowRight } from 'lucide-react'
import { api } from '@convex/_generated/api'
import { Card, CardContent } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Skeleton } from '../ui/skeleton'

const categoryConfig: Record<string, { label: string; color: string }> = {
  communique: {
    label: 'Communiqué',
    color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300',
  },
  evenement: {
    label: 'Événement',
    color: 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300',
  },
  actualite: {
    label: 'Actualité',
    color: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
  },
}

function formatDate(timestamp: number) {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(timestamp))
}

function NewsSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="h-40 w-full rounded-none" />
      <CardContent className="p-4 space-y-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-24" />
      </CardContent>
    </Card>
  )
}

export function NewsSection() {
  const { t } = useTranslation()
  const posts = useQuery(api.functions.posts.list, {
    paginationOpts: { numItems: 4, cursor: null },
  })

  const isLoading = posts === undefined

  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            {t('news.title', 'Actualités')}
          </h2>
          <Button asChild variant="ghost" className="group">
            <Link to="/actualites">
              {t('news.viewAll', 'Voir toutes les actualités')}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            <>
              <NewsSkeleton />
              <NewsSkeleton />
              <NewsSkeleton />
              <NewsSkeleton />
            </>
          ) : posts.page.length === 0 ? (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              {t('news.empty', 'Aucune actualité pour le moment.')}
            </div>
          ) : (
            posts.page.map((post) => {
              const config = categoryConfig[post.category] || categoryConfig.actualite
              return (
                <Link
                  key={post._id}
                  to="/actualites/$slug"
                  params={{ slug: post.slug }}
                  className="group block"
                >
                  <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow">
                    {/* Placeholder image */}
                    <div className="h-40 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <Calendar className="w-12 h-12 text-primary/30" />
                    </div>
                    <CardContent className="p-4">
                      <Badge className={`mb-2 ${config.color} border-0`}>
                        {config.label}
                      </Badge>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {post.excerpt}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(post.publishedAt)}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              )
            })
          )}
        </div>
      </div>
    </section>
  )
}

export default NewsSection
