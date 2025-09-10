import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2023-10-16',
    });
  }

  async createPaymentIntent(amount: number, currency: string = 'usd', metadata?: any) {
    return await this.stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      metadata,
    });
  }

  async createCustomer(email: string, name: string) {
    return await this.stripe.customers.create({
      email,
      name,
    });
  }

  async processShippingPayment(shipmentId: string, amount: number, paymentMethodId: string) {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: Math.round(amount * 100),
        currency: 'usd',
        payment_method: paymentMethodId,
        confirm: true,
        metadata: {
          shipmentId,
          type: 'shipping_fee',
        },
      });

      return {
        success: true,
        paymentIntentId: paymentIntent.id,
        status: paymentIntent.status,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }
}