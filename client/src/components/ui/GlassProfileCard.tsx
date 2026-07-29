import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Code2, Briefcase, GraduationCap, Server, ShieldCheck } from 'lucide-react';

export const GlassProfileCard: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      className="relative max-w-md w-full glass-panel rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl bg-slate-950/70 backdrop-blur-2xl text-slate-100 space-y-6 overflow-hidden group"
    >
      {/* Soft Top Glow Light */}
      <div className="absolute -top-20 -right-20 w-48 h-48 bg-auroraBlue/20 rounded-full filter blur-3xl group-hover:bg-auroraBlue/30 transition-colors pointer-events-none" />

      {/* Header: Avatar Badge & Status Pill */}
      <div className="flex items-center justify-between border-b border-white/10 pb-5">
        <div className="flex items-center gap-3.5">
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-auroraBlue via-royalPurple to-tealAccent p-0.5 shadow-auroraGlow">
              <div className="w-full h-full rounded-[14px] bg-slate-950 flex items-center justify-center font-display font-extrabold text-xl text-white">
                YK
              </div>
            </div>
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-950 animate-pulse" />
          </div>

          <div className="space-y-0.5">
            <h3 className="font-display font-bold text-lg text-white">
              Yeswanth Kumar Kaluva
            </h3>
            <p className="font-mono text-xs text-slate-400 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-tealAccent" /> Andhra Pradesh, India
            </p>
          </div>
        </div>
      </div>

      {/* Live Availability Status Pill */}
      <div className="px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Available for Opportunities</span>
        </div>
        <ShieldCheck className="w-4 h-4 text-emerald-400" />
      </div>

      {/* Real Stats Grid */}
      <div className="grid grid-cols-2 gap-3 pt-1">
        
        {/* Stat 1: Contact Details */}
        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-auroraBlue/40 transition-colors text-left space-y-1">
          <div className="flex items-center gap-1.5 text-amber-400">
            <MapPin className="w-4 h-4" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400">Direct Contact</span>
          </div>
          <p className="font-display font-semibold text-sm text-white break-all">
            yeswanthkumar<br/>kaluva@gmail.com
          </p>
          <p className="font-mono text-[10px] text-slate-400">+91 8639425584</p>
        </div>

        {/* Stat 2: 3 Internships */}
        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-auroraBlue/40 transition-colors text-left space-y-1">
          <div className="flex items-center gap-1.5 text-auroraBlue">
            <Briefcase className="w-4 h-4" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400">Internships</span>
          </div>
          <p className="font-display font-extrabold text-2xl text-white">
            3
          </p>
          <p className="font-mono text-[10px] text-slate-400">nDMatrix, Vignan, Fusil</p>
        </div>

        {/* Stat 3: 8.55 CGPA */}
        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-auroraBlue/40 transition-colors text-left space-y-1">
          <div className="flex items-center gap-1.5 text-purple-400">
            <GraduationCap className="w-4 h-4" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400">CGPA Score</span>
          </div>
          <p className="font-display font-extrabold text-2xl text-white">
            8.55
          </p>
          <p className="font-mono text-[10px] text-slate-400">B.Tech CS (Data Science)</p>
        </div>

        {/* Stat 4: Backend Focus */}
        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-auroraBlue/40 transition-colors text-left space-y-1">
          <div className="flex items-center gap-1.5 text-tealAccent">
            <Server className="w-4 h-4" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400">Specialisation</span>
          </div>
          <p className="font-display font-extrabold text-lg text-white">
            Backend
          </p>
          <p className="font-mono text-[10px] text-slate-400">Node.js, Express, MySQL</p>
        </div>

      </div>

      {/* Footer Tag */}
      <div className="pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-slate-400">
        <span>Verified Engineering Profile</span>
        <span className="text-auroraBlue">Vignan Univ 2026</span>
      </div>

    </motion.div>
  );
};

export default GlassProfileCard;
