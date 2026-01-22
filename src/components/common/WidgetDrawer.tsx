import { useEffect } from 'react'
import { useSettingsStore } from '@/store/useSettingsStore'
import { Button } from '@/components/ui/button'
import type { WidgetType, Widget } from '@/types'

interface WidgetDrawerProps {
  onClose: () => void
}

const widgetNames: Record<WidgetType, string> = {
  clock: 'Clock',
  search: 'Search',
  weather: 'Weather',
  quote: 'Quote',
  countdown: 'Countdown',
}

const widgetDescriptions: Record<WidgetType, string> = {
  clock: 'Display current time',
  search: 'Quick search bar',
  weather: 'Weather information',
  quote: 'Inspirational quotes',
  countdown: 'End of year countdown',
}

function getNextAvailablePosition(widgets: Widget[]): { x: number; y: number } {
  const positions = [
    { x: 50, y: 30 },
    { x: 30, y: 50 },
    { x: 70, y: 50 },
    { x: 50, y: 70 },
    { x: 30, y: 30 },
    { x: 70, y: 30 },
    { x: 30, y: 70 },
    { x: 70, y: 70 },
  ]

  const occupied = widgets
    .filter((w) => w.enabled && w.position && w.type !== 'clock' && w.type !== 'search')
    .map((w) => w.position!)

  const available = positions.find((pos) => {
    return !occupied.some((occ) => Math.abs(occ.x - pos.x) < 15 && Math.abs(occ.y - pos.y) < 15)
  })

  return available || { x: 50, y: 50 }
}

export function WidgetDrawer({ onClose }: WidgetDrawerProps) {
  const { widgets, toggleWidget, updateWidgetPosition } = useSettingsStore()

  // Filter out clock and search widgets
  const draggableWidgets = widgets.filter((w) => w.type !== 'clock' && w.type !== 'search')

  const pinnedWidgets = draggableWidgets.filter((w) => w.enabled)
  const availableWidgets = draggableWidgets.filter((w) => !w.enabled)

  const handlePin = (widgetId: string) => {
    const widget = widgets.find((w) => w.id === widgetId)
    if (!widget) return

    const newPosition = getNextAvailablePosition(widgets)
    updateWidgetPosition(widgetId, newPosition)
    toggleWidget(widgetId)
  }

  const handleUnpin = (widgetId: string) => {
    toggleWidget(widgetId)
  }

  useEffect(() => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = `${scrollbarWidth}px`

    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [])

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fade-in"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-screen w-96 bg-slate-900/95 backdrop-blur-2xl border-l border-white/10 z-50 flex flex-col overflow-hidden animate-slide-in-right">
        {/* Header */}
        <div className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Widgets</h2>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="p-1 h-auto text-white/60 hover:text-white"
            title="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </Button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          {/* Pinned section */}
          {pinnedWidgets.length > 0 && (
            <div className="px-6 py-4 border-b border-white/5">
              <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wide mb-3">
                📌 Pinned
              </h3>
              <div className="space-y-2">
                {pinnedWidgets.map((widget) => (
                  <div
                    key={widget.id}
                    className="flex items-center justify-between gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white/90">
                        {widgetNames[widget.type]}
                      </p>
                      <p className="text-xs text-white/50">{widgetDescriptions[widget.type]}</p>
                    </div>
                    <Button
                      onClick={() => handleUnpin(widget.id)}
                      variant="ghost"
                      size="sm"
                      className="text-xs text-white/60 hover:text-white"
                    >
                      ✓
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Available section */}
          {availableWidgets.length > 0 && (
            <div className="px-6 py-4">
              <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wide mb-3">
                📦 Available
              </h3>
              <div className="space-y-2">
                {availableWidgets.map((widget) => (
                  <div
                    key={widget.id}
                    className="flex items-center justify-between gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white/90">
                        {widgetNames[widget.type]}
                      </p>
                      <p className="text-xs text-white/50">{widgetDescriptions[widget.type]}</p>
                    </div>
                    <Button
                      onClick={() => handlePin(widget.id)}
                      variant="ghost"
                      size="sm"
                      className="text-xs text-white/60 hover:text-white"
                    >
                      Pin
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty state */}
          {pinnedWidgets.length === 0 && availableWidgets.length === 0 && (
            <div className="px-6 py-8 text-center text-white/40">
              <p className="text-sm">No widgets available</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
