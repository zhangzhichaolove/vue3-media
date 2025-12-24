import { useState, useRef, useCallback, useMemo, forwardRef, useImperativeHandle, CSSProperties } from 'react'
import { useMediaControl } from '@/hooks/useMediaControl'
import type { AudioPlayerProps, AudioPlayerRef } from '@/types'
import './AudioPlayer.css'

export const AudioPlayer = forwardRef<AudioPlayerRef, AudioPlayerProps>(
  (
    {
      src,
      title,
      artist,
      cover,
      autoplay = false,
      loop = false,
      primaryColor = '#6366f1',
      darkMode = false,
      preload = 'metadata',
      className,
      style,
      onPlay,
      onPause,
      onEnded,
      onTimeUpdate,
      onVolumeChange,
      onError,
      onLoadedMetadata,
    },
    ref
  ) => {
    // Refs
    const audioRef = useRef<HTMLAudioElement>(null)

    // Media control hook
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
      onPlay,
      onPause,
      onEnded,
      onTimeUpdate,
      onVolumeChange,
      onError,
      onLoadedMetadata,
    })

    // Helper functions
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

    // Computed styles
    const playerStyle = useMemo<CSSProperties>(
      () => ({
        ['--vm-primary' as string]: primaryColor,
        ['--vm-primary-hover' as string]: adjustColor(primaryColor, -15),
        ['--vm-primary-light' as string]: hexToRgba(primaryColor, 0.2),
        ...style,
      }),
      [primaryColor, style]
    )

    // Handlers
    const handleProgressClick = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const percentage = ((e.clientX - rect.left) / rect.width) * 100
        seekPercentage(percentage)
      },
      [seekPercentage]
    )

    const handleSeek = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        seekPercentage(parseFloat(e.target.value))
      },
      [seekPercentage]
    )

    const handleVolumeChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setVolume(parseFloat(e.target.value) / 100)
      },
      [setVolume]
    )

    const skipBack = useCallback(() => {
      seek(state.currentTime - 10)
    }, [seek, state.currentTime])

    const skipForward = useCallback(() => {
      seek(state.currentTime + 10)
    }, [seek, state.currentTime])

    // Expose methods via ref
    useImperativeHandle(
      ref,
      () => ({
        play: () => audioRef.current?.play(),
        pause: () => audioRef.current?.pause(),
        seek: (time: number) => {
          if (audioRef.current) audioRef.current.currentTime = time
        },
        setVolume,
        getState: () => state,
      }),
      [setVolume, state]
    )

    // Class names
    const containerClasses = ['vm-player', 'vm-audio-player', darkMode && 'vm-dark', className]
      .filter(Boolean)
      .join(' ')

    return (
      <div className={containerClasses} style={playerStyle}>
        {/* Audio Element */}
        <audio ref={audioRef} src={src} autoPlay={autoplay} loop={loop} preload={preload} />

        {/* Cover Art */}
        <div className={`vm-audio-cover ${state.playing ? 'vm-spinning' : ''}`}>
          <div className="vm-audio-cover-inner">
            {cover ? (
              <img src={cover} alt={title || 'Audio cover'} className="vm-cover-image" />
            ) : (
              <div className="vm-cover-placeholder">
                <svg className="vm-icon vm-icon-lg" viewBox="0 0 24 24">
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Info & Controls Container */}
        <div className="vm-audio-content">
          {/* Track Info */}
          {(title || artist) && (
            <div className="vm-audio-info">
              <h3 className="vm-audio-title">{title || 'Unknown Title'}</h3>
              {artist && <p className="vm-audio-artist">{artist}</p>}
            </div>
          )}

          {/* Progress Bar */}
          <div className="vm-audio-progress">
            <span className="vm-time vm-time-current">{formattedCurrentTime}</span>
            <div className="vm-progress-container" onClick={handleProgressClick}>
              <div className="vm-progress-bar">
                <div className="vm-progress-buffered" style={{ width: `${state.buffered}%` }} />
                <div className="vm-progress-played" style={{ width: `${progress}%` }} />
              </div>
              <input
                type="range"
                className="vm-progress-slider"
                value={progress}
                min={0}
                max={100}
                step={0.1}
                onChange={handleSeek}
                aria-label="Seek"
              />
            </div>
            <span className="vm-time vm-time-duration">{formattedDuration}</span>
          </div>

          {/* Control Buttons */}
          <div className="vm-audio-controls">
            {/* Skip Back */}
            <button className="vm-btn" onClick={skipBack} aria-label="Skip back 10 seconds">
              <svg className="vm-icon" viewBox="0 0 24 24">
                <path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z" />
              </svg>
            </button>

            {/* Play/Pause */}
            <button className="vm-btn vm-btn-primary" onClick={togglePlay} aria-label={state.playing ? 'Pause' : 'Play'}>
              {state.playing ? (
                <svg className="vm-icon vm-icon-lg" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              ) : (
                <svg className="vm-icon vm-icon-lg" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            {/* Skip Forward */}
            <button className="vm-btn" onClick={skipForward} aria-label="Skip forward 10 seconds">
              <svg className="vm-icon" viewBox="0 0 24 24">
                <path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z" />
              </svg>
            </button>
          </div>

          {/* Volume Control */}
          <div className="vm-audio-volume">
            <button className="vm-btn vm-btn-small" onClick={toggleMute} aria-label={state.muted ? 'Unmute' : 'Mute'}>
              {state.muted || state.volume === 0 ? (
                <svg className="vm-icon" viewBox="0 0 24 24">
                  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                </svg>
              ) : state.volume < 0.5 ? (
                <svg className="vm-icon" viewBox="0 0 24 24">
                  <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z" />
                </svg>
              ) : (
                <svg className="vm-icon" viewBox="0 0 24 24">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                </svg>
              )}
            </button>
            <input
              type="range"
              className="vm-slider vm-volume-slider"
              value={state.muted ? 0 : state.volume * 100}
              min={0}
              max={100}
              onChange={handleVolumeChange}
              aria-label="Volume"
            />
          </div>
        </div>

        {/* Loading Overlay */}
        {state.waiting && !state.ended && (
          <div className="vm-audio-loading">
            <div className="vm-loading-spinner" />
          </div>
        )}
      </div>
    )
  }
)

AudioPlayer.displayName = 'AudioPlayer'
