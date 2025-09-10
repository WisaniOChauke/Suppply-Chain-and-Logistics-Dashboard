'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  Package, Truck, Star, DollarSign, Clock, MapPin, TrendingUp, 
  BarChart3, Users, Globe, AlertTriangle, Eye, Calendar, 
  Plus, Search, Filter, Download, Activity, Target, Award,
  CreditCard, FileText, Bell, Settings
} from 'lucide-react'

export function EnhancedCustomerDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <main className="container mx-auto px-4 py-6">
      {/* Enhanced Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="hover:shadow-md transition-shadow border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">23</div>
            <p className="text-xs text-muted-foreground">+5 from last week</p>
            <div className="flex items-center mt-2 text-xs">
              <MapPin className="h-3 w-3 mr-1" />
              <span>8 from African suppliers</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Spend</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">$1.2M</div>
            <p className="text-xs text-muted-foreground">-8% from last month</p>
            <div className="flex items-center mt-2 text-xs">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              <span>Cost optimization working</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delivery Issues</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">3</div>
            <p className="text-xs text-muted-foreground">2 delays, 1 damage</p>
            <div className="flex items-center mt-2 text-xs">
              <Clock className="h-3 w-3 mr-1" />
              <span>Avg resolution: 2.1 days</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Supplier Rating</CardTitle>
            <Star className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">4.6/5</div>
            <p className="text-xs text-muted-foreground">Average across suppliers</p>
            <Progress value={92} className="mt-2 h-2" />
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-blue-50">
              <Plus className="h-5 w-5 text-blue-600" />
              <span className="text-sm">Place Order</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-green-50">
              <Truck className="h-5 w-5 text-green-600" />
              <span className="text-sm">Track Shipments</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-orange-50">
              <Star className="h-5 w-5 text-orange-600" />
              <span className="text-sm">Rate Suppliers</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-purple-50">
              <FileText className="h-5 w-5 text-purple-600" />
              <span className="text-sm">View Reports</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 mb-6 bg-muted p-1 rounded-lg w-fit">
        {[
          { id: 'overview', label: 'Overview', icon: BarChart3 },
          { id: 'orders', label: 'Orders', icon: Package },
          { id: 'suppliers', label: 'Suppliers', icon: Users },
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

      {/* Enhanced Overview Tab */}
      {activeTab === 'overview' && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Recent Orders */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Order Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4 p-3 rounded-lg bg-green-50 border border-green-200">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Order ORD-2024-156 delivered from Lagos Supplier</p>
                    <p className="text-xs text-muted-foreground">45 minutes ago • $23,400 • Electronics</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Delivered</Badge>
                </div>
                <div className="flex items-center space-x-4 p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">New order placed with Casablanca Textiles</p>
                    <p className="text-xs text-muted-foreground">2 hours ago • $67,800 • Fabric materials</p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">Processing</Badge>
                </div>
                <div className="flex items-center space-x-4 p-3 rounded-lg bg-orange-50 border border-orange-200">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Delay notification for ORD-2024-148</p>
                    <p className="text-xs text-muted-foreground">4 hours ago • Cape Town route • Weather delay</p>
                  </div>
                  <Badge className="bg-orange-100 text-orange-800">Delayed</Badge>
                </div>
                <div className="flex items-center space-x-4 p-3 rounded-lg bg-purple-50 border border-purple-200">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Supplier rating updated for Durban Logistics</p>
                    <p className="text-xs text-muted-foreground">6 hours ago • Rated 5/5 stars</p>
                  </div>
                  <Badge className="bg-purple-100 text-purple-800">Rating</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Top Suppliers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Top Suppliers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div>
                      <p className="font-medium text-sm">Lagos Industrial Co.</p>
                      <p className="text-xs text-muted-foreground">12 orders this month</p>
                      <div className="flex items-center mt-1">
                        <Star className="h-3 w-3 mr-1 text-yellow-500 fill-current" />
                        <span className="text-xs">4.9/5</span>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Preferred</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div>
                      <p className="font-medium text-sm">Casablanca Textiles</p>
                      <p className="text-xs text-muted-foreground">8 orders this month</p>
                      <div className="flex items-center mt-1">
                        <Star className="h-3 w-3 mr-1 text-yellow-500 fill-current" />
                        <span className="text-xs">4.7/5</span>
                      </div>
                    </div>
                    <Badge variant="secondary">Active</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div>
                      <p className="font-medium text-sm">Durban Logistics</p>
                      <p className="text-xs text-muted-foreground">6 orders this month</p>
                      <div className="flex items-center mt-1">
                        <Star className="h-3 w-3 mr-1 text-yellow-500 fill-current" />
                        <span className="text-xs">4.5/5</span>
                      </div>
                    </div>
                    <Badge variant="outline">Growing</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Regional Sourcing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Africa</span>
                    <div className="flex items-center gap-2">
                      <Progress value={45} className="w-16 h-2" />
                      <span className="text-sm font-medium">45%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Europe</span>
                    <div className="flex items-center gap-2">
                      <Progress value={30} className="w-16 h-2" />
                      <span className="text-sm font-medium">30%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Asia</span>
                    <div className="flex items-center gap-2">
                      <Progress value={25} className="w-16 h-2" />
                      <span className="text-sm font-medium">25%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Cost Savings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">$180K</div>
                  <p className="text-sm text-muted-foreground mb-3">Saved this quarter</p>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Bulk discounts</span>
                      <span>$89K</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Route optimization</span>
                      <span>$56K</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Supplier negotiations</span>
                      <span>$35K</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  Service Quality
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">On-time Delivery</span>
                    <span className="text-sm font-medium text-green-600">94%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Quality Score</span>
                    <span className="text-sm font-medium text-blue-600">4.6/5</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Issue Resolution</span>
                    <span className="text-sm font-medium text-purple-600">2.1 days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Cost Efficiency</span>
                    <span className="text-sm font-medium text-orange-600">87%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {/* Enhanced Orders Tab */}
      {activeTab === 'orders' && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Order Management
              </CardTitle>
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
              {[
                { id: 'ORD-2024-156', supplier: 'Lagos Industrial Co.', status: 'DELIVERED', value: '$23,400', eta: '2024-01-15' },
                { id: 'ORD-2024-157', supplier: 'Casablanca Textiles', status: 'IN_TRANSIT', value: '$67,800', eta: '2024-01-18' },
                { id: 'ORD-2024-158', supplier: 'Durban Logistics', status: 'PROCESSING', value: '$45,200', eta: '2024-01-20' },
                { id: 'ORD-2024-159', supplier: 'Cairo Electronics', status: 'PENDING', value: '$89,600', eta: '2024-01-22' }
              ].map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div>
                        <p className="font-medium">{order.id}</p>
                        <p className="text-sm text-muted-foreground flex items-center">
                          <Users className="h-3 w-3 mr-1" />
                          {order.supplier}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {order.eta}
                      </p>
                      <p className="font-medium">{order.value}</p>
                    </div>
                    <Badge variant={order.status === 'DELIVERED' ? 'default' : order.status === 'IN_TRANSIT' ? 'secondary' : 'outline'}>
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

      {/* Enhanced Suppliers Tab */}
      {activeTab === 'suppliers' && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Supplier Directory
              </CardTitle>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Supplier
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: 'Lagos Industrial Co.', location: 'Lagos, Nigeria', rating: 4.9, orders: 12, performance: 98 },
                { name: 'Casablanca Textiles', location: 'Casablanca, Morocco', rating: 4.7, orders: 8, performance: 94 },
                { name: 'Durban Logistics', location: 'Durban, South Africa', rating: 4.5, orders: 6, performance: 91 },
                { name: 'Cairo Electronics', location: 'Cairo, Egypt', rating: 4.3, orders: 4, performance: 87 }
              ].map((supplier) => (
                <div key={supplier.name} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div>
                        <p className="font-medium">{supplier.name}</p>
                        <p className="text-sm text-muted-foreground flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {supplier.location}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-sm font-medium flex items-center">
                        <Star className="h-3 w-3 mr-1 text-yellow-500 fill-current" />
                        {supplier.rating}
                      </p>
                      <p className="text-xs text-muted-foreground">{supplier.orders} orders</p>
                    </div>
                    <div className="text-center">
                      <Progress value={supplier.performance} className="w-16 h-2 mb-1" />
                      <p className="text-xs text-muted-foreground">{supplier.performance}%</p>
                    </div>
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

      {/* Enhanced Billing Tab */}
      {activeTab === 'billing' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Monthly Spending
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span>Current Month</span>
                  <span className="font-bold text-blue-600">$1,234,567</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span>Last Month</span>
                  <span className="font-bold">$1,345,890</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span>Savings</span>
                  <span className="font-bold text-green-600">$111,323</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span>African Suppliers</span>
                  <span className="font-bold text-purple-600">$556,789</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Cost Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Raw Materials</span>
                  <div className="flex items-center gap-2">
                    <Progress value={45} className="w-20 h-2" />
                    <span className="font-medium">45%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Shipping & Logistics</span>
                  <div className="flex items-center gap-2">
                    <Progress value={25} className="w-20 h-2" />
                    <span className="font-medium">25%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Processing Fees</span>
                  <div className="flex items-center gap-2">
                    <Progress value={15} className="w-20 h-2" />
                    <span className="font-medium">15%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Insurance & Duties</span>
                  <div className="flex items-center gap-2">
                    <Progress value={15} className="w-20 h-2" />
                    <span className="font-medium">15%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </main>
  )
}