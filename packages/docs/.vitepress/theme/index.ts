import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

// Import vue3-media components and styles
import { VideoPlayer, AudioPlayer } from '@peakchao/vue3-media'
import '@peakchao/vue3-media/style'

import './custom.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {})
  },
  enhanceApp({ app }) {
    // Register components globally for use in markdown
    app.component('VideoPlayer', VideoPlayer)
    app.component('AudioPlayer', AudioPlayer)
  }
} satisfies Theme
