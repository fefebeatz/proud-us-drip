import { getActiveSaleByCouponCode } from '@/sanity/lib/sales/getActiveSaleByCouponCode'

async function CouponCodeBanner() {
  const sale = await getActiveSaleByCouponCode()

  if (!sale?.isActive) {
    return null
  }
  return (
    <div className='relative w-full bg-gradient-to-r from-dark-color to-gray-300 text-white px-6 py-10 mx-4 mt-2 rounded-lg shadow-lg overflow-hidden group'>
      {/* effet brillance */}
      <div className='absolute inset-0 pointer-events-none overflow-hidden rounded-lg'>
        <div
          className='absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%]
                 bg-gradient-to-r from-transparent via-white/40 to-transparent
                 skew-x-[-20deg] duration-700 ease-in-out transition-transform'
        />
      </div>

      <div className='flex items-center justify-between relative z-10'>
        <div className='flex-1'>
          <h2 className='text-3xl sm:text-5xl font-extrabold text-left mb-4'>
            {sale.title}
          </h2>
          <p className='text-left text-xl sm:text-3xl font-semibold mb-6'>
            {sale.description}
          </p>
          <div className='flex'>
            <div
              className='bg-white text-black py-4 px-6 rounded-full
                     shadow-md transform hover:scale-105 transition duration-300'
            >
              <span className='font-bold text-base sm:text-xl'>
                Utilisez le code promo:{' '}
                <span className='text-red-600'>{sale.couponCode},</span>
              </span>
              <span className='ml-2 font-bold text-base sm:text-xl'>
                pour une réduction de {sale.discountAmount}%.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CouponCodeBanner
