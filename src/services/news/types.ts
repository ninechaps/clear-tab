/**
 * News article structure from backend API
 */
export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  date: string;
  source: string;
  url: string;
}

/**
 * News list response from API
 */
export interface NewsListResponse {
  articles: NewsArticle[];
}
