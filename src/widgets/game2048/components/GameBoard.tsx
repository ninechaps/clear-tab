import React from 'react';
import type { Tile } from '../types';
import { GameGrid } from './GameGrid';
import { GameTile } from './GameTile';
import { GRID_SIZE, TILE_SIZE, TILE_GAP } from '../constants';

interface GameBoardProps {
  tiles: Tile[];
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchEnd: (e: React.TouchEvent) => void;
}

export function GameBoard({
  tiles,
  onTouchStart,
  onTouchEnd,
}: GameBoardProps) {
  const boardSize = GRID_SIZE * TILE_SIZE + (GRID_SIZE + 1) * TILE_GAP;

  return (
    <div
      className="relative glass rounded-xl select-none"
      style={{
        width: boardSize,
        height: boardSize,
      }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <GameGrid />
      <div className="absolute inset-0">
        {tiles.map((tile) => (
          <GameTile key={tile.id} tile={tile} />
        ))}
      </div>
    </div>
  );
}
