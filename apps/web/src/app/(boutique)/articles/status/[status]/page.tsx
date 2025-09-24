import Container from '@/components/Container'
import ProductCard from '@/components/ProductCard'
import { ProductType } from '@/components/ProductGrid'
import { getProductsByStatus } from '@/sanity/lib/products/getProductsByStatus'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'

export async function generateMetadata({
  params,
}: {
  params: { status: string }
}): Promise<Metadata> {
  const { status } = params

  return {
    title: `Articles ${status}`,
    description: `Découvrez tous les articles "${status}" de Proud Us Drip.`,
    openGraph: {
      title: `Articles ${status} | Proud Us Drip`,
      description: `Parcourez les articles "${status}" et restez informé.`,
      url: `https://proud-us-drip.vercel.app/articles/status/${status}`,
      siteName: 'Proud Us Drip',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Articles ${status} | Proud Us Drip`,
      description: `Découvrez les articles "${status}" disponibles.`,
    },
  }
}

const page = async ({ params }: { params: Promise<{ status: string }> }) => {
  const { status } = await params
  const products: ProductType[] = await getProductsByStatus(status)

  if (!products.length) return notFound()

  return (
    <Container>
      <div className='w-full my-6'>
        <h1 className='text-3xl font-bold'>
          Articles - <span className='text-dark-blue'>{status}</span>
        </h1>

        <p className='text-dark-color/80 mt-3'>
          {products.length > 1 || products.length == 0 ? (
            <span>
              <span className='text-dark-color font-semibold'>
                {products.length}
              </span>{' '}
              articles trouvés
            </span>
          ) : (
            <span>
              <span className='text-dark-color font-semibold'>
                {products.length}
              </span>{' '}
              article trouvé
            </span>
          )}
        </p>
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
                  Aucun article n{"'"}est disponible.
                </h2>
              </div>
              <p className='text-gray-600 px-2'>
                Nous sommes désolés, mais aucun article n{"'"}est disponible
                pour{' '}
                <span className='text-base font-semibold text-dark-color'>
                  {status}
                </span>{' '}
                pour le moment.
              </p>
              <div className='flex items-center space-x-2 text-dark-blue'>
                <span>Les articles seront disponibles d{"'"}ici peu.</span>
              </div>
              <p className='text-sm text-gray-600'>
                N{"'"}hésitez pas de consulter les articles d{"'"}autres
                catégories.
              </p>
            </div>
          )}
        </div>
      </div>
    </Container>
  )
}

export default page
