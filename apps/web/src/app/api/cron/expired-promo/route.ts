import { NextResponse } from 'next/server'
import { backendClient } from '@/sanity/lib/backenClient'

export async function GET() {
  try {
    const now = new Date().toISOString()

    // Récupérer toutes les promos actives dont la date d'expiration est dépassée
    const expiredSales = await backendClient.fetch(
      `*[_type == "sale" && isActive == true && defined(validUntil) && validUntil < $now]{_id}`,
      { now }
    )

    if (!expiredSales.length) {
      return NextResponse.json({ message: 'Aucune promo expirée trouvée.' })
    }

    // Construire une transaction pour désactiver toutes les promos expirées
    const transaction = backendClient.transaction()

    expiredSales.forEach((sale: { _id: string }) => {
      transaction.patch(sale._id, { set: { isActive: false } })
    })

    await transaction.commit()

    return NextResponse.json({
      success: true,
      message: `${expiredSales.length} promotion(s) désactivée(s).`,
      updatedIds: expiredSales.map((s: { _id: string }) => s._id),
    })
  } catch (err: any) {
    return NextResponse.json(
      { error: `Erreur interne: ${err.message || err}` },
      { status: 500 }
    )
  }
}
