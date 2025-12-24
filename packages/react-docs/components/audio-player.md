# AudioPlayer 音频播放器

优雅的音频播放器组件，支持专辑封面、进度拖拽、音量控制。

## 基础用法

```tsx
import { AudioPlayer } from '@peakchao/react-media'

<AudioPlayer
  src="https://example.com/audio.mp3"
  title="歌曲名称"
  artist="艺术家"
  cover="https://example.com/cover.jpg"
/>
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `src` | `string` | 必填 | 音频源 URL |
| `title` | `string` | - | 歌曲标题 |
| `artist` | `string` | - | 艺术家名称 |
| `cover` | `string` | - | 封面图 URL |
| `autoplay` | `boolean` | `false` | 自动播放 |
| `loop` | `boolean` | `false` | 循环播放 |
| `primaryColor` | `string` | `'#6366f1'` | 主题色 |
| `darkMode` | `boolean` | `false` | 深色模式 |
| `preload` | `'auto' \| 'metadata' \| 'none'` | `'metadata'` | 预加载行为 |

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
import { AudioPlayer, AudioPlayerRef } from '@peakchao/react-media'

function App() {
  const playerRef = useRef<AudioPlayerRef>(null)

  return (
    <>
      <AudioPlayer ref={playerRef} src="audio.mp3" />
      <button onClick={() => playerRef.current?.play()}>播放</button>
      <button onClick={() => playerRef.current?.pause()}>暂停</button>
      <button onClick={() => playerRef.current?.seek(30)}>跳转到 30s</button>
      <button onClick={() => playerRef.current?.setVolume(0.5)}>音量 50%</button>
    </>
  )
}
```

## 封面旋转动画

当音频播放时，封面会自动开始旋转动画，暂停时停止。这个效果通过 CSS 动画实现：

```css
.vm-audio-cover.vm-spinning {
  animation: vm-rotate 8s linear infinite;
}
```
