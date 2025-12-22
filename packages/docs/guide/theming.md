# 主题定制

Vue3 Media 提供灵活的主题定制选项，让您轻松将播放器融入应用设计。

## 主题色

通过 `primaryColor` 属性设置主题色：

```vue
<template>
  <VideoPlayer src="video.mp4" primaryColor="#ff6b6b" />
  <AudioPlayer src="audio.mp3" primaryColor="#10b981" />
</template>
```

## 深色模式

通过 `darkMode` 属性启用深色模式：

```vue
<template>
  <VideoPlayer src="video.mp4" :darkMode="true" />
  <AudioPlayer src="audio.mp3" :darkMode="true" />
</template>
```

::: tip 提示
可以结合 Vue 的响应式系统，根据应用的主题状态动态切换深色模式。
:::

## CSS 变量

您可以通过覆盖以下 CSS 变量来进行更深度的定制：

```css
:root {
  /* 主题色 */
  --vm-primary: #6366f1;
  
  /* 圆角 */
  --vm-border-radius: 12px;
  
  /* 过渡动画 */
  --vm-transition: 0.25s ease;
}
```

## 示例：响应系统主题

```vue
<script setup>
import { ref, watchEffect } from 'vue'

const isDark = ref(false)

// 监听系统主题
watchEffect(() => {
  const mq = window.matchMedia('(prefers-color-scheme: dark)')
  isDark.value = mq.matches
  
  mq.addEventListener('change', (e) => {
    isDark.value = e.matches
  })
})
</script>

<template>
  <VideoPlayer 
    src="video.mp4" 
    :darkMode="isDark"
    :primaryColor="isDark ? '#818cf8' : '#6366f1'"
  />
</template>
```

## 主题色推荐

以下是一些精心挑选的主题色供参考：

| 颜色名称 | 色值 | 效果 |
|---------|------|------|
| Indigo (默认) | `#6366f1` | 现代、专业 |
| Emerald | `#10b981` | 清新、自然 |
| Rose | `#f43f5e` | 活力、热情 |
| Amber | `#f59e0b` | 温暖、活泼 |
| Cyan | `#06b6d4` | 科技、冷静 |
