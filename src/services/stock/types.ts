/**
 * Stock index data structure
 */
export interface StockIndex {
  symbol: string;
  name: string;
  currentPrice: number;
  openPrice: number;
  highPrice: number;
  lowPrice: number;
  previousClose: number;
  change: number;
  changePercent: number;
  timestamp: number;
}

/**
 * Stock indices response
 */
export interface StockIndicesResponse {
  indices: StockIndex[];
  updatedAt: string;
}
