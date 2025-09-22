import type { start } from 'repl';
import {
  checkBoundaries,
  checkSelfHit,
  updateFoodPos,
  updateSnake,
} from './actions';
import { INITIAL_SPEED, MAX_UPDATE_RATE } from './constants';
import type { Snake } from './types';

export const initialState: Snake = {
  body: [
    [50, 50],
    [50, 52],
    [50, 54],
  ],
  dir: 'up',
  nextDir: null,
  isFail: false,
  started: false,
  speed: INITIAL_SPEED,
  foodPos: updateFoodPos([
    [50, 50],
    [50, 52],
    [50, 54],
  ]),
  score: 0,
};

export const RESET_GAME = 'RESET_GAME';
export const UPDATE_SNAKE = 'UPDATE_SNAKE';
export const CHANGE_DIR = 'CHANGE_DIR';
export const START_GAME = 'START_GAME';

export const reducer = (
  state: typeof initialState,
  action: { type: string; payload?: unknown },
) => {
  switch (action.type) {
    case UPDATE_SNAKE: {
      const dir = state.nextDir || state.dir;
      const { newBody, isHit } = updateSnake(state);

      if (checkBoundaries(newBody[0]) || checkSelfHit(newBody)) {
        return { ...state, isFail: true };
      }

      const newStats: Pick<Snake, 'speed' | 'score' | 'foodPos'> = {
        speed: state.speed,
        score: state.score,
        foodPos: state.foodPos,
      };

      if (isHit) {
        newStats.foodPos = updateFoodPos(state.body, state.foodPos);
        newStats.speed = Math.max(MAX_UPDATE_RATE, state.speed - 5);
        newStats.score = state.score + 10;
      }

      return {
        ...state,
        body: newBody,
        speed: newStats.speed,
        score: newStats.score,
        dir,
        nextDir: null,
        foodPos: newStats.foodPos,
      };
    }

    case CHANGE_DIR:
      return { ...state, nextDir: action.payload as Snake['dir'] };

    case START_GAME:
      return { ...state, started: true };

    case RESET_GAME:
      return initialState;

    default:
      return state;
  }
};
