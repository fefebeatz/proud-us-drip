import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Vous n'avez pas fourni la clé: STRIPE_SECRET_KEY")
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-08-27.basil',
})

export default stripe
