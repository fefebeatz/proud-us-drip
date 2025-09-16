import { headers } from 'next/headers'
import stripe from '@/lib/stripe'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.text()
  const sig = (await headers()).get('stripe-signature') as string

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
    } else {
      const session = event.data.object
      console.log('Paiement non validé:', session)
    }

    return NextResponse.json({ received: true })
  } catch (err: any) {
    console.error(err)
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 })
  }
}
