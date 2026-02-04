import { useState, useEffect, useCallback } from 'react';
import { stockService } from '@/services/stock';
import type { StockIndex } from '@/services/stock';

interface UseStockIndicesReturn {
  indices: StockIndex[];
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function useStockIndices(): UseStockIndicesReturn {
  const [indices, setIndices] = useState<StockIndex[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchIndices = useCallback(async (showLoading: boolean = true) => {
    try {
      showLoading && setIsLoading(true);
      const data = await stockService.fetchStockIndices();
      setIndices(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch stock indices');
      setIndices([]);
    } finally {
      showLoading && setIsLoading(false);
    }
  }, []);

  const refresh = useCallback(async () => {
    await fetchIndices(true);
  }, [fetchIndices]);

  useEffect(() => {
    fetchIndices();
  }, [fetchIndices]);

  return { indices, isLoading, error, refresh };
}
