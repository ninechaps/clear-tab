import { httpClient } from '@/services/http';
import type { NewsArticle, NewsListResponse } from './types';

interface NewsApiResponse {
  success: boolean;
  data: NewsListResponse;
  timestamp: number;
}

class NewsService {
  /**
   * Fetch news articles list
   */
  async fetchNewsList(): Promise<NewsArticle[]> {
    try {
      const response = await httpClient.get<NewsApiResponse>('/news');
      if (!response || !response.data || !response.data.articles) {
        return [];
      }
      // Limit to 5 articles
      return response.data.articles.slice(0, 5);
    } catch (error) {
      console.warn('Failed to fetch news:', error);
      return [];
    }
  }
}

export const newsService = new NewsService();
