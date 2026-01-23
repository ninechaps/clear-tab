import { useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWidgetHeader } from '@/components/common/useWidgetHeader';
import { useQuote } from '@/hooks/useQuote';

/**
 * Quote Widget Component
 *
 * Displays inspirational quotes fetched from Quotable API
 * with fallback to local quotes if API fails.
 *
 * Data logic is handled by useQuote hook
 * This component only handles UI rendering and header integration
 */
export function Quote() {
  const { quote, isRefreshing, refresh } = useQuote();
  const { registerAction, unregisterAction } = useWidgetHeader();

  // Register refresh button in widget header
  useEffect(() => {
    const refreshButton = (
      <Button
        onClick={refresh}
        disabled={isRefreshing}
        variant="ghost"
        size="sm"
        className="p-1 text-white/40 hover:text-white/80 hover:bg-white/10 transition-all duration-300 disabled:opacity-50 h-auto"
        title="Refresh quote"
      >
        <RefreshCw
          className={`w-4 h-4 transition-transform duration-300 ${isRefreshing ? 'animate-spin' : ''}`}
        />
      </Button>
    );

    registerAction({
      id: 'quote-refresh',
      element: refreshButton,
    });

    return () => {
      unregisterAction('quote-refresh');
    };
  }, [isRefreshing, refresh, registerAction, unregisterAction]);

  if (!quote) {
    return (
      <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 max-w-md">
        <p className="text-white/60 text-center">Loading quote...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 max-w-md">
        <div className="mb-6">
          <p className="text-lg font-light italic text-white/90 leading-relaxed">
            "{quote.text}"
          </p>
        </div>
        <p className="text-sm text-white/60 text-right">— {quote.author}</p>
      </div>
    </div>
  );
}
