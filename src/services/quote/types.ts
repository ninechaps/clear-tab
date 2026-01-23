/**
 * Response from Zen Quotes API
 */
export interface ZenQuotesResponse {
  q: string;  // quote text
  a: string;  // author
  h: string;  // HTML formatted version
}

/**
 * Normalized quote structure for internal use
 */
export interface Quote {
  text: string;
  author: string;
}
