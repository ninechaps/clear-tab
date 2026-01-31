import { useEffect, useState } from 'react';
import { getDuplicateWidgetIds } from '@/widgets/_registry';
import { X } from 'lucide-react';

export function DuplicateWidgetNotice() {
  const [duplicateIds, setDuplicateIds] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const ids = getDuplicateWidgetIds();
    if (ids.length > 0) {
      setDuplicateIds(ids);
      setIsVisible(true);
    }
  }, []);

  if (!isVisible || duplicateIds.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 max-w-md z-50 animate-in fade-in slide-in-from-top-2">
      <div className="bg-red-500/90 backdrop-blur-sm border border-red-400 rounded-lg p-4 flex items-start gap-3">
        <div className="flex-1 text-sm text-white">
          <div className="font-semibold">⚠️ Duplicate Widgets Detected</div>
          <div className="text-red-100 mt-1 text-xs">
            The following widget IDs appear multiple times and may not load correctly:
            <div className="mt-2 font-mono text-red-50">
              {duplicateIds.map((id) => (
                <div key={id}>• {id}</div>
              ))}
            </div>
          </div>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="flex-shrink-0 text-white hover:text-red-200 transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
