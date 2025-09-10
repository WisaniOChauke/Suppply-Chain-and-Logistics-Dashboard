'use client'

import { useState } from 'react'
import { formatDate, getStatusColor } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { MapPin, Calendar, Truck } from 'lucide-react'

// Mock data - will be replaced with API calls
const mockShipments = [
  {
    id: 'SH-001',
    orderNumber: 'ORD-2024-001',
    containerNumber: 'MSKU-123456-7',
    status: 'IN_TRANSIT',
    origin: { name: 'Shanghai Port', code: 'CNSHA' },
    destination: { name: 'Los Angeles Port', code: 'USLAX' },
    estimatedArrival: '2024-01-15T10:00:00Z',
    carrier: 'Maersk Line',
    mode: 'OCEAN',
  },
  {
    id: 'SH-002',
    orderNumber: 'ORD-2024-002',
    status: 'EXCEPTION',
    origin: { name: 'Hamburg Port', code: 'DEHAM' },
    destination: { name: 'New York Port', code: 'USNYC' },
    estimatedArrival: '2024-01-12T14:30:00Z',
    carrier: 'MSC',
    mode: 'OCEAN',
  },
  {
    id: 'SH-003',
    orderNumber: 'ORD-2024-003',
    containerNumber: 'COSCO-789012-3',
    status: 'DELIVERED',
    origin: { name: 'Singapore Port', code: 'SGSIN' },
    destination: { name: 'Long Beach Port', code: 'USLGB' },
    estimatedArrival: '2024-01-10T08:00:00Z',
    carrier: 'COSCO',
    mode: 'OCEAN',
  },
]

export function ShipmentsList() {
  const [selectedShipment, setSelectedShipment] = useState<string | null>(null)

  return (
    <div className="bg-card rounded-lg border">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Active Shipments</h2>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
      </div>
      
      <div className="divide-y">
        {mockShipments.map((shipment) => (
          <div
            key={shipment.id}
            className="p-6 hover:bg-muted/50 cursor-pointer transition-colors"
            onClick={() => setSelectedShipment(shipment.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-2">
                  <h3 className="font-medium text-foreground">{shipment.orderNumber}</h3>
                  {shipment.containerNumber && (
                    <span className="text-sm text-muted-foreground">
                      {shipment.containerNumber}
                    </span>
                  )}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(shipment.status)}`}>
                    {shipment.status.replace('_', ' ')}
                  </span>
                </div>
                
                <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{shipment.origin.name} → {shipment.destination.name}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>ETA: {formatDate(shipment.estimatedArrival)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Truck className="h-4 w-4" />
                    <span>{shipment.carrier}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}