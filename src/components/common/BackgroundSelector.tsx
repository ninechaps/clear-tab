import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, RefreshCw, X } from 'lucide-react';
import { useSettingsStore } from '@/store/useSettingsStore';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { backgroundPresets } from './backgroundPresets';

interface BackgroundOption {
  id: string
  gradient: string
  accent: string
  category: 'classic' | 'warm' | 'cool' | 'dark'
}

const backgroundOptions: BackgroundOption[] = [
  // Classic
  { id: 'minimal', gradient: 'from-gray-950 via-slate-900 to-zinc-950', accent: 'rgba(100, 116, 139, 0.2)', category: 'classic' },
  { id: 'city', gradient: 'from-slate-950 via-zinc-900 to-neutral-950', accent: 'rgba(148, 163, 184, 0.3)', category: 'classic' },
  { id: 'space', gradient: 'from-indigo-950 via-violet-950 to-slate-950', accent: 'rgba(129, 140, 248, 0.3)', category: 'classic' },
  { id: 'abstract', gradient: 'from-purple-950 via-fuchsia-900 to-pink-950', accent: 'rgba(192, 132, 252, 0.3)', category: 'classic' },

  // Warm
  { id: 'sunset', gradient: 'from-orange-950 via-rose-900 to-pink-950', accent: 'rgba(251, 146, 60, 0.3)', category: 'warm' },
  { id: 'rose', gradient: 'from-rose-950 via-pink-900 to-fuchsia-950', accent: 'rgba(244, 63, 94, 0.3)', category: 'warm' },
  { id: 'ember', gradient: 'from-red-950 via-orange-950 to-amber-950', accent: 'rgba(239, 68, 68, 0.3)', category: 'warm' },
  { id: 'lavender', gradient: 'from-violet-950 via-purple-900 to-indigo-950', accent: 'rgba(139, 92, 246, 0.3)', category: 'warm' },

  // Cool
  { id: 'ocean', gradient: 'from-blue-950 via-cyan-900 to-sky-950', accent: 'rgba(34, 211, 238, 0.3)', category: 'cool' },
  { id: 'aurora', gradient: 'from-emerald-950 via-cyan-900 to-purple-950', accent: 'rgba(52, 211, 153, 0.3)', category: 'cool' },
  { id: 'arctic', gradient: 'from-cyan-950 via-sky-900 to-blue-950', accent: 'rgba(34, 211, 238, 0.3)', category: 'cool' },
  { id: 'nature', gradient: 'from-emerald-950 via-green-900 to-teal-950', accent: 'rgba(16, 185, 129, 0.3)', category: 'cool' },
  { id: 'forest', gradient: 'from-green-950 via-emerald-950 to-teal-950', accent: 'rgba(34, 197, 94, 0.3)', category: 'cool' },

  // Dark
  { id: 'midnight', gradient: 'from-slate-950 via-indigo-950 to-black', accent: 'rgba(99, 102, 241, 0.3)', category: 'dark' },
  { id: 'noir', gradient: 'from-neutral-950 via-zinc-950 to-black', accent: 'rgba(163, 163, 163, 0.2)', category: 'dark' },
  { id: 'cosmic', gradient: 'from-fuchsia-950 via-violet-900 to-blue-950', accent: 'rgba(217, 70, 239, 0.3)', category: 'dark' },
];

const categories = ['classic', 'warm', 'cool', 'dark'] as const;

interface BackgroundSelectorProps {
  onClose: () => void
}

