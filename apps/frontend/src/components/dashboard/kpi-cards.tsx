import { TrendingUp, TrendingDown, Clock, AlertTriangle } from 'lucide-react'

const kpis = [
  {
    title: 'On-Time Delivery',
    value: '94.2%',
    change: '+2.1%',
    trend: 'up',
    icon: TrendingUp,
  },
  {
    title: 'Active Shipments',
    value: '1,247',
    change: '+12',
    trend: 'up',
    icon: Clock,
  },
  {
    title: 'Avg Dwell Time',
    value: '18.5h',
    change: '-1.2h',
    trend: 'down',
    icon: TrendingDown,
  },
  {
    title: 'Exceptions',
    value: '23',
    change: '+5',
    trend: 'up',
    icon: AlertTriangle,
  },
]

export function KPICards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpis.map((kpi) => {
        const Icon = kpi.icon
        const isPositive = kpi.trend === 'up' && !kpi.title.includes('Exception')
        
        return (
          <div key={kpi.title} className="bg-card rounded-lg border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{kpi.title}</p>
                <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
              </div>
              <Icon className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="mt-4 flex items-center">
              <span className={`text-sm font-medium ${
                isPositive ? 'text-status-success' : 'text-status-error'
              }`}>
                {kpi.change}
              </span>
              <span className="text-sm text-muted-foreground ml-2">vs last week</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}