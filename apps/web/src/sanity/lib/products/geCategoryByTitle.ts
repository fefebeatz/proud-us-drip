import { defineQuery } from 'next-sanity'
import { sanityFetch } from '../live'

export async function getCategoryIdByTitle(title: string) {
  const CATEGORY_BY_TITLE_QUERY = defineQuery(
    `*[_type == "category" && title == $title][0]{ _id }`
  )
  try {
    const category = await sanityFetch({
      query: CATEGORY_BY_TITLE_QUERY,
      params: { title },
    })
    return category.data?._id || null
  } catch (error) {
    console.error("Erreur lors de l'obtention de l'ID de la catégorie:", error)
    return null
  }
}
