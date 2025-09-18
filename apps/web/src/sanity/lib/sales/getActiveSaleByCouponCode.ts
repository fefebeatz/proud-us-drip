import { defineQuery } from 'next-sanity'
import { sanityFetch } from '../live'

export const getActiveSaleByCouponCode = async () => {
  const ACTIVE_SALE_BY_COUPON_QUERY = defineQuery(`
        *[
            _type == "sale"
            && isActive == true
        ] | order(validFrom desc)[0]
    `)

  try {
    const activeSale = await sanityFetch({
      query: ACTIVE_SALE_BY_COUPON_QUERY,
    })

    return activeSale ? activeSale.data : null
  } catch (error) {
    console.error(
      'Error lors de récupération des données avec ce coupon:',
      error
    )
    return null
  }
}
