import { CARDS_COUNT, seeds } from './constants';
import type { Card } from './types';

export const generateCards = () => {
  const chosenSeeds = [...seeds];

  for (let i = chosenSeeds.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [chosenSeeds[i], chosenSeeds[j]] = [chosenSeeds[j], chosenSeeds[i]];
  }

  const finalSeeds = chosenSeeds.slice(0, CARDS_COUNT);

  const cards: Card[] = [];
  let value: number = 0;
  for (let i = 0; i < CARDS_COUNT; i++) {
    cards.push({
      id: i,
      value,
      isOpen: false,
      seed: finalSeeds[value],
    });

    value++;

    if (value >= CARDS_COUNT / 2) {
      value = 0;
    }
  }

  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  return cards;
};

export const updateBoard = (board: Card[], idx1: number, idx2: number) => {
  const newBoard = [...board];
  newBoard[idx1].isOpen = true;
  newBoard[idx2].isOpen = true;

  return newBoard;
};
