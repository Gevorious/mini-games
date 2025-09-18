import type { JSX } from 'react';
import Memory from '../games/Memory';
import Minesweeper from '../games/Minesweeper';
import Snake from '../games/Snake';
import TicTakToe from '../games/TicTakToe';

const games = {
  ['tic-tac-toe']: TicTakToe,
  minesweeper: Minesweeper,
  snake: Snake,
  memory: Memory,
};

export type GameId = keyof typeof games;

export const getGameComponent = (id: GameId): JSX.Element => {
  return games[id]();
};
