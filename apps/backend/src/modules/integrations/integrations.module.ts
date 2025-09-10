import { Module } from '@nestjs/common';
import { IntegrationsController } from './integrations.controller';
import { CarrierService } from './carriers/carrier.service';
import { WeatherService } from './weather/weather.service';
import { PaymentService } from './payment/payment.service';
import { SAPService } from './erp/sap.service';

@Module({
  controllers: [IntegrationsController],
  providers: [CarrierService, WeatherService, PaymentService, SAPService],
  exports: [CarrierService, WeatherService, PaymentService, SAPService],
})
export class IntegrationsModule {}