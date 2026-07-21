"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { 
  ArrowRight,
  Code2,
  Layout,
  Smartphone,
  Globe,
  Mail,
  Github,
  Linkedin,
  Terminal,
  Zap,
  Users,
  Star,
  CheckCircle2,
  ChevronRight
} from "lucide-react";
import { LogoSVG } from "@/components/ui/LoadingScreen";

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: [0.25, 0.4, 0.25, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

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
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, type: "spring", stiffness: 100 }}
      className="group relative p-8 bg-white/60 dark:bg-[#111]/60 backdrop-blur-xl border border-gray-200 dark:border-[#222] rounded-3xl hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all shadow-lg hover:shadow-xl dark:shadow-none hover:-translate-y-2"
    >
      <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-8 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
        <Icon className="w-7 h-7 text-blue-500 group-hover:text-white transition-colors" />
      </div>
      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">{description}</p>
      
      <Link href="/services" className="mt-8 inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold group-hover:gap-3 transition-all">
        Learn more <ArrowRight className="w-4 h-4" />
      </Link>
    </motion.div>
  );
};

const ContactForm = () => {
  const [status, setStatus] = React.useState('idle');
  const [formData, setFormData] = React.useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('https://mail.cancellls.com/api/mail/public-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (!res.ok) throw new Error('Failed to send');
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-12 bg-white/10 p-8 rounded-3xl backdrop-blur-md border border-white/20 text-left max-w-2xl mx-auto relative z-20">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-white text-sm font-bold mb-2">Name</label>
            <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-5 py-4 rounded-xl bg-black/20 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:border-white/50 transition-colors" placeholder="John Doe" />
          </div>
          <div>
            <label className="block text-white text-sm font-bold mb-2">Email</label>
            <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-5 py-4 rounded-xl bg-black/20 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:border-white/50 transition-colors" placeholder="john@example.com" />
          </div>
        </div>
        <div>
          <label className="block text-white text-sm font-bold mb-2">Message</label>
          <textarea required value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} rows={4} className="w-full px-5 py-4 rounded-xl bg-black/20 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:border-white/50 transition-colors resize-none" placeholder="Tell me about your project..."></textarea>
        </div>
        <button disabled={status === 'loading' || status === 'success'} type="submit" className="w-full py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-colors flex justify-center items-center gap-2 disabled:opacity-80">
          {status === 'loading' ? 'Sending...' : status === 'success' ? 'Message Sent!' : 'Send Message'}
        </button>
        {status === 'error' && <p className="text-red-300 text-sm text-center mt-2">Failed to send message. Please try again.</p>}
      </div>
    </form>
  )
};

