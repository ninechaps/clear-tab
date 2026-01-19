import type { Theme } from '@/types'

export const themes: Record<string, Theme> = {
  focus: {
    id: 'focus',
    name: 'Focus Mode',
    description: 'Minimalist interface for deep work',
    enabledWidgets: ['clock', 'countdown'],
    backgroundBlur: 20,
    backgroundOverlay: 0.5,
  },
  minimal: {
    id: 'minimal',
    name: 'Minimal Mode',
    description: 'Just the essentials - time display only',
    enabledWidgets: ['clock'],
    backgroundBlur: 0,
    backgroundOverlay: 0.3,
  },
  info: {
    id: 'info',
    name: 'Info Mode',
    description: 'Weather, search, and quick access',
    enabledWidgets: ['clock', 'search', 'weather'],
    backgroundBlur: 10,
    backgroundOverlay: 0.4,
  },
  custom: {
    id: 'custom',
    name: 'Custom',
    description: 'Fully customizable layout',
    enabledWidgets: [],
    backgroundBlur: 0,
    backgroundOverlay: 0.3,
  },
}

export const getTheme = (id: string): Theme => {
  return themes[id] || themes.minimal
}
