/**
 * 颜色格式转换工具
 * 支持 HEX、RGB、RGBA、HSL、HSLA 格式之间的转换
 */

export interface RGB {
  r: number;
  g: number;
  b: number;
  a?: number;
}

export interface HSL {
  h: number;
  s: number;
  l: number;
  a?: number;
}

/**
 * HEX 转 RGB
 * 支持格式: #RGB, #RRGGBB, #RRGGBBAA
 */
export function hexToRgb(hex: string): RGB {
  const cleanHex = hex.replace('#', '').toUpperCase();

  let r = 0,
    g = 0,
    b = 0,
    a: number | undefined;

  if (cleanHex.length === 3) {
    // #RGB -> #RRGGBB
    r = parseInt(cleanHex[0] + cleanHex[0], 16);
    g = parseInt(cleanHex[1] + cleanHex[1], 16);
    b = parseInt(cleanHex[2] + cleanHex[2], 16);
  } else if (cleanHex.length === 6) {
    // #RRGGBB
    r = parseInt(cleanHex.substring(0, 2), 16);
    g = parseInt(cleanHex.substring(2, 4), 16);
    b = parseInt(cleanHex.substring(4, 6), 16);
  } else if (cleanHex.length === 8) {
    // #RRGGBBAA
    r = parseInt(cleanHex.substring(0, 2), 16);
    g = parseInt(cleanHex.substring(2, 4), 16);
    b = parseInt(cleanHex.substring(4, 6), 16);
    a = parseInt(cleanHex.substring(6, 8), 16) / 255;
  }

  return { r, g, b, ...(a !== undefined && { a: Math.round(a * 100) / 100 }) };
}

/**
 * RGB 转 HEX
 */
export function rgbToHex(r: number, g: number, b: number, a?: number): string {
  const toHex = (n: number) => {
    const hex = n.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;

  if (a !== undefined && a < 1) {
    const alpha = Math.round(a * 255);
    return hex + toHex(alpha);
  }

  return hex;
}

/**
 * RGB 转 HSL
 */
export function rgbToHsl(r: number, g: number, b: number, a?: number): HSL {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
    ...(a !== undefined && { a }),
  };
}

/**
 * HSL 转 RGB
 */
export function hslToRgb(h: number, s: number, l: number, a?: number): RGB {
  h = h / 360;
  s = s / 100;
  l = l / 100;

  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
    ...(a !== undefined && { a }),
  };
}

/**
 * 格式化输出
 */
export interface FormattedColors {
  hex: string;
  hexDisplay: string;
  rgb: string;
  rgba: string;
  hsl: string;
  hsla: string;
}

export function formatAllColors(rgb: RGB): FormattedColors {
  const hex = rgbToHex(rgb.r, rgb.g, rgb.b, rgb.a);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b, rgb.a);

  return {
    hex,
    hexDisplay: hex.toUpperCase(),
    rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
    rgba: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a ?? 1})`,
    hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
    hsla: `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, ${hsl.a ?? 1})`,
  };
}
