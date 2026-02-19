"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  ArrowUpRight, 
  Shield, 
  Info, 
  FileText, 
  LayoutGrid, 
  Terminal, 
  Activity, 
  Lock 
} from "lucide-react";
import GlitchHeader from "@/components/ui/GlitchHeader";
import BootSequence from "@/components/ui/BootSequence";
import LiveMetrics from "@/components/ui/LiveMetrics";
import InteractiveCLI from "@/components/ui/InteractiveCLI";
import { useCyberAudio } from "@/hooks/useCyberAudio";

const NavCard = ({ 
  href, 
  title, 
  subtitle, 
  icon: Icon, 
  className = "", 
  delay = 0 
}: { 
  href: string; 
  title: string; 
  subtitle: string; 
  icon: any; 
  className?: string;
  delay?: number;
}) => {
  const { playClick } = useCyberAudio();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className={`group relative ${className}`}
      onMouseEnter={playClick}
    >
      <Link href={href} className="block h-full cursor-none">
        <div className="h-full min-h-[160px] bg-[#080808] border border-[#1a1a1a] p-6 md:p-8 transition-all duration-300 md:hover:border-[#00FF41] md:hover:shadow-[0_0_30px_rgba(0,255,65,0.1)] flex flex-col justify-between relative overflow-hidden">
          {/* Subtle Background Icon */}
          <Icon className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 w-24 h-24 md:w-32 md:h-32 text-white/[0.03] md:group-hover:text-[#00FF41]/[0.05] transition-colors duration-500" />
          
          <div className="relative z-10 flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[#00FF41] font-mono text-[9px] md:text-[10px] tracking-[0.4em] font-bold uppercase opacity-60 md:group-hover:opacity-100 transition-opacity">
                {subtitle}
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter uppercase md:group-hover:text-[#00FF41] transition-colors">
                {title}
              </h2>
            </div>
            <div className="bg-white/5 p-2 border border-white/10 md:group-hover:border-[#00FF41]/30 transition-all">
              <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 md:group-hover:text-[#00FF41] md:group-hover:translate-x-0.5 md:group-hover:-translate-y-0.5 transition-all" />
            </div>
          </div>

          <div className="relative z-10 mt-8 md:mt-12 flex items-center gap-4 text-white/20 md:group-hover:text-[#00FF41]/40 transition-colors">
            <Icon className="w-4 h-4 md:w-5 md:h-5" />
            <div className="h-px flex-1 bg-current opacity-20" />
            <span className="font-mono text-[8px] md:text-[9px] tracking-widest uppercase font-bold">ACCESS_NODE</span>
          </div>

          {/* Hover Glitch Line - Only on desktop */}
          <div className="hidden md:block absolute top-0 left-0 w-full h-[1px] bg-[#00FF41] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </div>
      </Link>
    </motion.div>
  );
};

export default function Home() {
  const [isBooted, setIsBooted] = useState(false);

  return (
    <>
      <BootSequence onComplete={() => setIsBooted(true)} />
      
      <div className={`min-h-screen bg-[#050505] text-white selection:bg-[#00FF41] selection:text-black relative overflow-x-hidden flex flex-col transition-opacity duration-1000 ${isBooted ? "opacity-100" : "opacity-0"}`}>
        {/* Visual Depth Gradients */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[60%] md:w-[40%] h-[40%] bg-[#00FF41]/[0.03] blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] md:w-[40%] h-[40%] bg-[#FF003C]/[0.03] blur-[120px] rounded-full" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
        </div>

        <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-6 py-12 md:py-20 relative z-10 flex flex-col gap-12 md:gap-20">
          {/* Top Section: Glitch Header */}
          <section className="flex flex-col items-center text-center space-y-4 md:space-y-6">
            <div className="scale-75 md:scale-100 origin-center">
              <GlitchHeader />
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isBooted ? 1 : 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap justify-center items-center gap-2 md:gap-4 font-mono text-[9px] md:text-[11px] tracking-[0.4em] text-white/40 uppercase"
            >
              <div className="flex items-center gap-2">
                <Activity className="w-3 h-3 text-[#00FF41]" />
                MAINFRAME_HUB_ACTIVE
              </div>
              <span className="hidden md:inline text-white/10">|</span>
              <div className="flex items-center gap-2">
                <Lock className="w-3 h-3 text-[#FF003C]" />
                SECURE_SESSION_v4.0.2
              </div>
            </motion.div>
          </section>

          {/* Middle Section: Responsive Bento Box Navigation Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-fr">
            <NavCard 
              href="/portal"
              title="SYSTEM_ROUTING"
              subtitle="PROTOCOL_0x01"
              icon={LayoutGrid}
              className="md:col-span-2 lg:row-span-2"
              delay={0.1}
            />
            <NavCard 
              href="/about"
              title="SYS.BIO"
              subtitle="PROTOCOL_0x02"
              icon={Info}
              className="lg:col-span-2"
              delay={0.2}
            />
            <NavCard 
              href="/privacy"
              title="SYS.PRIVACY"
              subtitle="PROTOCOL_0x03"
              icon={Shield}
              className="md:col-span-1"
              delay={0.3}
            />
            <NavCard 
              href="/terms"
              title="SYS.TERMS"
              subtitle="PROTOCOL_0x04"
              icon={FileText}
              className="md:col-span-1"
              delay={0.4}
            />
          </section>

          {/* Dynamic Metrics Section */}
          <section className="py-8 border-y border-white/5">
            <LiveMetrics />
          </section>

          {/* Decorative System Status */}
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "CPU_LOAD", value: "14%", color: "text-[#00FF41]" },
              { label: "NET_UPLINK", value: "STABLE", color: "text-[#00FF41]" },
              { label: "MEM_CACHE", value: "8.2GB", color: "text-white/40" },
              { label: "THREAT_LVL", value: "ZERO", color: "text-[#00FF41]" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="border border-[#1a1a1a] bg-[#0a0a0a] p-4 space-y-1"
              >
                <div className="text-[8px] md:text-[9px] font-mono text-white/30 tracking-widest uppercase">{stat.label}</div>
                <div className={`text-lg md:text-xl font-black tracking-tighter uppercase ${stat.color}`}>{stat.value}</div>
              </motion.div>
            ))}
          </section>
        </main>

        {/* Interactive CLI Layer */}
        <InteractiveCLI />

        {/* Bottom Section: Minimal Footer */}
        <footer className="w-full border-t border-[#1a1a1a] py-8 px-4 md:px-6 relative z-10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <Terminal className="w-4 h-4 text-[#00FF41]" />
              <span className="text-[9px] md:text-[10px] font-mono font-bold tracking-[0.4em] uppercase text-white/40 text-center md:text-left">
                SYSTEM_ONLINE // ENCRYPTED_CONNECTION
              </span>
            </div>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-[8px] md:text-[9px] font-mono tracking-[0.5em] text-white/20 uppercase">
              <span>LOC: BERLIN_DE</span>
              <span className="hidden xs:inline">UPLINK_001</span>
              <span>© 2024 CANCELLLS</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
