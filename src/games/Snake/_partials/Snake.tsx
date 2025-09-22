import { memo, useEffect } from 'react';
import { CHANGE_DIR, UPDATE_SNAKE } from '../reducer';
import { onChangeDir } from '../actions';
import type { SnakeProps } from '../types';

const Snake = ({ dir, isFail, speed, snake, dispatch }: SnakeProps) => {
  useEffect(() => {
    if (isFail) return;
    const interval = window.setInterval(() => {
      dispatch({ type: UPDATE_SNAKE });
    }, speed);
    return () => window.clearInterval(interval);
  }, [isFail, speed]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newDir = onChangeDir(e, dir);
      if (newDir) {
        dispatch({ type: CHANGE_DIR, payload: newDir });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dir]);

  return snake.map(([x, y]) => (
    <div
      key={`${x}-${y}`}
      style={{ top: `${y}%`, left: `${x}%` }}
      className="snake-block"
    />
  ));
};

export default memo(Snake);
