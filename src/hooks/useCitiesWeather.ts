import { useState, useEffect, useCallback } from 'react';
import { weatherService } from '@/services/weather';
import type { WeatherData } from '@/services/weather';

interface UseCitiesWeatherReturn {
  citiesWeather: WeatherData[];
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function useCitiesWeather(): UseCitiesWeatherReturn {
  const [citiesWeather, setCitiesWeather] = useState<WeatherData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCitiesWeather = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // First, fetch the list of cities
      const cities = await weatherService.fetchCities();

      // Then fetch weather for all cities in parallel
      const weather = await weatherService.fetchMultipleCities(cities);
      setCitiesWeather(weather);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch cities weather');
      setCitiesWeather([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refresh = useCallback(async () => {
    await fetchCitiesWeather();
  }, [fetchCitiesWeather]);

  // Fetch on mount
  useEffect(() => {
    fetchCitiesWeather();
  }, [fetchCitiesWeather]);

  return {
    citiesWeather,
    isLoading,
    error,
    refresh,
  };
}
