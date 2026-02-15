import { httpClient } from '@/services/http';
import type { StockIndex, StockIndicesResponse } from './types';

interface StockApiResponse {
    success: boolean;
    data: StockIndicesResponse;
    timestamp: number;
}

class StockService {
  /**
     * Fetch stock indices (common indices list)
     */
  async fetchStockIndices(): Promise<StockIndex[]> {
    try {
      const response = await httpClient.get<StockApiResponse>('/api/stock/indices');
      if (!response || !response.data || !response.data.indices) {
        return [];
      }
      return response.data.indices;
    } catch {
      return [];
    }
  }

  /**
     * Fetch stock quote by symbol
     */
  async fetchStockQuote(symbol: string): Promise<StockIndex | null> {
    try {
      if (!symbol || !symbol.trim()) {
        return null;
      }
      const response = await httpClient.get<StockApiResponse>('/api/stock/quote', {
        params: { symbol: symbol.trim().toUpperCase() }
      });
      if (!response || !response.data || !response.data.indices || response.data.indices.length === 0) {
        return null;
      }
      return response.data.indices[0];
    } catch {
      return null;
    }
  }
}

export const stockService = new StockService();
