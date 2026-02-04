import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RefreshCw, TrendingDown, TrendingUp, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWidgetHeader } from '@/components/common/useWidgetHeader';
import { useStockIndices } from '@/hooks/useStockIndices';
import { useStockQuote } from '@/hooks/useStockQuote';

export function Stock() {
  const { t } = useTranslation();
  const { indices, isLoading, error, refresh } = useStockIndices();
  const { stock, isLoading: isSearching, error: searchError, searchStock, clearStock } = useStockQuote();
  const { registerAction, unregisterAction } = useWidgetHeader();
  const [searchInput, setSearchInput] = useState('');

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      searchStock(searchInput);
    }
  };

  const handleClearSearch = () => {
    setSearchInput('');
    clearStock();
  };

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

  return (
    <div className="w-full overflow-hidden space-y-4">
      {/* Search Input */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="flex-1 relative">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search stock symbol..."
            className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-white/40 placeholder:text-white/30"
          />
        </div>
      </form>

      {/* Search Result */}
      {stock && (
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="font-medium text-white">{stock.name}</div>
              <div className="text-xs text-white/50">{stock.symbol}</div>
            </div>
            <button
              onClick={handleClearSearch}
              className="text-white/50 hover:text-white transition-colors"
            >
              <X className="w-4 h-4"/>
            </button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-xs text-white/70">Current Price</div>
              <div className="text-sm font-mono text-white">
                {stock.currentPrice.toFixed(2)}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-white/70">Open</span>
                <span className="text-white/90 font-mono">{stock.openPrice.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/70">High</span>
                <span className="text-white/90 font-mono">{stock.highPrice.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/70">Low</span>
                <span className="text-white/90 font-mono">{stock.lowPrice.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/70">Prev Close</span>
                <span className="text-white/90 font-mono">{stock.previousClose.toFixed(2)}</span>
              </div>
            </div>

            <div className={`flex items-center gap-2 text-sm font-medium ${
              stock.change >= 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {stock.change >= 0 ? (
                <TrendingUp className="w-4 h-4"/>
              ) : (
                <TrendingDown className="w-4 h-4"/>
              )}
              <span>{stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}</span>
              <span>({stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)</span>
            </div>
          </div>
        </div>
      )}

      {searchError && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
          <p className="text-red-400 text-sm">{searchError}</p>
        </div>
      )}

      {isSearching && (
        <div className="text-center py-2">
          <p className="text-sm opacity-70">Searching...</p>
        </div>
      )}

      {/* Common Indices List */}
      <div>
        <div className="text-xs text-white/60 font-semibold uppercase mb-2 px-1">
                    Market Indices
        </div>
        <div className="space-y-2">
          {indices.length > 0 ? (
            indices.map((index) => (
              <div
                key={index.symbol}
                className="bg-white/5 hover:bg-white/10 transition-colors rounded-lg p-3 border border-white/10"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex flex-col">
                    <div className="font-medium text-white text-sm">{index.name}</div>
                    <div className="text-xs text-white/50">{index.symbol}</div>
                  </div>
                  <div className="text-sm font-mono text-white">
                    {index.currentPrice.toFixed(2)}
                  </div>
                </div>

                <div className={`flex items-center gap-2 text-xs ${
                  index.change >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {index.change >= 0 ? (
                    <TrendingUp className="w-3 h-3"/>
                  ) : (
                    <TrendingDown className="w-3 h-3"/>
                  )}
                  <span>{index.change >= 0 ? '+' : ''}{index.change.toFixed(2)}</span>
                  <span>({index.changePercent >= 0 ? '+' : ''}{index.changePercent.toFixed(2)}%)</span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4">
              <p className="text-sm opacity-70">{t('widgets.stock.noData') || 'No indices available'}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
