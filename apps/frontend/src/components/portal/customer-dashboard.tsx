'use client'

import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Truck, CheckCircle, AlertTriangle, Plus, Search, Filter, Download, Eye, MapPin, Calendar, BarChart3, Star, CreditCard, Bell, MessageSquare } from 'lucide-react'
import { useState } from 'react'

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

export function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const { data: dashboard } = useQuery({
    queryKey: ['customer-dashboard'],
    queryFn: () => fetch(`${process.env.NEXT_PUBLIC_API_URL}/portal/customer/demo-tenant/dashboard`).then(r => r.json()),
  })

  const mockData = {
    totalOrders: 156,
    inTransit: 23,
    delivered: 128,
    exceptions: 5,
    totalSpent: '$45,230',
    avgDeliveryTime: '3.2 days',
    orders: [
      { id: 'ORD-001', orderNumber: 'ORD-2024-001', status: 'IN_TRANSIT', eta: '2024-01-25', value: '$1,250', items: 5, supplier: 'Acme Corp' },
      { id: 'ORD-002', orderNumber: 'ORD-2024-002', status: 'DELIVERED', eta: '2024-01-20', value: '$890', items: 3, supplier: 'Global Inc' },
      { id: 'ORD-003', orderNumber: 'ORD-2024-003', status: 'PROCESSING', eta: '2024-01-28', value: '$2,100', items: 8, supplier: 'Tech Solutions' },
      { id: 'ORD-004', orderNumber: 'ORD-2024-004', status: 'EXCEPTION', eta: '2024-01-22', value: '$750', items: 2, supplier: 'Fast Logistics' },
    ],
    recentActivity: [
      { id: 1, type: 'delivery', message: 'Order ORD-2024-002 delivered successfully', time: '2 hours ago' },
      { id: 2, type: 'update', message: 'Order ORD-2024-001 location updated', time: '4 hours ago' },
      { id: 3, type: 'exception', message: 'Delay reported for Order ORD-2024-004', time: '6 hours ago' },
    ],
    favoriteSuppliers: [
      { id: 1, name: 'Acme Corp', rating: 4.8, orders: 45, onTime: 96 },
      { id: 2, name: 'Global Inc', rating: 4.6, orders: 32, onTime: 94 },
      { id: 3, name: 'Tech Solutions', rating: 4.9, orders: 28, onTime: 98 },
    ],
    monthlySpending: {
      thisMonth: '$8,450',
      lastMonth: '$7,230',
      change: '+16.9%'
    }
  }

  const displayData = dashboard || mockData

  return (
    <main className="container mx-auto px-4 py-6">
      {/* Navigation Tabs */}
      <div className="flex space-x-1 mb-6 bg-muted p-1 rounded-lg w-fit">
        {[
          { id: 'overview', label: 'Overview', icon: BarChart3 },
          { id: 'orders', label: 'My Orders', icon: ShoppingCart },
          { id: 'tracking', label: 'Track Orders', icon: Truck },
          { id: 'suppliers', label: 'Suppliers', icon: Star },
          { id: 'billing', label: 'Billing', icon: CreditCard }
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
                  <ShoppingCart className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-2xl font-bold">{displayData.totalOrders}</p>
                    <p className="text-sm text-muted-foreground">Total Orders</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Truck className="h-5 w-5 text-orange-600" />
                  <div>
                    <p className="text-2xl font-bold">{displayData.inTransit}</p>
                    <p className="text-sm text-muted-foreground">In Transit</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-2xl font-bold">{displayData.delivered}</p>
                    <p className="text-sm text-muted-foreground">Delivered</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <div>
                    <p className="text-2xl font-bold">{displayData.exceptions}</p>
                    <p className="text-sm text-muted-foreground">Exceptions</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {displayData.orders.slice(0, 3).map((order: any) => (
                    <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex-1">
                        <p className="font-medium">{order.orderNumber}</p>
                        <p className="text-sm text-muted-foreground">{order.supplier} • {order.items} items</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={
                          order.status === 'DELIVERED' ? 'default' : 
                          order.status === 'IN_TRANSIT' ? 'secondary' : 
                          order.status === 'EXCEPTION' ? 'destructive' : 'outline'
                        }>
                          {order.status}
                        </Badge>
                        <p className="text-sm text-muted-foreground mt-1">{order.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {displayData.recentActivity.map((activity: any) => (
                    <div key={activity.id} className="flex items-start space-x-3 p-2">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        activity.type === 'delivery' ? 'bg-green-500' :
                        activity.type === 'update' ? 'bg-blue-500' : 'bg-red-500'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm">{activity.message}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Spending</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-2xl font-bold">{displayData.monthlySpending.thisMonth}</p>
                    <p className="text-sm text-muted-foreground">This Month</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Last Month</span>
                    <span className="text-sm">{displayData.monthlySpending.lastMonth}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Change</span>
                    <span className="text-sm text-green-600 font-medium">{displayData.monthlySpending.change}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>All Orders</CardTitle>
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
                  New Order
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {displayData.orders.map((order: any) => (
                <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div>
                        <p className="font-medium">{order.orderNumber}</p>
                        <p className="text-sm text-muted-foreground">{order.supplier} • {order.items} items</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        ETA: {order.eta}
                      </p>
                      <p className="font-medium">{order.value}</p>
                    </div>
                    <Badge variant={
                      order.status === 'DELIVERED' ? 'default' : 
                      order.status === 'IN_TRANSIT' ? 'secondary' : 
                      order.status === 'EXCEPTION' ? 'destructive' : 'outline'
                    }>
                      {order.status}
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

      {/* Tracking Tab */}
      {activeTab === 'tracking' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Track Your Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4 mb-6">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Enter order number or tracking ID..."
                    className="w-full px-4 py-2 border border-input rounded-md bg-background"
                  />
                </div>
                <Button>
                  <Search className="h-4 w-4 mr-2" />
                  Track
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {displayData.orders.filter((order: any) => order.status === 'IN_TRANSIT').map((order: any) => (
              <Card key={order.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{order.orderNumber}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Status</span>
                      <Badge variant="secondary">{order.status}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>ETA</span>
                      <span className="font-medium">{order.eta}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Supplier</span>
                      <span>{order.supplier}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                    <p className="text-sm text-muted-foreground">65% Complete - Currently in transit</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Suppliers Tab */}
      {activeTab === 'suppliers' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Favorite Suppliers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {displayData.favoriteSuppliers.map((supplier: any) => (
                  <Card key={supplier.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{supplier.name}</h3>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 mr-1" />
                            <span className="text-sm">{supplier.rating}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Orders</span>
                            <span>{supplier.orders}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>On-Time Rate</span>
                            <span className="text-green-600">{supplier.onTime}%</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="w-full">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Contact
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Billing Tab */}
      {activeTab === 'billing' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Total Spent</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{displayData.totalSpent}</p>
                <p className="text-sm text-muted-foreground">All time</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{displayData.monthlySpending.thisMonth}</p>
                <p className="text-sm text-green-600">{displayData.monthlySpending.change} vs last month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Avg Order Value</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">$290</p>
                <p className="text-sm text-muted-foreground">Based on recent orders</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Invoices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {displayData.orders.slice(0, 5).map((order: any) => (
                  <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{order.orderNumber}</p>
                      <p className="text-sm text-muted-foreground">{order.supplier}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{order.value}</p>
                      <Badge variant="outline">Paid</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </main>
  )
}