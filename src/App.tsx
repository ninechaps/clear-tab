import { useEffect, useState } from 'react'
import { useSettingsStore } from '@/store/useSettingsStore'
import { Background, BackgroundSelector, WidgetDrawer, FloatingWidgets } from '@/components/common'
import { ClockSkeleton, SearchSkeleton } from '@/components/common/Skeleton'
import { ProductiveLayout } from '@/components/layouts'
import { useI18n } from '@/i18n'
import { Button } from '@/components/ui/button'

function App() {
  const { isLoading, loadSettings } = useSettingsStore()
  const [showBackgroundSelector, setShowBackgroundSelector] = useState(false)
  const [showWidgetDrawer, setShowWidgetDrawer] = useState(false)
  const { t } = useI18n()

  useEffect(() => {
    loadSettings()
  }, [loadSettings])

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-12 p-8">
        <Background />
        <ClockSkeleton />
        <SearchSkeleton />
      </div>
    )
  }

  return (
    <>
      <Background />
      <ProductiveLayout />

      {/* Floating draggable widgets */}
      <FloatingWidgets />

      {/* Bottom right button group */}
      <div className="fixed bottom-6 right-6 flex gap-3">
        {/* Widget button */}
        <Button
          onClick={() => setShowWidgetDrawer(true)}
          variant="ghost"
          className="p-3 bg-white/8 hover:bg-white/15 backdrop-blur-xl border border-white/10 hover:border-white/20 rounded-xl text-white/50 hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg animate-fade-in h-auto"
          style={{ animationDelay: '0.3s' }}
          title="Widgets"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
            />
          </svg>
        </Button>

        {/* Settings button */}
        <Button
          onClick={() => setShowBackgroundSelector(true)}
          variant="ghost"
          className="p-3 bg-white/8 hover:bg-white/15 backdrop-blur-xl border border-white/10 hover:border-white/20 rounded-xl text-white/50 hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg animate-fade-in h-auto group"
          style={{ animationDelay: '0.4s' }}
          title={t.settings.changeBackground}
        >
          <svg className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </Button>
      </div>

      {/* Widget drawer */}
      {showWidgetDrawer && <WidgetDrawer onClose={() => setShowWidgetDrawer(false)} />}

      {/* Background selector modal */}
      {showBackgroundSelector && (
        <BackgroundSelector onClose={() => setShowBackgroundSelector(false)} />
      )}
    </>
  )
}

export default App
