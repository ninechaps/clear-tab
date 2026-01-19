export type ThemeMode = 'focus' | 'minimal' | 'info' | 'custom'

export interface Theme {
  id: ThemeMode
  name: string
  description: string
  enabledWidgets: WidgetType[]
  backgroundColor?: string
  backgroundImage?: string
  backgroundBlur?: number
  backgroundOverlay?: number
}

export type WidgetType = 'clock' | 'search' | 'weather' | 'countdown' | 'quote'

export interface Widget {
  id: string
  type: WidgetType
  enabled: boolean
  position?: { x: number; y: number }
  settings?: Record<string, unknown>
}

export interface ClockSettings {
  format: '12h' | '24h'
  showSeconds: boolean
  style: 'digital' | 'analog'
}

export interface SearchSettings {
  engine: 'google' | 'bing' | 'duckduckgo' | 'baidu'
  showSuggestions: boolean
}

export interface WeatherSettings {
  unit: 'celsius' | 'fahrenheit'
  location?: string
}

export interface CountdownSettings {
  targetDate: string
  label: string
}

export interface WallpaperSource {
  provider: 'unsplash' | 'pexels' | 'local'
  keywords: string[]
  refreshInterval: number // in minutes
  randomMode?: boolean // 每次打开随机背景
}

export interface UserSettings {
  theme: ThemeMode
  widgets: Widget[]
  wallpaper: WallpaperSource
  clockSettings: ClockSettings
  searchSettings: SearchSettings
  weatherSettings: WeatherSettings
  countdowns: CountdownSettings[]
}

export interface CachedWallpaper {
  url: string
  thumbnailUrl: string
  author?: string
  authorUrl?: string
  cachedAt: number
}
