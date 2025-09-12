import { cn } from '@/lib/utils'
import React from 'react'

interface Props {
  price: number
  discount?: number
  className?: string
}

const PriceView = ({ price, discount, className }: Props) => {
  return (
    <div className='flex items-center gap-2'>
      {price && discount ? (
        <>
          <span
            className={cn('text-sm font-semibold text-dark-color', className)}
          >
            {price - (discount * price) / 100} €
          </span>
          <span className={cn('text-sm text-gray-500 line-through', className)}>
            {price} €
          </span>
        </>
      ) : (
        <span
          className={cn('text-sm font-semibold text-dark-color', className)}
        >
          {price} €
        </span>
      )}
    </div>
  )
}

export default PriceView
