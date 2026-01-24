import { createFileRoute, Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'convex/react'
import { Calendar, ArrowLeft } from 'lucide-react'
import { api } from '@convex/_generated/api'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'


export const Route = createFileRoute('/actualites/')({
  component: ActualitesPage,
})

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

function ActualitesPage() {
  const { t } = useTranslation()
  const posts = useQuery(api.functions.posts.list, {
    paginationOpts: { numItems: 20, cursor: null },
  })

  const isLoading = posts === undefined

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-b from-primary/10 to-background py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <Button asChild variant="ghost" size="sm" className="mb-6">
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('common.back', 'Retour')}
            </Link>
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            {t('news.pageTitle', 'Actualités')}
          </h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            {t('news.pageDescription', 'Retrouvez les dernières actualités, communiqués et événements du Consulat.')}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="h-48 w-full rounded-none" />
                  <CardContent className="p-4 space-y-3">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : posts.page.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <Calendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>{t('news.empty', 'Aucune actualité pour le moment.')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.page.map((post) => {
                const config = categoryConfig[post.category] || categoryConfig.actualite
                return (
                  <Link
                    key={post._id}
                    to={`/actualites/$slug`}
                    params={{ slug: post.slug }}
                    className="group block"
                  >
                    <Card className="py-0 overflow-hidden h-full hover:shadow-lg transition-shadow">
                      <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                        <Calendar className="w-16 h-16 text-primary/30" />
                      </div>
                      <CardContent className="p-6 pt-0">
                        <Badge className={`mb-3 ${config.color} border-0`}>
                          {config.label}
                        </Badge>
                        <h2 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                          {post.title}
                        </h2>
                        <p className="text-muted-foreground line-clamp-3 mb-4">
                          {post.excerpt}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(post.publishedAt)}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </section>


    </div>
  )
}
