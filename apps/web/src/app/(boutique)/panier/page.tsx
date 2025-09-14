'use client'

import Container from '@/components/Container'
import EmptyCart from '@/components/EmptyCart'
import Loading from '@/components/Loading'
import NoAccessToCart from '@/components/NoAccessToCart'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { urlFor } from '@/sanity/lib/image'
import { useCarStore } from '@/store'
import { useAuth, useUser } from '@clerk/nextjs'
import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
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
    <div className='bg-gray-50 pb-52 md:pb-10'>
      {isSignedIn ? (
        <Container>
          {cartProducts.length ? (
            <>
              <div className='flex items-center gap-2 py-5'>
                <ShoppingCart />
                <h1 className='text-2xl font-semibold'>Mon panier</h1>
              </div>
              <div className='grid lg:grid-cols-3 md:gap-8'>
                <div className='lg:col-span-2 rounded-lg'>
                  <div className='bg-white rounded-md border'>
                    {cartProducts.map(({ product }) => (
                      <div
                        key={product._id}
                        className='border-b p-2.5 last:border-b-0 flex items-center justify-between gap-5'
                      >
                        <div className='flex flex-1 items-center gap-2 h-36 md:h-44'>
                          {product.images && (
                            <Link
                              href={`/article/${product.slug.current}`}
                              className='border p-0.5 md:p-1 mr-2 rounded-md overflow-hidden group'
                            >
                              <Image
                                src={urlFor(product.images[0]).url()}
                                alt={product.name}
                                width={500}
                                height={500}
                                loading='lazy'
                                className='w-32 md:w-50 h-32 md:h-40 object-cover group-hover:scale-105 hoverEffect
                                overflow-hidden
                                '
                              />
                            </Link>
                          )}
                          <div className='h-full flex flex-1 items-start flex-col justify-between py-1'>
                            <div className='space-y-1.5'>
                              <Link href={`/article/${product.slug.current}`}>
                                <h2 className='hover:underline font-semibold line-clamp-1'>
                                  {product.name}
                                </h2>
                              </Link>
                              <p className='text-sm text-light-color font-medium'>
                                {product.intro
                                  ? product.intro
                                  : 'Un incontournable à ajouter à votre collection.'}
                              </p>
                              <p className='text-sm capitalize text-light-color font-medium'>
                                Caractéristiques:{' '}
                                <span className='flex flex-wrap gap-2 justify-end text-sm font-semibold'>
                                  {Array.isArray(product.variant) &&
                                  product.variant.length > 0
                                    ? product.variant.map((v, i) => (
                                        <span
                                          key={i}
                                          className='px-2 py-1 bg-gray-100 rounded-lg'
                                        >
                                          {v}
                                        </span>
                                      ))
                                    : 'Non défini'}
                                </span>
                              </p>
                              <div className='flex items-center gap-2'>
                                <div
                                  className={`w-3 h-3 rounded-full border-none`}
                                  style={{
                                    backgroundColor: product.color?.hex,
                                  }}
                                ></div>
                                <p className='text-sm capitalize text-light-color font-medium'>
                                  {product.colorName}
                                </p>
                              </div>
                              <p>
                                {product.status && (
                                  <Badge
                                    className={cn(
                                      'text-sm capitalize font-medium text-white',
                                      {
                                        'bg-red-500': product.status === 'Hot',
                                        'bg-green-500':
                                          product.status === 'Nouveau',
                                        'bg-amber-500':
                                          product.status === 'Promo',
                                        'bg-blue-500':
                                          product.status === 'Vedette',
                                      }
                                    )}
                                  >
                                    {product.status === 'Promo' ? (
                                      <span>
                                        {product.status}{' '}
                                        <span className='font-semibold'>
                                          -{product.discount}%
                                        </span>
                                      </span>
                                    ) : (
                                      <span>{product.status}</span>
                                    )}
                                  </Badge>
                                )}
                              </p>
                            </div>
                            <div>
                              <div>icons</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className='lg:col-span-1'>
                  <div className='hidden md:inline-block w-full bg-white p-6 rounded-lg border'>
                    <h2 className='text-xl mb-4 font-semibold'>
                      Résumé de la commande
                    </h2>
                  </div>
                </div>
              </div>
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
