type Direction = 'up' | 'down' | 'left' | 'right';

export type Snake = {
  body: [number, number][];
  dir: Direction;
  nextDir: Direction | null;
  isFail: boolean;
  speed: number;
  foodPos: [number, number];
  score: number;
  started: boolean;
};

type Action =
  | { type: 'UPDATE_SNAKE' }
  | { type: 'CHANGE_DIR'; payload: Direction }
  | { type: 'RESET_GAME' };

export type SnakeProps = Pick<Snake, 'dir' | 'isFail' | 'speed'> & {
  snake: Snake['body'];
  dispatch: React.Dispatch<Action>;
};

export type FoodProps = {
  pos: [number, number];
};

export type GameHeaderProps = {
  speed: Snake['speed'];
  score: Snake['score'];
  isFail: Snake['isFail'];
  reset: () => void;
};
