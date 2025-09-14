'use client'

import Container from '@/components/Container'
import EmptyCart from '@/components/EmptyCart'
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
    getGroupedItems,
  } = useCarStore()

  const user = useUser()
  const cartProducts = getGroupedItems()

  useEffect(() => {
    setIsClient(true)
  }, [])
  if (!isClient) {
    return <Loading />
  }
  return (
    <div>
      {isSignedIn ? (
        <Container>
          {cartProducts.length ? (
            <>
              <p></p>
            </>
          ) : (
            <EmptyCart />
          )}
        </Container>
      ) : (
        <NoAccessToCart />
      )}
    </div>
  )
}

export default CartPage
