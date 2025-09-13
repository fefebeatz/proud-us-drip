import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import Logo from './Logo'
import Image from 'next/image'
import { SignInButton } from '@clerk/nextjs'

const NoAccessToCart = () => {
  return (
    <div className='flex items-center justify-center py-12 md:py-32 bg-gray-100 p-4'>
      <Card className='w-full max-w-md shadow-sm'>
        <CardHeader className='space-y-1'>
          <div className='flex justify-center'>
            <Logo>
              <Image
                src='/logo.png'
                alt='Proud Us Drip Logo'
                width={80}
                height={30}
                className='object-contain'
              />
            </Logo>
          </div>
          <CardTitle className='text-2xl font-bold text-center'>
            Heureux de vous revoir! Prêt(e) à finaliser vos trouvailles ?
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <p>
            Connectez-vous pour retrouver vos articles enregistrés dans votre
            panier
          </p>
          <SignInButton mode='modal'>
            <button className='text-sm font-semibold hover:text-dark-color hoverEffect cursor-pointer'>
              Se connecter
            </button>
          </SignInButton>
        </CardContent>
      </Card>
    </div>
  )
}

export default NoAccessToCart
