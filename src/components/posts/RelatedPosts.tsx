import { Link } from '@tanstack/react-router'
import { useQuery } from 'convex/react'
import { Calendar, ArrowRight } from 'lucide-react'
import { api } from '@convex/_generated/api'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

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

interface RelatedPostsProps {
  currentSlug: string
  category: string
}

export function RelatedPosts({ currentSlug, category }: RelatedPostsProps) {
  const posts = useQuery(api.functions.posts.getRelated, {
    currentSlug,
    category,
    limit: 3,
  })

  if (!posts || posts.length === 0) return null

  return (
    <section className="py-16 border-t">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Découvrir plus d'articles
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => {
            const config = categoryConfig[post.category] || categoryConfig.actualite
            
            return (
              <Link
                key={post._id}
                to="/actualites/$slug"
                params={{ slug: post.slug }}
                className="group"
              >
                <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                  {/* Cover Image or Placeholder */}
                  {post.coverImage ? (
                    <img 
                      src={post.coverImage} 
                      alt={post.title}
                      className="w-full h-40 object-cover"
                    />
                  ) : (
                    <div className="h-40 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                      <Calendar className="w-10 h-10 text-primary/20" />
                    </div>
                  )}
                  
                  <CardContent className="p-4">
                    <Badge className={`mb-2 ${config.color} border-0`}>
                      {config.label}
                    </Badge>
                    
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-xs text-muted-foreground">
                      {formatDate(post.publishedAt)}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
        
        <div className="text-center mt-8">
          <Link 
            to="/actualites"
            className="inline-flex items-center text-primary hover:underline font-medium"
          >
            Voir toutes les actualités
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  )
}
