import { httpClient } from '@/services/http';
import type { ExchangeRate, ExchangeRatesApiResponse } from './types';

class ExchangeService {
  /**
   * Fetch exchange rates from API
   */
  async fetchExchangeRates(): Promise<ExchangeRate[]> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response = await httpClient.get<any>('/api/exchange/latest');

      if (!response) {
        return [];
      }

      // Handle potential wrapper structure
      let apiData: ExchangeRatesApiResponse['data'] | null = null;

      if (response && typeof response === 'object' && 'data' in response && response.data) {
        apiData = response.data;
      }

      if (!apiData || !apiData.rates || typeof apiData.rates !== 'object') {
        return [];
      }

      // Convert rates object to array format
      const rates: ExchangeRate[] = [];
      const baseCurrency = apiData.base || 'USD';

      for (const [currency, rate] of Object.entries(apiData.rates)) {
        if (typeof rate === 'number') {
          rates.push({
            baseCurrency,
            targetCurrency: currency,
            rate,
          });
        }
      }

      return rates;
    } catch {
      return [];
    }
  }
}

export const exchangeService = new ExchangeService();
