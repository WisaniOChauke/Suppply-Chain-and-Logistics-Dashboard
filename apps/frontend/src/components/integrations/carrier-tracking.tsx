'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Truck, MapPin, Clock } from 'lucide-react'

export function CarrierTracking() {
  const [carrier, setCarrier] = useState('fedex')
  const [trackingNumber, setTrackingNumber] = useState('')
  const [shouldTrack, setShouldTrack] = useState(false)

  const { data: trackingData, isLoading } = useQuery({
    queryKey: ['carrier-tracking', carrier, trackingNumber],
    queryFn: () => 
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/integrations/carriers/track/${carrier}/${trackingNumber}`)
        .then(r => r.json()),
    enabled: shouldTrack && !!trackingNumber,
  })

  const handleTrack = () => {
    if (trackingNumber) {
      setShouldTrack(true)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Truck className="h-5 w-5" />
          <span>Carrier Tracking</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Carrier</label>
            <select
              value={carrier}
              onChange={(e) => setCarrier(e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md bg-background"
            >
              <option value="fedex">FedEx</option>
              <option value="ups">UPS</option>
              <option value="dhl">DHL</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tracking Number</label>
            <input
              type="text"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md bg-background"
              placeholder="Enter tracking number"
            />
          </div>
        </div>
        
        <Button onClick={handleTrack} disabled={!trackingNumber || isLoading}>
          {isLoading ? 'Tracking...' : 'Track Package'}
        </Button>

        {trackingData && (
          <div className="space-y-4 mt-4">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <p className="font-medium">Status: {trackingData.status}</p>
                <p className="text-sm text-muted-foreground">
                  Tracking: {trackingData.trackingNumber}
                </p>
              </div>
              <div className={`px-2 py-1 rounded text-xs font-medium ${
                trackingData.status === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                trackingData.status === 'IN_TRANSIT' ? 'bg-blue-100 text-blue-800' :
                'bg-orange-100 text-orange-800'
              }`}>
                {trackingData.status}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Current Location</p>
                  <p className="text-xs text-muted-foreground">{trackingData.location.address}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Est. Delivery</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(trackingData.estimatedDelivery).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}