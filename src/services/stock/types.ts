/**
 * Stock index data structure
 */
export interface StockIndex {
  symbol: string;
  name: string;
  value: number;
  change: number;
  changePercent: number;
  timestamp: string;
}

/**
 * Stock indices response
 */
export interface StockIndicesResponse {
  indices: StockIndex[];
}
