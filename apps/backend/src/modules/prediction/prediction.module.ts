import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PredictionController } from './prediction.controller';
import { PredictionService } from './prediction.service';
import { ETAForecast, RiskAssessment } from './prediction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ETAForecast, RiskAssessment])],
  controllers: [PredictionController],
  providers: [PredictionService],
  exports: [PredictionService],
})
export class PredictionModule {}