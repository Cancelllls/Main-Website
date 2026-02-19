"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Send, ChevronRight } from "lucide-react";
import { useCyberAudio } from "@/hooks/useCyberAudio";

interface LogEntry {
  type: "cmd" | "out" | "error";
  content: string;
}

const InteractiveCLI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [logs, setLogs] = useState<LogEntry[]>([
    { type: "out", content: "SYSTEM_ACCESS_TERMINAL_v4.0.2" },
    { type: "out", content: "TYPE 'help' FOR LIST OF COMMANDS" }
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { playBeep } = useCyberAudio();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    const newLogs: LogEntry[] = [...logs, { type: "cmd", content: input }];
    playBeep();

    switch (cmd) {
      case "help":
        newLogs.push({ type: "out", content: "AVAILABLE_COMMANDS: help, whoami, clear, status, network" });
        break;
      case "whoami":
        newLogs.push({ type: "out", content: "ID: CANCELLLS // SENIOR_CREATIVE_ARCHITECT // [REDACTED]_DATA_SPECIALIST" });
        break;
      case "clear":
        setLogs([{ type: "out", content: "SYSTEM_LOGS_PURGED." }]);
        setInput("");
        return;
      case "status":
        newLogs.push({ type: "out", content: "ALL_SYSTEMS_NOMINAL // UPLINK_STABLE // NO_INTRUSIONS_DETECTED" });
        break;
      case "network":
        newLogs.push({ type: "out", content: "IP: [MASKED] // PROTOCOL: SECURE_SSH // HUB: BERLIN_DE_01" });
        break;
      default:
        newLogs.push({ type: "error", content: `COMMAND_NOT_RECOGNIZED: '${cmd}'` });
    }

    setLogs(newLogs);
    setInput("");
  };

  return (
    <div className={`fixed bottom-0 right-0 z-50 p-4 transition-all duration-500 ${isOpen ? "w-full md:w-[600px]" : "w-auto"}`}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "400px" }}
            exit={{ opacity: 0, y: 20, height: 0 }}
            className="bg-[#080808] border-2 border-[#1a1a1a] border-b-0 flex flex-col overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.5)]"
          >
            {/* Terminal Header */}
            <div className="bg-[#1a1a1a] p-3 flex items-center justify-between border-b border-[#333]">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#00FF41]" />
                <span className="text-[10px] font-mono font-black tracking-widest text-white/50 uppercase">ROOT@CANCELLLS:~$</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-[10px] text-white/30 hover:text-white transition-colors"
              >
                [MINIMIZE]
              </button>
            </div>

            {/* Terminal Output */}
            <div 
              ref={scrollRef}
              className="flex-1 p-4 font-mono text-xs overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-[#1a1a1a] scrollbar-track-transparent"
            >
              {logs.map((log, i) => (
                <div key={i} className={`flex gap-3 ${log.type === "error" ? "text-[#FF003C]" : log.type === "cmd" ? "text-white" : "text-[#00FF41]/80"}`}>
                  <span className="opacity-30 shrink-0">[{i.toString().padStart(2, '0')}]</span>
                  <span className="break-all">{log.type === "cmd" ? `> ${log.content}` : log.content}</span>
                </div>
              ))}
            </div>

            {/* Terminal Input */}
            <form onSubmit={handleCommand} className="p-4 bg-[#0a0a0a] border-t border-[#1a1a1a] flex items-center gap-3">
              <ChevronRight className="w-4 h-4 text-[#00FF41]" />
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                autoFocus
                className="bg-transparent border-none outline-none flex-1 text-white font-mono text-xs placeholder:text-white/10"
                placeholder="EXECUTE_COMMAND..."
              />
              <button type="submit" className="text-[#00FF41] opacity-50 hover:opacity-100 transition-opacity">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-3 bg-[#080808] border border-[#1a1a1a] px-6 py-3 text-[#00FF41] font-mono text-[10px] font-black tracking-[0.4em] uppercase hover:border-[#00FF41] hover:shadow-[0_0_20px_rgba(0,255,65,0.2)] transition-all"
        >
          <Terminal className="w-4 h-4" />
          OPEN_UPLINK
        </motion.button>
      )}
    </div>
  );
};

export default InteractiveCLI;
