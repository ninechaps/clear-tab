import { Clock, Search, QuickLinks } from '@/components/widgets'

export function ProductiveLayout() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 p-6 md:p-8">
      {/* Clock section with entrance animation */}
      <div className="animate-fade-in-down">
        <Clock />
      </div>

      {/* Main content area */}
      <div className="flex flex-col items-center gap-6 w-full max-w-2xl">
        {/* Search bar with scale animation */}
        <div className="animate-scale-in stagger-1 w-full">
          <Search />
        </div>

        {/* Quick links with staggered fade */}
        <div className="animate-fade-in-up stagger-2">
          <QuickLinks />
        </div>
      </div>
    </div>
  )
}
