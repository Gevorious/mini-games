import {
  BALL_D,
  BRICK_COLORS,
  BRICK_HEIGHT,
  BRICK_WIDTH,
  BOARD_HEIGHT,
  BOARD_WIDTH,
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
    (currentPos >= BOARD_WIDTH - PADDLE_WIDTH / 2 && paddleDirs[key] > 0)
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
  if (x > BOARD_WIDTH - half) {
    return { vx: -vx, vy, x: BOARD_WIDTH - half - offset, y };
  }
  if (y < half) {
    return { vx, vy: -vy, x, y: half + offset };
  }
  if (y > BOARD_HEIGHT - half) {
    return { isFail: true, x, y: BOARD_HEIGHT - half - offset };
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
    if (
      brick.active &&
      x + BALL_D / 2 >= brick.x &&
      x - BALL_D / 2 <= brick.x + BRICK_WIDTH &&
      y + BALL_D / 2 >= brick.y &&
      y - BALL_D / 2 <= brick.y + BRICK_HEIGHT
    ) {
      const newBrick = { ...brick, active: false };
      hitBricks.push(newBrick);
      return newBrick;
    }
    return brick;
  });

  let dx: 1 | -1 = 1;
  let dy: 1 | -1 = 1;
  let newX = x;
  let newY = y;

  if (hitBricks.length) {
    const minX = Math.min(...hitBricks.map((b) => b.x));
    const maxX = Math.max(...hitBricks.map((b) => b.x + BRICK_WIDTH));
    const minY = Math.min(...hitBricks.map((b) => b.y));
    const maxY = Math.max(...hitBricks.map((b) => b.y + BRICK_HEIGHT));

    const brick = { x: minX, y: minY, width: maxX - minX, height: maxY - minY };

    const overlapLeft = x + BALL_D / 2 - brick.x;
    const overlapRight = brick.x + brick.width - (x - BALL_D / 2);
    const overlapTop = y + BALL_D / 2 - brick.y;
    const overlapBottom = brick.y + brick.height - (y - BALL_D / 2);

    const minOverlap = Math.min(
      overlapLeft,
      overlapRight,
      overlapTop,
      overlapBottom,
    );

    if (minOverlap === overlapLeft) {
      dx = -1;
      newX = brick.x - BALL_D / 2;
    } else if (minOverlap === overlapRight) {
      dx = -1;
      newX = brick.x + brick.width + BALL_D / 2;
    } else if (minOverlap === overlapTop) {
      dy = -1;
      newY = brick.y - BALL_D / 2;
    } else if (minOverlap === overlapBottom) {
      dy = -1;
      newY = brick.y + brick.height + BALL_D / 2;
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
