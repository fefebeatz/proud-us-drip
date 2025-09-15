'use client'

import Container from '@/components/Container'
import EmptyCart from '@/components/EmptyCart'
import Loading from '@/components/Loading'
import NoAccessToCart from '@/components/NoAccessToCart'
import QuantityButtons from '@/components/QuantityButtons'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { urlFor } from '@/sanity/lib/image'
import { useCarStore } from '@/store'
import { useAuth } from '@clerk/nextjs'
import { Heart, ShoppingBag, Trash } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

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

  const cartProducts = getGroupedItems()

  // Retirer un article du panier
  const handleDeleteProduct = (id: string) => {
    deleteCartProduct(id)
    toast.success('Article retiré du panier!')
  }

  // Vider le panier
  const handleResetCart = () => {
    const confirmed = window.confirm(
      'Êtes-vous sûr de vouloir vider le panier ?'
    )
    if (confirmed) {
      resetCard()
      toast.success('Le panier a été vidé!')
    }
  }

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
                <ShoppingBag />
                <h1 className='text-2xl font-semibold'>Mon panier</h1>
              </div>
              <div className='grid lg:grid-cols-3 md:gap-8'>
                <div className='lg:col-span-2 rounded-lg'>
                  <div className='bg-white rounded-md border'>
                    {cartProducts.map(({ product }) => {
                      const itemCount = getItemCount(product._id)
                      return (
                        <div
                          key={product._id}
                          className='border-b p-2.5 last:border-b-0 flex items-center justify-between gap-5'
                        >
                          <div className='flex flex-1 items-center gap-2 min-h-36 md:min-h-44'>
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
                                  className='w-32 md:w-50 h-32 md:h-40 object-cover group-hover:scale-105 hoverEffect overflow-hidden'
                                />
                              </Link>
                            )}

                            <div className='flex flex-1 flex-col justify-between h-full py-1'>
                              <div className='space-y-1.5'>
                                {/* Nom du produit */}
                                <Link href={`/article/${product.slug.current}`}>
                                  <h2 className='hover:underline font-semibold line-clamp-1'>
                                    {product.name}
                                  </h2>
                                </Link>

                                {/* Intro */}
                                <p className='text-sm text-light-color font-medium'>
                                  {product.intro
                                    ? product.intro
                                    : 'Un incontournable à ajouter à votre collection.'}
                                </p>

                                {/* Variantes */}
                                <p className='text-sm capitalize text-light-color font-medium'>
                                  Caractéristiques:{' '}
                                  {Array.isArray(product.variant) &&
                                  product.variant.length > 0 ? (
                                    <span className='flex flex-wrap gap-2 text-sm font-semibold'>
                                      {product.variant
                                        .slice(0, 2)
                                        .map((v, i) => (
                                          <span
                                            key={i}
                                            className='px-2 py-1 bg-gray-100 rounded-lg'
                                          >
                                            {v}
                                          </span>
                                        ))}
                                      {product.variant.length > 2 && (
                                        <span className='px-2 py-1 bg-gray-200 rounded-lg'>
                                          +{product.variant.length - 2}
                                        </span>
                                      )}
                                    </span>
                                  ) : (
                                    <span className='font-semibold'>
                                      Non définie
                                    </span>
                                  )}
                                </p>

                                {/* Couleur */}
                                <div className='text-sm flex items-center gap-2'>
                                  Couleur:{' '}
                                  <div
                                    className='w-3 h-3 rounded-full border-none'
                                    style={{
                                      backgroundColor: product.color?.hex,
                                    }}
                                  />
                                  <p className='text-sm capitalize text-light-color font-semibold'>
                                    {product.colorName}
                                  </p>
                                </div>

                                {/* Statut */}
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
                              </div>

                              {/* Icônes / actions */}
                              <div className='text-gray-500 flex items-center gap-2'>
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <Heart className='w-4 h-4 md:w-5 md:h-5 hover:text-dark-color cursor-pointer' />
                                    </TooltipTrigger>
                                    <TooltipContent className='font-bold'>
                                      Ajouter aux favoris
                                    </TooltipContent>
                                  </Tooltip>
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <Trash
                                        onClick={() =>
                                          handleDeleteProduct(product._id)
                                        }
                                        className='w-4 h-4 md:w-5 md:h-5 hover:text-dark-color cursor-pointer'
                                      />
                                    </TooltipTrigger>
                                    <TooltipContent className='font-bold bg-red-600'>
                                      Retirer l&apos;article du panier
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                            </div>
                            {/* Afficher le sous-total de l'article */}
                            <div className='flex flex-col items-start justify-between h-36 md:h-44 p-0.5 md:p-1'>
                              <span className='text-lg font-bold text-dark-color'>
                                {product.price * itemCount} €
                              </span>
                              <QuantityButtons product={product} />
                            </div>
                          </div>
                        </div>
                      )
                    })}
                    <Button
                      className='m-5 font-semibold'
                      variant='destructive'
                      onClick={handleResetCart}
                    >
                      Vider le panier
                    </Button>
                  </div>
                </div>

                {/* Résumé commande */}
                <div className='lg:col-span-1'>
                  <div className='hidden md:inline-block w-full bg-white p-6 rounded-lg border'>
                    <h2 className='text-xl mb-4 font-semibold'>
                      Résumé de la commande
                    </h2>
                    <div className='space-y-4'>
                      <div className='flex items-center justify-between'>
                        <span>Sous-total:</span>
                        <span className='text-sm font-semibold text-dark-color'>
                          {getSubTotalPrice()} €
                        </span>
                      </div>
                      <div className='flex items-center justify-between'>
                        <span>Réduction:</span>
                        <span className='text-sm font-semibold text-dark-color'>
                          {getSubTotalPrice() - getTotalPrice()} €
                        </span>
                      </div>
                      <Separator />
                      <div className='flex items-center justify-between'>
                        <span>Total:</span>
                        <span className='text-lg font-bold text-dark-color'>
                          {getTotalPrice()} €
                        </span>
                      </div>
                      <Button
                        className='w-full rounded-full font-semi-bold text-center tracking-wide'
                        size='lg'
                      >
                        Procéder au paiement
                      </Button>
                    </div>
                  </div>
                </div>
                {/* Résumé de la commande au format mobile */}
                <div className='md:hidden fixed bottom-0 left-0 w-full bg-white pt-2'>
                  <div className='p-4 rounded-lg border mx-4'>
                    <h2 className='text-xl mb-4 font-semibold'>
                      Résumé de la commande
                    </h2>
                    <div className='space-y-4'>
                      <div className='flex items-center justify-between'>
                        <span>Sous-total:</span>
                        <span className='text-sm font-semibold text-dark-color'>
                          {getSubTotalPrice()} €
                        </span>
                      </div>
                      <div className='flex items-center justify-between'>
                        <span>Réduction:</span>
                        <span className='text-sm font-semibold text-dark-color'>
                          {getSubTotalPrice() - getTotalPrice()} €
                        </span>
                      </div>
                      <Separator />
                      <div className='flex items-center justify-between'>
                        <span>Total:</span>
                        <span className='text-lg font-bold text-dark-color'>
                          {getTotalPrice()} €
                        </span>
                      </div>
                      <Button
                        className='w-full rounded-full font-semi-bold text-center tracking-wide'
                        size='lg'
                      >
                        Procéder au paiement
                      </Button>
                    </div>
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
