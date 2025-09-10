'use client'

import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

function PaymentFormContent({ shipmentId, amount }: { shipmentId: string; amount: number }) {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) return

    setIsProcessing(true)

    const cardElement = elements.getElement(CardElement)
    if (!cardElement) return

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    })

    if (error) {
      setPaymentStatus(`Error: ${error.message}`)
      setIsProcessing(false)
      return
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/integrations/payment/process`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          shipmentId,
          amount,
          paymentMethodId: paymentMethod.id,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setPaymentStatus('Payment successful!')
      } else {
        setPaymentStatus(`Payment failed: ${result.error}`)
      }
    } catch (error) {
      setPaymentStatus('Payment processing error')
    }

    setIsProcessing(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-4 border rounded">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': { color: '#aab7c4' },
              },
            },
          }}
        />
      </div>
      
      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold">Total: ${amount.toFixed(2)}</span>
        <Button type="submit" disabled={!stripe || isProcessing}>
          {isProcessing ? 'Processing...' : 'Pay Now'}
        </Button>
      </div>

      {paymentStatus && (
        <div className={`p-3 rounded ${
          paymentStatus.includes('successful') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {paymentStatus}
        </div>
      )}
    </form>
  )
}

export function PaymentForm({ shipmentId, amount }: { shipmentId: string; amount: number }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Processing</CardTitle>
      </CardHeader>
      <CardContent>
        <Elements stripe={stripePromise}>
          <PaymentFormContent shipmentId={shipmentId} amount={amount} />
        </Elements>
      </CardContent>
    </Card>
  )
}