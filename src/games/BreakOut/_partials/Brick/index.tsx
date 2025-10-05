import { memo } from 'react';
import type { BrickProps } from '../../types';
import './styles.scss';

const Brick = ({ brick }: BrickProps) => {
  const { x, y, width, height, color, active } = brick;

  return (
    <div
      className={` ${color} brick brick--neon ${
        active ? '' : 'brick--dead'
      } absolute`}
      style={{
        left: `${x}px`,
        top: `${y}px`,
        width: `${width}px`,
        height: `${height}px`,
      }}
    ></div>
  );
};

export default memo(Brick);
