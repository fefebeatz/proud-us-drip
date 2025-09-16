import { headers } from 'next/headers'
import stripe from '@/lib/stripe'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.text()
  const signature = (await headers()).get('stripe-signature')

  // Vérification des prérequis
  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    )
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET is not defined')
    return NextResponse.json(
      { error: 'Webhook secret not configured' },
      { status: 500 }
    )
  }

  try {
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret)

    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object
        console.log('Paiement validé:', session.id)

        // Logique métier ici :
        // - Créer une commande en base de données
        // - Envoyer un email de confirmation
        // - Mettre à jour le stock, etc.

        break

      case 'checkout.session.expired':
        console.log('Session expirée:', event.data.object.id)
        break

      case 'payment_intent.succeeded':
        console.log('Paiement réussi:', event.data.object.id)
        break

      default:
        console.log(`Événement non géré: ${event.type}`)
    }

    return NextResponse.json({ received: true, event: event.type })
  } catch (err) {
    console.error('Webhook error:', err)

    return NextResponse.json(
      { error: `Webhook Error: ${err}` },
      { status: 400 }
    )
  }
}
