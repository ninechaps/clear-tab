import { httpClient } from '@/services/http';
import type { AirQualityData, AirQualityResponse } from './types';

interface AirQualityApiResponse {
  success: boolean;
  data: AirQualityResponse;
  timestamp: number;
}

class AirQualityService {
  /**
   * Fetch air quality data
   */
  async fetchAirQuality(): Promise<AirQualityData[]> {
    try {
      const response = await httpClient.get<AirQualityApiResponse>('/air-quality');
      if (!response || !response.data || !response.data.data) {
        return [];
      }
      return response.data.data;
    } catch (error) {
      console.warn('Failed to fetch air quality:', error);
      return [];
    }
  }
}

export const airQualityService = new AirQualityService();
