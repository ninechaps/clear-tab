import { useState, useEffect, useCallback } from 'react';
import { weatherService } from '@/services/weather';
import type { WeatherData } from '@/services/weather';

interface UseWeatherReturn {
  weather: WeatherData | null;
  isLoading: boolean;
  isRefreshing: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function useWeather(city: string): UseWeatherReturn {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = useCallback(async (showLoading: boolean = true) => {
    if (!city) {
      setIsLoading(false);
      return;
    }

    try {
      showLoading && setIsLoading(true);
      const weatherData = await weatherService.fetchWeather(city);
      setWeather(weatherData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather');
      setWeather(null);
    } finally {
      showLoading && setIsLoading(false);
    }
  }, [city]);

  const refresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await fetchWeather(false);
      // Add delay for visual feedback
      await new Promise((resolve) => setTimeout(resolve, 600));
    } finally {
      setIsRefreshing(false);
    }
  }, [fetchWeather]);

  // Fetch initial weather on mount or when city changes
  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  return {
    weather,
    isLoading,
    isRefreshing,
    error,
    refresh,
  };
}
