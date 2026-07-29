import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { ArrowRight, Download, Mail, ChevronDown, Sparkles, Server, Database, Code2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { GlassProfileCard } from '../ui/GlassProfileCard';
import { FloatingTechBadges } from '../ui/FloatingTechBadges';

export const HeroSection: React.FC = () => {
  const titles = [
    'Software Engineer',
    'Backend Engineer',
    'Full Stack Developer',
    'Problem Solver',
    'Node.js Developer'
  ];

  const [titleIdx, setTitleIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIdx((prev) => (prev + 1) % titles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [titles.length]);

  return (
    <section id="hero" className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-center relative select-none">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

        {/* LEFT COLUMN: Identity & Call-to-Actions */}
        <div className="lg:col-span-7 space-y-6 text-left relative z-10">
          
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="blue" icon={<Sparkles className="w-3.5 h-3.5" />}>
              Final Year B.Tech Computer Science (Data Science)
            </Badge>
          </motion.div>

          {/* Headline & Smooth Title Cycler */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-2"
          >
            <p className="font-mono text-sm sm:text-base text-slate-400">
              Hello, I'm
            </p>

            <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-gradient">
              Yeswanth Kumar Kaluva
            </h1>

            {/* Rotating Title */}
            <div className="h-10 sm:h-12 flex items-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={titles[titleIdx]}
                  initial={{ y: 20, opacity: 0, filter: 'blur(4px)' }}
                  animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                  exit={{ y: -20, opacity: 0, filter: 'blur(4px)' }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display text-xl sm:text-3xl font-semibold text-auroraBlue"
                >
                  {titles[titleIdx]}
                </motion.p>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Professional Bio */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-sans"
          >
            Specialized in designing enterprise Node.js microservices, scalable REST APIs, relational MySQL schemas, and full-stack React applications. Final year B.Tech CS student with 3 software engineering internships.
          </motion.p>

          {/* Tech Badges Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-wrap gap-2 pt-1"
          >
            <span className="px-3 py-1 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-300 font-mono text-xs flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5" /> Node.js & Express
            </span>
            <span className="px-3 py-1 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 font-mono text-xs flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5" /> MySQL & Transactions
            </span>
            <span className="px-3 py-1 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-300 font-mono text-xs flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5" /> React & Flask
            </span>
          </motion.div>

          {/* 3 Premium Buttons (Primary, Secondary, Ghost) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-3 pt-3"
          >
            <Button 
              variant="gradient" 
              size="lg" 
              rightIcon={<ArrowRight className="w-4 h-4" />}
              onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Projects
            </Button>

            <a href="/resume.pdf" download="Yeswanth_Resume.pdf">
              <Button variant="glass" size="lg" leftIcon={<Download className="w-4 h-4 text-tealAccent" />}>
                Download Resume
              </Button>
            </a>

            <Button 
              variant="ghost" 
              size="lg" 
              leftIcon={<Mail className="w-4 h-4 text-auroraBlue" />}
              onClick={() => window.location.href = 'mailto:yeswanthkumarkaluva@gmail.com'}
            >
              Contact Me
            </Button>
          </motion.div>

        </div>

        {/* RIGHT COLUMN: Futuristic Glass Profile Card + Floating Icons */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
          <FloatingTechBadges />
          <GlassProfileCard />
        </div>

      </div>

      {/* BOTTOM SCROLL INDICATOR */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-400 font-mono text-xs cursor-pointer hover:text-white transition-colors"
        onClick={() => {
          window.scrollTo({ top: window.innerHeight * 0.8, behavior: 'smooth' });
        }}
      >
        <span>Scroll to Explore</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-auroraBlue" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
