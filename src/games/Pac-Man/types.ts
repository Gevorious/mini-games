export type Player = {
  pos: [number, number];
  dir: 'up' | 'down' | 'left' | 'right';
  nextDir: null | Player['dir'];
};

type Action =
  | { type: 'RESET_PLAYER' }
  | { type: 'CHANGE_PLAYER_DIR'; payload: Player['dir'] }
  | { type: 'MOVE_PLAYER' };

export type PlayerProp = {
  update: (pos: Player['pos']) => void;
  delay: boolean;
  isFail: boolean;
  player: Player;
  dispatch: React.Dispatch<Action>;
};

export type GameHeaderProps = {
  lifeRemaining: number;
  score: number;
  onStart: () => void;
  isStarted: boolean;
};

export type Pellet = [x: number, y: number];
export type Maze = string[];

export type MazeProps = { maze: Maze };
export type PelletsProps = { pellets: Pellet[] };

export type GhostTypes = 'blinky' | 'pinky' | 'inky' | 'clyde';

export type GhostsProps = {
  player: { pos: Player['pos']; dir: Player['dir'] };
  delay: boolean;
  reduceLife: () => void;
  speed: number;
  isFail: boolean;
  eatGhost: () => void;
};

export type GhostProps = {
  ghost: Ghost;
  delay: boolean;
  move: (name: GhostTypes) => void;
  playerPos: Player['pos'];
  blinkyPos?: Ghost['pos'];
  playerDir?: Player['dir'];
  changeDir: (name: GhostTypes, nextDir: Ghost['dir']) => void;
  isFrightened: boolean;
  resetGhost: (name: GhostTypes) => void;
  checkPosMatch: (name: GhostTypes) => void;
  isFail: boolean;
  speed: number;
};

export type Ghost = {
  pos: [number, number];
  dir: 'up' | 'down' | 'left' | 'right';
  nextDir: null | Player['dir'];
  isEaten: boolean;
};
