import React from 'react'
import { ProductType } from './ProductGrid'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion'

interface Props {
  product: ProductType
}

const ProductCaracteristics = ({ product }: Props) => {
  const isOutOfStock = product.stock === 0
  return (
    <Accordion type='single' collapsible>
      <AccordionItem value='item-1'>
        <AccordionTrigger className='cursor-pointer'>
          {product.name}: Caractéristiques
        </AccordionTrigger>
        <AccordionContent className='flex flex-col gap-1'>
          <p className='flex items-center justify-between'>
            Marque:{' '}
            <span className='font-semibold tracking-wide'>Proud Us Drip</span>
          </p>
          <p className='flex items-start justify-between gap-2'>
            <span>Type:</span>
            <span className='flex flex-wrap gap-2 justify-end text-sm font-semibold'>
              {Array.isArray(product.variant) && product.variant.length > 0
                ? product.variant.map((v, i) => (
                    <span key={i} className='px-2 py-1 bg-gray-100 rounded-lg'>
                      {v}
                    </span>
                  ))
                : 'Non défini'}
            </span>
          </p>
          <p className='flex items-center justify-between'>
            Stock:{' '}
            <span
              className={`font-semibold tracking-wide ${isOutOfStock ? 'text-red-500' : ''}`}
            >
              {isOutOfStock ? 'En rupture de stock' : 'Disponible'}
            </span>
          </p>
          <p className='flex items-center justify-between'>
            Point forts:{' '}
            <span className='font-semibold tracking-wide'>
              {product.intro ? product.intro : 'Non défini'}
            </span>
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default ProductCaracteristics
