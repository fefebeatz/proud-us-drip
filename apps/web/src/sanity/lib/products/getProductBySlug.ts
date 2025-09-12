import { defineQuery } from 'next-sanity'
import { sanityFetch } from '../live'

export async function getProductBySlug(slug: string) {
  const query = defineQuery(
    `*[_type == "product" && slug.current == $slug]| order(name asc) [0]`
  )
  try {
    const product = await sanityFetch({
      query,
      params: { slug },
    })
    return product.data || null
  } catch (error) {
    console.error("Erreur lors de l'obtention du produit:", error)
    return []
  }
}
