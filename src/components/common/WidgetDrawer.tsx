import { useEffect, useCallback } from 'react'
import { ExternalLink, X } from 'lucide-react'
import { useSettingsStore } from '@/store/useSettingsStore'
import { useI18n } from '@/i18n/useI18n'
import { Button } from '@/components/ui/button'
import { buttonPresets, cssClasses } from '@/theme'
import { getWidgetManifest } from '@/widgets/_registry'
import type { Widget, WidgetType } from '@/types'

interface WidgetDrawerProps {
  onClose: () => void
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

function getLocalizedWidgetInfo(
  widgetType: WidgetType,
  t: {
    widgets?: {
      [key: string]: {
        name?: string
        description?: string
      }
    }
  }
) {
  // Try to get from translations first
  if (t.widgets?.[widgetType]?.name) {
    return {
      name: t.widgets[widgetType].name || widgetType,
      description: t.widgets[widgetType].description || '',
    }
  }
  // Fallback to manifest
  const manifest = getWidgetManifest(widgetType)
  return {
    name: manifest?.name || widgetType,
    description: manifest?.description || '',
  }
}

export function WidgetDrawer({ onClose }: WidgetDrawerProps) {
  const { widgets, toggleWidget, updateWidgetPosition } = useSettingsStore()
  const { t } = useI18n()

  const handleOpenDetail = useCallback(
    (widgetType: string) => {
      const baseUrl = window.location.href.split('#')[0]
      const detailUrl = `${baseUrl}#/widget/${widgetType}`
      window.open(detailUrl, '_blank')
    },
    []
  )

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
        className={`${cssClasses.modal.backdrop} animate-fade-in`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div className={cssClasses.modal.drawer}>
        {/* Header */}
        <div className={`${cssClasses.divider.primary} px-6 py-4 flex items-center justify-between`}>
          <h2 className="text-lg font-semibold text-white">{t.widgets.title}</h2>
          <Button
            onClick={onClose}
            {...buttonPresets.close}
            title={t.widgets.close}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          {/* Pinned section */}
          {pinnedWidgets.length > 0 && (
            <div className={`px-6 py-4 ${cssClasses.divider.secondary}`}>
              <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wide mb-3">
                📌 {t.widgets.pinned}
              </h3>
              <div className="space-y-2">
                {pinnedWidgets.map((widget) => {
                  const { name, description } = getLocalizedWidgetInfo(widget.type, t)
                  return (
                    <div
                      key={widget.id}
                      className="flex items-center justify-between gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                    >
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white/90">
                          {name}
                        </p>
                        <p className="text-xs text-white/50">{description}</p>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleOpenDetail(widget.type)}
                          className="p-1.5 h-auto text-white/40 hover:text-white/80 hover:bg-white/10"
                          title={t.widgets.openInNewTab}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={() => handleUnpin(widget.id)}
                          {...buttonPresets.action}
                        >
                          {t.widgets.unpin}
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Available section */}
          {availableWidgets.length > 0 && (
            <div className="px-6 py-4">
              <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wide mb-3">
                📦 {t.widgets.available}
              </h3>
              <div className="space-y-2">
                {availableWidgets.map((widget) => {
                  const { name, description } = getLocalizedWidgetInfo(widget.type, t)
                  return (
                    <div
                      key={widget.id}
                      className="flex items-center justify-between gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                    >
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white/90">
                          {name}
                        </p>
                        <p className="text-xs text-white/50">{description}</p>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleOpenDetail(widget.type)}
                          className="p-1.5 h-auto text-white/40 hover:text-white/80 hover:bg-white/10"
                          title={t.widgets.openInNewTab}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={() => handlePin(widget.id)}
                          {...buttonPresets.action}
                        >
                          {t.widgets.pin}
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Empty state */}
          {pinnedWidgets.length === 0 && availableWidgets.length === 0 && (
            <div className="px-6 py-8 text-center text-white/40">
              <p className="text-sm">{t.widgets.noWidgets}</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
