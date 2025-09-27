import { backendClient } from '@/sanity/lib/backenClient'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const EMAIL_ENTREPRISE = 'proudusdrip.com'

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ message: 'Email invalide' }, { status: 400 })
    }

    // Vérifier si déjà inscrit
    const existing = await backendClient.fetch(
      `*[_type == "newsletterSubscriber" && email == $email][0]`,
      { email }
    )

    if (existing) {
      return NextResponse.json(
        { message: 'Email déjà inscrit' },
        { status: 400 }
      )
    }

    // Créer un abonné "pending" dans Sanity
    await backendClient.create({
      _type: 'newsletterSubscriber',
      email,
      status: 'pending',
    })

    // Envoyer email de confirmation
    const confirmUrl = `${
      process.env.NEXT_PUBLIC_APP_URL
    }/api/newsletter/confirm?email=${encodeURIComponent(email)}`

    await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [email],
      subject: 'Confirmez votre inscription à la newsletter',
      html: `<p>Merci de vous être inscrit !</p>
             <p><a href="${confirmUrl}">Cliquez ici pour confirmer</a></p>`,
    })

    return NextResponse.json({
      message: 'Vérifiez votre email pour confirmer.',
    })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 })
  }
}
