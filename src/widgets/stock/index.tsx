import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { RefreshCw, TrendingUp, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWidgetHeader } from '@/components/common/useWidgetHeader';
import { useStockIndices } from '@/hooks/useStockIndices';

export function StockIndex() {
  const { t } = useTranslation();
  const { indices, isLoading, error, refresh } = useStockIndices();
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
      id: 'stock-refresh',
      element: refreshButton,
    });

    return () => {
      unregisterAction('stock-refresh');
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
          <p className="text-sm opacity-70">{t('widgets.stock.loading') || 'Loading indices...'}</p>
        </div>
      </div>
    );
  }

  if (indices.length === 0) {
    return (
      <div className="w-full text-white">
        <div className="text-center py-4">
          <p className="text-sm opacity-70">{t('widgets.stock.noData') || 'No indices available'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden">
      {/* Indices List */}
      <div className="space-y-2">
        {indices.map((index) => (
          <div
            key={index.symbol}
            className="bg-white/5 hover:bg-white/10 transition-colors rounded-lg p-3 border border-white/10"
          >
            {/* Index Name */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex flex-col">
                <div className="font-medium text-white">{index.name}</div>
                <div className="text-xs text-white/50">{index.symbol}</div>
              </div>
              <div className="text-sm font-mono text-white">
                {index.value.toFixed(2)}
              </div>
            </div>

            {/* Change Info */}
            <div className={`flex items-center gap-2 text-xs ${
              index.change >= 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {index.change >= 0 ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              <span>{index.change >= 0 ? '+' : ''}{index.change.toFixed(2)}</span>
              <span>({index.changePercent >= 0 ? '+' : ''}{index.changePercent.toFixed(2)}%)</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
