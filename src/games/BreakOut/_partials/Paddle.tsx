import { PADDLE_HEIGHT, PADDLE_WIDTH } from '../constants';
import type { PaddleProps } from '../types';
import { usePaddle } from '../hooks/usePaddle';
import { memo } from 'react';

const Paddle = ({ dispatch, pos }: PaddleProps) => {
  usePaddle(dispatch, pos);

  return (
    <div
      style={{
        height: `${PADDLE_HEIGHT}px`,
        left: `${pos}px`,
        width: `${PADDLE_WIDTH}px`,
      }}
      className="paddle absolute"
    />
  );
};

export default memo(Paddle);
