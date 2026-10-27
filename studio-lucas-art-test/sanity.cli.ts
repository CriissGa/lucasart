import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'dlsh5m3v',
    dataset: 'production'
  },
  deployment: {
    appId: 'rro2x0w1hmfjkpkyb26xoniz',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
  studioHost: 'lucastaylorphotography',
})
