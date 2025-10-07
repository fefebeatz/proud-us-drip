import { client } from '@/sanity/lib/client'

export async function getArticleCountByCategory() {
  const query = `*[_type == "category"]{
    title,
    "slug": slug.current,
    "articleCount": count(*[_type == "product" && references(^._id)])
  }`

  const data = await client.fetch(query)

  return data
}
