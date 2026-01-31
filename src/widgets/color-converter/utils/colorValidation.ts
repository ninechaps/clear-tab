/**
 * 颜色值验证
 */

/**
 * 验证 RGB 值范围
 */
export function isValidRGB(r: number, g: number, b: number, a?: number): boolean {
  if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
    return false;
  }

  if (a !== undefined && (a < 0 || a > 1)) {
    return false;
  }

  return true;
}

/**
 * 验证 HSL 值范围
 */
export function isValidHSL(h: number, s: number, l: number, a?: number): boolean {
  if (h < 0 || h > 360 || s < 0 || s > 100 || l < 0 || l > 100) {
    return false;
  }

  if (a !== undefined && (a < 0 || a > 1)) {
    return false;
  }

  return true;
}

/**
 * 验证 HEX 格式
 */
export function isValidHEX(hex: string): boolean {
  const cleanHex = hex.replace('#', '');
  return /^[0-9A-Fa-f]{3}$|^[0-9A-Fa-f]{6}$|^[0-9A-Fa-f]{8}$/.test(cleanHex);
}

/**
 * 验证整个颜色输入
 */
export function validateColorInput(input: string): { valid: boolean; error?: string } {
  const trimmed = input.trim();

  if (!trimmed) {
    return { valid: false, error: 'Color input cannot be empty' };
  }

  // 这里的详细验证将由 detectAndConvert 函数处理
  return { valid: true };
}
