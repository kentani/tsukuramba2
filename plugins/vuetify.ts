import { createVuetify, ThemeDefinition } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'

const customLightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    brown1: '#795548',
    brown2: '#EFEBE9',
    brown3: '#D7CCC8',
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components: {
      ...components
    },
    directives: {
      ...directives
    },
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi
      }
    },
    theme: {
      defaultTheme: 'customLightTheme',
      themes: {
        customLightTheme,
      }
    }
  })
  nuxtApp.vueApp.use(vuetify)
})
