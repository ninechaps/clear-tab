import { useState, FormEvent, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Search as SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function Search() {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus on mount with slight delay for animation
  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    // 使用 Chrome Search API，尊重用户设置的默认搜索引擎
    if (typeof chrome !== 'undefined' && chrome.search?.query) {
      chrome.search.query({ text: query, disposition: 'CURRENT_TAB' });
    } else {
      // 开发环境降级：直接跳转 Google（仅用于本地调试，生产环境不会走此分支）
      window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    }
  };

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
          {/* Search icon */}
          <div className={`absolute left-5 top-1/2 -translate-y-1/2 transition-all duration-300 ${
            isFocused ? 'text-white/70' : 'text-white/40'
          }`}>
            <SearchIcon className="w-4 h-4" />
          </div>

          <Input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={t('search.placeholder')}
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
          {t('search.pressEnterToSearch')}
        </span>
      </div>
    </form>
  );
}
