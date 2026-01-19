import type { CachedWallpaper, WallpaperSource } from '@/types'
import { storageService } from './storage'

const UNSPLASH_SOURCE_URL = 'https://source.unsplash.com'

class WallpaperService {
  async getWallpaper(source: WallpaperSource): Promise<CachedWallpaper> {
    const cached = await storageService.getCachedWallpaper()

    if (cached && this.isCacheValid(cached, source.refreshInterval)) {
      return cached
    }

    const fresh = await this.fetchWallpaper(source)
    await storageService.cacheWallpaper(fresh)
    return fresh
  }

  private isCacheValid(cached: CachedWallpaper, refreshInterval: number): boolean {
    const now = Date.now()
    const cacheAge = now - cached.cachedAt
    const maxAge = refreshInterval * 60 * 1000
    return cacheAge < maxAge
  }

  private async fetchWallpaper(source: WallpaperSource): Promise<CachedWallpaper> {
    if (source.provider === 'unsplash') {
      return this.fetchFromUnsplash(source.keywords)
    }

    // Default fallback
    return this.getDefaultWallpaper()
  }

  private async fetchFromUnsplash(keywords: string[]): Promise<CachedWallpaper> {
    const query = keywords.join(',')
    const url = `${UNSPLASH_SOURCE_URL}/1920x1080/?${query}`

    return {
      url,
      thumbnailUrl: `${UNSPLASH_SOURCE_URL}/400x300/?${query}`,
      cachedAt: Date.now(),
    }
  }

  private getDefaultWallpaper(): CachedWallpaper {
    return {
      url: '',
      thumbnailUrl: '',
      cachedAt: Date.now(),
    }
  }

  async refreshWallpaper(source: WallpaperSource): Promise<CachedWallpaper> {
    await storageService.clearWallpaperCache()
    return this.getWallpaper(source)
  }
}

export const wallpaperService = new WallpaperService()
