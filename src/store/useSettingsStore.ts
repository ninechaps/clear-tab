import { create } from 'zustand';
import type { UserSettings, ThemeMode, Widget, WidgetType, WallpaperSource } from '@/types';
import { storageService } from '@/services/storage';

interface SettingsState extends UserSettings {
  isLoading: boolean
  setTheme: (theme: ThemeMode) => void
  setWidgets: (widgets: Widget[]) => void
  toggleWidget: (widgetId: string) => void
  updateWidgetPosition: (widgetId: string, position: { x: number; y: number }) => void
  addWidget: (type: WidgetType) => void
  removeWidget: (widgetId: string) => void
  setWallpaperSource: (source: Partial<WallpaperSource>) => void
  setLanguage: (language: 'en' | 'zh') => void
  loadSettings: () => Promise<void>
  saveSettings: () => Promise<void>
}

function getBrowserLocale(): 'en' | 'zh' {
  const browserLang = navigator.language.split('-')[0];
  return browserLang === 'zh' ? 'zh' : 'en';
}

const defaultSettings: UserSettings = {
  theme: 'minimal',
  widgets: [
    { id: 'weather-1', type: 'weather', enabled: false },
    { id: 'quote-1', type: 'quote', enabled: false },
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
  language: getBrowserLocale(),
};

export const useSettingsStore = create<SettingsState>((set, get) => ({
  ...defaultSettings,
  isLoading: true,

  setTheme: (theme) => {
    set({ theme });
    get().saveSettings();
  },

  setWidgets: (widgets) => {
    set({ widgets });
    get().saveSettings();
  },

  toggleWidget: (widgetId) => {
    const widgets = get().widgets.map((w) =>
      w.id === widgetId ? { ...w, enabled: !w.enabled } : w
    );
    set({ widgets });
    get().saveSettings();
  },

  updateWidgetPosition: (widgetId, position) => {
    const widgets = get().widgets.map((w) =>
      w.id === widgetId ? { ...w, position } : w
    );
    set({ widgets });
    get().saveSettings();
  },

  addWidget: (type) => {
    const newId = `${type}-${Date.now()}`;
    const newWidget: Widget = {
      id: newId,
      type,
      enabled: true,
      position: { x: 50, y: 50 },
    };
    set({ widgets: [...get().widgets, newWidget] });
    get().saveSettings();
  },

  removeWidget: (widgetId) => {
    set({ widgets: get().widgets.filter((w) => w.id !== widgetId) });
    get().saveSettings();
  },

  setWallpaperSource: (source) => {
    set({ wallpaper: { ...get().wallpaper, ...source } });
    get().saveSettings();
  },

  setLanguage: (language) => {
    set({ language });
    get().saveSettings();
  },

  loadSettings: async () => {
    set({ isLoading: true });
    const settings = await storageService.getSettings();
    if (settings) {
      set({ ...settings, isLoading: false });
    } else {
      set({ isLoading: false });
    }
  },

  saveSettings: async () => {
    const state = get();
    const settings: UserSettings = {
      theme: state.theme,
      widgets: state.widgets,
      wallpaper: state.wallpaper,
      clockSettings: state.clockSettings,
      searchSettings: state.searchSettings,
      weatherSettings: state.weatherSettings,
      countdowns: state.countdowns,
      language: state.language,
    };
    await storageService.saveSettings(settings);
  },
}));
