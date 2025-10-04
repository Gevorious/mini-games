import { memo } from 'react';
import type { BoardHeaderProps } from '../types';

const BoardHeader = ({ score, stage, isFail, reset }: BoardHeaderProps) => {
  return (
    <div className="board-header px--24 py--16 width-100 flex align--center justify--between">
      <div className="score">
        Score:
        <span key={score} className="score-value ml--8">
          {score}
        </span>
      </div>
      {isFail && (
        <button onClick={reset} className="pointer py--4 px--16">
          Reset
        </button>
      )}
      <div className="stage">
        Stage <span>{stage}</span>
      </div>
    </div>
  );
};

export default memo(BoardHeader);
