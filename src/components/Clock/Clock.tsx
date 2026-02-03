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

    setTime(formatTime());


    const timer = setInterval(() => {
      setTime(formatTime());
    }, 5000);


    return () => clearInterval(timer);
  }, []);

  return <h4>{time}</h4>;
};

export default LiveClock;
