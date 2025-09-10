import { CustomerDashboard } from '@/components/portal/customer-dashboard'

export default function CustomerPortalPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-foreground">Customer Portal</h1>
          <p className="text-muted-foreground">Track your orders and delivery status</p>
        </div>
      </header>
      <CustomerDashboard />
    </div>
  )
}