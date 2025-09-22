import { useEffect, useReducer } from 'react';
import Snake from './_partials/Snake';
import { BOARD_HEIGHT, BOARD_WIDTH } from './constants';
import './styles.scss';
import { initialState, reducer, RESET_GAME, START_GAME } from './reducer';
import Food from './_partials/Food';
import { useModal } from '../../context/ModalContext';
import GameHeader from './_partials/GameHeader';

const SnakeGame = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { dir, isFail, speed, body, foodPos, score, started } = state;

  const { fail } = useModal();

  useEffect(() => {
    if (isFail) {
      fail({
        title: 'Game Over',
        content: (
          <>
            Your Score:
            <span className="modal-score-value ml--16">{score}</span>
          </>
        ),
      });
    }
  }, [isFail]);

  return (
    <div className="snake-game mx--auto">
      <GameHeader
        isFail={isFail}
        speed={speed}
        score={score}
        reset={() => {
          dispatch({ type: RESET_GAME });
        }}
      />
      <div
        className="field"
        style={{ width: `${BOARD_WIDTH}px`, height: `${BOARD_HEIGHT}px` }}
      >
        {started ? (
          <>
            <Snake
              dir={dir}
              isFail={isFail}
              speed={speed}
              snake={body}
              dispatch={dispatch}
            />

            <Food pos={foodPos} />
          </>
        ) : (
          <div className="start-btn-wrapper width-100 flex justify--center align--center">
            <button
              className="py--4 px--16 pointer"
              onClick={() => dispatch({ type: START_GAME })}
            >
              Start
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SnakeGame;
