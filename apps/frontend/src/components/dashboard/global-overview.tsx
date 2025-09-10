'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Globe, Truck, Ship, Plane, MapPin } from 'lucide-react'

function Badge({ children, variant = 'default', className = '' }: { children: React.ReactNode, variant?: 'default' | 'secondary' | 'outline', className?: string }) {
  const baseClasses = 'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium'
  const variantClasses = {
    default: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    outline: 'border border-input bg-background'
  }
  
  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  )
}

export function GlobalOverview() {
  const globalStats = {
    activeRoutes: 156,
    countries: 45,
    ports: 89,
    totalValue: '$2.4M'
  }

  const transportModes = [
    { mode: 'Ocean', count: 89, percentage: 45, icon: Ship, color: 'text-blue-600' },
    { mode: 'Air', count: 67, percentage: 34, icon: Plane, color: 'text-green-600' },
    { mode: 'Truck', count: 41, percentage: 21, icon: Truck, color: 'text-orange-600' }
  ]

  const topRoutes = [
    { route: 'Shanghai → Los Angeles', shipments: 23, status: 'active' },
    { route: 'Rotterdam → New York', shipments: 18, status: 'active' },
    { route: 'Cape Town → Hamburg', shipments: 15, status: 'active' },
    { route: 'Dubai → London', shipments: 12, status: 'delayed' },
    { route: 'Singapore → Sydney', shipments: 10, status: 'active' }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Globe className="h-5 w-5 mr-2" />
          Global Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Global Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{globalStats.activeRoutes}</p>
            <p className="text-xs text-muted-foreground">Active Routes</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{globalStats.countries}</p>
            <p className="text-xs text-muted-foreground">Countries</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{globalStats.ports}</p>
            <p className="text-xs text-muted-foreground">Ports</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{globalStats.totalValue}</p>
            <p className="text-xs text-muted-foreground">Total Value</p>
          </div>
        </div>

        {/* Transport Modes */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Transport Modes</h4>
          {transportModes.map((transport) => {
            const Icon = transport.icon
            return (
              <div key={transport.mode} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon className={`h-4 w-4 ${transport.color}`} />
                  <span className="text-sm">{transport.mode}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">{transport.count}</span>
                  <Badge variant="outline">{transport.percentage}%</Badge>
                </div>
              </div>
            )
          })}
        </div>

        {/* Top Routes */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Top Routes</h4>
          <div className="space-y-2">
            {topRoutes.map((route, index) => (
              <div key={route.route} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xs font-medium">{index + 1}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{route.route}</p>
                    <p className="text-xs text-muted-foreground">{route.shipments} shipments</p>
                  </div>
                </div>
                <Badge variant={route.status === 'active' ? 'secondary' : 'outline'}>
                  {route.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}