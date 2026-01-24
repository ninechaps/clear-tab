import { memo } from 'react';
import type { Tile } from '../types';
import { TILE_SIZE, TILE_GAP, getColorForValue } from '../constants';
import { cn } from '@/lib/utils';

interface GameTileProps {
  tile: Tile;
}

export const GameTile = memo(function GameTile({ tile }: GameTileProps) {
  const colors = getColorForValue(tile.value);
  const fontSize =
    tile.value >= 1000
      ? 'text-lg'
      : tile.value >= 100
        ? 'text-2xl'
        : 'text-2xl';

  return (
    <div
      className={cn(
        'absolute flex items-center justify-center rounded-lg font-bold shadow-md transition-all duration-150 ease-in-out',
        colors.bg,
        colors.text,
        tile.isNew && 'animate-scale-in',
        tile.isMerged && 'animate-pulse'
      )}
      style={{
        width: TILE_SIZE,
        height: TILE_SIZE,
        top: `${tile.row * (TILE_SIZE + TILE_GAP) + TILE_GAP}px`,
        left: `${tile.col * (TILE_SIZE + TILE_GAP) + TILE_GAP}px`,
      }}
    >
      <span className={fontSize}>{tile.value}</span>
    </div>
  );
});
