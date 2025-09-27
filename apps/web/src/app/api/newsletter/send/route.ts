import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { client } from '@/sanity/lib/client'
import { ProductType } from '@/components/ProductGrid'
import { urlFor } from '@/sanity/lib/image'

const resend = new Resend(process.env.RESEND_API_KEY)
const EMAIL_ENTREPRISE = 'proudusdrip.com'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    // Vérifier qu'on reçoit bien un article
    if (body._type !== 'product') {
      return NextResponse.json({ message: 'Pas un article' }, { status: 200 })
    }

    // Récupérer les infos de l’article (titre, slug, image)
    const article: ProductType = await client.fetch(
      `*[_type == "product" && _id == $id][0]`,
      { id: body._id }
    )

    if (!article) {
      return NextResponse.json(
        { message: 'Article introuvable' },
        { status: 404 }
      )
    }

    // Récupérer tous les abonnés confirmés
    const subscribers = await client.fetch(
      `*[_type == "newsletterSubscriber" && status == "confirmed"]{email}`
    )

    if (!subscribers.length) {
      return NextResponse.json(
        { message: 'Aucun abonné confirmé' },
        { status: 200 }
      )
    }

    // Construire le contenu du mail
    const articleUrl = `${process.env.VERCEL_URL}/article/${article.slug}`

    const htmlContent = `
      <h2>${article.name}</h2>
      ${
        article.images
          ? `<img src="${urlFor(article.images[0]).url()}" alt="${
              article.name
            }" width="600" />`
          : ''
      }
      <p>${article.intro || 'Découvrez notre nouvel article !'}</p>
      <p><a href="${articleUrl}" style="display:inline-block;padding:10px 15px;background:#2563eb;color:white;border-radius:5px;text-decoration:none;">Lire l'article</a></p>
    `

    // Envoi en batch
    for (const sub of subscribers) {
      await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: [sub.email],
        subject: `Nouvel article : ${article.name}`,
        html: htmlContent,
      })
    }

    return NextResponse.json({ message: 'Newsletter envoyée' })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 })
  }
}
