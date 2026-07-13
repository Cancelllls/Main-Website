"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  ArrowRight,
  Code2,
  Layout,
  Smartphone,
  Globe,
  Mail,
  Github,
  Linkedin
} from "lucide-react";

const ServiceCard = ({ 
  title, 
  description, 
  icon: Icon, 
  delay = 0 
}: { 
  title: string; 
  description: string; 
  icon: any; 
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="group relative p-8 bg-[#111] border border-[#222] rounded-2xl hover:border-blue-500/50 transition-colors"
    >
      <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        <Icon className="w-6 h-6 text-blue-400" />
      </div>
      <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </motion.div>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ededed] font-sans selection:bg-blue-500/30">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-[#222]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-xl font-bold tracking-tight text-white">
            Cancellls<span className="text-blue-500">.</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
            <Link href="#services" className="hover:text-white transition-colors">Services</Link>
            <Link href="#work" className="hover:text-white transition-colors">Work</Link>
            <Link href="#about" className="hover:text-white transition-colors">About</Link>
          </div>
          <Link 
            href="#contact" 
            className="px-5 py-2.5 bg-white text-black text-sm font-medium rounded-full hover:bg-gray-200 transition-colors"
          >
            Let's Talk
          </Link>
        </div>
      </nav>

      <main className="pt-32">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 py-20 md:py-32 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#111] border border-[#222] text-sm text-gray-300 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            Available for new projects
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white max-w-4xl leading-[1.1]"
          >
            Crafting Digital <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Experiences.
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-8 text-lg md:text-xl text-gray-400 max-w-2xl font-light leading-relaxed"
          >
            I build high-end, scalable, and beautifully designed web applications. 
            Transforming complex problems into elegant, professional solutions.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-12 flex flex-col sm:flex-row gap-4"
          >
            <Link 
              href="#contact" 
              className="px-8 py-4 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              Start a Project <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              href="#work" 
              className="px-8 py-4 bg-[#111] border border-[#333] text-white font-medium rounded-full hover:bg-[#222] transition-colors flex items-center justify-center"
            >
              View Work
            </Link>
          </motion.div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 bg-[#050505]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-16 md:mb-24">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">My Expertise</h2>
              <p className="text-gray-400 text-lg max-w-2xl">
                Comprehensive digital solutions tailored for modern businesses and startups.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ServiceCard 
                title="Frontend Development"
                description="Building responsive, accessible, and highly interactive user interfaces using React, Next.js, and Tailwind CSS."
                icon={Layout}
                delay={0.1}
              />
              <ServiceCard 
                title="Backend Architecture"
                description="Designing robust, scalable server-side solutions and APIs using Node.js, Python, and modern databases."
                icon={Code2}
                delay={0.2}
              />
              <ServiceCard 
                title="Mobile Applications"
                description="Creating seamless cross-platform mobile experiences for iOS and Android using modern frameworks."
                icon={Smartphone}
                delay={0.3}
              />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer id="contact" className="py-12 border-t border-[#222] bg-[#0a0a0a]">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-xl font-bold text-white">
              Cancellls<span className="text-blue-500">.</span>
            </div>
            <div className="flex items-center gap-6 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Cancellls. All rights reserved.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
