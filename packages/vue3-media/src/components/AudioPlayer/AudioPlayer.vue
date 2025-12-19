<template>
  <div
    class="vm-player vm-audio-player"
    :class="{ 'vm-dark': darkMode }"
    :style="playerStyle"
  >
    <!-- Audio Element -->
    <audio
      ref="audioRef"
      :src="src"
      :autoplay="autoplay"
      :loop="loop"
      :preload="preload"
    />

    <!-- Cover Art -->
    <div class="vm-audio-cover" :class="{ 'vm-spinning': state.playing }">
      <div class="vm-audio-cover-inner">
        <img v-if="cover" :src="cover" :alt="title || 'Audio cover'" class="vm-cover-image" />
        <div v-else class="vm-cover-placeholder">
          <svg class="vm-icon vm-icon-lg" viewBox="0 0 24 24">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
          </svg>
        </div>
      </div>
    </div>

    <!-- Info & Controls Container -->
    <div class="vm-audio-content">
      <!-- Track Info -->
      <div class="vm-audio-info" v-if="title || artist">
        <h3 class="vm-audio-title">{{ title || 'Unknown Title' }}</h3>
        <p class="vm-audio-artist" v-if="artist">{{ artist }}</p>
      </div>

      <!-- Progress Bar -->
      <div class="vm-audio-progress">
        <span class="vm-time vm-time-current">{{ formattedCurrentTime }}</span>
        <div class="vm-progress-container" @click="handleProgressClick">
          <div class="vm-progress-bar">
            <div class="vm-progress-buffered" :style="{ width: state.buffered + '%' }"></div>
            <div class="vm-progress-played" :style="{ width: progress + '%' }"></div>
          </div>
          <input
            type="range"
            class="vm-progress-slider"
            :value="progress"
            min="0"
            max="100"
            step="0.1"
            @input="handleSeek"
            aria-label="Seek"
          />
        </div>
        <span class="vm-time vm-time-duration">{{ formattedDuration }}</span>
      </div>

      <!-- Control Buttons -->
      <div class="vm-audio-controls">
        <!-- Skip Back -->
        <button class="vm-btn" @click="skipBack" aria-label="Skip back 10 seconds">
          <svg class="vm-icon" viewBox="0 0 24 24">
            <path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z" />
          </svg>
        </button>

        <!-- Play/Pause -->
        <button class="vm-btn vm-btn-primary" @click="togglePlay" :aria-label="state.playing ? 'Pause' : 'Play'">
          <svg v-if="state.playing" class="vm-icon vm-icon-lg" viewBox="0 0 24 24">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          </svg>
          <svg v-else class="vm-icon vm-icon-lg" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>

        <!-- Skip Forward -->
        <button class="vm-btn" @click="skipForward" aria-label="Skip forward 10 seconds">
          <svg class="vm-icon" viewBox="0 0 24 24">
            <path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z" />
          </svg>
        </button>
      </div>

      <!-- Volume Control -->
      <div class="vm-audio-volume">
        <button class="vm-btn vm-btn-small" @click="toggleMute" :aria-label="state.muted ? 'Unmute' : 'Mute'">
          <svg v-if="state.muted || state.volume === 0" class="vm-icon" viewBox="0 0 24 24">
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
          </svg>
          <svg v-else-if="state.volume < 0.5" class="vm-icon" viewBox="0 0 24 24">
            <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z" />
          </svg>
          <svg v-else class="vm-icon" viewBox="0 0 24 24">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
          </svg>
        </button>
        <input
          type="range"
          class="vm-slider vm-volume-slider"
          :value="state.muted ? 0 : state.volume * 100"
          min="0"
          max="100"
          @input="handleVolumeChange"
          aria-label="Volume"
        />
      </div>
    </div>

    <!-- Loading Overlay -->
    <Transition name="vm-fade">
      <div v-if="state.waiting && !state.ended" class="vm-audio-loading">
        <div class="vm-loading-spinner"></div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useMediaControl } from '@/composables/useMediaControl'
import type { AudioPlayerProps, TimeUpdatePayload, VolumeChangePayload, MediaError } from '@/types'

const props = withDefaults(defineProps<AudioPlayerProps>(), {
  autoplay: false,
  loop: false,
  primaryColor: '#6366f1',
  darkMode: false,
  preload: 'metadata',
})

const emit = defineEmits<{
  play: []
  pause: []
  ended: []
  timeupdate: [payload: TimeUpdatePayload]
  volumechange: [payload: VolumeChangePayload]
  error: [error: MediaError]
  loadedmetadata: [payload: { duration: number }]
}>()

// Refs
const audioRef = ref<HTMLAudioElement | null>(null)

// Media Control
const {
  state,
  progress,
  formattedCurrentTime,
  formattedDuration,
  togglePlay,
  seek,
  seekPercentage,
  setVolume,
  toggleMute,
} = useMediaControl(audioRef, {
  onPlay: () => emit('play'),
  onPause: () => emit('pause'),
  onEnded: () => emit('ended'),
  onTimeUpdate: (payload) => emit('timeupdate', payload),
  onVolumeChange: (payload) => emit('volumechange', payload),
  onError: (error) => emit('error', error),
  onLoadedMetadata: (payload) => emit('loadedmetadata', payload),
})

// Computed
const playerStyle = computed(() => ({
  '--vm-primary': props.primaryColor,
  '--vm-primary-hover': adjustColor(props.primaryColor, -15),
  '--vm-primary-light': hexToRgba(props.primaryColor, 0.2),
}))

