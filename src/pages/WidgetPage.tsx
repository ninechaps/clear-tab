import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getWidgetComponent, getWidgetManifest } from '@/widgets/_registry';
import { Background } from '@/components/common';
import { Button } from '@/components/ui/button';
import { NotFoundPage } from './NotFoundPage';

interface WidgetPageProps {
  widgetId: string
}

export function WidgetPage({ widgetId }: WidgetPageProps) {
  const Component = getWidgetComponent(widgetId);
  const manifest = getWidgetManifest(widgetId);
  const { t } = useTranslation();

  if (!Component || !manifest) {
    return <NotFoundPage />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Background />

      {/* 顶部导航栏 */}
      <header className="fixed top-0 left-0 right-0 z-50 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button
                variant="ghost"
                className="p-3 bg-white/8 hover:bg-white/15 backdrop-blur-xl border border-white/10 hover:border-white/20 rounded-lg text-white/70 hover:text-white transition-all duration-300"
              >
                {t('common.back')}
              </Button>
            </Link>
            <h1 className="text-2xl font-semibold text-white">
              {manifest.icon} {manifest.name}
            </h1>
          </div>
        </div>
      </header>

      {/* 小部件内容区 */}
      <main className="flex-1 flex items-center justify-center p-8 pt-24 pb-12">
        <Component />
      </main>
    </div>
  );
}
