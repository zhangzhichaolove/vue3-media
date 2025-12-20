<template>
  <div class="demo-app" :class="{ 'dark-mode': darkMode }">
    <header class="demo-header">
      <h1>🎬 Vue3 Media</h1>
      <p>A beautiful Vue 3 media player component library</p>
      
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
    </header>

    <main class="demo-content">
      <!-- Video Player Demo -->
      <section class="demo-section">
        <h2>📹 Video Player</h2>
        <div class="demo-player-container">
          <VideoPlayer
            :src="videoSrc"
            poster="https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1280&h=720&fit=crop"
            :primaryColor="primaryColor"
            :darkMode="darkMode"
            @play="logEvent('Video: play')"
            @pause="logEvent('Video: pause')"
            @ended="logEvent('Video: ended')"
            @timeupdate="handleTimeUpdate"
            :globalKeyboardShortcuts="true"
          />
        </div>
        
        <div class="demo-props">
          <h3>Props Used:</h3>
          <code>
            &lt;VideoPlayer
              src="..."
              poster="..."
              :primaryColor="{{ primaryColor }}"
              :darkMode="{{ darkMode }}"
            /&gt;
          </code>
        </div>
      </section>

      <!-- Audio Player Demo -->
      <section class="demo-section">
        <h2>🎵 Audio Player</h2>
        <div class="demo-player-container audio">
          <AudioPlayer
            :src="audioSrc"
            title="Sample Music Track"
            artist="Demo Artist"
            cover="https://file.peakchao.com:5/%E7%BA%A2%E7%8E%AB%E7%91%B0-%E9%99%88%E5%A5%95%E8%BF%85.jpg"
            :primaryColor="primaryColor"
            :darkMode="darkMode"
            @play="logEvent('Audio: play')"
            @pause="logEvent('Audio: pause')"
            @ended="logEvent('Audio: ended')"
          />
        </div>
        
        <div class="demo-props">
          <h3>Props Used:</h3>
          <code>
            &lt;AudioPlayer
              src="..."
              title="Sample Music Track"
              artist="Demo Artist"
              cover="..."
              :primaryColor="{{ primaryColor }}"
              :darkMode="{{ darkMode }}"
            /&gt;
          </code>
        </div>
      </section>

      <!-- Events Log -->
      <section class="demo-section">
        <h2>📋 Events Log</h2>
        <div class="demo-events">
          <div v-if="events.length === 0" class="demo-events-empty">
            Interact with the players to see events here...
          </div>
          <div v-for="(event, index) in events" :key="index" class="demo-event">
            {{ event }}
          </div>
        </div>
        <button class="demo-btn" @click="events = []">Clear Log</button>
      </section>
    </main>

    <footer class="demo-footer">
      <p>Vue3 Media v0.1.0 | Built with ❤️ using Vue 3 + TypeScript</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { VideoPlayer, AudioPlayer } from '@peakchao/vue3-media'
import type { TimeUpdatePayload } from '@peakchao/vue3-media'
// import '@peakchao/vue3-media/dist/vue3-media.css'
import '@peakchao/vue3-media/style'

// Demo state
const darkMode = ref(false)
const primaryColor = ref('#6366f1')
const events = ref<string[]>([])

// Sample media URLs (using public domain samples)
const videoSrc = 'https://file.peakchao.com:5/%E7%82%AB%E9%85%B7%E8%A3%85%E6%9C%BA%E8%A7%86%E9%A2%91.mp4'
const audioSrc = 'https://file.peakchao.com:5/%E7%BA%A2%E7%8E%AB%E7%91%B0-%E9%99%88%E5%A5%95%E8%BF%85.mp3'

// Event handlers
function logEvent(message: string) {
  const timestamp = new Date().toLocaleTimeString()
  events.value.unshift(`[${timestamp}] ${message}`)
  if (events.value.length > 20) {
    events.value.pop()
  }
}

function handleTimeUpdate(payload: TimeUpdatePayload) {
  // Only log every 5 seconds to avoid spam
  if (Math.floor(payload.currentTime) % 5 === 0 && payload.currentTime > 0) {
    // logEvent(`Video timeupdate: ${payload.currentTime.toFixed(1)}s / ${payload.duration.toFixed(1)}s`)
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

.demo-app {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 40px 20px;
  transition: all 0.3s ease;
}

.demo-app.dark-mode {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  color: #e0e0e0;
}

.demo-header {
  text-align: center;
  margin-bottom: 40px;
}

.demo-header h1 {
  font-size: 2.5rem;
  margin-bottom: 8px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.demo-header p {
  color: #666;
  font-size: 1.1rem;
}

.dark-mode .demo-header p {
  color: #aaa;
}

.demo-controls {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-top: 20px;
  flex-wrap: wrap;
}

.demo-toggle,
.demo-color {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.8);
  padding: 8px 16px;
  border-radius: 24px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.dark-mode .demo-toggle,
.dark-mode .demo-color {
  background: rgba(255, 255, 255, 0.1);
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

.demo-content {
  max-width: 800px;
  margin: 0 auto;
}

.demo-section {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
}

.dark-mode .demo-section {
  background: rgba(30, 30, 50, 0.8);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
}

.demo-section h2 {
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: #333;
}

.dark-mode .demo-section h2 {
  color: #e0e0e0;
}

.demo-player-container {
  margin-bottom: 20px;
}

.demo-player-container.audio {
  max-width: 500px;
  margin: 0 auto 20px;
}

.demo-props {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 16px;
}

.dark-mode .demo-props {
  background: rgba(0, 0, 0, 0.3);
}

.demo-props h3 {
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 8px;
}

.dark-mode .demo-props h3 {
  color: #aaa;
}

.demo-props code {
  display: block;
  font-family: 'Monaco', 'Consolas', monospace;
  font-size: 0.8rem;
  color: #6366f1;
  white-space: pre-wrap;
}

.demo-events {
  max-height: 200px;
  overflow-y: auto;
  background: #f8f9fa;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 12px;
}

.dark-mode .demo-events {
  background: rgba(0, 0, 0, 0.3);
}

.demo-events-empty {
  color: #999;
  text-align: center;
  padding: 20px;
}

.demo-event {
  font-family: 'Monaco', 'Consolas', monospace;
  font-size: 0.8rem;
  padding: 4px 8px;
  border-radius: 4px;
  margin-bottom: 4px;
  background: rgba(99, 102, 241, 0.1);
  color: #6366f1;
}

.dark-mode .demo-event {
  background: rgba(99, 102, 241, 0.2);
  color: #a5b4fc;
}

.demo-btn {
  background: #6366f1;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s ease;
}

.demo-btn:hover {
  background: #4f46e5;
  transform: translateY(-1px);
}

.demo-footer {
  text-align: center;
  margin-top: 40px;
  color: #666;
  font-size: 0.875rem;
}

.dark-mode .demo-footer {
  color: #888;
}
</style>
