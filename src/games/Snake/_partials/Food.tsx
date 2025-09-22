import type { FoodProps } from '../types';

const Food = ({ pos }: FoodProps) => {
  const [x, y] = pos;
  return <div style={{ top: `${y}%`, left: `${x}%` }} className="food" />;
};

export default Food;
