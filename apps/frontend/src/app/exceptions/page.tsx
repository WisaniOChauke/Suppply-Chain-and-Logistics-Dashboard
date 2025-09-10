import { ExceptionsWorkQueue } from '@/components/exceptions/exceptions-work-queue'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'

export default function ExceptionsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Exception Management</h1>
          <p className="text-muted-foreground">Manage and resolve shipment exceptions</p>
        </div>
        <ExceptionsWorkQueue />
      </main>
    </div>
  )
}