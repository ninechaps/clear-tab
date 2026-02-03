/**
 * Air quality data structure from backend
 */
export interface AirQualityApiResponse {
  latitude: number;
  longitude: number;
  aqi: number;
  aqiDisplay: string;
  level: string;
  category: string;
  updateTime: string;
  primaryPollutant: {
    code: string;
    name: string;
    fullName: string;
  };
  healthEffect: string;
  healthAdvice: {
    generalPopulation: string;
    sensitivePopulation: string;
  };
  color: {
    red: number;
    green: number;
    blue: number;
    alpha: number;
  };
  pollutants: Array<{
    code: string;
    name: string;
    fullName: string;
    concentration: {
      value: number;
      unit: string;
    };
  }>;
}

/**
 * Air quality data structure for frontend (enriched with city info)
 */
export interface AirQualityData {
  city: string;
  latitude: number;
  longitude: number;
  aqi: number;
  category: string;
  updateTime: string;
  healthEffect: string;
  healthAdvice: {
    generalPopulation: string;
    sensitivePopulation: string;
  };
  pollutants: Array<{
    code: string;
    name: string;
    fullName: string;
    value: number;
    unit: string;
  }>;
}
