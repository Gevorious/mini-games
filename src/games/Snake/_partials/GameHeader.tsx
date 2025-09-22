import { memo } from 'react';
import { INITIAL_SPEED, MAX_UPDATE_RATE } from '../constants';
import type { GameHeaderProps } from '../types';

const getSpeedLevel = (speed: number) => {
  const ratio = (INITIAL_SPEED - speed) / (INITIAL_SPEED - MAX_UPDATE_RATE);

  switch (true) {
    case ratio < 0.33:
      return 'low';
    case ratio < 0.66:
      return 'medium';
    case ratio < 1:
      return 'high';
    case speed === MAX_UPDATE_RATE:
      return 'max';
    default:
      return 'low';
  }
};

const GameHeader = ({ score, speed, isFail, reset }: GameHeaderProps) => {
  const level = getSpeedLevel(speed);

  return (
    <div className="game-header flex justify--between py--8 px--24">
      <div>
        <span className="label mr--8">Score:</span>
        <span key={score} className="score-value">
          {score}
        </span>
      </div>
      {isFail && (
        <button className="py--4 px--16 pointer" onClick={reset}>
          Reset
        </button>
      )}
      <div>
        <span className="label mr--8">Speed:</span>
        <span className={`speed-value ${level}`}>{level}</span>
      </div>
    </div>
  );
};

export default memo(GameHeader);
