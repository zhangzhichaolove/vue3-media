// Vue3 Media Component Library
import type { App, Plugin } from 'vue'

// Components
import { VideoPlayer } from './components/VideoPlayer'
import { AudioPlayer } from './components/AudioPlayer'

// Types
export * from './types'

// Export components
export { VideoPlayer, AudioPlayer }

// Plugin installation
const Vue3Media: Plugin = {
  install(app: App) {
    app.component('VideoPlayer', VideoPlayer)
    app.component('AudioPlayer', AudioPlayer)
  },
}

export default Vue3Media
