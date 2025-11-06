import Memory from '../games/Memory';
import Minesweeper from '../games/Minesweeper';
import Snake from '../games/Snake';
import BreakOut from '../games/BreakOut';
import PacMan from '../games/Pac-Man';

export const games = {
  ['break-out']: BreakOut,
  minesweeper: Minesweeper,
  snake: Snake,
  memory: Memory,
  ['pac-man']: PacMan,
};
