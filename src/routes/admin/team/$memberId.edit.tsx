import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useQuery, useMutation } from 'convex/react'
import { api } from '@convex/_generated/api'
import type { Id } from '@convex/_generated/dataModel'
import { AdminTeamMemberForm } from '@/components/admin/AdminTeamMemberForm'
import { Skeleton } from '@/components/ui/skeleton'

export const Route = createFileRoute('/admin/team/$memberId/edit')({
  component: EditTeamMemberPage,
})

function EditTeamMemberPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { memberId } = Route.useParams()
  
  const member = useQuery(api.functions.teamMembers.getById, { 
    id: memberId as Id<'teamMembers'> 
  })
  const updateMember = useMutation(api.functions.teamMembers.update)

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
    await updateMember({
      id: memberId as Id<'teamMembers'>,
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

  if (member === undefined) {
    return (
      <div className="flex flex-1 flex-col gap-4 p-4 pt-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-96" />
        <Skeleton className="h-96 w-full" />
      </div>
    )
  }

  if (member === null) {
    return (
      <div className="flex flex-1 flex-col gap-4 p-4 pt-6">
        <p className="text-muted-foreground">{t('admin.team.notFound', 'Membre non trouvé')}</p>
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {t('admin.team.editTitle', 'Modifier le membre')}
        </h1>
        <p className="text-muted-foreground">
          {member.firstName} {member.lastName}
        </p>
      </div>

      <AdminTeamMemberForm 
        onSubmit={handleSubmit} 
        initialData={{
          firstName: member.firstName,
          lastName: member.lastName,
          role: member.role,
          description: member.description || undefined,
          photoStorageId: member.photoStorageId || undefined,
          photoUrl: member.photoUrl || undefined,
          email: member.email || undefined,
          linkedIn: member.linkedIn || undefined,
          isConsulGeneral: member.isConsulGeneral,
          isActive: member.isActive,
        }}
      />
    </div>
  )
}
