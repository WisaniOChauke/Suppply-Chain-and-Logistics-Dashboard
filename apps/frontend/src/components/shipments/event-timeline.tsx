import { formatDate } from '@/lib/utils'
import { CheckCircle, Clock, AlertTriangle, MapPin } from 'lucide-react'

interface Event {
  id: string
  type: string
  timestamp: string
  description: string
  location?: { name: string; code: string }
}

interface EventTimelineProps {
  events: Event[]
}

const getEventIcon = (type: string) => {
  switch (type) {
    case 'DELIVERED':
      return <CheckCircle className="h-4 w-4 text-status-success" />
    case 'EXCEPTION':
      return <AlertTriangle className="h-4 w-4 text-status-error" />
    case 'IN_TRANSIT':
      return <Clock className="h-4 w-4 text-status-info" />
    default:
      return <MapPin className="h-4 w-4 text-muted-foreground" />
  }
}

export function EventTimeline({ events }: EventTimelineProps) {
  return (
    <div className="bg-card rounded-lg border p-6">
      <h3 className="text-lg font-semibold mb-4">Event Timeline</h3>
      
      {events.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p>No events recorded yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {events.map((event, index) => (
            <div key={event.id} className="flex space-x-3">
              <div className="flex flex-col items-center">
                {getEventIcon(event.type)}
                {index < events.length - 1 && (
                  <div className="w-px h-8 bg-border mt-2"></div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground">
                    {event.type.replace('_', ' ')}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(event.timestamp)}
                  </p>
                </div>
                
                <p className="text-sm text-muted-foreground mt-1">
                  {event.description}
                </p>
                
                {event.location && (
                  <p className="text-xs text-muted-foreground mt-1">
                    📍 {event.location.name} ({event.location.code})
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}