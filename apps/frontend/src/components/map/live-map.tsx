'use client'

import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MapPin, Ship, Plane, Truck } from 'lucide-react'

export function LiveMap() {
  const { data: shipments } = useQuery({
    queryKey: ['shipments'],
    queryFn: () => fetch(`${process.env.NEXT_PUBLIC_API_URL}/shipments`).then(r => r.json()),
  })

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'OCEAN': return <Ship className="h-4 w-4" />
      case 'AIR': return <Plane className="h-4 w-4" />
      case 'TRUCK': return <Truck className="h-4 w-4" />
      default: return <MapPin className="h-4 w-4" />
    }
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Global Shipment Map</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg relative overflow-hidden">
                {/* World map mockup */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Interactive World Map
                    </h3>
                    <p className="text-muted-foreground text-sm max-w-md">
                      Mapbox GL JS integration with real-time vessel positions, 
                      route optimization, and weather overlays
                    </p>
                  </div>
                </div>
                
                {/* Mock shipment markers */}
                <div className="absolute top-20 left-1/4 w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
                <div className="absolute top-32 right-1/3 w-3 h-3 bg-green-600 rounded-full animate-pulse"></div>
                <div className="absolute bottom-24 left-1/3 w-3 h-3 bg-orange-600 rounded-full animate-pulse"></div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Active Shipments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {shipments?.data?.slice(0, 5).map((shipment: any) => (
                  <div key={shipment.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50">
                    <div className="text-blue-600">
                      {getModeIcon(shipment.mode)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {shipment.orderNumber}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {shipment.origin?.code} → {shipment.destination?.code}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}