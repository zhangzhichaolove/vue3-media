# AudioPlayer

A beautiful audio player component with album art support.

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

<div class="demo-container demo-container--audio" :style="{ background: darkMode ? '#1a1a2e' : '' }">
  <AudioPlayer
    src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    title="SoundHelix Song 1"
    artist="T. Schürger"
    cover="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop"
    :primaryColor="primaryColor"
    :darkMode="darkMode"
  />
</div>

```vue
<template>
  <AudioPlayer
    src="https://example.com/audio.mp3"
    title="Song Title"
    artist="Artist Name"
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

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | **required** | Audio source URL |
| `title` | `string` | - | Track title |
| `artist` | `string` | - | Artist name |
| `cover` | `string` | - | Cover image URL |
| `autoplay` | `boolean` | `false` | Auto play |
| `loop` | `boolean` | `false` | Loop playback |
| `primaryColor` | `string` | `'#6366f1'` | Primary color |
| `darkMode` | `boolean` | `false` | Dark mode |
| `preload` | `'auto' \| 'metadata' \| 'none'` | `'metadata'` | Preload behavior |

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
</script>

<template>
  <AudioPlayer ref="playerRef" src="audio.mp3" />
</template>
```

| Method | Params | Description |
|--------|--------|-------------|
| `play()` | - | Play |
| `pause()` | - | Pause |
| `seek(time)` | `time: number` | Seek to time (seconds) |
| `setVolume(volume)` | `volume: number` | Set volume (0-1) |

## Examples

### Without Cover

```vue
<template>
  <AudioPlayer
    src="audio.mp3"
    title="Podcast Episode"
    artist="Host Name"
    primaryColor="#10b981"
  />
</template>
```

### Event Handling

```vue
<script setup>
function handlePlay() {
  console.log('Playback started')
}

function handleTimeUpdate({ currentTime, duration, percentage }) {
  console.log(`Progress: ${percentage.toFixed(1)}%`)
}

function handleEnded() {
  console.log('Playback ended')
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
