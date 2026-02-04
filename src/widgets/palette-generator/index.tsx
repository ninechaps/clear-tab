import { useState } from 'react';

interface ColorStep {
  hex: string;
  opacity: number;
}

export function PaletteGenerator() {
  const [baseColor, setBaseColor] = useState('#3B82F6');
  const [hexInput, setHexInput] = useState('#3B82F6');
  const [opacityStep, setOpacityStep] = useState('5');
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  // Convert hex to RGB
  const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
      : null;
  };

  // Convert RGB to hex
  const rgbToHex = (r: number, g: number, b: number): string => {
    return (
      '#' +
      [r, g, b]
        .map((x) => {
          const hex = x.toString(16);
          return hex.length === 1 ? '0' + hex : hex;
        })
        .join('')
        .toUpperCase()
    );
  };

  // Generate color palette
  const generatePalette = (): ColorStep[] => {
    const rgb = hexToRgb(baseColor);
    if (!rgb) return [];

    const step = parseInt(opacityStep) || 5;
    const steps = Math.floor(100 / step) + 1;
    const palette: ColorStep[] = [];

    for (let i = 0; i < steps; i++) {
      const opacity = Math.min(i * step, 100);
      const opacityDecimal = opacity / 100;

      // Calculate hex with opacity (by blending with white background)
      const blendedR = Math.round(rgb.r + (255 - rgb.r) * (1 - opacityDecimal));
      const blendedG = Math.round(rgb.g + (255 - rgb.g) * (1 - opacityDecimal));
      const blendedB = Math.round(rgb.b + (255 - rgb.b) * (1 - opacityDecimal));
      const hex = rgbToHex(blendedR, blendedG, blendedB);

      palette.push({
        hex,
        opacity,
      });

      if (opacity === 100) break;
    }

    return palette;
  };

  const handleHexInput = (value: string) => {
    const cleanValue = value.startsWith('#') ? value : `#${value}`;
    setHexInput(cleanValue);

    if (/^#[0-9A-F]{6}$/i.test(cleanValue)) {
      setBaseColor(cleanValue);
    }
  };

  const handleOpacityStepChange = (value: string) => {
    const num = parseInt(value);
    if (num >= 1 && num <= 100) {
      setOpacityStep(value);
    }
  };

  const handleCopy = async (hex: string) => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopiedHex(hex);
      setTimeout(() => setCopiedHex(null), 1500);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const palette = generatePalette();
  const totalSteps = palette.length;

  return (
    <div className="w-full space-y-3">
      {/* Color Picker Section */}
      <div className="space-y-2 bg-white/5 border border-white/10 rounded-lg p-3">
        {/* Color Input */}
        <div className="flex gap-2 items-center">
          <input
            type="color"
            value={baseColor}
            onChange={(e) => {
              setBaseColor(e.target.value);
              setHexInput(e.target.value);
            }}
            className="w-10 h-10 rounded cursor-pointer border border-white/20"
          />
          <input
            type="text"
            value={hexInput}
            onChange={(e) => handleHexInput(e.target.value)}
            placeholder="#000000"
            className="flex-1 bg-white/10 border border-white/20 rounded px-2 py-1.5 text-white text-sm focus:outline-none focus:border-white/40 placeholder:text-white/30 font-mono"
          />
        </div>

        {/* Opacity Step Input */}
        <div>
          <label className="text-xs text-white/60 font-semibold uppercase block mb-1">
            Transparency Step: {opacityStep}%
          </label>
          <input
            type="number"
            min="1"
            max="100"
            value={opacityStep}
            onChange={(e) => handleOpacityStepChange(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded px-2 py-1.5 text-white text-sm focus:outline-none focus:border-white/40 placeholder:text-white/30 font-mono"
          />
          <div className="text-xs text-white/50 mt-1">
            {totalSteps} colors will be generated
          </div>
        </div>
      </div>

      {/* Color Palette Grid */}
      <div>
        <div className="text-xs text-white/60 font-semibold uppercase mb-2">Color Palette</div>
        <div className="max-h-80 overflow-y-auto pr-2 -mr-2 scrollbar-thin">
          <div className="grid grid-cols-4">
            {palette.map((color) => (
              <button
                key={color.hex}
                onClick={() => handleCopy(color.hex)}
                className="relative aspect-square overflow-hidden transition-all hover:brightness-110 flex flex-col items-center justify-center"
                title="Click to copy"
                style={{
                  backgroundColor: color.hex,
                }}
              >
                {/* Background overlay for text readability */}
                <div className="absolute inset-0 bg-black/25" />

                {/* Text content */}
                <div className="relative flex flex-col items-center justify-center gap-0.5 px-1">
                  <span
                    className={`text-xs font-mono font-bold transition-all leading-tight ${
                      copiedHex === color.hex
                        ? 'text-green-400'
                        : 'text-white'
                    }`}
                  >
                    {copiedHex === color.hex ? '✓' : color.hex}
                  </span>
                  <span className="text-xs text-white/80 leading-tight">
                    {color.opacity}%
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
