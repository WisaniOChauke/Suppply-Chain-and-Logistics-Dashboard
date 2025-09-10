import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ETAForecast, RiskAssessment } from './prediction.entity';

@Injectable()
export class PredictionService {
  constructor(
    @InjectRepository(ETAForecast)
    private etaForecastRepository: Repository<ETAForecast>,
    @InjectRepository(RiskAssessment)
    private riskAssessmentRepository: Repository<RiskAssessment>,
  ) {}

  async generateETAForecast(shipmentId: string, shipmentData: any): Promise<ETAForecast> {
    // Simple ML-like prediction algorithm
    const baseDelay = this.calculateBaseDelay(shipmentData);
    const weatherImpact = this.getWeatherImpact(shipmentData.route);
    const trafficImpact = this.getTrafficImpact(shipmentData.route);
    
    const totalDelayMinutes = baseDelay + weatherImpact + trafficImpact;
    const confidence = this.calculateConfidence(shipmentData);
    
    const originalETA = new Date(shipmentData.estimatedArrival);
    const predictedETA = new Date(originalETA.getTime() + totalDelayMinutes * 60000);
    
    const forecast = this.etaForecastRepository.create({
      shipmentId,
      originalETA,
      predictedETA,
      confidence,
      delayMinutes: totalDelayMinutes,
      factors: this.getDelayFactors(weatherImpact, trafficImpact),
      modelVersion: 'v1.0',
    });
    
    return this.etaForecastRepository.save(forecast);
  }

  async generateRiskAssessment(shipmentId: string, shipmentData: any): Promise<RiskAssessment> {
    const factors = this.analyzeRiskFactors(shipmentData);
    const overallRisk = this.calculateOverallRisk(factors);
    const riskLevel = this.getRiskLevel(overallRisk);
    const recommendations = this.generateRecommendations(factors);
    
    const assessment = this.riskAssessmentRepository.create({
      shipmentId,
      overallRisk,
      riskLevel,
      factors,
      recommendations,
      nextReview: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    });
    
    return this.riskAssessmentRepository.save(assessment);
  }

  private calculateBaseDelay(shipmentData: any): number {
    // Mock algorithm based on carrier performance
    const carrierDelays = {
      'Maersk Line': 15,
      'MSC': 25,
      'COSCO': 20,
    };
    return carrierDelays[shipmentData.carrier] || 30;
  }

  private getWeatherImpact(route: any): number {
    // Mock weather impact calculation
    return Math.random() * 60; // 0-60 minutes
  }

  private getTrafficImpact(route: any): number {
    // Mock traffic impact calculation
    return Math.random() * 45; // 0-45 minutes
  }

  private calculateConfidence(shipmentData: any): number {
    // Mock confidence calculation
    return Math.floor(75 + Math.random() * 20); // 75-95%
  }

  private getDelayFactors(weather: number, traffic: number): string[] {
    const factors = [];
    if (weather > 30) factors.push('WEATHER');
    if (traffic > 30) factors.push('TRAFFIC');
    if (Math.random() > 0.7) factors.push('CUSTOMS');
    return factors;
  }

  private analyzeRiskFactors(shipmentData: any): any[] {
    return [
      {
        type: 'WEATHER',
        impact: 'MEDIUM',
        probability: 65,
        description: 'Potential storm system along route'
      },
      {
        type: 'CUSTOMS',
        impact: 'LOW',
        probability: 25,
        description: 'Standard customs processing expected'
      }
    ];
  }

  private calculateOverallRisk(factors: any[]): number {
    return Math.floor(30 + Math.random() * 40); // 30-70%
  }

  private getRiskLevel(risk: number): string {
    if (risk < 25) return 'LOW';
    if (risk < 50) return 'MEDIUM';
    if (risk < 75) return 'HIGH';
    return 'CRITICAL';
  }

  private generateRecommendations(factors: any[]): string[] {
    return [
      'Monitor weather conditions along route',
      'Prepare alternative routing options',
      'Notify customer of potential delays'
    ];
  }

  async getLatestForecast(shipmentId: string): Promise<ETAForecast> {
    return this.etaForecastRepository.findOne({
      where: { shipmentId },
      order: { createdAt: 'DESC' }
    });
  }

  async getLatestRiskAssessment(shipmentId: string): Promise<RiskAssessment> {
    return this.riskAssessmentRepository.findOne({
      where: { shipmentId },
      order: { createdAt: 'DESC' }
    });
  }
}