"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Award, BookOpen, Coffee } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 max-w-4xl mx-auto">
      <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-8">
          Hello, I'm <span className="text-blue-500">Cancellls.</span>
        </h1>
        
        <div className="prose prose-invert prose-lg max-w-none text-gray-400">
          <p className="lead text-2xl text-gray-300 font-light mb-12 leading-relaxed">
            I am a Senior Software Engineer specializing in highly scalable backend architectures, real-time algorithmic trading engines, and stunning, pixel-perfect frontend experiences.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-blue-500" /> My Philosophy
              </h2>
              <p className="leading-relaxed">
                Code is poetry. I believe that a truly senior programmer doesn't just make things work—they make things beautiful, maintainable, and remarkably fast. I bridge the gap between heavy mathematical algorithms and sleek, intuitive user interfaces.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                <Award className="w-6 h-6 text-blue-500" /> Core Tech Stack
              </h2>
              <ul className="space-y-3">
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Next.js & React (Framer Motion, Tailwind)</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Python & FastAPI (Machine Learning, Optuna)</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> WebSockets & Real-time Data Streaming</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Docker & Coolify Deployments</li>
              </ul>
            </div>
          </div>

          <div className="p-8 bg-[#111] rounded-3xl border border-[#222] flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
                <Coffee className="w-5 h-5 text-blue-500" /> Let's build something great.
              </h3>
              <p className="text-gray-400">Always open to discussing new challenges and complex system architectures.</p>
            </div>
            <a href="mailto:contact@cancellls.com" className="px-8 py-4 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-colors whitespace-nowrap">
              Get in Touch
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
