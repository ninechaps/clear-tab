import { httpClient } from '@/services/http';
import type { Quote } from './types';

interface QuoteApiResponse {
    success: boolean;
    data: Quote;
    timestamp: number;
}

class QuoteService {
  /**
     * Fetch a random quote from local backend API
     */
  async fetchRandomQuote(): Promise<Quote> {
    try {
      const response = await httpClient.get<QuoteApiResponse>('/api/quote');
      if (!response || !response.data) {
        throw new Error('Invalid response from quote API');
      }
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch quote: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

export const quoteService = new QuoteService();
