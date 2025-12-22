# Getting Started

## Installation

::: code-group

```bash [pnpm]
pnpm add @peakchao/vue3-media
```

```bash [npm]
npm install @peakchao/vue3-media
```

```bash [yarn]
yarn add @peakchao/vue3-media
```

:::

## Usage

### Option 1: Global Registration

```ts
import { createApp } from 'vue'
import Vue3Media from '@peakchao/vue3-media'
import '@peakchao/vue3-media/style'

const app = createApp(App)
app.use(Vue3Media)  // Register all components
app.mount('#app')
```

### Option 2: On-demand Global Registration

```ts
import { createApp } from 'vue'
import { VideoPlayer, AudioPlayer } from '@peakchao/vue3-media'
import '@peakchao/vue3-media/style'

const app = createApp(App)
app.use(VideoPlayer)  // Register VideoPlayer only
app.use(AudioPlayer)  // Register AudioPlayer only
app.mount('#app')
```

### Option 3: Component-level Import

```vue
<script setup lang="ts">
import { VideoPlayer, AudioPlayer } from '@peakchao/vue3-media'
import '@peakchao/vue3-media/style'
</script>

<template>
  <VideoPlayer src="video.mp4" />
  <AudioPlayer src="audio.mp3" />
</template>
```

## Basic Examples

### Video Player

```vue
<template>
  <VideoPlayer
    src="https://example.com/video.mp4"
    poster="https://example.com/poster.jpg"
    :autoplay="false"
    primaryColor="#6366f1"
  />
</template>
```

### Audio Player

```vue
<template>
  <AudioPlayer
    src="https://example.com/audio.mp3"
    title="Song Title"
    artist="Artist Name"
    cover="https://example.com/cover.jpg"
    primaryColor="#6366f1"
  />
</template>
```

## Next Steps

- View [VideoPlayer Component](/en/components/video-player) documentation
- View [AudioPlayer Component](/en/components/audio-player) documentation
- Learn how to [customize themes](/en/guide/theming)
