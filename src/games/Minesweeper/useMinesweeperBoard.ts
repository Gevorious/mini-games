import { useCallback, useReducer, useState } from 'react';
import { useModal } from '../../context/ModalContext';
import { COLS_COUNT, MINES_COUNT, ROWS_COUNT } from './constants';
import {
  checkWin,
  endGameLost,
  generateCells,
  generateEmptyBoard,
  openCells,
  toggleFlag,
} from './actions';
import type { Cell as TCell } from './types';
import {
  initialState,
  reducer,
  RESET_BOARD,
  SET_GAME_STATUS,
  UPDATE_FLAG_COUNT,
} from './reducer';

const endConditions = {
  win: true,
  lose: true,
  ongoing: false,
} as const;

const initialBoard = generateEmptyBoard();

export const useMinesweeperBoard = () => {
  const [board, setBoard] = useState<TCell[][]>(initialBoard);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { status, flagRemaining } = state;
  const { success, fail } = useModal();

  const reset = useCallback(() => {
    dispatch({ type: RESET_BOARD });
    setBoard(initialBoard);
  }, []);

  const onClick = useCallback(
    (cell: TCell) => {
      if (status && endConditions[status as keyof typeof endConditions]) return;

      let newBoard = board;

      if (!status) {
        newBoard = generateCells(ROWS_COUNT, COLS_COUNT, MINES_COUNT, cell);
        dispatch({ type: SET_GAME_STATUS, payload: 'ongoing' });
      }

      if (newBoard[cell.coords[0]][cell.coords[1]].isMine) {
        dispatch({ type: SET_GAME_STATUS, payload: 'lose' });
        fail({
          title: 'You lost!',
          content:
            "Aww! You step on a mine, but don't worry you still have one leg remaining",
          buttonText: 'Close',
        });

        newBoard = endGameLost(newBoard, cell.coords);
      } else {
        newBoard = openCells(newBoard, cell.coords);

        if (flagRemaining === 0 && checkWin(newBoard)) {
          success({
            title: '🎉 Congratulations 🎉',
            content: 'You cleared the board!',
            buttonText: 'Close',
          });
          dispatch({ type: SET_GAME_STATUS, payload: 'win' });
        }
      }

      setBoard(newBoard);
    },
    [status, flagRemaining, board],
  );

  const onRightClick = useCallback(
    (cell: TCell) => {
      if (!board.length) return;

      const newBoard = toggleFlag(board, cell.coords);
      const count = flagRemaining + (cell.flagged ? -1 : 1);
      dispatch({ type: UPDATE_FLAG_COUNT, payload: count });

      if (count === 0 && checkWin(newBoard)) {
        success({
          title: '🎉 Congratulations 🎉',
          content: 'You cleared the board!',
          buttonText: 'Close',
        });
        dispatch({ type: SET_GAME_STATUS, payload: 'win' });
      }

      setBoard(newBoard);
    },
    [board, flagRemaining],
  );

  return {
    board,
    status,
    flagRemaining,
    reset,
    onClick,
    onRightClick,
  };
};

export default useMinesweeperBoard;
