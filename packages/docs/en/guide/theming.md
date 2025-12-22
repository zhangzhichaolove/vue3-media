# Theming

Vue3 Media provides flexible theming options to seamlessly integrate players into your app design.

## Primary Color

Set the primary theme color using the `primaryColor` prop:

```vue
<template>
  <VideoPlayer src="video.mp4" primaryColor="#ff6b6b" />
  <AudioPlayer src="audio.mp3" primaryColor="#10b981" />
</template>
```

## Dark Mode

Enable dark mode using the `darkMode` prop:

```vue
<template>
  <VideoPlayer src="video.mp4" :darkMode="true" />
  <AudioPlayer src="audio.mp3" :darkMode="true" />
</template>
```

::: tip
You can combine with Vue's reactivity system to dynamically switch dark mode based on your app's theme state.
:::

## CSS Variables

Override the following CSS variables for deeper customization:

```css
:root {
  /* Primary color */
  --vm-primary: #6366f1;
  
  /* Border radius */
  --vm-border-radius: 12px;
  
  /* Transition */
  --vm-transition: 0.25s ease;
}
```

## Example: System Theme Detection

```vue
<script setup>
import { ref, watchEffect } from 'vue'

const isDark = ref(false)

// Listen to system theme
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

## Recommended Colors

Here are some curated theme colors for inspiration:

| Color Name | Value | Effect |
|------------|-------|--------|
| Indigo (default) | `#6366f1` | Modern, professional |
| Emerald | `#10b981` | Fresh, natural |
| Rose | `#f43f5e` | Vibrant, passionate |
| Amber | `#f59e0b` | Warm, lively |
| Cyan | `#06b6d4` | Tech, calm |
