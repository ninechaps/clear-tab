import { httpClient } from '@/services/http';
import type { Quote, ZenQuotesResponse } from './types';

const ZEN_QUOTES_API = '/api/random';

class QuoteService {
    /**
     * Fetch a random quote from Zen Quotes API
     */
    async fetchRandomQuote(): Promise<Quote> {
        try {
            const response = await httpClient.get<ZenQuotesResponse[]>(
                ZEN_QUOTES_API,
                {
                    headers: {
                        'Accept': 'application/json',
                    }
                }
            );
            // API returns an array with one item
            if (!response || response.length === 0) {
                throw new Error('Empty response from Zen Quotes API');
            }
            return this.normalizeQuote(response[0]);
        } catch (error) {
            throw new Error(`Failed to fetch quote: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    /**
     * Convert Zen Quotes API response to internal Quote format
     */
    private normalizeQuote(response: ZenQuotesResponse): Quote {
        return {
            text: response.q,
            author: response.a,
        };
    }
}

export const quoteService = new QuoteService();
