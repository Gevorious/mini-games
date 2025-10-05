import { BOARD_HEIGHT, BOARD_WIDTH, PADDLE_HEIGHT } from '../../constants';
import type { BallActions } from '../../types';

export const ballInitial = {
  x: BOARD_WIDTH / 2,
  y: BOARD_HEIGHT - PADDLE_HEIGHT,
  vx: 0,
  vy: -1,
};

export const MOVE_BALL = 'MOVE_BALL';
export const BOUNCE = 'BOUNCE';

export const ballReducer = (
  state = ballInitial,
  action: {
    type: BallActions;
    payload?: unknown;
  },
) => {
  switch (action.type) {
    case MOVE_BALL:
      return {
        ...state,
        x: state.x + state.vx * (action.payload! as number),
        y: state.y + state.vy * (action.payload! as number),
      };
    case BOUNCE: {
      return {
        ...state,
        ...action.payload!,
      };
    }
    default:
      return state;
  }
};
