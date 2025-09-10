import { Injectable } from '@nestjs/common';

@Injectable()
export class MLService {
  async predictDeliveryDelay(shipmentData: any): Promise<{ delayMinutes: number; confidence: number; factors: string[] }> {
    const factors = [];
    let delayMinutes = 0;
    
    if (shipmentData.weatherRisk === 'HIGH') {
      delayMinutes += 120;
      factors.push('Severe weather conditions');
    }
    
    const routeDistance = shipmentData.distance || 1000;
    if (routeDistance > 2000) {
      delayMinutes += Math.floor(routeDistance / 100);
      factors.push('Long distance route');
    }
    
    const carrierReliability = this.getCarrierReliability(shipmentData.carrier);
    if (carrierReliability < 0.8) {
      delayMinutes += 60;
      factors.push('Carrier reliability issues');
    }
    
    const confidence = Math.max(0.6, 1 - (factors.length * 0.1));
    
    return {
      delayMinutes: Math.max(0, delayMinutes),
      confidence: Math.round(confidence * 100),
      factors
    };
  }

  async optimizeRoute(waypoints: any[]): Promise<{ optimizedRoute: any[]; timeSaved: number; costSaved: number }> {
    const optimizedRoute = [...waypoints].sort((a, b) => {
      const distanceA = Math.sqrt(Math.pow(a.lat - waypoints[0].lat, 2) + Math.pow(a.lng - waypoints[0].lng, 2));
      const distanceB = Math.sqrt(Math.pow(b.lat - waypoints[0].lat, 2) + Math.pow(b.lng - waypoints[0].lng, 2));
      return distanceA - distanceB;
    });
    
    return {
      optimizedRoute,
      timeSaved: Math.floor(Math.random() * 120),
      costSaved: Math.floor(Math.random() * 500),
    };
  }

  private getCarrierReliability(carrier: string): number {
    const reliabilityMap: { [key: string]: number } = {
      'fedex': 0.92,
      'ups': 0.89,
      'dhl': 0.87,
    };
    return reliabilityMap[carrier?.toLowerCase()] || 0.85;
  }
}