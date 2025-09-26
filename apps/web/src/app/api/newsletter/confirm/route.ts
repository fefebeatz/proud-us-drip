import { backendClient } from '@/sanity/lib/backenClient'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const email = searchParams.get('email')

  if (!email) {
    return NextResponse.json({ message: 'Email manquant' }, { status: 400 })
  }

  const subscriber = await backendClient.fetch(
    `*[_type == "newsletterSubscriber" && email == $email][0]`,
    { email }
  )

  if (!subscriber) {
    return NextResponse.json(
      { message: 'Utilisateur introuvable' },
      { status: 404 }
    )
  }

  await backendClient
    .patch(subscriber._id)
    .set({ status: 'confirmed' })
    .commit()

  return NextResponse.redirect(
    `https://${process.env.VERCEL_URL}/newsletter/confirmed`
  )
}
