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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ArrowLeft, Save, Calendar, MapPin, Ticket, FileText } from 'lucide-react'
import { toast } from 'sonner'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/posts/$postId/edit')({
  component: EditPostPage,
})

interface PostFormData {
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string
  category: 'actualite' | 'evenement' | 'communique'
  status: 'draft' | 'published'
  publishedAt: number | undefined
  // Event fields
  eventDate: string
  eventEndDate: string
  eventTime: string
  eventLocation: string
  eventAddress: string
  eventMapLink: string
  ticketLink: string
  ticketPrice: string
  // Communiqué fields
  documentUrl: string
  documentName: string
  referenceNumber: string
}

function formatDateForInput(timestamp?: number): string {
  if (!timestamp) return ''
  return new Date(timestamp).toISOString().split('T')[0]
}

function EditPostPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { postId } = Route.useParams()
  
  const posts = useQuery(api.functions.posts.listAll)
  const post = posts?.find(p => p._id === postId)
  const updatePost = useMutation(api.functions.posts.update)
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<PostFormData>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    coverImage: '',
    category: 'actualite',
    status: 'draft',
    publishedAt: undefined,
    // Event fields
    eventDate: '',
    eventEndDate: '',
    eventTime: '',
    eventLocation: '',
    eventAddress: '',
    eventMapLink: '',
    ticketLink: '',
    ticketPrice: '',
    // Communiqué fields
    documentUrl: '',
    documentName: '',
    referenceNumber: '',
  })

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        coverImage: post.coverImage || '',
        category: post.category,
        status: post.status,
        publishedAt: post.publishedAt,
        // Event fields
        eventDate: formatDateForInput(post.eventDate),
        eventEndDate: formatDateForInput(post.eventEndDate),
        eventTime: post.eventTime || '',
        eventLocation: post.eventLocation || '',
        eventAddress: post.eventAddress || '',
        eventMapLink: post.eventMapLink || '',
        ticketLink: post.ticketLink || '',
        ticketPrice: post.ticketPrice || '',
        // Communiqué fields
        documentUrl: post.documentUrl || '',
        documentName: post.documentName || '',
        referenceNumber: post.referenceNumber || '',
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
        title: formData.title,
        slug: formData.slug,
        excerpt: formData.excerpt,
        content: formData.content,
        coverImage: formData.coverImage || undefined,
        category: formData.category,
        status: formData.status,
        publishedAt: formData.status === 'published' && !formData.publishedAt 
          ? Date.now() 
          : formData.publishedAt,
        // Event fields (only if category is evenement)
        ...(formData.category === 'evenement' && {
          eventDate: formData.eventDate ? new Date(formData.eventDate).getTime() : undefined,
          eventEndDate: formData.eventEndDate ? new Date(formData.eventEndDate).getTime() : undefined,
          eventTime: formData.eventTime || undefined,
          eventLocation: formData.eventLocation || undefined,
          eventAddress: formData.eventAddress || undefined,
          eventMapLink: formData.eventMapLink || undefined,
          ticketLink: formData.ticketLink || undefined,
          ticketPrice: formData.ticketPrice || undefined,
        }),
        // Communiqué fields (only if category is communique)
        ...(formData.category === 'communique' && {
          documentUrl: formData.documentUrl || undefined,
          documentName: formData.documentName || undefined,
          referenceNumber: formData.referenceNumber || undefined,
        }),
      })
      toast.success(t('admin.posts.updated', 'Article mis à jour'))
      navigate({ to: '/admin/posts' })
    } catch {
      toast.error(t('admin.posts.updateError', 'Erreur lors de la mise à jour'))
    } finally {
      setIsSubmitting(false)
    }
  }

  const isEvent = formData.category === 'evenement'
  const isCommunique = formData.category === 'communique'

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

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Main Content Card */}
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

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="category">{t('admin.posts.form.category', 'Type')}</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, category: value as typeof prev.category }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="actualite">📰 Actualité</SelectItem>
                    <SelectItem value="evenement">📅 Événement</SelectItem>
                    <SelectItem value="communique">📄 Communiqué</SelectItem>
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
              <div className="space-y-2">
                <Label htmlFor="coverImage">Image de couverture</Label>
                <Input
                  id="coverImage"
                  value={formData.coverImage}
                  onChange={(e) => setFormData(prev => ({ ...prev, coverImage: e.target.value }))}
                  placeholder="https://..."
                />
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
              <Label htmlFor="content">{t('admin.posts.form.content', 'Contenu (Markdown)')} *</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                placeholder={t('admin.posts.form.contentPlaceholder', 'Contenu complet de l\'article en Markdown...')}
                rows={12}
                className="font-mono text-sm"
              />
            </div>
          </CardContent>
        </Card>

        {/* Event-specific Fields */}
        {isEvent && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Détails de l'événement
              </CardTitle>
              <CardDescription>
                Informations spécifiques à l'événement
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="eventDate">Date de l'événement</Label>
                  <Input
                    id="eventDate"
                    type="date"
                    value={formData.eventDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, eventDate: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="eventEndDate">Date de fin (optionnel)</Label>
                  <Input
                    id="eventEndDate"
                    type="date"
                    value={formData.eventEndDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, eventEndDate: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="eventTime">Horaire</Label>
                  <Input
                    id="eventTime"
                    value={formData.eventTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, eventTime: e.target.value }))}
                    placeholder="15h00 - 18h00"
                  />
                </div>
              </div>

              <Separator />

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="eventLocation" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Lieu
                  </Label>
                  <Input
                    id="eventLocation"
                    value={formData.eventLocation}
                    onChange={(e) => setFormData(prev => ({ ...prev, eventLocation: e.target.value }))}
                    placeholder="Consulat Général du Gabon"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="eventAddress">Adresse</Label>
                  <Input
                    id="eventAddress"
                    value={formData.eventAddress}
                    onChange={(e) => setFormData(prev => ({ ...prev, eventAddress: e.target.value }))}
                    placeholder="29 rue Galilée, 75116 Paris"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="eventMapLink">Lien Google Maps</Label>
                <Input
                  id="eventMapLink"
                  value={formData.eventMapLink}
                  onChange={(e) => setFormData(prev => ({ ...prev, eventMapLink: e.target.value }))}
                  placeholder="https://maps.google.com/..."
                />
              </div>

              <Separator />

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="ticketLink" className="flex items-center gap-2">
                    <Ticket className="w-4 h-4" />
                    Lien billetterie
                  </Label>
                  <Input
                    id="ticketLink"
                    value={formData.ticketLink}
                    onChange={(e) => setFormData(prev => ({ ...prev, ticketLink: e.target.value }))}
                    placeholder="https://..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ticketPrice">Tarif</Label>
                  <Input
                    id="ticketPrice"
                    value={formData.ticketPrice}
                    onChange={(e) => setFormData(prev => ({ ...prev, ticketPrice: e.target.value }))}
                    placeholder="Gratuit / 15€ / Sur inscription"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Communiqué-specific Fields */}
        {isCommunique && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Détails du communiqué
              </CardTitle>
              <CardDescription>
                Informations spécifiques au communiqué officiel
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="referenceNumber">Numéro de référence</Label>
                <Input
                  id="referenceNumber"
                  value={formData.referenceNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, referenceNumber: e.target.value }))}
                  placeholder="CGAB/2025/001"
                />
              </div>

              <Separator />

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="documentUrl">URL du document PDF</Label>
                  <Input
                    id="documentUrl"
                    value={formData.documentUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, documentUrl: e.target.value }))}
                    placeholder="https://..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="documentName">Nom du fichier</Label>
                  <Input
                    id="documentName"
                    value={formData.documentName}
                    onChange={(e) => setFormData(prev => ({ ...prev, documentName: e.target.value }))}
                    placeholder="Communiqué officiel.pdf"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Actions */}
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
      </form>
    </div>
  )
}
