import { SettingsPanel } from '@/components/settings/settings-panel'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage your preferences and application settings</p>
        </div>
        <SettingsPanel />
      </main>
    </div>
  )
}