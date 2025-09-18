import { useCallback, useEffect, useRef, useState } from 'react';
import { generateCards, updateBoard } from './actions';
import type { Card, Pair, UseMemoryGameReturn } from './types';
import { CARDS_COUNT } from './constants';
import { useModal } from '../../context/ModalContext';

export const useMemoryGame = (): UseMemoryGameReturn => {
  const [board, setBoard] = useState<Card[]>(() => generateCards());
  const [isStarted, setIsStarted] = useState(false);
  const [activePair, setActivePair] = useState<Pair<number>>([]);
  const pairsRemainingRef = useRef<number>(CARDS_COUNT / 2);
  const mismatchTimeoutRef = useRef<number | null>(null);

  const { success } = useModal();

  const clearMismatchTimeout = () => {
    if (mismatchTimeoutRef.current) {
      clearTimeout(mismatchTimeoutRef.current);
      mismatchTimeoutRef.current = null;
    }
  };

  const resetBoard = useCallback(() => {
    clearMismatchTimeout();
    setBoard((prev) => prev.map((card) => ({ ...card, isOpen: false })));
    setIsStarted(false);

    setTimeout(() => {
      const newBoard = generateCards();
      pairsRemainingRef.current = CARDS_COUNT / 2;
      setBoard(newBoard);
      setActivePair([]);
    }, 600);
  }, []);

  const endGame = useCallback(() => {
    setIsStarted(false);

    success({
      title: '🎉 Congratulations 🎉',
      content: 'You cleared the board!',
      buttonText: 'Try again',
      onClose: resetBoard,
    });
  }, [resetBoard, success]);

  const onCardClick = (idx: number) => {
    if (activePair.length > 1) return;

    if (!isStarted) {
      setIsStarted(true);
    }

    const nextPair = [...activePair, idx] as Pair<number>;
    setActivePair(nextPair);

    if (nextPair.length === 2) {
      const [firstIdx, secondIdx] = nextPair;
      if (board[firstIdx].value === board[secondIdx].value) {
        pairsRemainingRef.current -= 1;
        const newBoard = updateBoard(board, firstIdx, secondIdx);
        setBoard(newBoard);
        setActivePair([]);
        if (pairsRemainingRef.current === 0) {
          endGame();
        }
      } else {
        clearMismatchTimeout();
        mismatchTimeoutRef.current = window.setTimeout(() => {
          setActivePair([]);
          mismatchTimeoutRef.current = null;
        }, 2000);
      }
    }
  };

  const isFlipped = (id: number) =>
    activePair?.some((idx) => board[idx].id === id);

  useEffect(() => {
    return () => {
      clearMismatchTimeout();
    };
  }, []);

  return {
    isStarted,
    board,
    onCardClick,
    isFlipped,
    resetBoard,
  };
};

export default useMemoryGame;
