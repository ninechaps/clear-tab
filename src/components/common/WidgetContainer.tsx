import { useRef, useMemo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { ExternalLink, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getWidgetManifest } from '@/widgets/_registry';
import { WidgetHeaderContext, type HeaderAction } from './WidgetHeaderContext';
import type { Widget, WidgetType } from '@/types';

interface WidgetContainerProps {
  widget: Widget
  onClose: () => void
  children: React.ReactNode
  style?: React.CSSProperties
  onOpenDetail?: () => void
}

export function WidgetContainer({
  widget,
  onClose,
  children,
  style,
  onOpenDetail,
}: WidgetContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const [headerActions, setHeaderActions] = useState<HeaderAction[]>([]);
  const position = useMemo(
    () => widget.position || { x: 50, y: 50 },
    [widget.position]
  );

  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: 'widget',
      item: { id: widget.id, left: position.x, top: position.y },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [widget.id, position.x, position.y]
  );

  // 禁用默认的拖拽预览
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  drag(ref);

  const getWidgetName = () => {
    try {
      const name = t(`widgets.${widget.type}.name`);
      if (name && !name.startsWith('widgets.')) {
        return name;
      }
    } catch {
      // Fallback to manifest
    }
    const manifest = getWidgetManifest(widget.type as WidgetType);
    return manifest?.name || (widget.type.charAt(0).toUpperCase() + widget.type.slice(1));
  };

  const widgetName = getWidgetName();

  const headerContextValue = useMemo(() => ({
    registerAction: (action: HeaderAction) => {
      setHeaderActions((prev) => {
        const exists = prev.some((a) => a.id === action.id);
        if (exists) return prev;
        return [...prev, action];
      });
    },
    unregisterAction: (id: string) => {
      setHeaderActions((prev) => prev.filter((a) => a.id !== id));
    },
  }), []);

  return (
    <div
      ref={ref}
      className={`fixed bg-white/8 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden w-96 ${
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
        {/* Widget name */}
        <span className="text-sm font-medium text-white/80 flex-1">{widgetName}</span>

        {/* Custom header actions from widget */}
        <div className="flex gap-1">
          {headerActions.map((action) => (
            <div key={action.id}>{action.element}</div>
          ))}
        </div>

        {/* Open detail button */}
        {onOpenDetail && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onOpenDetail}
            className="p-1 h-auto text-white/40 hover:text-white/80 hover:bg-white/10"
            title="Open in new tab"
          >
            <ExternalLink className="w-4 h-4" />
          </Button>
        )}

        {/* Close button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="p-1 h-auto text-white/40 hover:text-white/80 hover:bg-white/10"
          title="Close widget"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Content */}
      <WidgetHeaderContext.Provider value={headerContextValue}>
        <div className="p-6">{children}</div>
      </WidgetHeaderContext.Provider>
    </div>
  );
}
