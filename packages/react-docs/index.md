---
layout: home

hero:
  name: "React Media"
  text: "优雅的媒体播放器组件库"
  tagline: 为 React 打造的视频和音频播放器组件，简单易用，功能强大。
  image:
    src: /logo.svg
    alt: React Media
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/getting-started
    - theme: alt
      text: 查看组件
      link: /components/video-player
    - theme: alt
      text: GitHub
      link: https://github.com/zhangzhichaolove/vue3-media

features:
  - icon: 🎥
    title: VideoPlayer
    details: 功能完整的视频播放器，支持快捷键、画中画、迷你播放器等功能。
  - icon: 🎵
    title: AudioPlayer
    details: 美观的音频播放器，支持专辑封面、进度拖拽、音量控制。
  - icon: 🎨
    title: 可定制主题
    details: 支持自定义主题色和深色模式，轻松适配您的应用。
  - icon: 📱
    title: 响应式设计
    details: 移动端友好，支持触摸手势操作。
  - icon: 🔧
    title: TypeScript
    details: 完整的 TypeScript 类型支持，良好的开发体验。
  - icon: ⚡
    title: 轻量级
    details: 无外部依赖，体积小巧，性能优秀。
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
