export const locales = {
  en: {
    search: {
      placeholder: 'Search the web...',
      pressEnterToSearch: 'Press Enter to search',
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
    language: {
      switchLanguage: 'Language',
      english: 'English',
      chinese: '中文',
    },
    common: {
      back: '← Back',
      widgets: 'Widgets',
      settings: 'Settings',
    },
    widgets: {
      title: 'Widgets',
      close: 'Close',
      pinned: 'Pinned',
      available: 'Available',
      pin: 'Pin',
      unpin: '✓',
      openInNewTab: 'Open in new tab',
      noWidgets: 'No widgets available',
      weather: {
        name: 'Weather',
        description: 'Weather information',
      },
      quote: {
        name: 'Quote',
        description: 'Inspirational quotes',
      },
      countdown: {
        name: 'Countdown',
        description: 'End of year countdown',
      },
    },
    backgroundSelector: {
      all: 'All',
    },
  },
  zh: {
    search: {
      placeholder: '搜索...',
      pressEnterToSearch: '按 Enter 键进行搜索',
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
    language: {
      switchLanguage: '语言',
      english: 'English',
      chinese: '中文',
    },
    common: {
      back: '← 返回',
      widgets: '小部件',
      settings: '设置',
    },
    widgets: {
      title: '小部件',
      close: '关闭',
      pinned: '已固定',
      available: '可用',
      pin: '固定',
      unpin: '✓',
      openInNewTab: '在新标签页中打开',
      noWidgets: '没有可用的小部件',
      weather: {
        name: '天气',
        description: '天气信息',
      },
      quote: {
        name: '语录',
        description: '鼓舞人心的语录',
      },
      countdown: {
        name: '倒计时',
        description: '年末倒计时',
      },
    },
    backgroundSelector: {
      all: '全部',
    },
  },
} as const

export type Locale = keyof typeof locales
export type TranslationKeys = typeof locales.en
