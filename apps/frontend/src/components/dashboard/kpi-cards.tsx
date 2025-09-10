import { TrendingUp, TrendingDown, Clock, AlertTriangle, DollarSign, Globe, Ship, Truck } from 'lucide-react'
import Link from 'next/link'

const kpis = [
  {
    title: 'On-Time Delivery',
    value: '94.2%',
    change: '+2.1%',
    trend: 'up',
    icon: TrendingUp,
    href: null,
    description: 'Global average'
  },
  {
    title: 'Active Shipments',
    value: '1,247',
    change: '+12',
    trend: 'up',
    icon: Clock,
    href: null,
    description: '89 from Africa'
  },
  {
    title: 'Total Value',
    value: '$2.4M',
    change: '+8.5%',
    trend: 'up',
    icon: DollarSign,
    href: null,
    description: 'This month'
  },
  {
    title: 'Exceptions',
    value: '23',
    change: '+5',
    trend: 'up',
    icon: AlertTriangle,
    href: '/exceptions',
    description: 'Need attention'
  },
  {
    title: 'Global Routes',
    value: '156',
    change: '+8',
    trend: 'up',
    icon: Globe,
    href: '/map',
    description: '45 countries'
  },
  {
    title: 'Ocean Freight',
    value: '89',
    change: '+3',
    trend: 'up',
    icon: Ship,
    href: null,
    description: '45% of total'
  },
  {
    title: 'Avg Transit',
    value: '18.5d',
    change: '-1.2d',
    trend: 'down',
    icon: TrendingDown,
    href: null,
    description: 'Improved efficiency'
  },
  {
    title: 'Land Transport',
    value: '41',
    change: '+7',
    trend: 'up',
    icon: Truck,
    href: null,
    description: '21% of total'
  },
]

export function KPICards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
      {kpis.map((kpi) => {
        const Icon = kpi.icon
        const isPositive = kpi.trend === 'up' && !kpi.title.includes('Exception')
        
        const CardContent = (
          <>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground">{kpi.title}</p>
                <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{kpi.description}</p>
              </div>
              <Icon className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="mt-4 flex items-center">
              <span className={`text-sm font-medium ${
                isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                {kpi.change}
              </span>
              <span className="text-sm text-muted-foreground ml-2">vs last week</span>
            </div>
          </>
        )

        return (
          <div key={kpi.title} className="bg-card rounded-lg border p-4 hover:bg-muted/50 transition-colors hover:shadow-md">
            {kpi.href ? (
              <Link href={kpi.href} className="block">
                {CardContent}
              </Link>
            ) : (
              CardContent
            )}
          </div>
        )
      })}
    </div>
  )
}