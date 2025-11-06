import { memo, useEffect } from 'react';
import { getPinkyTarget, getShortestPath } from '../../actions';
import { TILE_SIZE } from '../../constants';
import GhostBody from './GhostBody';
import type { GhostProps } from '../../types';
import { initialState } from './ghostsReducer';

const Pinky = ({
  ghost,
  delay,
  move,
  playerPos,
  playerDir,
  changeDir,
  isFrightened,
  checkPosMatch,
  resetGhost,
  isFail,
  speed,
}: GhostProps) => {
  const { pos, dir, isEaten } = ghost;
  const [x, y] = pos;

  useEffect(() => {
    if (isEaten) {
      resetGhost('pinky');
    } else if (!isFail) {
      checkPosMatch('pinky');
    }

    let target = getPinkyTarget(playerPos, playerDir!);
    if (isFrightened) target = [26, 1];
    if (isEaten) target = initialState.pinky.pos;

    const nextDir = getShortestPath(target, [x, y]);
    if (!nextDir) return;
    if (nextDir !== dir) changeDir('pinky', nextDir);
  }, [playerPos, pos]);

  useEffect(() => {
    const interval = window.setInterval(
      () => {
        !delay && !isFail && move('pinky');
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
      className={`cell ghost pinky absolute ${dir}`}
    >
      <GhostBody
        color={'#ff8af9'}
        isEaten={isEaten}
        isFrightened={isFrightened}
      />
    </div>
  );
};

export default memo(Pinky);
