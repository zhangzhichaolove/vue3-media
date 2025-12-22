# API Reference

## Type Definitions

### ThemeConfig

Theme configuration interface.

```ts
interface ThemeConfig {
  primaryColor?: string
  darkMode?: boolean
}
```

### VideoPlayerProps

VideoPlayer component props definition.

```ts
interface VideoPlayerProps {
  /** Video source URL (required) */
  src: string
  /** Poster image URL */
  poster?: string
  /** Auto play */
  autoplay?: boolean
  /** Loop playback */
  loop?: boolean
  /** Muted */
  muted?: boolean
  /** Show controls */
  controls?: boolean
  /** Player width */
  width?: string | number
  /** Player height */
  height?: string | number
  /** Primary color */
  primaryColor?: string
  /** Dark mode */
  darkMode?: boolean
  /** Playback rate options */
  playbackRates?: number[]
  /** Preload behavior */
  preload?: 'auto' | 'metadata' | 'none'
  /** Enable keyboard shortcuts */
  keyboardShortcuts?: boolean
  /** Global keyboard shortcuts */
  globalKeyboardShortcuts?: boolean
  /** Show PiP button */
  showPiP?: boolean
  /** Show playback speed button */
  showSpeed?: boolean
  /** Show fullscreen button */
  showFullscreen?: boolean
  /** Show thumbnail preview */
  showThumbnailPreview?: boolean
  /** Touch gestures */
  touchGestures?: boolean
  /** Mini player mode */
  miniPlayer?: boolean
  /** Mini player position */
  miniPlayerPosition?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
}
```

### AudioPlayerProps

AudioPlayer component props definition.

```ts
interface AudioPlayerProps {
  /** Audio source URL (required) */
  src: string
  /** Track title */
  title?: string
  /** Artist name */
  artist?: string
  /** Cover image URL */
  cover?: string
  /** Auto play */
  autoplay?: boolean
  /** Loop playback */
  loop?: boolean
  /** Primary color */
  primaryColor?: string
  /** Dark mode */
  darkMode?: boolean
  /** Preload behavior */
  preload?: 'auto' | 'metadata' | 'none'
}
```

### TimeUpdatePayload

Time update event payload.

```ts
interface TimeUpdatePayload {
  currentTime: number
  duration: number
  percentage: number
}
```

### VolumeChangePayload

Volume change event payload.

```ts
interface VolumeChangePayload {
  volume: number
  muted: boolean
}
```

### LoadedMetadataPayload

Metadata loaded event payload.

```ts
interface LoadedMetadataPayload {
  duration: number
}
```

### MediaError

Media error information.

```ts
interface MediaError {
  code: number
  message: string
}
```

### MediaState

Media playback state.

```ts
interface MediaState {
  playing: boolean
  currentTime: number
  duration: number
  volume: number
  muted: boolean
  buffered: number
  playbackRate: number
  waiting: boolean
  ended: boolean
}
```

## Exports

```ts
// Default export - Vue plugin, registers all components
import Vue3Media from '@peakchao/vue3-media'

// Named exports - Individual components
import { VideoPlayer, AudioPlayer } from '@peakchao/vue3-media'

// Type exports
import type {
  ThemeConfig,
  VideoPlayerProps,
  AudioPlayerProps,
  TimeUpdatePayload,
  VolumeChangePayload,
  LoadedMetadataPayload,
  MediaError,
  MediaState
} from '@peakchao/vue3-media'
```
