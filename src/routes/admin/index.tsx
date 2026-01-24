import { createFileRoute, Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useAuthenticatedConvexQuery } from '@/integrations/convex/hooks'
import { api } from '@convex/_generated/api'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, Newspaper, FileText, Bell, Plus } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

export const Route = createFileRoute('/admin/')({
  component: SuperadminDashboard,
})

function SuperadminDashboard() {
  const { t } = useTranslation()
  
  const { data: stats, isPending } = useAuthenticatedConvexQuery(
    api.functions.admin.getStats,
    {}
  )

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {t("superadmin.dashboard.title")}
          </h1>
          <p className="text-muted-foreground">
            {t("superadmin.dashboard.welcome")}
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("superadmin.dashboard.stats.users")}
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isPending ? <Skeleton className="h-8 w-16" /> : stats?.users.total ?? 0}
            </div>
            <p className="text-xs text-muted-foreground">
              {t("superadmin.dashboard.stats.totalUsers")}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("superadmin.dashboard.stats.posts", "Actualités")}
            </CardTitle>
            <Newspaper className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isPending ? <Skeleton className="h-8 w-16" /> : stats?.posts?.published ?? 0}
            </div>
            <p className="text-xs text-muted-foreground">
              {t("superadmin.dashboard.stats.publishedPosts", "Articles publiés")}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("superadmin.dashboard.stats.services")}
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isPending ? <Skeleton className="h-8 w-16" /> : stats?.services.active ?? 0}
            </div>
            <p className="text-xs text-muted-foreground">
              {t("superadmin.dashboard.stats.availableServices")}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("superadmin.dashboard.stats.announcements", "Annonces")}
            </CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isPending ? <Skeleton className="h-8 w-16" /> : stats?.announcements?.active ?? 0}
            </div>
            <p className="text-xs text-muted-foreground">
              {t("superadmin.dashboard.stats.activeAnnouncements", "Annonces actives")}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t("superadmin.dashboard.quickActions")}</CardTitle>
            <CardDescription>
              {t("superadmin.dashboard.quickActionsDesc")}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
            <Button variant="outline" asChild className="justify-start">
              <Link to="/admin/posts">
                <Newspaper className="mr-2 h-4 w-4" />
                {t("superadmin.nav.posts", "Actualités")}
              </Link>
            </Button>
            <Button variant="outline" asChild className="justify-start">
              <Link to="/admin/posts/new">
                <Plus className="mr-2 h-4 w-4" />
                {t("superadmin.dashboard.addPost", "Nouvelle actualité")}
              </Link>
            </Button>
            <Button variant="outline" asChild className="justify-start">
              <Link to="/admin/services">
                <FileText className="mr-2 h-4 w-4" />
                {t("superadmin.nav.services")}
              </Link>
            </Button>
            <Button variant="outline" asChild className="justify-start">
              <Link to="/admin/announcements">
                <Bell className="mr-2 h-4 w-4" />
                {t("superadmin.nav.announcements", "Annonces")}
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("superadmin.dashboard.overview", "Aperçu")}</CardTitle>
            <CardDescription>
              {t("superadmin.dashboard.overviewDesc", "État actuel du site")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Services actifs</span>
              <span className="font-medium">{stats?.services.active ?? 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Articles publiés</span>
              <span className="font-medium">{stats?.posts?.published ?? 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Annonces actives</span>
              <span className="font-medium">{stats?.announcements?.active ?? 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Utilisateurs inscrits</span>
              <span className="font-medium">{stats?.users.total ?? 0}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
