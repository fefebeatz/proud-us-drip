import {BasketIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const orderType = defineType({
  name: 'order',
  title: 'Commandes',
  type: 'document',
  icon: BasketIcon,
  fields: [
    defineField({
      name: 'orderNumber',
      title: 'N° de commande',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'invoice',
      type: 'object',
      fields: [
        {name: 'id', type: 'string'},
        {name: 'number', type: 'string'},
        {name: 'hosted_invoice_url', type: 'url'},
      ],
    }),
    defineField({
      name: 'shipping',
      title: 'Frais de livraison',
      type: 'number',
    }),
    defineField({
      name: 'stripeCheckOutSessionId',
      type: 'string',
      title: 'ID session Stripe',
    }),
    defineField({
      name: 'stripeCustomerId',
      type: 'string',
      title: 'ID client Stripe',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'clerkUserId',
      title: 'ID utilisateur Clerk',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'customerName',
      title: 'Nom du client',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'customerEmail',
      title: 'Email du client',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'stripePaiementIntent',
      type: 'string',
      title: 'ID paiement Stripe',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'products',
      title: 'Articles',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'product',
              title: 'Article acheté',
              type: 'reference',
              to: [{type: 'product'}],
            }),
            defineField({
              name: 'quantity',
              title: 'Quantité achetée',
              type: 'number',
            }),
          ],
          preview: {
            select: {
              product: 'product.name',
              quantity: 'quantity',
              discount: 'product.discount',
              image: 'product.images[0]',
              price: 'product.price',
            },
            prepare(select) {
              return {
                title: `${select.product} x ${select.quantity}`,
                subtitle: `${select.discount ? select.price * (1 - select.discount / 100) : select.price * select.quantity} €`,
                media: select.image,
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'totalPrice',
      title: 'Prix total',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'currency',
      title: 'Devise',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'amountDiscount',
      title: 'Reduction',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'status',
      title: 'Statut',
      type: 'string',
      options: {
        list: [
          {title: 'En cours', value: 'En cours'},
          {title: 'Payé', value: 'Payé'},
          {title: 'Expédié', value: 'Expédié'},
          {title: 'Livré', value: 'Livré'},
          {title: 'Annulé', value: 'Annulé'},
        ],
      },
    }),
    defineField({
      name: 'orderDate',
      title: 'Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      name: 'customerName',
      amount: 'totalPrice',
      currency: 'currency',
      orderID: 'orderNumber',
      email: 'customerEmail',
    },
    prepare(select) {
      const orderIdSnippet = `${select.orderID.slice(0, 5)}...${select.orderID.slice(-5)}`
      return {
        title: `${select.name} (${orderIdSnippet})`,
        subtitle: `${select.amount} ${select.currency}, (${select.email})`,
        media: BasketIcon,
      }
    },
  },
})
