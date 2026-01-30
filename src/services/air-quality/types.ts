/**
 * Air quality data structure
 */
export interface AirQualityData {
  city: string;
  aqi: number;
  level: 'Excellent' | 'Good' | 'Moderate' | 'Poor' | 'Very Poor';
  pm25: number;
  pm10: number;
  o3: number;
  no2: number;
  so2: number;
  timestamp: string;
}

/**
 * Air quality response
 */
export interface AirQualityResponse {
  data: AirQualityData[];
}
