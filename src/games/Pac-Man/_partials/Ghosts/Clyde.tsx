import { memo, useEffect } from 'react';
import { getClydeTarget, getShortestPath } from '../../actions';
import { TILE_SIZE } from '../../constants';
import GhostBody from './GhostBody';
import type { GhostProps } from '../../types';
import { initialState } from './ghostsReducer';

const Clyde = ({
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
    let target = getClydeTarget(playerPos, [x, y]);

    if (isFrightened) {
      target = [26, 29];
    }

    if (isEaten) {
      target = initialState.clyde.pos;
      resetGhost('clyde');
    } else if (!isFail) {
      checkPosMatch('clyde');
    }

    const nextDir = getShortestPath(target, [x, y]);
    if (!nextDir) return;
    if (nextDir !== dir) {
      changeDir('clyde', nextDir);
    }
  }, [playerPos, pos, isFrightened, isEaten]);

  useEffect(() => {
    const interval = window.setInterval(
      () => {
        !delay && !isFail && move('clyde');
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
      className={`cell ghost clyde absolute ${dir}`}
    >
      <GhostBody
        color={'orange'}
        isEaten={isEaten}
        isFrightened={isFrightened}
      />
    </div>
  );
};

export default memo(Clyde);
