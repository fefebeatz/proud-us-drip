import { client } from '../client'

export type Order = {
  _id: string
  totalPrice: number
  orderDate: string
}

export async function getFirstOrderMonth() {
  const query = `
    *[_type == "order"] | order(orderDate asc)[0] {
      _id,
      totalPrice,
      orderDate
    }
  `
  const order: Order = await client.fetch(query)

  const date = new Date(order.orderDate)
  const mois = date.toLocaleString('fr-FR', { month: 'long', year: 'numeric' })

  return {
    ...order,
    mois, // ex: "janvier 2024"
  }
}
