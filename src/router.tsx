import { createRouter, Link } from '@tanstack/react-router'
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'
import { useTranslation } from 'react-i18next'
import * as TanstackQuery from './integrations/tanstack-query/root-provider'

import { routeTree } from './routeTree.gen'


function NotFoundComponent() {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-6xl font-bold text-primary mb-4">{t('common.notFound.title')}</h1>
      <h2 className="text-2xl font-semibold text-foreground mb-2">{t('common.notFound.heading')}</h2>
      <p className="text-muted-foreground mb-6 max-w-md">
        {t('common.notFound.description')}
      </p>
      <Link
        to="/"
        className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        {t('common.notFound.backHome')}
      </Link>
    </div>
  )
}


export const getRouter = () => {
  const rqContext = TanstackQuery.getContext()

  const router = createRouter({
    routeTree,
    context: {
      ...rqContext,
    },
    defaultNotFoundComponent: NotFoundComponent,
    defaultPreload: 'intent',
  })

  setupRouterSsrQueryIntegration({ router, queryClient: rqContext.queryClient })

  // Load Sentry dynamically — only client-side and only when DSN is set.
  // Static import of @sentry/tanstackstart-react pulls in @opentelemetry
  // which has broken ESM exports and crashes the Nitro SSR server.
  if (!router.isServer && import.meta.env.VITE_SENTRY_DSN) {
    import('@sentry/tanstackstart-react').then((Sentry) => {
      Sentry.init({
        dsn: import.meta.env.VITE_SENTRY_DSN,
        integrations: [],
        tracesSampleRate: 1.0,
        sendDefaultPii: true,
      })
    })
  }

  return router
}

