export const locales = {
  en: {
    search: {
      placeholder: 'Search the web...',
    },
    clock: {
      greeting: {
        morning: 'Good morning',
        afternoon: 'Good afternoon',
        evening: 'Good evening',
      },
    },
    weather: {
      sunny: 'Sunny',
      cloudy: 'Cloudy',
      rainy: 'Rainy',
      location: 'Current Location',
    },
    background: {
      title: 'Choose Background',
      randomMode: 'Random background on each open',
      randomModeHint: 'A random background will be shown each time you open a new tab',
      categoryLabels: {
        classic: 'Classic',
        warm: 'Warm',
        cool: 'Cool',
        dark: 'Dark',
      },
      categories: {
        nature: 'Nature',
        city: 'City',
        abstract: 'Abstract',
        minimal: 'Minimal',
        space: 'Space',
        ocean: 'Ocean',
        sunset: 'Sunset',
        aurora: 'Aurora',
        midnight: 'Midnight',
        rose: 'Rose',
        forest: 'Forest',
        lavender: 'Lavender',
        ember: 'Ember',
        arctic: 'Arctic',
        noir: 'Noir',
        cosmic: 'Cosmic',
      },
    },
    settings: {
      changeBackground: 'Change background',
    },
  },
  zh: {
    search: {
      placeholder: '搜索...',
    },
    clock: {
      greeting: {
        morning: '早上好',
        afternoon: '下午好',
        evening: '晚上好',
      },
    },
    weather: {
      sunny: '晴天',
      cloudy: '多云',
      rainy: '雨天',
      location: '当前位置',
    },
    background: {
      title: '选择背景',
      randomMode: '每次打开随机背景',
      randomModeHint: '每次打开新标签页时随机显示一个背景',
      categoryLabels: {
        classic: '经典',
        warm: '暖色',
        cool: '冷色',
        dark: '深色',
      },
      categories: {
        nature: '自然',
        city: '城市',
        abstract: '抽象',
        minimal: '极简',
        space: '太空',
        ocean: '海洋',
        sunset: '日落',
        aurora: '极光',
        midnight: '午夜',
        rose: '玫瑰',
        forest: '森林',
        lavender: '薰衣草',
        ember: '余烬',
        arctic: '极地',
        noir: '黑白',
        cosmic: '宇宙',
      },
    },
    settings: {
      changeBackground: '切换背景',
    },
  },
} as const

export type Locale = keyof typeof locales
export type TranslationKeys = typeof locales.en
