import { createFileRoute, Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'convex/react'
import { ArrowLeft, Calendar } from 'lucide-react'
import { api } from '@convex/_generated/api'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Footer } from '@/components/Footer'

export const Route = createFileRoute('/actualites/$slug')({
  component: ActualiteDetailPage,
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

function ActualiteDetailPage() {
  const { t } = useTranslation()
  const { slug } = Route.useParams()
  const post = useQuery(api.functions.posts.getBySlug, { slug })

  const isLoading = post === undefined

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <Skeleton className="h-8 w-32 mb-8" />
          <Skeleton className="h-10 w-3/4 mb-4" />
          <Skeleton className="h-4 w-48 mb-8" />
          <Skeleton className="h-64 w-full mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="text-center">
            <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">
              {t('news.notFound', 'Article non trouvé')}
            </h1>
            <p className="text-muted-foreground mb-6">
              {t('news.notFoundDesc', "L'article demandé n'existe pas ou a été supprimé.")}
            </p>
            <Button asChild>
              <Link to="/actualites">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t('news.backToList', 'Retour aux actualités')}
              </Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const config = categoryConfig[post.category] || categoryConfig.actualite

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1">
        {/* Header */}
        <section className="bg-gradient-to-b from-primary/10 to-background py-12 px-6">
          <div className="max-w-4xl mx-auto">
            <Button asChild variant="ghost" size="sm" className="mb-6">
              <Link to="/actualites">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t('news.backToList', 'Retour aux actualités')}
              </Link>
            </Button>

            <Badge className={`mb-4 ${config.color} border-0`}>
              {config.label}
            </Badge>

            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {post.title}
            </h1>

            <p className="text-muted-foreground">
              {formatDate(post.publishedAt)}
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="lead text-xl text-muted-foreground mb-8">
                {post.excerpt}
              </p>
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}
