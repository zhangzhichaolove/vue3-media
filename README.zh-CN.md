# Vue3 Media 🎬

[![npm version](https://img.shields.io/npm/v/@peakchao/vue3-media.svg)](https://www.npmjs.com/package/@peakchao/vue3-media)
[![Vue 3](https://img.shields.io/badge/Vue-3.x-brightgreen.svg)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

中文 | [English](./README.md)

一个美观、功能丰富的 Vue 3 媒体播放器组件库。包含可定制的视频和音频播放器，支持现代 UI、深色模式和完整的 TypeScript 类型。

📚 **[在线文档](https://zhangzhichaolove.github.io/vue3-media/)**

## 📷 预览

### 视频播放器
![视频播放器](./screenshot/视频播放器.png)

### 音频播放器
| 浅色模式 | 深色模式 |
|:--------:|:--------:|
| ![音频播放器](./screenshot/音乐播放器.png) | ![音频播放器-暗色](./screenshot/音乐播放器-暗色.png) |

## ✨ 特性

- 🎥 **视频播放器** - 功能完整的视频播放器，支持画中画、迷你播放器
- 🎵 **音频播放器** - 优雅的音频播放器，支持专辑封面显示
- 🌙 **深色模式** - 内置深色模式支持
- 🎨 **可定制** - 轻松自定义主题色
- 📱 **响应式** - 移动端友好，支持触摸手势
- ⌨️ **快捷键** - 完整的键盘控制支持
- ♿ **无障碍** - 屏幕阅读器友好
- 🔧 **TypeScript** - 完整的类型定义
- ⚡ **轻量级** - 无外部依赖

## 📦 安装

```bash
# npm
npm install @peakchao/vue3-media

# yarn
yarn add @peakchao/vue3-media

# pnpm
pnpm add @peakchao/vue3-media
```

## 🚀 快速开始

### 引入样式

```ts
// main.ts
import '@peakchao/vue3-media/style'
```

### 使用组件

```vue
<script setup>
import { VideoPlayer, AudioPlayer } from '@peakchao/vue3-media'
</script>

<template>
  <!-- 视频播放器 -->
  <VideoPlayer
    src="https://example.com/video.mp4"
    poster="https://example.com/poster.jpg"
  />

  <!-- 音频播放器 -->
  <AudioPlayer
    src="https://example.com/audio.mp3"
    title="歌曲名称"
    artist="歌手"
    cover="https://example.com/cover.jpg"
  />
</template>
```

### 全局注册（可选）

```ts
import { createApp } from 'vue'
import Vue3Media from '@peakchao/vue3-media'
import '@peakchao/vue3-media/style'

const app = createApp(App)
app.use(Vue3Media)
app.mount('#app')
```

## 📹 VideoPlayer 视频播放器

现代化的视频播放器，提供所有你需要的控制功能。

### Props

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `src` | `string` | *必填* | 视频源 URL |
| `poster` | `string` | - | 封面图片 URL |
| `autoplay` | `boolean` | `false` | 自动播放 |
| `loop` | `boolean` | `false` | 循环播放 |
| `muted` | `boolean` | `false` | 默认静音 |
| `controls` | `boolean` | `true` | 显示控制栏 |
| `primaryColor` | `string` | `'#6366f1'` | 主题色 |
| `darkMode` | `boolean` | `false` | 深色模式 |
| `keyboardShortcuts` | `boolean` | `true` | 启用键盘快捷键 |
| `showPiP` | `boolean` | `true` | 显示画中画按钮 |
| `miniPlayer` | `boolean` | `false` | 启用迷你播放器 |

### 键盘快捷键

| 快捷键 | 功能 |
|--------|------|
| `空格` | 播放/暂停 |
| `←` / `→` | 快退/快进 5 秒 |
| `↑` / `↓` | 增加/减少音量 10% |
| `M` | 静音/取消静音 |
| `F` | 全屏/退出全屏 |

## 🎵 AudioPlayer 音频播放器

优雅的音频播放器，支持封面和曲目信息显示。

### Props

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `src` | `string` | *必填* | 音频源 URL |
| `title` | `string` | - | 曲目标题 |
| `artist` | `string` | - | 歌手名称 |
| `cover` | `string` | - | 封面图片 URL |
| `primaryColor` | `string` | `'#6366f1'` | 主题色 |
| `darkMode` | `boolean` | `false` | 深色模式 |

## 🎨 主题定制

```vue
<template>
  <!-- 自定义主题色和深色模式 -->
  <VideoPlayer
    src="video.mp4"
    primaryColor="#8b5cf6"
    :darkMode="true"
  />
</template>
```

## 📄 许可证

MIT License © 2025 [peakchao](https://github.com/zhangzhichaolove)
