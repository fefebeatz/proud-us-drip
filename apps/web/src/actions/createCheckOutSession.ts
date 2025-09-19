'use server'
import stripe from '@/lib/stripe'
import { urlFor } from '@/sanity/lib/image'
import { CartItem } from '@/store'
import Stripe from 'stripe'

export interface MetaData {
  orderNumber: string
  customerName: string
  customerEmail: string
  clerkUserId: string
}

export interface CartItems {
  products: CartItem['product']
  quantity: number
}

const baseURL =
  process.env.NODE_ENV === 'production'
    ? `https://${process.env.VERCEL_URL}`
    : `${process.env.NEXT_PUBLIC_BASE_URL}`

export const createCheckOutSession = async (
  items: CartItem[],
  metadata: MetaData
) => {
  try {
    const customers = await stripe.customers.list({
      email: metadata.customerEmail,
      limit: 1,
    })
    const customerId = customers.data.length > 0 ? customers.data[0]?.id : ''
    const sessionPayload: Stripe.Checkout.SessionCreateParams = {
      metadata: {
        orderNumber: metadata.orderNumber,
        customerName: metadata.customerName,
        customerEmail: metadata.customerEmail,
        clerkUserId: metadata.clerkUserId,
      },
      automatic_tax: {
        enabled: true,
      },
      mode: 'payment',
      payment_method_types: ['card'],
      allow_promotion_codes: true,
      customer: customerId || undefined,
      invoice_creation: {
        enabled: true,
      },
      success_url: `${baseURL}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`,
      cancel_url: `${baseURL}/panier`,
      line_items: items.map((item) => ({
        price_data: {
          currency: 'eur',
          unit_amount: Math.round(
            item.product.discount
              ? item.product.price * (1 - item.product.discount / 100) * 100
              : item.product.price * 100
          ),
          tax_behavior: 'exclusive',
          product_data: {
            name: item.product.name,
            description: item.product.description ?? item.product.intro,
            metadata: {
              id: item.product._id,
            },
            images:
              item.product.images && item.product.images.length > 0
                ? [urlFor(item.product.images[0]).url()]
                : undefined,
          },
        },
        quantity: item.quantity,
      })),
      billing_address_collection: 'required',

      shipping_address_collection: {
        allowed_countries: [
          'AF',
          'AX',
          'AL',
          'DZ',
          'AD',
          'AO',
          'AI',
          'AQ',
          'AG',
          'AR',
          'AM',
          'AW',
          'AU',
          'AT',
          'AZ',
          'BS',
          'BH',
          'BD',
          'BB',
          'BY',
          'BE',
          'BZ',
          'BJ',
          'BM',
          'BT',
          'BO',
          'BQ',
          'BA',
          'BW',
          'BV',
          'BR',
          'IO',
          'BN',
          'BG',
          'BF',
          'BI',
          'KH',
          'CM',
          'CA',
          'CV',
          'KY',
          'CF',
          'TD',
          'CL',
          'CN',
          'CO',
          'KM',
          'CD',
          'CG',
          'CK',
          'CR',
          'CI',
          'HR',
          'CW',
          'CY',
          'CZ',
          'DK',
          'DJ',
          'DM',
          'DO',
          'EC',
          'EG',
          'SV',
          'GQ',
          'ER',
          'EE',
          'SZ',
          'ET',
          'FK',
          'FO',
          'FJ',
          'FI',
          'FR',
          'GF',
          'PF',
          'TF',
          'GA',
          'GM',
          'GE',
          'DE',
          'GH',
          'GI',
          'GR',
          'GL',
          'GD',
          'GP',
          'GU',
          'GT',
          'GG',
          'GN',
          'GW',
          'GY',
          'HT',
          'VA',
          'HN',
          'HK',
          'HU',
          'IS',
          'IN',
          'ID',
          'IQ',
          'IE',
          'IM',
          'IL',
          'IT',
          'JM',
          'JP',
          'JE',
          'JO',
          'KZ',
          'KE',
          'KI',
          'KR',
          'KW',
          'KG',
          'LA',
          'LV',
          'LB',
          'LS',
          'LR',
          'LY',
          'LI',
          'LT',
          'LU',
          'MO',
          'MG',
          'MW',
          'MY',
          'MV',
          'ML',
          'MT',
          'MQ',
          'MR',
          'MU',
          'YT',
          'MX',
          'MD',
          'MC',
          'MN',
          'ME',
          'MS',
          'MA',
          'MZ',
          'MM',
          'NA',
          'NR',
          'NP',
          'NL',
          'NC',
          'NZ',
          'NI',
          'NE',
          'NG',
          'NU',
          'MK',
          'NO',
          'OM',
          'PK',
          'PS',
          'PA',
          'PG',
          'PY',
          'PE',
          'PH',
          'PN',
          'PL',
          'PT',
          'PR',
          'QA',
          'RE',
          'RO',
          'RU',
          'RW',
          'BL',
          'SH',
          'KN',
          'LC',
          'MF',
          'PM',
          'VC',
          'WS',
          'SM',
          'ST',
          'SA',
          'SN',
          'RS',
          'SC',
          'SL',
          'SG',
          'SX',
          'SK',
          'SI',
          'SB',
          'SO',
          'ZA',
          'GS',
          'SS',
          'ES',
          'LK',
          'SD',
          'SR',
          'SJ',
          'SE',
          'CH',
          'TW',
          'TJ',
          'TZ',
          'TH',
          'TL',
          'TG',
          'TK',
          'TO',
          'TT',
          'TN',
          'TR',
          'TM',
          'TC',
          'TV',
          'UG',
          'UA',
          'AE',
          'GB',
          'US',
          'UY',
          'UZ',
          'VU',
          'VE',
          'VN',
          'VG',
          'WF',
          'EH',
          'YE',
          'ZM',
          'ZW',
        ],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 0,
              currency: 'eur',
            },
            display_name: 'Livraison gratuite',
            tax_behavior: 'exclusive',
            tax_code: 'txcd_92010001',
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 5,
              },
              maximum: {
                unit: 'business_day',
                value: 7,
              },
            },
          },
        },
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 1500,
              currency: 'eur',
            },
            display_name: 'Livraison par avion le lendemain',
            tax_behavior: 'exclusive',
            tax_code: 'txcd_92010001',
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 1,
              },
              maximum: {
                unit: 'business_day',
                value: 1,
              },
            },
          },
        },
      ],
    }
    if (customerId) {
      sessionPayload.customer = customerId
    } else {
      sessionPayload.customer_email = metadata.customerEmail
    }

    const session = await stripe.checkout.sessions.create(sessionPayload)
    return session.url
  } catch (error) {
    console.error('Erreur lors de la création de la session:', error)
    throw error
  }
}
