import { useState, useEffect, useCallback } from 'react';
import { newsService } from '@/services/news';
import type { NewsArticle } from '@/services/news';

interface UseNewsReturn {
  articles: NewsArticle[];
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function useNews(): UseNewsReturn {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHeadlines = useCallback(async (showLoading: boolean = true) => {
    try {
      showLoading && setIsLoading(true);
      const data = await newsService.fetchHeadlines();
      setArticles(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch news headlines');
      setArticles([]);
    } finally {
      showLoading && setIsLoading(false);
    }
  }, []);

  const refresh = useCallback(async () => {
    await fetchHeadlines(true);
  }, [fetchHeadlines]);

  // Fetch on mount
  useEffect(() => {
    fetchHeadlines();
  }, [fetchHeadlines]);

  return {
    articles,
    isLoading,
    error,
    refresh,
  };
}
