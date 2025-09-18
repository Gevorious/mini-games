import { MINES_COUNT } from './constants';
import type { GameState } from './types';

export const UPDATE_FLAG_COUNT = 'UPDATE_FLAG_COUNT';
export const SET_GAME_STATUS = 'SET_GAME_STATUS';
export const RESET_BOARD = 'RESET_BOARD';

export const initialState: GameState = {
  status: null,
  flagRemaining: MINES_COUNT,
};

export const reducer = (
  state: typeof initialState,
  action: { type: string; payload?: any },
) => {
  switch (action.type) {
    case UPDATE_FLAG_COUNT:
      return {
        ...state,
        flagRemaining: action.payload,
      };
    case SET_GAME_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    case RESET_BOARD:
      return initialState;
    default:
      return state;
  }
};
