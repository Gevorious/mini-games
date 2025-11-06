import { memo, useEffect } from 'react';
import { TILE_SIZE } from '../../constants';
import { directions } from '../../data/gameData';
import type { PlayerProp } from '../../types';
import {
  CHANGE_PLAYER_DIR,
  MOVE_PLAYER,
  RESET_PLAYER,
} from '../../gameReducer';

const Player = ({ update, dispatch, player, delay, isFail }: PlayerProp) => {
  const { pos, dir } = player;
  const [x, y] = pos;

  useEffect(() => {
    const movePlayer = (e: KeyboardEvent) => {
      const { key } = e;
      if (!directions[key]) return;
      if (isFail) return;

      if (directions[key] !== dir) {
        dispatch({ type: CHANGE_PLAYER_DIR, payload: directions[key] });
      }
    };

    window.addEventListener('keydown', movePlayer);

    return () => {
      window.removeEventListener('keydown', movePlayer);
    };
  }, [dir, isFail]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      !delay && !isFail && dispatch({ type: MOVE_PLAYER });
      update([x, y]);
    }, 20);

    return () => {
      window.clearInterval(interval);
    };
  }, [player, delay, isFail]);

  useEffect(() => {
    if (isFail) {
      setTimeout(() => {
        dispatch({ type: RESET_PLAYER });
      }, 2000);
    }
  }, [isFail]);

  return (
    <div
      style={{ top: `${TILE_SIZE * y}px`, left: `${TILE_SIZE * x}px` }}
      className={`cell player animate ${dir} ${delay ? 'flash-pulse' : ''} ${
        isFail ? 'fail' : ''
      }`}
    ></div>
  );
};

export default memo(Player);
