# VideoPlayer

Full-featured video player component with keyboard shortcuts, Picture-in-Picture, mini player and more.

## Basic Usage

```tsx
import { VideoPlayer } from '@peakchao/react-media'

<VideoPlayer
  src="https://example.com/video.mp4"
  poster="https://example.com/poster.jpg"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | required | Video source URL |
| `poster` | `string` | - | Poster image URL |
| `autoplay` | `boolean` | `false` | Auto-play |
| `loop` | `boolean` | `false` | Loop playback |
| `muted` | `boolean` | `false` | Muted |
| `controls` | `boolean` | `true` | Show controls |
| `width` | `string \| number` | `'100%'` | Player width |
| `height` | `string \| number` | `'auto'` | Player height |
| `primaryColor` | `string` | `'#6366f1'` | Theme color |
| `darkMode` | `boolean` | `false` | Dark mode |
| `playbackRates` | `number[]` | `[0.5, 0.75, 1, 1.25, 1.5, 2]` | Playback rates |
| `keyboardShortcuts` | `boolean` | `true` | Enable keyboard shortcuts |
| `showPiP` | `boolean` | `true` | Show PiP button |
| `showSpeed` | `boolean` | `true` | Show speed button |
| `showFullscreen` | `boolean` | `true` | Show fullscreen button |
| `touchGestures` | `boolean` | `true` | Enable touch gestures |
| `miniPlayer` | `boolean` | `false` | Enable mini player |

## Events

| Prop | Type | Description |
|------|------|-------------|
| `onPlay` | `() => void` | Fired when playback starts |
| `onPause` | `() => void` | Fired when paused |
| `onEnded` | `() => void` | Fired when ended |
| `onTimeUpdate` | `(payload) => void` | Progress update |
| `onVolumeChange` | `(payload) => void` | Volume change |
| `onError` | `(error) => void` | Playback error |

## Ref Methods

```tsx
import { useRef } from 'react'
import { VideoPlayer, VideoPlayerRef } from '@peakchao/react-media'

function App() {
  const playerRef = useRef<VideoPlayerRef>(null)

  return (
    <>
      <VideoPlayer ref={playerRef} src="video.mp4" />
      <button onClick={() => playerRef.current?.play()}>Play</button>
      <button onClick={() => playerRef.current?.pause()}>Pause</button>
      <button onClick={() => playerRef.current?.toggleFullscreen()}>Fullscreen</button>
    </>
  )
}
```

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Space` | Play/Pause |
| `←` / `→` | Seek ±5 seconds |
| `↑` / `↓` | Volume ±10% |
| `M` | Mute/Unmute |
| `F` | Toggle Fullscreen |
