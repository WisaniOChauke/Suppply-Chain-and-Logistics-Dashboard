import { Controller, Get, Param, Query } from '@nestjs/common';
import { CarrierService } from './carriers/carrier.service';
import { WeatherService } from './weather/weather.service';

@Controller('integrations')
export class IntegrationsController {
  constructor(
    private carrierService: CarrierService,
    private weatherService: WeatherService,
  ) {}

  @Get('carriers/track/:carrier/:trackingNumber')
  async trackShipment(
    @Param('carrier') carrier: string,
    @Param('trackingNumber') trackingNumber: string,
  ) {
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
  ) {
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
}