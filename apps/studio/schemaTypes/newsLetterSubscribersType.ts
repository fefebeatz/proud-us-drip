import {defineField, defineType} from 'sanity'
import {EarthGlobeIcon} from '@sanity/icons'

export const newsletterSubscriber = defineType({
  name: 'newsletterSubscriber',
  title: 'Newsletter Subscribers',
  type: 'document',
  icon: EarthGlobeIcon,
  fields: [
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'status',
      title: 'Statut',
      type: 'string',
      options: {
        list: ['pending', 'confirmed', 'unsubscribed'],
        layout: 'radio',
      },
      initialValue: 'pending',
    }),
    defineField({
      name: 'createdAt',
      title: 'Inscrit le',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
})
