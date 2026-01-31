import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { STANDARD_COLORS } from './data/standardColors';
import type { StandardColor } from './types';

export function ColorPalette() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredColors, setFilteredColors] = useState<StandardColor[]>(STANDARD_COLORS);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredColors(STANDARD_COLORS);
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = STANDARD_COLORS.filter(
        (color) =>
          color.name.toLowerCase().includes(term) ||
                    color.nameCn.includes(searchTerm) ||
                    color.hex.toLowerCase().includes(term) ||
                    color.rgb.toLowerCase().includes(term),
      );
      setFilteredColors(filtered);
    }
  }, [searchTerm]);

  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Search */}
      <div>
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={t('widgets.color-palette.searchPlaceholder')}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
        />
        {filteredColors.length === 0 && searchTerm && (
          <p className="text-xs text-white/50 mt-2">{t('widgets.color-palette.noResults')}</p>
        )}
        {filteredColors.length > 0 && (
          <p className="text-xs text-white/50 mt-2">
            {t('widgets.color-palette.colorCount', { count: filteredColors.length })}
          </p>
        )}
      </div>

      {/* Color List */}
      <div className="space-y-1 max-h-96 overflow-y-auto pr-2 -mr-2 scrollbar-hide">
        {filteredColors.map((color) => (
          <div
            key={color.name}
            className="flex gap-1.5 items-start p-1.5 hover:bg-white/5 transition-colors rounded-lg"
          >
            {/* Color Preview */}
            <div
              className="w-8 h-8 rounded-lg flex-shrink-0 border border-white/20 mt-0.5"
              style={{ backgroundColor: color.hex }}
            />

            {/* Color Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-xs px-1.5 py-0.5 font-medium text-white">{color.name}</span>
                <span className="text-xs text-white/50">{color.nameCn}</span>
              </div>

              {/* HEX and RGB */}
              <div className="flex">
                <span
                  onClick={() => handleCopy(color.hex, `hex-${color.name}`)}
                  className={`text-xs font-mono leading-none cursor-pointer px-1.5 py-0.5 rounded transition-all ${
                    copiedId === `hex-${color.name}`
                      ? 'bg-green-400/20 text-green-400'
                      : 'text-white/60 hover:bg-white/10 hover:text-white'
                  }`}
                  title={t('widgets.color-palette.copyHex')}
                >
                  {copiedId === `hex-${color.name}` ? t('widgets.color-palette.copied') : color.hex}
                </span>
                <span
                  onClick={() => handleCopy(color.rgb, `rgb-${color.name}`)}
                  className={`text-xs font-mono leading-none cursor-pointer px-1.5 py-0.5 rounded transition-all ${
                    copiedId === `rgb-${color.name}`
                      ? 'bg-green-400/20 text-green-400'
                      : 'text-white/60 hover:bg-white/10 hover:text-white'
                  }`}
                  title={t('widgets.color-palette.copyRgb')}
                >
                  {copiedId === `rgb-${color.name}` ? t('widgets.color-palette.copied') : color.rgb}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
