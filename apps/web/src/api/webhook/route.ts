import { headers } from 'next/headers'
import stripe from '@/lib/stripe'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.text()
  const sig = (await headers()).get('Stripe-Signature') as string

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object
      console.log('Paiement validé:', session)
      // Ici tu mets ta logique: créer commande, envoyer email, etc.
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error(err)
    return new NextResponse(`Webhook Error: ${err}`, { status: 400 })
  }
}
