/**
 * Vue3 Media Component Library Types
 */

// Theme configuration
export interface ThemeConfig {
  primaryColor?: string
  darkMode?: boolean
}

// Video Player Props
export interface VideoPlayerProps {
  /** Video source URL (required) */
  src: string
  /** Video poster image URL */
  poster?: string
  /** Auto play video */
  autoplay?: boolean
  /** Loop video */
  loop?: boolean
  /** Mute video */
  muted?: boolean
  /** Show controls */
  controls?: boolean
  /** Player width */
  width?: string | number
  /** Player height */
  height?: string | number
  /** Primary theme color */
  primaryColor?: string
  /** Enable dark mode */
  darkMode?: boolean
  /** Playback rate options */
  playbackRates?: number[]
  /** Preload behavior */
  preload?: 'auto' | 'metadata' | 'none'
  /** Enable keyboard shortcuts (Space, arrows, M, F, Escape) */
  keyboardShortcuts?: boolean
  /** Enable global keyboard shortcuts (listen on entire page, not just player) */
  globalKeyboardShortcuts?: boolean
  /** Show Picture-in-Picture button */
  showPiP?: boolean
  /** Show playback speed button */
  showSpeed?: boolean
  /** Show fullscreen button */
  showFullscreen?: boolean
  /** Show thumbnail preview on progress bar hover */
  showThumbnailPreview?: boolean
  /** Enable touch gestures for mobile (swipe to seek/volume) */
  touchGestures?: boolean
  /** Enable mini player when scrolled out of view */
  miniPlayer?: boolean
  /** Mini player position */
  miniPlayerPosition?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  /** Player background color */
  backgroundColor?: string
}

// Audio Player Props
export interface AudioPlayerProps {
  /** Audio source URL (required) */
  src: string
  /** Track title */
  title?: string
  /** Artist name */
  artist?: string
  /** Cover image URL */
  cover?: string
  /** Auto play audio */
  autoplay?: boolean
  /** Loop audio */
  loop?: boolean
  /** Primary theme color */
  primaryColor?: string
  /** Enable dark mode */
  darkMode?: boolean
  /** Preload behavior */
  preload?: 'auto' | 'metadata' | 'none'
}

// Event payloads
export interface TimeUpdatePayload {
  currentTime: number
  duration: number
  percentage: number
}

export interface VolumeChangePayload {
  volume: number
  muted: boolean
}

export interface LoadedMetadataPayload {
  duration: number
}

export interface MediaError {
  code: number
  message: string
}

// Media state
export interface MediaState {
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
