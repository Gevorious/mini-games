import { PADDLE_WIDTH } from '../constants';
import type { PaddleProps } from '../types';
import { usePaddle } from '../hooks/usePaddle';
import { memo } from 'react';

const Paddle = ({ dispatch, pos }: PaddleProps) => {
  usePaddle(dispatch, pos);

  return (
    <div
      style={{
        left: `${pos}%`,
        width: `${PADDLE_WIDTH}%`,
      }}
      className="paddle absolute"
    />
  );
};

export default memo(Paddle);
