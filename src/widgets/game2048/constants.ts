export const GRID_SIZE = 4;
export const TILE_SIZE = 70; // px
export const TILE_GAP = 8; // px
export const ANIMATION_DURATION = 150; // ms
export const BEST_SCORE_KEY = 'game2048_best_score';
export const TOUCH_THRESHOLD = 50; // px

export const TILE_COLORS: Record<number, { bg: string; text: string }> = {
  2: { bg: 'bg-slate-200', text: 'text-slate-800' },
  4: { bg: 'bg-slate-300', text: 'text-slate-800' },
  8: { bg: 'bg-orange-400', text: 'text-white' },
  16: { bg: 'bg-orange-500', text: 'text-white' },
  32: { bg: 'bg-orange-600', text: 'text-white' },
  64: { bg: 'bg-red-500', text: 'text-white' },
  128: { bg: 'bg-yellow-400', text: 'text-white' },
  256: { bg: 'bg-yellow-500', text: 'text-white' },
  512: { bg: 'bg-yellow-600', text: 'text-white' },
  1024: { bg: 'bg-green-500', text: 'text-white' },
  2048: { bg: 'bg-green-600', text: 'text-white' },
};

export const getColorForValue = (value: number) => {
  return TILE_COLORS[value] || { bg: 'bg-purple-500', text: 'text-white' };
};
