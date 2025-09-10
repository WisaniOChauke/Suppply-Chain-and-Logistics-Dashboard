import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { Search, Bell, User } from 'lucide-react'

export function DashboardHeader() {
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-foreground">Supply Chain Dashboard</h1>
            <nav className="hidden md:flex space-x-4">
              <a href="/" className="text-sm text-muted-foreground hover:text-foreground">Dashboard</a>
              <a href="/map" className="text-sm text-muted-foreground hover:text-foreground">Live Map</a>
              <a href="/exceptions" className="text-sm text-muted-foreground hover:text-foreground">Exceptions</a>
              <a href="/analytics" className="text-sm text-muted-foreground hover:text-foreground">Analytics</a>
              <a href="/supplier" className="text-sm text-muted-foreground hover:text-foreground">Supplier</a>
              <a href="/customer" className="text-sm text-muted-foreground hover:text-foreground">Customer</a>
              <a href="/settings" className="text-sm text-muted-foreground hover:text-foreground">Settings</a>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search shipments..."
                className="w-64 pl-10 pr-4 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
            <Button variant="ghost" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <ThemeToggle />
            <Button variant="ghost" size="icon">
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}