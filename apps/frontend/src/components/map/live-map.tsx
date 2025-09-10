'use client'

import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, Ship, Plane, Truck, Filter, Search, Layers, Zap, Cloud, Navigation, Eye, AlertTriangle, CheckCircle, Clock } from 'lucide-react'
import { useState } from 'react'

function Badge({ children, variant = 'default', className = '' }: { children: React.ReactNode, variant?: 'default' | 'secondary' | 'outline' | 'destructive', className?: string }) {
  const baseClasses = 'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium'
  const variantClasses = {
    default: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    outline: 'border border-input bg-background',
    destructive: 'bg-destructive text-destructive-foreground'
  }
  
  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  )
}

export function LiveMap() {
  const [selectedShipment, setSelectedShipment] = useState<any>(null)
  const [mapView, setMapView] = useState('satellite')
  const [showWeather, setShowWeather] = useState(false)
  const [showTraffic, setShowTraffic] = useState(false)

  const { data: shipments } = useQuery({
    queryKey: ['shipments'],
    queryFn: () => fetch(`${process.env.NEXT_PUBLIC_API_URL}/shipments`).then(r => r.json()),
  })

  const mockShipments = [
    { id: 'SH-001', orderNumber: 'PO-2024-001', mode: 'OCEAN', status: 'IN_TRANSIT', origin: { code: 'SHA', name: 'Shanghai' }, destination: { code: 'LAX', name: 'Los Angeles' }, progress: 65 },
    { id: 'SH-002', orderNumber: 'PO-2024-002', mode: 'AIR', status: 'DELIVERED', origin: { code: 'JFK', name: 'New York' }, destination: { code: 'LHR', name: 'London' }, progress: 100 },
    { id: 'SH-003', orderNumber: 'PO-2024-003', mode: 'TRUCK', status: 'EXCEPTION', origin: { code: 'CHI', name: 'Chicago' }, destination: { code: 'MIA', name: 'Miami' }, progress: 45 },
    { id: 'SH-004', orderNumber: 'PO-2024-004', mode: 'OCEAN', status: 'IN_TRANSIT', origin: { code: 'RTM', name: 'Rotterdam' }, destination: { code: 'NYC', name: 'New York' }, progress: 30 },
    // African Routes
    { id: 'SH-005', orderNumber: 'PO-2024-005', mode: 'OCEAN', status: 'IN_TRANSIT', origin: { code: 'CPT', name: 'Cape Town' }, destination: { code: 'HAM', name: 'Hamburg' }, progress: 55, supplier: 'African Logistics SA' },
    { id: 'SH-006', orderNumber: 'PO-2024-006', mode: 'AIR', status: 'DELIVERED', origin: { code: 'JNB', name: 'Johannesburg' }, destination: { code: 'DXB', name: 'Dubai' }, progress: 100, supplier: 'Mandela Freight' },
    { id: 'SH-007', orderNumber: 'PO-2024-007', mode: 'TRUCK', status: 'IN_TRANSIT', origin: { code: 'LOS', name: 'Lagos' }, destination: { code: 'ACC', name: 'Accra' }, progress: 75, supplier: 'West Africa Express' },
    { id: 'SH-008', orderNumber: 'PO-2024-008', mode: 'OCEAN', status: 'IN_TRANSIT', origin: { code: 'DAR', name: 'Dar es Salaam' }, destination: { code: 'MOM', name: 'Mombasa' }, progress: 40, supplier: 'East African Shipping' },
  ]

  const displayShipments = shipments?.data || mockShipments

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'OCEAN': return <Ship className="h-4 w-4" />
      case 'AIR': return <Plane className="h-4 w-4" />
      case 'TRUCK': return <Truck className="h-4 w-4" />
      default: return <MapPin className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DELIVERED': return 'bg-green-500'
      case 'IN_TRANSIT': return 'bg-blue-500'
      case 'EXCEPTION': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'DELIVERED': return <CheckCircle className="h-3 w-3" />
      case 'IN_TRANSIT': return <Clock className="h-3 w-3" />
      case 'EXCEPTION': return <AlertTriangle className="h-3 w-3" />
      default: return <MapPin className="h-3 w-3" />
    }
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Map Controls */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Search className="h-4 w-4 mr-2" />
            Search Location
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter Shipments
          </Button>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button 
            variant={showWeather ? "default" : "outline"} 
            size="sm"
            onClick={() => setShowWeather(!showWeather)}
          >
            <Cloud className="h-4 w-4 mr-2" />
            Weather
          </Button>
          <Button 
            variant={showTraffic ? "default" : "outline"} 
            size="sm"
            onClick={() => setShowTraffic(!showTraffic)}
          >
            <Navigation className="h-4 w-4 mr-2" />
            Traffic
          </Button>
          <Button variant="outline" size="sm">
            <Layers className="h-4 w-4 mr-2" />
            Layers
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Global Shipment Map</CardTitle>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant={mapView === 'satellite' ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setMapView('satellite')}
                  >
                    Satellite
                  </Button>
                  <Button 
                    variant={mapView === 'street' ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setMapView('street')}
                  >
                    Street
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[600px] bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 rounded-lg relative overflow-hidden border">
                {/* Enhanced World Map Mockup */}
                <div className="absolute inset-0">
                  {/* Continents outline */}
                  <svg className="w-full h-full opacity-30" viewBox="0 0 800 400">
                    {/* North America */}
                    <path d="M100 80 L200 70 L250 120 L200 180 L120 160 Z" fill="currentColor" />
                    {/* Europe */}
                    <path d="M350 60 L420 55 L430 100 L380 110 L340 90 Z" fill="currentColor" />
                    {/* Asia */}
                    <path d="M450 50 L650 60 L680 140 L500 150 L440 100 Z" fill="currentColor" />
                    {/* Enhanced Africa with regional highlights */}
                    <path d="M320 120 L400 115 L420 140 L430 180 L420 220 L400 250 L370 260 L350 240 L330 200 L310 180 Z" fill="currentColor" />
                    {/* South Africa region */}
                    <path d="M350 240 L400 250 L420 270 L400 285 L370 280 L350 265 Z" fill="rgba(59, 130, 246, 0.3)" stroke="rgba(59, 130, 246, 0.6)" strokeWidth="1" />
                    {/* West Africa region */}
                    <path d="M310 180 L340 175 L350 195 L330 200 Z" fill="rgba(34, 197, 94, 0.3)" stroke="rgba(34, 197, 94, 0.6)" strokeWidth="1" />
                    {/* East Africa region */}
                    <path d="M400 180 L430 180 L435 210 L410 215 Z" fill="rgba(249, 115, 22, 0.3)" stroke="rgba(249, 115, 22, 0.6)" strokeWidth="1" />
                    {/* South America */}
                    <path d="M180 200 L240 190 L260 300 L200 320 L170 280 Z" fill="currentColor" />
                    {/* Australia */}
                    <path d="M580 250 L650 245 L660 280 L590 285 Z" fill="currentColor" />
                  </svg>

                  {/* Shipment Markers with realistic positioning */}
                  {displayShipments.map((shipment: any, index: number) => {
                    // More realistic positioning based on regions
                    let x, y
                    if (shipment.origin.code === 'CPT') { x = 370; y = 270 } // Cape Town
                    else if (shipment.origin.code === 'JNB') { x = 380; y = 250 } // Johannesburg
                    else if (shipment.origin.code === 'LOS') { x = 320; y = 190 } // Lagos
                    else if (shipment.origin.code === 'DAR') { x = 410; y = 200 } // Dar es Salaam
                    else {
                      x = 100 + (index * 120) % 500
                      y = 80 + (index * 60) % 250
                    }
                    
                    const isAfrican = ['CPT', 'JNB', 'LOS', 'DAR'].includes(shipment.origin.code)
                    
                    return (
                      <div
                        key={shipment.id}
                        className={`absolute w-4 h-4 rounded-full cursor-pointer transition-all hover:scale-125 ${getStatusColor(shipment.status)} animate-pulse shadow-lg`}
                        style={{ left: `${x}px`, top: `${y}px` }}
                        onClick={() => setSelectedShipment(shipment)}
                        title={`${shipment.orderNumber} - ${shipment.origin.name} to ${shipment.destination.name}`}
                      >
                        <div className="absolute -top-1 -left-1 w-6 h-6 rounded-full border-2 border-white/50 animate-ping"></div>
                        {/* African routes get special highlighting */}
                        {isAfrican && (
                          <div className="absolute -top-2 -left-2 w-8 h-8 rounded-full border border-yellow-400/50 animate-pulse"></div>
                        )}
                      </div>
                    )
                  })}

                  {/* Route Lines */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    {displayShipments.map((shipment: any, index: number) => {
                      const x1 = 100 + (index * 150) % 600
                      const y1 = 100 + (index * 80) % 300
                      const x2 = x1 + 100
                      const y2 = y1 + 50
                      return (
                        <line
                          key={`route-${shipment.id}`}
                          x1={x1}
                          y1={y1}
                          x2={x2}
                          y2={y2}
                          stroke="rgba(59, 130, 246, 0.5)"
                          strokeWidth="2"
                          strokeDasharray="5,5"
                          className="animate-pulse"
                        />
                      )
                    })}
                  </svg>

                  {/* Weather Overlay */}
                  {showWeather && (
                    <div className="absolute top-4 left-4 bg-black/50 text-white p-2 rounded">
                      <div className="flex items-center space-x-2">
                        <Cloud className="h-4 w-4" />
                        <span className="text-sm">Weather: Clear, 22°C</span>
                      </div>
                    </div>
                  )}

                  {/* Traffic Overlay */}
                  {showTraffic && (
                    <div className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded">
                      <div className="flex items-center space-x-2">
                        <Navigation className="h-4 w-4" />
                        <span className="text-sm">Traffic: Moderate</span>
                      </div>
                    </div>
                  )}

                  {/* Map Legend */}
                  <div className="absolute bottom-4 left-4 bg-black/70 text-white p-3 rounded-lg">
                    <h4 className="text-sm font-medium mb-2 text-white">Legend</h4>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-xs text-white">In Transit</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-white">Delivered</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-xs text-white">Exception</span>
                      </div>
                    </div>
                  </div>

                  {/* Zoom Controls */}
                  <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
                    <Button size="sm" variant="secondary">+</Button>
                    <Button size="sm" variant="secondary">-</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-4">
          {/* Active Shipments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Active Shipments
                <Badge variant="secondary">{displayShipments.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {displayShipments.map((shipment: any) => (
                  <div 
                    key={shipment.id} 
                    className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedShipment?.id === shipment.id ? 'bg-primary/10 border border-primary/20' : 'hover:bg-muted/50'
                    }`}
                    onClick={() => setSelectedShipment(shipment)}
                  >
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
                      {shipment.supplier && (
                        <p className="text-xs text-blue-600 font-medium">
                          {shipment.supplier}
                        </p>
                      )}
                      <div className="flex items-center space-x-2 mt-1">
                        {getStatusIcon(shipment.status)}
                        <Badge variant={
                          shipment.status === 'DELIVERED' ? 'default' : 
                          shipment.status === 'IN_TRANSIT' ? 'secondary' : 'destructive'
                        }>
                          {shipment.status}
                        </Badge>
                        {['CPT', 'JNB', 'LOS', 'DAR'].includes(shipment.origin.code) && (
                          <Badge variant="outline" className="text-yellow-600 border-yellow-400">
                            🌍 Africa
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Shipment Details */}
          {selectedShipment && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Shipment Details
                  <Button variant="ghost" size="sm" onClick={() => setSelectedShipment(null)}>
                    ×
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium">{selectedShipment.orderNumber}</p>
                    <p className="text-xs text-muted-foreground">
                      {selectedShipment.origin?.name} → {selectedShipment.destination?.name}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{selectedShipment.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all" 
                        style={{ width: `${selectedShipment.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Mode</span>
                    <div className="flex items-center space-x-1">
                      {getModeIcon(selectedShipment.mode)}
                      <span className="text-sm">{selectedShipment.mode}</span>
                    </div>
                  </div>

                  <Button size="sm" className="w-full">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Map Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Live Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Active Routes</span>
                  <span className="font-medium">24</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Avg Speed</span>
                  <span className="font-medium">45 km/h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">On Time</span>
                  <span className="font-medium text-green-600">94%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Exceptions</span>
                  <span className="font-medium text-red-600">3</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}