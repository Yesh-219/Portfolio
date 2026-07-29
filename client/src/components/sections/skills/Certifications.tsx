import React from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';
import { useSkills } from '../../../hooks/useSkills';
import { Button } from '../../ui/Button';
import { CertificateViewerModal } from '../../ui/CertificateViewerModal';

export const Certifications: React.FC = () => {
  const { certifications } = useSkills();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  
  const [activeCert, setActiveCert] = React.useState<any | null>(null);

  return (
    <div className="space-y-8">
      <h3 className="font-display font-bold text-2xl text-white">
        Licenses & <span className="text-emerald-400">Certifications</span>
      </h3>
      
      <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {certifications.map((cert, idx) => (
          <motion.div
            key={cert.title}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: idx * 0.05, duration: 0.3 }}
            onClick={() => setActiveCert(cert)}
            style={{ willChange: "transform, opacity" }}
            className="p-6 rounded-3xl glass-panel bg-slate-900/60 border border-white/10 hover:border-emerald-400/30 transition-colors duration-300 group flex flex-col justify-between h-full cursor-pointer"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 mb-4 group-hover:scale-110 transition-transform">
                <Award className="w-5 h-5 text-emerald-400" />
              </div>
              <h4 className="font-display font-bold text-white text-lg leading-tight mb-2 group-hover:text-emerald-400 transition-colors">
                {cert.title}
              </h4>
              <p className="font-sans text-sm text-slate-400 mb-1">{cert.issuer}</p>
              <p className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">{cert.year}</p>
            </div>
            
            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-sans">Verified Credential</span>
              <Button variant="icon" size="sm" onClick={(e) => { e.stopPropagation(); setActiveCert(cert); }} title="View Credential">
                <ExternalLink className="w-3.5 h-3.5" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      <CertificateViewerModal 
        certificate={activeCert} 
        onClose={() => setActiveCert(null)} 
      />
    </div>
  );
};
