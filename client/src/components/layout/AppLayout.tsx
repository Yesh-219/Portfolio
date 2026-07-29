import React from 'react';
import { Outlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { TopNavbar } from './TopNavbar';
import { FloatingDock } from './FloatingDock';
import { Footer } from './Footer';
import { BackgroundContainer } from '../background/BackgroundContainer';
import { CustomCursor } from '../ui/CustomCursor';
import { useLenisSmoothScroll } from '../../lib/lenis';

export const AppLayout: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[#05070E] text-slate-100 font-sans selection:bg-auroraBlue/30 selection:text-white overflow-x-hidden">
      {/* 1. Custom Interactive Pointer & Glow */}
      <CustomCursor />

      {/* 2. WebGL Aurora Canvas Background Layers */}
      <BackgroundContainer />

      {/* 3. Top macOS Menu Bar */}
      <TopNavbar />

      {/* 4. Page Route View Container */}
      <main className="relative z-10 min-h-screen">
        <AnimatePresence mode="wait">
          <Outlet />
        </AnimatePresence>
      </main>

      {/* 5. Footer */}
      <Footer />

      {/* 6. macOS Bottom Floating Dock */}
      <FloatingDock />
    </div>
  );
};
