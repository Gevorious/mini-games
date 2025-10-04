import { useEffect, useReducer, useRef } from 'react';
import {
  ballInitial,
  ballReducer,
  BOUNCE,
  MOVE_BALL,
} from '../_partials/Ball/reducer';
import { bounceOffPaddle, checkCollision } from '../actions';
import type { BallProps } from '../types';
import { BALL_D, BRICK_HEIGHT, ROWS } from '../constants';

const bricksLowerEdge = BRICK_HEIGHT * ROWS;

export const useBall = (
  paddle: BallProps['paddle'],
  stage: number,
  checkBrickHit: BallProps['checkBrickHit'],
  endGame: () => void,
) => {
  const [state, dispatch] = useReducer(ballReducer, ballInitial);
  const { vx, x, y, vy } = state;

  const simRef = useRef({ x, y, vx, vy });
  const paddleRef = useRef(paddle);
  const checkBrickHitRef = useRef(checkBrickHit);
  const lastTimeRef = useRef<number | null>(null);

  useEffect(() => {
    simRef.current = { x, y, vx, vy };
  }, [x, y, vx, vy]);

  useEffect(() => {
    paddleRef.current = paddle;
  }, [paddle]);

  useEffect(() => {
    checkBrickHitRef.current = checkBrickHit;
  }, [checkBrickHit]);

  useEffect(() => {
    let frameId: number;

    const loop = (time: number) => {
      const { x: cx, y: cy, vx: cvx, vy: cvy } = simRef.current;
      const paddleNow = paddleRef.current;

      let delta = 0;
      if (lastTimeRef.current != null) {
        delta = (time - lastTimeRef.current) / 16.67;
      }
      lastTimeRef.current = time;

      let nextVx = cvx;
      let nextVy = cvy;

      const isPaddleHit =
        cy + BALL_D / 2 >= paddleNow.y &&
        cx < paddleNow.x + paddleNow.width / 2 &&
        cx > paddleNow.x - paddleNow.width / 2 &&
        cvy > 0;

      if (isPaddleHit) {
        const velocity = bounceOffPaddle({ x: cx, vy: cvy }, paddleNow);
        nextVx = velocity.vx;
        nextVy = velocity.vy;
      }

      const wallState = checkCollision(cx, cy, nextVx, nextVy);
      if (wallState) {
        const { isFail, ...rest } = wallState;
        dispatch({ type: BOUNCE, payload: { ...rest } });

        if (isFail) {
          endGame();
          return;
        }
      }

      let nextX;
      let nextY;

      if (cy <= bricksLowerEdge) {
        const {
          x: nx,
          y: ny,
          dx,
          dy,
          isHit,
        } = checkBrickHitRef.current(cx, cy);
        if (isHit) {
          nextVx = dx * nextVx;
          nextVy = dy * nextVy;
          nextX = nx;
          nextY = ny;
        }
      }

      if (nextVx !== cvx || nextVy !== cvy) {
        dispatch({
          type: BOUNCE,
          payload: {
            vx: nextVx,
            vy: nextVy,
            ...(nextX !== undefined && nextY !== undefined
              ? { x: nextX, y: nextY }
              : {}),
          },
        });
      }

      for (let i = 0; i < Math.max(1, Math.floor(delta)); i++) {
        dispatch({ type: MOVE_BALL, payload: Math.min(2.2, 1 + 0.1 * stage) });
      }

      frameId = requestAnimationFrame(loop);
    };

    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return { x, y };
};
