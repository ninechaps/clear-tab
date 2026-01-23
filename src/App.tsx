import { useEffect } from 'react';
import { useSettingsStore } from '@/store/useSettingsStore';
import { AppRoutes } from '@/routes';
import { ClockSkeleton, SearchSkeleton } from '@/components/common/Skeleton';
import { Background } from '@/components/common';

function App() {
  const { isLoading, loadSettings, language } = useSettingsStore();

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  useEffect(() => {
    if (language) {
      // i18n will be synced through the config's languageChanged event listener
      // This just ensures Zustand state is properly initialized
    }
  }, [language]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-12 p-8">
        <Background />
        <ClockSkeleton />
        <SearchSkeleton />
      </div>
    );
  }

  return <AppRoutes />;
}

export default App;
