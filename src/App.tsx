import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSettingsStore } from '@/store/useSettingsStore';
import { AppRoutes } from '@/routes';
import { ClockSkeleton, SearchSkeleton } from '@/components/common/Skeleton';
import { Background } from '@/components/common';

function App() {
  const { isLoading, loadSettings, language } = useSettingsStore();
  const { i18n } = useTranslation();

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  useEffect(() => {
    if (language && i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [language, i18n]);

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
