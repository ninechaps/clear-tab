import { useState, useEffect, useCallback } from 'react';
import { quoteService } from '@/services/quote';
import type { Quote } from '@/services/quote';

// Fallback quotes for when API fails
const FALLBACK_QUOTES: Quote[] = [
  { text: 'Design is not just what it looks like and feels like. Design is how it works.', author: 'Steve Jobs' },
  { text: 'Simplicity is the ultimate sophistication.', author: 'Leonardo da Vinci' },
  { text: 'The only way to do great work is to love what you do.', author: 'Steve Jobs' },
  { text: 'Innovation distinguishes between a leader and a follower.', author: 'Steve Jobs' },
  { text: 'Life is what happens when you\'re busy making other plans.', author: 'John Lennon' },
  { text: 'The future belongs to those who believe in the beauty of their dreams.', author: 'Eleanor Roosevelt' },
  { text: 'It is during our darkest moments that we must focus to see the light.', author: 'Aristotle' },
  { text: 'The only impossible journey is the one you never begin.', author: 'Tony Robbins' },
  { text: 'Success is not final, failure is not fatal.', author: 'Winston Churchill' },
  { text: 'Believe you can and you\'re halfway there.', author: 'Theodore Roosevelt' },
];

interface UseQuoteReturn {
  quote: Quote | null;
  isLoading: boolean;
  isRefreshing: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function useQuote(): UseQuoteReturn {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchQuote = useCallback(async (showLoading: boolean = true) => {
    try {
      showLoading && setIsLoading(true);
      const newQuote = await quoteService.fetchRandomQuote();
      setQuote(newQuote);
      setError(null);
    } catch (err) {
      // Use fallback quote when API fails
      const randomIndex = Math.floor(Math.random() * FALLBACK_QUOTES.length);
      setQuote(FALLBACK_QUOTES[randomIndex]);
      setError(err instanceof Error ? err.message : 'Failed to fetch quote');
    } finally {
      showLoading && setIsLoading(false);
    }
  }, []);

  const refresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await fetchQuote(false);
      // Add delay for visual feedback
      await new Promise((resolve) => setTimeout(resolve, 600));
    } finally {
      setIsRefreshing(false);
    }
  }, [fetchQuote]);

  // Fetch initial quote on mount
  useEffect(() => {
    fetchQuote();
  }, [fetchQuote]);

  return {
    quote,
    isLoading,
    isRefreshing,
    error,
    refresh,
  };
}
