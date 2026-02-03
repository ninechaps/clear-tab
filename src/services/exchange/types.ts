/**
 * Exchange rate data structure for frontend
 */
export interface ExchangeRate {
  baseCurrency: string;
  targetCurrency: string;
  rate: number;
}

/**
 * Exchange rates API response
 */
export interface ExchangeRatesApiResponse {
  success: boolean;
  data: {
    base: string;
    date: string;
    rates: Record<string, number>;
    timestamp: number;
  };
  timestamp: number;
}
