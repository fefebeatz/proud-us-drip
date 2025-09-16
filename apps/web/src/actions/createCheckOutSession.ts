'use server'
import stripe from '@/lib/stripe'
import { urlFor } from '@/sanity/lib/image'
import { CartItem } from '@/store'
import Stripe from 'stripe'

export interface MetaData {
  orderNumber: string
  customerName: string
  customerEmail: string
  clerkUserId: string
}

export interface CartItems {
  products: CartItem['product']
  quantity: number
}

const baseURL =
  process.env.NODE_ENV === 'production'
    ? `https://${process.env.VERCEL_URL}`
    : `${process.env.NEXT_PUBLIC_BASE_URL}`

export const createCheckOutSession = async (
  items: CartItem[],
  metadata: MetaData
) => {
  try {
    const customers = await stripe.customers.list({
      email: metadata.customerEmail,
      limit: 1,
    })
    const customerId = customers.data.length > 0 ? customers.data[0]?.id : ''
    const sessionPayload: Stripe.Checkout.SessionCreateParams = {
      metadata: {
        orderNumber: metadata.orderNumber,
        customerName: metadata.customerName,
        customerEmail: metadata.customerEmail,
        clerkUserId: metadata.clerkUserId,
      },
      mode: 'payment',
      payment_method_types: ['card'],
      allow_promotion_codes: true,
      customer: customerId || undefined,
      invoice_creation: {
        enabled: true,
      },
      success_url: `${baseURL}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`,
      cancel_url: `${baseURL}/panier`,
      line_items: items.map((item) => ({
        price_data: {
          currency: 'eur',
          unit_amount: Math.round(
            item.product.discount
              ? item.product.price * (1 - item.product.discount / 100) * 100
              : item.product.price * 100
          ),
          product_data: {
            name: item.product.name,
            description: item.product.description,
            metadata: {
              id: item.product._id,
            },
            images:
              item.product.images && item.product.images.length > 0
                ? [urlFor(item.product.images[0]).url()]
                : undefined,
          },
        },
        quantity: item.quantity,
      })),
    }
    if (customerId) {
      sessionPayload.customer = customerId
    } else {
      sessionPayload.customer_email = metadata.customerEmail
    }

    const session = await stripe.checkout.sessions.create(sessionPayload)
    return session.url
  } catch (error) {
    console.error('Erreur lors de la création de la session:', error)
    throw error
  }
}
