import { defineQuery } from 'next-sanity'
import { sanityFetch } from '../live'

export async function getProducts() {
  const query = `*[_type == "product"] | order(name asc)`
  const ALL_PRODUCTS_QUERY = defineQuery(query)
  try {
    const products = await sanityFetch({ query: ALL_PRODUCTS_QUERY })
    return products.data || []
  } catch (error) {
    console.error('Erreur lors de la récupération des produits:', error)
    return []
  }
}
