'use client'

import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertTriangle, Clock, User, ArrowRight } from 'lucide-react'
import { formatDate } from '@/lib/utils'

const getPriorityColor = (priority: string) => {
  const colors = {
    CRITICAL: 'text-red-600 bg-red-50 border-red-200',
    HIGH: 'text-orange-600 bg-orange-50 border-orange-200',
    MEDIUM: 'text-yellow-600 bg-yellow-50 border-yellow-200',
    LOW: 'text-blue-600 bg-blue-50 border-blue-200',
  }
  return colors[priority as keyof typeof colors] || colors.MEDIUM
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'DELAY': return <Clock className="h-4 w-4" />
    case 'CUSTOMS_HOLD': return <AlertTriangle className="h-4 w-4" />
    default: return <AlertTriangle className="h-4 w-4" />
  }
}

export function ExceptionsWorkQueue() {
  const { data: exceptions, isLoading } = useQuery({
    queryKey: ['exceptions', 'work-queue'],
    queryFn: () => fetch(`${process.env.NEXT_PUBLIC_API_URL}/exceptions/work-queue/OPERATOR`).then(r => r.json()),
  })

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-24 bg-muted rounded-lg animate-pulse" />
        ))}
      </div>
    )
  }

  const mockExceptions = [
    {
      id: 'exc-001',
      shipmentId: 'SH-001',
      type: 'DELAY',
      priority: 'HIGH',
      status: 'OPEN',
      title: 'Vessel delayed due to port congestion',
      description: 'MV Ever Given delayed 8 hours at Shanghai Port due to heavy traffic',
      assignedTo: null,
      createdAt: '2024-01-15T10:00:00Z',
    },
    {
      id: 'exc-002',
      shipmentId: 'SH-002',
      type: 'CUSTOMS_HOLD',
      priority: 'CRITICAL',
      status: 'IN_PROGRESS',
      title: 'Customs documentation missing',
      description: 'Commercial invoice discrepancy requires immediate attention',
      assignedTo: 'john.doe',
      createdAt: '2024-01-15T08:30:00Z',
    },
  ]

  const displayExceptions = exceptions || mockExceptions

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-2xl font-bold">23</p>
                <p className="text-sm text-muted-foreground">Open</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">8</p>
                <p className="text-sm text-muted-foreground">In Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">5</p>
                <p className="text-sm text-muted-foreground">Assigned to Me</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <ArrowRight className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">142</p>
                <p className="text-sm text-muted-foreground">Resolved Today</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Work Queue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {displayExceptions.map((exception: any) => (
              <div key={exception.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(exception.priority)}`}>
                        {exception.priority}
                      </span>
                      <div className="flex items-center space-x-1 text-muted-foreground">
                        {getTypeIcon(exception.type)}
                        <span className="text-sm">{exception.type.replace('_', ' ')}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {exception.shipmentId}
                      </span>
                    </div>
                    
                    <h3 className="font-medium text-foreground mb-1">
                      {exception.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {exception.description}
                    </p>
                    
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>Created: {formatDate(exception.createdAt)}</span>
                      {exception.assignedTo && (
                        <span>Assigned to: {exception.assignedTo}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    {!exception.assignedTo && (
                      <Button size="sm" variant="outline">
                        Assign to Me
                      </Button>
                    )}
                    <Button size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}