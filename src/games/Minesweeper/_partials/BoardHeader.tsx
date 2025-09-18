import { memo } from 'react';
import Timer from './Timer';
import type { BoardHeaderProps } from '../types';

const BoardHeader = ({ status, flagRemaining, reset }: BoardHeaderProps) => {
  return (
    <div className="heading flex align--center justify--between py--4 px--8 mb--8">
      <Timer start={status === 'ongoing'} reset={!status} />
      {status && status !== 'ongoing' && <button onClick={reset}>Reset</button>}
      <span className="ml--40">{flagRemaining}</span>
    </div>
  );
};

export default memo(BoardHeader);
