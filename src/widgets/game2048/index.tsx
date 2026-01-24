import { useEffect, useState } from 'react';
import { RotateCcw, Undo2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWidgetHeader } from '@/components/common/useWidgetHeader';
import { useGame2048 } from './hooks/useGame2048';
import { GameBoard } from './components/GameBoard';
import { GameOverDialog } from './components/GameOverDialog';

/**
 * 2048 Game Widget Component
 *
 * A classic 2048 puzzle game widget with:
 * - Keyboard and touch controls
 * - Score tracking and best score persistence
 * - Undo functionality
 * - Smooth animations
 */
export function Game2048() {
  const { gameState, restart, undo, handleTouchStart, handleTouchEnd } =
    useGame2048();
  const { registerAction, unregisterAction } = useWidgetHeader();
  const [showDialog, setShowDialog] = useState(false);

  // 显示游戏结束对话框
  useEffect(() => {
    if (gameState.status !== 'playing') {
      const timer = setTimeout(() => {
        setShowDialog(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [gameState.status]);

  // 注册头部按钮
  useEffect(() => {
    const actions = [
      {
        id: 'game2048-new',
        element: (
          <Button
            onClick={() => {
              restart();
              setShowDialog(false);
            }}
            variant="ghost"
            size="sm"
            className="h-auto p-1 text-white/40 transition-all duration-300 hover:bg-white/10 hover:text-white/80"
            title="New Game"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        ),
      },
      {
        id: 'game2048-undo',
        element: (
          <Button
            onClick={undo}
            disabled={!gameState.canUndo}
            variant="ghost"
            size="sm"
            className="h-auto p-1 text-white/40 transition-all duration-300 hover:bg-white/10 hover:text-white/80 disabled:opacity-30"
            title="Undo"
          >
            <Undo2 className="h-4 w-4" />
          </Button>
        ),
      },
    ];

    actions.forEach((action) => registerAction(action));
    return () => {
      actions.forEach((action) => unregisterAction(action.id));
    };
  }, [gameState.canUndo, restart, undo, registerAction, unregisterAction]);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Score Display */}
      <div className="flex gap-4">
        <div className="glass rounded-lg px-4 py-2 text-center">
          <div className="text-xs uppercase text-white/50">Score</div>
          <div className="text-2xl font-bold text-white">{gameState.score}</div>
        </div>
        <div className="glass rounded-lg px-4 py-2 text-center">
          <div className="text-xs uppercase text-white/50">Best</div>
          <div className="text-2xl font-bold text-white">{gameState.bestScore}</div>
        </div>
      </div>

      {/* Game Board */}
      <GameBoard
        tiles={gameState.tiles}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      />

      {/* Game Over Dialog */}
      <GameOverDialog
        status={gameState.status}
        score={gameState.score}
        bestScore={gameState.bestScore}
        onRestart={() => {
          restart();
          setShowDialog(false);
        }}
        isOpen={showDialog}
      />
    </div>
  );
}
