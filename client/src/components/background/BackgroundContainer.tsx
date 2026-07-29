import React from 'react';
import AuroraCanvas from '../3d/AuroraCanvas';
import MouseSpotlight from '../ui/MouseSpotlight';

export const BackgroundContainer: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#05070E]">
      {/* 1. Three.js Aurora Mesh Canvas */}
      <AuroraCanvas />

      {/* 2. Floating Ambient Glow Orbs */}
      <div className="aurora-orb w-[500px] h-[500px] bg-blue-600 top-[-100px] left-[-100px] animate-pulse-slow" />
      <div className="aurora-orb w-[600px] h-[600px] bg-purple-700 top-[20%] right-[-150px] animate-float" />
      <div className="aurora-orb w-[450px] h-[450px] bg-teal-500 bottom-[-100px] left-[20%] animate-pulse-slow" />

      {/* 3. Dynamic Cursor Spotlight */}
      <MouseSpotlight />

      {/* 4. Fine Spatial Noise & Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-80" />
    </div>
  );
};
