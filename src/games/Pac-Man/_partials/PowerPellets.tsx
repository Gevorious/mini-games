import { memo } from 'react';
import { TILE_SIZE } from '../constants';
import type { PelletsProps } from '../types';

const PowerPellets = ({ pellets }: PelletsProps) => {
  return pellets.map(([x, y]) => (
    <div
      key={`${x}-${y}`}
      style={{ top: `${y * TILE_SIZE}px`, left: `${x * TILE_SIZE}px` }}
      className="cell power absolute"
    />
  ));
};

export default memo(PowerPellets);
