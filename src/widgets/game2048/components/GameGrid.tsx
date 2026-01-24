import { GRID_SIZE, TILE_GAP, TILE_SIZE } from '../constants';

export function GameGrid() {
    const cells = Array(GRID_SIZE * GRID_SIZE)
        .fill(null)
        .map((_, i) => i);

    return (
        <div
            className="absolute inset-0"
            style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${GRID_SIZE}, ${TILE_SIZE}px)`,
                gap: `${TILE_GAP}px`,
                padding: `${TILE_GAP}px`,
                alignContent: 'start',
            }}
        >
            {cells.map((i) => (
                <div
                    key={i}
                    className="bg-white/5 rounded-lg"
                    style={{
                        width: TILE_SIZE,
                        height: TILE_SIZE,
                    }}
                />
            ))}
        </div>
    );
}
