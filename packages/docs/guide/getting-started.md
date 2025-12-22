# 快速开始

## 安装

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

## 使用方式

### 方式一：全局注册所有组件

```ts
import { createApp } from 'vue'
import Vue3Media from '@peakchao/vue3-media'
import '@peakchao/vue3-media/style'

const app = createApp(App)
app.use(Vue3Media)  // 注册所有组件
app.mount('#app')
```

### 方式二：按需全局注册

```ts
import { createApp } from 'vue'
import { VideoPlayer, AudioPlayer } from '@peakchao/vue3-media'
import '@peakchao/vue3-media/style'

const app = createApp(App)
app.use(VideoPlayer)  // 只注册 VideoPlayer
app.use(AudioPlayer)  // 只注册 AudioPlayer
app.mount('#app')
```

### 方式三：组件内按需引入

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

## 基本示例

### 视频播放器

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

### 音频播放器

```vue
<template>
  <AudioPlayer
    src="https://example.com/audio.mp3"
    title="歌曲名称"
    artist="歌手"
    cover="https://example.com/cover.jpg"
    primaryColor="#6366f1"
  />
</template>
```

## 下一步

- 查看 [VideoPlayer 组件](/components/video-player) 详细文档
- 查看 [AudioPlayer 组件](/components/audio-player) 详细文档
- 了解如何 [定制主题](/guide/theming)
