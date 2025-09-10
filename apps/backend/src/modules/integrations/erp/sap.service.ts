import { Injectable } from '@nestjs/common';

@Injectable()
export class SAPService {
  private baseUrl: string;
  private credentials: string;

  constructor() {
    this.baseUrl = process.env.SAP_API_URL;
    this.credentials = Buffer.from(`${process.env.SAP_USERNAME}:${process.env.SAP_PASSWORD}`).toString('base64');
  }

  async syncShipmentData(shipmentId: string, shipmentData: any) {
    try {
      const response = await fetch(`${this.baseUrl}/shipments`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${this.credentials}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          shipmentId,
          ...shipmentData,
          timestamp: new Date().toISOString(),
        }),
      });

      return await response.json();
    } catch (error) {
      console.error('SAP sync error:', error);
      throw error;
    }
  }

  async getInventoryData(productId: string) {
    try {
      const response = await fetch(`${this.baseUrl}/inventory/${productId}`, {
        headers: {
          'Authorization': `Basic ${this.credentials}`,
        },
      });

      return await response.json();
    } catch (error) {
      console.error('SAP inventory error:', error);
      return null;
    }
  }

  async createPurchaseOrder(orderData: any) {
    try {
      const response = await fetch(`${this.baseUrl}/purchase-orders`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${this.credentials}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      return await response.json();
    } catch (error) {
      console.error('SAP PO creation error:', error);
      throw error;
    }
  }
}