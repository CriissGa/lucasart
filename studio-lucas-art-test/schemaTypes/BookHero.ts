import {defineType, defineField, defineArrayMember} from 'sanity'

export const bookHero = defineType({
  name: 'bookHero',
  title: 'BookHero',
  type: 'document',
  fields: [
    defineField({
      name: 'photos',
      title: 'Fotos del libro',
      description:
        'Añade exactamente 10 fotos. Arrástralas para ordenar las páginas.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          validation: (rule) => rule.required().assetRequired(),
          fields: [
            defineField({
              name: 'alt',
              title: 'Descripción de la imagen (opcional)',
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
      return {title: 'Fotos del BookHero'}
    },
  },
})
