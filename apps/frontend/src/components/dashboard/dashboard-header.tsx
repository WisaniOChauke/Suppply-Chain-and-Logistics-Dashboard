'use client'

import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { useAuth } from '@/hooks/use-auth'
import { Search, Bell, User, LogOut, ArrowLeft, Settings, Moon, Sun, Monitor, HelpCircle, Shield, Palette } from 'lucide-react'
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
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="relative hover:bg-muted/50 transition-all duration-200 hover:scale-105"
                >
                  <Settings className="h-4 w-4 transition-transform group-hover:rotate-90" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-72 p-2 bg-background/95 backdrop-blur-sm border shadow-lg"
                sideOffset={8}
              >
                {/* User Profile Section */}
                {user ? (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 mb-2">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{user.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 mb-2">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      <User className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">Guest User</p>
                      <p className="text-xs text-muted-foreground">Sign in to access features</p>
                    </div>
                  </div>
                )}
                
                <DropdownMenuSeparator className="my-2" />
                
                {/* Theme Selection */}
                <div className="space-y-1">
                  <div className="px-2 py-1.5">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Appearance</p>
                  </div>
                  <DropdownMenuItem className="flex items-center justify-between p-2 rounded-md">
                    <div className="flex items-center gap-2">
                      <Palette className="h-4 w-4" />
                      <span className="text-sm">Theme</span>
                    </div>
                    <ThemeToggle />
                  </DropdownMenuItem>
                </div>
                
                <DropdownMenuSeparator className="my-2" />
                
                {/* Quick Actions */}
                <div className="space-y-1">
                  <div className="px-2 py-1.5">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Quick Actions</p>
                  </div>
                  <DropdownMenuItem className="p-2 rounded-md cursor-pointer hover:bg-muted/50">
                    <Shield className="mr-2 h-4 w-4" />
                    <span className="text-sm">Privacy & Security</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="p-2 rounded-md cursor-pointer hover:bg-muted/50">
                    <HelpCircle className="mr-2 h-4 w-4" />
                    <span className="text-sm">Help & Support</span>
                  </DropdownMenuItem>
                </div>
                
                <DropdownMenuSeparator className="my-2" />
                
                {/* Account Actions */}
                {user ? (
                  <DropdownMenuItem 
                    onClick={logout}
                    className="p-2 rounded-md cursor-pointer text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950 dark:hover:text-red-400"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span className="text-sm font-medium">Sign out</span>
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem className="p-2 rounded-md cursor-pointer hover:bg-primary/5 text-primary">
                    <User className="mr-2 h-4 w-4" />
                    <span className="text-sm font-medium">Sign in</span>
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