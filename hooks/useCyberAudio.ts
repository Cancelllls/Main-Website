"use client";

import { useCallback, useRef, useEffect } from "react";

export const useCyberAudio = () => {
  const audioCtx = useRef<AudioContext | null>(null);

  useEffect(() => {
    // Initialize AudioContext on first user interaction if needed, 
    // but here we just provide the functions to call.
    return () => {
      if (audioCtx.current) {
        audioCtx.current.close();
      }
    };
  }, []);

  const initCtx = () => {
    if (!audioCtx.current) {
      audioCtx.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioCtx.current.state === "suspended") {
      audioCtx.current.resume();
    }
  };

  const playClick = useCallback(() => {
    initCtx();
    if (!audioCtx.current) return;
    
    const osc = audioCtx.current.createOscillator();
    const gain = audioCtx.current.createGain();
    
    osc.type = "square";
    osc.frequency.setValueAtTime(150, audioCtx.current.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, audioCtx.current.currentTime + 0.1);
    
    gain.gain.setValueAtTime(0.1, audioCtx.current.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.current.currentTime + 0.1);
    
    osc.connect(gain);
    gain.connect(audioCtx.current.destination);
    
    osc.start();
    osc.stop(audioCtx.current.currentTime + 0.1);
  }, []);

  const playBeep = useCallback(() => {
    initCtx();
    if (!audioCtx.current) return;
    
    const osc = audioCtx.current.createOscillator();
    const gain = audioCtx.current.createGain();
    
    osc.type = "sine";
    osc.frequency.setValueAtTime(880, audioCtx.current.currentTime);
    
    gain.gain.setValueAtTime(0.05, audioCtx.current.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.current.currentTime + 0.05);
    
    osc.connect(gain);
    gain.connect(audioCtx.current.destination);
    
    osc.start();
    osc.stop(audioCtx.current.currentTime + 0.05);
  }, []);

  return { playClick, playBeep };
};
