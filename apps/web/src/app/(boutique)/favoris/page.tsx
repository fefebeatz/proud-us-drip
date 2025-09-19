import Container from '@/components/Container'
import ProductCard from '@/components/ProductCard'
import { ProductType } from '@/components/ProductGrid'
import { Button } from '@/components/ui/button'
import { getAllProductsLikedByCustomer } from '@/sanity/lib/products/getAllProductsLikedByCustomer'
import { currentUser } from '@clerk/nextjs/server'
import Link from 'next/link'
import React from 'react'

const page = async () => {
  const user = await currentUser()
  const products = await getAllProductsLikedByCustomer(user!.id)

  return (
    <Container>
      <div className='w-full my-6'>
        <h1 className='text-3xl font-bold'>Vos coups de coeur</h1>
        <div>
          {products.length ? (
            <div className='grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4 mt-10 w-full'>
              {products.map((product: ProductType) => (
                <div key={product._id}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className='flex flex-col items-center justify-center py-10 min-h-80 space-y-4 text-center bg-gray-100 rounded-lg w-full mt-10'>
              <div>
                <h2 className='text-2xl font-bold text-gray-800'>
                  Vos coups de coeur vous attendent...
                </h2>
              </div>
              <p className='text-gray-600 px-2'>
                Ajoutez vos articles préférés en cliquant sur l&apos;icône like
                et retrouvez-les ici.
              </p>
              <Button asChild className='mt-6'>
                <Link href='/'>Parcourir les articles</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </Container>
  )
}

export default page
