import { useEffect, useRef } from 'react';
import { RESET_ACC, MOVE_PADDLE } from '../reducer';
import { onChangeDir } from '../actions';
import type { Direction } from '../types';

export const usePaddle = (dispatch: React.Dispatch<any>, pos: number) => {
  const dirRef = useRef<Direction>(0);
  const posRef = useRef<number>(pos);

  useEffect(() => {
    posRef.current = pos;
  }, [pos]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newDir = onChangeDir(e, posRef.current);
      if (newDir !== 0 && newDir !== dirRef.current) {
        dirRef.current = newDir;
      }
      return;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        if (dirRef.current !== 0) dirRef.current = 0;
        dispatch({ type: RESET_ACC });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    let frameId: number;

    const loop = () => {
      const dir = dirRef.current;
      if (dir !== 0) {
        dispatch({ type: MOVE_PADDLE, payload: dir });
      }
      frameId = requestAnimationFrame(loop);
    };

    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, []);
};
