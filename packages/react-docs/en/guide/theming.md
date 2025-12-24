# Theming

React Media supports custom theme colors and dark mode.

## Primary Color

Set the primary color with the `primaryColor` prop:

```tsx
<VideoPlayer
  src="video.mp4"
  primaryColor="#8b5cf6"  // Purple theme
/>

<AudioPlayer
  src="audio.mp3"
  primaryColor="#3b82f6"  // Blue theme
/>
```

## Dark Mode

Enable dark mode with the `darkMode` prop:

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

## Dynamic Theming

Combine with React state for dynamic theme switching:

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
          Dark Mode
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

## CSS Variables

Components use CSS variables for theming. You can override these variables:

```css
:root {
  --vm-primary: #6366f1;
  --vm-primary-hover: #4f46e5;
  --vm-primary-light: rgba(99, 102, 241, 0.2);
  --vm-border-radius: 12px;
}
```
