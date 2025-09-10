'use client'

import { EnhancedCustomerDashboard } from '@/components/portal/enhanced-customer-dashboard'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Home, BarChart3, Package, Users, Settings, User, Palette, LogOut, Shield, HelpCircle } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import Link from 'next/link'

export default function CustomerPortalPage() {
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
                <h1 className="text-2xl font-bold text-foreground">Customer Portal</h1>
                <p className="text-muted-foreground">Track your orders and delivery status</p>
              </div>
            </div>
            
            <nav className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/map" className="flex items-center">
                  <Package className="h-4 w-4 mr-2" />
                  Live Map
                </Link>
              </Button>
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
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 mb-2">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">Customer User</p>
                      <p className="text-xs text-muted-foreground truncate">customer@company.com</p>
                    </div>
                  </div>
                  
                  <DropdownMenuSeparator className="my-2" />
                  
                  <div className="space-y-1">
                    <div className="px-2 py-1.5">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Appearance</p>
                    </div>
                    <DropdownMenuItem className="flex items-center justify-between p-2 rounded-md">
                      <div className="flex items-center gap-2">
                        <Palette className="h-4 w-4" />
                        <span className="text-sm">Theme</span>
                      </div>
                    </DropdownMenuItem>
                  </div>
                  
                  <DropdownMenuSeparator className="my-2" />
                  
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
                  
                  <DropdownMenuItem className="p-2 rounded-md cursor-pointer text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950 dark:hover:text-red-400">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span className="text-sm font-medium">Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>
          </div>
        </div>
      </header>
      <EnhancedCustomerDashboard />
    </div>
  )
}