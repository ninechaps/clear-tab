/**
 * 2048 Game Types
 */

export interface Tile {
  id: string;
  value: number;
  row: number;
  col: number;
  isNew?: boolean;
  isMerged?: boolean;
  mergedFrom?: string[];
}

export type GameStatus = 'playing' | 'won' | 'lost';

export type Direction = 'up' | 'down' | 'left' | 'right';

export interface GameState {
  board: (Tile | null)[][];
  tiles: Tile[];
  score: number;
  bestScore: number;
  status: GameStatus;
  canUndo: boolean;
}

export interface MoveResult {
  newBoard: (Tile | null)[][];
  moved: boolean;
  scoreGained: number;
  newTile: Tile | null;
}
