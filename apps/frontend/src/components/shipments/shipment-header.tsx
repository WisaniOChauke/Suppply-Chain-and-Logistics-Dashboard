import { ArrowLeft, MapPin, Calendar, Truck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formatDate, getStatusColor } from '@/lib/utils'
import Link from 'next/link'

interface ShipmentHeaderProps {
  shipment: any
}

export function ShipmentHeader({ shipment }: ShipmentHeaderProps) {
  if (!shipment) return null

  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center space-x-4 mb-4">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-foreground">
            {shipment.orderNumber}
          </h1>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(shipment.status)}`}>
            {shipment.status.replace('_', ' ')}
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{shipment.origin?.name} → {shipment.destination?.name}</span>
          </div>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>ETA: {formatDate(shipment.estimatedArrival)}</span>
          </div>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Truck className="h-4 w-4" />
            <span>{shipment.carrier} • {shipment.mode}</span>
          </div>
        </div>
      </div>
    </header>
  )
}