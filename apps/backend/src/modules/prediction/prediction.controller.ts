import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { PredictionService } from './prediction.service';

@Controller('predictions')
export class PredictionController {
  constructor(private readonly predictionService: PredictionService) {}

  @Get('eta/:shipmentId')
  async getETAForecast(@Param('shipmentId') shipmentId: string) {
    return this.predictionService.getLatestForecast(shipmentId);
  }

  @Get('risk/:shipmentId')
  async getRiskAssessment(@Param('shipmentId') shipmentId: string) {
    return this.predictionService.getLatestRiskAssessment(shipmentId);
  }

  @Post('eta/:shipmentId')
  async generateETAForecast(
    @Param('shipmentId') shipmentId: string,
    @Body() shipmentData: any
  ) {
    return this.predictionService.generateETAForecast(shipmentId, shipmentData);
  }

  @Post('risk/:shipmentId')
  async generateRiskAssessment(
    @Param('shipmentId') shipmentId: string,
    @Body() shipmentData: any
  ) {
    return this.predictionService.generateRiskAssessment(shipmentId, shipmentData);
  }
}