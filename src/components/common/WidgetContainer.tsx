import { useRef, useMemo, useEffect } from 'react'
import { useDrag } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'
import type { Widget } from '@/types'

interface WidgetContainerProps {
  widget: Widget
  onClose: () => void
  children: React.ReactNode
  style?: React.CSSProperties
}

export function WidgetContainer({
  widget,
  onClose,
  children,
  style,
}: WidgetContainerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const position = useMemo(
    () => widget.position || { x: 50, y: 50 },
    [widget.position]
  )

  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: 'widget',
      item: { id: widget.id, left: position.x, top: position.y },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [widget.id, position.x, position.y]
  )

  // 禁用默认的拖拽预览
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true })
  }, [preview])

  drag(ref)

  const widgetName =
    widget.type.charAt(0).toUpperCase() + widget.type.slice(1)

  return (
    <div
      ref={ref}
      className={`fixed bg-white/8 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden ${
        isDragging ? 'scale-105 shadow-2xl cursor-grabbing opacity-80' : 'cursor-grab transition-all duration-300'
      }`}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)',
        ...style,
      }}
    >
      {/* Header */}
      <div
        className="border-b border-white/10 px-4 py-3 flex items-center justify-between gap-3 cursor-grab active:cursor-grabbing hover:bg-white/5 transition-colors"
      >
        {/* Drag handle */}
        <div className="flex items-center gap-1">
          <div className="w-1 h-1 rounded-full bg-white/40" />
          <div className="w-1 h-1 rounded-full bg-white/40" />
          <div className="w-1 h-1 rounded-full bg-white/40" />
        </div>

        {/* Widget name */}
        <span className="text-sm font-medium text-white/80 flex-1">{widgetName}</span>

        {/* Close button */}
        <button
          onClick={onClose}
          className="p-1 text-white/40 hover:text-white/80 transition-colors rounded hover:bg-white/10"
          title="Close widget"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="p-6">{children}</div>
    </div>
  )
}
