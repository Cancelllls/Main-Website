"use client";

import React, { useState, useEffect } from "react";
import { Activity, Cpu, Server, Clock } from "lucide-react";

const LiveMetrics = () => {
  const [time, setTime] = useState(new Date());
  const [memoryLeak, setMemoryLeak] = useState(0);
  const [connections, setConnections] = useState(0);

  useEffect(() => {
    const timeInterval = setInterval(() => setTime(new Date()), 10);
    const metricsInterval = setInterval(() => {
      setMemoryLeak(Math.floor(Math.random() * 500) + 50);
      setConnections(Math.floor(Math.random() * 90) + 10);
    }, 2000);

    return () => {
      clearInterval(timeInterval);
      clearInterval(metricsInterval);
    };
  }, []);

  const formatTime = (date: Date) => {
    const hh = String(date.getHours()).padStart(2, "0");
    const mm = String(date.getMinutes()).padStart(2, "0");
    const ss = String(date.getSeconds()).padStart(2, "0");
    const ms = String(date.getMilliseconds()).padStart(3, "0").slice(0, 2);
    return `${hh}:${mm}:${ss}:${ms}`;
  };

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-6 text-[10px] font-mono tracking-widest text-white/40 uppercase">
      <div className="flex items-center gap-3 border border-white/5 bg-[#0a0a0a] px-3 py-1.5 rounded-sm">
        <Server className="w-3 h-3 text-[#00FF41]" />
        <span className="font-bold">SERVER_NODE:</span>
        <span className="text-[#00FF41] font-black">BORG_EL_ARAB_EG_01</span>
        <div className="w-2 h-2 rounded-full bg-[#00FF41] animate-pulse shadow-[0_0_5px_#00FF41]" />
      </div>

      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <Activity className="w-3 h-3 text-[#FF003C]" />
          <span className="opacity-50">MEM_LEAK:</span>
          <span className="text-white/80 font-bold">{memoryLeak}MB</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Cpu className="w-3 h-3 text-[#00FF41]" />
          <span className="opacity-50">CONNECTIONS:</span>
          <span className="text-white/80 font-bold">{connections}</span>
        </div>

        <div className="flex items-center gap-2 border-l border-white/10 pl-4">
          <Clock className="w-3 h-3 text-white/40" />
          <span className="opacity-50">LOCAL_TIME:</span>
          <span className="text-white font-bold tracking-[0.2em]">{formatTime(time)}</span>
        </div>
      </div>
    </div>
  );
};

export default LiveMetrics;
