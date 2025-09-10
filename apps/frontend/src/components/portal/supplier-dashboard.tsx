'use client'

import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Truck, Package, TrendingUp, Clock, Plus, Search, Filter, Download, Eye, MapPin, Calendar, BarChart3 } from 'lucide-react'
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

export function SupplierDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const { data: dashboard } = useQuery({
    queryKey: ['supplier-dashboard'],
    queryFn: () => fetch(`${process.env.NEXT_PUBLIC_API_URL}/portal/supplier/demo-tenant/dashboard`).then(r => r.json()),
  })

  const mockData = {
    totalShipments: 1247,
    activeShipments: 89,
    onTimeDelivery: 94.2,
    avgTransitTime: '18.5 days',
    shipments: [
      { id: 'SH-001', orderNumber: 'PO-2024-001', status: 'IN_TRANSIT', destination: 'Los Angeles', estimatedDelivery: '2024-01-15', value: '$12,450' },
      { id: 'SH-002', orderNumber: 'PO-2024-002', status: 'DELIVERED', destination: 'New York', estimatedDelivery: '2024-01-10', value: '$8,750' },
      { id: 'SH-003', orderNumber: 'PO-2024-003', status: 'PENDING', destination: 'Chicago', estimatedDelivery: '2024-01-20', value: '$15,200' },
      { id: 'SH-004', orderNumber: 'PO-2024-004', status: 'IN_TRANSIT', destination: 'Miami', estimatedDelivery: '2024-01-18', value: '$9,800' },
    ],
    recentOrders: [
      { id: 'ORD-001', customer: 'Acme Corp', items: 45, value: '$23,400', status: 'PROCESSING' },
      { id: 'ORD-002', customer: 'Global Inc', items: 32, value: '$18,900', status: 'SHIPPED' },
    ],
    performance: {
      thisMonth: { delivered: 156, onTime: 148, delayed: 8 },
      lastMonth: { delivered: 142, onTime: 134, delayed: 8 }
    }
  }

  const displayData = dashboard || mockData

  return (
    <main className="container mx-auto px-4 py-6">
      {/* Navigation Tabs */}
      <div className="flex space-x-1 mb-6 bg-muted p-1 rounded-lg w-fit">
        {[
          { id: 'overview', label: 'Overview', icon: BarChart3 },
          { id: 'shipments', label: 'Shipments', icon: Truck },
          { id: 'orders', label: 'Orders', icon: Package },
          { id: 'performance', label: 'Performance', icon: TrendingUp }
        ].map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className="h-4 w-4 mr-2" />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Package className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-2xl font-bold">{displayData.totalShipments}</p>
                    <p className="text-sm text-muted-foreground">Total Shipments</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Truck className="h-5 w-5 text-orange-600" />
                  <div>
                    <p className="text-2xl font-bold">{displayData.activeShipments}</p>
                    <p className="text-sm text-muted-foreground">Active Shipments</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-2xl font-bold">{displayData.onTimeDelivery}%</p>
                    <p className="text-sm text-muted-foreground">On-Time Delivery</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="text-2xl font-bold">{displayData.avgTransitTime}</p>
                    <p className="text-sm text-muted-foreground">Avg Transit Time</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Shipments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {displayData.shipments.slice(0, 3).map((shipment: any) => (
                    <div key={shipment.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex-1">
                        <p className="font-medium">{shipment.orderNumber}</p>
                        <p className="text-sm text-muted-foreground flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {shipment.destination}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant={shipment.status === 'DELIVERED' ? 'default' : shipment.status === 'IN_TRANSIT' ? 'secondary' : 'outline'}>
                          {shipment.status}
                        </Badge>
                        <p className="text-sm text-muted-foreground mt-1">{shipment.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {displayData.recentOrders.map((order: any) => (
                    <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div>
                        <p className="font-medium">{order.customer}</p>
                        <p className="text-sm text-muted-foreground">{order.items} items</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{order.value}</p>
                        <Badge variant="outline">{order.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {/* Shipments Tab */}
      {activeTab === 'shipments' && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>All Shipments</CardTitle>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  New Shipment
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {displayData.shipments.map((shipment: any) => (
                <div key={shipment.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div>
                        <p className="font-medium">{shipment.orderNumber}</p>
                        <p className="text-sm text-muted-foreground flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {shipment.destination}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {shipment.estimatedDelivery}
                      </p>
                      <p className="font-medium">{shipment.value}</p>
                    </div>
                    <Badge variant={shipment.status === 'DELIVERED' ? 'default' : shipment.status === 'IN_TRANSIT' ? 'secondary' : 'outline'}>
                      {shipment.status}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Order Management</CardTitle>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Create Order
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {displayData.recentOrders.map((order: any) => (
                <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.customer} • {order.items} items</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <p className="font-medium">{order.value}</p>
                    <Badge variant="outline">{order.status}</Badge>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Performance Tab */}
      {activeTab === 'performance' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>This Month Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Total Delivered</span>
                  <span className="font-bold">{displayData.performance.thisMonth.delivered}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>On Time</span>
                  <span className="font-bold text-green-600">{displayData.performance.thisMonth.onTime}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Delayed</span>
                  <span className="font-bold text-red-600">{displayData.performance.thisMonth.delayed}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Last Month Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Total Delivered</span>
                  <span className="font-bold">{displayData.performance.lastMonth.delivered}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>On Time</span>
                  <span className="font-bold text-green-600">{displayData.performance.lastMonth.onTime}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Delayed</span>
                  <span className="font-bold text-red-600">{displayData.performance.lastMonth.delayed}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </main>
  )
}