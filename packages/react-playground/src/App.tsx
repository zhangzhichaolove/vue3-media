import { useState, useCallback } from 'react'
import { VideoPlayer, AudioPlayer, TimeUpdatePayload } from '@peakchao/react-media'
import '@peakchao/react-media/style'
import './App.css'

function App() {
  // Demo state
  const [darkMode, setDarkMode] = useState(false)
  const [primaryColor, setPrimaryColor] = useState('#6366f1')
  const [events, setEvents] = useState<string[]>([])

  // Sample media URLs
  const videoSrc = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'
  const audioSrc = 'https://file.peakchao.com:5/%E7%BA%A2%E7%8E%AB%E7%91%B0-%E9%99%88%E5%A5%95%E8%BF%85.mp3'

  // Event handlers
  const logEvent = useCallback((message: string) => {
    const timestamp = new Date().toLocaleTimeString()
    setEvents((prev) => {
      const newEvents = [`[${timestamp}] ${message}`, ...prev]
      return newEvents.slice(0, 20)
    })
  }, [])

  const handleTimeUpdate = useCallback((payload: TimeUpdatePayload) => {
    // Only log every 5 seconds to avoid spam
    if (Math.floor(payload.currentTime) % 5 === 0 && payload.currentTime > 0) {
      // logEvent(`Video timeupdate: ${payload.currentTime.toFixed(1)}s`)
    }
  }, [])

  const handleDownload = useCallback(() => {
    logEvent('Custom button: Download clicked')
  }, [logEvent])

  const handleShare = useCallback(() => {
    logEvent('Custom button: Share clicked')
  }, [logEvent])

  const clearEvents = useCallback(() => {
    setEvents([])
  }, [])

  return (
    <div className={`demo-app ${darkMode ? 'dark-mode' : ''}`}>
      <header className="demo-header">
        <h1>🎬 React Media</h1>
        <p>A beautiful React media player component library</p>

        <div className="demo-controls">
          <label className="demo-toggle">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={(e) => setDarkMode(e.target.checked)}
            />
            <span>🌙 Dark Mode</span>
          </label>

          <label className="demo-color">
            <span>Primary Color:</span>
            <input
              type="color"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
            />
          </label>
        </div>
      </header>

      <main className="demo-content">
        {/* Video Player Demo */}
        <section className="demo-section">
          <h2>📹 Video Player</h2>
          <div className="demo-player-container">
            <VideoPlayer
              src={videoSrc}
              poster="https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1280&h=720&fit=crop"
              primaryColor={primaryColor}
              darkMode={darkMode}
              controls={true}
              muted={false}
              autoplay={true}
              loop={true}
              globalKeyboardShortcuts={true}
              miniPlayer={true}
              onPlay={() => logEvent('Video: play')}
              onPause={() => logEvent('Video: pause')}
              onEnded={() => logEvent('Video: ended')}
              onTimeUpdate={handleTimeUpdate}
              controlsLeft={
                <button className="vm-btn custom-btn" onClick={handleDownload} title="Download">
                  <svg className="vm-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
                  </svg>
                </button>
              }
            >
              <button className="vm-btn custom-btn" onClick={handleShare} title="Share">
                <svg className="vm-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" />
                </svg>
              </button>
            </VideoPlayer>
          </div>

          <div className="demo-props">
            <h3>Slot Example:</h3>
            <code>{`<VideoPlayer src="...">
  <button className="vm-btn">Download</button>
  <button className="vm-btn">Share</button>
</VideoPlayer>`}</code>
          </div>
        </section>

        {/* Audio Player Demo */}
        <section className="demo-section">
          <h2>🎵 Audio Player</h2>
          <div className="demo-player-container audio">
            <AudioPlayer
              src={audioSrc}
              title="红玫瑰"
              artist="陈奕迅"
              cover="https://file.peakchao.com:5/%E7%BA%A2%E7%8E%AB%E7%91%B0-%E9%99%88%E5%A5%95%E8%BF%85.jpg"
              primaryColor={primaryColor}
              darkMode={darkMode}
              onPlay={() => logEvent('Audio: play')}
              onPause={() => logEvent('Audio: pause')}
              onEnded={() => logEvent('Audio: ended')}
            />
          </div>

          <div className="demo-props">
            <h3>Props Used:</h3>
            <code>{`<AudioPlayer
  src="..."
  title="Sample Music Track"
  artist="Demo Artist"
  cover="..."
  primaryColor="${primaryColor}"
  darkMode={${darkMode}}
/>`}</code>
          </div>
        </section>

        {/* Events Log */}
        <section className="demo-section">
          <h2>📋 Events Log</h2>
          <div className="demo-events">
            {events.length === 0 ? (
              <div className="demo-events-empty">
                Interact with the players to see events here...
              </div>
            ) : (
              events.map((event, index) => (
                <div key={index} className="demo-event">
                  {event}
                </div>
              ))
            )}
          </div>
          <button className="demo-btn" onClick={clearEvents}>
            Clear Log
          </button>
        </section>
      </main>

      <footer className="demo-footer">
        <p>React Media v0.0.1 | Built with ❤️ using React + TypeScript</p>
      </footer>
    </div>
  )
}

export default App
