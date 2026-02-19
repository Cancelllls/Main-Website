"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const terminalLines = [
  "INITIALIZING_SYSTEM_CORE... [OK]",
  "MOUNTING_DRIVES... [OK]",
  "BYPASSING_FIREWALL... [FAILED]",
  "RETRYING_CONNECTION... [OK]",
  "ENCRYPTION_LAYER_ACTIVE [AES-256]",
  "SCANNING_RETINA_DATA... [MATCH]",
  "DECRYPTING_USER_ACCESS... [SUCCESS]",
  "ESTABLISHING_UPLINK_TO_MAIN_HUB..."
];

const BootSequence = ({ onComplete }: { onComplete: () => void }) => {
  const [lines, setLines] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Hydration safe check for session storage
    const hasBooted = sessionStorage.getItem("system_booted");
    
    if (hasBooted === "true") {
      onComplete();
      return;
    }

    setShouldRender(true);

    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < terminalLines.length) {
        setLines(prev => [...prev, terminalLines[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
        sessionStorage.setItem("system_booted", "true");
        setTimeout(() => setIsFinished(true), 500);
        setTimeout(() => onComplete(), 1000);
      }
    }, 250);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (!shouldRender) return null;

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "brightness(2)" }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-start justify-center p-8 md:p-20 font-mono text-[#00FF41] overflow-hidden"
        >
          <div className="space-y-1">
            {lines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-[10px] md:text-xs tracking-widest uppercase flex gap-4"
              >
                <span className="opacity-40">[{i.toString().padStart(2, '0')}]</span>
                <span>{line}</span>
              </motion.div>
            ))}
            <motion.div
              animate={{ opacity: [0, 1] }}
              transition={{ repeat: Infinity, duration: 0.5 }}
              className="inline-block w-2 h-4 bg-[#00FF41] mt-2"
            />
          </div>
          
          <div className="absolute bottom-8 right-8 text-[9px] text-[#00FF41]/30 tracking-[0.5em] uppercase">
            SYSTEM_OVERRIDE_VER_4.0.2 // CANCELLLS_NETWORK
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BootSequence;
