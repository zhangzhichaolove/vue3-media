# Vue3 Media 🎬

[![npm version](https://img.shields.io/npm/v/@peakchao/vue3-media.svg)](https://www.npmjs.com/package/@peakchao/vue3-media)
[![license](https://img.shields.io/npm/l/@peakchao/vue3-media.svg)](https://github.com/peakchao/vue3-media/blob/main/LICENSE)

A beautiful, feature-rich media player component library for Vue 3. Includes customizable Video and Audio players with modern UI, dark mode support, and full TypeScript integration.

![Vue3 Media Preview](https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&h=400&fit=crop)

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
npm install @peakchao/vue3-media

# yarn
yarn add @peakchao/vue3-media

# pnpm
pnpm add @peakchao/vue3-media
```

## 🚀 Quick Start

### Import Styles

```ts
// main.ts or main.js
import '@peakchao/vue3-media/style'

// 或者使用完整路径
// import '@peakchao/vue3-media/dist/vue3-media.css'
```

### Use Components

```vue
<script setup>
import { VideoPlayer, AudioPlayer } from '@peakchao/vue3-media'
</script>

<template>
  <!-- Video Player -->
  <VideoPlayer
    src="https://example.com/video.mp4"
    poster="https://example.com/poster.jpg"
  />

  <!-- Audio Player -->
  <AudioPlayer
    src="https://example.com/audio.mp3"
    title="Song Title"
    artist="Artist Name"
    cover="https://example.com/cover.jpg"
  />
</template>
```

### Global Registration (Optional)

```ts
// main.ts
import { createApp } from 'vue'
import Vue3Media from '@peakchao/vue3-media'
import '@peakchao/vue3-media/style'

const app = createApp(App)
app.use(Vue3Media)
app.mount('#app')
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

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `play` | - | Fired when playback starts |
| `pause` | - | Fired when playback pauses |
| `ended` | - | Fired when playback ends |
| `timeupdate` | `{ currentTime, duration, percentage }` | Fired during playback |
| `volumechange` | `{ volume, muted }` | Fired when volume changes |
| `loadedmetadata` | `{ duration }` | Fired when metadata loads |
| `error` | `{ code, message }` | Fired on playback error |

### Exposed Methods

```ts
const playerRef = ref()

// Control playback
playerRef.value.play()
playerRef.value.pause()
playerRef.value.seek(30) // Seek to 30 seconds
playerRef.value.setVolume(0.5) // Set volume to 50%
playerRef.value.setPlaybackRate(1.5) // Set speed to 1.5x
playerRef.value.toggleFullscreen()
playerRef.value.getState() // Get current player state
```

### Example

```vue
<template>
  <VideoPlayer
    ref="player"
    src="https://example.com/video.mp4"
    poster="https://example.com/poster.jpg"
    :primaryColor="themeColor"
    :darkMode="isDark"
    @play="onPlay"
    @timeupdate="onTimeUpdate"
  />
</template>

<script setup>
import { ref } from 'vue'
import { VideoPlayer } from '@peakchao/vue3-media'

const player = ref()
const themeColor = ref('#6366f1')
const isDark = ref(false)

function onPlay() {
  console.log('Video started playing')
}

function onTimeUpdate({ currentTime, duration, percentage }) {
  console.log(`Progress: ${percentage.toFixed(1)}%`)
}
</script>
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

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `play` | - | Fired when playback starts |
| `pause` | - | Fired when playback pauses |
| `ended` | - | Fired when playback ends |
| `timeupdate` | `{ currentTime, duration, percentage }` | Fired during playback |
| `volumechange` | `{ volume, muted }` | Fired when volume changes |
| `loadedmetadata` | `{ duration }` | Fired when metadata loads |
| `error` | `{ code, message }` | Fired on playback error |

### Exposed Methods

```ts
const playerRef = ref()

// Control playback
playerRef.value.play()
playerRef.value.pause()
playerRef.value.seek(30) // Seek to 30 seconds
playerRef.value.setVolume(0.5) // Set volume to 50%
playerRef.value.getState() // Get current player state
```

### Example

```vue
<template>
  <AudioPlayer
    ref="player"
    src="https://example.com/music.mp3"
    title="Amazing Song"
    artist="Great Artist"
    cover="https://example.com/album-cover.jpg"
    :primaryColor="themeColor"
    :darkMode="isDark"
    @play="onPlay"
  />
</template>

<script setup>
import { ref } from 'vue'
import { AudioPlayer } from '@peakchao/vue3-media'

const player = ref()
const themeColor = ref('#6366f1')
const isDark = ref(false)

function onPlay() {
  console.log('Audio started playing')
}
</script>
```

## 🎨 Theming

Both players support custom theming through the `primaryColor` and `darkMode` props.

```vue
<template>
  <!-- Custom purple theme with dark mode -->
  <VideoPlayer
    src="video.mp4"
    primaryColor="#8b5cf6"
    :darkMode="true"
  />

  <!-- Custom blue theme -->
  <AudioPlayer
    src="audio.mp3"
    primaryColor="#3b82f6"
  />
</template>
```

## 📝 TypeScript Support

Full TypeScript definitions are included. Import types as needed:

```ts
import type {
  VideoPlayerProps,
  AudioPlayerProps,
  TimeUpdatePayload,
  VolumeChangePayload,
  MediaError,
  MediaState
} from '@peakchao/vue3-media'
```

## 📄 License

MIT © [peakchao](https://github.com/zhangzhichaolove)
