import { useState, FormEvent, useRef, useEffect } from 'react'
import { Search as SearchIcon } from 'lucide-react'
import { SiDuckduckgo, SiGoogle } from '@icons-pack/react-simple-icons'
import { useSettingsStore } from '@/store/useSettingsStore'
import { useI18n } from '@/i18n'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

// Custom icon components for search engines not in simple-icons
function BingIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M5 3v16.5l4.25 2.25 8.5-4.25-3.25-1.75 3.25-1.75L5 3zm4 7.5l4 2-4 2v-4z" />
    </svg>
  )
}

function BaiduIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M5 9.5c0-1.93 1.57-3.5 3.5-3.5S12 7.57 12 9.5 10.43 13 8.5 13 5 11.43 5 9.5zm10-3.5c1.93 0 3.5 1.57 3.5 3.5S16.93 13 15 13s-3.5-1.57-3.5-3.5S13.07 6 15 6zm-3 10c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4z" />
    </svg>
  )
}

const SEARCH_ENGINES = {
  google: 'https://www.google.com/search?q=',
  bing: 'https://www.bing.com/search?q=',
  duckduckgo: 'https://duckduckgo.com/?q=',
  baidu: 'https://www.baidu.com/s?wd=',
}

function getEngineIcon(engine: string): React.ReactNode {
  const className = 'w-4 h-4'
  switch (engine) {
    case 'google':
      return <SiGoogle className={className} />
    case 'bing':
      return <BingIcon className={className} />
    case 'duckduckgo':
      return <SiDuckduckgo className={className} />
    case 'baidu':
      return <BaiduIcon className={className} />
    default:
      return <SiGoogle className={className} />
  }
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
            {getEngineIcon(searchSettings.engine)}
          </div>

          <Input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={t.search.placeholder}
            className="w-full pl-12 pr-14 py-6 text-lg bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl text-white placeholder-white/30 outline-none transition-all duration-300 focus:bg-black/30 focus:border-white/20"
          />

          {/* Submit button */}
          <Button
            type="submit"
            variant="ghost"
            size="sm"
            className={`absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-xl h-auto transition-all duration-200 ${
              query.trim()
                ? 'text-white bg-white/10 hover:bg-white/20'
                : 'text-white/40 hover:text-white/60'
            }`}
          >
            <SearchIcon className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Keyboard hint */}
      <div className={`text-center mt-3 transition-all duration-300 ${isFocused ? 'opacity-60' : 'opacity-0'}`}>
        <span className="text-white/50 text-xs">
          {t.search.pressEnterToSearch}
        </span>
      </div>
    </form>
  )
}
