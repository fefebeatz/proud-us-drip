import React from 'react'
import { ProductType } from './ProductGrid'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import PriceView from './PriceView'
import AddToCardButton from './AddToCardButton'
import { Badge } from './ui/badge'
import { cn } from '@/lib/utils'

interface Props {
  product: ProductType
}

const ProductCard = ({ product }: Props) => {
  return (
    <div className='group text-sm rounded-lg overflow-hidden'>
      <div className='overflow-hidden w-full h-72 relative'>
        {product.images && (
          <Link href={`/article/${product.slug.current}`}>
            <Image
              src={urlFor(product.images[0])
                .width(500)
                .height(500)
                .fit('crop')
                .url()}
              width={500}
              height={500}
              alt={product.name}
              priority
              className={`w-full h-full object-cover hoverEffect transition-transform duration-300 ${
                product.stock === 0 ? 'grayscale' : 'group-hover:scale-105'
              }`}
            />
          </Link>
        )}

        {/* Badge stock */}
        {product.stock === 0 && (
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <Badge className='text-sm text-white bg-dark-color/90'>
              En rupture de stock
            </Badge>
          </div>
        )}

        {/* Badge nouveauté */}
        {product.status && (
          <div className='absolute top-3 right-3'>
            <Badge
              className={cn('text-sm text-white', {
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
          </div>
        )}
      </div>

      <div className='py-3 px-2 flex flex-col gap-2.5 bg-zinc-50 border border-t-0 rounded-lg rounded-tl-none rounded-tr-none h-auto'>
        <Link href={`/article/${product.slug.current}`}>
          <h2 className='font-semibold line-clamp-1 hover:underline'>
            {product.name}
          </h2>
        </Link>
        <p className='text-gray-600 text-sm line-clamp-1'>
          {product.intro
            ? product.intro
            : 'Un incontournable à ajouter à votre collection.'}
        </p>

        <PriceView price={product.price} discount={product?.discount} />

        <div className='flex items-center gap-2'>
          <div
            className={`w-3 h-3 rounded-full border-none`}
            style={{ backgroundColor: product.color?.hex }}
          ></div>
          <p className='text-gray-600 text-sm font-semibold'>
            {product.colorName}
          </p>
        </div>
        {/* Bouton ajouter au panier */}
        <AddToCardButton product={product} />
      </div>
    </div>
  )
}

export default ProductCard
