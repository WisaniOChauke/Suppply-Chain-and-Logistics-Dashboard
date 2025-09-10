'use client'

import { useQuery } from '@tanstack/react-query'
import { MapContainer } from '@/components/map/map-container'
import { EventTimeline } from '@/components/shipments/event-timeline'
import { ShipmentHeader } from '@/components/shipments/shipment-header'
import { ETAPrediction } from '@/components/shipments/eta-prediction'
import { useSocket } from '@/hooks/use-socket'

interface ShipmentDetailProps {
  shipmentId: string
}

export function ShipmentDetail({ shipmentId }: ShipmentDetailProps) {
  const { data: shipment, isLoading } = useQuery({
    queryKey: ['shipment', shipmentId],
    queryFn: () => fetch(`${process.env.NEXT_PUBLIC_API_URL}/shipments/${shipmentId}`).then(r => r.json()),
  })

  const { data: events } = useQuery({
    queryKey: ['events', shipmentId],
    queryFn: () => fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/shipment/${shipmentId}`).then(r => r.json()),
  })

  useSocket(shipmentId)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="animate-pulse p-6">
          <div className="h-8 bg-muted rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-96 bg-muted rounded"></div>
            <div className="h-96 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <ShipmentHeader shipment={shipment} />
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <MapContainer shipment={shipment} />
          </div>
          <div className="space-y-6">
            <EventTimeline events={events || []} />
          </div>
        </div>
        <div className="mt-6">
          <ETAPrediction shipmentId={shipmentId} />
        </div>
      </div>
    </div>
  )
}