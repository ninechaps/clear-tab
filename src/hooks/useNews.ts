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

  const fetchNews = useCallback(async (showLoading: boolean = true) => {
    try {
      showLoading && setIsLoading(true);
      const data = await newsService.fetchNewsList();
      setArticles(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch news');
      setArticles([]);
    } finally {
      showLoading && setIsLoading(false);
    }
  }, []);

  const refresh = useCallback(async () => {
    await fetchNews(false);
  }, [fetchNews]);

  // Fetch on mount
  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  return {
    articles,
    isLoading,
    error,
    refresh,
  };
}
