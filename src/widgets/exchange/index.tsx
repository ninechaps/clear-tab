import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWidgetHeader } from '@/components/common/useWidgetHeader';
import { useExchangeRates } from '@/hooks/useExchangeRates';

// Default currency pairs to display (XXX to USD)
const DEFAULT_PAIRS = ['CNY', 'JPY', 'KRW', 'RUB'];

// Common currencies to display in the list (XXX to USD)
const COMMON_CURRENCIES = ['EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CNY', 'INR', 'KRW', 'RUB', 'MXN'];

export function Exchange() {
  const { t } = useTranslation();
  const { rates, isLoading, error, refresh } = useExchangeRates();
  const { registerAction, unregisterAction } = useWidgetHeader();

  // Custom converter state
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('CNY');
  const [fromAmount, setFromAmount] = useState('1');
  const [toAmount, setToAmount] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setLastEditedField] = useState<'from' | 'to'>('from');

  // Get all available currencies
  const allCurrencies = Array.from(new Set(
    rates.flatMap(r => [r.baseCurrency, r.targetCurrency])
  )).sort();

  // Helper function to get exchange rate
  const getRate = useCallback((from: string, to: string): number | null => {
    // Direct rate
    const directRate = rates.find(r => r.baseCurrency === from && r.targetCurrency === to);
    if (directRate) return directRate.rate;

    // Reverse rate
    const reverseRate = rates.find(r => r.baseCurrency === to && r.targetCurrency === from);
    if (reverseRate) return 1 / reverseRate.rate;

    // Through USD
    const toUSD = rates.find(r => r.baseCurrency === from && r.targetCurrency === 'USD');
    const fromUSD = rates.find(r => r.baseCurrency === 'USD' && r.targetCurrency === to);
    if (toUSD && fromUSD) return toUSD.rate * fromUSD.rate;

    return null;
  }, [rates]);

  // Handle from amount change
  const handleFromAmountChange = useCallback((value: string) => {
    setFromAmount(value);
    setLastEditedField('from');

    const amount = parseFloat(value);
    if (isNaN(amount) || amount < 0) {
      setToAmount('');
      return;
    }

    const rate = getRate(fromCurrency, toCurrency);
    if (rate) {
      setToAmount((amount * rate).toFixed(4));
    }
  }, [fromCurrency, toCurrency, getRate]);

  // Handle to amount change
  const handleToAmountChange = useCallback((value: string) => {
    setToAmount(value);
    setLastEditedField('to');

    const amount = parseFloat(value);
    if (isNaN(amount) || amount < 0) {
      setFromAmount('');
      return;
    }

    const rate = getRate(fromCurrency, toCurrency);
    if (rate) {
      setFromAmount((amount / rate).toFixed(4));
    }
  }, [fromCurrency, toCurrency, getRate]);

  // Reset conversion when currencies change
  useEffect(() => {
    setLastEditedField('from');
    const amount = parseFloat(fromAmount);
    if (isNaN(amount) || amount < 0) {
      setToAmount('');
      return;
    }

    const rate = getRate(fromCurrency, toCurrency);
    if (rate) {
      setToAmount((amount * rate).toFixed(4));
    }
  }, [fromCurrency, toCurrency, getRate, fromAmount]);

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

  // Filter default pairs
  const defaultRates = rates.filter(rate =>
    DEFAULT_PAIRS.includes(rate.baseCurrency) && rate.targetCurrency === 'USD'
  );

  return (
    <div className="w-full overflow-hidden space-y-4">
      {/* Default Rates List */}
      <div className="space-y-2">
        {defaultRates.map((rate) => (
          <div
            key={`${rate.baseCurrency}-${rate.targetCurrency}`}
            className="bg-white/5 hover:bg-white/10 transition-colors rounded-lg p-3 border border-white/10"
          >
            <div className="flex items-center justify-between">
              <div className="font-medium text-white text-sm">
                {rate.baseCurrency}/{rate.targetCurrency}
              </div>
              <div className="text-sm font-mono text-white">
                {rate.rate.toFixed(4)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Custom Converter */}
      <div className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-3">
        <div className="text-xs text-white/60 font-semibold uppercase">Custom Converter</div>

        {/* From Currency */}
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={fromAmount}
            onChange={(e) => handleFromAmountChange(e.target.value)}
            placeholder="0"
            className="flex-1 bg-white/10 border border-white/20 rounded px-2 py-1.5 text-white text-sm focus:outline-none focus:border-white/40 placeholder:text-white/30"
          />
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="bg-white/10 border border-white/20 rounded px-2 py-1.5 text-white text-sm focus:outline-none focus:border-white/40 cursor-pointer"
          >
            {allCurrencies.map((curr) => (
              <option key={curr} value={curr} className="bg-gray-900">
                {curr}
              </option>
            ))}
          </select>
        </div>

        {/* To Currency */}
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={toAmount}
            onChange={(e) => handleToAmountChange(e.target.value)}
            placeholder="0.0000"
            className="flex-1 bg-white/10 border border-white/20 rounded px-2 py-1.5 text-white text-sm focus:outline-none focus:border-white/40 placeholder:text-white/30"
          />
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="bg-white/10 border border-white/20 rounded px-2 py-1.5 text-white text-sm focus:outline-none focus:border-white/40 cursor-pointer"
          >
            {allCurrencies.map((curr) => (
              <option key={curr} value={curr} className="bg-gray-900">
                {curr}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Common Currencies List */}
      <div className="bg-white/8 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden">
        <div className="max-h-64 overflow-y-scroll scrollbar-thin pr-2 -mr-2">
          {COMMON_CURRENCIES.map((currency, index) => {
            const rate = rates.find(r => r.baseCurrency === 'USD' && r.targetCurrency === currency);
            if (!rate) return null;

            const isSelected = (fromCurrency === 'USD' && toCurrency === currency) ||
                            (fromCurrency === currency && toCurrency === 'USD');

            return (
              <button
                key={currency}
                onClick={() => {
                  setFromCurrency('USD');
                  setToCurrency(currency);
                  setFromAmount('1');
                  setLastEditedField('from');
                  const rate = rates.find(r => r.baseCurrency === 'USD' && r.targetCurrency === currency);
                  if (rate) {
                    setToAmount((1 * rate.rate).toFixed(4));
                  }
                }}
                className={`w-full grid grid-cols-3 gap-4 px-4 py-3 transition-colors text-white text-sm ${
                  isSelected ? 'bg-white/15 border-l-2 border-l-blue-400' : 'hover:bg-white/15 border-l-2 border-l-transparent'
                } ${index !== COMMON_CURRENCIES.length - 1 ? 'border-b border-white/10' : ''}`}
              >
                {/* Currency Code */}
                <div className="text-left font-medium">
                  {currency}
                </div>

                {/* Currency Pair */}
                <div className="text-center text-xs opacity-80">
                  {currency}/USD
                </div>

                {/* Exchange Rate */}
                <div className="text-right text-xs font-mono opacity-90">
                  {rate.rate.toFixed(4)}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
