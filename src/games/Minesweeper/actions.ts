import { COLS_COUNT, ROWS_COUNT } from './constants';
import type { Cell } from './types';

const isNumberCell = (
  cell: Cell | undefined,
): cell is Cell & { value: number } => {
  return !!cell && typeof cell.value === 'number';
};

export const generateEmptyBoard = () =>
  Array.from({ length: ROWS_COUNT }, (_, r) =>
    Array.from({ length: COLS_COUNT }, (_, c) => ({
      coords: [r, c] as [number, number],
      revealed: false,
      flagged: false,
      isMine: false,
      value: 0,
    })),
  );

export const generateCells = (
  rows: number,
  cols: number,
  mines: number,
  safeCell: Cell,
) => {
  const allCoords: [number, number][] = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      allCoords.push([row, col]);
    }
  }

  const index = allCoords.findIndex(
    ([r, c]) => r === safeCell.coords[0] && c === safeCell.coords[1],
  );
  if (index !== -1) allCoords.splice(index, 1);

  for (let i = allCoords.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allCoords[i], allCoords[j]] = [allCoords[j], allCoords[i]];
  }

  const cells: Cell[][] = [];
  for (let row = 0; row < rows; row++) {
    const currentRow = [];
    for (let col = 0; col < cols; col++) {
      currentRow.push({
        coords: [row, col] as [number, number],
        isMine: false,
        revealed: false,
        flagged: false,
        value: 0,
      });
    }
    cells.push(currentRow);
  }

  for (let i = 0; i < mines; i++) {
    const [r, c] = allCoords[i];
    cells[r][c].isMine = true;
    cells[r][c].value = null;

    const neighbors: [number, number][] = [
      [r - 1, c - 1],
      [r - 1, c],
      [r - 1, c + 1],
      [r, c + 1],
      [r, c - 1],
      [r + 1, c - 1],
      [r + 1, c],
      [r + 1, c + 1],
    ];

    for (const [nr, nc] of neighbors) {
      if (isNumberCell(cells[nr]?.[nc])) {
        cells[nr][nc].value += 1;
      }
    }
  }

  return cells;
};

export const openCells = (board: Cell[][], coords: Cell['coords']) => {
  const newBoard = [...board];
  const [r, c] = coords;
  newBoard[r] = [...newBoard[r]];
  newBoard[r][c] = { ...newBoard[r][c], revealed: true };

  if (newBoard[r][c].value === 0) {
    const stack: [number, number][] = [[r, c]];
    while (stack.length) {
      const [cr, cc] = stack.pop()!;
      const neighbors: [number, number][] = [
        [cr - 1, cc - 1],
        [cr - 1, cc],
        [cr - 1, cc + 1],
        [cr, cc - 1],
        [cr, cc + 1],
        [cr + 1, cc - 1],
        [cr + 1, cc],
        [cr + 1, cc + 1],
      ];

      for (const [nr, nc] of neighbors) {
        if (!newBoard[nr]?.[nc]) continue;
        const neighbor = newBoard[nr][nc];
        if (neighbor.revealed || neighbor.isMine || neighbor.flagged) continue;

        newBoard[nr][nc] = { ...neighbor, revealed: true };

        if (neighbor.value === 0) {
          stack.push([nr, nc]);
        }
      }
    }
  }

  return newBoard;
};

export const toggleFlag = (cells: Cell[][], coords: Cell['coords']) => {
  const newBoard = [...cells];
  const [r, c] = coords;
  newBoard[r] = [...newBoard[r]];
  newBoard[r][c].flagged = !newBoard[r][c].flagged;

  return newBoard;
};

export const getCellValue = (cell: Cell) => {
  if (cell.isExplosion) return '💥';
  if (cell.isWrong) return '❌';
  if (cell.revealed) {
    if (cell.value === null) {
      return '💣';
    } else {
      return cell.value || null;
    }
  } else {
    if (cell.flagged) return '🚩';
  }
};

export const endGameLost = (cells: Cell[][], coords: Cell['coords']) => {
  const newBoard = cells.map((row) =>
    row.map((cell) =>
      cell.isMine
        ? {
            ...cell,
            revealed: !cell.flagged ? true : false,
          }
        : { ...cell, isWrong: cell.flagged ? true : false },
    ),
  );

  const [r, c] = coords;
  newBoard[r][c].isExplosion = true;

  return newBoard;
};

export const getCellStyles = (cell: Cell) => {
  const styles = [];

  if (cell.revealed) styles.push('revealed');
  if (cell.isMine) styles.push('mine');
  if (cell.value) styles.push(`n${cell.value}`);
  if (cell.flagged) styles.push('flag');
  if (cell.isWrong) styles.push('wrong');

  return styles.join(' ');
};

export const checkWin = (board: Cell[][]) => {
  const flatBoard = board.flat();
  const isWin = flatBoard.every(
    (cell) => (cell.isMine && cell.flagged) || (!cell.isMine && cell.revealed),
  );
  return isWin;
};
