export type Card = {
  id: number;
  value: number;
  isOpen: boolean;
  seed: string;
};

export type Pair<T> = [] | [T] | [T, T];

export type UseMemoryGameReturn = {
  board: Card[];
  onCardClick: (index: number) => void;
  resetBoard: () => void;
  isFlipped: (id: number) => boolean;
  isStarted: boolean;
};

export type CountdownProps = {
  started: boolean;
  reset: () => void;
};
