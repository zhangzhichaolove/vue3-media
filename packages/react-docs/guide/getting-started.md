# 快速开始

## 安装

::: code-group

```bash [npm]
npm install @peakchao/react-media
```

```bash [yarn]
yarn add @peakchao/react-media
```

```bash [pnpm]
pnpm add @peakchao/react-media
```

:::

## 引入样式

在你的应用入口文件中引入样式：

```tsx
// main.tsx 或 App.tsx
import '@peakchao/react-media/style'
```

## 使用组件

```tsx
import { VideoPlayer, AudioPlayer } from '@peakchao/react-media'
import '@peakchao/react-media/style'

function App() {
  return (
    <>
      {/* 视频播放器 */}
      <VideoPlayer
        src="https://example.com/video.mp4"
        poster="https://example.com/poster.jpg"
      />

      {/* 音频播放器 */}
      <AudioPlayer
        src="https://example.com/audio.mp3"
        title="歌曲标题"
        artist="艺术家"
        cover="https://example.com/cover.jpg"
      />
    </>
  )
}
```

## TypeScript 支持

组件库提供完整的 TypeScript 类型定义，你可以直接导入类型：

```tsx
import type {
  VideoPlayerProps,
  AudioPlayerProps,
  VideoPlayerRef,
  AudioPlayerRef,
  TimeUpdatePayload
} from '@peakchao/react-media'
```
