import { Module } from '@nestjs/common';
import { IntegrationsController } from './integrations.controller';
import { CarrierService } from './carriers/carrier.service';
import { WeatherService } from './weather/weather.service';

@Module({
  controllers: [IntegrationsController],
  providers: [CarrierService, WeatherService],
  exports: [CarrierService, WeatherService],
})
export class IntegrationsModule {}