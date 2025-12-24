# Getting Started

## Installation

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

## Import Styles

Import styles in your application entry file:

```tsx
// main.tsx or App.tsx
import '@peakchao/react-media/style'
```

## Use Components

```tsx
import { VideoPlayer, AudioPlayer } from '@peakchao/react-media'
import '@peakchao/react-media/style'

function App() {
  return (
    <>
      {/* Video Player */}
      <VideoPlayer
        src="https://example.com/video.mp4"
        poster="https://example.com/poster.jpg"
      />

      {/* Audio Player */}
      <AudioPlayer
        src="https://example.com/audio.mp3"
        title="Song Title"
        artist="Artist Name"
        cover="https://example.com/cover.jpg"
      />
    </>
  )
}
```

## TypeScript Support

The library provides complete TypeScript definitions:

```tsx
import type {
  VideoPlayerProps,
  AudioPlayerProps,
  VideoPlayerRef,
  AudioPlayerRef,
  TimeUpdatePayload
} from '@peakchao/react-media'
```
