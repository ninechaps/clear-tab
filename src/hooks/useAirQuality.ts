import { useState, useEffect, useCallback } from 'react';
import { airQualityService } from '@/services/air-quality';
import type { AirQualityData } from '@/services/air-quality';

interface UseAirQualityReturn {
  data: AirQualityData[];
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function useAirQuality(): UseAirQualityReturn {
  const [data, setData] = useState<AirQualityData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (showLoading: boolean = true) => {
    try {
      showLoading && setIsLoading(true);
      const airData = await airQualityService.fetchAirQuality();
      setData(airData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch air quality');
      setData([]);
    } finally {
      showLoading && setIsLoading(false);
    }
  }, []);

  const refresh = useCallback(async () => {
    await fetchData(false);
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error, refresh };
}
