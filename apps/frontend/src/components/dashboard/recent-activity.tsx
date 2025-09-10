'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Activity, CheckCircle, AlertTriangle, Clock, MapPin, Truck, Ship, Plane } from 'lucide-react'
import Link from 'next/link'

function Badge({ children, variant = 'default', className = '' }: { children: React.ReactNode, variant?: 'default' | 'secondary' | 'outline' | 'destructive', className?: string }) {
  const baseClasses = 'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium'
  const variantClasses = {
    default: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    outline: 'border border-input bg-background',
    destructive: 'bg-destructive text-destructive-foreground'
  }
  
  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  )
}

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: 'delivery',
      title: 'Shipment Delivered',
      description: 'PO-2024-156 delivered to Cape Town',
      time: '2 minutes ago',
      icon: CheckCircle,
      color: 'text-green-600',
      badge: 'Delivered'
    },
    {
      id: 2,
      type: 'update',
      title: 'Location Update',
      description: 'PO-2024-145 passed through Suez Canal',
      time: '15 minutes ago',
      icon: MapPin,
      color: 'text-blue-600',
      badge: 'In Transit'
    },
    {
      id: 3,
      type: 'exception',
      title: 'Delay Alert',
      description: 'PO-2024-134 delayed due to weather',
      time: '1 hour ago',
      icon: AlertTriangle,
      color: 'text-red-600',
      badge: 'Exception'
    },
    {
      id: 4,
      type: 'departure',
      title: 'Shipment Departed',
      description: 'PO-2024-167 left Lagos Port',
      time: '2 hours ago',
      icon: Ship,
      color: 'text-orange-600',
      badge: 'Departed'
    },
    {
      id: 5,
      type: 'arrival',
      title: 'Port Arrival',
      description: 'PO-2024-123 arrived at Durban',
      time: '3 hours ago',
      icon: Truck,
      color: 'text-purple-600',
      badge: 'Arrived'
    },
    {
      id: 6,
      type: 'customs',
      title: 'Customs Cleared',
      description: 'PO-2024-189 cleared at Johannesburg',
      time: '4 hours ago',
      icon: CheckCircle,
      color: 'text-green-600',
      badge: 'Cleared'
    }
  ]

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case 'delivery': return 'default'
      case 'exception': return 'destructive'
      case 'update': return 'secondary'
      default: return 'outline'
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Activity className="h-5 w-5 mr-2" />
            Recent Activity
          </CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/activity">View All</Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-80 overflow-y-auto">
          {activities.map((activity) => {
            const Icon = activity.icon
            return (
              <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center ${activity.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium truncate">{activity.title}</p>
                    <Badge variant={getBadgeVariant(activity.type)}>
                      {activity.badge}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
                  <p className="text-xs text-muted-foreground mt-2 flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {activity.time}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
        
        {/* Activity Summary */}
        <div className="mt-4 pt-4 border-t">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-lg font-bold text-green-600">12</p>
              <p className="text-xs text-muted-foreground">Delivered Today</p>
            </div>
            <div>
              <p className="text-lg font-bold text-blue-600">45</p>
              <p className="text-xs text-muted-foreground">In Transit</p>
            </div>
            <div>
              <p className="text-lg font-bold text-red-600">3</p>
              <p className="text-xs text-muted-foreground">Exceptions</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}