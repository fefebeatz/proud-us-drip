import AddToCardButton from '@/components/AddToCardButton'
import Container from '@/components/Container'
import ImageView from '@/components/ImageView'
import { LikeButton } from '@/components/LikeButton'
import PriceView from '@/components/PriceView'
import ProductCaracteristics from '@/components/ProductCaracteristics'
import { ProductType } from '@/components/ProductGrid'
import ExpandableText from '@/components/SeeMore'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { urlFor } from '@/sanity/lib/image'
import { getProducts } from '@/sanity/lib/products/getAllProducts'
import { getProductBySlug } from '@/sanity/lib/products/getProductBySlug'
import { currentUser } from '@clerk/nextjs/server'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const { slug } = params
  const product: ProductType = await getProductBySlug(slug)

  if (!product) {
    return {
      title: 'Article introuvable',
      description: 'Cet article n’existe pas ou a été supprimé.',
    }
  }

  return {
    title: product.name,
    description: product.description,
    alternates: {
      canonical: `/article/${product.slug.current}`, // ✅ slug dans la canonical
    },
    openGraph: {
      title: product.name,
      description: product.description || '',
      url: `https://proud-us-drip.vercel.app/article/${product.slug}`, // ✅ slug dans l’URL OG
      images: product.images ? [{ url: urlFor(product.images[0]).url() }] : [],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description || '',
      images: product.images ? [{ url: urlFor(product.images[0]).url() }] : [],
    },
  }
}

// static params
export async function generateStaticParams() {
  const products: ProductType[] = await getProducts()
  return products.map(({ slug }) => slug.current).slice(0, 5)
}

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params
  const product: ProductType = await getProductBySlug(slug)
  const user = await currentUser()

  if (!product) return notFound()

  return (
    <Container className='py-10 flex flex-col md:flex-row gap-10'>
      {/* Aperçu des images */}
      {product.images && (
        <ImageView images={product.images} product={product} />
      )}

      {/* Détails de l'article */}
      <div className='w-full md:w-1/2 flex flex-col gap-5'>
        <h2 className='text-3xl md:text-4xl font-bold mb-2'>{product.name}</h2>
        <div className='flex items-center gap-2'>
          <p className='text-dark-color text-lg md:text-xl'>Prix:</p>
          <PriceView
            price={product.price}
            discount={product?.discount}
            className='text-lg font-bold'
          />
        </div>
        <div className='flex items-center gap-2'>
          <p className='text-dark-color text-lg md:text-xl'>Couleur:</p>
          <div
            className={`w-4 h-4 rounded-full border-none`}
            style={{ backgroundColor: product.color?.hex }}
          ></div>
          <p className='text-gray-600 text-lg md:text-xl'>
            {product.colorName}
          </p>
        </div>

        <>
          {product.status && (
            <Badge
              className={cn('text-lg text-white', {
                'bg-red-500': product.status === 'Hot',
                'bg-green-500': product.status === 'Nouveau',
                'bg-amber-500': product.status === 'Promo',
                'bg-blue-500': product.status === 'Vedette',
              })}
            >
              {product.status === 'Promo' ? (
                <span>
                  {product.status}{' '}
                  <span className='font-semibold'>-{product.discount}%</span>
                </span>
              ) : (
                <span>{product.status}</span>
              )}
            </Badge>
          )}
        </>

        {product.description ? (
          <ExpandableText text={product.description} />
        ) : (
          <p className='text-sm text-gray-600 tracking-wide'>
            {product.description ? product.description : '...'}
          </p>
        )}

        <div className='flex items-center gap-2.5 lg:gap-5 w-full'>
          <AddToCardButton
            product={product}
            className='bg-dark-color/80 text-white hover:bg-dark-color hoverEffect cursor-pointer'
          />
          {user && (
            <LikeButton
              articleId={product._id}
              slug={product.slug.current}
              likes={product.likes || []}
              userId={user?.id ?? ''}
              className='border-2 border-dark-color/30 hover:border-dark-color px-2.5 py-1.5 rounded-md'
            />
          )}
        </div>

        {/* Caratéristiques de l'article */}
        <ProductCaracteristics product={product} />

        {/* <div className='flex flex-wrap items-center justify-between gap-2.5 border-b border-b-gray-200 py-5 -mt-2'>
          <div className='flex items-center gap-2 text-sm text-dark-color hover:text-dark-blue hoverEffect'>
            <BoxIcon className='w-5 h-5' />
            <p>Comparer les couleurs</p>
          </div>
          <div className='flex items-center gap-2 text-sm text-dark-color hover:text-dark-blue hoverEffect'>
            <FileQuestion className='w-5 h-5' />
            <p>Poser une question</p>
          </div>
          <div className='flex items-center gap-2 text-sm text-dark-color hover:text-dark-blue hoverEffect'>
            <Truck className='w-5 h-5' />
            <p>Livraison et retours</p>
          </div>
          <div className='flex items-center gap-2 text-sm text-dark-color hover:text-dark-blue hoverEffect'>
            <Share2 className='w-5 h-5' />
            <p>Partager</p>
          </div>
        </div> */}
      </div>
    </Container>
  )
}

export default page
