import {defineType, defineField} from 'sanity'

export const siteImages = defineType({
  name: 'siteImages',
  title: 'Site images',
  type: 'document',
  fields: [
    ['heroBackground', 'Home: background image'],
    ['heroFeatured', 'Home: right-hand featured image'],
    ['profilePortrait', 'Home: portrait of Lucas'],
    ['aboutPortrait', 'About: portrait of Lucas'],
  ].map(([name, title]) => defineField({
    name, title, type: 'image', options: {hotspot: true},
    description: 'This image is independent of the collections and photobook. Publish to apply your changes.',
    fields: [defineField({name: 'alt', title: 'Photo description', type: 'string'})],
    validation: (rule) => rule.assetRequired(),
  })),
  preview: {prepare: () => ({title: 'Site images'})},
})
