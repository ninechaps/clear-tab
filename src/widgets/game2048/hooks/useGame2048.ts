import { useEffect, useRef, useState, useCallback } from 'react';
import type { GameState, Direction, Tile } from '../types';
import {
  initializeBoard,
  addRandomTile,
  moveTiles,
  isGameOver,
  hasWon,
  extractTiles,
  cloneBoard,
} from '../utils/gameLogic';
import { BEST_SCORE_KEY, TOUCH_THRESHOLD } from '../constants';

function loadBestScore(): number {
  try {
    const stored = localStorage.getItem(BEST_SCORE_KEY);
    return stored ? parseInt(stored, 10) : 0;
  } catch {
    return 0;
  }
}

function saveBestScore(score: number): void {
  try {
    localStorage.setItem(BEST_SCORE_KEY, score.toString());
  } catch {
    // 忽略存储错误
  }
}

export function useGame2048() {
  const initializeGame = useCallback((): GameState => {
    const board = initializeBoard();
    const tile1 = addRandomTile(board);
    const tile2 = addRandomTile(board);

    const tiles = [tile1, tile2].filter((tile): tile is Tile => tile !== null);

    return {
      board,
      tiles,
      score: 0,
      bestScore: loadBestScore(),
      status: 'playing',
      canUndo: false,
    };
  }, []);

  const [gameState, setGameState] = useState<GameState>(initializeGame);
  const [history, setHistory] = useState<GameState[]>([]);
  const touchStartRef = useRef({ x: 0, y: 0 });

  // 移动方块
  const move = useCallback(
    (direction: Direction) => {
      setGameState((currentState) => {
        if (currentState.status !== 'playing') return currentState;

        // 保存当前状态到历史（最多保留 5 步）
        setHistory((prev) => [...prev.slice(-4), currentState]);

        // 执行移动
        const { newBoard, moved, scoreGained } = moveTiles(
          cloneBoard(currentState.board),
          direction
        );

        if (!moved) return currentState; // 无移动则不更新

        // 清除新方块的动画标志，为合并方块清除标志（下一帧）
        const nextBoard = cloneBoard(newBoard);
        setTimeout(() => {
          setGameState((current) => {
            const clearedTiles = current.tiles.map((tile) => ({
              ...tile,
              isNew: false,
              isMerged: false,
            }));

            return {
              ...current,
              tiles: clearedTiles,
            };
          });
        }, 150);

        const newScore = currentState.score + scoreGained;
        const newBestScore = Math.max(newScore, currentState.bestScore);
        if (newBestScore > currentState.bestScore) {
          saveBestScore(newBestScore);
        }

        // 检测游戏状态
        let status = 'playing';
        if (hasWon(nextBoard)) {
          status = 'won';
        } else if (isGameOver(nextBoard)) {
          status = 'lost';
        }

        const tiles = extractTiles(nextBoard);

        return {
          board: nextBoard,
          tiles,
          score: newScore,
          bestScore: newBestScore,
          status: status as GameState['status'],
          canUndo: true,
        };
      });
    },
    []
  );

  // 重新开始
  const restart = useCallback(() => {
    setGameState(initializeGame());
    setHistory([]);
  }, [initializeGame]);

  // 撤销
  const undo = useCallback(() => {
    if (history.length === 0) return;
    const previousState = history[history.length - 1];
    setGameState(previousState);
    setHistory((prev) => prev.slice(0, -1));
  }, [history]);

  // 键盘事件监听
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const directionMap: Record<string, Direction> = {
        ArrowUp: 'up',
        ArrowDown: 'down',
        ArrowLeft: 'left',
        ArrowRight: 'right',
      };

      const direction = directionMap[e.key];
      if (direction) {
        e.preventDefault();
        move(direction);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [move]);

  // 触摸事件处理
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const dx = endX - touchStartRef.current.x;
      const dy = endY - touchStartRef.current.y;

      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > TOUCH_THRESHOLD) {
        move(dx > 0 ? 'right' : 'left');
      } else if (Math.abs(dy) > TOUCH_THRESHOLD) {
        move(dy > 0 ? 'down' : 'up');
      }
    },
    [move]
  );

  return {
    gameState,
    move,
    restart,
    undo,
    handleTouchStart,
    handleTouchEnd,
  };
}
