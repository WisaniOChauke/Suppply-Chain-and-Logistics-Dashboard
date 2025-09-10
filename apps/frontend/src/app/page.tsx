import { ShipmentsList } from '@/components/shipments/shipments-list'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { KPICards } from '@/components/dashboard/kpi-cards'
import { DashboardCharts } from '@/components/dashboard/dashboard-charts'
import { RecentActivity } from '@/components/dashboard/recent-activity'
import { QuickActions } from '@/components/dashboard/quick-actions'
import { GlobalOverview } from '@/components/dashboard/global-overview'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-6 space-y-6">
        <KPICards />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <DashboardCharts />
            <ShipmentsList />
          </div>
          
          <div className="space-y-6">
            <QuickActions />
            <GlobalOverview />
            <RecentActivity />
          </div>
        </div>
      </main>
    </div>
  )
}