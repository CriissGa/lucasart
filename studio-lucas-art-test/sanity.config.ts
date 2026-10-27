import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Lucas Art Test',

  projectId: 'dlsh5m3v',
  dataset: 'production',

  plugins: [structureTool({structure: (S) => S.list().title('Content').items([
    S.listItem().title('Site images').child(S.document().schemaType('siteImages').documentId('siteImages')),
    S.listItem().title('BookHero').child(S.document().schemaType('bookHero').documentId('24b4812d-561f-4e8d-a88f-91bce619453c').title('Book photos')),
    ...S.documentTypeListItems().filter((item) => !['siteImages', 'bookHero'].includes(item.getId() ?? '')),
  ])}), visionTool()],

  schema: {
    types: schemaTypes,
  },
  document: {
    newDocumentOptions: (options) => options.filter((option) => !['siteImages', 'bookHero'].includes(option.templateId)),
    actions: (actions, context) => ['siteImages', 'bookHero'].includes(context.schemaType)
      ? actions.filter((action) => !['duplicate', 'delete', 'unpublish'].includes(action.action ?? ''))
      : actions,
  },
})
