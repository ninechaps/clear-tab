import { httpClient } from '@/services/http';
import type { CitiesResponse, WeatherData } from './types';

interface WeatherApiResponse {
    success: boolean;
    data: WeatherData;
    timestamp: number;
}

interface CitiesApiResponse {
    success: boolean;
    data: CitiesResponse;
    timestamp: number;
}

class WeatherService {
  /**
     * Fetch weather data for a specific city
     */
  async fetchWeather(city: string): Promise<WeatherData> {
    try {
      const response = await httpClient.get<WeatherApiResponse>(
        `/api/weather?city=${encodeURIComponent(city)}`
      );
      if (!response || !response.data) {
        throw new Error('Invalid response from weather API');
      }
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch weather: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
     * Fetch supported cities list
     */
  async fetchCities(): Promise<string[]> {
    try {
      const response = await httpClient.get<CitiesApiResponse>('/api/weather/cities');
      if (!response || !response.data || !response.data.cities) {
        throw new Error('Invalid response from cities API');
      }
      return response.data.cities;
    } catch (error) {
      throw new Error(`Failed to fetch cities: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Fetch weather for multiple cities in parallel
   */
  async fetchMultipleCities(cities: string[]): Promise<WeatherData[]> {
    try {
      const results = await Promise.all(
        cities.map(city => this.fetchWeather(city))
      );
      return results;
    } catch (error) {
      throw new Error(`Failed to fetch multiple cities: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

export const weatherService = new WeatherService();
