"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Award, BookOpen, Coffee, Code2, Globe, Server, CheckCircle2, Star } from "lucide-react";
import { LogoSVG } from "@/components/ui/LoadingScreen";

const FadeIn = ({ children, delay = 0, className = "" }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay, ease: [0.25, 0.4, 0.25, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function AboutPage() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 max-w-5xl mx-auto relative z-10 bg-transparent overflow-hidden">
      
      {/* Decorative background element */}
      <motion.div style={{ y }} className="absolute top-40 -right-20 opacity-10 dark:opacity-20 blur-sm pointer-events-none">
        <LogoSVG className="w-[500px] h-[500px]" />
      </motion.div>

      <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors mb-12 font-medium">
        <ArrowLeft className="w-5 h-5" /> Back to Home
      </Link>

      <FadeIn>
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-gray-900 dark:text-white mb-8">
          The <span className="text-blue-500">Mastermind.</span>
        </h1>
        <p className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 font-light mb-16 leading-relaxed max-w-3xl">
          I am Cancellls, a Senior Software Engineer specializing in ultra-fast backend architectures, real-time algorithmic systems, and pixel-perfect UI.
        </p>
      </FadeIn>
      
      <div className="space-y-24">
        {/* Section 1: Philosophy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <FadeIn delay={0.1}>
            <div className="p-10 bg-white/60 dark:bg-[#111]/60 backdrop-blur-xl rounded-[2rem] border border-gray-200 dark:border-[#222] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-[50px]" />
              <BookOpen className="w-12 h-12 text-blue-500 mb-8" />
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Code as Poetry</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                I believe that a truly senior programmer doesn't just make things work—they make things beautiful, maintainable, and remarkably fast. I obsess over micro-interactions just as much as I obsess over O(1) time complexities.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.2} className="space-y-6 text-lg text-gray-700 dark:text-gray-300 font-medium">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">What Sets Me Apart</h3>
            <div className="flex items-start gap-4">
              <CheckCircle2 className="w-8 h-8 text-blue-500 shrink-0" />
              <p><strong>Holistic Understanding:</strong> I build the whole stack. From setting up the Docker infrastructure to animating the final CSS keyframes.</p>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle2 className="w-8 h-8 text-blue-500 shrink-0" />
              <p><strong>Performance Obsessed:</strong> No sluggish rendering. I optimize React renders, bundle sizes, and database queries aggressively.</p>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle2 className="w-8 h-8 text-blue-500 shrink-0" />
              <p><strong>Design Aesthetic:</strong> Code is useless if the user doesn't love using it. I deliver Apple-level premium designs.</p>
            </div>
          </FadeIn>
        </div>

        {/* Section 2: Tech Stack */}
        <FadeIn>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-10 text-center">My Tech Arsenal</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Frontend", icon: Code2, tools: ["Next.js", "React", "Framer Motion", "Tailwind CSS", "Zustand"] },
              { title: "Backend", icon: Server, tools: ["Python", "FastAPI", "Node.js", "PostgreSQL", "Redis"] },
              { title: "DevOps", icon: Globe, tools: ["Docker", "Coolify", "AWS", "GitHub Actions", "Nginx"] }
            ].map((stack, i) => (
              <div key={i} className="p-8 bg-white/60 dark:bg-[#111]/60 backdrop-blur-md rounded-3xl border border-gray-200 dark:border-[#222] shadow-lg hover:-translate-y-2 transition-transform">
                <stack.icon className="w-10 h-10 text-blue-500 mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{stack.title}</h3>
                <ul className="space-y-4">
                  {stack.tools.map((tool, j) => (
                    <li key={j} className="flex items-center gap-3 text-gray-600 dark:text-gray-400 font-medium">
                      <div className="w-2 h-2 rounded-full bg-blue-500" /> {tool}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Section 3: CTA */}
        <FadeIn>
          <div className="p-16 bg-blue-600 rounded-[3rem] text-center shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
            <h3 className="text-4xl font-black text-white mb-6 relative z-10">Let's build something great.</h3>
            <p className="text-blue-100 text-xl mb-10 font-medium max-w-2xl mx-auto relative z-10">Always open to discussing new challenges, massive system architectures, or just geeking out over code.</p>
            <a href="mailto:contact@cancellls.com" className="relative z-10 inline-flex px-10 py-5 bg-white text-blue-600 font-bold rounded-full hover:scale-105 transition-transform shadow-xl text-lg">
              Get in Touch Today
            </a>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
