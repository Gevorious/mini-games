import { memo } from 'react';
import type { MazeProps } from '../../types';
const stylesMap = { '#': 'wall', G: 'gate' };

const Maze = ({ maze }: MazeProps) => (
  <>
    {maze.map((row, y) => (
      <div key={y} className="row flex">
        {[...row].map((cell, x) => (
          <div
            key={x}
            className={`cell ${
              (stylesMap as Record<string, string>)[cell] || ''
            }`}
          />
        ))}
      </div>
    ))}
  </>
);

export default memo(Maze);
