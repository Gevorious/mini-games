import { useEffect, useState } from 'react';
import { COUNTDOWN_TIME } from '../constants';
import { useModal } from '../../../context/ModalContext';
import type { CountdownProps } from '../types';

const mm = String(Math.floor(COUNTDOWN_TIME / 1000 / 60)).padStart(2, '0');
const ss = String((COUNTDOWN_TIME / 1000) % 60).padStart(2, '0');

const initialTime = `${mm}:${ss}`;

const Countdown = ({ started, reset }: CountdownProps) => {
  const [time, setTime] = useState(initialTime);
  const { fail } = useModal();

  useEffect(() => {
    if (!started) {
      setTime(initialTime);
      return;
    }

    const start = Date.now();
    const interval = setInterval(() => {
      const current = Date.now() - 1000;
      const remaining = Math.max(0, COUNTDOWN_TIME - (current - start)); // ms

      const min = String(Math.floor(remaining / 1000 / 60)).padStart(2, '0');
      const sec = String(Math.floor((remaining / 1000) % 60)).padStart(2, '0');

      setTime(`${min}:${sec}`);

      if (remaining <= 0) {
        clearInterval(interval);
        fail({
          title: 'Times Up!',
          content: 'You did not manage to cleared the board on time!',
          buttonText: 'Try again',
          onClose: reset,
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [started]);

  return <div className="countdown text--center px--16 py--8">{time}</div>;
};

export default Countdown;
