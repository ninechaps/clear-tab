import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid2x2, Image } from 'lucide-react';
import { useSettingsStore } from '@/store/useSettingsStore';
import { Background, BackgroundSelector, WidgetDrawer, FloatingWidgets, LanguageSwitcher } from '@/components/common';
import { ClockSkeleton, SearchSkeleton } from '@/components/common/Skeleton';
import { ProductiveLayout } from '@/components/layouts';
import { Button } from '@/components/ui/button';

export function HomePage() {
  const { isLoading } = useSettingsStore();
  const { t } = useTranslation();
  const [showBackgroundSelector, setShowBackgroundSelector] = useState(false);
  const [showWidgetDrawer, setShowWidgetDrawer] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-12 p-8">
        <Background />
        <ClockSkeleton />
        <SearchSkeleton />
      </div>
    );
  }

  return (
    <>
      <Background />
      <ProductiveLayout />

      {/* Floating draggable widgets */}
      <FloatingWidgets />

      {/* Bottom right button group */}
      <div className="fixed bottom-6 right-6 flex gap-3">
        {/* Language switcher */}
        <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <LanguageSwitcher />
        </div>

        {/* Widget button */}
        <Button
          onClick={() => setShowWidgetDrawer(true)}
          variant="ghost"
          className="p-3 bg-white/8 hover:bg-white/15 backdrop-blur-xl border border-white/10 hover:border-white/20 rounded-xl text-white/50 hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg animate-fade-in h-auto"
          style={{ animationDelay: '0.3s' }}
          title={t('common.widgets')}
        >
          <Grid2x2 className="w-5 h-5" />
        </Button>

        {/* Settings button */}
        <Button
          onClick={() => setShowBackgroundSelector(true)}
          variant="ghost"
          className="p-3 bg-white/8 hover:bg-white/15 backdrop-blur-xl border border-white/10 hover:border-white/20 rounded-xl text-white/50 hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg animate-fade-in h-auto group"
          style={{ animationDelay: '0.4s' }}
          title={t('common.settings')}
        >
          <Image className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
        </Button>
      </div>

      {/* Widget drawer */}
      {showWidgetDrawer && <WidgetDrawer onClose={() => setShowWidgetDrawer(false)} />}

      {/* Background selector modal */}
      {showBackgroundSelector && (
        <BackgroundSelector onClose={() => setShowBackgroundSelector(false)} />
      )}
    </>
  );
}
