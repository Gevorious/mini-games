export type Direction = -1 | 1 | 0;

export type Paddle = {
  dir: Direction;
  pos: number;
};

type Action =
  | { type: 'MOVE'; payload: Direction }
  | { type: 'RESET_GAME' }
  | { type: 'RESET_ACC' };

export type PaddleProps = {
  dispatch: React.Dispatch<Action>;
  pos: Paddle['pos'];
};

export type BallActions = 'MOVE_BALL' | 'BOUNCE';

export type BallProps = {
  paddle: {
    width: number;
    x: number;
    y: number;
  };
  stage: number;
  checkBrickHit: (
    x: number,
    y: number,
  ) => { dx: 1 | -1; dy: 1 | -1; isHit: boolean };
  endGame: () => void;
};

export type Brick = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  active: boolean;
  color: string;
};

export type BrickProps = {
  brick: Brick;
};

export type BoardHeaderProps = {
  score: number;
  stage: number;
  isFail: boolean;
  reset: () => void;
};
