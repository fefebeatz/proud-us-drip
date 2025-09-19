import {TagIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const salesType = defineType({
  name: 'sale',
  title: 'Promotions',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Dénomination de la promo',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'discountAmount',
      title: 'Montant de la réduction',
      type: 'number',
      description: 'Montant en pourcentage ou en valeur fixe',
    }),
    defineField({
      name: 'couponCode',
      title: 'Code du coupon',
      type: 'string',
    }),
    defineField({
      name: 'validFrom',
      title: 'Valide du',
      type: 'datetime',
    }),
    defineField({
      name: 'validUntil',
      title: "Jusqu'au",
      type: 'datetime',
    }),
    defineField({
      name: 'isActive',
      title: 'Actif ?',
      type: 'boolean',
      description: 'Bascule pour activer/désactiver la vente',
      initialValue: true,
    }),
    defineField({
      name: 'colorDebutGradient',
      title: 'Couleur début dégradé',
      description: 'Permet de définir la couleur de commencement du dégradé',
      type: 'color', // plugin color
      options: {
        disableAlpha: true, // (optionnel, pas de transparence)
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'colorEndGradient',
      title: 'Couleur fin dégradé',
      description: 'Permet de définir la couleur de fin du dégradé',
      type: 'color', // plugin color
      options: {
        disableAlpha: true, // (optionnel, pas de transparence)
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'colorBannerName',
      title: 'Couleur nom bannière',
      description: 'Permet de définir la couleur du texte de la bannière',
      type: 'color', // plugin color
      options: {
        disableAlpha: true, // (optionnel, pas de transparence)
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'colorBgButton',
      title: 'Couleur bouton',
      description: 'Permet de définir la couleur du bouton du coupon',
      type: 'color', // plugin color
      options: {
        disableAlpha: true, // (optionnel, pas de transparence)
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'colorTextButton',
      title: 'Couleur texte du bouton',
      description: 'Permet de définir la couleur du texte du bouton du coupon',
      type: 'color', // plugin color
      options: {
        disableAlpha: true, // (optionnel, pas de transparence)
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'colorTextCouponCode',
      title: 'Couleur texte du code',
      description: 'Permet de définir la couleur du texte du code',
      type: 'color', // plugin color
      options: {
        disableAlpha: true, // (optionnel, pas de transparence)
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      discountAmount: 'discountAmount',
      couponCode: 'couponCode',
      isActive: 'isActive',
    },
    prepare(select) {
      const {title, discountAmount, couponCode, isActive} = select
      const status = isActive ? 'Active' : 'Inactive'
      return {
        title: title,
        subtitle: `${discountAmount}% off - Code: ${couponCode} - ${status}`,
      }
    },
  },
})
