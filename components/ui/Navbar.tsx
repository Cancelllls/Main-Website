"use client";

import React from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { LogoSVG } from "./LoadingScreen";

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md border-b border-gray-200 dark:border-[#222] transition-colors">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <LogoSVG className="w-10 h-10 group-hover:scale-105 transition-transform duration-300" />
          <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            Cancellls
          </span>
        </Link>
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-600 dark:text-gray-400">
          <Link href="/services" className="hover:text-black dark:hover:text-white transition-colors">Services</Link>
          <Link href="/work" className="hover:text-black dark:hover:text-white transition-colors">Work</Link>
          <Link href="/about" className="hover:text-black dark:hover:text-white transition-colors">About</Link>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link 
            href="#contact" 
            className="px-5 py-2.5 bg-black dark:bg-white text-white dark:text-black text-sm font-medium rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
          >
            Let's Talk
          </Link>
        </div>
      </div>
    </nav>
  );
}
