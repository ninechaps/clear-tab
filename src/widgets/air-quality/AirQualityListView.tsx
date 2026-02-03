import { useContext, useEffect, useState } from 'react';
import { ArrowLeft, RefreshCw, Search, Wind } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWidgetHeader } from '@/components/common/useWidgetHeader';
import { WidgetHeaderContext } from '@/components/common/WidgetHeaderContext';
import { useAirQualitiesWeather } from '@/hooks/useAirQualitiesWeather';
import type { AirQualityData } from '@/services/air-quality';
import { useTranslation } from 'react-i18next';

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

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = animationStyle;
  document.head.appendChild(style);
}

function getAQIColor(aqi: number): string {
  if (aqi <= 50) return 'text-green-400';
  if (aqi <= 100) return 'text-yellow-400';
  if (aqi <= 150) return 'text-orange-400';
  if (aqi <= 200) return 'text-red-400';
  if (aqi <= 300) return 'text-purple-400';
  return 'text-red-600';
}

function getAQIBackground(aqi: number): string {
  if (aqi <= 50) return 'bg-green-400/10';
  if (aqi <= 100) return 'bg-yellow-400/10';
  if (aqi <= 150) return 'bg-orange-400/10';
  if (aqi <= 200) return 'bg-red-400/10';
  if (aqi <= 300) return 'bg-purple-400/10';
  return 'bg-red-600/10';
}

function getCategoryLabel(category: string): string {
  const categoryMap: Record<string, string> = {
    '优': 'widgets.airQuality.good',
    '良': 'widgets.airQuality.moderate',
    '轻度污染': 'widgets.airQuality.unhealthySensitive',
    '中度污染': 'widgets.airQuality.unhealthy',
    '重度污染': 'widgets.airQuality.veryUnhealthy',
    '严重污染': 'widgets.airQuality.hazardous',
    'Good': 'widgets.airQuality.good',
    'Moderate': 'widgets.airQuality.moderate',
    'Unhealthy for Sensitive Groups': 'widgets.airQuality.unhealthySensitive',
    'Unhealthy': 'widgets.airQuality.unhealthy',
    'Very Unhealthy': 'widgets.airQuality.veryUnhealthy',
    'Hazardous': 'widgets.airQuality.hazardous',
  };
  return categoryMap[category] || category;
}

interface AirQualityListProps {
    citiesAirQuality: AirQualityData[];
    onSelectCity: (airQuality: AirQualityData) => void;
    onSearch: (cityName: string) => Promise<void>;
    searchLoading?: boolean;
}

