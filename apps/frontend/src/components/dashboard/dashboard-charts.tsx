'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BarChart3, TrendingUp, Calendar, Filter } from 'lucide-react'
import { useState } from 'react'

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

export function DashboardCharts() {
  const [timeRange, setTimeRange] = useState('7d')

  const shipmentData = [
    { day: 'Mon', delivered: 45, inTransit: 23, exceptions: 2 },
    { day: 'Tue', delivered: 52, inTransit: 28, exceptions: 1 },
    { day: 'Wed', delivered: 38, inTransit: 31, exceptions: 4 },
    { day: 'Thu', delivered: 61, inTransit: 25, exceptions: 3 },
    { day: 'Fri', delivered: 55, inTransit: 29, exceptions: 2 },
    { day: 'Sat', delivered: 42, inTransit: 18, exceptions: 1 },
    { day: 'Sun', delivered: 48, inTransit: 22, exceptions: 2 }
  ]

  const performanceMetrics = [
    { region: 'North America', onTime: 96, total: 450, trend: '+2.1%' },
    { region: 'Europe', onTime: 94, total: 380, trend: '+1.8%' },
    { region: 'Asia Pacific', onTime: 92, total: 520, trend: '-0.5%' },
    { region: 'Africa', onTime: 89, total: 180, trend: '+4.2%' },
    { region: 'South America', onTime: 91, total: 220, trend: '+1.2%' }
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Shipment Volume Chart */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Shipment Volume
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Button 
                variant={timeRange === '7d' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setTimeRange('7d')}
              >
                7D
              </Button>
              <Button 
                variant={timeRange === '30d' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setTimeRange('30d')}
              >
                30D
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Chart Legend */}
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                <span>Delivered</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                <span>In Transit</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
                <span>Exceptions</span>
              </div>
            </div>
            
            {/* Mock Bar Chart */}
            <div className="h-48 flex items-end justify-between space-x-2">
              {shipmentData.map((data, index) => (
                <div key={data.day} className="flex-1 flex flex-col items-center space-y-1">
                  <div className="w-full flex flex-col space-y-1">
                    <div 
                      className="bg-green-500 rounded-t" 
                      style={{ height: `${(data.delivered / 70) * 120}px` }}
                    ></div>
                    <div 
                      className="bg-blue-500" 
                      style={{ height: `${(data.inTransit / 70) * 120}px` }}
                    ></div>
                    <div 
                      className="bg-red-500 rounded-b" 
                      style={{ height: `${(data.exceptions / 70) * 120}px` }}
                    ></div>
                  </div>
                  <span className="text-xs text-muted-foreground">{data.day}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Regional Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Regional Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {performanceMetrics.map((metric) => (
              <div key={metric.region} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{metric.region}</span>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{metric.onTime}%</Badge>
                    <span className="text-xs text-green-600">{metric.trend}</span>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all" 
                    style={{ width: `${metric.onTime}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{metric.onTime} on-time</span>
                  <span>{metric.total} total</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}