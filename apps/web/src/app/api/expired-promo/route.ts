import { backendClient } from '@/sanity/lib/backenClient'
import { NextResponse } from 'next/server'
// ton client Sanity configuré avec token

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const docId = body.ids?.[0] // ID du document modifié

    if (!docId) {
      return NextResponse.json(
        { message: 'No document ID found' },
        { status: 400 }
      )
    }

    // Récupérer le document complet
    const sale = await backendClient.fetch(
      `*[_id == $id][0]{_id, validUntil, isActive}`,
      { id: docId }
    )

    if (!sale) {
      return NextResponse.json(
        { message: 'Document not found' },
        { status: 404 }
      )
    }

    const now = new Date()
    const validUntil = sale.validUntil ? new Date(sale.validUntil) : null

    // Si expiré ET encore actif → on le désactive
    if (validUntil && validUntil < now && sale.isActive) {
      await backendClient.patch(sale._id).set({ isActive: false }).commit()

      return NextResponse.json({
        message: `Promo ${sale._id} désactivée automatiquement.`,
      })
    }

    return NextResponse.json({ message: 'Aucune mise à jour nécessaire.' })
  } catch (err) {
    console.error('Webhook error:', err)
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 })
  }
}
