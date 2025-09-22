import { MetaData } from '@/actions/createCheckOutSession'
import stripe from '@/lib/stripe'
import { backendClient } from '@/sanity/lib/backenClient'
import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const headersList = await headers()
  const sig = headersList.get('stripe-signature')

  if (!sig) {
    return NextResponse.json({ error: 'Pas de signature' }, { status: 400 })
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!webhookSecret) {
    console.log("Le webhook de stripe n'a pas été défini")
    return NextResponse.json(
      {
        error: "Le webhook de stripe n'a pas été défini",
      },
      { status: 400 }
    )
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  } catch (error) {
    console.error('La vérification de la signature du Webhook a échoué:', error)
    return NextResponse.json(
      { error: `Erreur webhook: ${error}` },
      { status: 400 }
    )
  }

  // tout se passe bien
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const invoice = session.invoice
      ? await stripe.invoices.retrieve(session.invoice as string)
      : null

    // livraison
    // const selectedShippingRate = session.shipping_cost
    //   ? await stripe.shippingRates.retrieve(
    //       session.shipping_cost.shipping_rate as string
    //     )
    //   : null
    const shippingTotal = session.shipping_cost?.amount_total ?? 0
    try {
      const order = await createOrderSanity(session, invoice, shippingTotal)
      console.log('Commande créée dans sanity:', order)
    } catch (error) {
      console.error(
        'Erreur lors de la création de la commande dans Sanity:',
        error
      )
      return NextResponse.json(
        {
          error: `Erreur lors de la création de la commande dans Sanity: ${error}`,
        },
        { status: 500 }
      )
    }
  }

  return NextResponse.json({ received: true })
}

const createOrderSanity = async (
  session: Stripe.Checkout.Session,
  invoice: Stripe.Invoice | null,
  shippingTotal: number
) => {
  const {
    id,
    amount_total,
    currency,
    metadata,
    payment_intent,
    customer,
    total_details,
  } = session

  const { orderNumber, customerName, customerEmail, clerkUserId } =
    metadata as unknown as MetaData

  const lineItemsWithProduct = await stripe.checkout.sessions.listLineItems(
    id,
    { expand: ['data.price.product'] }
  )

  // Préparation des produits pour la commande + mise à jour du stock
  const sanityProducts = await Promise.all(
    lineItemsWithProduct.data.map(async (item) => {
      const stripeProduct = item.price?.product as Stripe.Product
      const sanityProductId = stripeProduct?.metadata?.id

      if (!sanityProductId) return null

      // Mise à jour du stock dans Sanity
      try {
        const sanityProduct = await backendClient.getDocument(sanityProductId)
        if (sanityProduct && typeof sanityProduct.stock === 'number') {
          const quantity = item.quantity ?? 0
          const newStock = Math.max(sanityProduct.stock - quantity, 0)

          await backendClient
            .patch(sanityProductId)
            .set({ stock: newStock })
            .commit()
        }
      } catch (err) {
        console.error(
          `Erreur mise à jour du stock pour le produit ${sanityProductId}`,
          err
        )
      }

      return {
        _key: crypto.randomUUID(),
        product: {
          _type: 'reference',
          _ref: sanityProductId,
        },
        quantity: item.quantity || 0,
      }
    })
  )

  const filteredProducts = sanityProducts.filter(Boolean)

  const order = await backendClient.create({
    _type: 'order',
    orderNumber,
    stripeCheckOutSessionId: id,
    stripePaiementIntent: payment_intent,
    customerName,
    stripeCustomerId: customer,
    clerkUserId: clerkUserId,
    customerEmail: customerEmail,
    currency,
    amountDiscount: total_details?.amount_discount
      ? total_details?.amount_discount / 100
      : 0,
    products: filteredProducts,
    totalPrice: amount_total ? amount_total / 100 : 0,
    status: 'Payé',
    orderDate: new Date().toISOString(),
    invoice: invoice
      ? {
          id: invoice.id,
          number: invoice.number,
          hosted_invoice_url: invoice.hosted_invoice_url,
        }
      : null,
    shipping: shippingTotal ? shippingTotal / 100 : 0,
  })

  return order
}
