import { useState, useEffect, useCallback } from 'react';
import { exchangeService } from '@/services/exchange';
import type { ExchangeRate } from '@/services/exchange';

interface UseExchangeRatesReturn {
  rates: ExchangeRate[];
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function useExchangeRates(): UseExchangeRatesReturn {
  const [rates, setRates] = useState<ExchangeRate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRates = useCallback(async (showLoading: boolean = true) => {
    try {
      showLoading && setIsLoading(true);
      console.log('useExchangeRates: Fetching rates...');
      const data = await exchangeService.fetchExchangeRates();
      console.log('useExchangeRates: Received data:', data);
      setRates(data);
      setError(null);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to fetch exchange rates';
      console.error('useExchangeRates: Error -', errorMsg);
      setError(errorMsg);
      setRates([]);
    } finally {
      showLoading && setIsLoading(false);
    }
  }, []);

  const refresh = useCallback(async () => {
    await fetchRates(true);
  }, [fetchRates]);

  useEffect(() => {
    fetchRates();
  }, [fetchRates]);

  return { rates, isLoading, error, refresh };
}
