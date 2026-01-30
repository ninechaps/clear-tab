import { useEffect, useState } from 'react';
import { ArrowLeft, Cloud, CloudRain, Droplets, Eye, RefreshCw, Sun, Wind } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWidgetHeader } from '@/components/common/useWidgetHeader';
import { useCitiesWeather } from '@/hooks/useCitiesWeather';
import type { WeatherData } from '@/services/weather';

// Add animation styles
const animationStyle = `
  @keyframes flipInY {
    from {
      opacity: 0;
      transform: rotateY(90deg);
    }
    to {
      opacity: 1;
      transform: rotateY(0deg);
    }
  }

  @keyframes flipOutY {
    from {
      opacity: 1;
      transform: rotateY(0deg);
    }
    to {
      opacity: 0;
      transform: rotateY(-90deg);
    }
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = animationStyle;
  document.head.appendChild(style);
}

function getWeatherIcon(condition: string, className: string = 'w-5 h-5') {
  const conditionLower = condition.toLowerCase();
  if (conditionLower.includes('rain')) {
    return <CloudRain className={className}/>;
  }
  if (conditionLower.includes('cloud')) {
    return <Cloud className={className}/>;
  }
  return <Sun className={className}/>;
}

interface WeatherListProps {
    citiesWeather: WeatherData[];
    onSelectCity: (weather: WeatherData) => void;
    showExitAnimation?: boolean;
}

function WeatherListPanel({ citiesWeather, onSelectCity, showExitAnimation }: WeatherListProps) {
  return (
    <div
      className="w-full overflow-hidden"
      style={{
        animation: showExitAnimation ? 'flipInY 0.6s ease-out reverse' : 'none',
      }}
    >
      {/* List */}
      <div className="max-h-96 overflow-y-auto">
        {citiesWeather.length === 0 ? (
          <div className="px-4 py-6 text-center text-white/50 text-sm">
                        No cities data available
          </div>
        ) : (
          citiesWeather.map((weather, index) => (
            <button
              key={index}
              onClick={() => onSelectCity(weather)}
              className="w-full grid grid-cols-3 gap-4 px-4 py-3 hover:bg-white/10 transition-colors text-white text-sm border-b border-white/10"
            >
              {/* City Name */}
              <div className="text-left font-medium">{weather.city}</div>

              {/* Weather Condition */}
              <div className="flex items-center justify-center gap-2">
                <div className="flex-shrink-0">
                  {getWeatherIcon(weather.condition, 'w-4 h-4')}
                </div>
                <span className="text-xs text-center opacity-80 truncate">
                  {weather.condition}
                </span>
              </div>

              {/* Temperature */}
              <div className="text-right text-xs opacity-80">
                {Math.round(weather.temperature)}°C
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}

interface WeatherDetailPanelProps {
    weather: WeatherData;
    onBack: () => void;
    isExiting: boolean;
}

function WeatherDetailPanel({ weather, onBack, isExiting }: WeatherDetailPanelProps) {
  return (
    <div className="w-full" style={{ perspective: '1000px' }}>
      {/* Single Weather Card */}
      <div
        className="bg-white/8 backdrop-blur-xl rounded-3xl border border-white/20 overflow-hidden hover:border-white/30 transition-all duration-500 relative"
        style={{
          transformStyle: 'preserve-3d',
          animation: isExiting ? 'flipOutY 0.3s ease-in forwards' : 'flipInY 0.6s ease-out',
        }}>
        {/* Back Button - Top Right */}
        <button
          onClick={onBack}
          className="absolute top-4 right-4 p-1 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300 cursor-pointer z-10"
          title="Back to list"
        >
          <ArrowLeft className="w-4 h-4"/>
        </button>

        {/* Card Top Section - Temperature & Main Info */}
        <div className="px-5 py-4 bg-gradient-to-br from-white/5 to-white/0">
          <div className="flex items-center gap-3 mb-3">
            {/* Icon & Temperature */}
            <div className="text-4xl flex-shrink-0 opacity-90">
              {getWeatherIcon(weather.condition, 'w-10 h-10')}
            </div>
            <div>
              <div className="text-3xl font-light text-white leading-tight">
                {Math.round(weather.temperature)}°C
              </div>
              <div className="text-xs text-white/70 mt-0.5">
                {weather.condition}
              </div>
            </div>
          </div>

          {/* City & Status */}
          <div className="border-t border-white/10 pt-3 pb-0">
            <div className="text-xs text-white/60">
                            Location: <span className="text-white font-medium">{weather.city}</span>
            </div>
          </div>
        </div>

        {/* Card Divider */}
        <div className="h-px bg-gradient-to-r from-white/0 via-white/10 to-white/0"/>

        {/* Card Bottom Section - Details */}
        <div className="px-5 py-5">
          {/* Details Grid - 2x2 */}
          <div className="grid grid-cols-2 gap-5">
            {/* Feels Like */}
            <div className="space-y-1">
              <div className="text-xs text-white/60 font-semibold uppercase tracking-wide">
                                Feels Like
              </div>
              <div className="text-xl font-light text-white">
                {Math.round(weather.feelsLike)}°C
              </div>
            </div>

            {/* Humidity */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 mb-0.5">
                <Droplets className="w-3 h-3 text-white/60"/>
                <span className="text-xs text-white/60 font-semibold uppercase tracking-wide">
                  Humidity
                </span>
              </div>
              <div className="text-xl font-light text-white">
                {weather.humidity}%
              </div>
            </div>

            {/* Wind Speed */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 mb-0.5">
                <Wind className="w-3 h-3 text-white/60"/>
                <span className="text-xs text-white/60 font-semibold uppercase tracking-wide">
                  Wind Speed
                </span>
              </div>
              <div className="text-xl font-light text-white">
                {Math.round(weather.windSpeed)} <span className="text-xs text-white/70">km/h</span>
              </div>
            </div>

            {/* Coordinates */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 mb-0.5">
                <Eye className="w-3 h-3 text-white/60"/>
                <span className="text-xs text-white/60 font-semibold uppercase tracking-wide">
                  Location
                </span>
              </div>
              <div className="text-xs text-white font-mono">
                {weather.latitude.toFixed(2)}°, {weather.longitude.toFixed(2)}°
              </div>
            </div>
          </div>
        </div>

        {/* Card Footer */}
        <div className="px-5 py-2 border-t border-white/10 bg-white/3">
          <div className="text-xs text-white/40 text-center">
                        Updated {new Date(weather.updatedAt).toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
}

export function WeatherListView() {
  const { citiesWeather, isLoading, error, refresh } = useCitiesWeather();
  const [selectedWeather, setSelectedWeather] = useState<WeatherData | null>(null);
  const [isExiting, setIsExiting] = useState(false);
  const { registerAction, unregisterAction } = useWidgetHeader();

  const handleBack = () => {
    setIsExiting(true);
    setTimeout(() => {
      setSelectedWeather(null);
      setIsExiting(false);
    }, 300);
  };

  // Register refresh button in widget header
  useEffect(() => {
    const refreshButton = (
      <Button
        onClick={refresh}
        disabled={isLoading}
        variant="ghost"
        size="sm"
        className="p-1 text-white/40 hover:text-white/80 hover:bg-white/10 transition-all duration-300 disabled:opacity-50 h-auto"
        title="Refresh weather"
      >
        <RefreshCw
          className={`w-4 h-4 transition-transform duration-300 ${isLoading ? 'animate-spin' : ''}`}
        />
      </Button>
    );

    registerAction({
      id: 'weather-refresh',
      element: refreshButton,
    });

    return () => {
      unregisterAction('weather-refresh');
    };
  }, [isLoading, refresh, registerAction, unregisterAction]);

  if (error) {
    return (
      <div className="w-full text-white">
        <div className="text-center py-4">
          <p className="text-red-400 text-sm mb-2">Error</p>
          <p className="text-xs opacity-70">{error}</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full text-white">
        <div className="text-center py-4">
          <p className="text-sm opacity-70">Loading cities...</p>
        </div>
      </div>
    );
  }

  // Show detail view if a city is selected
  if (selectedWeather) {
    return (
      <WeatherDetailPanel
        weather={selectedWeather}
        onBack={handleBack}
        isExiting={isExiting}
      />
    );
  }

  // Show list view
  return (
    <WeatherListPanel
      citiesWeather={citiesWeather}
      onSelectCity={setSelectedWeather}
      showExitAnimation={isExiting}
    />
  );
}
