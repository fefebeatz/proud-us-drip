'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { ProductType } from './ProductGrid'
import { Badge } from './ui/badge'

interface ImagesProps {
  images?: {
    _key: string
    _type: 'image'
    asset: {
      _ref: string
      _type: 'reference'
    }
  }[]

  product: ProductType
}

const ImageView = ({ images = [], product }: ImagesProps) => {
  const [active, setActive] = useState(images[0])
  const isOutOfStock = product.stock === 0
  return (
    <div className='w-full md:w-1/2 space-y-2 md:space-y-4'>
      <AnimatePresence mode='wait'>
        <motion.div
          key={active._key}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className='relative w-full max-h-[550px] min-h-[450px] border border-dark-color/10 rounded-md group overflow-hidden'
        >
          <Image
            src={urlFor(active.asset).url()}
            alt="Image de l'article"
            width={700}
            height={700}
            priority
            className={`w-full h-96 max-h-[550px] min-h-[500px] object-cover ${isOutOfStock ? 'grayscale' : 'group-hover:scale-110'} hoverEffect rounded-md`}
          />

          {/* Badge stock */}
          {isOutOfStock && (
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
              <Badge className='text-sm text-white bg-dark-color/90'>
                En rupture de stock
              </Badge>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
      {/* Affichage des autres images */}

      <div className='grid grid-cols-6 gap-2 h-20 md:h-28'>
        {images.map((image, index) => (
          <button
            key={index}
            className={`border border-md rounded-md overflow-hidden cursor-pointer ${active._key === image._key ? 'ring-1 ring-dark-color' : ''} hover:ring-1 hover:ring-dark-color`}
            onClick={() => setActive(image)}
          >
            <Image
              src={urlFor(image.asset).url()}
              alt="Image similaire de l'article"
              width={100}
              height={100}
              className='w-full h-auto object-contain'
            />
          </button>
        ))}
      </div>
    </div>
  )
}

export default ImageView
