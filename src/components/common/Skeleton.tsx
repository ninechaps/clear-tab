interface SkeletonProps {
  className?: string
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-white/10 rounded ${className}`}
    />
  )
}

export function ClockSkeleton() {
  return (
    <div className="text-center">
      <Skeleton className="h-24 w-80 mx-auto mb-4" />
      <Skeleton className="h-6 w-64 mx-auto" />
    </div>
  )
}

export function SearchSkeleton() {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <Skeleton className="h-14 w-full rounded-full" />
    </div>
  )
}
