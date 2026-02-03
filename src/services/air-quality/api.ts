import { httpClient } from '@/services/http';
import type { AirQualityData, AirQualityApiResponse } from './types';

class AirQualityService {
  /**
   * Transform backend response to frontend data format
   */
  private transformData(apiData: AirQualityApiResponse, cityName: string): AirQualityData {
    console.log('transformData input:', { apiData, cityName });

    if (!apiData) {
      throw new Error('apiData is null or undefined');
    }

    if (!apiData.pollutants) {
      console.error('Missing pollutants in apiData:', apiData);
      throw new Error(`Invalid air quality data structure - missing pollutants. Data keys: ${Object.keys(apiData).join(', ')}`);
    }

    if (!Array.isArray(apiData.pollutants)) {
      throw new Error(`pollutants is not an array, got ${typeof apiData.pollutants}`);
    }

    return {
      city: cityName,
      latitude: apiData.latitude,
      longitude: apiData.longitude,
      aqi: apiData.aqi,
      category: apiData.category,
      updateTime: apiData.updateTime,
      healthEffect: apiData.healthEffect,
      healthAdvice: apiData.healthAdvice,
      pollutants: apiData.pollutants.map(p => ({
        code: p.code,
        name: p.name,
        fullName: p.fullName,
        value: p.concentration.value,
        unit: p.concentration.unit,
      })),
    };
  }

  /**
   * Fetch air quality data using latitude and longitude with city name
   */
  async fetchAirQuality(latitude: number, longitude: number, cityName: string): Promise<AirQualityData> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response = await httpClient.get<any>(
        `/api/weather/air-quality?latitude=${latitude}&longitude=${longitude}`
      );

      if (!response) {
        throw new Error('Empty response from air quality API');
      }

      // Handle potential wrapper structure
      let apiData: AirQualityApiResponse = response;

      // If response has a 'data' property, use that (common API wrapper format)
      if (response && typeof response === 'object' && 'data' in response && response.data) {
        apiData = response.data as AirQualityApiResponse;
      }

      console.log('Raw API response:', response);
      console.log('Processed API data:', apiData);

      return this.transformData(apiData, cityName);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('Air quality fetch error details:', error);
      throw new Error(`Failed to fetch air quality: ${errorMessage}`);
    }
  }

  /**
   * Search cities by name
   */
  async searchCities(city: string): Promise<Array<{ name: string; latitude: number; longitude: number }>> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response = await httpClient.get<any>(
        `/api/weather/city?city=${encodeURIComponent(city)}`
      );

      console.log('City search raw response:', response);

      if (!response) {
        throw new Error('Empty response from city search API');
      }

      // The API returns a single city object with lat/lon fields
      if (typeof response === 'object' && response.name && (response.lat !== undefined || response.lon !== undefined)) {
        console.log('City search result:', response);

        return [{
          name: response.name,
          latitude: response.lat,
          longitude: response.lon,
        }];
      }

      // Handle potential wrapper structure (in case API wraps the response)
      let searchData = response;

      if (response && typeof response === 'object' && 'data' in response && response.data) {
        searchData = response.data;
      }

      console.log('City search processed data:', searchData);

      if (!searchData.name || (searchData.lat === undefined && searchData.lon === undefined)) {
        throw new Error(`Invalid city search response - missing required fields. Got: ${Object.keys(searchData).join(', ')}`);
      }

      return [{
        name: searchData.name,
        latitude: searchData.lat,
        longitude: searchData.lon,
      }];
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      console.error('City search error details:', error);
      throw new Error(`Failed to search cities: ${errorMsg}`);
    }
  }

}

export const airQualityService = new AirQualityService();
