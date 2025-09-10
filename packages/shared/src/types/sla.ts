import { z } from 'zod';

export const SLAStatusSchema = z.enum(['ON_TIME', 'AT_RISK', 'BREACHED']);

export const SLASchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  thresholdHours: z.number(),
  isActive: z.boolean(),
  createdAt: z.string().datetime(),
});

export const SLABreachSchema = z.object({
  id: z.string(),
  shipmentId: z.string(),
  slaId: z.string(),
  status: SLAStatusSchema,
  expectedTime: z.string().datetime(),
  actualTime: z.string().datetime().optional(),
  delayHours: z.number().optional(),
  riskScore: z.number().min(0).max(100),
  createdAt: z.string().datetime(),
});

export const ExceptionTypeSchema = z.enum([
  'DELAY',
  'CUSTOMS_HOLD',
  'WEATHER',
  'MECHANICAL',
  'DOCUMENTATION',
  'SECURITY',
  'OTHER'
]);

export const ExceptionPrioritySchema = z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']);

export const ExceptionStatusSchema = z.enum(['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED']);

export const ExceptionSchema = z.object({
  id: z.string(),
  shipmentId: z.string(),
  type: ExceptionTypeSchema,
  priority: ExceptionPrioritySchema,
  status: ExceptionStatusSchema,
  title: z.string(),
  description: z.string(),
  assignedTo: z.string().optional(),
  resolvedAt: z.string().datetime().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// Type exports
export type SLAStatus = z.infer<typeof SLAStatusSchema>;
export type SLA = z.infer<typeof SLASchema>;
export type SLABreach = z.infer<typeof SLABreachSchema>;
export type ExceptionType = z.infer<typeof ExceptionTypeSchema>;
export type ExceptionPriority = z.infer<typeof ExceptionPrioritySchema>;
export type ExceptionStatus = z.infer<typeof ExceptionStatusSchema>;
export type Exception = z.infer<typeof ExceptionSchema>;