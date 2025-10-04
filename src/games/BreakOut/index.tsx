import { useEffect, useReducer } from 'react';
import BoardHeader from './_partials/BoardHeader';
import Paddle from './_partials/Paddle';
import Ball from './_partials/Ball';
import Brick from './_partials/Brick';
import {
  END_GAME,
  END_STAGE,
  initialState,
  NEW_STAGE,
  reducer,
  RESET_GAME,
  UPDATE_BRICKS,
} from './reducer';
import { PADDLE_WIDTH } from './constants';
import { updateBricks } from './actions';
import { useModal } from '../../context/ModalContext';
import './styles.scss';

const BreakOut = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    paddlePos,
    bricks,
    stageScore,
    totalScore,
    inActiveBricks,
    stage,
    stageComplete,
    isFail,
  } = state;

  const { fail } = useModal();

  useEffect(() => {
    if (inActiveBricks === bricks.length) {
      dispatch({ type: END_STAGE });
    }
  }, [inActiveBricks]);

  const checkBrickHit = (x: number, y: number) => {
    const { newBricks, newX, newY, dx, dy, hitCount } = updateBricks(
      x,
      y,
      bricks,
    );
    if (hitCount) {
      dispatch({
        type: UPDATE_BRICKS,
        payload: newBricks,
      });
    }

    return { x: newX, y: newY, dx, dy, isHit: !!hitCount };
  };

  useEffect(() => {
    if (isFail) {
      fail({
        title: 'Game Over!',
        content: (
          <div className="modal-content">
            <p>
              You have reached stage No:<span className="ml--8">{stage}</span>
            </p>
            <p>
              Final score:
              <span className="ml--8">{totalScore + stageScore}</span>
            </p>
          </div>
        ),
      });
    }
  }, [isFail]);

  return (
    <div className="break-out mx--auto">
      <BoardHeader
        score={totalScore + stageScore}
        stage={stage}
        isFail={isFail}
        reset={() => dispatch({ type: RESET_GAME })}
      />
      <div className="board mx--auto relative width-100">
        {stageComplete || stage === 0 ? (
          <div className="start-btn-wrapper width-100 flex flex--column justify--center align--center">
            {stageComplete && <p className="mb--16 mt--0">Stage Completed!</p>}
            <button
              className="py--4 px--16 pointer"
              onClick={() => dispatch({ type: NEW_STAGE })}
            >
              {stage === 0 ? 'Start' : 'Next Stage'}
            </button>
          </div>
        ) : (
          <>
            {!isFail && (
              <>
                <Paddle pos={paddlePos} dispatch={dispatch} />
                <Ball
                  checkBrickHit={checkBrickHit}
                  paddle={{ width: PADDLE_WIDTH, x: paddlePos, y: 96.5 }}
                  stage={stage}
                  endGame={() => dispatch({ type: END_GAME })}
                />
              </>
            )}
            {bricks.map((brick) => (
              <Brick key={brick.id} brick={brick} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default BreakOut;
