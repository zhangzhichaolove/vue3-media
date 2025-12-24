# 类型定义

React Media 提供完整的 TypeScript 类型定义。

## Props 类型

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
  preload?: 'auto' | 'metadata' | 'none'
  keyboardShortcuts?: boolean
  globalKeyboardShortcuts?: boolean
  showPiP?: boolean
  showSpeed?: boolean
  showFullscreen?: boolean
  showThumbnailPreview?: boolean
  touchGestures?: boolean
  miniPlayer?: boolean
  miniPlayerPosition?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  backgroundColor?: string
  className?: string
  style?: CSSProperties
  children?: ReactNode
  controlsLeft?: ReactNode
  onPlay?: () => void
  onPause?: () => void
  onEnded?: () => void
  onTimeUpdate?: (payload: TimeUpdatePayload) => void
  onVolumeChange?: (payload: VolumeChangePayload) => void
  onError?: (error: MediaError) => void
  onLoadedMetadata?: (payload: LoadedMetadataPayload) => void
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
  className?: string
  style?: CSSProperties
  onPlay?: () => void
  onPause?: () => void
  onEnded?: () => void
  onTimeUpdate?: (payload: TimeUpdatePayload) => void
  onVolumeChange?: (payload: VolumeChangePayload) => void
  onError?: (error: MediaError) => void
  onLoadedMetadata?: (payload: LoadedMetadataPayload) => void
}
```

## 事件类型

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

interface LoadedMetadataPayload {
  duration: number
}

interface MediaError {
  code: number
  message: string
}
```

## Ref 类型

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

## 状态类型

```typescript
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
