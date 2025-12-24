# 主题定制

React Media 支持自定义主题色和深色模式。

## 主题色

通过 `primaryColor` 属性设置主题色：

```tsx
<VideoPlayer
  src="video.mp4"
  primaryColor="#8b5cf6"  // 紫色主题
/>

<AudioPlayer
  src="audio.mp3"
  primaryColor="#3b82f6"  // 蓝色主题
/>
```

## 深色模式

通过 `darkMode` 属性启用深色模式：

```tsx
<VideoPlayer
  src="video.mp4"
  darkMode={true}
/>

<AudioPlayer
  src="audio.mp3"
  darkMode={true}
/>
```

## 动态主题

结合 React 状态实现动态主题切换：

```tsx
import { useState } from 'react'
import { VideoPlayer } from '@peakchao/react-media'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [primaryColor, setPrimaryColor] = useState('#6366f1')

  return (
    <>
      <div>
        <label>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={(e) => setDarkMode(e.target.checked)}
          />
          深色模式
        </label>
        <input
          type="color"
          value={primaryColor}
          onChange={(e) => setPrimaryColor(e.target.value)}
        />
      </div>

      <VideoPlayer
        src="video.mp4"
        primaryColor={primaryColor}
        darkMode={darkMode}
      />
    </>
  )
}
```

## CSS 变量

组件使用 CSS 变量实现主题，你可以直接覆盖这些变量：

```css
:root {
  --vm-primary: #6366f1;
  --vm-primary-hover: #4f46e5;
  --vm-primary-light: rgba(99, 102, 241, 0.2);
  --vm-border-radius: 12px;
}
```
