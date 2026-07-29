import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Command, Mail } from 'lucide-react';
import { Button } from '../ui/Button';
import { getLenis } from '../../lib/lenis';

export const TopNavbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  // Shrink the navbar width and padding slightly when scrolling
  const navWidth = useTransform(scrollY, [0, 100], ['100%', '95%']);
  const navPadding = useTransform(scrollY, [0, 100], ['1rem', '0.5rem']);
  const navTop = useTransform(scrollY, [0, 100], ['0px', '16px']);
  const navBorderRadius = useTransform(scrollY, [0, 100], ['0px', '24px']);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', path: '#hero' },
    { label: 'Projects', path: '#projects' },
    { label: 'Experience', path: '#experience' },
    { label: 'Skills', path: '#skills' },
    { label: 'Contact', path: '#contact' },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();

    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(path, { offset: 0 });
      return;
    }

    const element = document.querySelector(path);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (path === '#contact') {
       window.location.href = 'mailto:yeswanthkumarkaluva@gmail.com';
    }
  };

  return (
    <motion.header
      style={{
        width: navWidth,
        top: navTop,
        borderRadius: navBorderRadius,
      }}
      className={`fixed left-1/2 -translate-x-1/2 z-40 transition-colors duration-300 ${
        scrolled 
          ? 'bg-slate-950/70 backdrop-blur-xl border border-white/10 shadow-glass' 
          : 'bg-transparent border-transparent'
      }`}
    >
      <motion.div 
        style={{ padding: navPadding }}
        className="px-4 sm:px-6 flex items-center justify-between font-mono text-xs text-slate-300 select-none mx-auto max-w-7xl w-full"
      >
        {/* Left: Logo */}
        <div className="flex items-center gap-4">
          <a href="#hero" onClick={(e) => handleScrollTo(e, '#hero')} className="font-display font-bold text-white flex items-center gap-2 hover:text-auroraBlue transition-colors group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-auroraBlue to-tealAccent flex items-center justify-center shadow-lg group-hover:shadow-auroraGlow transition-shadow">
              <Command className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm hidden sm:block tracking-wide">YK.</span>
          </a>
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-white/5 border border-white/5">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.path}
              onClick={(e) => handleScrollTo(e, link.path)}
              className="px-4 py-2 rounded-full transition-all duration-300 text-slate-400 hover:text-white hover:bg-white/5"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: CTA */}
        <div className="flex items-center gap-3">
          <Button 
            variant="primary" 
            size="sm" 
            magnetic={false} 
            rightIcon={<Mail className="w-3.5 h-3.5" />}
            onClick={() => window.location.href = 'mailto:yeswanthkumarkaluva@gmail.com'}
          >
            Hire Me
          </Button>
        </div>
      </motion.div>
    </motion.header>
  );
};

export default TopNavbar;
