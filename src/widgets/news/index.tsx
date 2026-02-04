import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { RefreshCw, ExternalLink, Calendar, Newspaper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWidgetHeader } from '@/components/common/useWidgetHeader';
import { useNews } from '@/hooks/useNews';

export function News() {
  const { t } = useTranslation();
  const { articles, isLoading, error, refresh } = useNews();
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
      id: 'news-refresh',
      element: refreshButton,
    });

    return () => {
      unregisterAction('news-refresh');
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
          <p className="text-sm opacity-70">{t('widgets.news.loading') || 'Loading news...'}</p>
        </div>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="w-full text-white">
        <div className="text-center py-4">
          <p className="text-sm opacity-70">{t('widgets.news.noData') || 'No news available'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden">
      {/* News List with Scrollbar */}
      <div className="max-h-96 overflow-y-auto space-y-2 pr-2 -mr-2 scrollbar-thin">
        {articles.map((article, index) => (
          <a
            key={`${article.source}-${index}`}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <div className="bg-white/5 hover:bg-white/10 transition-colors rounded-lg p-3 border border-white/10 cursor-pointer">
              {/* Title */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="text-sm font-medium text-white group-hover:text-blue-300 flex-1 line-clamp-2 transition-colors">
                  {article.title}
                </h3>
                <ExternalLink className="w-3.5 h-3.5 text-white/50 group-hover:text-white/80 flex-shrink-0 mt-0.5 transition-colors" />
              </div>

              {/* Description */}
              <p className="text-xs text-white/60 mb-2 line-clamp-2">
                {article.description}
              </p>

              {/* Meta Info */}
              <div className="flex items-center gap-2 text-xs text-white/50">
                <div className="flex items-center gap-1">
                  <Newspaper className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">{article.source}</span>
                </div>
                <span className="text-white/30">•</span>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 flex-shrink-0" />
                  <span className="whitespace-nowrap">
                    {new Date(article.publishedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