function AirQualityListPanel({ citiesAirQuality, onSelectCity, onSearch }: AirQualityListProps) {
  const headerContext = useContext(WidgetHeaderContext);
  const isFullPage = headerContext?.isFullPage ?? false;
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      await onSearch(searchInput.trim());
      setSearchInput('');
    }
  };

  return (
    <div className="w-full overflow-hidden">
      {/* Search Box */}
      <form onSubmit={handleSearch} className="mb-4">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40"/>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search city..."
              className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg pl-9 pr-3 py-2 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-white/40 transition-colors"
            />
          </div>
        </div>
      </form>

      {/* List */}
      <div
        className={`max-h-96 overflow-y-auto ${isFullPage ? 'bg-white/8 backdrop-blur-xl rounded-2xl border border-white/20 p-4' : ''}`}>
        {citiesAirQuality.length === 0 ? (
          <div className="px-4 py-6 text-center text-white/50 text-sm">
            <p>No cities data available</p>
            <p className="text-xs text-white/30 mt-2">
                            Tip: Make sure the backend API is running and returning data in the correct format
            </p>
          </div>
        ) : (
          citiesAirQuality.map((airQuality, index) => (
            <button
              key={index}
              onClick={() => onSelectCity(airQuality)}
              className={`w-full grid grid-cols-3 gap-4 px-4 py-3 transition-colors text-white text-sm ${
                isFullPage
                  ? 'hover:bg-white/15 border-b border-white/10 last:border-b-0 rounded-lg'
                  : 'hover:bg-white/10 border-b border-white/10'
              }`}
            >
              {/* City Name */}
              <div className="text-left font-medium truncate">{airQuality?.city || 'Unknown City'}</div>

              {/* AQI Category */}
              <div className="flex items-center justify-center gap-2">
                <div className="flex-shrink-0">
                  <Wind className="w-4 h-4"/>
                </div>
                <span className="text-xs text-center opacity-80 truncate">
                  {airQuality?.category || 'Unknown'}
                </span>
              </div>

              {/* AQI Value */}
              <div className={`text-right text-xs font-semibold ${getAQIColor(airQuality?.aqi || 0)}`}>
                {airQuality?.aqi ?? 'N/A'}
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}

interface AirQualityDetailPanelProps {
    airQuality: AirQualityData;
    onBack: () => void;
    isExiting: boolean;
}

function AirQualityDetailPanel({ airQuality, onBack, isExiting }: AirQualityDetailPanelProps) {
  const { t } = useTranslation();

  // Safe number formatting helper
  const safeToFixed = (value: number | undefined | null, decimals: number = 1): string => {
    if (value === undefined || value === null) {
      return 'N/A';
    }
    if (typeof value !== 'number') {
      const parsed = parseFloat(String(value));
      return isNaN(parsed) ? 'N/A' : parsed.toFixed(decimals);
    }
    return isNaN(value) ? 'N/A' : value.toFixed(decimals);
  };

  return (
    <div className="w-full" style={{ perspective: '1000px' }}>
      <div
        className={`${getAQIBackground(airQuality?.aqi || 0)} bg-white/8 backdrop-blur-xl rounded-3xl border border-white/20 overflow-hidden hover:border-white/30 transition-all duration-500 relative`}
        style={{
          transformStyle: 'preserve-3d',
          animation: isExiting ? 'flipOutY 0.3s ease-in forwards' : 'flipInY 0.6s ease-out',
        }}
      >
        {/* Back Button */}
        <button
          onClick={onBack}
          className="absolute top-4 right-4 p-1 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300 cursor-pointer z-10"
          title="Back to list"
        >
          <ArrowLeft className="w-4 h-4"/>
        </button>

        {/* Card Top Section */}
        <div className="px-5 py-4 bg-gradient-to-br from-white/5 to-white/0">
          <div className="flex items-center gap-3 mb-3">
            <div className="text-4xl flex-shrink-0 opacity-90">
              <Wind className="w-10 h-10"/>
            </div>
            <div>
              <div className={`text-3xl font-light ${getAQIColor(airQuality?.aqi || 0)} leading-tight`}>
                {airQuality?.aqi ?? 'N/A'}
              </div>
              <div className="text-xs text-white/70 mt-0.5">
                {t(getCategoryLabel(airQuality?.category || '')) || airQuality?.category || 'Unknown'}
              </div>
            </div>
          </div>

          {/* City & Status */}
          <div className="border-t border-white/10 pt-3 pb-0">
            <div className="text-xs text-white/60">
                            Location: <span className="text-white font-medium">{airQuality?.city || 'Unknown'}</span>
            </div>
          </div>
        </div>

        {/* Card Divider */}
        <div className="h-px bg-gradient-to-r from-white/0 via-white/10 to-white/0"/>

        {/* Card Bottom Section */}
        <div className="px-5 py-5">
          {/* Health Effect */}
          <div className="mb-4 pb-4 border-b border-white/10">
            <div className="text-xs text-white/60 font-semibold uppercase tracking-wide mb-2">
                            Health Effect
            </div>
            <div className="text-xs text-white/80">
              {airQuality?.healthEffect || 'No information'}
            </div>
          </div>

          {/* Pollutants Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            {airQuality?.pollutants?.slice(0, 6).map((pollutant, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-white/60 font-semibold uppercase tracking-wide">
                  {pollutant.name}
                </div>
                <div className="text-sm font-light text-white">
                  {safeToFixed(pollutant.value)} <span
                    className="text-xs text-white/70">{pollutant.unit}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Coordinates */}
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="text-xs text-white/60 font-semibold uppercase tracking-wide mb-2">
                            Location
            </div>
            <div className="text-xs text-white font-mono">
              {airQuality?.latitude?.toFixed(4) ?? 'N/A'}°, {airQuality?.longitude?.toFixed(4) ?? 'N/A'}°
            </div>
          </div>
        </div>

        {/* Card Footer */}
        <div className="px-5 py-2 border-t border-white/10 bg-white/3">
          <div className="text-xs text-white/40 text-center">
                        Updated {airQuality?.updateTime ? new Date(airQuality.updateTime).toLocaleTimeString() : 'N/A'}
          </div>
        </div>
      </div>
    </div>
  );
}

export function AirQualityListView() {
  const { t } = useTranslation();
  const { citiesAirQuality, isLoading, error, refresh, searchAndAdd } = useAirQualitiesWeather();
  const [selectedAirQuality, setSelectedAirQuality] = useState<AirQualityData | null>(null);
  const [isExiting, setIsExiting] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const { registerAction, unregisterAction } = useWidgetHeader();

  const handleBack = () => {
    setIsExiting(true);
    setTimeout(() => {
      setSelectedAirQuality(null);
      setIsExiting(false);
    }, 300);
  };

  const handleSearch = async (cityName: string) => {
    setSearchLoading(true);
    try {
      await searchAndAdd(cityName);
    } finally {
      setSearchLoading(false);
    }
  };

  useEffect(() => {
    const refreshButton = (
      <Button
        onClick={refresh}
        disabled={isLoading}
        variant="ghost"
        size="sm"
        className="p-1 text-white/40 hover:text-white/80 hover:bg-white/10 transition-all duration-300 disabled:opacity-50 h-auto"
        title={t('widgets.openInNewTab')}
      >
        <RefreshCw
          className={`w-4 h-4 transition-transform duration-300 ${isLoading ? 'animate-spin' : ''}`}
        />
      </Button>
    );

    registerAction({
      id: 'air-quality-refresh',
      element: refreshButton,
    });

    return () => {
      unregisterAction('air-quality-refresh');
    };
  }, [isLoading, refresh, registerAction, unregisterAction, t]);

  if (error) {
    return (
      <div className="w-full text-white">
        <div className="text-center py-4">
          <p className="text-red-400 text-sm mb-2">{t('common.error') || 'Error'}</p>
          <p className="text-xs opacity-70">{error}</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full text-white">
        <div className="text-center py-4">
          <p className="text-sm opacity-70">{t('widgets.airQuality.loading') || 'Loading air quality...'}</p>
        </div>
      </div>
    );
  }

  if (selectedAirQuality) {
    return (
      <AirQualityDetailPanel
        airQuality={selectedAirQuality}
        onBack={handleBack}
        isExiting={isExiting}
      />
    );
  }

  return (
    <AirQualityListPanel
      citiesAirQuality={citiesAirQuality}
      onSelectCity={setSelectedAirQuality}
      onSearch={handleSearch}
      searchLoading={searchLoading}
    />
  );
}
