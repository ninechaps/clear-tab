import type { WidgetManifest } from '@/widgets/_registry';

export const game2048Manifest: WidgetManifest = {
  id: 'game2048',
  name: '2048 Game',
  description: 'Classic 2048 puzzle game',
  enabled: false,
  category: 'game',
  icon: '🎮',
  version: '1.0.0',
  features: {
    draggable: true,
    closeable: true,
    resizable: false,
  },
};
