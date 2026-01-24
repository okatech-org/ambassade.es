import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useQuery, useMutation } from 'convex/react'
import { api } from '@convex/_generated/api'
import type { Id } from '@convex/_generated/dataModel'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ArrowLeft, Save } from 'lucide-react'
import { toast } from 'sonner'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/posts/$postId/edit')({
  component: EditPostPage,
})

function EditPostPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { postId } = Route.useParams()
  
  const posts = useQuery(api.functions.posts.listAll)
  const post = posts?.find(p => p._id === postId)
  const updatePost = useMutation(api.functions.posts.update)
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'actualite' as 'actualite' | 'evenement' | 'communique',
    status: 'draft' as 'draft' | 'published',
    publishedAt: undefined as number | undefined,
  })

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        status: post.status,
        publishedAt: post.publishedAt,
      })
    }
  }, [post])

  const isLoading = posts === undefined

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title || !formData.excerpt || !formData.content) {
      toast.error(t('admin.posts.missingFields', 'Veuillez remplir tous les champs obligatoires'))
      return
    }

    setIsSubmitting(true)
    try {
      await updatePost({
        id: postId as Id<'posts'>,
        ...formData,
        publishedAt: formData.status === 'published' && !formData.publishedAt 
          ? Date.now() 
          : formData.publishedAt,
      })
      toast.success(t('admin.posts.updated', 'Article mis à jour'))
      navigate({ to: '/admin/posts' })
    } catch {
      toast.error(t('admin.posts.updateError', 'Erreur lors de la mise à jour'))
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col gap-4 p-4 pt-6">
        <Skeleton className="h-10 w-64" />
        <Card>
          <CardContent className="p-6 space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-32 w-full" />
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-4">
        <p className="text-muted-foreground">{t('admin.posts.notFound', 'Article non trouvé')}</p>
        <Button asChild>
          <Link to="/admin/posts">{t('common.back', 'Retour')}</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/admin/posts">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {t('admin.posts.editTitle', 'Modifier l\'article')}
          </h1>
          <p className="text-muted-foreground">{post.title}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>{t('admin.posts.form.title', 'Contenu de l\'article')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">{t('admin.posts.form.titleLabel', 'Titre')} *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder={t('admin.posts.form.titlePlaceholder', 'Titre de l\'article')}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">{t('admin.posts.form.slug', 'Slug (URL)')}</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  placeholder="mon-article"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="category">{t('admin.posts.form.category', 'Catégorie')}</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, category: value as typeof prev.category }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="actualite">Actualité</SelectItem>
                    <SelectItem value="evenement">Événement</SelectItem>
                    <SelectItem value="communique">Communiqué</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">{t('admin.posts.form.status', 'Statut')}</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as typeof prev.status }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">{t('admin.posts.draft', 'Brouillon')}</SelectItem>
                    <SelectItem value="published">{t('admin.posts.published', 'Publié')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">{t('admin.posts.form.excerpt', 'Résumé')} *</Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                placeholder={t('admin.posts.form.excerptPlaceholder', 'Brève description de l\'article...')}
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">{t('admin.posts.form.content', 'Contenu')} *</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                placeholder={t('admin.posts.form.contentPlaceholder', 'Contenu complet de l\'article...')}
                rows={10}
              />
            </div>

            <div className="flex justify-end gap-4">
              <Button variant="outline" type="button" asChild>
                <Link to="/admin/posts">{t('common.cancel', 'Annuler')}</Link>
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                <Save className="mr-2 h-4 w-4" />
                {isSubmitting 
                  ? t('common.saving', 'Enregistrement...')
                  : t('common.save', 'Enregistrer')
                }
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
