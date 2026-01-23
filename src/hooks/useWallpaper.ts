import { useState, useEffect, useCallback } from 'react';
import { wallpaperService } from '@/services/wallpaper';
import { useSettingsStore } from '@/store/useSettingsStore';
import type { CachedWallpaper } from '@/types';

export function useWallpaper() {
  const [wallpaper, setWallpaper] = useState<CachedWallpaper | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const { wallpaper: wallpaperSource } = useSettingsStore();

  const loadWallpaper = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const wp = await wallpaperService.getWallpaper(wallpaperSource);
      setWallpaper(wp);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load wallpaper'));
    } finally {
      setIsLoading(false);
    }
  }, [wallpaperSource]);

  const refreshWallpaper = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const wp = await wallpaperService.refreshWallpaper(wallpaperSource);
      setWallpaper(wp);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to refresh wallpaper'));
    } finally {
      setIsLoading(false);
    }
  }, [wallpaperSource]);

  useEffect(() => {
    loadWallpaper();
  }, [loadWallpaper]);

  return {
    wallpaper,
    isLoading,
    error,
    refreshWallpaper,
  };
}
