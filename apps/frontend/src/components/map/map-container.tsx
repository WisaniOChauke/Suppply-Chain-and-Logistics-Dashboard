'use client'

import { useEffect, useRef } from 'react'

interface MapContainerProps {
  shipment: any
}

export function MapContainer({ shipment }: MapContainerProps) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!shipment || !mapRef.current) return

    // Simple map placeholder - will integrate Mapbox in production
    const mockRoute = [
      shipment.origin?.coordinates,
      shipment.destination?.coordinates,
    ].filter(Boolean)

    // Mock current position (60% of route for demo)
    const progress = 0.6
    const currentLat = mockRoute[0]?.lat + (mockRoute[1]?.lat - mockRoute[0]?.lat) * progress
    const currentLng = mockRoute[0]?.lng + (mockRoute[1]?.lng - mockRoute[0]?.lng) * progress

    return () => {
      // Cleanup map instance
    }
  }, [shipment])

  return (
    <div className="bg-card rounded-lg border p-6">
      <h3 className="text-lg font-semibold mb-4">Live Tracking</h3>
      <div 
        ref={mapRef}
        className="h-80 bg-muted rounded-lg flex items-center justify-center relative overflow-hidden"
      >
        {/* Mock map visualization */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100">
          {/* Origin marker */}
          <div className="absolute top-4 left-4 w-3 h-3 bg-green-500 rounded-full shadow-lg"></div>
          <span className="absolute top-7 left-7 text-xs font-medium text-green-700">
            {shipment?.origin?.code}
          </span>
          
          {/* Route line */}
          <div className="absolute top-6 left-6 w-64 h-0.5 bg-blue-400 transform rotate-12 origin-left"></div>
          
          {/* Current position */}
          <div className="absolute top-16 left-40 w-4 h-4 bg-blue-600 rounded-full shadow-lg animate-pulse"></div>
          <span className="absolute top-20 left-44 text-xs font-medium text-blue-700">
            Current
          </span>
          
          {/* Destination marker */}
          <div className="absolute top-20 right-8 w-3 h-3 bg-red-500 rounded-full shadow-lg"></div>
          <span className="absolute top-23 right-11 text-xs font-medium text-red-700">
            {shipment?.destination?.code}
          </span>
        </div>
        
        <div className="text-center z-10">
          <p className="text-muted-foreground text-sm">
            Interactive map with Mapbox GL JS
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Live vessel tracking • Route optimization • Weather overlays
          </p>
        </div>
      </div>
    </div>
  )
}