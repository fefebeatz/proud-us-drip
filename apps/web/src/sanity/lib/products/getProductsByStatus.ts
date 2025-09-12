import { defineQuery } from 'next-sanity'
import { sanityFetch } from '../live'

export async function getProductsByStatus(status: string) {
  const query = `*[_type == "product" && status == $status] | order(name asc)`
  const PRODUCTS_BY_STATUS_QUERY = defineQuery(query)
  try {
    const products = await sanityFetch({
      query: PRODUCTS_BY_STATUS_QUERY,
      params: { status },
    })
    return products.data || []
  } catch (error) {
    console.error(
      'Erreur lors de la récupération des produits par statut:',
      error
    )
    return []
  }
}
