import { Injectable } from '@nestjs/common';

@Injectable()
export class BillingService {
  async createSubscription(tenantId: string, plan: 'STARTER' | 'PROFESSIONAL' | 'ENTERPRISE') {
    const plans = {
      STARTER: { price: 99, features: ['Basic tracking', '100 shipments/month'] },
      PROFESSIONAL: { price: 299, features: ['Advanced analytics', '1000 shipments/month', 'API access'] },
      ENTERPRISE: { price: 999, features: ['Unlimited shipments', 'Custom integrations', 'Dedicated support'] }
    };

    return {
      subscriptionId: `sub_${Date.now()}`,
      tenantId,
      plan,
      monthlyPrice: plans[plan].price,
      features: plans[plan].features,
      status: 'ACTIVE',
      nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    };
  }

  async calculateUsageBilling(tenantId: string, month: string) {
    // Mock usage calculation
    const baseUsage = {
      shipmentsTracked: Math.floor(Math.random() * 1000),
      apiCalls: Math.floor(Math.random() * 10000),
      storageGB: Math.floor(Math.random() * 100)
    };

    const costs = {
      shipmentCost: baseUsage.shipmentsTracked * 0.10,
      apiCost: baseUsage.apiCalls * 0.001,
      storageCost: baseUsage.storageGB * 0.05
    };

    return {
      tenantId,
      month,
      usage: baseUsage,
      costs,
      totalCost: Object.values(costs).reduce((sum, cost) => sum + cost, 0)
    };
  }

  async generateInvoice(tenantId: string, billingPeriod: string) {
    const usage = await this.calculateUsageBilling(tenantId, billingPeriod);
    
    return {
      invoiceId: `inv_${Date.now()}`,
      tenantId,
      billingPeriod,
      lineItems: [
        { description: 'Shipment Tracking', quantity: usage.usage.shipmentsTracked, rate: 0.10, amount: usage.costs.shipmentCost },
        { description: 'API Calls', quantity: usage.usage.apiCalls, rate: 0.001, amount: usage.costs.apiCost },
        { description: 'Storage', quantity: usage.usage.storageGB, rate: 0.05, amount: usage.costs.storageCost }
      ],
      subtotal: usage.totalCost,
      tax: usage.totalCost * 0.08,
      total: usage.totalCost * 1.08,
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      status: 'PENDING'
    };
  }
}