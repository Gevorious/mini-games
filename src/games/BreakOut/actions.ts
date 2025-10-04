import {
  BALL_D,
  BRICK_COLORS,
  BRICK_HEIGHT,
  BRICK_WIDTH,
  COLS,
  PADDLE_WIDTH,
  ROWS,
} from './constants';
import type { Brick, Direction } from './types';

const paddleDirs: Record<string, Direction> = {
  ArrowLeft: -1,
  ArrowRight: 1,
};

export const onChangeDir = (e: KeyboardEvent, currentPos: number) => {
  const { key } = e;
  if (
    !paddleDirs[key] ||
    (currentPos <= PADDLE_WIDTH / 2 && paddleDirs[key] < 0) ||
    (currentPos >= 100 - PADDLE_WIDTH / 2 && paddleDirs[key] > 0)
  )
    return 0;

  return paddleDirs[key];
};

export const bounceOffPaddle = (
  ball: { x: number; vy: number },
  paddle: { x: number; y: number; width: number },
) => {
  const hitFactor = (ball.x - paddle.x) / (paddle.width / 2);
  let vx = hitFactor;
  let vy = -Math.abs(ball.vy);

  const length = Math.sqrt(vx * vx + vy * vy);
  vx = vx / length;
  vy = vy / length;

  return { vx, vy };
};

export const checkCollision = (
  x: number,
  y: number,
  vx: number,
  vy: number,
) => {
  const half = BALL_D / 2;
  const offset = 0.5;

  if (x < half) {
    return { vx: -vx, vy, x: half + offset, y };
  }
  if (x > 100 - half) {
    return { vx: -vx, vy, x: 100 - half - offset, y };
  }
  if (y < half) {
    return { vx, vy: -vy, x, y: half + offset };
  }
  if (y > 100 - half) {
    return { isFail: true, x, y: 100 - half - offset };
  }
};

export const generateBricks = (): Brick[] => {
  const bricks: Brick[] = [];
  const halfCols = COLS / 2;

  for (let row = 0; row < ROWS; row++) {
    const color = BRICK_COLORS[row % BRICK_COLORS.length];
    for (let col = 0; col < halfCols; col++) {
      const pattern = Math.random() > 0.4 ? 1 : 0;

      if (pattern === 1) {
        bricks.push(
          {
            id: `${row}-${col}-L`,
            x: col * BRICK_WIDTH,
            y: row * BRICK_HEIGHT,
            width: BRICK_WIDTH,
            height: BRICK_HEIGHT,
            active: true,
            color,
          },
          {
            id: `${row}-${col}-R`,
            x: (COLS - col) * BRICK_WIDTH - BRICK_WIDTH,
            y: row * BRICK_HEIGHT,
            width: BRICK_WIDTH,
            height: BRICK_HEIGHT,
            active: true,
            color,
          },
        );
      }
    }
  }

  return bricks;
};

export const updateBricks = (x: number, y: number, bricks: Brick[]) => {
  const hitBricks: Brick[] = [];
  const newBricks = bricks.map((brick) => {
    if (brick.active) {
      if (
        x + BALL_D / 2 >= brick.x &&
        x - BALL_D / 2 <= brick.x + BRICK_WIDTH &&
        y + BALL_D / 2 >= brick.y &&
        y - BALL_D / 2 <= brick.y + BRICK_HEIGHT
      ) {
        const newBrick = { ...brick, active: false };
        hitBricks.push(newBrick);
        return newBrick;
      }
    }
    return brick;
  });

  let dx: 1 | -1 = 1;
  let dy: 1 | -1 = 1;

  let newX = x;
  let newY = y;

  if (hitBricks.length) {
    const brick = hitBricks[0];
    const overlapX =
      Math.min(x + BALL_D / 2, brick.x + BRICK_WIDTH) -
      Math.max(x - BALL_D / 2, brick.x);
    const overlapY =
      Math.min(y + BALL_D / 2, brick.y + BRICK_HEIGHT) -
      Math.max(y - BALL_D / 2, brick.y);

    if (overlapX < overlapY) {
      dx = -1;
      if (x < brick.x) {
        newX = brick.x - BALL_D / 2;
      } else {
        newX = brick.x + BRICK_WIDTH + BALL_D / 2;
      }
    } else {
      dy = -1;
      if (y < brick.y) {
        newY = brick.y - BALL_D / 2;
      } else {
        newY = brick.y + BRICK_HEIGHT + BALL_D / 2;
      }
    }
  }

  return {
    newX,
    newY,
    newBricks,
    dx,
    dy,
    hitCount: hitBricks.length,
  };
};
