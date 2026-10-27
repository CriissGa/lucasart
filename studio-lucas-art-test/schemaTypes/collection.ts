import {defineType, defineField, defineArrayMember} from 'sanity'

export const collection = defineType({
  name: 'collection',
  title: 'Collections',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Website section',
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
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'cover',
      title: 'Cover image',
      type: 'image',
      options: {hotspot: true},
      validation: (rule) => rule.required().assetRequired(),
    }),
    defineField({
      name: 'photos',
      title: 'Photos',
      description: 'Drag photos to change their order.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          validation: (rule) => rule.required().assetRequired(),
          fields: [
            defineField({
              name: 'alt',
              title: 'Image description (optional)',
              description: 'Optionally, briefly describe what is shown in the photo.',
              type: 'string',
            }),
          ],
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
  ],
})
