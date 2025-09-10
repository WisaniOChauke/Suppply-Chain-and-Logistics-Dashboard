import { CarrierTracking } from '@/components/integrations/carrier-tracking'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'

export default function IntegrationsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">API Integrations</h1>
          <p className="text-muted-foreground">External service integrations and tracking</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CarrierTracking />
          
          <div className="space-y-6">
            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold mb-2">Weather Integration</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Real-time weather data along shipping routes
              </p>
              <div className="text-xs text-muted-foreground">
                Status: Connected • Last update: 2 minutes ago
              </div>
            </div>
            
            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold mb-2">Customs API</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Automated customs documentation and clearance
              </p>
              <div className="text-xs text-muted-foreground">
                Status: Connected • Processing: 15 documents
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}