// Methods
function adjustColor(hex: string, percent: number): string {
  const num = parseInt(hex.replace('#', ''), 16)
  const amt = Math.round(2.55 * percent)
  const R = Math.max(0, Math.min(255, (num >> 16) + amt))
  const G = Math.max(0, Math.min(255, ((num >> 8) & 0x00ff) + amt))
  const B = Math.max(0, Math.min(255, (num & 0x0000ff) + amt))
  return `#${(0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)}`
}

function hexToRgba(hex: string, alpha: number): string {
  const num = parseInt(hex.replace('#', ''), 16)
  const R = (num >> 16) & 0xff
  const G = (num >> 8) & 0xff
  const B = num & 0xff
  return `rgba(${R}, ${G}, ${B}, ${alpha})`
}

function handleProgressClick(e: MouseEvent) {
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
  const percentage = ((e.clientX - rect.left) / rect.width) * 100
  seekPercentage(percentage)
}

function handleSeek(e: Event) {
  const value = parseFloat((e.target as HTMLInputElement).value)
  seekPercentage(value)
}

function handleVolumeChange(e: Event) {
  const value = parseFloat((e.target as HTMLInputElement).value)
  setVolume(value / 100)
}

function skipBack() {
  seek(state.value.currentTime - 10)
}

function skipForward() {
  seek(state.value.currentTime + 10)
}

// Expose methods for external use
defineExpose({
  play: () => audioRef.value?.play(),
  pause: () => audioRef.value?.pause(),
  seek: (time: number) => { if (audioRef.value) audioRef.value.currentTime = time },
  setVolume,
  getState: () => state.value,
})
</script>

<style scoped>
@import '@/styles/base.css';

.vm-audio-player {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 16px 24px;
  background: var(--vm-bg);
  border-radius: var(--vm-border-radius);
  box-shadow: var(--vm-shadow);
  position: relative;
  overflow: hidden;
}

/* Cover Art */
.vm-audio-cover {
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: transform var(--vm-transition);
}

.vm-audio-cover.vm-spinning {
  animation: vm-rotate 8s linear infinite;
}

@keyframes vm-rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.vm-audio-cover-inner {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
}

.vm-audio-cover-inner::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 16px;
  height: 16px;
  background: var(--vm-bg);
  border-radius: 50%;
  box-shadow: 0 0 0 3px var(--vm-bg-tertiary);
}

.vm-cover-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.vm-cover-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--vm-primary), var(--vm-primary-hover));
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

/* Content Container */
.vm-audio-content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* Track Info */
.vm-audio-info {
  text-align: center;
}

.vm-audio-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--vm-text);
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.vm-audio-artist {
  font-size: 13px;
  color: var(--vm-text-secondary);
  margin: 2px 0 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Progress */
.vm-audio-progress {
  display: flex;
  align-items: center;
  gap: 12px;
}

.vm-audio-progress .vm-progress-container {
  flex: 1;
  position: relative;
  height: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.vm-audio-progress .vm-progress-bar {
  position: absolute;
  width: 100%;
  height: 4px;
  background: var(--vm-bg-tertiary);
  border-radius: 2px;
  overflow: hidden;
  transition: height var(--vm-transition-fast);
}

.vm-audio-progress .vm-progress-container:hover .vm-progress-bar {
  height: 6px;
}

.vm-audio-progress .vm-progress-buffered {
  position: absolute;
  height: 100%;
  background: var(--vm-bg-secondary);
  transition: width var(--vm-transition-fast);
}

.vm-audio-progress .vm-progress-played {
  position: absolute;
  height: 100%;
  background: var(--vm-primary);
  transition: width 0.1s linear;
}

.vm-audio-progress .vm-progress-slider {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.vm-time-current,
.vm-time-duration {
  color: var(--vm-text-muted);
  min-width: 40px;
  text-align: center;
}

/* Controls */
.vm-audio-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.vm-audio-controls .vm-btn {
  color: var(--vm-text-secondary);
}

.vm-audio-controls .vm-btn:hover {
  color: var(--vm-text);
  background: var(--vm-bg-secondary);
}

.vm-btn-primary {
  width: 48px;
  height: 48px;
  background: var(--vm-primary) !important;
  color: #fff !important;
  border-radius: 50%;
  box-shadow: 0 2px 8px var(--vm-primary-light);
  transition: all var(--vm-transition);
}

.vm-btn-primary:hover {
  background: var(--vm-primary-hover) !important;
  transform: scale(1.05);
}

.vm-btn-primary svg {
  margin-left: 2px;
}

/* Volume */
.vm-audio-volume {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.vm-audio-volume .vm-btn-small {
  padding: 6px;
}

.vm-audio-volume .vm-btn-small .vm-icon {
  width: 18px;
  height: 18px;
}

.vm-audio-volume .vm-btn-small {
  color: var(--vm-text-secondary);
}

.vm-audio-volume .vm-volume-slider {
  width: 100px;
  height: 4px;
  background: var(--vm-bg-tertiary);
}

.vm-audio-volume .vm-volume-slider::-webkit-slider-thumb {
  border-color: var(--vm-bg);
}

/* Loading */
.vm-audio-loading {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
}

.vm-dark .vm-audio-loading {
  background: rgba(0, 0, 0, 0.6);
}

.vm-audio-loading .vm-loading-spinner {
  width: 32px;
  height: 32px;
}

/* Dark Mode Adjustments */
.vm-dark.vm-audio-player {
  background: var(--vm-bg);
}
</style>
