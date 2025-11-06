import Blinky from './Blinky';
import { memo, useEffect, useReducer, useRef } from 'react';
import type { Ghost, GhostsProps, GhostTypes } from '../../types';
import {
  CHANGE_GHOST_DIR,
  ghostsReducer,
  initialState,
  MOVE_GHOST,
  RESET_GHOSTS,
  SET_IS_EATEN,
  SET_IS_FRIGHTENED,
} from './ghostsReducer';
import Pinky from './Pinky';
import Inky from './Inky';
import Clyde from './Clyde';

const Ghosts = ({
  player,
  delay,
  reduceLife,
  isFail,
  speed,
  eatGhost,
}: GhostsProps) => {
  const [state, dispatch] = useReducer(ghostsReducer, initialState);
  const { blinky, pinky, inky, clyde, isFrightened } = state;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (delay) {
      dispatch({ type: SET_IS_FRIGHTENED, payload: true });
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      timeoutRef.current = setTimeout(() => {
        dispatch({ type: SET_IS_FRIGHTENED, payload: false });
        timeoutRef.current = null;
      }, 8_000);
    }
  }, [delay]);

  useEffect(() => {
    if (isFail) {
      setTimeout(() => {
        dispatch({ type: RESET_GHOSTS });
      }, 1800);
    }
  }, [isFail]);

  const changeDir = (name: GhostTypes, nextDir: Ghost['dir']) => {
    dispatch({
      type: CHANGE_GHOST_DIR,
      payload: { ghost: name, nextDir },
    });
  };

  const checkPosMatch = (ghost: GhostTypes) => {
    const [pX, pY] = player.pos;
    const [gX, gY] = state[ghost].pos;
    const dx = Math.abs(pX - gX);
    const dy = Math.abs(pY - gY);

    if (dx <= 0.5 && dy <= 0.5) {
      if (isFrightened) {
        eatGhost();
        dispatch({
          type: SET_IS_EATEN,
          payload: { name: ghost, value: true },
        });
      } else reduceLife();
    }
  };

  const resetGhost = (name: GhostTypes) => {
    const [gX, gY] = state[name].pos;
    if (state[name].isEaten) {
      const [iX, iY] = initialState[name].pos;
      if (gX === iX && gY === iY && !isFrightened) {
        dispatch({ type: SET_IS_EATEN, payload: { name, value: false } });
      }
    }
  };

  const move = (name: GhostTypes) => {
    dispatch({ type: MOVE_GHOST, payload: name });
  };

  return (
    <>
      <Blinky
        move={move}
        playerPos={player.pos}
        changeDir={changeDir}
        ghost={blinky}
        delay={delay}
        isFrightened={isFrightened}
        resetGhost={resetGhost}
        checkPosMatch={checkPosMatch}
        isFail={isFail}
        speed={speed}
      />
      <Pinky
        move={move}
        playerPos={player.pos}
        playerDir={player.dir}
        changeDir={changeDir}
        ghost={pinky}
        delay={delay}
        isFrightened={isFrightened}
        resetGhost={resetGhost}
        checkPosMatch={checkPosMatch}
        isFail={isFail}
        speed={speed}
      />
      <Inky
        move={move}
        playerPos={player.pos}
        blinkyPos={blinky.pos}
        playerDir={player.dir}
        changeDir={changeDir}
        ghost={inky}
        delay={delay}
        isFrightened={isFrightened}
        resetGhost={resetGhost}
        checkPosMatch={checkPosMatch}
        isFail={isFail}
        speed={speed}
      />
      <Clyde
        move={move}
        playerPos={player.pos}
        changeDir={changeDir}
        ghost={clyde}
        delay={delay}
        isFrightened={isFrightened}
        resetGhost={resetGhost}
        checkPosMatch={checkPosMatch}
        isFail={isFail}
        speed={speed}
      />
    </>
  );
};

export default memo(Ghosts);
