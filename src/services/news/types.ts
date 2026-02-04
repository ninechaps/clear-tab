/**
 * News article structure from backend API
 */
export interface NewsArticle {
  title: string;
  description: string;
  source: string;
  url: string;
  publishedAt: string;
  category: string;
}

/**
 * News headlines response from API
 */
export interface NewsHeadlinesResponse {
  articles: NewsArticle[];
  totalResults: number;
  category: string;
}
