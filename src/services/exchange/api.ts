import { httpClient } from '@/services/http';
import type { ExchangeRate, ExchangeRatesResponse } from './types';

interface ExchangeApiResponse {
  success: boolean;
  data: ExchangeRatesResponse;
  timestamp: number;
}

class ExchangeService {
  /**
   * Fetch exchange rates
   */
  async fetchExchangeRates(): Promise<ExchangeRate[]> {
    try {
      const response = await httpClient.get<ExchangeApiResponse>('/exchange-rates');
      if (!response || !response.data || !response.data.rates) {
        return [];
      }
      return response.data.rates;
    } catch (error) {
      console.warn('Failed to fetch exchange rates:', error);
      return [];
    }
  }
}

export const exchangeService = new ExchangeService();
