import Memory from '../games/Memory';
import Minesweeper from '../games/Minesweeper';
import Snake from '../games/Snake';
import TicTakToe from '../games/TicTakToe';

export const games = {
  ['tic-tac-toe']: TicTakToe,
  minesweeper: Minesweeper,
  snake: Snake,
  memory: Memory,
};
