/**
 * 颜色格式自动识别
 */

import { hexToRgb, hslToRgb } from './colorConversion';
import type { RGB } from './colorConversion';

export type ColorFormat = 'hex' | 'rgb' | 'rgba' | 'hsl' | 'hsla'

export interface DetectionResult {
  format: ColorFormat
  rgb: RGB
}

const HEX_REGEX = /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/;
const RGB_REGEX = /^rgba?\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)?$/i;
const RGBA_REGEX = /^rgba\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(0?\.?\d+|1(?:\.0)?)\s*\)$/i;
const HSL_REGEX = /^hsla?\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)?$/i;
const HSLA_REGEX = /^hsla\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*,\s*(0?\.?\d+|1(?:\.0)?)\s*\)$/i;

/**
 * 检测颜色格式并返回 RGB 值
 */
export function detectAndConvert(input: string): DetectionResult | null {
  const trimmed = input.trim();

  // 尝试检测 HEX
  if (HEX_REGEX.test(trimmed)) {
    try {
      const rgb = hexToRgb(trimmed);
      return { format: trimmed.includes('#') ? 'hex' : 'hex', rgb };
    } catch {
      return null;
    }
  }

  // 尝试检测 RGBA
  const rgbaMatch = RGBA_REGEX.exec(trimmed);
  if (rgbaMatch) {
    const [, r, g, b, a] = rgbaMatch;
    return {
      format: 'rgba',
      rgb: {
        r: parseInt(r),
        g: parseInt(g),
        b: parseInt(b),
        a: parseFloat(a),
      },
    };
  }

  // 尝试检测 RGB
  const rgbMatch = RGB_REGEX.exec(trimmed);
  if (rgbMatch) {
    const [, r, g, b] = rgbMatch;
    return {
      format: 'rgb',
      rgb: {
        r: parseInt(r),
        g: parseInt(g),
        b: parseInt(b),
      },
    };
  }

  // 尝试检测 HSLA
  const hslaMatch = HSLA_REGEX.exec(trimmed);
  if (hslaMatch) {
    const [, h, s, l, a] = hslaMatch;
    const rgb = hslToRgb(parseInt(h), parseInt(s), parseInt(l), parseFloat(a));
    return { format: 'hsla', rgb };
  }

  // 尝试检测 HSL
  const hslMatch = HSL_REGEX.exec(trimmed);
  if (hslMatch) {
    const [, h, s, l] = hslMatch;
    const rgb = hslToRgb(parseInt(h), parseInt(s), parseInt(l));
    return { format: 'hsl', rgb };
  }

  return null;
}

/**
 * 获取格式的显示名称
 */
export function getFormatLabel(format: ColorFormat): string {
  const labels: Record<ColorFormat, string> = {
    hex: 'HEX',
    rgb: 'RGB',
    rgba: 'RGBA',
    hsl: 'HSL',
    hsla: 'HSLA',
  };
  return labels[format];
}
