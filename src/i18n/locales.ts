import { en } from './locales/en';
import { zh } from './locales/zh';

export const locales = {
  en,
  zh,
} as const;

export type Locale = keyof typeof locales;
export type TranslationKeys = typeof locales.en;
