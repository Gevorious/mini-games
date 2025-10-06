import { generateBricks } from './actions';
import { BOARD_WIDTH, PADDLE_WIDTH } from './constants';
import type { Brick, Paddle } from './types';

export const initialState = {
  bricks: generateBricks(),
  paddlePos: BOARD_WIDTH / 2,
  stageScore: 0,
  stage: 0,
  delta: 6,
  stageComplete: false,
  totalScore: 0,
  isFail: false,
  inActiveBricks: 0,
};

export const MOVE_PADDLE = 'MOVE_PADDLE';
export const RESET_ACC = 'RESET_ACC';
export const UPDATE_BRICKS = 'UPDATE_BRICKS';
export const NEW_STAGE = 'NEW_STAGE';
export const END_STAGE = 'END_STAGE';
export const END_GAME = 'END_GAME';
export const RESET_GAME = 'RESET_GAME';

export const reducer = (
  state: typeof initialState,
  action: { type: string; payload?: unknown },
) => {
  switch (action.type) {
    case MOVE_PADDLE: {
      const dir = (action.payload as Paddle['dir']) ?? 0;

      const newDelta = Math.min(state.delta + 0.4, 14);

      let newPos = state.paddlePos + dir * newDelta;

      const min = PADDLE_WIDTH / 2;
      const max = BOARD_WIDTH - PADDLE_WIDTH / 2;
      if (newPos < min) {
        newPos = min;
        return { ...state, paddlePos: newPos, delta: initialState.delta };
      }
      if (newPos > max) {
        newPos = max;
        return { ...state, paddlePos: newPos, delta: initialState.delta };
      }

      return {
        ...state,
        paddlePos: newPos,
        delta: newDelta,
      };
    }
    case RESET_ACC:
      return { ...state, delta: initialState.delta };

    case UPDATE_BRICKS:
      const bricks = action.payload as Brick[];
      const inActiveBricks = bricks.filter((b) => !b.active).length;
      const score = inActiveBricks * 10;

      return { ...state, bricks, stageScore: score, inActiveBricks };

    case NEW_STAGE:
      return {
        ...initialState,
        bricks: generateBricks(),
        totalScore: state.totalScore + state.stageScore,
        stage: state.stage + 1,
      };

    case END_STAGE:
      return {
        ...state,
        stageComplete: true,
      };
    case END_GAME:
      return {
        ...state,
        isFail: true,
      };

    case RESET_GAME:
      return initialState;
    default:
      return state;
  }
};
