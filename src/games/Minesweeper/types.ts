export type Cell = {
  coords: [number, number];
  isMine: boolean;
  revealed: boolean;
  flagged: boolean;
  isWrong?: boolean;
  isExplosion?: boolean;
  value: number | null;
};

export type CellProps = {
  cell: Cell;
  openCell: (cell: Cell) => void;
  toggleFlag: (cell: Cell) => void;
};

export type GameState = {
  status: 'win' | 'lose' | 'ongoing' | null;
  flagRemaining: number;
};

export type BoardHeaderProps = {
  status: GameState['status'];
  flagRemaining: GameState['flagRemaining'];
  reset: () => void;
};
