import { defineQuery } from 'next-sanity'
import { sanityFetch } from '../live'

export const getMyOrders = async (userId: string) => {
  if (!userId) {
    throw new Error("L'ID de l'utilisateur est requis.")
  }
  const ALL_MY_ORDERS = defineQuery(`
    *[_type == 'order' && clerkUserId == $clerkUserId] | order(orderDate desc){
        ...,products[]{
            ...,product->
        }
    }
    `)
  try {
    const data = await sanityFetch({
      query: ALL_MY_ORDERS,
      params: { clerkUserId: userId },
    })
    return data.data || []
  } catch (error) {
    console.error('Erreur lors de la récupération des commandes:', error)
    return []
  }
}
