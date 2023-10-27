import { useState, useEffect, useRef } from 'react';

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const startTimeRef = useRef(null);
  const rafIdRef = useRef(null);

  const updateTimer = () => {
    const elapsedTime = performance.now() - startTimeRef.current;
    setSeconds(Math.floor(elapsedTime / 1000));

    rafIdRef.current = requestAnimationFrame(updateTimer);
  };

  const start = () => {
    if (!running) {
      startTimeRef.current = performance.now();
      setRunning(true);
      requestAnimationFrame(updateTimer);
    }
  };

  const stop = () => {
    if (running) {
      setRunning(false);
      cancelAnimationFrame(rafIdRef.current);
    }
  };

  useEffect(() => {
    return () => {
      // Очистка при размонтировании компонента
      cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  return (
    <div>
      <p>Прошло времени: {seconds} сек.</p>
      <button onClick={start}>Старт</button>
      <button onClick={stop}>Стоп</button>
    </div>
  );
};

export default Timer;
