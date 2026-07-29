import React from 'react';
import { motion, useInView } from 'framer-motion';
import { Download, FileText, ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';

export const ResumeShowcase: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative w-full py-24 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div 
          ref={ref}
          className="relative rounded-[2.5rem] glass-panel bg-slate-900/60 border border-white/10 overflow-hidden shadow-2xl"
        >
          {/* Background Gradients */}
          <div className="absolute inset-0 bg-gradient-to-br from-auroraBlue/5 via-transparent to-tealAccent/5 pointer-events-none" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-auroraBlue/20 rounded-full filter blur-[100px] pointer-events-none transform translate-x-1/3 -translate-y-1/3" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 p-8 sm:p-12 lg:p-16 items-center">
            
            {/* Left: Text & CTA */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-auroraBlue font-mono text-xs uppercase tracking-widest shadow-sm">
                <FileText className="w-3.5 h-3.5" />
                Curriculum Vitae
              </div>
              
              <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-white tracking-tight leading-tight">
                Download my <br />
                <span className="text-gradient">Professional Resume</span>
              </h2>
              
              <p className="font-sans text-slate-400 text-lg leading-relaxed">
                A comprehensive summary of my engineering internships, academic background, technical skills, and algorithmic problem-solving journey.
              </p>

              <div className="pt-4 flex flex-wrap gap-4">
                <a href="/resume.pdf" download="Yeswanth_Resume.pdf">
                  <Button variant="gradient" size="lg" leftIcon={<Download className="w-4 h-4 text-tealAccent" />}>
                    Download PDF
                  </Button>
                </a>
                <a href="/resume.pdf" target="_blank" rel="noreferrer">
                  <Button variant="ghost" size="lg" rightIcon={<ChevronRight className="w-4 h-4 text-auroraBlue" />}>
                    Open in New Tab
                  </Button>
                </a>
              </div>
            </motion.div>

            {/* Right: Inline PDF Preview */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-7 relative"
            >
              <div className="relative w-full aspect-[1/1.2] sm:aspect-[1.414] max-h-[600px] rounded-2xl overflow-hidden border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-slate-950 group">
                
                {/* PDF Toolbar Fake UI */}
                <div className="absolute top-0 inset-x-0 h-10 bg-slate-900 border-b border-white/10 flex items-center px-4 gap-2 z-10 pointer-events-none">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="mx-auto font-mono text-[10px] text-slate-500 tracking-wider">Yeswanth_Kumar_Resume.pdf</span>
                </div>

                <div className="absolute inset-0 pt-10">
                  <iframe 
                    src="/resume.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH" 
                    className="w-full h-full border-none opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    title="Resume Preview"
                  />
                </div>

                {/* Overlay Glow */}
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none" />
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
};
