'use server'
import { defineQuery } from 'next-sanity'
import { sanityFetch } from '../live'

export async function getSearchedProducts(searchTerm: string) {
  const query = `*[_type == "product" && name match $searchTerm] | order(name asc)`
  const SEARCHED_PRODUCTS_QUERY = defineQuery(query)
  try {
    const productsByCategory = await sanityFetch({
      query: SEARCHED_PRODUCTS_QUERY,
      params: { searchTerm: `*${searchTerm}*` },
    })
    return productsByCategory.data || []
  } catch (error) {
    console.error('Erreur lors de la récupération des produits:', error)
    return []
  }
}
