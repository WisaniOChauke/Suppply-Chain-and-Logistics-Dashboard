'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  ArrowLeft, MapPin, Clock, Truck, Package, User, Phone, Mail, 
  Calendar, DollarSign, AlertTriangle, CheckCircle, Camera, Download 
} from 'lucide-react'
import { useRouter } from 'next/navigation'

interface ShipmentDetailClientProps {
  shipmentId: string
}

export function ShipmentDetailClient({ shipmentId }: ShipmentDetailClientProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')

  const shipment = {
    id: shipmentId,
    orderNumber: 'PO-2024-089',
    status: 'IN_TRANSIT',
    progress: 65,
    origin: 'Shanghai Port, China',
    destination: 'Lagos Port, Nigeria',
    estimatedDelivery: '2024-01-25',
    value: '$45,200',
    weight: '2,340 kg',
    container: 'MSKU-7834562',
    carrier: 'Maersk Line',
    vessel: 'MSC Gülsün',
    customer: {
      name: 'Dangote Industries',
      contact: 'John Adebayo',
      phone: '+234-1-234-5678',
      email: 'j.adebayo@dangote.com'
    },
    timeline: [
      { status: 'Order Placed', date: '2024-01-10', completed: true, location: 'Shanghai' },
      { status: 'Goods Collected', date: '2024-01-12', completed: true, location: 'Shanghai Port' },
      { status: 'Departed Origin', date: '2024-01-15', completed: true, location: 'Shanghai Port' },
      { status: 'In Transit', date: '2024-01-20', completed: true, location: 'Indian Ocean' },
      { status: 'Customs Clearance', date: '2024-01-24', completed: false, location: 'Lagos Port' },
      { status: 'Out for Delivery', date: '2024-01-25', completed: false, location: 'Lagos' },
      { status: 'Delivered', date: '2024-01-25', completed: false, location: 'Customer Site' }
    ],
    documents: [
      { name: 'Bill of Lading', type: 'PDF', size: '245 KB' },
      { name: 'Commercial Invoice', type: 'PDF', size: '189 KB' },
      { name: 'Packing List', type: 'PDF', size: '156 KB' },
      { name: 'Certificate of Origin', type: 'PDF', size: '203 KB' }
    ]
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DELIVERED': return 'bg-green-100 text-green-800'
      case 'IN_TRANSIT': return 'bg-blue-100 text-blue-800'
      case 'DELAYED': return 'bg-orange-100 text-orange-800'
      case 'EXCEPTION': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Shipment {shipment.id}</h1>
              <p className="text-muted-foreground">Order: {shipment.orderNumber}</p>
            </div>
            <div className="ml-auto">
              <Badge className={getStatusColor(shipment.status)}>
                {shipment.status.replace('_', ' ')}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Shipment Progress</h3>
              <span className="text-sm text-muted-foreground">{shipment.progress}% Complete</span>
            </div>
            <Progress value={shipment.progress} className="mb-4" />
            <div className="flex justify-between text-sm">
              <span className="flex items-center"><MapPin className="h-3 w-3 mr-1" />{shipment.origin}</span>
              <span className="flex items-center"><MapPin className="h-3 w-3 mr-1" />{shipment.destination}</span>
            </div>
          </CardContent>
        </Card>

        <div className="flex space-x-1 mb-6 bg-muted p-1 rounded-lg w-fit">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'timeline', label: 'Timeline' },
            { id: 'documents', label: 'Documents' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === tab.id ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Shipment Details</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Container</p>
                    <p className="font-medium">{shipment.container}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Carrier</p>
                    <p className="font-medium">{shipment.carrier}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Weight</p>
                    <p className="font-medium">{shipment.weight}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Value</p>
                    <p className="font-medium">{shipment.value}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Customer Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Company</p>
                  <p className="font-medium">{shipment.customer.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Contact</p>
                  <p className="font-medium">{shipment.customer.contact}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'timeline' && (
          <Card>
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {shipment.timeline.map((event, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      event.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                    }`}>
                      {event.completed ? <CheckCircle className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{event.status}</p>
                      <p className="text-sm text-muted-foreground">{event.location}</p>
                    </div>
                    <div className="text-sm text-muted-foreground">{event.date}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'documents' && (
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {shipment.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                        <span className="text-xs font-medium text-red-600">PDF</span>
                      </div>
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-muted-foreground">{doc.size}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}