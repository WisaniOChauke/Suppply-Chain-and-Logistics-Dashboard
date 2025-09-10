import { ShipmentsList } from '@/components/shipments/shipments-list'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { KPICards } from '@/components/dashboard/kpi-cards'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-6 space-y-6">
        <KPICards />
        <ShipmentsList />
      </main>
    </div>
  )
}