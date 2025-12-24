# Type Definitions

React Media provides complete TypeScript type definitions.

## Props Types

### VideoPlayerProps

```typescript
interface VideoPlayerProps {
  src: string
  poster?: string
  autoplay?: boolean
  loop?: boolean
  muted?: boolean
  controls?: boolean
  width?: string | number
  height?: string | number
  primaryColor?: string
  darkMode?: boolean
  playbackRates?: number[]
  keyboardShortcuts?: boolean
  showPiP?: boolean
  showSpeed?: boolean
  showFullscreen?: boolean
  touchGestures?: boolean
  miniPlayer?: boolean
  onPlay?: () => void
  onPause?: () => void
  onEnded?: () => void
  onTimeUpdate?: (payload: TimeUpdatePayload) => void
  onVolumeChange?: (payload: VolumeChangePayload) => void
  onError?: (error: MediaError) => void
}
```

### AudioPlayerProps

```typescript
interface AudioPlayerProps {
  src: string
  title?: string
  artist?: string
  cover?: string
  autoplay?: boolean
  loop?: boolean
  primaryColor?: string
  darkMode?: boolean
  preload?: 'auto' | 'metadata' | 'none'
  onPlay?: () => void
  onPause?: () => void
  onEnded?: () => void
  onTimeUpdate?: (payload: TimeUpdatePayload) => void
}
```

## Event Types

```typescript
interface TimeUpdatePayload {
  currentTime: number
  duration: number
  percentage: number
}

interface VolumeChangePayload {
  volume: number
  muted: boolean
}

interface MediaError {
  code: number
  message: string
}
```

## Ref Types

```typescript
interface VideoPlayerRef {
  play: () => Promise<void> | undefined
  pause: () => void
  seek: (time: number) => void
  setVolume: (volume: number) => void
  setPlaybackRate: (rate: number) => void
  toggleFullscreen: () => void
  togglePiP: () => void
  getState: () => MediaState
}

interface AudioPlayerRef {
  play: () => Promise<void> | undefined
  pause: () => void
  seek: (time: number) => void
  setVolume: (volume: number) => void
  getState: () => MediaState
}
```
