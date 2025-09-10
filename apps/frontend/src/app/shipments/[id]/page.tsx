import { ShipmentDetail } from '@/components/shipments/shipment-detail'

export default function ShipmentPage({ params }: { params: { id: string } }) {
  return <ShipmentDetail shipmentId={params.id} />
}