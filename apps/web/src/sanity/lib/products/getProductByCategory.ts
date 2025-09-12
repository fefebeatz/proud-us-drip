import { defineQuery } from 'next-sanity'
import { getCategoryIdByTitle } from './geCategoryByTitle'
import { sanityFetch } from '../live'

export async function productsByCategory(categoryTitle: string) {
  const query = `*[_type == "product" && category._ref == $categoryId] | order(name asc)`
  const PRODUCT_BY_CATEGORY_QUERY = defineQuery(query)
  try {
    const categoryId = await getCategoryIdByTitle(categoryTitle)
    const products = await sanityFetch({
      query: PRODUCT_BY_CATEGORY_QUERY,
      params: { categoryId },
    })
    return products.data || []
  } catch (error) {
    console.error(
      "Erreur lors de l'obtention des produits par catégorie:",
      error
    )
    return []
  }
}
