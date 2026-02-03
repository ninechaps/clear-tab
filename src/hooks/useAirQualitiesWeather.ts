import { useState, useEffect, useCallback } from 'react';
import { airQualityService } from '@/services/air-quality';
import type { AirQualityData } from '@/services/air-quality';

interface UseAirQualitiesWeatherReturn {
  citiesAirQuality: AirQualityData[];
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  searchAndAdd: (cityName: string) => Promise<void>;
}

interface CityInfo {
  name: string;
  latitude: number;
  longitude: number;
}

// Default cities with coordinates and names
const DEFAULT_CITIES: CityInfo[] = [
  { name: '北京', latitude: 39.9042, longitude: 116.4074 },
  { name: '上海', latitude: 31.2304, longitude: 121.4737 },
  { name: '深圳', latitude: 22.5431, longitude: 114.0579 },
  { name: '杭州', latitude: 30.2741, longitude: 120.1551 },
  { name: '广州', latitude: 23.1291, longitude: 113.2644 },
];

export function useAirQualitiesWeather(): UseAirQualitiesWeatherReturn {
  const [citiesAirQuality, setCitiesAirQuality] = useState<AirQualityData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCitiesAirQuality = useCallback(async (cities: CityInfo[] = DEFAULT_CITIES) => {
    try {
      setIsLoading(true);
      setError(null);

      const airQualityPromises = cities.map(city =>
        airQualityService.fetchAirQuality(city.latitude, city.longitude, city.name)
      );
      const airQuality = await Promise.all(airQualityPromises);
      console.log('Air quality data received:', airQuality);
      setCitiesAirQuality(airQuality);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to fetch cities air quality';
      console.error('Air quality fetch error:', errorMsg, err);
      setError(errorMsg);
      setCitiesAirQuality([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refresh = useCallback(async () => {
    await fetchCitiesAirQuality();
  }, [fetchCitiesAirQuality]);

  const searchAndAdd = useCallback(async (cityName: string) => {
    try {
      console.log('Searching for city:', cityName);
      const cities = await airQualityService.searchCities(cityName);
      console.log('Search results:', cities);

      if (cities.length === 0) {
        throw new Error('No cities found');
      }

      // Use the first result
      const selectedCity = cities[0];
      console.log('Selected city:', selectedCity);

      const airData = await airQualityService.fetchAirQuality(
        selectedCity.latitude,
        selectedCity.longitude,
        selectedCity.name
      );
      console.log('Air quality data fetched:', airData);

      // Check if city already exists
      const exists = citiesAirQuality.some(
        city => city.latitude === selectedCity.latitude && city.longitude === selectedCity.longitude
      );

      if (!exists) {
        setCitiesAirQuality(prev => [airData, ...prev]);
      } else {
        console.log('City already exists in list');
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to search and add city';
      console.error('searchAndAdd error:', err);
      setError(errorMsg);
    }
  }, [citiesAirQuality]);

  // Fetch on mount
  useEffect(() => {
    fetchCitiesAirQuality();
  }, [fetchCitiesAirQuality]);

  return {
    citiesAirQuality,
    isLoading,
    error,
    refresh,
    searchAndAdd,
  };
}
