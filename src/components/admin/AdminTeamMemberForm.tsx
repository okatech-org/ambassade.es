import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'convex/react'
import { api } from '@convex/_generated/api'
import { Link } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Loader2, Upload, Trash2, User, Crown } from 'lucide-react'
import { toast } from 'sonner'

interface TeamMemberFormData {
  firstName: string
  lastName: string
  role: string
  description?: string
  photoStorageId?: string
  photoUrl?: string
  email?: string
  linkedIn?: string
  isConsulGeneral: boolean
  isActive: boolean
}

interface AdminTeamMemberFormProps {
  onSubmit: (data: TeamMemberFormData) => Promise<void>
  initialData?: TeamMemberFormData
}

export function AdminTeamMemberForm({ onSubmit, initialData }: AdminTeamMemberFormProps) {
  const { t } = useTranslation()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const generateUploadUrl = useMutation(api.functions.teamMembers.generateUploadUrl)
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  
  const [formData, setFormData] = useState<TeamMemberFormData>({
    firstName: initialData?.firstName || '',
    lastName: initialData?.lastName || '',
    role: initialData?.role || '',
    description: initialData?.description || '',
    photoStorageId: initialData?.photoStorageId,
    photoUrl: initialData?.photoUrl,
    email: initialData?.email || '',
    linkedIn: initialData?.linkedIn || '',
    isConsulGeneral: initialData?.isConsulGeneral || false,
    isActive: initialData?.isActive ?? true,
  })

  const handleChange = (field: keyof TeamMemberFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error(t('admin.team.invalidFileType', 'Veuillez sélectionner une image'))
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error(t('admin.team.fileTooLarge', 'L\'image ne doit pas dépasser 5 Mo'))
      return
    }

    setIsUploading(true)
    try {
      // Get upload URL
      const uploadUrl = await generateUploadUrl()
      
      // Upload file
      const response = await fetch(uploadUrl, {
        method: 'POST',
        headers: { 'Content-Type': file.type },
        body: file,
      })
      
      if (!response.ok) throw new Error('Upload failed')
      
      const { storageId } = await response.json()
      
      // Create preview URL
      const previewUrl = URL.createObjectURL(file)
      
      setFormData(prev => ({
        ...prev,
        photoStorageId: storageId,
        photoUrl: previewUrl,
      }))
      
      toast.success(t('admin.team.photoUploaded', 'Photo téléchargée'))
    } catch (error) {
      console.error('Upload error:', error)
      toast.error(t('admin.team.uploadError', 'Erreur lors du téléchargement'))
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemovePhoto = () => {
    setFormData(prev => ({
      ...prev,
      photoStorageId: undefined,
      photoUrl: undefined,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.role.trim()) {
      toast.error(t('admin.team.requiredFields', 'Veuillez remplir les champs obligatoires'))
      return
    }

    setIsSubmitting(true)
    try {
      await onSubmit(formData)
      toast.success(t('admin.team.saved', 'Membre enregistré'))
    } catch (error) {
      console.error('Submit error:', error)
      toast.error(t('admin.team.saveError', 'Erreur lors de l\'enregistrement'))
    } finally {
      setIsSubmitting(false)
    }
  }

  const initials = formData.firstName && formData.lastName 
    ? `${formData.firstName.charAt(0)}${formData.lastName.charAt(0)}`
    : ''

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-6 lg:grid-cols-[300px,1fr]">
        {/* Photo section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="h-4 w-4" />
              {t('admin.team.photo', 'Photo')}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <Avatar className="w-32 h-32">
              <AvatarImage src={formData.photoUrl} alt="Photo" />
              <AvatarFallback className="text-3xl bg-primary/10 text-primary">
                {initials || <User className="h-12 w-12" />}
              </AvatarFallback>
            </Avatar>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
            
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
              >
                {isUploading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Upload className="h-4 w-4 mr-2" />
                )}
                {t('admin.team.uploadPhoto', 'Télécharger')}
              </Button>
              
              {formData.photoUrl && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleRemovePhoto}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            <p className="text-xs text-muted-foreground text-center">
              {t('admin.team.photoHint', 'Format JPG ou PNG, max 5 Mo')}
            </p>
          </CardContent>
        </Card>

        {/* Form fields */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {t('admin.team.info', 'Informations')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Name */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">{t('admin.team.firstName', 'Prénom')} *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  placeholder="Jean"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">{t('admin.team.lastName', 'Nom')} *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  placeholder="Dupont"
                  required
                />
              </div>
            </div>

            {/* Role */}
            <div className="space-y-2">
              <Label htmlFor="role">{t('admin.team.role', 'Fonction')} *</Label>
              <Input
                id="role"
                value={formData.role}
                onChange={(e) => handleChange('role', e.target.value)}
                placeholder="Consul Général"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">{t('admin.team.description', 'Bio / Description')}</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Courte biographie..."
                rows={4}
              />
            </div>

            {/* Contact */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">{t('admin.team.email', 'Email')}</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="jean.dupont@consulat.ga"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedIn">{t('admin.team.linkedIn', 'LinkedIn')}</Label>
                <Input
                  id="linkedIn"
                  type="url"
                  value={formData.linkedIn}
                  onChange={(e) => handleChange('linkedIn', e.target.value)}
                  placeholder="https://linkedin.com/in/..."
                />
              </div>
            </div>

            {/* Switches */}
            <div className="space-y-4 pt-4 border-t">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="isConsulGeneral" className="flex items-center gap-2">
                    <Crown className="h-4 w-4 text-yellow-500" />
                    {t('admin.team.isConsulGeneral', 'Consul Général')}
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {t('admin.team.isConsulGeneralHint', 'Affiche ce membre dans la section spéciale "Mot du Consul"')}
                  </p>
                </div>
                <Switch
                  id="isConsulGeneral"
                  checked={formData.isConsulGeneral}
                  onCheckedChange={(checked) => handleChange('isConsulGeneral', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="isActive">{t('admin.team.isActive', 'Actif')}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t('admin.team.isActiveHint', 'Les membres inactifs ne sont pas affichés sur le site')}
                  </p>
                </div>
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => handleChange('isActive', checked)}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                {t('common.save', 'Enregistrer')}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link to="/admin/team">{t('common.cancel', 'Annuler')}</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </form>
  )
}
