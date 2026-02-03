import { httpClient } from '@/services/http';
import type { ExchangeRate, ExchangeRatesApiResponse } from './types';

class ExchangeService {
  /**
   * Fetch exchange rates from API
   */
  async fetchExchangeRates(): Promise<ExchangeRate[]> {
    try {
      console.log('Fetching exchange rates from /api/exchange/latest...');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response = await httpClient.get<any>('/api/exchange/latest');
      console.log('Exchange rates raw response:', response);

      if (!response) {
        console.warn('Empty response from exchange rates API');
        return [];
      }

      // Handle potential wrapper structure
      let apiData: ExchangeRatesApiResponse['data'] | null = null;

      if (response && typeof response === 'object' && 'data' in response && response.data) {
        apiData = response.data;
      }

      console.log('Processed exchange rates data:', apiData);

      if (!apiData || !apiData.rates || typeof apiData.rates !== 'object') {
        console.warn('No rates object found in response');
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

      console.log('Converted rates array:', rates);
      return rates;
    } catch (error) {
      console.error('Failed to fetch exchange rates:', error);
      return [];
    }
  }
}

export const exchangeService = new ExchangeService();
