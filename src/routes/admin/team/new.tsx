import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'convex/react'
import { api } from '@convex/_generated/api'
import { AdminTeamMemberForm } from '@/components/admin/AdminTeamMemberForm'

export const Route = createFileRoute('/admin/team/new')({
  component: NewTeamMemberPage,
})

function NewTeamMemberPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const createMember = useMutation(api.functions.teamMembers.create)

  const handleSubmit = async (data: {
    firstName: string
    lastName: string
    role: string
    description?: string
    photoStorageId?: string
    email?: string
    linkedIn?: string
    isConsulGeneral: boolean
    isActive: boolean
  }) => {
    await createMember({
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role,
      description: data.description || undefined,
      photoStorageId: data.photoStorageId as any,
      email: data.email || undefined,
      linkedIn: data.linkedIn || undefined,
      isConsulGeneral: data.isConsulGeneral,
      isActive: data.isActive,
    })
    navigate({ to: '/admin/team' })
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {t('admin.team.newTitle', 'Nouveau membre')}
        </h1>
        <p className="text-muted-foreground">
          {t('admin.team.newDescription', 'Ajouter un nouveau membre à l\'équipe')}
        </p>
      </div>

      <AdminTeamMemberForm onSubmit={handleSubmit} />
    </div>
  )
}
