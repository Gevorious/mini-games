import type { Snake } from './types';

const dirValues = {
  up: [0, -2],
  down: [0, 2],
  left: [-2, 0],
  right: [2, 0],
};

const keys: Record<string, Snake['dir']> = {
  ArrowLeft: 'left',
  ArrowUp: 'up',
  ArrowRight: 'right',
  ArrowDown: 'down',
};

const oppositeDirs: Record<string, Snake['dir']> = {
  ArrowLeft: 'right',
  ArrowRight: 'left',
  ArrowUp: 'down',
  ArrowDown: 'up',
};

export const checkBoundaries = (snakeHead: [number, number]) => {
  const [x, y] = snakeHead;
  return x < 0 || x >= 100 || y < 0 || y >= 100;
};

export const updateSnake = (state: Snake) => {
  const { dir, body, foodPos } = state;
  const [dx, dy] = dirValues[dir];

  const [headX, headY] = body[0];
  const [foodX, foodY] = foodPos;

  const isHit = foodX === headX && foodY === headY;

  const newBody: Snake['body'] = [
    [headX + dx, headY + dy],
    ...(isHit ? body : body.slice(0, -1)),
  ];

  return { newBody, isHit };
};

export const onChangeDir = (e: KeyboardEvent, currentDir: Snake['dir']) => {
  const { key } = e;

  if (!keys[key] || keys[key] === currentDir) return;
  if (oppositeDirs[key] === currentDir) return;

  return keys[key];
};

export const updateFoodPos = (
  snake: Snake['body'],
  current?: Snake['foodPos'],
): Snake['foodPos'] => {
  const blockedPos = [...snake, current || []];

  let x: number;
  let y: number;

  do {
    x = Math.floor(Math.random() * 50) * 2;
    y = Math.floor(Math.random() * 50) * 2;
  } while (blockedPos.some(([bx, by]) => bx === x && by === y));

  return [x, y];
};

export const checkSelfHit = (snake: Snake['body']) => {
  const [headX, headY] = snake[0];

  const isSelfHit = snake.slice(1).some(([x, y]) => x === headX && y === headY);

  return isSelfHit;
};
