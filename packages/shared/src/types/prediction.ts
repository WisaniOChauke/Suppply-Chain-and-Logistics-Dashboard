import { z } from 'zod';

export const ETAForecastSchema = z.object({
  id: z.string(),
  shipmentId: z.string(),
  originalETA: z.string().datetime(),
  predictedETA: z.string().datetime(),
  confidence: z.number().min(0).max(100),
  delayMinutes: z.number(),
  factors: z.array(z.string()),
  modelVersion: z.string(),
  createdAt: z.string().datetime(),
});

export const RiskFactorSchema = z.object({
  type: z.enum(['WEATHER', 'TRAFFIC', 'CUSTOMS', 'CARRIER', 'ROUTE', 'SEASONAL']),
  impact: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
  probability: z.number().min(0).max(100),
  description: z.string(),
});

export const RiskAssessmentSchema = z.object({
  id: z.string(),
  shipmentId: z.string(),
  overallRisk: z.number().min(0).max(100),
  riskLevel: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
  factors: z.array(RiskFactorSchema),
  recommendations: z.array(z.string()),
  nextReview: z.string().datetime(),
  createdAt: z.string().datetime(),
});

export const PredictionMetricsSchema = z.object({
  accuracy: z.number().min(0).max(100),
  totalPredictions: z.number(),
  correctPredictions: z.number(),
  avgDelayPrediction: z.number(),
  modelPerformance: z.record(z.number()),
});

export type ETAForecast = z.infer<typeof ETAForecastSchema>;
export type RiskFactor = z.infer<typeof RiskFactorSchema>;
export type RiskAssessment = z.infer<typeof RiskAssessmentSchema>;
export type PredictionMetrics = z.infer<typeof PredictionMetricsSchema>;