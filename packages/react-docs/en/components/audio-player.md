# AudioPlayer

Beautiful audio player component with album cover, progress bar, and volume control.

## Basic Usage

```tsx
import { AudioPlayer } from '@peakchao/react-media'

<AudioPlayer
  src="https://example.com/audio.mp3"
  title="Song Title"
  artist="Artist Name"
  cover="https://example.com/cover.jpg"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | required | Audio source URL |
| `title` | `string` | - | Track title |
| `artist` | `string` | - | Artist name |
| `cover` | `string` | - | Cover image URL |
| `autoplay` | `boolean` | `false` | Auto-play |
| `loop` | `boolean` | `false` | Loop playback |
| `primaryColor` | `string` | `'#6366f1'` | Theme color |
| `darkMode` | `boolean` | `false` | Dark mode |
| `preload` | `'auto' \| 'metadata' \| 'none'` | `'metadata'` | Preload behavior |

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
import { AudioPlayer, AudioPlayerRef } from '@peakchao/react-media'

function App() {
  const playerRef = useRef<AudioPlayerRef>(null)

  return (
    <>
      <AudioPlayer ref={playerRef} src="audio.mp3" />
      <button onClick={() => playerRef.current?.play()}>Play</button>
      <button onClick={() => playerRef.current?.pause()}>Pause</button>
    </>
  )
}
```

## Rotating Cover Animation

When audio is playing, the cover rotates automatically. This is implemented with CSS animation:

```css
.vm-audio-cover.vm-spinning {
  animation: vm-rotate 8s linear infinite;
}
```
