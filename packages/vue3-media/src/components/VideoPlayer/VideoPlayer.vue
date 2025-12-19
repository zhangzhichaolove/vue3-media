<template>
  <div
    ref="containerRef"
    class="vm-player vm-video-player"
    :class="{ 'vm-dark': darkMode, 'vm-fullscreen': isFullscreen }"
    :style="containerStyle"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <!-- Video Element -->
    <video
      ref="videoRef"
      class="vm-video"
      :src="src"
      :poster="poster"
      :autoplay="autoplay"
      :loop="loop"
      :muted="muted"
      :preload="preload"
      @click="togglePlay"
      @dblclick="toggleFullscreen"
    />

    <!-- Loading Spinner -->
    <Transition name="vm-fade">
      <div v-if="state.waiting && !state.ended" class="vm-loading">
        <div class="vm-loading-spinner"></div>
      </div>
    </Transition>

    <!-- Play Button Overlay -->
    <Transition name="vm-fade">
      <button
        v-if="!state.playing && !state.waiting"
        class="vm-play-overlay"
        @click="togglePlay"
        aria-label="Play"
      >
        <svg class="vm-icon vm-icon-lg" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
      </button>
    </Transition>

    <!-- Controls -->
    <Transition name="vm-fade">
      <div
        v-if="controls"
        v-show="showControls || !state.playing"
        class="vm-controls"
      >
        <!-- Progress Bar -->
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
          <div 
            v-if="hoverTime !== null" 
            class="vm-progress-tooltip"
            :style="{ left: hoverPosition + '%' }"
          >
            {{ formatTime(hoverTime) }}
          </div>
        </div>

        <!-- Control Buttons -->
        <div class="vm-controls-bar">
          <div class="vm-controls-left">
            <!-- Play/Pause -->
            <button class="vm-btn" @click="togglePlay" :aria-label="state.playing ? 'Pause' : 'Play'">
              <svg v-if="state.playing" class="vm-icon" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
              <svg v-else class="vm-icon" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>

            <!-- Volume -->
            <div class="vm-volume-container">
              <button class="vm-btn" @click="toggleMute" :aria-label="state.muted ? 'Unmute' : 'Mute'">
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
              <div class="vm-volume-slider-container">
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

            <!-- Time Display -->
            <span class="vm-time">
              {{ formattedCurrentTime }} / {{ formattedDuration }}
            </span>
          </div>

          <div class="vm-controls-right">
            <!-- Playback Speed -->
            <div class="vm-speed-container">
              <button class="vm-btn vm-speed-btn" @click="toggleSpeedMenu" aria-label="Playback speed">
                {{ state.playbackRate }}x
              </button>
              <Transition name="vm-fade">
                <div v-if="showSpeedMenu" class="vm-speed-menu">
                  <button
                    v-for="rate in playbackRates"
                    :key="rate"
                    class="vm-speed-option"
                    :class="{ 'vm-active': state.playbackRate === rate }"
                    @click="selectPlaybackRate(rate)"
                  >
                    {{ rate }}x
                  </button>
                </div>
              </Transition>
            </div>

            <!-- Fullscreen -->
            <button class="vm-btn" @click="toggleFullscreen" :aria-label="isFullscreen ? 'Exit fullscreen' : 'Fullscreen'">
              <svg v-if="isFullscreen" class="vm-icon" viewBox="0 0 24 24">
                <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
              </svg>
              <svg v-else class="vm-icon" viewBox="0 0 24 24">
                <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useMediaControl } from '@/composables/useMediaControl'
import type { VideoPlayerProps, TimeUpdatePayload, VolumeChangePayload, MediaError } from '@/types'

