import { getActiveSaleByCouponCode } from '@/sanity/lib/sales/getActiveSaleByCouponCode'
import { motion } from 'framer-motion'
import { TicketPercent } from 'lucide-react'

export type Sale = {
  _id: string
  _type: 'sale'
  title: string
  description?: string
  discountAmount: number
  couponCode: string
  validFrom?: string // ISO datetime
  validUntil?: string // ISO datetime
  isActive: boolean
}

async function CouponCodeBanner() {
  const sale: Sale[] = await getActiveSaleByCouponCode()

  if (!sale[0]?.isActive) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className='relative mx-4 mt-4 overflow-hidden rounded-2xl shadow-2xl'
    >
      {/* Dégradé gris ↔ blanc */}
      <div className='bg-gradient-to-r from-gray-100 via-white to-gray-200'>
        <div className='container mx-auto flex flex-col sm:flex-row items-center justify-between px-8 py-12'>
          {/* Texte */}
          <div className='flex-1 text-center sm:text-left'>
            <h2 className='text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4'>
              {sale[0].title}
            </h2>
            <p className='text-lg sm:text-2xl text-gray-600 font-medium mb-8'>
              {sale[0].description}
            </p>

            {/* Code promo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className='inline-flex items-center gap-3 bg-gray-900 text-white px-6 py-4 rounded-full shadow-lg cursor-pointer'
            >
              <TicketPercent className='w-6 h-6 text-white' />
              <div className='flex flex-col text-left'>
                <span className='text-base sm:text-lg font-semibold'>
                  Code promo :{' '}
                  <span className='text-yellow-400'>{sale[0].couponCode}</span>
                </span>
                <span className='text-sm sm:text-base text-gray-300'>
                  Profitez de {sale[0].discountAmount}% de réduction
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default CouponCodeBanner
