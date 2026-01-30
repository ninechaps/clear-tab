import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { RefreshCw, Wind } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWidgetHeader } from '@/components/common/useWidgetHeader';
import { useAirQuality } from '@/hooks/useAirQuality';

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

export function AirQuality() {
  const { t } = useTranslation();
  const { data, isLoading, error, refresh } = useAirQuality();
  const { registerAction, unregisterAction } = useWidgetHeader();

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

  if (data.length === 0) {
    return (
      <div className="w-full text-white">
        <div className="text-center py-4">
          <p className="text-sm opacity-70">{t('widgets.airQuality.noData') || 'No air quality data available'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden">
      {/* Air Quality List */}
      <div className="space-y-2">
        {data.map((item) => (
          <div
            key={item.city}
            className={`${getAQIBackground(item.aqi)} border border-white/10 rounded-lg p-3 transition-colors hover:bg-white/10`}
          >
            {/* City & AQI */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Wind className="w-4 h-4 text-white/60" />
                <div className="font-medium text-white">{item.city}</div>
              </div>
              <div className={`text-sm font-semibold ${getAQIColor(item.aqi)}`}>
                AQI: {item.aqi}
              </div>
            </div>

            {/* Level */}
            <div className="text-xs text-white/70 mb-2">
              {item.level}
            </div>

            {/* Pollutants */}
            <div className="grid grid-cols-2 gap-2 text-xs text-white/60">
              <div>PM2.5: {item.pm25.toFixed(1)}</div>
              <div>PM10: {item.pm10.toFixed(1)}</div>
              <div>O₃: {item.o3.toFixed(1)}</div>
              <div>NO₂: {item.no2.toFixed(1)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
