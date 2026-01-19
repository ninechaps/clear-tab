import { create } from 'zustand'
import type { UserSettings, ThemeMode, Widget, WallpaperSource } from '@/types'
import { storageService } from '@/services/storage'

interface SettingsState extends UserSettings {
  isLoading: boolean
  setTheme: (theme: ThemeMode) => void
  setWidgets: (widgets: Widget[]) => void
  toggleWidget: (widgetId: string) => void
  setWallpaperSource: (source: Partial<WallpaperSource>) => void
  loadSettings: () => Promise<void>
  saveSettings: () => Promise<void>
}

const defaultSettings: UserSettings = {
  theme: 'minimal',
  widgets: [
    { id: 'clock-1', type: 'clock', enabled: true },
    { id: 'search-1', type: 'search', enabled: true },
    { id: 'weather-1', type: 'weather', enabled: false },
    { id: 'countdown-1', type: 'countdown', enabled: false },
  ],
  wallpaper: {
    provider: 'local',
    keywords: ['minimal'],
    refreshInterval: 60,
    randomMode: true,
  },
  clockSettings: {
    format: '24h',
    showSeconds: false,
    style: 'digital',
  },
  searchSettings: {
    engine: 'google',
    showSuggestions: true,
  },
  weatherSettings: {
    unit: 'celsius',
  },
  countdowns: [],
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
  ...defaultSettings,
  isLoading: true,

  setTheme: (theme) => {
    set({ theme })
    get().saveSettings()
  },

  setWidgets: (widgets) => {
    set({ widgets })
    get().saveSettings()
  },

  toggleWidget: (widgetId) => {
    const widgets = get().widgets.map((w) =>
      w.id === widgetId ? { ...w, enabled: !w.enabled } : w
    )
    set({ widgets })
    get().saveSettings()
  },

  setWallpaperSource: (source) => {
    set({ wallpaper: { ...get().wallpaper, ...source } })
    get().saveSettings()
  },

  loadSettings: async () => {
    set({ isLoading: true })
    const settings = await storageService.getSettings()
    if (settings) {
      set({ ...settings, isLoading: false })
    } else {
      set({ isLoading: false })
    }
  },

  saveSettings: async () => {
    const state = get()
    const settings: UserSettings = {
      theme: state.theme,
      widgets: state.widgets,
      wallpaper: state.wallpaper,
      clockSettings: state.clockSettings,
      searchSettings: state.searchSettings,
      weatherSettings: state.weatherSettings,
      countdowns: state.countdowns,
    }
    await storageService.saveSettings(settings)
  },
}))
