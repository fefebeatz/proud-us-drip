import React from 'react'
import HeaderMenu from './HeaderMenu'
import Logo from './Logo'
import Container from './Container'
import MobileMenu from './MobileMenu'
import SearchBar from './SearchBar'
import CartIcon from './CartIcon'
import { currentUser } from '@clerk/nextjs/server'
import { ClerkLoaded, SignedIn, SignInButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { Heart, ListOrdered } from 'lucide-react'
import Image from 'next/image'
import { getMyOrders } from '@/sanity/lib/orders/getOrdersByCustomer'
import { getAllProductsLikedByCustomer } from '@/sanity/lib/products/getAllProductsLikedByCustomer'

const Header = async () => {
  const user = await currentUser()
  let orders = null
  let favorites = null

  if (user?.id) {
    orders = await getMyOrders(user.id)
    favorites = await getAllProductsLikedByCustomer(user.id)
  }

  return (
    <header className='sticky top-0 bg-white border-b border-gray-400 py-5 w-full z-50'>
      <Container className='flex items-center justify-between gap-7 text-light-color'>
        <HeaderMenu />
        <div className='w-auto md:w-1/3 flex items-center justify-center gap-2.5'>
          <MobileMenu />
          <Logo>
            <Image
              src='/logo.png'
              alt='Proud Us Drip Logo'
              width={100}
              height={30}
              className='object-contain'
            />
          </Logo>
        </div>
        <div className='w-auto md:w-1/3 flex items-center justify-end gap-5'>
          <SearchBar />
          <CartIcon />
          {/* Gestion de l'authentification */}
          <ClerkLoaded>
            <SignedIn>
              {/* Mes commandes */}
              <Link href='/commandes' className='group relative'>
                <ListOrdered className='w-5 h-5 group-hover:text-dark-color hoverEffect' />
                <span className='absolute -top-2 -right-2 bg-dark-color text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-semibold'>
                  {orders?.length && orders?.length}
                </span>
              </Link>
              <Link href='/favoris' className='group relative'>
                <Heart className='w-5 h-5 group-hover:text-dark-color hoverEffect' />
                <span className='absolute -top-2 -right-2 bg-dark-color text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-semibold'>
                  {favorites?.length && favorites?.length}
                </span>
              </Link>
              <UserButton />
            </SignedIn>
            {!user && (
              <SignInButton mode='modal'>
                <button className='text-sm font-semibold hover:text-dark-color hoverEffect cursor-pointer'>
                  Se connecter
                </button>
              </SignInButton>
            )}
          </ClerkLoaded>
        </div>
      </Container>
    </header>
  )
}

export default Header