export function BackgroundSelector({ onClose }: BackgroundSelectorProps) {
  const { wallpaper, setWallpaperSource } = useSettingsStore();
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<typeof categories[number] | 'all'>('all');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const isRandomMode = wallpaper.randomMode ?? true;

  // Lock body scroll when modal is open to prevent scrollbar shift
  useEffect(() => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, []);

  const currentKeyword = wallpaper.keywords[0] || 'minimal';

  const filteredOptions = activeCategory === 'all'
    ? backgroundOptions
    : backgroundOptions.filter(opt => opt.category === activeCategory);

  const handleSelect = (option: BackgroundOption) => {
    // 选择具体背景时关闭随机模式
    setWallpaperSource({ keywords: [option.id], randomMode: false });
  };

  const handleToggleRandomMode = () => {
    setWallpaperSource({ randomMode: !isRandomMode });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-slate-900/95 backdrop-blur-xl rounded-2xl p-6 max-w-3xl w-full mx-4 border border-white/10 animate-scale-in shadow-2xl max-h-[85vh] overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold text-white">{t('background.title')}</h2>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="p-2 h-auto text-white/60 hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Random mode toggle */}
        <div className="mb-5 pb-4 border-b border-white/10">
          <label className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg transition-colors ${isRandomMode ? 'bg-indigo-500/20' : 'bg-white/10'}`}>
                <RefreshCw
                  className={`w-5 h-5 transition-colors ${isRandomMode ? 'text-indigo-400' : 'text-white/60'}`}
                />
              </div>
              <div className="text-left">
                <div className={`font-medium transition-colors ${isRandomMode ? 'text-white' : 'text-white/80'}`}>
                  {t('background.randomMode')}
                </div>
                <div className="text-sm text-white/50">
                  {t('background.randomModeHint')}
                </div>
              </div>
            </div>
            <Switch
              checked={isRandomMode}
              onCheckedChange={handleToggleRandomMode}
              className="ml-3"
            />
          </label>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-5 pb-4 border-b border-white/10 shrink-0">
          <Button
            onClick={() => setActiveCategory('all')}
            variant={activeCategory === 'all' ? 'default' : 'ghost'}
            className={`text-sm whitespace-nowrap ${
              activeCategory === 'all'
                ? 'bg-white/15 text-white'
                : 'text-white/60 hover:text-white hover:bg-white/10'
            }`}
          >
            {t('backgroundSelector.all')}
          </Button>
          {categories.map(cat => (
            <Button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              variant={activeCategory === cat ? 'default' : 'ghost'}
              className={`text-sm whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-white/15 text-white'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              {t(`background.categoryLabels.${cat}`)}
            </Button>
          ))}
        </div>

        {/* Grid */}
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 overflow-y-scroll scrollbar-thin p-1 -m-1 min-h-0">
          {filteredOptions.map((option, index) => {
            const isSelected = currentKeyword === option.id;
            const isHovered = hoveredId === option.id;
            const categoryName = t(`background.categories.${option.id}`);
            const preset = backgroundPresets[option.id];

            return (
              <div
                key={option.id}
                onClick={() => handleSelect(option)}
                onMouseEnter={() => setHoveredId(option.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`group relative rounded-xl overflow-hidden transition-all duration-300 animate-fade-in cursor-pointer ${
                  isSelected
                    ? 'ring-2 ring-indigo-500 ring-offset-2 ring-offset-slate-900 scale-[1.02]'
                    : 'hover:ring-2 hover:ring-white/30 hover:scale-[1.03]'
                }`}
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <div className={`aspect-[4/3] bg-gradient-to-br ${option.gradient} relative overflow-hidden`}>
                  {/* Animated orbs preview */}
                  <div
                    className={`absolute -top-1/4 -left-1/4 w-2/3 h-2/3 rounded-full blur-xl transition-opacity duration-500 ${
                      isHovered ? 'opacity-60' : 'opacity-30'
                    }`}
                    style={{
                      background: `radial-gradient(circle, ${preset?.orbColors?.[0] || option.accent} 0%, transparent 70%)`,
                    }}
                  />
                  <div
                    className={`absolute -bottom-1/4 -right-1/4 w-2/3 h-2/3 rounded-full blur-xl transition-opacity duration-500 ${
                      isHovered ? 'opacity-60' : 'opacity-30'
                    }`}
                    style={{
                      background: `radial-gradient(circle, ${preset?.orbColors?.[1] || option.accent} 0%, transparent 70%)`,
                    }}
                  />

                  {/* Grid pattern */}
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)
                      `,
                      backgroundSize: '16px 16px',
                    }}
                  />

                  {/* Label */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`text-white font-medium text-sm drop-shadow-lg transition-all duration-300 ${
                      isHovered ? 'scale-110' : ''
                    }`}>
                      {categoryName}
                    </span>
                  </div>

                  {/* Hover overlay */}
                  <div className={`absolute inset-0 bg-white/5 transition-opacity duration-300 ${
                    isHovered && !isSelected ? 'opacity-100' : 'opacity-0'
                  }`} />
                </div>

                {/* Selected checkmark */}
                {isSelected && (
                  <div className="absolute top-2 right-2 bg-indigo-500 rounded-full p-1 animate-scale-in shadow-lg">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer hint */}
        <div className="mt-4 pt-4 border-t border-white/10 text-center">
          <p className="text-white/40 text-sm">
            {filteredOptions.length} backgrounds available
          </p>
        </div>
      </div>
    </div>
  );
}
