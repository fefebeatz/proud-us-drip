'use client'

import { useCarStore } from '../store'
import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const CartIcon = () => {
  const { items } = useCarStore()
  return (
    <Link href='/panier' className='group relative'>
      <ShoppingBag className='w-5 h-5 group-hover:text-dark-color hoverEffect' />
      <span className='absolute -top-2 -right-2 bg-dark-color text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-semibold'>
        {items.length ? items.length : 0}
      </span>
    </Link>
  )
}

export default CartIcon
