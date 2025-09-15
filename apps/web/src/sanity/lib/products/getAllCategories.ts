import { defineQuery } from 'next-sanity'
import { sanityFetch } from '../live'

export async function getCategories() {
  const query = `
    *[_type == "category"] | order(title asc)
  `
  const ALL_CATEGORIES_QUERY = defineQuery(query)
  try {
    const categories = await sanityFetch({
      query: ALL_CATEGORIES_QUERY,
      stega: true,
      perspective: 'previewDrafts',
    })
    return categories.data || []
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories:', error)
    return []
  }
}
