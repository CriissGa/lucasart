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
      name: 'slug',
      title: 'Website URL',
      description: 'Click Generate after entering the name. This creates the collection page automatically; no code changes are needed.',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.custom(async (value, context) => {
        const slug = value?.current || context.document?.category;
        if (typeof slug !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return 'Generate a URL using lowercase letters, numbers and hyphens.';
        const id = context.document?._id?.replace(/^drafts\./, '');
        const count = await context.getClient({apiVersion: '2026-10-01'}).fetch(
          'count(*[_type == "collection" && !(_id in [$id, $draftId]) && (slug.current == $slug || category == $slug)])',
          {id, draftId: `drafts.${id}`, slug},
        );
        return count === 0 || 'This URL is already used by another collection.';
      }),
    }),
    defineField({
      name: 'category',
      title: 'Original website section',
      description: 'Preserved for existing collections. Use Website URL for new collections.',
      type: 'string',
      readOnly: true,
      hidden: ({value}) => value === undefined,
      options: {
        list: [
          {title: 'Concerts', value: 'concerts'},
          {title: 'Portraits', value: 'portraits'},
          {title: 'Street', value: 'street'},
        ],
      },
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
