import { httpClient } from '@/services/http';
import type { StockIndex, StockIndicesResponse } from './types';

interface StockApiResponse {
  success: boolean;
  data: StockIndicesResponse;
  timestamp: number;
}

class StockService {
  /**
   * Fetch stock indices
   */
  async fetchStockIndices(): Promise<StockIndex[]> {
    try {
      const response = await httpClient.get<StockApiResponse>('/stock-index');
      if (!response || !response.data || !response.data.indices) {
        return [];
      }
      return response.data.indices;
    } catch (error) {
      console.warn('Failed to fetch stock indices:', error);
      return [];
    }
  }
}

export const stockService = new StockService();
