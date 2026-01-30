/**
 * Exchange rate data structure
 */
export interface ExchangeRate {
  pair: string;
  baseCurrency: string;
  targetCurrency: string;
  rate: number;
  change: number;
  changePercent: number;
  timestamp: string;
}

/**
 * Exchange rates list response
 */
export interface ExchangeRatesResponse {
  rates: ExchangeRate[];
}
