import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Vue3 Media',
  description: '🎬 一个优雅的 Vue 3 媒体播放器组件库',
  base: '/vue3-media/',
  
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#6366f1' }],
  ],

  themeConfig: {
    logo: '/logo.svg',
    
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/getting-started' },
      { text: '组件', link: '/components/video-player' },
      { text: 'API', link: '/api/' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '快速开始', link: '/guide/getting-started' },
            { text: '主题定制', link: '/guide/theming' },
          ]
        }
      ],
      '/components/': [
        {
          text: '组件',
          items: [
            { text: 'VideoPlayer 视频播放器', link: '/components/video-player' },
            { text: 'AudioPlayer 音频播放器', link: '/components/audio-player' },
          ]
        }
      ],
      '/api/': [
        {
          text: 'API 参考',
          items: [
            { text: '类型定义', link: '/api/' },
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/peakchao/vue3-media' },
      { icon: 'npm', link: 'https://www.npmjs.com/package/@peakchao/vue3-media' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025 peakchao'
    },

    search: {
      provider: 'local'
    },

    outline: {
      label: '页面导航',
      level: [2, 3]
    },

    lastUpdated: {
      text: '最后更新于',
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    }
  }
})
