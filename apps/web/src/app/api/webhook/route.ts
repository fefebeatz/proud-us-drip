// import { Metadata } from "@/actions/createCheckOutSession";
import stripe from '@/lib/stripe'
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

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    try {
      // const order = await createOrderSanity(session);
      // console.log("Commande créée dans sanity:", order)
      console.log('Paiement effectué avec succès!')
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

// async function createOrderSanity(session: Stripe.Checkout.Session) {
//     const {
//         id,
//         amount_total,
//         currency,
//         metadata,
//         payment_intent,
//         customer,
//         total_details
//     } = session;

//     const { orderNumber, customerName, customerEmail, clerkUserId } = metadata as Metadata;

//     const lineItemsWithProduct = await stripe.checkout.sessions.listLineItems(id, { expand: ["data.price.product"] });

//     // Préparation des produits pour la commande + mise à jour du stock
//     const sanityProducts = await Promise.all(
//         lineItemsWithProduct.data.map(async (item) => {
//             const stripeProduct = item.price?.product as Stripe.Product;
//             const sanityProductId = stripeProduct?.metadata?.id;

//             if (!sanityProductId) return null;

//             // Mise à jour du stock dans Sanity
//             try {
//                 const sanityProduct = await client.getDocument(sanityProductId);
//                 if (sanityProduct && typeof sanityProduct.stock === "number") {
//                     const quantity = item.quantity ?? 0;
//                     const newStock = Math.max(sanityProduct.stock - quantity, 0);

//                     await client
//                         .patch(sanityProductId)
//                         .set({ stock: newStock })
//                         .commit();
//                 }
//             } catch (err) {
//                 console.error(`Erreur mise à jour du stock pour le produit ${sanityProductId}`, err);
//             }

//             return {
//                 _key: crypto.randomUUID(),
//                 product: {
//                     _type: "reference",
//                     _ref: sanityProductId,
//                 },
//                 quantity: item.quantity || 0
//             };
//         })
//     );

//     const filteredProducts = sanityProducts.filter(Boolean);

//     const order = await client.create({
//         _type: "order",
//         orderNumber,
//         momoCheckoutSessionID: id,
//         momoPaymentIntentID: payment_intent,
//         customerName,
//         momoCustomerID: customer,
//         clerkUserId: clerkUserId,
//         customerEmail: customerEmail,
//         email: customerEmail,
//         currency,
//         amountDiscount: total_details?.amount_discount ?? 0,
//         products: filteredProducts,
//         totalPrice: amount_total ?? 0,
//         status: "paid",
//         orderDate: new Date().toISOString(),
//     });

//     return order;
// }
