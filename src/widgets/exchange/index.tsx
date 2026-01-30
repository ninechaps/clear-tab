import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { RefreshCw, TrendingUp, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWidgetHeader } from '@/components/common/useWidgetHeader';
import { useExchangeRates } from '@/hooks/useExchangeRates';

export function ExchangeRates() {
  const { t } = useTranslation();
  const { rates, isLoading, error, refresh } = useExchangeRates();
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
      id: 'exchange-refresh',
      element: refreshButton,
    });

    return () => {
      unregisterAction('exchange-refresh');
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
          <p className="text-sm opacity-70">{t('widgets.exchange.loading') || 'Loading rates...'}</p>
        </div>
      </div>
    );
  }

  if (rates.length === 0) {
    return (
      <div className="w-full text-white">
        <div className="text-center py-4">
          <p className="text-sm opacity-70">{t('widgets.exchange.noData') || 'No rates available'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden">
      {/* Rates List */}
      <div className="space-y-2">
        {rates.map((rate) => (
          <div
            key={rate.pair}
            className="bg-white/5 hover:bg-white/10 transition-colors rounded-lg p-3 border border-white/10"
          >
            {/* Currency Pair */}
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium text-white">
                {rate.baseCurrency}/{rate.targetCurrency}
              </div>
              <div className="text-sm font-mono text-white">
                {rate.rate.toFixed(4)}
              </div>
            </div>

            {/* Change Info */}
            <div className="flex items-center gap-2">
              <div className={`flex items-center gap-1 text-xs ${
                rate.change >= 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {rate.change >= 0 ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                <span>{rate.change >= 0 ? '+' : ''}{rate.change.toFixed(4)}</span>
                <span>({rate.changePercent >= 0 ? '+' : ''}{rate.changePercent.toFixed(2)}%)</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
