'use client'

import Container from '@/components/Container'
import Loading from '@/components/Loading'
import NoAccessToCart from '@/components/NoAccessToCart'
import { useCarStore } from '@/store'
import { useAuth, useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'

const CartPage = () => {
  const [isClient, setIsClient] = useState(false)
  const { isSignedIn } = useAuth()
  const {
    deleteCartProduct,
    getTotalPrice,
    getItemCount,
    getSubTotalPrice,
    resetCard,
  } = useCarStore()
  const user = useUser()

  useEffect(() => {
    setIsClient(true)
  }, [])
  if (!isClient) {
    return <Loading />
  }
  return (
    <div>
      {isSignedIn ? (
        <Container>Panier de {user?.user?.fullName}</Container>
      ) : (
        <NoAccessToCart />
      )}
    </div>
  )
}

export default CartPage
