import { memo } from 'react';
import { BALL_D } from '../../constants';
import { useBall } from '../../hooks/useBall';
import type { BallProps } from '../../types';

const Ball = ({ paddle, stage, checkBrickHit, endGame }: BallProps) => {
  const { x, y } = useBall(paddle, stage, checkBrickHit, endGame);

  const styles = {
    left: `${x}px`,
    top: `${y}px`,
    width: `${BALL_D}px`,
    height: `${BALL_D}px`,
  };

  return <div style={styles} className="ball absolute" />;
};

export default memo(Ball);
