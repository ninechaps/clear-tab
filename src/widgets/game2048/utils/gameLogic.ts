import type { Tile, MoveResult, Direction } from '../types';
import { GRID_SIZE } from '../constants';

/**
 * 转置矩阵（用于上下移动）
 */
export function transpose<T>(matrix: T[][]): T[][] {
  const result: T[][] = Array(matrix.length)
    .fill(null)
    .map(() => Array(matrix.length));
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      result[j][i] = matrix[i][j];
    }
  }
  return result;
}

/**
 * 翻转行（用于实现右移）
 */
export function reverseRows<T>(matrix: T[][]): T[][] {
  return matrix.map((row) => [...row].reverse());
}

/**
 * 向左移动并合并
 */
export function moveLeft(board: (Tile | null)[][]): MoveResult {
  const newBoard = board.map(() => Array(GRID_SIZE).fill(null));
  let moved = false;
  let scoreGained = 0;
  const mergedTileIds = new Set<string>();
  let newTile: Tile | null = null;

  for (let row = 0; row < GRID_SIZE; row++) {
    // 提取非空方块
    const tiles = board[row].filter((tile): tile is Tile => tile !== null);

    if (tiles.length === 0) continue;

    let col = 0;
    for (let i = 0; i < tiles.length; i++) {
      const currentTile = tiles[i];
      const nextTile = tiles[i + 1];

      // 尝试合并
      if (
        nextTile &&
        currentTile.value === nextTile.value &&
        !mergedTileIds.has(currentTile.id) &&
        !mergedTileIds.has(nextTile.id)
      ) {
        const mergedValue = currentTile.value * 2;
        const mergedTile: Tile = {
          id: `tile-${Date.now()}-${Math.random()}`,
          value: mergedValue,
          row,
          col,
          isMerged: true,
          mergedFrom: [currentTile.id, nextTile.id],
        };
        newBoard[row][col] = mergedTile;
        scoreGained += mergedValue;
        mergedTileIds.add(currentTile.id);
        mergedTileIds.add(nextTile.id);
        i++; // 跳过已合并的下一个方块

        // 检测是否发生了移动（合并也是一种移动）
        if (currentTile.col !== col) {
          moved = true;
        }
      } else {
        const movedTile: Tile = { ...currentTile, row, col };
        newBoard[row][col] = movedTile;

        // 检测是否移动了
        if (currentTile.col !== col) {
          moved = true;
        }
      }
      col++;
    }
  }

  // 只有在有移动时才生成新方块
  if (moved) {
    newTile = addRandomTile(newBoard);
  }

  return { newBoard, moved, scoreGained, newTile };
}

/**
 * 向右移动
 */
export function moveRight(board: (Tile | null)[][]): MoveResult {
  const reversed = reverseRows(board);
  const result = moveLeft(reversed);
  const newBoard = reverseRows(result.newBoard);

  // 调整方块位置
  const adjustedBoard = newBoard.map((row) =>
    row.map((tile) => (tile ? { ...tile, col: GRID_SIZE - 1 - tile.col } : null))
  );

  return { ...result, newBoard: adjustedBoard };
}

/**
 * 向上移动
 */
export function moveUp(board: (Tile | null)[][]): MoveResult {
  const transposed = transpose(board);
  const result = moveLeft(transposed);
  const newBoard = transpose(result.newBoard);

  // 调整方块位置
  const adjustedBoard = newBoard.map((row) =>
    row.map((tile) => (tile ? { ...tile, row: tile.col, col: tile.row } : null))
  );

  return { ...result, newBoard: adjustedBoard };
}

/**
 * 向下移动
 */
export function moveDown(board: (Tile | null)[][]): MoveResult {
  const transposed = transpose(board);
  const result = moveRight(transposed);
  const newBoard = transpose(result.newBoard);

  // 调整方块位置
  const adjustedBoard = newBoard.map((row) =>
    row.map((tile) => (tile ? { ...tile, row: tile.col, col: tile.row } : null))
  );

  return { ...result, newBoard: adjustedBoard };
}

/**
 * 执行指定方向的移动
 */
export function moveTiles(
  board: (Tile | null)[][],
  direction: Direction
): MoveResult {
  switch (direction) {
    case 'left':
      return moveLeft(board);
    case 'right':
      return moveRight(board);
    case 'up':
      return moveUp(board);
    case 'down':
      return moveDown(board);
  }
}

/**
 * 添加随机方块
 * 90% 概率生成 2，10% 概率生成 4
 */
export function addRandomTile(board: (Tile | null)[][]): Tile | null {
  const emptyCells: { row: number; col: number }[] = [];

  board.forEach((row, r) => {
    row.forEach((cell, c) => {
      if (cell === null) {
        emptyCells.push({ row: r, col: c });
      }
    });
  });

  if (emptyCells.length === 0) return null;

  const { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  const value = Math.random() < 0.9 ? 2 : 4;

  const tile: Tile = {
    id: `tile-${Date.now()}-${Math.random()}`,
    value,
    row,
    col,
    isNew: true,
  };

  board[row][col] = tile;
  return tile;
}

/**
 * 检测游戏是否结束
 */
export function isGameOver(board: (Tile | null)[][]): boolean {
  // 检查是否有空位
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      if (board[row][col] === null) return false;
    }
  }

  // 检查是否有可合并的相邻方块
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      const current = board[row][col];
      if (!current) continue;

      // 检查右侧
      if (col < GRID_SIZE - 1 && board[row][col + 1]?.value === current.value) {
        return false;
      }
      // 检查下方
      if (row < GRID_SIZE - 1 && board[row + 1][col]?.value === current.value) {
        return false;
      }
    }
  }

  return true;
}

/**
 * 检测是否达到 2048
 */
export function hasWon(board: (Tile | null)[][]): boolean {
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      const tile = board[row][col];
      if (tile && tile.value === 2048) return true;
    }
  }
  return false;
}

/**
 * 从棋盘提取方块列表
 */
export function extractTiles(board: (Tile | null)[][]): Tile[] {
  const tiles: Tile[] = [];
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      const tile = board[row][col];
      if (tile) tiles.push(tile);
    }
  }
  return tiles;
}

/**
 * 初始化空棋盘
 */
export function initializeBoard(): (Tile | null)[][] {
  return Array(GRID_SIZE)
    .fill(null)
    .map(() => Array(GRID_SIZE).fill(null));
}

/**
 * 深拷贝棋盘
 */
export function cloneBoard(board: (Tile | null)[][]): (Tile | null)[][] {
  return board.map((row) =>
    row.map((tile) => (tile ? { ...tile } : null))
  );
}
