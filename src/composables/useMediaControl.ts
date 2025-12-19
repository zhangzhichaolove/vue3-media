import { ref, computed, watch, onUnmounted, type Ref } from 'vue'
import type { MediaState, TimeUpdatePayload, VolumeChangePayload, MediaError as MediaErrorType } from '@/types'

export interface UseMediaControlOptions {
  initialVolume?: number
  initialMuted?: boolean
  onPlay?: () => void
  onPause?: () => void
  onEnded?: () => void
  onTimeUpdate?: (payload: TimeUpdatePayload) => void
  onVolumeChange?: (payload: VolumeChangePayload) => void
  onError?: (error: MediaErrorType) => void
  onLoadedMetadata?: (payload: { duration: number }) => void
  onWaiting?: () => void
  onPlaying?: () => void
}

export function useMediaControl(
  mediaRef: Ref<HTMLMediaElement | null>,
  options: UseMediaControlOptions = {}
) {
  const {
    initialVolume = 1,
    initialMuted = false,
    onPlay,
    onPause,
    onEnded,
    onTimeUpdate,
    onVolumeChange,
    onError,
    onLoadedMetadata,
    onWaiting,
    onPlaying,
  } = options

  // State
  const state = ref<MediaState>({
    playing: false,
    currentTime: 0,
    duration: 0,
    volume: initialVolume,
    muted: initialMuted,
    buffered: 0,
    playbackRate: 1,
    waiting: false,
    ended: false,
  })

  // Computed
  const progress = computed(() => {
    if (state.value.duration === 0) return 0
    return (state.value.currentTime / state.value.duration) * 100
  })

  const formattedCurrentTime = computed(() => formatTime(state.value.currentTime))
  const formattedDuration = computed(() => formatTime(state.value.duration))

  // Methods
  function formatTime(seconds: number): string {
    if (!isFinite(seconds) || isNaN(seconds)) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  function play() {
    mediaRef.value?.play()
  }

  function pause() {
    mediaRef.value?.pause()
  }

  function togglePlay() {
    if (state.value.playing) {
      pause()
    } else {
      play()
    }
  }

  function seek(time: number) {
    if (mediaRef.value) {
      mediaRef.value.currentTime = Math.max(0, Math.min(time, state.value.duration))
    }
  }

  function seekPercentage(percentage: number) {
    seek((percentage / 100) * state.value.duration)
  }

  function setVolume(volume: number) {
    if (mediaRef.value) {
      mediaRef.value.volume = Math.max(0, Math.min(1, volume))
    }
  }

  function toggleMute() {
    if (mediaRef.value) {
      mediaRef.value.muted = !mediaRef.value.muted
    }
  }

  function setPlaybackRate(rate: number) {
    if (mediaRef.value) {
      mediaRef.value.playbackRate = rate
    }
  }

  // Event Handlers
  function handlePlay() {
    state.value.playing = true
    state.value.ended = false
    onPlay?.()
  }

  function handlePause() {
    state.value.playing = false
    onPause?.()
  }

  function handleEnded() {
    state.value.playing = false
    state.value.ended = true
    onEnded?.()
  }

  function handleTimeUpdate() {
    if (mediaRef.value) {
      state.value.currentTime = mediaRef.value.currentTime
      onTimeUpdate?.({
        currentTime: state.value.currentTime,
        duration: state.value.duration,
        percentage: progress.value,
      })
    }
  }

  function handleVolumeChange() {
    if (mediaRef.value) {
      state.value.volume = mediaRef.value.volume
      state.value.muted = mediaRef.value.muted
      onVolumeChange?.({
        volume: state.value.volume,
        muted: state.value.muted,
      })
    }
  }

  function handleLoadedMetadata() {
    if (mediaRef.value) {
      state.value.duration = mediaRef.value.duration
      onLoadedMetadata?.({ duration: state.value.duration })
    }
  }

  function handleProgress() {
    if (mediaRef.value && mediaRef.value.buffered.length > 0) {
      const bufferedEnd = mediaRef.value.buffered.end(mediaRef.value.buffered.length - 1)
      state.value.buffered = (bufferedEnd / state.value.duration) * 100
    }
  }

  function handleWaiting() {
    state.value.waiting = true
    onWaiting?.()
  }

  function handlePlaying() {
    state.value.waiting = false
    onPlaying?.()
  }

  function handleError() {
    if (mediaRef.value?.error) {
      onError?.({
        code: mediaRef.value.error.code,
        message: mediaRef.value.error.message,
      })
    }
  }

  function handleRateChange() {
    if (mediaRef.value) {
      state.value.playbackRate = mediaRef.value.playbackRate
    }
  }

  // Bind events
  function bindEvents() {
    const media = mediaRef.value
    if (!media) return

    media.addEventListener('play', handlePlay)
    media.addEventListener('pause', handlePause)
    media.addEventListener('ended', handleEnded)
    media.addEventListener('timeupdate', handleTimeUpdate)
    media.addEventListener('volumechange', handleVolumeChange)
    media.addEventListener('loadedmetadata', handleLoadedMetadata)
    media.addEventListener('progress', handleProgress)
    media.addEventListener('waiting', handleWaiting)
    media.addEventListener('playing', handlePlaying)
    media.addEventListener('error', handleError)
    media.addEventListener('ratechange', handleRateChange)

    // Initialize volume
    media.volume = initialVolume
    media.muted = initialMuted
  }

  function unbindEvents() {
    const media = mediaRef.value
    if (!media) return

    media.removeEventListener('play', handlePlay)
    media.removeEventListener('pause', handlePause)
    media.removeEventListener('ended', handleEnded)
    media.removeEventListener('timeupdate', handleTimeUpdate)
    media.removeEventListener('volumechange', handleVolumeChange)
    media.removeEventListener('loadedmetadata', handleLoadedMetadata)
    media.removeEventListener('progress', handleProgress)
    media.removeEventListener('waiting', handleWaiting)
    media.removeEventListener('playing', handlePlaying)
    media.removeEventListener('error', handleError)
    media.removeEventListener('ratechange', handleRateChange)
  }

  // Watch for media element changes
  watch(mediaRef, (newMedia, oldMedia) => {
    if (oldMedia) {
      unbindEvents()
    }
    if (newMedia) {
      bindEvents()
    }
  }, { immediate: true })

  onUnmounted(() => {
    unbindEvents()
  })

  return {
    state,
    progress,
    formattedCurrentTime,
    formattedDuration,
    play,
    pause,
    togglePlay,
    seek,
    seekPercentage,
    setVolume,
    toggleMute,
    setPlaybackRate,
    formatTime,
  }
}
