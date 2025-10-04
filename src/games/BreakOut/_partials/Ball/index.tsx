import { memo } from 'react';
import { BALL_D } from '../../constants';
import { useBall } from '../../hooks/useBall';
import type { BallProps } from '../../types';

const Ball = ({ paddle, stage, checkBrickHit, endGame }: BallProps) => {
  const { x, y } = useBall(paddle, stage, checkBrickHit, endGame);

  const styles = {
    left: `${x}%`,
    top: `${y}%`,
    width: `${BALL_D}%`,
    height: `${BALL_D}%`,
  };

  return <div style={styles} className="ball absolute" />;
};

export default memo(Ball);
