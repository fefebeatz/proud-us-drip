'use client'
import React from 'react'
import { ProductType } from './ProductGrid'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { ShoppingBag } from 'lucide-react'
import QuantityButtons from './QuantityButtons'
import { useCarStore } from '../store'
import toast from 'react-hot-toast'

interface Props {
  product: ProductType
  className?: string
}

const AddToCardButton = ({ product, className }: Props) => {
  const { addItem, getItemCount } = useCarStore()
  const itemCount = getItemCount(product._id)
  const isOutOfStock = product.stock === 0

  return (
    <div className='w-full h-12 flex items-center'>
      {itemCount ? (
        <div className='w-full text-sm'>
          <div className='flex items-center justify-between pb-1'>
            <span className='text-xs text-muted-foreground'>Quantité</span>
            <QuantityButtons product={product} />
          </div>
          <div className='flex items-center justify-between border-t pt-1'>
            <span className='text-xs font-semibold'>Sous-total</span>
            <span className='text-sm font-semibold text-dark-color'>
              {product.price && product.price * itemCount}{' '}
              €
            </span>
          </div>
        </div>
      ) : (
        <Button
          disabled={isOutOfStock}
          className={cn(
            'w-full flex items-center justify-center gap-2 bg-transparent text-dark-color shadow-none border border-dark-color/30 font-semibold tracking-wide hover:bg-dark-color hover:text-white hoverEffect cursor-pointer text-[10px] md:text-sm lg:text-sm',
            className
          )}
          onClick={() => {
            addItem(product)
            toast.success(
              `${product.name.substring(
                0,
                12
              )}... ajouté au panier avec succès!`
            )
          }}
        >
          <span>Ajouter au panier</span>
          <ShoppingBag className='w-4 h-4' />
        </Button>
      )}
    </div>
  )
}

export default AddToCardButton
