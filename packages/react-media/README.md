# React Media 🎬

[![npm version](https://img.shields.io/npm/v/@peakchao/react-media.svg)](https://www.npmjs.com/package/@peakchao/react-media)
[![license](https://img.shields.io/npm/l/@peakchao/react-media.svg)](https://github.com/peakchao/react-media/blob/main/LICENSE)

A beautiful, feature-rich media player component library for React. Includes customizable Video and Audio players with modern UI, dark mode support, and full TypeScript integration.

## ✨ Features

- 🎥 **Video Player** - Full-featured video player with progress bar, volume control, playback speed, and fullscreen
- 🎵 **Audio Player** - Elegant audio player with cover art, waveform progress, and track info display
- 🌙 **Dark Mode** - Built-in dark mode support
- 🎨 **Customizable** - Easily customize primary color and themes
- 📱 **Responsive** - Works great on all screen sizes
- ♿ **Accessible** - Full keyboard and screen reader support
- 🔧 **TypeScript** - Complete type definitions included
- ⚡ **Lightweight** - No external dependencies

## 📦 Installation

```bash
# npm
npm install @peakchao/react-media

# yarn
yarn add @peakchao/react-media

# pnpm
pnpm add @peakchao/react-media
```

## 🚀 Quick Start

### Import Styles

```tsx
// main.tsx or App.tsx
import '@peakchao/react-media/style'

// Or use the full path
// import '@peakchao/react-media/dist/react-media.css'
```

### Use Components

```tsx
import { VideoPlayer, AudioPlayer } from '@peakchao/react-media'

function App() {
  return (
    <>
      {/* Video Player */}
      <VideoPlayer
        src="https://example.com/video.mp4"
        poster="https://example.com/poster.jpg"
      />

      {/* Audio Player */}
      <AudioPlayer
        src="https://example.com/audio.mp3"
        title="Song Title"
        artist="Artist Name"
        cover="https://example.com/cover.jpg"
      />
    </>
  )
}
```

## 📹 VideoPlayer

A modern video player with all the controls you need.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | *required* | Video source URL |
| `poster` | `string` | - | Poster image URL |
| `autoplay` | `boolean` | `false` | Auto-play video on load |
| `loop` | `boolean` | `false` | Loop video playback |
| `muted` | `boolean` | `false` | Mute video by default |
| `controls` | `boolean` | `true` | Show player controls |
| `width` | `string \| number` | `'100%'` | Player width |
| `height` | `string \| number` | `'auto'` | Player height |
| `primaryColor` | `string` | `'#6366f1'` | Theme primary color |
| `darkMode` | `boolean` | `false` | Enable dark mode |
| `playbackRates` | `number[]` | `[0.5, 0.75, 1, 1.25, 1.5, 2]` | Available playback speeds |
| `preload` | `'auto' \| 'metadata' \| 'none'` | `'metadata'` | Preload behavior |
| `keyboardShortcuts` | `boolean` | `true` | Enable keyboard shortcuts |
| `globalKeyboardShortcuts` | `boolean` | `false` | Enable global keyboard shortcuts |
| `showPiP` | `boolean` | `true` | Show Picture-in-Picture button |
| `showSpeed` | `boolean` | `true` | Show playback speed button |
| `showFullscreen` | `boolean` | `true` | Show fullscreen button |
| `showThumbnailPreview` | `boolean` | `true` | Show thumbnail on progress bar hover |
| `touchGestures` | `boolean` | `true` | Enable touch gestures |
| `miniPlayer` | `boolean` | `false` | Enable mini player when scrolled out of view |
| `miniPlayerPosition` | `string` | `'bottom-right'` | Mini player position |
| `backgroundColor` | `string` | `'transparent'` | Player background color |

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Space` | Play/Pause |
| `←` / `→` | Seek ±5 seconds |
| `↑` / `↓` | Volume ±10% |
| `M` | Mute/Unmute |
| `F` | Toggle Fullscreen |
| `Escape` | Exit Fullscreen/PiP |

### Event Callbacks

| Prop | Payload | Description |
|------|---------|-------------|
| `onPlay` | - | Fired when playback starts |
| `onPause` | - | Fired when playback pauses |
| `onEnded` | - | Fired when playback ends |
| `onTimeUpdate` | `{ currentTime, duration, percentage }` | Fired during playback |
| `onVolumeChange` | `{ volume, muted }` | Fired when volume changes |
| `onLoadedMetadata` | `{ duration }` | Fired when metadata loads |
| `onError` | `{ code, message }` | Fired on playback error |

### Ref Methods

```tsx
import { useRef } from 'react'
import { VideoPlayer, VideoPlayerRef } from '@peakchao/react-media'

function App() {
  const playerRef = useRef<VideoPlayerRef>(null)

  const handleControls = () => {
    playerRef.current?.play()
    playerRef.current?.pause()
    playerRef.current?.seek(30) // Seek to 30 seconds
    playerRef.current?.setVolume(0.5) // Set volume to 50%
    playerRef.current?.setPlaybackRate(1.5) // Set speed to 1.5x
    playerRef.current?.toggleFullscreen()
    playerRef.current?.togglePiP()
    const state = playerRef.current?.getState()
  }

  return <VideoPlayer ref={playerRef} src="video.mp4" />
}
```

## 🎵 AudioPlayer

An elegant audio player with cover art and track info display.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | *required* | Audio source URL |
| `title` | `string` | - | Track title |
| `artist` | `string` | - | Artist name |
| `cover` | `string` | - | Cover image URL |
| `autoplay` | `boolean` | `false` | Auto-play audio on load |
| `loop` | `boolean` | `false` | Loop audio playback |
| `primaryColor` | `string` | `'#6366f1'` | Theme primary color |
| `darkMode` | `boolean` | `false` | Enable dark mode |
| `preload` | `'auto' \| 'metadata' \| 'none'` | `'metadata'` | Preload behavior |

### Ref Methods

```tsx
import { useRef } from 'react'
import { AudioPlayer, AudioPlayerRef } from '@peakchao/react-media'

function App() {
  const playerRef = useRef<AudioPlayerRef>(null)

  return (
    <AudioPlayer
      ref={playerRef}
      src="audio.mp3"
      title="Amazing Song"
      artist="Great Artist"
    />
  )
}
```

## 🎨 Theming

Both players support custom theming through the `primaryColor` and `darkMode` props.

```tsx
{/* Custom purple theme with dark mode */}
<VideoPlayer
  src="video.mp4"
  primaryColor="#8b5cf6"
  darkMode={true}
/>

{/* Custom blue theme */}
<AudioPlayer
  src="audio.mp3"
  primaryColor="#3b82f6"
/>
```

## 📝 TypeScript Support

Full TypeScript definitions are included. Import types as needed:

```ts
import type {
  VideoPlayerProps,
  AudioPlayerProps,
  VideoPlayerRef,
  AudioPlayerRef,
  TimeUpdatePayload,
  VolumeChangePayload,
  MediaError,
  MediaState
} from '@peakchao/react-media'
```

## 📄 License

MIT © [peakchao](https://github.com/zhangzhichaolove)
