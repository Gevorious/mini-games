import { memo, useEffect } from 'react';
import { getInkyTarget, getShortestPath } from '../../actions';
import { TILE_SIZE } from '../../constants';
import GhostBody from './GhostBody';
import type { GhostProps } from '../../types';
import { initialState } from './ghostsReducer';

const Inky = ({
  ghost,
  delay,
  move,
  playerPos,
  blinkyPos,
  playerDir,
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
      resetGhost('inky');
    } else if (!isFail) {
      checkPosMatch('inky');
    }

    let target = getInkyTarget(playerPos, playerDir!, blinkyPos!);
    if (isFrightened) target = [1, 29];
    if (isEaten) target = initialState.inky.pos;

    const nextDir = getShortestPath(target!, [x, y]);
    if (!nextDir) return;
    if (nextDir !== dir) {
      changeDir('inky', nextDir);
    }
  }, [playerPos, pos, blinkyPos, playerDir]);

  useEffect(() => {
    const interval = window.setInterval(
      () => {
        !delay && !isFail && move('inky');
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
      className={`cell ghost inky absolute ${dir}`}
    >
      <GhostBody color={'cyan'} isEaten={isEaten} isFrightened={isFrightened} />
    </div>
  );
};

export default memo(Inky);
