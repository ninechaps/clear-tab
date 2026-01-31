import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { detectAndConvert } from './utils/formatDetection';
import { formatAllColors } from './utils/colorConversion';
import type { ColorFormat } from './types';

export function ColorConverter() {
  const { t } = useTranslation();
  const [converted, setConverted] = useState(formatAllColors({ r: 52, g: 152, b: 219 }));
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);
  const [editingFormat, setEditingFormat] = useState<ColorFormat | null>(null);
  const [editValue, setEditValue] = useState('');
  const colorPickerRef = useRef<HTMLInputElement>(null);

  // 处理任何格式的输入变化
  const handleFormatChange = (format: ColorFormat, value: string) => {
    setEditValue(value);

    if (!value.trim()) {
      return;
    }

    const result = detectAndConvert(value);
    if (result) {
      setConverted(formatAllColors(result.rgb));
      setEditingFormat(format);
    }
  };

  // 处理颜色选择器变化
  const handlePickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hex = e.target.value;
    setConverted(formatAllColors(detectAndConvert(hex)?.rgb || { r: 0, g: 0, b: 0 }));
    setEditingFormat(null);
  };

  // 复制到剪贴板
  const handleCopy = async (text: string, format: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedFormat(format);
      setTimeout(() => setCopiedFormat(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // 获取当前值（编辑中显示编辑值，否则显示转换后的值）
  const getValue = (format: ColorFormat): string => {
    if (editingFormat === format) {
      return editValue;
    }
    return converted[format];
  };

  const formatConfigs: { key: ColorFormat; label: string }[] = [
    { key: 'hex', label: t('widgets.color-converter.formats.hex') },
    { key: 'rgb', label: t('widgets.color-converter.formats.rgb') },
    { key: 'rgba', label: t('widgets.color-converter.formats.rgba') },
    { key: 'hsl', label: t('widgets.color-converter.formats.hsl') },
    { key: 'hsla', label: t('widgets.color-converter.formats.hsla') },
  ];

  const previewColor = converted.hex;

  return (
    <div className="w-full space-y-4">
      {/* Color Preview - Clickable */}
      <div className="flex flex-col gap-2">
        <div className="relative w-full h-12">
          <div
            className="absolute inset-0 rounded-xl border border-white/20 shadow-lg transition-all cursor-pointer hover:border-white/40"
            style={{ backgroundColor: previewColor }}
          />
          <input
            ref={colorPickerRef}
            type="color"
            value={previewColor}
            onChange={handlePickerChange}
            className="absolute inset-0 w-full h-full cursor-pointer opacity-0"
          />
        </div>
      </div>

      {/* Color Formats - Editable */}
      <div className="space-y-3">
        {formatConfigs.map((format) => (
          <div key={format.key} className="flex items-center gap-3">
            <div className="w-12 text-xs text-white/60 font-medium flex-shrink-0">{format.label}</div>
            <div className="flex-1 flex items-center gap-2">
              <input
                type="text"
                value={getValue(format.key)}
                onChange={(e) => handleFormatChange(format.key, e.target.value)}
                className="flex-1 bg-white/5 rounded px-2 py-1 text-xs text-white/80 font-mono border border-white/10 focus:border-white/30 focus:outline-none focus:bg-white/10 transition-colors"
                placeholder={converted[format.key]}
              />
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleCopy(converted[format.key], format.key)}
                className="p-2 text-white/40 hover:text-white/80 hover:bg-white/10 transition-all flex-shrink-0"
                title={t('common.copy')}
              >
                {copiedFormat === format.key ? (
                  <Check className="w-4 h-4 text-green-400"/>
                ) : (
                  <Copy className="w-4 h-4"/>
                )}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
