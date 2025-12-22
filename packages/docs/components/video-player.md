# VideoPlayer 视频播放器

功能完整的视频播放器组件，支持快捷键、画中画、迷你播放器等功能。

## 基本用法

<script setup>
import { ref } from 'vue'

const darkMode = ref(false)
const primaryColor = ref('#6366f1')
</script>

<div class="demo-controls">
  <label class="demo-toggle">
    <input type="checkbox" v-model="darkMode" />
    <span>🌙 Dark Mode</span>
  </label>
  <label class="demo-color">
    <span>Primary Color:</span>
    <input type="color" v-model="primaryColor" />
  </label>
</div>

<div class="demo-container demo-container--video" :style="{ background: darkMode ? '#1a1a2e' : '' }">
  <VideoPlayer
    src="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
    poster="https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1280&h=720&fit=crop"
    :primaryColor="primaryColor"
    :darkMode="darkMode"
  />
</div>

```vue
<template>
  <VideoPlayer
    src="https://example.com/video.mp4"
    poster="https://example.com/poster.jpg"
    :primaryColor="primaryColor"
    :darkMode="darkMode"
  />
</template>

<script setup>
import { ref } from 'vue'

const darkMode = ref(false)
const primaryColor = ref('#6366f1')
</script>
```

## Props

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `src` | `string` | **必填** | 视频源 URL |
| `poster` | `string` | - | 封面图片 URL |
| `autoplay` | `boolean` | `false` | 自动播放 |
| `loop` | `boolean` | `false` | 循环播放 |
| `muted` | `boolean` | `false` | 静音 |
| `controls` | `boolean` | `true` | 显示控制栏 |
| `width` | `string \| number` | `'100%'` | 播放器宽度 |
| `height` | `string \| number` | `'auto'` | 播放器高度 |
| `primaryColor` | `string` | `'#6366f1'` | 主题色 |
| `darkMode` | `boolean` | `false` | 深色模式 |
| `playbackRates` | `number[]` | `[0.5, 0.75, 1, 1.25, 1.5, 2]` | 播放速度选项 |
| `preload` | `'auto' \| 'metadata' \| 'none'` | `'metadata'` | 预加载方式 |
| `keyboardShortcuts` | `boolean` | `true` | 启用键盘快捷键 |
| `globalKeyboardShortcuts` | `boolean` | `false` | 全局键盘快捷键 |
| `showPiP` | `boolean` | `true` | 显示画中画按钮 |
| `showSpeed` | `boolean` | `true` | 显示播放速度按钮 |
| `showFullscreen` | `boolean` | `true` | 显示全屏按钮 |
| `showThumbnailPreview` | `boolean` | `true` | 显示缩略图预览 |
| `touchGestures` | `boolean` | `true` | 触摸手势控制 |
| `miniPlayer` | `boolean` | `false` | 迷你播放器模式 |
| `miniPlayerPosition` | `string` | `'bottom-right'` | 迷你播放器位置 |

## Events

| 事件 | 参数 | 描述 |
|------|------|------|
| `play` | - | 开始播放 |
| `pause` | - | 暂停播放 |
| `ended` | - | 播放结束 |
| `timeupdate` | `{ currentTime, duration, percentage }` | 时间更新 |
| `volumechange` | `{ volume, muted }` | 音量变化 |
| `error` | `{ code, message }` | 发生错误 |
| `loadedmetadata` | `{ duration }` | 元数据加载完成 |

## Methods

通过模板引用访问组件方法：

```vue
<script setup>
import { ref } from 'vue'

const playerRef = ref()

// 控制播放器
playerRef.value?.play()
playerRef.value?.pause()
playerRef.value?.seek(30) // 跳转到 30 秒
playerRef.value?.setVolume(0.5)
playerRef.value?.setPlaybackRate(1.5)
playerRef.value?.toggleFullscreen()
</script>

<template>
  <VideoPlayer ref="playerRef" src="video.mp4" />
</template>
```

| 方法 | 参数 | 描述 |
|------|------|------|
| `play()` | - | 播放 |
| `pause()` | - | 暂停 |
| `seek(time)` | `time: number` | 跳转到指定时间（秒） |
| `setVolume(volume)` | `volume: number` | 设置音量 (0-1) |
| `setPlaybackRate(rate)` | `rate: number` | 设置播放速度 |
| `toggleFullscreen()` | - | 切换全屏 |

## 键盘快捷键

| 快捷键 | 功能 |
|--------|------|
| `Space` | 播放/暂停 |
| `←` | 后退 10 秒 |
| `→` | 前进 10 秒 |
| `↑` | 增加音量 |
| `↓` | 减少音量 |
| `M` | 静音/取消静音 |
| `F` | 全屏/退出全屏 |
| `Escape` | 退出全屏 |

## 高级示例

### 带迷你播放器

```vue
<template>
  <VideoPlayer
    src="video.mp4"
    :miniPlayer="true"
    miniPlayerPosition="bottom-right"
    :globalKeyboardShortcuts="true"
  />
</template>
```

### 自定义播放速度

```vue
<template>
  <VideoPlayer
    src="video.mp4"
    :playbackRates="[0.25, 0.5, 1, 1.5, 2, 3]"
  />
</template>
```

<style>
.demo-controls {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin: 16px 0;
  flex-wrap: wrap;
}

.demo-toggle,
.demo-color {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--vp-c-bg-soft);
  padding: 8px 16px;
  border-radius: 24px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid var(--vp-c-divider);
}

.demo-toggle:hover,
.demo-color:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.demo-color input[type="color"] {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  padding: 0;
  background: none;
}
</style>
