/**
 * 获取网站的 favicon URL
 * 优先使用 Google Favicon Service，失败时使用默认图标
 */
export function getFaviconUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    // 使用 Google Favicon Service
    return `https://www.google.com/s2/favicons?domain=${urlObj.hostname}&sz=64`;
  } catch {
    return '';
  }
}

/**
 * 验证 favicon 是否可用
 */
export async function validateFavicon(faviconUrl: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    const timeout = setTimeout(() => {
      resolve(false);
    }, 3000); // 3秒超时

    img.onload = () => {
      clearTimeout(timeout);
      resolve(true);
    };

    img.onerror = () => {
      clearTimeout(timeout);
      resolve(false);
    };

    img.src = faviconUrl;
  });
}

/**
 * 获取默认图标（使用 Link 图标的 SVG data URL）
 */
export function getDefaultFaviconDataUrl(): string {
  return 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0xMCAxM2E1IDUgMCAwIDAgNy41IDZMNTI1IDVhNSA1IDAgMCAwLTcuNS02WiIvPjxwYXRoIGQ9Ik0xNCAxMmE1IDUgMCAwIDEtNy41LTZMMy41IDE5YTUgNSAwIDAgMSA3LjUgNloiLz48L3N2Zz4=';
}
