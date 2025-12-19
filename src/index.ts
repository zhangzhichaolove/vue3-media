// Vue3 Media Component Library
import type { App, Plugin } from 'vue'

// Components
import { VideoPlayer } from './components/VideoPlayer'
import { AudioPlayer } from './components/AudioPlayer'

// Types
export * from './types'

// Add install method to each component for individual global registration
// Usage: app.use(VideoPlayer) or app.component('VideoPlayer', VideoPlayer)
const VideoPlayerPlugin: Plugin = {
  install(app: App) {
    app.component('VideoPlayer', VideoPlayer)
  },
}

const AudioPlayerPlugin: Plugin = {
  install(app: App) {
    app.component('AudioPlayer', AudioPlayer)
  },
}

// Attach install to components
;(VideoPlayer as any).install = VideoPlayerPlugin.install
;(AudioPlayer as any).install = AudioPlayerPlugin.install

// Export components (for on-demand import)
export { VideoPlayer, AudioPlayer }

// Plugin installation (for global registration)
const Vue3Media: Plugin = {
  install(app: App) {
    app.component('VideoPlayer', VideoPlayer)
    app.component('AudioPlayer', AudioPlayer)
  },
}

export default Vue3Media
