import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Lucas Art Test',

  projectId: 'dlsh5m3v',
  dataset: 'production',

  plugins: [structureTool({structure: (S) => S.list().title('Contenido').items([
    S.listItem().title('Imágenes del sitio').child(S.document().schemaType('siteImages').documentId('siteImages')),
    ...S.documentTypeListItems().filter((item) => item.getId() !== 'siteImages'),
  ])}), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
