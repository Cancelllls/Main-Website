"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function AnimatedBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="fixed inset-0 z-0 bg-[#0a0a0a]" />;

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#0a0a0a] pointer-events-none">
      {/* Dynamic Grid Background */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Glowing Orbs */}
      <motion.div
        animate={{
          x: [0, 100, 0, -100, 0],
          y: [0, 50, 100, 50, 0],
          scale: [1, 1.2, 1, 0.8, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[120px]"
      />
      
      <motion.div
        animate={{
          x: [0, -100, 0, 100, 0],
          y: [0, 100, 50, -50, 0],
          scale: [1, 0.8, 1, 1.2, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full bg-purple-600/10 blur-[120px]"
      />
      
      <motion.div
        animate={{
          x: [0, 50, -50, 0],
          y: [0, -100, 0, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -bottom-[20%] left-[20%] w-[60%] h-[40%] rounded-full bg-blue-400/5 blur-[100px]"
      />
      
      {/* Subtle Noise Texture Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.035] mix-blend-overlay" />
    </div>
  );
}
