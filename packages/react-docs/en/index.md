---
layout: home

hero:
  name: "React Media"
  text: "Beautiful Media Player Library"
  tagline: Video and audio player components for React, easy to use and powerful.
  image:
    src: /logo.svg
    alt: React Media
  actions:
    - theme: brand
      text: Get Started
      link: /en/guide/getting-started
    - theme: alt
      text: Components
      link: /en/components/video-player
    - theme: alt
      text: GitHub
      link: https://github.com/zhangzhichaolove/vue3-media

features:
  - icon: 🎥
    title: VideoPlayer
    details: Full-featured video player with keyboard shortcuts, PiP, mini player and more.
  - icon: 🎵
    title: AudioPlayer
    details: Beautiful audio player with album cover, progress bar, and volume control.
  - icon: 🎨
    title: Customizable Theme
    details: Custom primary color and dark mode support to match your app.
  - icon: 📱
    title: Responsive Design
    details: Mobile-friendly with touch gesture support.
  - icon: 🔧
    title: TypeScript
    details: Complete TypeScript type definitions for great DX.
  - icon: ⚡
    title: Lightweight
    details: No external dependencies, small bundle size.
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #6366f1 30%, #a78bfa);
  --vp-home-hero-image-background-image: linear-gradient(-45deg, #6366f1 50%, #c7d2fe 50%);
  --vp-home-hero-image-filter: blur(44px);
}

.dark {
  --vp-home-hero-image-background-image: linear-gradient(-45deg, #6366f1 50%, #312e81 50%);
}
</style>
