import React, { useRef, useState } from 'react';
import { motion, useAnimationFrame, useInView } from 'framer-motion';
import { useSkills } from '../../../hooks/useSkills';

const TechNode = ({ tech, index, total, isParentInView }: { tech: string, index: number, total: number, isParentInView: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);
  const nodeRef = useRef<HTMLDivElement>(null);
  const time = useRef(Math.random() * 10000);

  // Fermat's spiral for perfectly even 2D distribution (no overlapping)
  const goldenAngle = 137.508 * (Math.PI / 180);
  const theta = index * goldenAngle;
  
  // Calculate spread in pixels, spacing them evenly based on index
  const radiusScale = total > 15 ? 40 : 65; // Increased scale for wider galaxy spread
  const r = 50 + Math.sqrt(index) * radiusScale;
  
  const startX = r * Math.cos(theta);
  const startY = r * Math.sin(theta) * 0.7;

  useAnimationFrame((t) => {
    if (!nodeRef.current || isHovered || !isParentInView) return;
    time.current += 0.005;
    
    const driftX = Math.sin(time.current * 0.5 + index) * 15;
    const driftY = Math.cos(time.current * 0.3 + index) * 15;
    
    nodeRef.current.style.transform = `translate3d(${startX + driftX}px, ${startY + driftY}px, 0)`;
  });

  return (
    <div
      ref={nodeRef}
      className="absolute top-1/2 left-1/2 -mt-6 -ml-12 w-24 h-12 flex items-center justify-center will-change-transform"
      style={{ transform: `translate3d(${startX}px, ${startY}px, 0)` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: index * 0.02, type: 'spring' }}
        whileHover={{ scale: 1.2, zIndex: 50 }}
        className={`px-4 py-2 rounded-xl backdrop-blur-md font-mono text-xs cursor-pointer shadow-lg transition-all duration-300 ${
          isHovered 
            ? 'bg-auroraBlue text-white border-auroraBlue shadow-[0_0_20px_rgba(59,130,246,0.6)]' 
            : 'bg-slate-900/40 text-slate-300 border border-white/10 hover:border-white/30'
        }`}
      >
        {tech}
      </motion.div>
    </div>
  );
};

// Creative Addition: Meteor Shower Effect
const MeteorShower = () => {
  const meteors = React.useMemo(() => 
    [...Array(25)].map(() => ({
      left: (Math.random() * 150 - 50) + "%", // Start anywhere from -50% to 100% horizontally
      top: (Math.random() * 20 - 20) + "%", // Start just above the screen
      delay: Math.random() * 4,
      duration: Math.random() * 1.5 + 1
    })), 
  []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
      {meteors.map((meteor, i) => (
        <motion.div
          key={i}
          className="absolute h-0.5 w-16 bg-gradient-to-r from-transparent via-white to-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"
          initial={{
            top: meteor.top,
            left: meteor.left,
            opacity: 0,
            scale: 0,
            rotate: 45 // Points down-right
          }}
          animate={{
            top: `calc(${meteor.top} + 100%)`,
            left: `calc(${meteor.left} + 100%)`, // Equal delta X and delta Y ensures 45-degree trajectory
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: meteor.duration,
            delay: meteor.delay,
            repeat: Infinity,
            repeatDelay: Math.random() * 3 + 1,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

export const TechWall: React.FC = () => {
  const { techWall } = useSkills();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const isParentInView = useInView(containerRef, { margin: "400px 0px" });

  return (
    <div ref={containerRef} className="relative w-full h-[500px] overflow-hidden rounded-3xl glass-panel bg-slate-950/40 border border-white/5 my-16">
      
      {/* Galaxy Core Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-auroraBlue/10 via-transparent to-transparent opacity-50" />
      
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)]" />
      </div>

      <MeteorShower />

      {/* Nodes */}
      <div className="absolute inset-0">
        {techWall.map((tech, i) => (
          <TechNode key={tech} tech={tech} index={i} total={techWall.length} isParentInView={isParentInView} />
        ))}
      </div>

      {/* Title overlay */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none">
        <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-slate-400 font-mono text-xs uppercase tracking-widest shadow-xl">
          Technology Constellation
        </div>
      </div>
    </div>
  );
};
