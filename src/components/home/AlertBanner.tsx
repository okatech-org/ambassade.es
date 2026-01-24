import { useQuery } from 'convex/react'
import { X, AlertTriangle, Info, AlertCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
import { api } from '@convex/_generated/api'

const typeConfig = {
  info: {
    icon: Info,
    bg: 'bg-blue-50 dark:bg-blue-950/50',
    border: 'border-blue-200 dark:border-blue-800',
    text: 'text-blue-800 dark:text-blue-200',
    iconColor: 'text-blue-500',
  },
  warning: {
    icon: AlertTriangle,
    bg: 'bg-yellow-50 dark:bg-yellow-950/50',
    border: 'border-yellow-200 dark:border-yellow-800',
    text: 'text-yellow-800 dark:text-yellow-200',
    iconColor: 'text-yellow-500',
  },
  danger: {
    icon: AlertCircle,
    bg: 'bg-red-50 dark:bg-red-950/50',
    border: 'border-red-200 dark:border-red-800',
    text: 'text-red-800 dark:text-red-200',
    iconColor: 'text-red-500',
  },
}

export function AlertBanner() {
  const announcements = useQuery(api.functions.announcements.getActive)
  const [dismissed, setDismissed] = useState<string[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('dismissed-announcements')
    if (stored) {
      setDismissed(JSON.parse(stored))
    }
  }, [])

  const handleDismiss = (id: string) => {
    const updated = [...dismissed, id]
    setDismissed(updated)
    localStorage.setItem('dismissed-announcements', JSON.stringify(updated))
  }

  if (!announcements || announcements.length === 0) return null

  const active = announcements.filter((a) => !dismissed.includes(a._id))
  if (active.length === 0) return null

  return (
    <div className="space-y-1">
      {active.map((announcement) => {
        const config = typeConfig[announcement.type] || typeConfig.info
        const Icon = config.icon

        return (
          <div
            key={announcement._id}
            className={`${config.bg} ${config.border} ${config.text} border-b px-4 py-3`}
          >
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Icon className={`w-5 h-5 ${config.iconColor} shrink-0`} />
                <p className="text-sm font-medium">
                  {announcement.message}
                  {announcement.link && (
                    <a
                      href={announcement.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 underline hover:no-underline"
                    >
                      En savoir plus →
                    </a>
                  )}
                </p>
              </div>
              <button
                onClick={() => handleDismiss(announcement._id)}
                className="p-1 hover:bg-black/5 dark:hover:bg-white/10 rounded transition-colors"
                aria-label="Fermer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default AlertBanner
