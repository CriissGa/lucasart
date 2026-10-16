import {defineType, defineField, defineArrayMember} from 'sanity'

export const collection = defineType({
  name: 'collection',
  title: 'Colecciones',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nombre',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Sección de la web',
      type: 'string',
      options: {
        list: [
          {title: 'Concerts', value: 'concerts'},
          {title: 'Portraits', value: 'portraits'},
          {title: 'Street', value: 'street'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
    }),
    defineField({
      name: 'cover',
      title: 'Portada',
      type: 'image',
      options: {hotspot: true},
      validation: (rule) => rule.required().assetRequired(),
    }),
    defineField({
      name: 'photos',
      title: 'Fotos',
      description: 'Arrastra las fotos para cambiar su orden.',
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
              description: 'Si quieres, describe brevemente qué aparece en la foto.',
              type: 'string',
            }),
          ],
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
  ],
})
