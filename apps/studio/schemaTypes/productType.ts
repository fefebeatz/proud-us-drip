import {TrolleyIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const productType = defineType({
  name: 'product',
  title: 'Articles',
  type: 'document',
  icon: TrolleyIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Intitulé',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description: "Généré automatiquement à partir de l'intitulé",
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'reference',
      to: [{type: 'category'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'color',
      title: 'Couleur',
      type: 'color', // plugin color
      options: {
        disableAlpha: true, // (optionnel, pas de transparence)
      },
    }),
    defineField({
      name: 'colorName',
      title: 'Nom de la couleur',
      type: 'string',
    }),
    // defineField({
    //   name: 'sizes',
    //   title: 'Tailles disponibles',
    //   type: 'array',
    //   of: [{ type: 'string' }], // libre, le marchand tape lui-même
    //   options: {
    //     layout: 'tags', // affichage sympa en tags
    //   },
    // }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{type: 'image'}],
      options: {layout: 'grid'},
      validation: (Rule) => Rule.required().min(1).error('Au moins une image est requise.'),
    }),
    defineField({
      name: 'price',
      title: 'Prix',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'discount',
      title: 'Pourcentage de réduction',
      type: 'number',
    }),
    defineField({
      name: 'stock',
      title: 'Stock',
      type: 'number',
      validation: (Rule) => Rule.required().min(0).error('Le prix est requis.'),
    }),
    defineField({
      name: 'status',
      title: 'Statut',
      type: 'string',
      options: {
        list: [
          {title: 'Nouveau', value: 'Nouveau'},
          {title: 'Hot', value: 'Hot'},
          {title: 'Promo', value: 'Promo'},
          {title: 'Vedette', value: 'Vedette'},
        ],
      },
    }),
    defineField({
      name: 'variant',
      title: 'Variantes',
      type: 'array',
      of: [{type: 'string'}], // libre, le marchand tape lui-même
      options: {
        layout: 'list', // affichage sympa en tags
      },
    }),
    defineField({
      name: 'intro',
      description: "Description courte de l'article",
      title: 'Intro',
      type: 'string',
    }),
    defineField({
      name: 'description',
      description: "Description complète de l'article",
      title: 'Description',
      type: 'text',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'images',
      subtitle: 'price',
    },
    prepare(selection) {
      const {title, media, subtitle} = selection
      const image = media && media[0]
      return {
        title: title,
        subtitle: `${subtitle} €`,
        media: image,
      }
    },
  },
})
