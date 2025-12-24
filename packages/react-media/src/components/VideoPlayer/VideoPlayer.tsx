import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  forwardRef,
  useImperativeHandle,
  CSSProperties,
} from 'react'
import { useMediaControl } from '@/hooks/useMediaControl'
import type { VideoPlayerProps, VideoPlayerRef } from '@/types'
import './VideoPlayer.css'

export const VideoPlayer = forwardRef<VideoPlayerRef, VideoPlayerProps>(
  (
    {
      src,
      poster,
      autoplay = false,
      loop = false,
      muted = false,
      controls = true,
      width = '100%',
      height = 'auto',
      primaryColor = '#6366f1',
      darkMode = false,
      playbackRates = [0.5, 0.75, 1, 1.25, 1.5, 2],
      preload = 'metadata',
      keyboardShortcuts = true,
      globalKeyboardShortcuts = false,
      showPiP = true,
      showSpeed = true,
      showFullscreen = true,
      showThumbnailPreview = true,
      touchGestures = true,
      miniPlayer = false,
      miniPlayerPosition = 'bottom-right',
      backgroundColor = 'transparent',
      className,
      style,
      children,
      controlsLeft,
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
    const wrapperRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const videoRef = useRef<HTMLVideoElement>(null)
    const thumbnailCanvasRef = useRef<HTMLCanvasElement>(null)
    const thumbnailVideoRef = useRef<HTMLVideoElement | null>(null)

    // State
    const [showControls, setShowControls] = useState(true)
    const [showSpeedMenu, setShowSpeedMenu] = useState(false)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [hoverTime, setHoverTime] = useState<number | null>(null)
    const [hoverPosition, setHoverPosition] = useState(0)
    const [thumbnailCanvas, setThumbnailCanvas] = useState(false)
    const [isPiP, setIsPiP] = useState(false)
    const [isPiPSupported, setIsPiPSupported] = useState(false)
    const [isMiniPlayer, setIsMiniPlayer] = useState(false)
    const [gestureOverlay, setGestureOverlay] = useState<{ show: boolean; text: string }>({
      show: false,
      text: '',
    })

    // Refs for timers and touch state
    const hideControlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const gestureOverlayTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const intersectionObserverRef = useRef<IntersectionObserver | null>(null)
    const touchStartRef = useRef({
      x: 0,
      y: 0,
      time: 0,
      volume: 0,
      isSwiping: false,
      swipeDirection: null as 'horizontal' | 'vertical' | null,
    })
    const thumbnailGeneratingRef = useRef(false)
    const thumbnailReadyRef = useRef(false)

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
      setPlaybackRate,
      formatTime,
    } = useMediaControl(videoRef, {
      initialMuted: muted,
      onPlay,
      onPause,
      onEnded,
      onTimeUpdate,
      onVolumeChange,
      onError,
      onLoadedMetadata,
    })

    // Computed styles
    const containerStyle = useMemo<CSSProperties>(
      () => ({
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        ['--vm-primary' as string]: primaryColor,
        ['--vm-primary-hover' as string]: adjustColor(primaryColor, -15),
        ['--vm-primary-light' as string]: hexToRgba(primaryColor, 0.2),
        ['--vm-player-bg' as string]: backgroundColor,
        ...style,
      }),
      [width, height, primaryColor, backgroundColor, style]
    )

    const wrapperStyle = useMemo<CSSProperties>(() => {
      if (!isMiniPlayer) return {}
      return {
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : 'auto',
        aspectRatio: '16 / 9',
      }
    }, [isMiniPlayer, width, height])

    const thumbnailTooltipStyle = useMemo<CSSProperties>(() => {
      const position = hoverPosition
      let translateX = -50
      if (position < 10) {
        translateX = -(position * 5)
      } else if (position > 90) {
        translateX = -50 - (position - 90) * 5
      }
      return {
        left: `${position}%`,
        transform: `translateX(${translateX}%)`,
      }
    }, [hoverPosition])

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

    // Controls visibility
    const resetHideControlsTimeout = useCallback(() => {
      if (hideControlsTimeoutRef.current) {
        clearTimeout(hideControlsTimeoutRef.current)
      }
      if (state.playing) {
        hideControlsTimeoutRef.current = setTimeout(() => {
          setShowControls(false)
        }, 3000)
      }
    }, [state.playing])

    const handleMouseMove = useCallback(() => {
      setShowControls(true)
      resetHideControlsTimeout()
    }, [resetHideControlsTimeout])

    const handleMouseLeave = useCallback(() => {
      if (state.playing) {
        setShowControls(false)
      }
    }, [state.playing])

    // Progress bar handlers
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

    // Speed menu
    const toggleSpeedMenu = useCallback(() => {
      setShowSpeedMenu((prev) => !prev)
    }, [])

    const selectPlaybackRate = useCallback(
      (rate: number) => {
        setPlaybackRate(rate)
        setShowSpeedMenu(false)
      },
      [setPlaybackRate]
    )

    // Fullscreen
    const toggleFullscreen = useCallback(() => {
      if (!containerRef.current) return
      if (document.fullscreenElement) {
        document.exitFullscreen()
        setIsFullscreen(false)
      } else {
        containerRef.current.requestFullscreen()
        setIsFullscreen(true)
      }
    }, [])

    // Picture-in-Picture
    const togglePiP = useCallback(() => {
      if (!videoRef.current) return
      if (document.pictureInPictureElement) {
        document.exitPictureInPicture()
      } else {
        videoRef.current.requestPictureInPicture()
      }
    }, [])

    // Keyboard handler
    const handleKeydown = useCallback(
      (e: KeyboardEvent | React.KeyboardEvent) => {
        if (!keyboardShortcuts) return
        const handledKeys = [
          'Space',
          'ArrowLeft',
          'ArrowRight',
          'ArrowUp',
          'ArrowDown',
          'KeyM',
          'KeyF',
          'Escape',
        ]
        if (!handledKeys.includes(e.code)) return
        e.preventDefault()

        switch (e.code) {
          case 'Space':
            togglePlay()
            break
          case 'ArrowLeft':
            seek(state.currentTime - 5)
            break
          case 'ArrowRight':
            seek(state.currentTime + 5)
            break
          case 'ArrowUp':
            setVolume(Math.min(1, state.volume + 0.1))
            break
          case 'ArrowDown':
            setVolume(Math.max(0, state.volume - 0.1))
            break
          case 'KeyM':
            toggleMute()
            break
          case 'KeyF':
            toggleFullscreen()
            break
          case 'Escape':
            if (isFullscreen) {
              document.exitFullscreen()
            } else if (isPiP && document.pictureInPictureElement) {
              document.exitPictureInPicture()
            }
            break
        }
      },
      [
        keyboardShortcuts,
        togglePlay,
        seek,
        setVolume,
        toggleMute,
        toggleFullscreen,
        state.currentTime,
        state.volume,
        isFullscreen,
        isPiP,
      ]
    )

    // Progress bar hover for thumbnail
    const handleProgressHover = useCallback(
      async (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const percentage = ((e.clientX - rect.left) / rect.width) * 100
        const clampedPosition = Math.max(0, Math.min(100, percentage))
        setHoverPosition(clampedPosition)
        setHoverTime((percentage / 100) * state.duration)

        if (showThumbnailPreview && videoRef.current && state.duration > 0) {
          setThumbnailCanvas(true)
        }
      },
      [state.duration, showThumbnailPreview]
    )

    const handleProgressLeave = useCallback(() => {
      setHoverTime(null)
      setThumbnailCanvas(false)
    }, [])

    // Generate thumbnail
    useEffect(() => {
      if (!thumbnailCanvas || hoverTime === null || !showThumbnailPreview) return

      const generateThumbnail = async () => {
        if (!videoRef.current || !thumbnailCanvasRef.current || thumbnailGeneratingRef.current) return

        const canvas = thumbnailCanvasRef.current
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        // Create thumbnail video if not exists
        if (!thumbnailVideoRef.current) {
          thumbnailVideoRef.current = document.createElement('video')
          thumbnailVideoRef.current.preload = 'metadata'
          thumbnailVideoRef.current.muted = true
          thumbnailVideoRef.current.playsInline = true
          thumbnailVideoRef.current.src = videoRef.current.src

          await new Promise<void>((resolve) => {
            const onLoaded = () => {
              thumbnailVideoRef.current?.removeEventListener('loadeddata', onLoaded)
              thumbnailReadyRef.current = true
              resolve()
            }
            thumbnailVideoRef.current!.addEventListener('loadeddata', onLoaded)
          })
        }

        if (!thumbnailReadyRef.current) return

        const thumbVideo = thumbnailVideoRef.current
        if (Math.abs(thumbVideo.currentTime - hoverTime) > 0.5) {
          thumbnailGeneratingRef.current = true
          thumbVideo.currentTime = hoverTime

          await new Promise<void>((resolve) => {
            const onSeeked = () => {
              thumbVideo.removeEventListener('seeked', onSeeked)
              resolve()
            }
            thumbVideo.addEventListener('seeked', onSeeked)
          })

          thumbnailGeneratingRef.current = false
        }

        try {
          ctx.drawImage(thumbVideo, 0, 0, canvas.width, canvas.height)
        } catch {
          console.warn('Cannot generate thumbnail due to CORS restrictions')
        }
      }

      generateThumbnail()
    }, [thumbnailCanvas, hoverTime, showThumbnailPreview])

    // Touch gestures
    const handleTouchStart = useCallback(
      (e: React.TouchEvent) => {
        if (!touchGestures || e.touches.length !== 1) return
        const touch = e.touches[0]
        touchStartRef.current = {
          x: touch.clientX,
          y: touch.clientY,
          time: state.currentTime,
          volume: state.volume,
          isSwiping: false,
          swipeDirection: null,
        }
      },
      [touchGestures, state.currentTime, state.volume]
    )

    const showGestureOverlayFn = useCallback((text: string) => {
      setGestureOverlay({ show: true, text })
    }, [])

    const handleTouchMove = useCallback(
      (e: React.TouchEvent) => {
        if (!touchGestures || e.touches.length !== 1) return
        const touch = e.touches[0]
        const deltaX = touch.clientX - touchStartRef.current.x
        const deltaY = touch.clientY - touchStartRef.current.y

        if (!touchStartRef.current.swipeDirection && (Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10)) {
          touchStartRef.current.swipeDirection =
            Math.abs(deltaX) > Math.abs(deltaY) ? 'horizontal' : 'vertical'
          touchStartRef.current.isSwiping = true
        }

        if (!touchStartRef.current.isSwiping) return

        if (touchStartRef.current.swipeDirection === 'horizontal') {
          const seekDelta = (deltaX / 200) * 30
          const newTime = Math.max(0, Math.min(state.duration, touchStartRef.current.time + seekDelta))
          seek(newTime)
          const timeDiff = newTime - touchStartRef.current.time
          showGestureOverlayFn(timeDiff >= 0 ? `+${Math.round(timeDiff)}s` : `${Math.round(timeDiff)}s`)
        } else {
          const volumeDelta = -deltaY / 200
          const newVolume = Math.max(0, Math.min(1, touchStartRef.current.volume + volumeDelta))
          setVolume(newVolume)
          showGestureOverlayFn(`音量 ${Math.round(newVolume * 100)}%`)
        }
      },
      [touchGestures, seek, setVolume, state.duration, showGestureOverlayFn]
    )

    const handleTouchEnd = useCallback(() => {
      touchStartRef.current = {
        x: 0,
        y: 0,
        time: 0,
        volume: 0,
        isSwiping: false,
        swipeDirection: null,
      }

      if (gestureOverlayTimeoutRef.current) {
        clearTimeout(gestureOverlayTimeoutRef.current)
      }
      gestureOverlayTimeoutRef.current = setTimeout(() => {
        setGestureOverlay({ show: false, text: '' })
      }, 500)
    }, [])

    // Mini player
    const closeMiniPlayer = useCallback(() => {
      setIsMiniPlayer(false)
    }, [])

    // Effects
    useEffect(() => {
      // Fullscreen change listener
      const handleFullscreenChange = () => {
        setIsFullscreen(!!document.fullscreenElement)
      }

      // Click outside to close speed menu
      const handleClickOutside = (e: MouseEvent) => {
        if (showSpeedMenu && !(e.target as Element).closest('.vm-speed-container')) {
          setShowSpeedMenu(false)
        }
      }

      document.addEventListener('fullscreenchange', handleFullscreenChange)
      document.addEventListener('click', handleClickOutside)

      // PiP support check
      setIsPiPSupported('pictureInPictureEnabled' in document && document.pictureInPictureEnabled)

      return () => {
        document.removeEventListener('fullscreenchange', handleFullscreenChange)
        document.removeEventListener('click', handleClickOutside)
      }
    }, [showSpeedMenu])

    // PiP event listeners
    useEffect(() => {
      const video = videoRef.current
      if (!video) return

      const handleEnterPiP = () => setIsPiP(true)
      const handleLeavePiP = () => setIsPiP(false)

      video.addEventListener('enterpictureinpicture', handleEnterPiP)
      video.addEventListener('leavepictureinpicture', handleLeavePiP)

      return () => {
        video.removeEventListener('enterpictureinpicture', handleEnterPiP)
        video.removeEventListener('leavepictureinpicture', handleLeavePiP)
      }
    }, [])

    // Global keyboard shortcuts
    useEffect(() => {
      if (!globalKeyboardShortcuts) return

      const handler = (e: KeyboardEvent) => handleKeydown(e)
      document.addEventListener('keydown', handler)
      return () => document.removeEventListener('keydown', handler)
    }, [globalKeyboardShortcuts, handleKeydown])

    // Mini player observer
    useEffect(() => {
      if (!miniPlayer || !wrapperRef.current) return

      intersectionObserverRef.current = new IntersectionObserver(
        (entries) => {
          const entry = entries[0]
          if (!entry.isIntersecting && state.playing && !isFullscreen && !isPiP) {
            setIsMiniPlayer(true)
          } else if (entry.isIntersecting) {
            setIsMiniPlayer(false)
          }
        },
        { threshold: 0.3 }
      )

      intersectionObserverRef.current.observe(wrapperRef.current)

      return () => {
        intersectionObserverRef.current?.disconnect()
      }
    }, [miniPlayer, state.playing, isFullscreen, isPiP])

    // Controls visibility based on playing state
    useEffect(() => {
      if (state.playing) {
        resetHideControlsTimeout()
      } else {
        setShowControls(true)
      }
    }, [state.playing, resetHideControlsTimeout])

    // Cleanup
    useEffect(() => {
      return () => {
        if (hideControlsTimeoutRef.current) clearTimeout(hideControlsTimeoutRef.current)
        if (gestureOverlayTimeoutRef.current) clearTimeout(gestureOverlayTimeoutRef.current)
        if (thumbnailVideoRef.current) {
          thumbnailVideoRef.current.src = ''
          thumbnailVideoRef.current = null
        }
      }
    }, [])

    // Expose methods via ref
    useImperativeHandle(
      ref,
      () => ({
        play: () => videoRef.current?.play(),
        pause: () => videoRef.current?.pause(),
        seek: (time: number) => {
          if (videoRef.current) videoRef.current.currentTime = time
        },
        setVolume,
        setPlaybackRate,
        toggleFullscreen,
        togglePiP,
        getState: () => state,
      }),
      [setVolume, setPlaybackRate, toggleFullscreen, togglePiP, state]
    )

    // Class names
    const containerClasses = [
      'vm-player',
      'vm-video-player',
      darkMode && 'vm-dark',
      isFullscreen && 'vm-fullscreen',
      isMiniPlayer && 'vm-mini-player',
      isMiniPlayer && `vm-mini-${miniPlayerPosition}`,
      className,
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <div ref={wrapperRef} className="vm-player-wrapper" style={wrapperStyle}>
        <div
          ref={containerRef}
          className={containerClasses}
          style={containerStyle}
          tabIndex={0}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onKeyDown={handleKeydown as React.KeyboardEventHandler}
        >
          {/* Video Element */}
          <video
            ref={videoRef}
            className="vm-video"
            src={src}
            poster={poster}
            autoPlay={autoplay}
            loop={loop}
            muted={muted}
            preload={preload}
            playsInline
            onClick={togglePlay}
            onDoubleClick={toggleFullscreen}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          />

          {/* Loading Spinner */}
          {state.waiting && !state.ended && (
            <div className="vm-loading">
              <div className="vm-loading-spinner" />
            </div>
          )}

          {/* Play Button Overlay */}
          {!state.playing && !state.waiting && (
            <button className="vm-play-overlay" onClick={togglePlay} aria-label="Play">
              <svg className="vm-icon vm-icon-lg" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          )}

          {/* Gesture Overlay */}
          {gestureOverlay.show && <div className="vm-gesture-overlay">{gestureOverlay.text}</div>}

          {/* Mini Player Close Button */}
          {isMiniPlayer && (
            <button className="vm-mini-close" onClick={closeMiniPlayer} aria-label="Close mini player">
              <svg className="vm-icon" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </button>
          )}

          {/* Controls */}
          {controls && (showControls || !state.playing) && (
            <div className="vm-controls">
              {/* Progress Bar */}
              <div
                className="vm-progress-container"
                onClick={handleProgressClick}
                onMouseMove={handleProgressHover}
                onMouseLeave={handleProgressLeave}
              >
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
                {/* Thumbnail Preview */}
                {hoverTime !== null && (
                  <div className="vm-progress-tooltip vm-thumbnail-tooltip" style={thumbnailTooltipStyle}>
                    {thumbnailCanvas && (
                      <canvas ref={thumbnailCanvasRef} className="vm-thumbnail-canvas" width={160} height={90} />
                    )}
                    <span className="vm-thumbnail-time">{formatTime(hoverTime)}</span>
                  </div>
                )}
              </div>

              {/* Control Buttons */}
              <div className="vm-controls-bar">
                <div className="vm-controls-left">
                  {/* Play/Pause */}
                  <button className="vm-btn" onClick={togglePlay} aria-label={state.playing ? 'Pause' : 'Play'}>
                    {state.playing ? (
                      <svg className="vm-icon" viewBox="0 0 24 24">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                      </svg>
                    ) : (
                      <svg className="vm-icon" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </button>

                  {/* Volume */}
                  <div className="vm-volume-container">
                    <button className="vm-btn" onClick={toggleMute} aria-label={state.muted ? 'Unmute' : 'Mute'}>
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
                    <div className="vm-volume-slider-container">
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

                  {/* Time Display */}
                  <span className="vm-time">
                    {formattedCurrentTime} / {formattedDuration}
                  </span>
                </div>

                <div className="vm-controls-right">
                  {/* Custom Controls Left Slot */}
                  {controlsLeft}

                  {/* Playback Speed */}
                  {showSpeed && (
                    <div className="vm-speed-container">
                      <button className="vm-btn vm-speed-btn" onClick={toggleSpeedMenu} aria-label="Playback speed">
                        {state.playbackRate}x
                      </button>
                      {showSpeedMenu && (
                        <div className="vm-speed-menu">
                          {playbackRates.map((rate) => (
                            <button
                              key={rate}
                              className={`vm-speed-option ${state.playbackRate === rate ? 'vm-active' : ''}`}
                              onClick={() => selectPlaybackRate(rate)}
                            >
                              {rate}x
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Picture-in-Picture */}
                  {showPiP && isPiPSupported && (
                    <button
                      className="vm-btn"
                      onClick={togglePiP}
                      aria-label={isPiP ? 'Exit Picture-in-Picture' : 'Picture-in-Picture'}
                    >
                      {isPiP ? (
                        <svg className="vm-icon" viewBox="0 0 24 24">
                          <path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14z" />
                        </svg>
                      ) : (
                        <svg className="vm-icon" viewBox="0 0 24 24">
                          <path d="M19 7h-8v6h8V7zm2-4H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14z" />
                        </svg>
                      )}
                    </button>
                  )}

                  {/* Custom Controls Slot */}
                  {children}

                  {/* Fullscreen */}
                  {showFullscreen && (
                    <button
                      className="vm-btn"
                      onClick={toggleFullscreen}
                      aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
                    >
                      {isFullscreen ? (
                        <svg className="vm-icon" viewBox="0 0 24 24">
                          <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
                        </svg>
                      ) : (
                        <svg className="vm-icon" viewBox="0 0 24 24">
                          <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
                        </svg>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
)

VideoPlayer.displayName = 'VideoPlayer'
