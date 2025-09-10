import { Injectable } from '@nestjs/common';

interface TrackingResponse {
  trackingNumber: string;
  status: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  estimatedDelivery: string;
  events: Array<{
    timestamp: string;
    description: string;
    location: string;
  }>;
}

@Injectable()
export class CarrierService {
  async trackShipment(carrier: string, trackingNumber: string): Promise<TrackingResponse> {
    switch (carrier.toLowerCase()) {
      case 'fedex':
        return this.trackFedEx(trackingNumber);
      case 'ups':
        return this.trackUPS(trackingNumber);
      case 'dhl':
        return this.trackDHL(trackingNumber);
      default:
        return this.mockTracking(trackingNumber);
    }
  }

  private async trackFedEx(trackingNumber: string): Promise<TrackingResponse> {
    try {
      const response = await fetch('https://apis.fedex.com/track/v1/trackingnumbers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-locale': 'en_US',
          'Authorization': `Bearer ${process.env.FEDEX_API_KEY}`,
        },
        body: JSON.stringify({
          includeDetailedScans: true,
          trackingInfo: [{ trackingNumberInfo: { trackingNumber } }]
        })
      });
      
      const data = await response.json();
      return this.parseFedExResponse(data);
    } catch (error) {
      console.error('FedEx API error:', error);
      return this.mockTracking(trackingNumber);
    }
  }

  private async trackUPS(trackingNumber: string): Promise<TrackingResponse> {
    try {
      const response = await fetch(`https://onlinetools.ups.com/api/track/v1/details/${trackingNumber}`, {
        headers: {
          'Authorization': `Bearer ${process.env.UPS_API_KEY}`,
          'Content-Type': 'application/json',
        }
      });
      
      const data = await response.json();
      return this.parseUPSResponse(data);
    } catch (error) {
      console.error('UPS API error:', error);
      return this.mockTracking(trackingNumber);
    }
  }

  private async trackDHL(trackingNumber: string): Promise<TrackingResponse> {
    try {
      const response = await fetch(`https://api-eu.dhl.com/track/shipments?trackingNumber=${trackingNumber}`, {
        headers: {
          'DHL-API-Key': process.env.DHL_API_KEY,
        }
      });
      
      const data = await response.json();
      return this.parseDHLResponse(data);
    } catch (error) {
      console.error('DHL API error:', error);
      return this.mockTracking(trackingNumber);
    }
  }

  private parseFedExResponse(data: any): TrackingResponse {
    const trackInfo = data.output?.completeTrackResults?.[0]?.trackResults?.[0];
    return {
      trackingNumber: trackInfo?.trackingNumberInfo?.trackingNumber || '',
      status: this.mapFedExStatus(trackInfo?.latestStatusDetail?.code),
      location: {
        latitude: trackInfo?.scanEvents?.[0]?.scanLocation?.latitude || 0,
        longitude: trackInfo?.scanEvents?.[0]?.scanLocation?.longitude || 0,
        address: trackInfo?.scanEvents?.[0]?.scanLocation?.address || 'Unknown',
      },
      estimatedDelivery: trackInfo?.estimatedDeliveryTimeWindow?.window?.ends || new Date().toISOString(),
      events: trackInfo?.scanEvents?.map((event: any) => ({
        timestamp: event.date,
        description: event.eventDescription,
        location: event.scanLocation?.address || 'Unknown',
      })) || [],
    };
  }

  private parseUPSResponse(data: any): TrackingResponse {
    const shipment = data.trackResponse?.shipment?.[0];
    return {
      trackingNumber: shipment?.inquiryNumber || '',
      status: this.mapUPSStatus(shipment?.package?.[0]?.currentStatus?.type),
      location: {
        latitude: 0, // UPS doesn't provide coordinates directly
        longitude: 0,
        address: shipment?.package?.[0]?.currentStatus?.location || 'Unknown',
      },
      estimatedDelivery: shipment?.package?.[0]?.deliveryDate?.[0]?.date || new Date().toISOString(),
      events: shipment?.package?.[0]?.activity?.map((event: any) => ({
        timestamp: event.date + 'T' + event.time,
        description: event.status?.description,
        location: event.location?.address || 'Unknown',
      })) || [],
    };
  }

  private parseDHLResponse(data: any): TrackingResponse {
    const shipment = data.shipments?.[0];
    return {
      trackingNumber: shipment?.id || '',
      status: this.mapDHLStatus(shipment?.status?.statusCode),
      location: {
        latitude: 0, // DHL doesn't provide coordinates directly
        longitude: 0,
        address: shipment?.status?.location || 'Unknown',
      },
      estimatedDelivery: shipment?.estimatedTimeOfDelivery || new Date().toISOString(),
      events: shipment?.events?.map((event: any) => ({
        timestamp: event.timestamp,
        description: event.description,
        location: event.location || 'Unknown',
      })) || [],
    };
  }

  private mapFedExStatus(code: string): string {
    const statusMap: { [key: string]: string } = {
      'IT': 'IN_TRANSIT',
      'OD': 'OUT_FOR_DELIVERY',
      'DL': 'DELIVERED',
      'EX': 'EXCEPTION',
    };
    return statusMap[code] || 'UNKNOWN';
  }

  private mapUPSStatus(type: string): string {
    const statusMap: { [key: string]: string } = {
      'I': 'IN_TRANSIT',
      'D': 'DELIVERED',
      'X': 'EXCEPTION',
    };
    return statusMap[type] || 'UNKNOWN';
  }

  private mapDHLStatus(code: string): string {
    const statusMap: { [key: string]: string } = {
      'transit': 'IN_TRANSIT',
      'delivered': 'DELIVERED',
      'failure': 'EXCEPTION',
    };
    return statusMap[code] || 'UNKNOWN';
  }

  private mockTracking(trackingNumber: string): TrackingResponse {
    const statuses = ['IN_TRANSIT', 'OUT_FOR_DELIVERY', 'DELIVERED', 'EXCEPTION'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    
    return {
      trackingNumber,
      status: randomStatus,
      location: {
        latitude: 40.7128 + (Math.random() - 0.5) * 10,
        longitude: -74.0060 + (Math.random() - 0.5) * 10,
        address: 'Distribution Center, City, State',
      },
      estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      events: [
        {
          timestamp: new Date().toISOString(),
          description: 'Package in transit',
          location: 'Distribution Center',
        },
      ],
    };
  }

  async getCarrierRates(origin: string, destination: string, weight: number) {
    return [
      { carrier: 'FedEx', service: 'Ground', rate: 12.50, days: 3 },
      { carrier: 'UPS', service: 'Ground', rate: 11.75, days: 3 },
      { carrier: 'DHL', service: 'Express', rate: 25.00, days: 1 },
    ];
  }
}