export default function Home() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);

  return (
    <div className="min-h-screen bg-transparent font-sans overflow-hidden">
      <main className="relative">
        
        {/* Floating Background Icons */}
        <motion.div style={{ y: y2 }} className="absolute top-[15%] left-[5%] opacity-20 dark:opacity-30 blur-[2px] pointer-events-none hidden lg:block">
          <Code2 className="w-40 h-40 text-blue-500" />
        </motion.div>
        <motion.div style={{ y: y1 }} className="absolute top-[35%] right-[8%] opacity-20 dark:opacity-30 blur-[4px] pointer-events-none hidden lg:block">
          <Layout className="w-32 h-32 text-purple-500" />
        </motion.div>
        <motion.div style={{ y: y2, x: y1 }} className="absolute top-[60%] left-[10%] opacity-10 dark:opacity-20 blur-[1px] pointer-events-none hidden lg:block">
          <Terminal className="w-24 h-24 text-teal-500" />
        </motion.div>

        {/* Hero Section */}
        <section className="min-h-[90vh] max-w-7xl mx-auto px-6 pt-40 pb-20 flex flex-col items-center justify-center text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/80 dark:bg-[#111]/80 backdrop-blur-md border border-gray-200 dark:border-[#222] text-sm text-gray-800 dark:text-gray-200 mb-10 shadow-lg"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
            <span className="font-medium">Accepting new clients for Q3</span>
          </motion.div>
          
          <motion.div style={{ y: y1, opacity, scale }} className="relative z-10 w-full max-w-5xl">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-gray-900 dark:text-white leading-[1.05]"
            >
              Crafting Digital <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-500 drop-shadow-sm">
                Masterpieces.
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl font-light leading-relaxed mx-auto"
            >
              I build enterprise-grade, highly scalable, and beautifully designed web and mobile applications. Transforming complex problems into elegant, pixel-perfect solutions.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-14 flex flex-col sm:flex-row gap-5 justify-center items-center"
            >
              <Link 
                href="#contact" 
                className="w-full sm:w-auto px-10 py-5 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 hover:scale-105 transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-500/30 text-lg"
              >
                Start a Project <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                href="/work" 
                className="w-full sm:w-auto px-10 py-5 bg-white dark:bg-[#111] border-2 border-gray-200 dark:border-[#333] text-gray-900 dark:text-white font-semibold rounded-full hover:bg-gray-50 dark:hover:bg-[#222] hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-lg text-lg group"
              >
                <Code2 className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" /> View My Work
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* Quick Stats Section */}
        <section className="py-12 border-y border-gray-200 dark:border-[#222] bg-white/30 dark:bg-[#0a0a0a]/30 backdrop-blur-xl relative z-20">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-200 dark:divide-[#222]">
            <FadeIn delay={0.1}>
              <div className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-2">5+</div>
              <div className="text-sm font-medium text-gray-500 uppercase tracking-widest">Years Exp</div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-2">30+</div>
              <div className="text-sm font-medium text-gray-500 uppercase tracking-widest">Projects</div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-2">100%</div>
              <div className="text-sm font-medium text-gray-500 uppercase tracking-widest">Client Success</div>
            </FadeIn>
            <FadeIn delay={0.4}>
              <div className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-2">24/7</div>
              <div className="text-sm font-medium text-gray-500 uppercase tracking-widest">Support</div>
            </FadeIn>
          </div>
        </section>

        {/* About Teaser Section */}
        <section className="py-32 relative z-10 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
            <FadeIn className="flex-1 w-full relative">
              <div className="aspect-square max-w-md mx-auto relative">
                <div className="absolute inset-0 bg-blue-500 rounded-full blur-[100px] opacity-20 animate-pulse" />
                <div className="relative w-full h-full rounded-3xl bg-white dark:bg-[#111] border border-gray-200 dark:border-[#222] shadow-2xl overflow-hidden flex items-center justify-center p-12">
                  <LogoSVG className="w-full h-full drop-shadow-2xl hover:scale-110 transition-transform duration-700" />
                </div>
              </div>
            </FadeIn>
            <FadeIn className="flex-1 space-y-8" delay={0.2}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 font-semibold text-sm">
                <Zap className="w-4 h-4" /> About Me
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                Engineering <br/> <span className="text-blue-500">Beyond Limits.</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-light">
                I am a Senior Software Engineer specializing in highly scalable backend architectures and stunning, pixel-perfect frontend experiences. I bridge the gap between complex algorithms and beautiful UI.
              </p>
              <ul className="space-y-4 text-lg text-gray-700 dark:text-gray-300 font-medium">
                <li className="flex items-center gap-4"><CheckCircle2 className="text-blue-500 w-6 h-6" /> Full Stack Next.js & React</li>
                <li className="flex items-center gap-4"><CheckCircle2 className="text-blue-500 w-6 h-6" /> High-performance Python & FastAPI</li>
                <li className="flex items-center gap-4"><CheckCircle2 className="text-blue-500 w-6 h-6" /> Real-time WebSocket Data Streaming</li>
              </ul>
              <div className="pt-6">
                <Link href="/about" className="inline-flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition-colors group">
                  Read My Full Story <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-32 bg-gray-50/50 dark:bg-[#050505]/50 relative z-10 border-y border-gray-200 dark:border-[#222]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-20 text-center flex flex-col items-center">
              <FadeIn>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 font-semibold text-sm mb-6">
                  <Layout className="w-4 h-4" /> My Services
                </div>
                <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                  What I Bring To The Table
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-xl max-w-2xl mx-auto font-light">
                  Comprehensive, end-to-end digital solutions tailored for ambitious startups and enterprise clients.
                </p>
              </FadeIn>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ServiceCard 
                title="Frontend Architecture"
                description="Crafting pixel-perfect, highly animated, and fully responsive user interfaces using Next.js, React, Tailwind CSS, and Framer Motion."
                icon={Layout}
                delay={0.1}
              />
              <ServiceCard 
                title="Backend Engineering"
                description="Designing robust, distributed server architectures. Building secure RESTful and GraphQL APIs using Python and Node.js."
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

            <FadeIn delay={0.4} className="mt-20 text-center">
              <Link href="/services" className="inline-flex items-center gap-3 px-10 py-5 bg-white dark:bg-[#111] border-2 border-gray-200 dark:border-[#333] text-gray-900 dark:text-white font-bold rounded-full hover:bg-gray-50 dark:hover:bg-[#222] transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 text-lg">
                View All Services <ArrowRight className="w-5 h-5" />
              </Link>
            </FadeIn>
          </div>
        </section>

        {/* Featured Work Teaser */}
        <section className="py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <FadeIn>
              <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8">
                Featured Case Study
              </h2>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <div className="group relative w-full h-[500px] md:h-[600px] rounded-[3rem] overflow-hidden mt-16 shadow-2xl border border-gray-200 dark:border-[#222]">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                
                <div className="absolute inset-0 p-10 md:p-20 flex flex-col justify-end items-start text-left">
                  <div className="flex gap-3 mb-6">
                    <span className="px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-bold shadow-lg backdrop-blur-md">Next.js</span>
                    <span className="px-4 py-2 rounded-full bg-white/20 text-white text-sm font-bold shadow-lg backdrop-blur-md">Python AI</span>
                  </div>
                  <h3 className="text-4xl md:text-6xl font-black text-white mb-6">Live Market Bot</h3>
                  <p className="text-xl text-gray-200 max-w-2xl mb-10 font-light">
                    An advanced cryptocurrency algorithmic trading engine with a real-time analytics dashboard and Bayesian Optimization tuning.
                  </p>
                  <Link href="/work" className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors flex items-center gap-3">
                    Read Case Study <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Testimonials/CTA */}
        <section id="contact" className="py-32 relative z-10">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <FadeIn className="p-8 md:p-16 bg-blue-600 rounded-[3rem] shadow-2xl shadow-blue-500/20 overflow-hidden relative">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
              <div className="relative z-10">
                <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">Ready to build the future?</h2>
                <p className="text-blue-100 text-xl mb-10 max-w-2xl mx-auto font-light">
                  Let's collaborate to build something extraordinary. Fill out the form below and let's discuss your next big idea.
                </p>
                <ContactForm />
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Footer */}
        <footer id="contact" className="py-16 border-t border-gray-200 dark:border-[#222] bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl relative z-20">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-3">
              <LogoSVG className="w-8 h-8" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                Cancellls
              </div>
            </div>
            <div className="flex items-center gap-8 text-gray-500 dark:text-gray-400">
              <a href="#" className="hover:text-blue-500 transition-colors p-2 hover:bg-blue-500/10 rounded-full">
                <Github className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-blue-500 transition-colors p-2 hover:bg-blue-500/10 rounded-full">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="mailto:contact@cancellls.com" className="hover:text-blue-500 transition-colors p-2 hover:bg-blue-500/10 rounded-full">
                <Mail className="w-6 h-6" />
              </a>
            </div>
            <p className="text-sm font-medium text-gray-500">
              © {new Date().getFullYear()} Cancellls. All rights reserved.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
