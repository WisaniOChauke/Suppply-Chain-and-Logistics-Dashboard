import { z } from 'zod';

// Core domain entities
export const LocationSchema = z.object({
  id: z.string(),
  name: z.string(),
  code: z.string(),
  type: z.enum(['PORT', 'WAREHOUSE', 'AIRPORT', 'RAIL_TERMINAL']),
  coordinates: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
  timezone: z.string(),
});

export const ShipmentStatusSchema = z.enum([
  'CREATED',
  'PICKED',
  'CONSOLIDATED',
  'LOADED',
  'DEPARTED',
  'IN_TRANSIT',
  'ARRIVED',
  'CLEARED',
  'DELIVERED',
  'EXCEPTION',
]);

export const ShipmentSchema = z.object({
  id: z.string(),
  orderNumber: z.string(),
  containerNumber: z.string().optional(),
  status: ShipmentStatusSchema,
  origin: LocationSchema,
  destination: LocationSchema,
  estimatedDeparture: z.string().datetime(),
  estimatedArrival: z.string().datetime(),
  actualDeparture: z.string().datetime().optional(),
  actualArrival: z.string().datetime().optional(),
  carrier: z.string(),
  mode: z.enum(['OCEAN', 'AIR', 'RAIL', 'TRUCK']),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const EventSchema = z.object({
  id: z.string(),
  shipmentId: z.string(),
  type: ShipmentStatusSchema,
  location: LocationSchema.optional(),
  timestamp: z.string().datetime(),
  description: z.string(),
  metadata: z.record(z.any()).optional(),
});

export const UserRoleSchema = z.enum(['ADMIN', 'PLANNER', 'OPERATOR', 'SUPPLIER', 'CUSTOMER']);

// Type exports
export type Location = z.infer<typeof LocationSchema>;
export type ShipmentStatus = z.infer<typeof ShipmentStatusSchema>;
export type Shipment = z.infer<typeof ShipmentSchema>;
export type Event = z.infer<typeof EventSchema>;
export type UserRole = z.infer<typeof UserRoleSchema>;

// API Response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}