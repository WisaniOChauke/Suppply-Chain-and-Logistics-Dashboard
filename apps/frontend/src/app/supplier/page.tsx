'use client'

import { EnhancedSupplierDashboard } from '@/components/portal/enhanced-supplier-dashboard'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Home, BarChart3, Package, Users, Settings } from 'lucide-react'
import Link from 'next/link'

export default function SupplierPortalPage() {
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
                <h1 className="text-2xl font-bold text-foreground">Supplier Portal</h1>
                <p className="text-muted-foreground">Track your shipments and performance metrics</p>
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
                <Link href="/customer" className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  Customer Portal
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/settings" className="flex items-center">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>
      <EnhancedSupplierDashboard />
    </div>
  )
}