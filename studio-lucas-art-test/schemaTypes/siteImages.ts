import {defineType, defineField} from 'sanity'

export const siteImages = defineType({
  name: 'siteImages',
  title: 'Imágenes del sitio',
  type: 'document',
  fields: [
    ['heroBackground', 'Inicio: imagen grande de fondo'],
    ['heroFeatured', 'Inicio: imagen del recuadro derecho'],
    ['profilePortrait', 'Inicio: retrato de Lucas'],
    ['aboutPortrait', 'Sobre mí: retrato de Lucas'],
  ].map(([name, title]) => defineField({
    name, title, type: 'image', options: {hotspot: true},
    description: 'Esta imagen se cambia de forma independiente de las colecciones y del libro. Publica para guardar el cambio.',
    fields: [defineField({name: 'alt', title: 'Descripción de la foto', type: 'string'})],
    validation: (rule) => rule.assetRequired(),
  })),
  preview: {prepare: () => ({title: 'Imágenes del sitio'})},
})
