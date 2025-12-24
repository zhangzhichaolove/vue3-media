# VideoPlayer 视频播放器

功能完整的视频播放器组件，支持快捷键、画中画、迷你播放器等功能。

## 基础用法

```tsx
import { VideoPlayer } from '@peakchao/react-media'

<VideoPlayer
  src="https://example.com/video.mp4"
  poster="https://example.com/poster.jpg"
/>
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `src` | `string` | 必填 | 视频源 URL |
| `poster` | `string` | - | 封面图 URL |
| `autoplay` | `boolean` | `false` | 自动播放 |
| `loop` | `boolean` | `false` | 循环播放 |
| `muted` | `boolean` | `false` | 静音 |
| `controls` | `boolean` | `true` | 显示控制栏 |
| `width` | `string \| number` | `'100%'` | 播放器宽度 |
| `height` | `string \| number` | `'auto'` | 播放器高度 |
| `primaryColor` | `string` | `'#6366f1'` | 主题色 |
| `darkMode` | `boolean` | `false` | 深色模式 |
| `playbackRates` | `number[]` | `[0.5, 0.75, 1, 1.25, 1.5, 2]` | 播放速度选项 |
| `keyboardShortcuts` | `boolean` | `true` | 启用键盘快捷键 |
| `globalKeyboardShortcuts` | `boolean` | `false` | 全局键盘快捷键 |
| `showPiP` | `boolean` | `true` | 显示画中画按钮 |
| `showSpeed` | `boolean` | `true` | 显示播放速度按钮 |
| `showFullscreen` | `boolean` | `true` | 显示全屏按钮 |
| `showThumbnailPreview` | `boolean` | `true` | 显示缩略图预览 |
| `touchGestures` | `boolean` | `true` | 启用触摸手势 |
| `miniPlayer` | `boolean` | `false` | 启用迷你播放器 |
| `miniPlayerPosition` | `string` | `'bottom-right'` | 迷你播放器位置 |
| `backgroundColor` | `string` | `'transparent'` | 背景色 |

## 事件回调

| 属性 | 类型 | 说明 |
|------|------|------|
| `onPlay` | `() => void` | 播放时触发 |
| `onPause` | `() => void` | 暂停时触发 |
| `onEnded` | `() => void` | 播放结束时触发 |
| `onTimeUpdate` | `(payload: TimeUpdatePayload) => void` | 播放进度更新 |
| `onVolumeChange` | `(payload: VolumeChangePayload) => void` | 音量变化 |
| `onError` | `(error: MediaError) => void` | 播放错误 |
| `onLoadedMetadata` | `(payload: LoadedMetadataPayload) => void` | 元数据加载完成 |

## Ref 方法

```tsx
import { useRef } from 'react'
import { VideoPlayer, VideoPlayerRef } from '@peakchao/react-media'

function App() {
  const playerRef = useRef<VideoPlayerRef>(null)

  return (
    <>
      <VideoPlayer ref={playerRef} src="video.mp4" />
      <button onClick={() => playerRef.current?.play()}>播放</button>
      <button onClick={() => playerRef.current?.pause()}>暂停</button>
      <button onClick={() => playerRef.current?.seek(30)}>跳转到 30s</button>
      <button onClick={() => playerRef.current?.setVolume(0.5)}>音量 50%</button>
      <button onClick={() => playerRef.current?.toggleFullscreen()}>全屏</button>
      <button onClick={() => playerRef.current?.togglePiP()}>画中画</button>
    </>
  )
}
```

## 键盘快捷键

| 按键 | 功能 |
|------|------|
| `Space` | 播放/暂停 |
| `←` / `→` | 快退/快进 5 秒 |
| `↑` / `↓` | 音量 ±10% |
| `M` | 静音/取消静音 |
| `F` | 切换全屏 |
| `Escape` | 退出全屏/画中画 |

## 自定义控制按钮

通过 `children` 和 `controlsLeft` 属性添加自定义按钮：

```tsx
<VideoPlayer
  src="video.mp4"
  controlsLeft={
    <button className="vm-btn" onClick={handleDownload}>
      下载
    </button>
  }
>
  <button className="vm-btn" onClick={handleShare}>
    分享
  </button>
</VideoPlayer>
```
