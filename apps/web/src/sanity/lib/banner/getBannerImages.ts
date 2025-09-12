import { defineQuery } from 'next-sanity'
import { sanityFetch } from '../live'

export async function getImagesBanner() {
  const sliderQuery = `
  *[_type == "slider"][0]{
    title,
    images[]{
      description,
      "url": image.asset->url
    }
  }
  `
  const SLIDER_IMAGES_QUERY = defineQuery(sliderQuery)
  try {
    const data = await sanityFetch({ query: SLIDER_IMAGES_QUERY })
    return data.data.images || []
  } catch (error) {
    console.error('Erreur lors de la récupération des images du slider:', error)
    return []
  }
}
