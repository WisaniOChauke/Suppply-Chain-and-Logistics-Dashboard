import { Controller, Get, Param, Query, Post, Body } from '@nestjs/common';
import { CarrierService } from './carriers/carrier.service';
import { WeatherService } from './weather/weather.service';
import { PaymentService } from './payment/payment.service';
import { SAPService } from './erp/sap.service';

@Controller('integrations')
export class IntegrationsController {
  constructor(
    private carrierService: CarrierService,
    private weatherService: WeatherService,
    private paymentService: PaymentService,
    private sapService: SAPService,
  ) {}

  @Get('carriers/track/:carrier/:trackingNumber')
  async trackShipment(
    @Param('carrier') carrier: string,
    @Param('trackingNumber') trackingNumber: string,
  ): Promise<any> {
    return this.carrierService.trackShipment(carrier, trackingNumber);
  }

  @Get('carriers/rates')
  async getCarrierRates(
    @Query('origin') origin: string,
    @Query('destination') destination: string,
    @Query('weight') weight: number,
  ) {
    return this.carrierService.getCarrierRates(origin, destination, weight);
  }

  @Get('weather/route')
  async getWeatherAlongRoute(
    @Query('origin') origin: string,
    @Query('destination') destination: string,
  ): Promise<any> {
    const route = {
      origin: JSON.parse(origin),
      destination: JSON.parse(destination),
    };
    return this.weatherService.getWeatherAlongRoute(route);
  }

  @Get('weather/impact/:shipmentId')
  async getWeatherImpact(@Param('shipmentId') shipmentId: string) {
    return this.weatherService.getWeatherImpact(shipmentId);
  }

  @Post('payment/process')
  async processPayment(@Body() paymentData: { shipmentId: string; amount: number; paymentMethodId: string }) {
    return this.paymentService.processShippingPayment(
      paymentData.shipmentId,
      paymentData.amount,
      paymentData.paymentMethodId
    );
  }

  @Post('erp/sync-shipment')
  async syncShipmentToERP(@Body() data: { shipmentId: string; shipmentData: any }) {
    return this.sapService.syncShipmentData(data.shipmentId, data.shipmentData);
  }

  @Get('erp/inventory/:productId')
  async getInventory(@Param('productId') productId: string) {
    return this.sapService.getInventoryData(productId);
  }
}