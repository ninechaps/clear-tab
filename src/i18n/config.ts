import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { useSettingsStore } from '@/store/useSettingsStore';
import { locales } from './locales';

const resources = {
  en: {
    translation: locales.en,
  },
  zh: {
    translation: locales.zh,
  },
};

i18next
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    ns: ['translation'],
    defaultNS: 'translation',
  });

// Sync with Zustand store on language change
i18next.on('languageChanged', (lng) => {
  useSettingsStore.setState({ language: lng as 'en' | 'zh' });
});

export default i18next;
