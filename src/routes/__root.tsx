import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  useMatches,
  useLocation,
} from '@tanstack/react-router'
import { useEffect, useRef } from 'react'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import Header from '../components/Header'
import Footer from '../components/Footer'

import ClerkProvider from '../integrations/clerk/provider'

import ConvexProvider from '../integrations/convex/provider'

import I18nProvider from '../integrations/i18n/provider'

import { ThemeProvider } from '@/components/theme-provider'

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'

import appCss from '../styles.css?url'

import type { QueryClient } from '@tanstack/react-query'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()(({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Consulat Général du Gabon en France - Site Officiel',
      },
      {
        name: 'description',
        content: 'Site officiel d\'information du Consulat Général du Gabon en France. Retrouvez toutes les démarches consulaires, actualités, et informations pratiques.',
      },
      {
        property: 'og:title',
        content: 'Consulat Général du Gabon en France',
      },
      {
        property: 'og:description',
        content: 'Site officiel d\'information du Consulat Général du Gabon en France.',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        name: 'theme-color',
        content: '#009E60', // Gabon Green
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),

  shellComponent: RootDocument,
  component: RootLayout,
}))


const routesWithOwnLayout = ['/admin']

function RootLayout() {
  const matches = useMatches()
  const location = useLocation()
  
  const hasOwnLayout = matches.some(match => 
    routesWithOwnLayout.some(route => match.fullPath.startsWith(route))
  )

  const mainRef = useRef<HTMLElement>(null)

  // Scroll to top on route change
  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTop = 0
    }
  }, [location.pathname])

  useEffect(() => {
    if (hasOwnLayout) return

    const handleWheel = (e: WheelEvent) => {
      if (!mainRef.current) return
      
      let target = e.target as HTMLElement | null
      
      while (target) {
        if (target === mainRef.current) {
          return 
        }

        const style = window.getComputedStyle(target)
        const overflowY = style.overflowY
        const isScrollable = (overflowY === 'auto' || overflowY === 'scroll') && target.scrollHeight > target.clientHeight
        
        if (isScrollable) {
          return
        }
        
        target = target.parentElement
      }

      mainRef.current.scrollTop += e.deltaY
    }

    window.addEventListener('wheel', handleWheel)
    return () => window.removeEventListener('wheel', handleWheel)
  }, [hasOwnLayout])

  return (
    <>
      {!hasOwnLayout && <Header />}
      <main 
        ref={mainRef}
        className="overflow-y-auto"
        style={{ 
          marginTop: hasOwnLayout ? '0' : 'clamp(64px, calc(64px + 36px), 100px)',
          height: hasOwnLayout ? '100vh' : 'calc(100vh - clamp(64px, calc(64px + 36px), 100px))'
        }}
      >
        <Outlet />
        {!hasOwnLayout && <Footer />}
      </main>
    </>
  )
}


function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="h-full overflow-hidden">
      <head>
        <HeadContent />
      </head>
      <body className="h-full overflow-hidden">
        <I18nProvider>
          <ClerkProvider>
            <ConvexProvider>
              <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                {children}
                <TanStackDevtools
                  config={{
                    position: 'bottom-right',
                  }}
                  plugins={[
                    {
                      name: 'Tanstack Router',
                      render: <TanStackRouterDevtoolsPanel />,
                    },
                    TanStackQueryDevtools,
                  ]}
                />
              </ThemeProvider>
            </ConvexProvider>
          </ClerkProvider>
        </I18nProvider>

        <Scripts />
      </body>
    </html>
  )
}
