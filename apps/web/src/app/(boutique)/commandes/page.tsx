import Container from '@/components/Container'
import { requiredUser } from '@/hooks/requiredUser'
import React from 'react'

const OrderPage = async () => {
  await requiredUser()
  return (
    <Container>
      <div>Mes commandes</div>
    </Container>
  )
}

export default OrderPage
