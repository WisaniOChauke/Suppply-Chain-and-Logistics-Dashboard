'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  Truck, Package, AlertTriangle, TrendingUp, MapPin, Clock, DollarSign, 
  Users, Globe, BarChart3, Target, Award, Plus, Search, Filter, Download, 
  Eye, Calendar, Star, Activity, Zap, Shield
} from 'lucide-react'

export function EnhancedSupplierDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <main className="container mx-auto px-4 py-6">
      {/* Enhanced Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="hover:shadow-md transition-shadow border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Shipments</CardTitle>
            <Truck className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">147</div>
            <p className="text-xs text-muted-foreground">+12 from last week</p>
            <div className="flex items-center mt-2 text-xs">
              <MapPin className="h-3 w-3 mr-1" />
              <span>23 to African ports</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">$2.4M</div>
            <p className="text-xs text-muted-foreground">+18% from last month</p>
            <div className="flex items-center mt-2 text-xs">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              <span>Best quarter yet</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Exceptions</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">8</div>
            <p className="text-xs text-muted-foreground">3 critical, 5 medium</p>
            <div className="flex items-center mt-2 text-xs">
              <Clock className="h-3 w-3 mr-1" />
              <span>Avg resolution: 4.2h</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Performance Score</CardTitle>
            <Award className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">96.8%</div>
            <p className="text-xs text-muted-foreground">On-time delivery rate</p>
            <Progress value={96.8} className="mt-2 h-2" />
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
              <Package className="h-5 w-5 text-blue-600" />
              <span className="text-sm">Create Shipment</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-green-50">
              <BarChart3 className="h-5 w-5 text-green-600" />
              <span className="text-sm">View Analytics</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-orange-50">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              <span className="text-sm">Manage Exceptions</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-purple-50">
              <Globe className="h-5 w-5 text-purple-600" />
              <span className="text-sm">Live Tracking</span>
            </Button>
          </div>
        </CardContent>
      </Card>

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

      {/* Enhanced Overview Tab */}
      {activeTab === 'overview' && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Recent Activity */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4 p-3 rounded-lg bg-green-50 border border-green-200">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Shipment SH-AF-2024-089 delivered to Lagos Port</p>
                    <p className="text-xs text-muted-foreground">32 minutes ago • Nigeria • $45,200 value</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Delivered</Badge>
                </div>
                <div className="flex items-center space-x-4 p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">New bulk order from Dangote Industries</p>
                    <p className="text-xs text-muted-foreground">1 hour ago • $340K value • 150 containers</p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">New Order</Badge>
                </div>
                <div className="flex items-center space-x-4 p-3 rounded-lg bg-orange-50 border border-orange-200">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Weather delay for SH-AF-2024-091</p>
                    <p className="text-xs text-muted-foreground">2 hours ago • Cape Town route • 6h delay</p>
                  </div>
                  <Badge className="bg-orange-100 text-orange-800">Exception</Badge>
                </div>
                <div className="flex items-center space-x-4 p-3 rounded-lg bg-purple-50 border border-purple-200">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Performance milestone achieved</p>
                    <p className="text-xs text-muted-foreground">3 hours ago • 97% on-time delivery rate</p>
                  </div>
                  <Badge className="bg-purple-100 text-purple-800">Milestone</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Top Routes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Top Routes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div>
                      <p className="font-medium text-sm">Shanghai → Lagos</p>
                      <p className="text-xs text-muted-foreground">23 active shipments</p>
                      <div className="flex items-center mt-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                        <span className="text-xs">98% on-time</span>
                      </div>
                    </div>
                    <Badge className="bg-red-100 text-red-800">High Volume</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div>
                      <p className="font-medium text-sm">Hamburg → Durban</p>
                      <p className="text-xs text-muted-foreground">18 active shipments</p>
                      <div className="flex items-center mt-1">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mr-1"></div>
                        <span className="text-xs">94% on-time</span>
                      </div>
                    </div>
                    <Badge variant="secondary">Medium</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div>
                      <p className="font-medium text-sm">Rotterdam → Casablanca</p>
                      <p className="text-xs text-muted-foreground">12 active shipments</p>
                      <div className="flex items-center mt-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                        <span className="text-xs">96% on-time</span>
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
                  Regional Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Africa</span>
                    <div className="flex items-center gap-2">
                      <Progress value={96} className="w-16 h-2" />
                      <span className="text-sm font-medium">96%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Europe</span>
                    <div className="flex items-center gap-2">
                      <Progress value={98} className="w-16 h-2" />
                      <span className="text-sm font-medium">98%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Asia</span>
                    <div className="flex items-center gap-2">
                      <Progress value={94} className="w-16 h-2" />
                      <span className="text-sm font-medium">94%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  Customer Satisfaction
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">4.8/5</div>
                  <p className="text-sm text-muted-foreground mb-3">Average rating</p>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>5 stars</span>
                      <span>78%</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>4 stars</span>
                      <span>18%</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>3 stars</span>
                      <span>4%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Monthly Growth
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Revenue</span>
                    <span className="text-sm font-medium text-green-600">+18%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Shipments</span>
                    <span className="text-sm font-medium text-blue-600">+12%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">New Customers</span>
                    <span className="text-sm font-medium text-purple-600">+24%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">African Routes</span>
                    <span className="text-sm font-medium text-orange-600">+31%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {/* Enhanced Shipments Tab */}
      {activeTab === 'shipments' && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                All Shipments
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
                  New Shipment
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { id: 'SH-AF-2024-089', destination: 'Lagos, Nigeria', status: 'DELIVERED', value: '$45,200', eta: '2024-01-15' },
                { id: 'SH-AF-2024-091', destination: 'Cape Town, South Africa', status: 'IN_TRANSIT', value: '$67,800', eta: '2024-01-18' },
                { id: 'SH-EU-2024-156', destination: 'Casablanca, Morocco', status: 'IN_TRANSIT', value: '$23,400', eta: '2024-01-20' },
                { id: 'SH-AS-2024-234', destination: 'Durban, South Africa', status: 'PENDING', value: '$89,600', eta: '2024-01-22' }
              ].map((shipment) => (
                <div key={shipment.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div>
                        <p className="font-medium">{shipment.id}</p>
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
                        {shipment.eta}
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

      {/* Enhanced Orders Tab */}
      {activeTab === 'orders' && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Order Management
              </CardTitle>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Create Order
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { id: 'ORD-AF-001', customer: 'Dangote Industries', items: 150, value: '$340,000', status: 'PROCESSING' },
                { id: 'ORD-AF-002', customer: 'Shoprite Holdings', items: 89, value: '$156,700', status: 'SHIPPED' },
                { id: 'ORD-EU-003', customer: 'Unilever Morocco', items: 67, value: '$98,400', status: 'CONFIRMED' },
                { id: 'ORD-AF-004', customer: 'MTN Group', items: 234, value: '$567,800', status: 'PROCESSING' }
              ].map((order) => (
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

      {/* Enhanced Performance Tab */}
      {activeTab === 'performance' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                This Month Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span>Total Delivered</span>
                  <span className="font-bold text-green-600">156</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span>On Time</span>
                  <span className="font-bold text-blue-600">148</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                  <span>Delayed</span>
                  <span className="font-bold text-orange-600">8</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span>African Routes</span>
                  <span className="font-bold text-purple-600">67</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Performance Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>On-time Delivery</span>
                  <div className="flex items-center gap-2">
                    <Progress value={96.8} className="w-20 h-2" />
                    <span className="font-bold text-green-600">96.8%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Customer Satisfaction</span>
                  <div className="flex items-center gap-2">
                    <Progress value={94} className="w-20 h-2" />
                    <span className="font-bold text-blue-600">4.8/5</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Cost Efficiency</span>
                  <div className="flex items-center gap-2">
                    <Progress value={92} className="w-20 h-2" />
                    <span className="font-bold text-purple-600">92%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Route Optimization</span>
                  <div className="flex items-center gap-2">
                    <Progress value={89} className="w-20 h-2" />
                    <span className="font-bold text-orange-600">89%</span>
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