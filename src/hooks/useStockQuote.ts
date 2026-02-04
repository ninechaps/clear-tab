import { useState, useCallback } from 'react';
import { stockService } from '@/services/stock';
import type { StockIndex } from '@/services/stock';

interface UseStockQuoteReturn {
  stock: StockIndex | null;
  isLoading: boolean;
  error: string | null;
  searchStock: (symbol: string) => Promise<void>;
  clearStock: () => void;
}

export function useStockQuote(): UseStockQuoteReturn {
  const [stock, setStock] = useState<StockIndex | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchStock = useCallback(async (symbol: string) => {
    try {
      if (!symbol || !symbol.trim()) {
        setStock(null);
        setError(null);
        return;
      }

      setIsLoading(true);
      setError(null);
      const data = await stockService.fetchStockQuote(symbol);

      if (data) {
        setStock(data);
      } else {
        setStock(null);
        setError('Stock not found');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch stock quote');
      setStock(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearStock = useCallback(() => {
    setStock(null);
    setError(null);
  }, []);

  return { stock, isLoading, error, searchStock, clearStock };
}
