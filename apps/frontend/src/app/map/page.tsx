'use client'

import { LiveMap } from '@/components/map/live-map'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Home, BarChart3, Users, Settings, Palette, Shield, HelpCircle, User, LogOut } from 'lucide-react'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { useAuth } from '@/hooks/use-auth'

export default function MapPage() {
  const { user, logout } = useAuth()
  
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/" className="flex items-center">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
              <div className="h-6 w-px bg-border" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">Live Map</h1>
                <p className="text-muted-foreground">Real-time shipment tracking across global routes</p>
              </div>
            </div>
            
            <nav className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/analytics" className="flex items-center">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Analytics
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/supplier" className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  Supplier Portal
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/customer" className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  Customer Portal
                </Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem className="flex items-center justify-between">
                    <span>Theme</span>
                    <ThemeToggle />
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Shield className="mr-2 h-4 w-4" />
                    <span>Privacy & Security</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <HelpCircle className="mr-2 h-4 w-4" />
                    <span>Help & Support</span>
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
            </nav>
          </div>
        </div>
      </header>
      <LiveMap />
    </div>
  )
}