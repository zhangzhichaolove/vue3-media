# Vue3 Media

🎬 A beautiful Vue 3 media player component library with video and audio players.

[![Vue 3](https://img.shields.io/badge/Vue-3.x-brightgreen.svg)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- 🎥 **Video Player** - Full-featured video player with custom controls
- 🎵 **Audio Player** - Beautiful audio player with album art support
- 🎨 **Customizable Theme** - Primary color configuration
- 🌙 **Dark Mode** - Built-in dark mode support
- 📱 **Responsive** - Mobile-friendly design
- 🔧 **TypeScript** - Full TypeScript support
- ⚡ **Lightweight** - No external dependencies

## 📦 Installation

```bash
# npm
npm install vue3-media

# yarn
yarn add vue3-media

# pnpm
pnpm add vue3-media
```

## 🚀 Quick Start

### Global Registration

```ts
import { createApp } from 'vue'
import Vue3Media from 'vue3-media'
import 'vue3-media/dist/style.css'

const app = createApp(App)
app.use(Vue3Media)
app.mount('#app')
```

### Per-Component Import

```vue
<script setup lang="ts">
import { VideoPlayer, AudioPlayer } from 'vue3-media'
import 'vue3-media/dist/style.css'
</script>

<template>
  <VideoPlayer src="video.mp4" />
  <AudioPlayer src="audio.mp3" />
</template>
```

## 📖 Components

### VideoPlayer

A full-featured video player with custom controls.

```vue
<template>
  <VideoPlayer
    src="https://example.com/video.mp4"
    poster="https://example.com/poster.jpg"
    :autoplay="false"
    :loop="false"
    :muted="false"
    :controls="true"
    width="100%"
    height="auto"
    primaryColor="#6366f1"
    :darkMode="false"
    :playbackRates="[0.5, 1, 1.5, 2]"
    @play="onPlay"
    @pause="onPause"
    @ended="onEnded"
    @timeupdate="onTimeUpdate"
    @volumechange="onVolumeChange"
    @error="onError"
    @loadedmetadata="onLoadedMetadata"
  />
</template>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | **required** | Video source URL |
| `poster` | `string` | - | Poster image URL |
| `autoplay` | `boolean` | `false` | Auto play on load |
| `loop` | `boolean` | `false` | Loop playback |
| `muted` | `boolean` | `false` | Start muted |
| `controls` | `boolean` | `true` | Show controls |
| `width` | `string \| number` | `'100%'` | Player width |
| `height` | `string \| number` | `'auto'` | Player height |
| `primaryColor` | `string` | `'#6366f1'` | Primary theme color |
| `darkMode` | `boolean` | `false` | Enable dark mode |
| `playbackRates` | `number[]` | `[0.5, 0.75, 1, 1.25, 1.5, 2]` | Playback speed options |
| `preload` | `'auto' \| 'metadata' \| 'none'` | `'metadata'` | Preload behavior |

### AudioPlayer

A beautiful audio player with album art support.

```vue
<template>
  <AudioPlayer
    src="https://example.com/audio.mp3"
    title="Song Title"
    artist="Artist Name"
    cover="https://example.com/cover.jpg"
    :autoplay="false"
    :loop="false"
    primaryColor="#6366f1"
    :darkMode="false"
    @play="onPlay"
    @pause="onPause"
    @ended="onEnded"
    @timeupdate="onTimeUpdate"
    @volumechange="onVolumeChange"
    @error="onError"
  />
</template>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | **required** | Audio source URL |
| `title` | `string` | - | Track title |
| `artist` | `string` | - | Artist name |
| `cover` | `string` | - | Cover image URL |
| `autoplay` | `boolean` | `false` | Auto play on load |
| `loop` | `boolean` | `false` | Loop playback |
| `primaryColor` | `string` | `'#6366f1'` | Primary theme color |
| `darkMode` | `boolean` | `false` | Enable dark mode |
| `preload` | `'auto' \| 'metadata' \| 'none'` | `'metadata'` | Preload behavior |

## 📡 Events

Both players emit the following events:

| Event | Payload | Description |
|-------|---------|-------------|
| `play` | - | Playback started |
| `pause` | - | Playback paused |
| `ended` | - | Playback ended |
| `timeupdate` | `{ currentTime, duration, percentage }` | Time updated |
| `volumechange` | `{ volume, muted }` | Volume changed |
| `error` | `{ code, message }` | An error occurred |
| `loadedmetadata` | `{ duration }` | Metadata loaded |

## 🎨 Theming

### Custom Primary Color

```vue
<VideoPlayer src="video.mp4" primaryColor="#ff6b6b" />
```

### Dark Mode

```vue
<VideoPlayer src="video.mp4" :darkMode="true" />
```

### CSS Variables

You can override the following CSS variables:

```css
:root {
  --vm-primary: #6366f1;
  --vm-border-radius: 12px;
  --vm-transition: 0.25s ease;
}
```

## 🔧 Exposed Methods

Access player methods via template refs:

```vue
<script setup>
import { ref } from 'vue'

const playerRef = ref()

// Control the player
playerRef.value?.play()
playerRef.value?.pause()
playerRef.value?.seek(30) // Seek to 30 seconds
playerRef.value?.setVolume(0.5)
playerRef.value?.setPlaybackRate(1.5)
playerRef.value?.toggleFullscreen() // VideoPlayer only
</script>

<template>
  <VideoPlayer ref="playerRef" src="video.mp4" />
</template>
```

## 📄 License

MIT License © 2024
