'use client'

import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { useAuth } from '@/hooks/use-auth'
import { Search, Bell, User, LogOut, ArrowLeft, Settings } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function DashboardHeader() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {!isHomePage && (
              <>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => router.back()}
                  className="group hover:bg-muted/50 transition-all duration-200 hover:scale-105"
                >
                  <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-0.5 transition-transform" />
                  <span className="text-sm font-medium">Back</span>
                </Button>
                <div className="h-6 w-px bg-border" />
              </>
            )}
            <h1 className="text-2xl font-bold text-foreground">Supply Chain Dashboard</h1>
            <nav className="hidden md:flex space-x-4">
              <a href="/" className="text-sm text-muted-foreground hover:text-foreground">Dashboard</a>
              <a href="/map" className="text-sm text-muted-foreground hover:text-foreground">Live Map</a>
              <a href="/exceptions" className="text-sm text-muted-foreground hover:text-foreground">Exceptions</a>
              <a href="/analytics" className="text-sm text-muted-foreground hover:text-foreground">Analytics</a>
              <a href="/integrations" className="text-sm text-muted-foreground hover:text-foreground">Integrations</a>
              <a href="/supplier" className="text-sm text-muted-foreground hover:text-foreground">Supplier</a>
              <a href="/customer" className="text-sm text-muted-foreground hover:text-foreground">Customer</a>
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem className="flex items-center justify-between">
                  <span>Theme</span>
                  <ThemeToggle />
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {user ? (
                  <>
                    <DropdownMenuItem disabled>
                      <User className="mr-2 h-4 w-4" />
                      <span>{user.name}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign out</span>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Sign in</span>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}