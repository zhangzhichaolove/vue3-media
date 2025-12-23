# VideoPlayer

A full-featured video player component with custom controls, Picture-in-Picture, and mini player support.

## Basic Usage

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
    :globalKeyboardShortcuts="true"
    :miniPlayer="true"
  />
</div>

```vue
<template>
  <VideoPlayer
    src="https://example.com/video.mp4"
    poster="https://example.com/poster.jpg"
    :primaryColor="primaryColor"
    :darkMode="darkMode"
    :globalKeyboardShortcuts="true"
    :miniPlayer="true"
  />
</template>

<script setup>
import { ref } from 'vue'

const darkMode = ref(false)
const primaryColor = ref('#6366f1')
</script>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | **required** | Video source URL |
| `poster` | `string` | - | Poster image URL |
| `autoplay` | `boolean` | `false` | Auto play |
| `loop` | `boolean` | `false` | Loop playback |
| `muted` | `boolean` | `false` | Muted |
| `controls` | `boolean` | `true` | Show controls |
| `width` | `string \| number` | `'100%'` | Player width |
| `height` | `string \| number` | `'auto'` | Player height |
| `primaryColor` | `string` | `'#6366f1'` | Primary color |
| `darkMode` | `boolean` | `false` | Dark mode |
| `playbackRates` | `number[]` | `[0.5, 0.75, 1, 1.25, 1.5, 2]` | Playback speed options |
| `preload` | `'auto' \| 'metadata' \| 'none'` | `'metadata'` | Preload behavior |
| `keyboardShortcuts` | `boolean` | `true` | Enable keyboard shortcuts |
| `globalKeyboardShortcuts` | `boolean` | `false` | Global keyboard shortcuts |
| `showPiP` | `boolean` | `true` | Show PiP button |
| `showSpeed` | `boolean` | `true` | Show speed button |
| `showFullscreen` | `boolean` | `true` | Show fullscreen button |
| `showThumbnailPreview` | `boolean` | `true` | Show thumbnail preview |
| `touchGestures` | `boolean` | `true` | Touch gesture controls |
| `miniPlayer` | `boolean` | `false` | Mini player mode |
| `miniPlayerPosition` | `string` | `'bottom-right'` | Mini player position |
| `backgroundColor` | `string` | `'transparent'` | Player background color |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `play` | - | Playback started |
| `pause` | - | Playback paused |
| `ended` | - | Playback ended |
| `timeupdate` | `{ currentTime, duration, percentage }` | Time updated |
| `volumechange` | `{ volume, muted }` | Volume changed |
| `error` | `{ code, message }` | Error occurred |
| `loadedmetadata` | `{ duration }` | Metadata loaded |

## Methods

Access player methods via template refs:

```vue
<script setup>
import { ref } from 'vue'

const playerRef = ref()

// Control the player
playerRef.value?.play()
playerRef.value?.pause()
playerRef.value?.seek(30) // Seek to 30 seconds
playerRef.value?.setVolume(0.5)
playerRef.value?.setPlaybackRate(1.5)
playerRef.value?.toggleFullscreen()
</script>

<template>
  <VideoPlayer ref="playerRef" src="video.mp4" />
</template>
```

| Method | Params | Description |
|--------|--------|-------------|
| `play()` | - | Play |
| `pause()` | - | Pause |
| `seek(time)` | `time: number` | Seek to time (seconds) |
| `setVolume(volume)` | `volume: number` | Set volume (0-1) |
| `setPlaybackRate(rate)` | `rate: number` | Set playback speed |
| `toggleFullscreen()` | - | Toggle fullscreen |

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Space` | Play/Pause |
| `←` | Rewind 10 seconds |
| `→` | Forward 10 seconds |
| `↑` | Increase volume |
| `↓` | Decrease volume |
| `M` | Mute/Unmute |
| `F` | Fullscreen/Exit |
| `Escape` | Exit fullscreen |

## Advanced Examples

### With Mini Player

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

### Custom Playback Speeds

```vue
<template>
  <VideoPlayer
    src="video.mp4"
    :playbackRates="[0.25, 0.5, 1, 1.5, 2, 3]"
  />
</template>
```

### Custom Control Buttons (Slots)

VideoPlayer provides two slots for adding custom control buttons:

| Slot Name | Description |
|-----------|-------------|
| `controls-left` | Add custom buttons to the left control area |
| `controls` | Add custom buttons after speed/PiP buttons |

```vue
<template>
  <VideoPlayer src="video.mp4">
    <!-- Add download button to left -->
    <template #controls-left>
      <button class="vm-btn" @click="handleDownload">
        <svg class="vm-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
        </svg>
      </button>
    </template>
    
    <!-- Add share button to right -->
    <template #controls>
      <button class="vm-btn" @click="handleShare">
        <svg class="vm-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/>
        </svg>
      </button>
    </template>
  </VideoPlayer>
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
