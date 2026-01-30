/**
 * Weather data structure from backend API
 */
export interface WeatherData {
  city: string;
  latitude: number;
  longitude: number;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  feelsLike: number;
  updatedAt: string;
}

/**
 * Supported cities list response
 */
export interface CitiesResponse {
  cities: string[];
}
