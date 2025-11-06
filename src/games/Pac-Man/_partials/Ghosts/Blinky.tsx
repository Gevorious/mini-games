import { memo, useEffect } from 'react';
import { getShortestPath } from '../../actions';
import { TILE_SIZE } from '../../constants';
import GhostBody from './GhostBody';
import type { GhostProps } from '../../types';
import { initialState } from './ghostsReducer';

const Blinky = ({
  ghost,
  delay,
  move,
  playerPos,
  changeDir,
  isFrightened,
  resetGhost,
  checkPosMatch,
  isFail,
  speed,
}: GhostProps) => {
  const { pos, dir, isEaten } = ghost;
  const [x, y] = pos;

  useEffect(() => {
    if (isEaten) {
      resetGhost('blinky');
    } else if (!isFail) {
      checkPosMatch('blinky');
    }
    let target: [number, number] = playerPos;
    if (isFrightened) {
      target = [1, 1];
    }
    if (isEaten) target = initialState.blinky.pos;

    const nextDir = getShortestPath(target, [x, y]);

    if (!nextDir) return;

    if (nextDir !== dir) {
      changeDir('blinky', nextDir);
    }
  }, [playerPos, pos, isFrightened, isEaten]);

  useEffect(() => {
    const interval = window.setInterval(
      () => {
        !delay && !isFail && move('blinky');
      },
      isEaten ? 20 : speed,
    );

    return () => {
      window.clearInterval(interval);
    };
  }, [delay, isEaten, isFail, speed]);

  return (
    <div
      style={{ top: y * TILE_SIZE, left: x * TILE_SIZE }}
      className={`cell ghost blinky absolute ${dir}`}
    >
      <GhostBody color={'red'} isEaten={isEaten} isFrightened={isFrightened} />
    </div>
  );
};

export default memo(Blinky);
