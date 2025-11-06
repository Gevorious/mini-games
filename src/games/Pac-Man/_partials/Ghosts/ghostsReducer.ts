import { canMove, isPassedTunnel } from '../../actions';
import { STEP } from '../../constants';
import { dirFactor } from '../../data/gameData';
import type { Ghost, GhostTypes } from '../../types';

export type GhostsState = Record<GhostTypes, Ghost> & {
  isFrightened: boolean;
};

export const initialState: GhostsState = {
  isFrightened: false,
  blinky: {
    pos: [11, 15],
    dir: 'right',
    nextDir: null,
    isEaten: false,
  },
  pinky: {
    pos: [16, 13],
    dir: 'right',
    nextDir: null,
    isEaten: false,
  },
  inky: {
    pos: [11, 13],
    dir: 'left',
    nextDir: null,
    isEaten: false,
  },
  clyde: {
    pos: [16, 15],
    dir: 'left',
    nextDir: null,
    isEaten: false,
  },
};

export const CHANGE_GHOST_DIR = 'CHANGE_GHOST_DIR';
export const MOVE_GHOST = 'MOVE_GHOST';
export const SET_IS_EATEN = 'SET_IS_EATEN';
export const SET_IS_FRIGHTENED = 'SET_IS_FRIGHTENED';
export const RESET_GHOSTS = 'RESET_GHOSTS';

export const ghostsReducer = (
  state: typeof initialState,
  action: { type: string; payload?: unknown },
) => {
  switch (action.type) {
    case CHANGE_GHOST_DIR: {
      const { ghost, nextDir } = action.payload as {
        ghost: GhostTypes;
        nextDir: Ghost['dir'];
      };
      return { ...state, [ghost]: { ...state[ghost], nextDir } };
    }

    case MOVE_GHOST: {
      const ghost = action.payload as GhostTypes;
      const [x, y] = state[ghost].pos;
      let { dir, nextDir } = state[ghost];
      const aligned = x % 1 === 0 && y % 1 === 0;

      if (nextDir && aligned && canMove(nextDir, { x, y }, true)) {
        dir = nextDir;
        nextDir = null;
      }

      if (aligned) {
        const tunnelPass = isPassedTunnel([x, y]);
        if (tunnelPass) {
          return {
            ...state,
            [ghost]: { ...state[ghost], pos: tunnelPass, dir, nextDir },
          };
        }
      }

      if (!canMove(dir, { x, y }, true)) {
        return {
          ...state,
          [ghost]: { ...state[ghost], dir, nextDir },
        };
      }

      const newPos: Ghost['pos'] = [...state[ghost].pos];
      const { idx, val } = dirFactor[dir];
      newPos[idx] += STEP * val;
      newPos[idx] = Math.round(newPos[idx] * (1 / STEP)) / (1 / STEP);

      return {
        ...state,
        [ghost]: { ...state[ghost], pos: newPos, dir, nextDir },
      };
    }

    case SET_IS_EATEN: {
      const { name, value } = action.payload as {
        name: GhostTypes;
        value: boolean;
      };
      return { ...state, [name]: { ...state[name], isEaten: value } };
    }

    case SET_IS_FRIGHTENED: {
      const isFrightened = action.payload as boolean;
      return { ...state, isFrightened };
    }

    case RESET_GHOSTS: {
      return initialState;
    }

    default:
      return state;
  }
};
