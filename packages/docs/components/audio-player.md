# AudioPlayer 音频播放器

美观的音频播放器组件，支持专辑封面显示。

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

<div class="demo-container demo-container--audio" :style="{ background: darkMode ? '#1a1a2e' : '' }">
  <AudioPlayer
    src="https://file.peakchao.com:5/%E7%BA%A2%E7%8E%AB%E7%91%B0-%E9%99%88%E5%A5%95%E8%BF%85.mp3"
    title="红玫瑰"
    artist="陈奕迅"
    cover="https://file.peakchao.com:5/%E7%BA%A2%E7%8E%AB%E7%91%B0-%E9%99%88%E5%A5%95%E8%BF%85.jpg"
    :primaryColor="primaryColor"
    :darkMode="darkMode"
  />
</div>

```vue
<template>
  <AudioPlayer
    src="https://example.com/audio.mp3"
    title="歌曲名称"
    artist="歌手"
    cover="https://example.com/cover.jpg"
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
| `src` | `string` | **必填** | 音频源 URL |
| `title` | `string` | - | 曲目标题 |
| `artist` | `string` | - | 歌手名称 |
| `cover` | `string` | - | 封面图片 URL |
| `autoplay` | `boolean` | `false` | 自动播放 |
| `loop` | `boolean` | `false` | 循环播放 |
| `primaryColor` | `string` | `'#6366f1'` | 主题色 |
| `darkMode` | `boolean` | `false` | 深色模式 |
| `preload` | `'auto' \| 'metadata' \| 'none'` | `'metadata'` | 预加载方式 |

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
</script>

<template>
  <AudioPlayer ref="playerRef" src="audio.mp3" />
</template>
```

| 方法 | 参数 | 描述 |
|------|------|------|
| `play()` | - | 播放 |
| `pause()` | - | 暂停 |
| `seek(time)` | `time: number` | 跳转到指定时间（秒） |
| `setVolume(volume)` | `volume: number` | 设置音量 (0-1) |

## 示例

### 无封面

```vue
<template>
  <AudioPlayer
    src="audio.mp3"
    title="播客节目"
    artist="主播"
    primaryColor="#10b981"
  />
</template>
```

### 事件处理

```vue
<script setup>
function handlePlay() {
  console.log('开始播放')
}

function handleTimeUpdate({ currentTime, duration, percentage }) {
  console.log(`播放进度: ${percentage.toFixed(1)}%`)
}

function handleEnded() {
  console.log('播放结束')
}
</script>

<template>
  <AudioPlayer
    src="audio.mp3"
    @play="handlePlay"
    @timeupdate="handleTimeUpdate"
    @ended="handleEnded"
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
