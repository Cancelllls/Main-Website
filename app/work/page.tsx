"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Activity, Shield, Cpu, BarChart2 } from "lucide-react";

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.7, delay, ease: [0.25, 0.4, 0.25, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function ProjectPage() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden mb-20 bg-[#111] border border-[#222]"
      >
        <motion.div 
          style={{ y }} 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
        
        <div className="absolute bottom-10 left-10 right-10">
          <div className="flex flex-wrap gap-3 mb-4">
            {["Next.js", "Python", "FastAPI", "WebSockets"].map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium tracking-wide">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">Live Market Bot</h1>
          <p className="text-xl text-gray-300 max-w-2xl font-light">An advanced cryptocurrency algorithmic trading engine with real-time Robinhood-style analytics dashboard.</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-12">
          <FadeIn>
            <h2 className="text-2xl font-semibold text-white mb-4">The Challenge</h2>
            <p className="text-gray-400 leading-relaxed text-lg">
              The goal was to build a highly optimized, extremely fast algorithmic trading bot capable of making split-second decisions using advanced mathematical models (like Bayesian Optimization). The system needed to process massive amounts of candlestick data via WebSockets and present it securely on a beautiful, ultra-responsive dashboard.
            </p>
          </FadeIn>

          <FadeIn>
            <h2 className="text-2xl font-semibold text-white mb-4">The Solution</h2>
            <p className="text-gray-400 leading-relaxed text-lg mb-6">
              I architected a dual-stack solution. The backend is a robust Python FastAPI engine deployed via Docker, handling secure Apex API connections, AI Insights generation, and real-time ledger tracking. 
            </p>
            <p className="text-gray-400 leading-relaxed text-lg">
              The frontend is a blazing-fast Next.js application that leverages custom charting libraries and fluid animations to give users a premium, Robinhood-esque experience with instantaneous theming and live data updates.
            </p>
          </FadeIn>

          <FadeIn>
            <h2 className="text-2xl font-semibold text-white mb-6">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Real-time AI Insights", icon: Activity, desc: "Live feed of algorithmic decisions and confidence scores." },
                { title: "Secure Key Management", icon: Shield, desc: "Enterprise-grade environment variable injection." },
                { title: "Bayesian Tuning", icon: Cpu, desc: "Automated hyperparameter optimization via Optuna." },
                { title: "Dynamic Charting", icon: BarChart2, desc: "Responsive SVGs with auto-adjusting themes for Android/iOS." },
              ].map((feature, i) => (
                <div key={i} className="p-6 bg-[#111] rounded-2xl border border-[#222]">
                  <feature.icon className="w-6 h-6 text-blue-400 mb-4" />
                  <h3 className="text-white font-medium mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

        <div className="space-y-8">
          <FadeIn delay={0.2} className="p-8 bg-[#111] rounded-3xl border border-[#222]">
            <h3 className="text-white font-medium mb-6">Project Details</h3>
            
            <div className="space-y-4">
              <div>
                <span className="block text-sm text-gray-500 mb-1">Role</span>
                <span className="text-gray-300">Lead Full Stack Developer</span>
              </div>
              <div className="h-px w-full bg-[#222]" />
              <div>
                <span className="block text-sm text-gray-500 mb-1">Client</span>
                <span className="text-gray-300">Internal IP</span>
              </div>
              <div className="h-px w-full bg-[#222]" />
              <div>
                <span className="block text-sm text-gray-500 mb-1">Timeline</span>
                <span className="text-gray-300">2026 - Present</span>
              </div>
            </div>

            <a href="https://market.cancellls.com" target="_blank" rel="noreferrer" className="mt-8 w-full py-4 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 group">
              View Live Dashboard <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
