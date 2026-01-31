import React, { useState, useEffect } from 'react';

const LiveClock: React.FC = () => {
  const [time, setTime] = useState<string>('');

  const formatTime = () => {
    return new Date().toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).toLowerCase().replace(/\s/g, '');
  };

  useEffect(() => {
    // 1. Set the initial time immediately
    setTime(formatTime());

    // 2. Set up an interval to update every minute (60000ms)
    const timer = setInterval(() => {
      setTime(formatTime());
    }, 5000);

    // 3. Clean up the interval on unmount to prevent memory leaks
    return () => clearInterval(timer);
  }, []);

  return <h4>{time}</h4>;
};

export default LiveClock;
