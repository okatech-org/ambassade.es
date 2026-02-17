import { useTranslation } from 'react-i18next'
import { Users, Globe, Shield, Clock } from 'lucide-react'

const stats = [
  {
    icon: Users,
    valueKey: 'statsBar.diaspora.value',
    labelKey: 'statsBar.diaspora.label',
    defaultValue: '30 000+',
    defaultLabel: 'Gabonais en France',
    color: 'text-green-500',
  },
  {
    icon: Globe,
    valueKey: 'statsBar.services.value',
    labelKey: 'statsBar.services.label',
    defaultValue: '9',
    defaultLabel: 'Catégories de services',
    color: 'text-blue-500',
  },
  {
    icon: Shield,
    valueKey: 'statsBar.protection.value',
    labelKey: 'statsBar.protection.label',
    defaultValue: '24/7',
    defaultLabel: 'Assistance consulaire',
    color: 'text-yellow-500',
  },
  {
    icon: Clock,
    valueKey: 'statsBar.horaires.value',
    labelKey: 'statsBar.horaires.label',
    defaultValue: 'Lun-Ven',
    defaultLabel: '9h00 - 16h00',
    color: 'text-purple-500',
  },
]

export function StatsBar() {
  const { t } = useTranslation()

  return (
    <section className="py-10 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat) => (
            <div key={stat.valueKey} className="flex items-center gap-4">
              <div className={`p-3 rounded-xl bg-muted/50 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground leading-tight">
                  {t(stat.valueKey, stat.defaultValue)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t(stat.labelKey, stat.defaultLabel)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsBar
