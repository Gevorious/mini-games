import { useEffect, useReducer } from 'react';
import Player from './_partials/Player';
import Maze from './_partials/Maze';
import Pellets from './_partials/Pellets';
import PowerPellets from './_partials/PowerPellets';
import Ghosts from './_partials/Ghosts';
import {
  ADD_SCORE,
  CANCEL_DELAY,
  CANCEL_FAIL,
  gameReducer,
  initialState,
  RESET,
  SET_GHOSTS_SPEED,
  SET_IS_STARTED,
  UPDATE_LIFE_REMAINING,
  UPDATE_PELLETS,
  UPDATE_POWER_PELLETS,
} from './gameReducer';
import { isPellet } from './actions';
import type { Player as TPlayer } from './types';
import { useModal } from '../../context/ModalContext';
import GameHeader from './_partials/GameHeader';
import './styles.scss';

const PacMan = () => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const {
    maze,
    pellets,
    power,
    delay,
    lifeRemaining,
    isFail,
    player,
    isStarted,
    isWin,
    score,
    ghostSpeed,
  } = state;

  const { success, fail } = useModal();

  useEffect(() => {
    if (isWin === true) {
      success({
        title: 'You WIN!',
        content: (
          <>
            <p>You've collected all the pellets</p>
            Your Score:
            <span className="score ml--16">{score}</span>
          </>
        ),
        onClose: () => dispatch({ type: RESET }),
      });
    }

    if (isWin === false) {
      fail({
        title: 'Game Over',
        content: '',
        onClose: () => dispatch({ type: RESET }),
      });
    }
  }, [isWin]);

  useEffect(() => {
    if (pellets.length < initialState.pellets.length / 2 && ghostSpeed > 40) {
      dispatch({ type: SET_GHOSTS_SPEED, payload: 40 });
    }

    if (pellets.length < initialState.pellets.length / 4 && ghostSpeed > 30) {
      dispatch({ type: SET_GHOSTS_SPEED, payload: 35 });
    }
  }, [pellets]);

  const update = (pPos: TPlayer['pos']) => {
    const [x, y] = pPos;
    const aligned = x % 1 === 0 && y % 1 === 0;
    if (aligned) {
      if (isPellet(pellets, pPos)) {
        dispatch({ type: UPDATE_PELLETS, payload: pPos });
      }
      if (isPellet(power, pPos)) {
        dispatch({ type: UPDATE_POWER_PELLETS, payload: pPos });
        setTimeout(() => dispatch({ type: CANCEL_DELAY }), 500);
      }
    }
  };

  const reduceLife = () => {
    dispatch({ type: UPDATE_LIFE_REMAINING });
    setTimeout(() => {
      dispatch({ type: CANCEL_FAIL });
    }, 2000);
  };

  return (
    <div className="pac-man mx--auto">
      <GameHeader
        lifeRemaining={lifeRemaining}
        score={score}
        onStart={() => {
          dispatch({ type: SET_IS_STARTED, payload: true });
        }}
        isStarted={isStarted}
      />
      <div className="board relative">
        <Maze maze={maze} />
        {isStarted && isWin === null ? (
          <>
            <Pellets pellets={pellets} />
            <PowerPellets pellets={power} />
            <Player
              player={player}
              update={update}
              dispatch={dispatch}
              delay={delay}
              isFail={isFail}
            />
            <Ghosts
              player={player}
              speed={ghostSpeed}
              delay={delay}
              reduceLife={reduceLife}
              isFail={isFail}
              eatGhost={() => dispatch({ type: ADD_SCORE, payload: 100 })}
            />
          </>
        ) : null}
      </div>
    </div>
  );
};

export default PacMan;
