import { create } from 'zustand';
import type { UserSettings, ThemeMode, Widget, WidgetType, WallpaperSource, QuickLinkItem } from '@/types';
import { storageService } from '@/services/storage';
import { widgetRegistry } from '@/widgets/_registry';

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
  addQuickLink: (link: Omit<QuickLinkItem, 'id'>) => void
  removeQuickLink: (linkId: string) => void
  updateQuickLink: (linkId: string, updates: Partial<QuickLinkItem>) => void
  loadSettings: () => Promise<void>
  saveSettings: () => Promise<void>
}

function getBrowserLocale(): 'en' | 'zh' {
  const browserLang = navigator.language.split('-')[0];
  return browserLang === 'zh' ? 'zh' : 'en';
}

// 默认的快捷链接
export const DEFAULT_QUICK_LINKS: QuickLinkItem[] = [
  {
    id: 'github',
    name: 'GitHub',
    url: 'https://github.com',
    iconType: 'builtin',
    hoverColor: 'rgba(36, 41, 46, 0.9)',
  },
  {
    id: 'x',
    name: 'X',
    url: 'https://x.com',
    iconType: 'builtin',
    hoverColor: 'rgba(0, 0, 0, 0.9)',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    url: 'https://youtube.com',
    iconType: 'builtin',
    hoverColor: 'rgba(255, 0, 0, 0.8)',
  },
  {
    id: 'gmail',
    name: 'Gmail',
    url: 'https://mail.google.com',
    iconType: 'builtin',
    hoverColor: 'rgba(234, 67, 53, 0.85)',
  },
  {
    id: 'stackoverflow',
    name: 'Stack Overflow',
    url: 'https://stackoverflow.com',
    iconType: 'builtin',
    hoverColor: 'rgba(244, 128, 36, 0.85)',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    url: 'https://linkedin.com',
    iconType: 'builtin',
    hoverColor: 'rgba(10, 102, 194, 0.9)',
  },
  {
    id: 'reddit',
    name: 'Reddit',
    url: 'https://reddit.com',
    iconType: 'builtin',
    hoverColor: 'rgba(255, 69, 0, 0.85)',
  },
  {
    id: 'notion',
    name: 'Notion',
    url: 'https://notion.so',
    iconType: 'builtin',
    hoverColor: 'rgba(55, 53, 47, 0.9)',
  },
];

// URL 到默认链接的映射（用于识别重新添加的默认链接）
export const DEFAULT_LINKS_MAP = new Map(
  DEFAULT_QUICK_LINKS.map(link => [link.url.toLowerCase(), link])
);

// 最大快捷链接数量
export const MAX_QUICK_LINKS = 12;

/**
 * 从小部件注册表自动生成默认小部件列表
 * 这样新增小部件时，只需在 manifest 中配置，无需修改这里
 */
function generateDefaultWidgets(): Widget[] {
  return Object.entries(widgetRegistry).map(([widgetId, manifest]) => ({
    id: `${widgetId}-1`,
    type: manifest.id as WidgetType,
    enabled: manifest.enabled,
  }));
}

const defaultSettings: UserSettings = {
  theme: 'minimal',
  widgets: generateDefaultWidgets(),
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
  quickLinks: DEFAULT_QUICK_LINKS,
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

  addQuickLink: (link) => {
    const currentLinks = get().quickLinks || [];
    if (currentLinks.length >= MAX_QUICK_LINKS) {
      console.warn(`最多只能添加 ${MAX_QUICK_LINKS} 个快捷链接`);
      return;
    }
    const newLink: QuickLinkItem = {
      ...link,
      id: `link-${Date.now()}`,
    };
    set({ quickLinks: [...currentLinks, newLink] });
    get().saveSettings();
  },

  removeQuickLink: (linkId) => {
    const currentLinks = get().quickLinks || [];
    set({ quickLinks: currentLinks.filter((link) => link.id !== linkId) });
    get().saveSettings();
  },

  updateQuickLink: (linkId, updates) => {
    const currentLinks = get().quickLinks || [];
    set({
      quickLinks: currentLinks.map((link) =>
        link.id === linkId ? { ...link, ...updates } : link
      ),
    });
    get().saveSettings();
  },

  loadSettings: async () => {
    set({ isLoading: true });
    const settings = await storageService.getSettings();
    if (settings) {
      // 确保 quickLinks 存在，如果不存在则使用默认值
      const quickLinks = settings.quickLinks || DEFAULT_QUICK_LINKS;

      // 数据迁移：合并新增的小部件
      const currentWidgets = settings.widgets || [];
      const currentWidgetTypes = new Set(currentWidgets.map((w) => w.type));

      // 从 registry 获取所有应该存在的小部件
      const allWidgetTypes = Object.keys(widgetRegistry) as WidgetType[];

      // 添加任何不在当前列表中的新小部件
      const newWidgets = allWidgetTypes
        .filter((type) => !currentWidgetTypes.has(type))
        .map((type) => ({
          id: `${type}-1`,
          type,
          enabled: widgetRegistry[type].enabled,
        }));

      // 合并已存储的和新增的小部件
      const mergedWidgets = [...currentWidgets, ...newWidgets];

      set({ ...settings, widgets: mergedWidgets, quickLinks, isLoading: false });
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
      quickLinks: state.quickLinks,
    };
    await storageService.saveSettings(settings);
  },
}));
