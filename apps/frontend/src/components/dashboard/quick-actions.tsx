'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Search, FileText, AlertTriangle, Map, BarChart3, Users, Package } from 'lucide-react'
import Link from 'next/link'

export function QuickActions() {
  const actions = [
    {
      title: 'Create Shipment',
      description: 'Add new shipment',
      icon: Plus,
      href: '/shipments/new',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'Track Shipment',
      description: 'Search & track',
      icon: Search,
      href: '/track',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      title: 'View Reports',
      description: 'Analytics & insights',
      icon: FileText,
      href: '/analytics',
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      title: 'Handle Exceptions',
      description: 'Resolve issues',
      icon: AlertTriangle,
      href: '/exceptions',
      color: 'bg-red-500 hover:bg-red-600'
    },
    {
      title: 'Live Map',
      description: 'Global tracking',
      icon: Map,
      href: '/map',
      color: 'bg-orange-500 hover:bg-orange-600'
    },
    {
      title: 'Supplier Portal',
      description: 'Manage suppliers',
      icon: Users,
      href: '/supplier',
      color: 'bg-indigo-500 hover:bg-indigo-600'
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action) => {
            const Icon = action.icon
            return (
              <Button
                key={action.title}
                variant="outline"
                className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-muted/50"
                asChild
              >
                <Link href={action.href}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${action.color}`}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">{action.title}</p>
                    <p className="text-xs text-muted-foreground">{action.description}</p>
                  </div>
                </Link>
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}