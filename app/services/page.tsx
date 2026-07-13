"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Code2, Layout, Smartphone, Database, Globe, Cpu } from "lucide-react";

const ServiceCard = ({ 
  title, 
  description, 
  icon: Icon, 
  delay = 0 
}: { 
  title: string; 
  description: string; 
  icon: React.ElementType; 
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay, type: "spring", stiffness: 100 }}
    className="p-8 bg-white/50 dark:bg-[#111]/50 backdrop-blur-md rounded-3xl border border-gray-200 dark:border-[#222] hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-colors shadow-sm group"
  >
    <div className="w-14 h-14 rounded-full bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
      <Icon className="w-7 h-7 text-blue-500" />
    </div>
    <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">{description}</p>
  </motion.div>
);

export default function ServicesPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 max-w-7xl mx-auto relative z-10 bg-transparent">
      <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors mb-12">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-20 text-center md:text-left"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-gray-900 dark:text-white mb-6">
          Premium <span className="text-blue-500">Services.</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 font-light">
          Don&apos;t just build another app. Build a premium digital experience that your users will fall in love with. Let&apos;s build the future together.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ServiceCard 
          title="Frontend Architecture"
          description="Crafting pixel-perfect, highly animated, and fully responsive user interfaces using Next.js, React, Tailwind CSS, and Framer Motion."
          icon={Layout}
          delay={0.1}
        />
        <ServiceCard 
          title="Backend Engineering"
          description="Designing robust, distributed server architectures. Building secure RESTful and GraphQL APIs using Python (FastAPI), Node.js, and Golang."
          icon={Database}
          delay={0.2}
        />
        <ServiceCard 
          title="Algorithmic Trading Bots"
          description="Developing complex trading engines with WebSockets, real-time data streaming, and Bayesian hyperparameter tuning."
          icon={Cpu}
          delay={0.3}
        />
        <ServiceCard 
          title="Mobile Development"
          description="Delivering seamless, native-like cross-platform mobile experiences for iOS and Android using React Native and Flutter."
          icon={Smartphone}
          delay={0.4}
        />
        <ServiceCard 
          title="Web3 & Crypto Solutions"
          description="Building decentralized applications (dApps), smart contracts, and seamless integrations with modern blockchain protocols."
          icon={Code2}
          delay={0.5}
        />
        <ServiceCard 
          title="DevOps & Deployment"
          description="Setting up zero-downtime CI/CD pipelines, container orchestration with Docker, and managing self-hosted infrastructure using Coolify."
          icon={Globe}
          delay={0.6}
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-24 p-12 bg-blue-600 rounded-3xl text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to start your next project?</h2>
        <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">Let's collaborate to build something extraordinary. I'm currently taking on new clients for Q3.</p>
        <a href="mailto:contact@cancellls.com" className="inline-flex px-8 py-4 bg-white text-blue-600 font-bold rounded-full hover:bg-gray-100 transition-colors shadow-lg">
          Contact Me Today
        </a>
      </motion.div>
    </div>
  );
}
