import {defineType, defineField, defineArrayMember} from 'sanity'

export const bookHero = defineType({
  name: 'bookHero',
  title: 'BookHero',
  type: 'document',
  fields: [
    defineField({
      name: 'photos',
      title: 'Book photos',
      description:
        'Add exactly 10 photos. Drag them to change the page order.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          validation: (rule) => rule.required().assetRequired(),
          fields: [
            defineField({name: 'title', title: 'Photo title', type: 'string'}),
            defineField({name: 'category', title: 'Collection link', type: 'string', options: {list: ['concerts', 'portraits', 'street']}}),
            defineField({
              name: 'alt',
              title: 'Image description (optional)',
              type: 'string',
            }),
          ],
        }),
      ],
      validation: (rule) => rule.required().length(10),
    }),
  ],
  preview: {
    prepare() {
      return {title: 'BookHero photos'}
    },
  },
})
