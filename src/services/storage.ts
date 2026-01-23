import type { UserSettings, CachedWallpaper } from '@/types';

const SETTINGS_KEY = 'user_settings';
const WALLPAPER_CACHE_KEY = 'wallpaper_cache';

class StorageService {
  private isExtension = typeof chrome !== 'undefined' && chrome.storage;

  async getSettings(): Promise<UserSettings | null> {
    if (this.isExtension) {
      const result = await chrome.storage.sync.get(SETTINGS_KEY);
      return result[SETTINGS_KEY] || null;
    }
    const stored = localStorage.getItem(SETTINGS_KEY);
    return stored ? JSON.parse(stored) : null;
  }

  async saveSettings(settings: UserSettings): Promise<void> {
    if (this.isExtension) {
      await chrome.storage.sync.set({ [SETTINGS_KEY]: settings });
    } else {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    }
  }

  async getCachedWallpaper(): Promise<CachedWallpaper | null> {
    if (this.isExtension) {
      const result = await chrome.storage.local.get(WALLPAPER_CACHE_KEY);
      return result[WALLPAPER_CACHE_KEY] || null;
    }
    const stored = localStorage.getItem(WALLPAPER_CACHE_KEY);
    return stored ? JSON.parse(stored) : null;
  }

  async cacheWallpaper(wallpaper: CachedWallpaper): Promise<void> {
    if (this.isExtension) {
      await chrome.storage.local.set({ [WALLPAPER_CACHE_KEY]: wallpaper });
    } else {
      localStorage.setItem(WALLPAPER_CACHE_KEY, JSON.stringify(wallpaper));
    }
  }

  async clearWallpaperCache(): Promise<void> {
    if (this.isExtension) {
      await chrome.storage.local.remove(WALLPAPER_CACHE_KEY);
    } else {
      localStorage.removeItem(WALLPAPER_CACHE_KEY);
    }
  }
}

export const storageService = new StorageService();
