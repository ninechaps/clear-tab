import { useState, FormEvent, useRef, useEffect } from 'react'
import { useSettingsStore } from '@/store/useSettingsStore'
import { useI18n } from '@/i18n'

const SEARCH_ENGINES = {
  google: 'https://www.google.com/search?q=',
  bing: 'https://www.bing.com/search?q=',
  duckduckgo: 'https://duckduckgo.com/?q=',
  baidu: 'https://www.baidu.com/s?wd=',
}

const ENGINE_ICONS: Record<string, JSX.Element> = {
  google: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  ),
  bing: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M5 3v16.5l4.25 2.25 8.5-4.25-3.25-1.75 3.25-1.75L5 3zm4 7.5l4 2-4 2v-4z" />
    </svg>
  ),
  duckduckgo: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
    </svg>
  ),
  baidu: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M5 9.5c0-1.93 1.57-3.5 3.5-3.5S12 7.57 12 9.5 10.43 13 8.5 13 5 11.43 5 9.5zm10-3.5c1.93 0 3.5 1.57 3.5 3.5S16.93 13 15 13s-3.5-1.57-3.5-3.5S13.07 6 15 6zm-3 10c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4z" />
    </svg>
  ),
}

export function Search() {
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const { searchSettings } = useSettingsStore()
  const { t } = useI18n()
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-focus on mount with slight delay for animation
  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus()
    }, 600)
    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    const baseUrl = SEARCH_ENGINES[searchSettings.engine]
    const searchUrl = baseUrl + encodeURIComponent(query)
    window.location.href = searchUrl
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className={`relative group transition-transform duration-300 ease-out ${isFocused ? 'scale-[1.02]' : ''}`}>
        {/* Gradient glow effect */}
        <div
          className={`absolute -inset-1 bg-gradient-to-r from-indigo-500/60 via-purple-500/60 to-pink-500/60 rounded-2xl blur-lg transition-all duration-500 ${
            isFocused ? 'opacity-70' : 'opacity-0 group-hover:opacity-40'
          }`}
        />

        {/* Main input container */}
        <div className="relative">
          {/* Search engine indicator */}
          <div className={`absolute left-5 top-1/2 -translate-y-1/2 transition-all duration-300 ${
            isFocused ? 'text-white/70' : 'text-white/40'
          }`}>
            {ENGINE_ICONS[searchSettings.engine] || ENGINE_ICONS.google}
          </div>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={t.search.placeholder}
            className="w-full pl-12 pr-14 py-4 text-lg bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl text-white placeholder-white/30 outline-none transition-all duration-300 focus:bg-black/30 focus:border-white/20"
          />

          {/* Submit button */}
          <button
            type="submit"
            className={`absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-xl transition-all duration-200 cursor-pointer ${
              query.trim()
                ? 'text-white bg-white/10 hover:bg-white/20'
                : 'text-white/40 hover:text-white/60'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Keyboard hint */}
      <div className={`text-center mt-3 transition-all duration-300 ${isFocused ? 'opacity-60' : 'opacity-0'}`}>
        <span className="text-white/50 text-xs">
          Press <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-white/70 font-mono text-[10px]">Enter</kbd> to search
        </span>
      </div>
    </form>
  )
}
