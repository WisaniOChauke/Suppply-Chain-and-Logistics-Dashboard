'use client'

import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Truck, Package, TrendingUp, Clock } from 'lucide-react'

export function SupplierDashboard() {
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
      { id: 'SH-001', orderNumber: 'PO-2024-001', status: 'IN_TRANSIT', destination: 'Los Angeles' },
      { id: 'SH-002', orderNumber: 'PO-2024-002', status: 'DELIVERED', destination: 'New York' },
    ]
  }

  const displayData = dashboard || mockData

  return (
    <main className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
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
        
        <Card>
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
        
        <Card>
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
        
        <Card>
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

      <Card>
        <CardHeader>
          <CardTitle>Recent Shipments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {displayData.shipments.map((shipment: any) => (
              <div key={shipment.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">{shipment.orderNumber}</p>
                  <p className="text-sm text-muted-foreground">To: {shipment.destination}</p>
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