import { NextResponse } from 'next/server'
import { backendClient } from '@/sanity/lib/backenClient'

export async function GET() {
  try {
    const now = new Date().toISOString()

    // Récupérer toutes les promos actives dont la date est dépassée
    const expiredSales = await backendClient.fetch(
      `*[_type == "sale" && isActive == true && defined(validUntil) && validUntil < $now]{_id}`,
      { now }
    )

    if (expiredSales.length === 0) {
      return NextResponse.json({ message: 'Aucune promo expirée trouvée.' })
    }

    // Désactiver toutes les promos expirées
    const patches = expiredSales.map((sale: { _id: string }) =>
      backendClient.patch(sale._id).set({ isActive: false })
    )

    await backendClient.transaction(patches).commit()

    return NextResponse.json({
      message: `${expiredSales.length} promos désactivées automatiquement.`,
    })
  } catch (err) {
    return NextResponse.json(
      { error: `Erreur interne: ${err}` },
      { status: 500 }
    )
  }
}
