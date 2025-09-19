import { getActiveSaleByCouponCode } from '@/sanity/lib/sales/getActiveSaleByCouponCode'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

async function CouponCodeBanner() {
  const sale = await getActiveSaleByCouponCode()

  function getMonthName(monthNumber: string | number): string {
    const months = [
      'Janvier',
      'Février',
      'Mars',
      'Avril',
      'Mai',
      'Juin',
      'Juillet',
      'Août',
      'Septembre',
      'Octobre',
      'Novembre',
      'Décembre',
    ]

    // si c'est une string style "05", on la convertit en nombre
    const index =
      typeof monthNumber === 'string'
        ? parseInt(monthNumber, 10) - 1
        : monthNumber - 1

    return months[index] ?? ''
  }

  function formatDateWithCustomMonth(date: Date) {
    const day = format(date, 'dd')
    const monthNumber = format(date, 'MM') // "05", "10", etc.
    const year = format(date, 'yyyy')
    const time = format(date, 'HH:mm')

    return `${day} ${getMonthName(monthNumber)} ${year} à ${time}`
  }

  if (!sale?.isActive) {
    return null
  }
  return (
    <div
      className='relative w-full px-6 py-10 mx-4 mt-2 rounded-lg shadow-lg overflow-hidden'
      style={{
        backgroundImage: `linear-gradient(to right, ${sale.colorDebutGradient?.hex}, ${sale.colorEndGradient?.hex})`,
        color: sale.colorBannerName?.hex,
      }}
    >
      {/* effet brillance automatique */}
      <div className='absolute inset-0 pointer-events-none overflow-hidden rounded-lg'>
        <div
          className='absolute inset-0 -translate-x-full 
                 bg-gradient-to-r from-transparent via-white/40 to-transparent
                 skew-x-[-20deg] animate-shine'
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
              className='py-4 px-6 rounded-full
                     shadow-md transform hover:scale-105 transition duration-300'
              style={{
                background: sale.colorBgButton?.hex,
                color: sale.colorTextButton?.hex,
              }}
            >
              <span className='font-bold text-base sm:text-xl'>
                Utilisez le code promo:{' '}
                <span style={{ color: sale.colorTextCouponCode?.hex }}>
                  {sale.couponCode}
                </span>
                ,
              </span>
              <span className='ml-2 font-bold text-sm md:text-base'>
                pour une réduction de{' '}
                <span style={{ color: sale.colorTextCouponCode?.hex }}>
                  {sale.discountAmount}%
                </span>{' '}
                jusqu&apos;au {formatDateWithCustomMonth(sale.validUntil)}.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CouponCodeBanner
