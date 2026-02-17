import { createFileRoute, Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'convex/react'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { api } from '@convex/_generated/api'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

import { RelatedPosts } from '@/components/posts/RelatedPosts'
import { EventSidebar } from '@/components/posts/EventSidebar'
import { CommuniqueHeader, CommuniqueFooter } from '@/components/posts/CommuniqueHeader'

export const Route = createFileRoute('/actualites/$slug')({
  component: ActualiteDetailPage,
})

const categoryConfig: Record<string, { label: string; color: string; bgColor: string }> = {
  communique: {
    label: 'Communiqué',
    color: 'text-blue-700 dark:text-blue-300',
    bgColor: 'bg-blue-100 dark:bg-blue-900/50',
  },
  evenement: {
    label: 'Événement',
    color: 'text-green-700 dark:text-green-300',
    bgColor: 'bg-green-100 dark:bg-green-900/50',
  },
  actualite: {
    label: 'Actualité',
    color: 'text-gray-700 dark:text-gray-300',
    bgColor: 'bg-gray-100 dark:bg-gray-800',
  },
}

function formatDate(timestamp: number) {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(timestamp))
}

function estimateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
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
          <Skeleton className="h-6 w-32 mb-4" />
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-4 w-48 mb-8" />
          <Skeleton className="h-64 w-full rounded-xl mb-8" />
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
  
      </div>
    )
  }

  const config = categoryConfig[post.category] || categoryConfig.actualite
  const readingTime = estimateReadingTime(post.content)
  const isEvent = post.category === 'evenement'
  const isCommunique = post.category === 'communique'
  
  // Check if event has actual data to show sidebar
  const hasEventData = isEvent && (post.eventDate || post.eventLocation || post.ticketLink)

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1">
        {/* Hero Header */}
        {/* Hero Header */}
        <header className="relative overflow-hidden py-16 px-6">
           <div className="absolute inset-0 bg-background" />
           <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
           
           <div className="max-w-4xl mx-auto relative z-10">
            {/* Navigation */}
            <div className="flex flex-col-reverse md:flex-row md:items-center justify-between gap-4 mb-8">
                <Button asChild variant="ghost" size="sm" className="hover:bg-background/50 -ml-3 w-fit">
                    <Link to="/actualites">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        {t('news.backToList', 'Retour aux actualités')}
                    </Link>
                </Button>

                <nav className="flex items-center gap-2 text-sm text-muted-foreground/80">
                    <Link to="/" className="hover:text-primary transition-colors">Accueil</Link>
                    <span>/</span>
                    <Link to="/actualites" className="hover:text-primary transition-colors">Actualités</Link>
                    <span>/</span>
                    <span className={`font-medium ${config.color.replace('text-', 'text-opacity-80 ')}`}>{config.label}</span>
                </nav>
            </div>

            {/* Title & Meta */}
            <div className="space-y-6">
                <Badge className={`px-3 py-1 text-sm ${config.bgColor} ${config.color} border-0 shadow-sm`}>
                    {config.label}
                </Badge>

                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight tracking-tight">
                    {post.title}
                </h1>

                <div className="flex flex-wrap items-center gap-6 text-muted-foreground font-medium border-t border-border/40 pt-6">
                    <time className="flex items-center gap-2 bg-background/50 px-3 py-1.5 rounded-full border border-border/50">
                        <Calendar className="w-4 h-4 text-primary" />
                        {formatDate(post.publishedAt)}
                    </time>
                    <span className="flex items-center gap-2 bg-background/50 px-3 py-1.5 rounded-full border border-border/50">
                        <Clock className="w-4 h-4 text-primary" />
                        {readingTime} min de lecture
                    </span>
                </div>
            </div>
          </div>
        </header>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="px-6 -mt-4 mb-8">
            <div className="max-w-5xl mx-auto">
              <img 
                src={post.coverImage} 
                alt={post.title}
                className="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>
        )}

        {/* Content Area */}
        <section className="py-8 px-6">
          <div className={`max-w-6xl mx-auto ${hasEventData ? 'flex flex-col lg:flex-row gap-8' : ''}`}>
            {/* Main Content */}
            <article className={`${hasEventData ? 'flex-1 lg:max-w-3xl' : 'max-w-3xl mx-auto'}`}>
              {/* Communiqué Header */}
              {isCommunique && (
                <CommuniqueHeader
                  referenceNumber={post.referenceNumber}
                  documentUrl={post.documentUrl}
                  documentName={post.documentName}
                />
              )}

              {/* Excerpt */}
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                {post.excerpt}
              </p>

              {/* Content */}
              <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-foreground prose-p:text-foreground/80 prose-a:text-primary prose-img:rounded-xl">
                <ReactMarkdown>
                  {post.content}
                </ReactMarkdown>
              </div>

              {/* Communiqué Footer */}
              {isCommunique && (
                <CommuniqueFooter
                  documentUrl={post.documentUrl}
                  documentName={post.documentName}
                />
              )}
            </article>

            {/* Event Sidebar - only shown when event has data */}
            {hasEventData && (
              <aside className="lg:w-80">
                <EventSidebar
                  eventDate={post.eventDate}
                  eventEndDate={post.eventEndDate}
                  eventTime={post.eventTime}
                  eventLocation={post.eventLocation}
                  eventAddress={post.eventAddress}
                  eventMapLink={post.eventMapLink}
                  ticketLink={post.ticketLink}
                  ticketPrice={post.ticketPrice}
                />
              </aside>
            )}
          </div>
        </section>

        {/* Related Posts */}
        <RelatedPosts currentSlug={post.slug} category={post.category} />
      </div>


    </div>
  )
}
