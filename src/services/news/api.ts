import { httpClient } from '@/services/http';
import type { NewsArticle, NewsHeadlinesResponse } from './types';

interface NewsApiResponse {
  success: boolean;
  data: NewsHeadlinesResponse;
  timestamp: number;
}

class NewsService {
  /**
   * Fetch news headlines
   */
  async fetchHeadlines(): Promise<NewsArticle[]> {
    try {
      const response = await httpClient.get<NewsApiResponse>('/api/news/headlines');
      if (!response || !response.data || !response.data.articles) {
        return [];
      }
      return response.data.articles;
    } catch {
      return [];
    }
  }
}

export const newsService = new NewsService();
