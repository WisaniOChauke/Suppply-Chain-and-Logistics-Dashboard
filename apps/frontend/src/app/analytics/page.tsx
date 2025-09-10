import { PredictiveAnalytics } from '@/components/analytics/predictive-analytics'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Predictive Analytics</h1>
          <p className="text-muted-foreground">ETA forecasting and risk assessment insights</p>
        </div>
        <PredictiveAnalytics />
      </main>
    </div>
  )
}