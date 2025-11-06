import { maze } from './data/gameData';
import type { Ghost, Pellet, Player } from './types';

const posToGrid = (dir: Player['dir'], x: number, y: number) => {
  const factor = dir === 'up' || dir === 'left' ? 'ceil' : 'floor';
  return {
    row: Math[factor](y),
    col: Math[factor](x),
  };
};

const isObstacle = (pos: Player['pos'], isGhost?: boolean) => {
  const [y, x] = pos;
  return isGhost
    ? maze[y][x] === '#'
    : maze[y][x] === '#' || maze[y][x] === 'G';
};

export const isPassedTunnel = ([x, y]: Player['pos']) => {
  if (y !== 14) return false;
  if (x > 27) return [0, y] as Player['pos'];
  if (x < 0) return [27, y] as Player['pos'];

  return false;
};

export const isPellet = (pellets: Pellet[], [x, y]: Player['pos']) =>
  pellets.some(([pX, pY]) => pX === x && pY === y);

export const canMove = (
  dir: Player['dir'],
  pos: { x: number; y: number },
  isGhost?: boolean,
) => {
  const { row, col } = posToGrid(dir, pos.x, pos.y);
  switch (dir) {
    case 'up':
      return !isObstacle([row - 1, col], isGhost);
    case 'down':
      return !isObstacle([row + 1, col], isGhost);
    case 'left':
      return !isObstacle([row, col - 1], isGhost);
    case 'right':
      return !isObstacle([row, col + 1], isGhost);
    default:
      return true;
  }
};

export const getShortestPath = (
  targetNode: Player['pos'],
  startNode: Ghost['pos'],
): Ghost['dir'] | null => {
  const queue = [startNode];
  const visited = new Set<string>();
  const parentMap = new Map<string, [number, number]>();
  const [sx, sy] = startNode;
  const [px, py] = targetNode;
  visited.add(`${sx},${sy}`);

  const directions = [
    { dx: 0, dy: -1 },
    { dx: 0, dy: 1 },
    { dx: -1, dy: 0 },
    { dx: 1, dy: 0 },
  ];

  while (queue.length > 0) {
    const [cx, cy] = queue.shift()!;

    for (const { dx, dy } of directions) {
      const nx = Math.round(cx + dx);
      const ny = Math.round(cy + dy);
      const key = `${nx},${ny}`;

      if (
        nx < 0 ||
        ny < 0 ||
        ny >= maze.length ||
        nx >= maze[0].length ||
        maze[ny][nx] === '#' ||
        visited.has(key)
      )
        continue;

      visited.add(key);
      parentMap.set(key, [cx, cy]);
      queue.push([nx, ny]);

      // 🔥 EARLY EXIT
      if (nx === px && ny === py) {
        // Backtrack only ONE step
        let current = [nx, ny] as [number, number];
        let parent = parentMap.get(`${nx},${ny}`)!;
        while (parent[0] !== sx || parent[1] !== sy) {
          current = parent;
          parent = parentMap.get(`${parent[0]},${parent[1]}`)!;
        }

        const [nextX, nextY] = current;
        if (nextX > sx) return 'right';
        if (nextX < sx) return 'left';
        if (nextY > sy) return 'down';
        if (nextY < sy) return 'up';
        return null;
      }
    }
  }

  return null;
};

const findNearestPathCell = ([x, y]: [number, number]): [number, number] => {
  const queue: [number, number][] = [[Math.round(x), Math.round(y)]];
  const visited = new Set([`${x},${y}`]);
  const dirs = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],
  ];

  while (queue.length > 0) {
    const [cx, cy] = queue.shift()!;
    if (
      cy >= 0 &&
      cy < maze.length &&
      cx >= 0 &&
      cx < maze[0].length &&
      maze[cy][cx] !== '#'
    ) {
      return [cx, cy];
    }

    for (const [dx, dy] of dirs) {
      const nx = cx + dx;
      const ny = cy + dy;
      const key = `${nx},${ny}`;
      if (
        nx >= 0 &&
        nx < maze[0].length &&
        ny >= 0 &&
        ny < maze.length &&
        !visited.has(key)
      ) {
        visited.add(key);
        queue.push([nx, ny]);
      }
    }
  }

  return [x, y];
};

export const getPinkyTarget = (
  playerPos: Player['pos'],
  playerDir: Player['dir'],
): [number, number] => {
  let [x, y] = playerPos;

  switch (playerDir) {
    case 'up':
      y -= 4;
      break;
    case 'down':
      y += 4;
      break;
    case 'left':
      x -= 4;
      break;
    case 'right':
      x += 4;
      break;
  }

  return findNearestPathCell([x, y]);
};

export const getInkyTarget = (
  playerPos: Player['pos'],
  playerDir: Player['dir'],
  blinkyPos: Ghost['pos'],
): [number, number] => {
  let targetX, targetY;

  const [px, py] = playerPos;
  const [bx, by] = blinkyPos;

  if (playerDir === 'up') {
    targetX = px;
    targetY = py - 2;
  } else if (playerDir === 'down') {
    targetX = px;
    targetY = py + 2;
  } else if (playerDir === 'left') {
    targetX = px - 2;
    targetY = py;
  } else if (playerDir === 'right') {
    targetX = px + 2;
    targetY = py;
  }

  const vectorX = targetX! - bx;
  const vectorY = targetY! - by;

  const inkyTargetX = targetX! + vectorX;
  const inkyTargetY = targetY! + vectorY;

  return findNearestPathCell([inkyTargetX, inkyTargetY]);
};

export const getClydeTarget = (
  playerPos: Player['pos'],
  clydePos: Ghost['pos'],
  scatterCorner: Ghost['pos'] = [1, 29],
) => {
  const [pX, pY] = playerPos;
  const [cX, cY] = clydePos;

  const distance = Math.sqrt((pX - cX) ** 2 + (pY - cY) ** 2);

  if (distance >= 8) {
    return playerPos;
  } else {
    return scatterCorner;
  }
};
