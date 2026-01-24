import type { GameStatus } from '../types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface GameOverDialogProps {
  status: GameStatus;
  score: number;
  bestScore: number;
  onRestart: () => void;
  isOpen: boolean;
}

export function GameOverDialog({
  status,
  score,
  bestScore,
  onRestart,
  isOpen,
}: GameOverDialogProps) {
  const isWon = status === 'won';
  const isLost = status === 'lost';

  if (!isWon && !isLost) return null;

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className={isWon ? 'text-green-500' : 'text-red-500'}>
            {isWon ? '🎉 You Won!' : '💔 Game Over'}
          </DialogTitle>
          <DialogDescription className="text-center">
            {isWon ? 'Congratulations, you reached 2048!' : 'No more moves available.'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex justify-between rounded-lg bg-white/5 p-4">
            <div>
              <p className="text-sm text-white/50">Score</p>
              <p className="text-2xl font-bold text-white">{score}</p>
            </div>
            <div>
              <p className="text-sm text-white/50">Best Score</p>
              <p className="text-2xl font-bold text-white">{bestScore}</p>
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col gap-2 sm:gap-0">
          <Button onClick={onRestart} className="w-full">
            Play Again
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
