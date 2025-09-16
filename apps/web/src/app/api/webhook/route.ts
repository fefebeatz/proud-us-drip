// app/api/webhook/route.ts
import stripe from '@/lib/stripe'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs' // important pour stripe.webhooks.constructEvent

export async function POST(req: Request) {
  // Récupère la signature depuis l'objet Request
  const sig = req.headers.get('stripe-signature')
  if (!sig) {
    return new NextResponse('Missing stripe signature', { status: 400 })
  }

  // Lire le body en tant que Buffer (méthode recommandée par Stripe)
  const buf = await req.arrayBuffer()
  const rawBody = Buffer.from(buf)

  try {
    const event = stripe.webhooks.constructEvent(
      rawBody, // Buffer (ou string)
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object
      console.log('Paiement validé:', session)
      // TODO: ta logique (création commande, email, etc.)
    } else if (event.type === 'checkout.session.async_payment_failed') {
      const session = event.data.object
      console.log('Paiement non validé:', session)
      // TODO: ta logique (création commande, email, etc.)
    } else {
      console.log(`Quelque chose d'inattendu s'est produit ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error('Webhook Error:', err)
    return new NextResponse(`Webhook Error: ${err}`, { status: 400 })
  }
}
