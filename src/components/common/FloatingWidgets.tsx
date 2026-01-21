import { useCallback, useRef } from 'react'
import { DndProvider, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useSettingsStore } from '@/store/useSettingsStore'
import { Weather, Quote, Countdown } from '@/components/widgets'
import { WidgetContainer } from './WidgetContainer'
import type { Widget } from '@/types'

interface DragItem {
  id: string
  left: number
  top: number
}

function FloatingWidgetsContent() {
  const { widgets, toggleWidget, updateWidgetPosition } = useSettingsStore()
  const containerRef = useRef<HTMLDivElement>(null)

  const draggableWidgets = widgets.filter((w) => w.enabled && w.position)

  const moveWidget = useCallback(
    (id: string, left: number, top: number) => {
      updateWidgetPosition(id, { x: left, y: top })
    },
    [updateWidgetPosition]
  )

  const [, drop] = useDrop(
    () => ({
      accept: 'widget',
      hover(item: DragItem, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset()
        if (!delta) return

        const left = item.left + (delta.x / window.innerWidth) * 100
        const top = item.top + (delta.y / window.innerHeight) * 100

        const finalLeft = Math.max(5, Math.min(95, left))
        const finalTop = Math.max(5, Math.min(95, top))

        moveWidget(item.id, finalLeft, finalTop)
      },
    }),
    [moveWidget]
  )

  drop(containerRef)

  const renderWidget = (widget: Widget) => {
    switch (widget.type) {
      case 'weather':
        return <Weather />
      case 'quote':
        return <Quote />
      case 'countdown':
        return <Countdown />
      default:
        return null
    }
  }

  if (draggableWidgets.length === 0) {
    return null
  }

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-40">
      {draggableWidgets.map((widget, index) => (
        <div key={widget.id} className="pointer-events-auto">
          <WidgetContainer
            widget={widget}
            style={{
              animationDelay: `${index * 0.1}s`,
            }}
            onClose={() => toggleWidget(widget.id)}
          >
            {renderWidget(widget)}
          </WidgetContainer>
        </div>
      ))}
    </div>
  )
}

export function FloatingWidgets() {
  return (
    <DndProvider backend={HTML5Backend}>
      <FloatingWidgetsContent />
    </DndProvider>
  )
}
