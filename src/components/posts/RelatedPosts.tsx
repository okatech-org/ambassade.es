import { Link } from '@tanstack/react-router'
import { useQuery } from 'convex/react'
import { Calendar, ArrowRight } from 'lucide-react'
import { api } from '@convex/_generated/api'
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
                className="group glass-card rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-300 block h-full flex flex-col"
              >
                {/* Cover Image or Placeholder */}
                <div className="h-44 relative bg-muted overflow-hidden">
                    {post.coverImage ? (
                    <img 
                        src={post.coverImage} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    ) : (
                    <div className="h-full w-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                        <Calendar className="w-12 h-12 text-primary/30" />
                    </div>
                    )}
                    <div className="absolute top-3 left-3">
                        <Badge className={`${config.color} border-0 backdrop-blur-md shadow-sm`}>
                            {config.label}
                        </Badge>
                    </div>
                </div>
                
                <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-3">
                        {post.title}
                    </h3>
                    
                    <div className="mt-auto flex items-center text-xs text-muted-foreground font-medium pt-3 border-t border-border/30">
                        <Calendar className="w-3.5 h-3.5 mr-1.5 text-primary" />
                        {formatDate(post.publishedAt)}
                    </div>
                </div>
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
