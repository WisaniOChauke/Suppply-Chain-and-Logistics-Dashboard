import { LiveMap } from '@/components/map/live-map'

export default function MapPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-foreground">Live Map</h1>
          <p className="text-muted-foreground">Real-time shipment tracking across global routes</p>
        </div>
      </header>
      <LiveMap />
    </div>
  )
}