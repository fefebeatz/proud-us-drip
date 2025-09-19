import { client } from '../client'

export const getAllProductsLikedByCustomer = async (userId: string) => {
  const likedProductsQuery = `
  *[_type == "product" && $userId in likes[]] | order(name asc)
`
  const products = await client.fetch(likedProductsQuery, { userId: userId })
  return products
}
