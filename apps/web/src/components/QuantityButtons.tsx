import React from 'react'
import { ProductType } from './ProductGrid'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { Minus, Plus } from 'lucide-react'
import { useCarStore } from '../store'
import toast from 'react-hot-toast'

interface Props {
  product: ProductType
  className?: string
}

const QuantityButtons = ({ product, className }: Props) => {
  const { addItem, getItemCount, removeItem } = useCarStore()
  const itemCount = getItemCount(product._id)
  const isOutOfStock = product.stock === 0
  const handleRemoveProduct = () => {
    removeItem(product._id)
    const message =
      itemCount > 1
        ? 'Quantité mise à jour'
        : `${product.name.substring(0, 12)}... supprimé du panier`
    toast.success(message)
  }

  return (
    <div className={cn('flex items-center gap-1 text-base pb-1', className)}>
      <Button
        onClick={handleRemoveProduct}
        variant='outline'
        size='icon'
        className='h-6 w-6 cursor-pointer'
        disabled={itemCount === 0 || isOutOfStock}
      >
        <Minus />
      </Button>
      <span className='font-semibold w-8 text-center text-dark-color'>
        {itemCount}
      </span>
      <Button
        onClick={() => {
          addItem(product)
          toast.success(
            `${product.name.substring(0, 12)}... ajouté au panier avec succès!`
          )
        }}
        variant='outline'
        size='icon'
        className='h-6 w-6 cursor-pointer'
      >
        <Plus />
      </Button>
    </div>
  )
}

export default QuantityButtons
