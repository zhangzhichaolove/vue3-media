# API 参考

## 类型定义

### ThemeConfig

主题配置接口。

```ts
interface ThemeConfig {
  primaryColor?: string
  darkMode?: boolean
}
```

### VideoPlayerProps

VideoPlayer 组件的属性定义。

```ts
interface VideoPlayerProps {
  /** 视频源 URL (必填) */
  src: string
  /** 封面图片 URL */
  poster?: string
  /** 自动播放 */
  autoplay?: boolean
  /** 循环播放 */
  loop?: boolean
  /** 静音 */
  muted?: boolean
  /** 显示控制栏 */
  controls?: boolean
  /** 播放器宽度 */
  width?: string | number
  /** 播放器高度 */
  height?: string | number
  /** 主题色 */
  primaryColor?: string
  /** 深色模式 */
  darkMode?: boolean
  /** 播放速度选项 */
  playbackRates?: number[]
  /** 预加载方式 */
  preload?: 'auto' | 'metadata' | 'none'
  /** 启用键盘快捷键 */
  keyboardShortcuts?: boolean
  /** 全局键盘快捷键 */
  globalKeyboardShortcuts?: boolean
  /** 显示画中画按钮 */
  showPiP?: boolean
  /** 显示播放速度按钮 */
  showSpeed?: boolean
  /** 显示全屏按钮 */
  showFullscreen?: boolean
  /** 显示缩略图预览 */
  showThumbnailPreview?: boolean
  /** 触摸手势控制 */
  touchGestures?: boolean
  /** 迷你播放器模式 */
  miniPlayer?: boolean
  /** 迷你播放器位置 */
  miniPlayerPosition?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
}
```

### AudioPlayerProps

AudioPlayer 组件的属性定义。

```ts
interface AudioPlayerProps {
  /** 音频源 URL (必填) */
  src: string
  /** 曲目标题 */
  title?: string
  /** 歌手名称 */
  artist?: string
  /** 封面图片 URL */
  cover?: string
  /** 自动播放 */
  autoplay?: boolean
  /** 循环播放 */
  loop?: boolean
  /** 主题色 */
  primaryColor?: string
  /** 深色模式 */
  darkMode?: boolean
  /** 预加载方式 */
  preload?: 'auto' | 'metadata' | 'none'
}
```

### TimeUpdatePayload

时间更新事件的参数。

```ts
interface TimeUpdatePayload {
  currentTime: number
  duration: number
  percentage: number
}
```

### VolumeChangePayload

音量变化事件的参数。

```ts
interface VolumeChangePayload {
  volume: number
  muted: boolean
}
```

### LoadedMetadataPayload

元数据加载事件的参数。

```ts
interface LoadedMetadataPayload {
  duration: number
}
```

### MediaError

媒体错误信息。

```ts
interface MediaError {
  code: number
  message: string
}
```

### MediaState

媒体播放状态。

```ts
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

## 导出

```ts
// 默认导出 - Vue 插件，注册所有组件
import Vue3Media from '@peakchao/vue3-media'

// 命名导出 - 单独组件
import { VideoPlayer, AudioPlayer } from '@peakchao/vue3-media'

// 类型导出
import type {
  ThemeConfig,
  VideoPlayerProps,
  AudioPlayerProps,
  TimeUpdatePayload,
  VolumeChangePayload,
  LoadedMetadataPayload,
  MediaError,
  MediaState
} from '@peakchao/vue3-media'
```
