import { canMove, isPassedTunnel } from './actions';
import { PLAYER_INITIAL_POS, STEP } from './constants';
import {
  maze,
  pelletCoords,
  powerPelletCoords,
  dirFactor,
} from './data/gameData';
import type { Pellet, Maze, Player } from './types';

export const initialState = {
  player: {
    pos: PLAYER_INITIAL_POS,
    dir: 'right',
    nextDir: null,
  } as Player,
  pellets: pelletCoords as Pellet[],
  power: powerPelletCoords as Pellet[],
  lifeRemaining: 3,
  maze: maze as Maze,
  delay: false,
  isFail: false,
  isStarted: false,
  isWin: null as null | boolean,
  score: 0,
  ghostSpeed: 50,
};

export const UPDATE_PELLETS = 'UPDATE_PELLETS';
export const UPDATE_POWER_PELLETS = 'UPDATE_POWER_PELLETS';
export const CANCEL_DELAY = 'CANCEL_DELAY';
export const UPDATE_LIFE_REMAINING = 'UPDATE_LIFE_REMAINING';
export const CANCEL_FAIL = 'CANCEL_FAIL';
export const CHANGE_PLAYER_DIR = 'CHANGE_PLAYER_DIR';
export const MOVE_PLAYER = 'MOVE_PLAYER';
export const RESET_PLAYER = 'RESET_PLAYER';
export const SET_IS_STARTED = 'SET_IS_STARTED';
export const SET_SCORE = 'SET_SCORE';
export const ADD_SCORE = 'ADD_SCORE';
export const SET_GHOSTS_SPEED = 'SET_GHOSTS_SPEED';
export const RESET = 'RESET';

export const gameReducer = (
  state: typeof initialState,
  action: { type: string; payload?: unknown },
) => {
  switch (action.type) {
    case UPDATE_PELLETS: {
      const [x, y] = action.payload as [number, number];
      const newPellets = state.pellets.filter(
        ([pX, pY]) => !(pX === x && pY === y),
      );
      if (!newPellets.length && !state.power.length) {
        return {
          ...state,
          isWin: true,
          score: state.score + 10,
        };
      }

      return {
        ...state,
        pellets: newPellets,
        score: state.score + 10,
      };
    }
    case UPDATE_POWER_PELLETS: {
      const [x, y] = action.payload as [number, number];
      const newPellets = state.power.filter(
        ([pX, pY]) => !(pX === x && pY === y),
      );

      if (!newPellets.length && !state.pellets.length) {
        return {
          ...state,
          isWin: true,
          score: state.score + 50,
        };
      }

      return {
        ...state,
        power: newPellets,
        delay: true,
        score: state.score + 50,
      };
    }
    case CANCEL_DELAY:
      return { ...state, delay: false };

    case UPDATE_LIFE_REMAINING:
      if (state.lifeRemaining === 1) {
        return { ...state, isStarted: false, isWin: false };
      }
      return { ...state, lifeRemaining: state.lifeRemaining - 1, isFail: true };

    case CANCEL_FAIL:
      return { ...state, isFail: false };

    case SET_GHOSTS_SPEED:
      return { ...state, ghostSpeed: action.payload as number };

    case ADD_SCORE:
      return { ...state, score: state.score + (action.payload as number) };

    case CHANGE_PLAYER_DIR: {
      const nextDir = action.payload as Player['dir'];
      return { ...state, player: { ...state.player, nextDir } };
    }

    case MOVE_PLAYER: {
      const [x, y] = state.player.pos;
      let { dir, nextDir } = state.player;
      const aligned = x % 1 === 0 && y % 1 === 0;

      if (nextDir && aligned && canMove(nextDir, { x, y })) {
        dir = nextDir;
        nextDir = null;
      }

      if (aligned) {
        const tunnelPass = isPassedTunnel([x, y]);
        if (tunnelPass) {
          return { ...state, player: { pos: tunnelPass, dir, nextDir } };
        }
      }

      if (!canMove(dir, { x, y })) {
        return { ...state, player: { ...state.player, dir, nextDir } };
      }

      const newPos: Player['pos'] = [...state.player.pos];
      const { idx, val } = dirFactor[dir];
      newPos[idx] += STEP * val;
      newPos[idx] = Math.round(newPos[idx] * (1 / STEP)) / (1 / STEP);

      return {
        ...state,
        player: { ...state.player, pos: newPos, dir, nextDir },
      };
    }

    case SET_SCORE:
      return { ...state, score: state.score + (action.payload as number) };

    case SET_IS_STARTED:
      if (action.payload) {
        return { ...initialState, isStarted: action.payload as boolean };
      }
      return { ...state, isStarted: action.payload as boolean };

    case RESET_PLAYER:
      return { ...state, player: initialState.player };
    case RESET:
      return initialState;

    default:
      return state;
  }
};
