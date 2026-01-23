import { useSettingsStore } from '@/store/useSettingsStore'
import { locales, type Locale } from './locales'

export function useI18n() {
  const language = useSettingsStore((state) => state.language)
  const locale: Locale = language as Locale
  const t = locales[locale]

  return { locale, t }
}
