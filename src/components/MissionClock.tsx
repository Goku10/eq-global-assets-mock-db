import React, { useState, useEffect } from 'react';

export const MissionClock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const formatDate = (date: Date) => {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  return (
    <div className="text-right">
      <div className="mission-clock text-[#00d9ff] text-lg">
        {formatTime(time)} UTC
      </div>
      <div className="text-[#00d9ff] text-xs opacity-70 tracking-widest">
        {formatDate(time)}
      </div>
    </div>
  );
};
