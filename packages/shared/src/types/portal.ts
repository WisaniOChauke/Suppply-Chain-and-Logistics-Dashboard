import { z } from 'zod';

export const UserRoleSchema = z.enum(['ADMIN', 'OPERATOR', 'SUPPLIER', 'CUSTOMER']);

export const TenantSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(['SUPPLIER', 'CUSTOMER']),
  domain: z.string(),
  isActive: z.boolean(),
  settings: z.record(z.any()),
  createdAt: z.string().datetime(),
});

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  role: UserRoleSchema,
  tenantId: z.string().optional(),
  permissions: z.array(z.string()),
  isActive: z.boolean(),
  lastLogin: z.string().datetime().optional(),
  createdAt: z.string().datetime(),
});

export const NotificationPreferenceSchema = z.object({
  id: z.string(),
  userId: z.string(),
  type: z.enum(['EMAIL', 'SMS', 'PUSH', 'IN_APP']),
  events: z.array(z.string()),
  isEnabled: z.boolean(),
});

export const PortalAccessSchema = z.object({
  userId: z.string(),
  shipmentIds: z.array(z.string()),
  permissions: z.array(z.string()),
  expiresAt: z.string().datetime().optional(),
});

export type UserRole = z.infer<typeof UserRoleSchema>;
export type Tenant = z.infer<typeof TenantSchema>;
export type User = z.infer<typeof UserSchema>;
export type NotificationPreference = z.infer<typeof NotificationPreferenceSchema>;
export type PortalAccess = z.infer<typeof PortalAccessSchema>;