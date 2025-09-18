import { useEffect, useState } from 'react';

type TimerProps = {
  start?: boolean;
  reset?: boolean;
};

const initialTime = '00:00';

const Timer = ({ start, reset }: TimerProps) => {
  const [time, setTime] = useState<string>(initialTime);

  useEffect(() => {
    let interval: number | undefined;

    if (start) {
      const startTime = new Date().getTime();
      interval = setInterval(() => {
        const currentTime = Math.floor(
          (new Date().getTime() - startTime) / 1000,
        );
        const mm = String(Math.floor(currentTime / 60)).padStart(2, '0');
        const ss = String(currentTime % 60).padStart(2, '0');
        setTime(`${mm}:${ss}`);
      }, 1000);
    }

    if (reset) {
      clearInterval(interval);
      setTime(initialTime);
    }

    return () => {
      clearInterval(interval);
    };
  }, [start, reset]);

  return <span>{time}</span>;
};

export default Timer;
