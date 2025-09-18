import { memo } from 'react';
import { getCellStyles, getCellValue } from '../actions';
import type { CellProps } from '../types';

const Cell = ({ cell, openCell, toggleFlag }: CellProps) => {
  return (
    <span
      className={`minesweeper__cell text--center flex justify--center align--center pointer ${getCellStyles(
        cell,
      )}`}
      onClick={() => !cell.flagged && openCell(cell)}
      onContextMenu={(e) => {
        e.preventDefault();
        !cell.revealed && toggleFlag(cell);
      }}
    >
      {getCellValue(cell)}
    </span>
  );
};

export default memo(Cell);
