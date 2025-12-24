import { useState, useEffect, useCallback, useMemo, RefObject } from 'react'
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
  mediaRef: RefObject<HTMLMediaElement | null>,
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
  const [state, setState] = useState<MediaState>({
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

  // Computed values
  const progress = useMemo(() => {
    if (state.duration === 0) return 0
    return (state.currentTime / state.duration) * 100
  }, [state.currentTime, state.duration])

  const formattedCurrentTime = useMemo(() => formatTime(state.currentTime), [state.currentTime])
  const formattedDuration = useMemo(() => formatTime(state.duration), [state.duration])

  // Methods
  function formatTime(seconds: number): string {
    if (!isFinite(seconds) || isNaN(seconds)) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const play = useCallback(() => {
    mediaRef.current?.play()
  }, [mediaRef])

  const pause = useCallback(() => {
    mediaRef.current?.pause()
  }, [mediaRef])

  const togglePlay = useCallback(() => {
    if (state.playing) {
      pause()
    } else {
      play()
    }
  }, [state.playing, play, pause])

  const seek = useCallback((time: number) => {
    if (mediaRef.current) {
      mediaRef.current.currentTime = Math.max(0, Math.min(time, state.duration))
    }
  }, [mediaRef, state.duration])

  const seekPercentage = useCallback((percentage: number) => {
    seek((percentage / 100) * state.duration)
  }, [seek, state.duration])

  const setVolume = useCallback((volume: number) => {
    if (mediaRef.current) {
      mediaRef.current.volume = Math.max(0, Math.min(1, volume))
    }
  }, [mediaRef])

  const toggleMute = useCallback(() => {
    if (mediaRef.current) {
      mediaRef.current.muted = !mediaRef.current.muted
    }
  }, [mediaRef])

  const setPlaybackRate = useCallback((rate: number) => {
    if (mediaRef.current) {
      mediaRef.current.playbackRate = rate
    }
  }, [mediaRef])

  // Event Handlers
  useEffect(() => {
    const media = mediaRef.current
    if (!media) return

    const handlePlay = () => {
      setState(prev => ({ ...prev, playing: true, ended: false }))
      onPlay?.()
    }

    const handlePause = () => {
      setState(prev => ({ ...prev, playing: false }))
      onPause?.()
    }

    const handleEnded = () => {
      setState(prev => ({ ...prev, playing: false, ended: true }))
      onEnded?.()
    }

    const handleTimeUpdate = () => {
      const currentTime = media.currentTime
      const duration = media.duration || 0
      const percentage = duration > 0 ? (currentTime / duration) * 100 : 0
      
      setState(prev => ({ ...prev, currentTime }))
      onTimeUpdate?.({ currentTime, duration, percentage })
    }

    const handleVolumeChange = () => {
      const volume = media.volume
      const muted = media.muted
      
      setState(prev => ({ ...prev, volume, muted }))
      onVolumeChange?.({ volume, muted })
    }

    const handleLoadedMetadata = () => {
      const duration = media.duration
      setState(prev => ({ ...prev, duration }))
      onLoadedMetadata?.({ duration })
    }

    const handleProgress = () => {
      if (media.buffered.length > 0) {
        const bufferedEnd = media.buffered.end(media.buffered.length - 1)
        const duration = media.duration || 1
        setState(prev => ({ ...prev, buffered: (bufferedEnd / duration) * 100 }))
      }
    }

    const handleWaiting = () => {
      setState(prev => ({ ...prev, waiting: true }))
      onWaiting?.()
    }

    const handlePlaying = () => {
      setState(prev => ({ ...prev, waiting: false }))
      onPlaying?.()
    }

    const handleError = () => {
      if (media.error) {
        onError?.({
          code: media.error.code,
          message: media.error.message,
        })
      }
    }

    const handleRateChange = () => {
      setState(prev => ({ ...prev, playbackRate: media.playbackRate }))
    }

    // Bind events
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

    // Cleanup
    return () => {
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
  }, [mediaRef, initialVolume, initialMuted, onPlay, onPause, onEnded, onTimeUpdate, onVolumeChange, onError, onLoadedMetadata, onWaiting, onPlaying])

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
