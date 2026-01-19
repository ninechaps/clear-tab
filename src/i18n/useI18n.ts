import { useMemo } from 'react'
import { locales, type Locale } from './locales'

function getBrowserLocale(): Locale {
  const browserLang = navigator.language.split('-')[0]
  return browserLang === 'zh' ? 'zh' : 'en'
}

export function useI18n() {
  const locale = useMemo(() => getBrowserLocale(), [])
  const t = useMemo(() => locales[locale], [locale])

  return { locale, t }
}
