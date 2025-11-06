import { memo } from 'react';
import type { GameHeaderProps } from '../types';

const GameHeader = ({
  lifeRemaining,
  score,
  onStart,
  isStarted,
}: GameHeaderProps) => {
  return (
    <div className="flex pac-man__header relative py--8 px--16 justify--between align--center">
      <span className="score">{score}</span>
      {!isStarted && (
        <button className="absolute pointer px--8 py--4" onClick={onStart}>
          Start
        </button>
      )}
      <div className="flex">
        {Array.from({ length: lifeRemaining }).map((_, i) => (
          <div key={i} className="cell power relative" />
        ))}
      </div>
    </div>
  );
};

export default memo(GameHeader);
