'use client'

import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ShoppingCart, Truck, CheckCircle, AlertTriangle } from 'lucide-react'

export function CustomerDashboard() {
  const { data: dashboard } = useQuery({
    queryKey: ['customer-dashboard'],
    queryFn: () => fetch(`${process.env.NEXT_PUBLIC_API_URL}/portal/customer/demo-tenant/dashboard`).then(r => r.json()),
  })

  const mockData = {
    totalOrders: 156,
    inTransit: 23,
    delivered: 128,
    exceptions: 5,
    shipments: [
      { id: 'SH-001', orderNumber: 'ORD-2024-001', status: 'IN_TRANSIT', eta: '2024-01-25' },
      { id: 'SH-002', orderNumber: 'ORD-2024-002', status: 'DELIVERED', eta: '2024-01-20' },
    ]
  }

  const displayData = dashboard || mockData

  return (
    <main className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
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
        
        <Card>
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
        
        <Card>
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
        
        <Card>
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

      <Card>
        <CardHeader>
          <CardTitle>Your Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {displayData.shipments.map((shipment: any) => (
              <div key={shipment.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">{shipment.orderNumber}</p>
                  <p className="text-sm text-muted-foreground">ETA: {shipment.eta}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  shipment.status === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                  shipment.status === 'IN_TRANSIT' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {shipment.status}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </main>
  )
}