import { Order } from '@/app/(boutique)/commandes/page'
import React from 'react'

interface Props {
  orders: Order[]
}

const OrdersComponent = async ({ orders }: Props) => {
  return <div>OrdersComponent</div>
}

export default OrdersComponent
