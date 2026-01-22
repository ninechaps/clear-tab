import { useEffect } from 'react'
import { useSettingsStore } from '@/store/useSettingsStore'
import { AppRoutes } from '@/routes'
import { ClockSkeleton, SearchSkeleton } from '@/components/common/Skeleton'
import { Background } from '@/components/common'

function App() {
  const { isLoading, loadSettings } = useSettingsStore()

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

  return <AppRoutes />
}

export default App
