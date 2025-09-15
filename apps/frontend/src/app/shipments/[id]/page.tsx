import { ShipmentDetailClient } from '@/components/shipments/shipment-detail-client'

export async function generateStaticParams() {
  return [
    { id: 'SH-AF-2024-089' },
    { id: 'SH-AF-2024-091' },
    { id: 'SH-EU-2024-156' }
  ]
}

export default function ShipmentDetailPage({ params }: { params: { id: string } }) {
  return <ShipmentDetailClient shipmentId={params.id} />
}