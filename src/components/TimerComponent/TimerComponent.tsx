 
 import { useEffect, useRef, useState } from "react";
import type { TimerMode } from "../../types";
 
 const POMODORO_DURATION = 25 * 60; // 25 minutes in seconds
const SHORT_BREAK_DURATION = 5 * 60; // 5 minutes in seconds
const LONG_BREAK_DURATION = 15 * 60; // 15 minutes in seconds



 const PomodoroTimer = () => {
 
 const [secondsLeft, setSecondsLeft] = useState(POMODORO_DURATION);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<TimerMode>('pomodoro');
  const [cyclesCompleted, setCyclesCompleted] = useState(0);


  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  useEffect(() => {
    if (secondsLeft === 0) {
      clearInterval(intervalRef.current!);
      // In a real app, you might play a sound notification here
      handleNextMode();
    }
  }, [secondsLeft]);

  const handleNextMode = () => {
    if (mode === 'pomodoro') {
      const newCycles = cyclesCompleted + 1;
      setCyclesCompleted(newCycles);
      if (newCycles >= 4) {
        setMode('longBreak');
        setSecondsLeft(LONG_BREAK_DURATION);
        setCyclesCompleted(0);
      } else {
        setMode('shortBreak');
        setSecondsLeft(SHORT_BREAK_DURATION);
      }
    } else {
      setMode('pomodoro');
      setSecondsLeft(POMODORO_DURATION);
    }
    setIsRunning(false);
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setMode('pomodoro');
    setSecondsLeft(POMODORO_DURATION);
    setCyclesCompleted(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="pomodoro-app">
      <h1>Pomodoro Timer</h1>
      <div className={`timer-container ${mode}`}>
        <p className="mode-indicator">
          {mode === 'pomodoro' && 'Focus Time'}
          {mode === 'shortBreak' && 'Short Break'}
          {mode === 'longBreak' && 'Long Break'}
        </p>
        <div className="timer-display">{formatTime(secondsLeft)}</div>
        <div className="controls">
          <button onClick={toggleTimer}>
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button onClick={resetTimer}>Reset</button>
        </div>
      </div>
      <p>Cycles completed: {cyclesCompleted}</p>
    </div>
  );
};

export default PomodoroTimer;