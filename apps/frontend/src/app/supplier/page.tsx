import { SupplierDashboard } from '@/components/portal/supplier-dashboard'

export default function SupplierPortalPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-foreground">Supplier Portal</h1>
          <p className="text-muted-foreground">Track your shipments and performance metrics</p>
        </div>
      </header>
      <SupplierDashboard />
    </div>
  )
}