const props = withDefaults(defineProps<VideoPlayerProps>(), {
  autoplay: false,
  loop: false,
  muted: false,
  controls: true,
  width: '100%',
  height: 'auto',
  primaryColor: '#6366f1',
  darkMode: false,
  playbackRates: () => [0.5, 0.75, 1, 1.25, 1.5, 2],
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
const containerRef = ref<HTMLDivElement | null>(null)
const videoRef = ref<HTMLVideoElement | null>(null)

// State
const showControls = ref(true)
const showSpeedMenu = ref(false)
const isFullscreen = ref(false)
const hoverTime = ref<number | null>(null)
const hoverPosition = ref(0)
let hideControlsTimeout: ReturnType<typeof setTimeout> | null = null

// Media Control
const {
  state,
  progress,
  formattedCurrentTime,
  formattedDuration,
  togglePlay,
  seekPercentage,
  setVolume,
  toggleMute,
  setPlaybackRate,
  formatTime,
} = useMediaControl(videoRef, {
  initialMuted: props.muted,
  onPlay: () => emit('play'),
  onPause: () => emit('pause'),
  onEnded: () => emit('ended'),
  onTimeUpdate: (payload) => emit('timeupdate', payload),
  onVolumeChange: (payload) => emit('volumechange', payload),
  onError: (error) => emit('error', error),
  onLoadedMetadata: (payload) => emit('loadedmetadata', payload),
})

// Computed
const containerStyle = computed(() => ({
  width: typeof props.width === 'number' ? `${props.width}px` : props.width,
  height: typeof props.height === 'number' ? `${props.height}px` : props.height,
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

function handleMouseMove() {
  showControls.value = true
  resetHideControlsTimeout()
}

function handleMouseLeave() {
  if (state.value.playing) {
    showControls.value = false
  }
}

function resetHideControlsTimeout() {
  if (hideControlsTimeout) {
    clearTimeout(hideControlsTimeout)
  }
  if (state.value.playing) {
    hideControlsTimeout = setTimeout(() => {
      showControls.value = false
    }, 3000)
  }
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

function toggleSpeedMenu() {
  showSpeedMenu.value = !showSpeedMenu.value
}

function selectPlaybackRate(rate: number) {
  setPlaybackRate(rate)
  showSpeedMenu.value = false
}

function toggleFullscreen() {
  if (!containerRef.value) return

  if (document.fullscreenElement) {
    document.exitFullscreen()
    isFullscreen.value = false
  } else {
    containerRef.value.requestFullscreen()
    isFullscreen.value = true
  }
}

// Fullscreen change listener
function handleFullscreenChange() {
  isFullscreen.value = !!document.fullscreenElement
}

// Close speed menu on outside click
function handleClickOutside(e: MouseEvent) {
  if (showSpeedMenu.value && !(e.target as Element).closest('.vm-speed-container')) {
    showSpeedMenu.value = false
  }
}



// Lifecycle
onMounted(() => {
  document.addEventListener('fullscreenchange', handleFullscreenChange)
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('fullscreenchange', handleFullscreenChange)
  document.removeEventListener('click', handleClickOutside)
  if (hideControlsTimeout) {
    clearTimeout(hideControlsTimeout)
  }
})

// Watch playing state to manage controls visibility
watch(() => state.value.playing, (playing) => {
  if (playing) {
    resetHideControlsTimeout()
  } else {
    showControls.value = true
  }
})

// Expose methods for external use
defineExpose({
  play: () => videoRef.value?.play(),
  pause: () => videoRef.value?.pause(),
  seek: (time: number) => { if (videoRef.value) videoRef.value.currentTime = time },
  setVolume,
  setPlaybackRate,
  toggleFullscreen,
  getState: () => state.value,
})
</script>

<style scoped>
@import '@/styles/base.css';

.vm-video-player {
  position: relative;
  background: #000;
  border-radius: var(--vm-border-radius);
  overflow: hidden;
  box-shadow: var(--vm-shadow-lg);
}

.vm-video {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: contain;
}

.vm-fullscreen {
  border-radius: 0;
}

.vm-fullscreen .vm-video {
  height: 100vh;
}

/* Play Overlay */
.vm-play-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 72px;
  height: 72px;
  background: var(--vm-primary);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  transition: all var(--vm-transition);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.vm-play-overlay:hover {
  background: var(--vm-primary-hover);
  transform: translate(-50%, -50%) scale(1.1);
}

.vm-play-overlay svg {
  margin-left: 4px;
}

/* Controls */
.vm-controls {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0 16px 12px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  pointer-events: auto;
}

/* Progress Bar */
.vm-progress-container {
  position: relative;
  height: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 8px;
}

.vm-progress-bar {
  position: absolute;
  width: 100%;
  height: 4px;
  background: var(--vm-progress-bg);
  border-radius: 2px;
  overflow: hidden;
  transition: height var(--vm-transition-fast);
}

.vm-progress-container:hover .vm-progress-bar {
  height: 6px;
}

.vm-progress-buffered {
  position: absolute;
  height: 100%;
  background: var(--vm-progress-buffered);
  transition: width var(--vm-transition-fast);
}

.vm-progress-played {
  position: absolute;
  height: 100%;
  background: var(--vm-primary);
  transition: width 0.1s linear;
}

.vm-progress-slider {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.vm-progress-tooltip {
  position: absolute;
  bottom: 100%;
  transform: translateX(-50%);
  padding: 4px 8px;
  background: rgba(0, 0, 0, 0.9);
  color: #fff;
  font-size: 12px;
  border-radius: 4px;
  white-space: nowrap;
  pointer-events: none;
  margin-bottom: 4px;
}

/* Controls Bar */
.vm-controls-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.vm-controls-left,
.vm-controls-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Volume */
.vm-volume-container {
  display: flex;
  align-items: center;
  gap: 4px;
}

.vm-volume-slider-container {
  width: 0;
  overflow: hidden;
  transition: width var(--vm-transition);
}

.vm-volume-container:hover .vm-volume-slider-container {
  width: 80px;
}

.vm-volume-slider {
  width: 80px;
}

/* Speed Menu */
.vm-speed-container {
  position: relative;
}

.vm-speed-btn {
  font-size: 13px;
  font-weight: 500;
  padding: 4px 8px;
  min-width: 40px;
}

.vm-speed-menu {
  position: absolute;
  bottom: 100%;
  right: 0;
  background: var(--vm-control-bg);
  border-radius: var(--vm-border-radius-sm);
  padding: 4px;
  margin-bottom: 8px;
  min-width: 80px;
}

.vm-speed-option {
  display: block;
  width: 100%;
  padding: 8px 12px;
  background: transparent;
  border: none;
  color: var(--vm-control-text);
  font-size: 13px;
  cursor: pointer;
  border-radius: 4px;
  text-align: center;
  transition: background var(--vm-transition-fast);
}

.vm-speed-option:hover {
  background: var(--vm-control-hover);
}

.vm-speed-option.vm-active {
  color: var(--vm-primary);
  font-weight: 600;
}
</style>
