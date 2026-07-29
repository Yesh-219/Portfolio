import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download } from 'lucide-react';
import { getLenis } from '../../lib/lenis';

export interface Certificate {
  title: string;
  issuer: string;
  year: string;
  url: string;
}

interface CertificateViewerModalProps {
  certificate: Certificate | null;
  onClose: () => void;
}

export const CertificateViewerModal: React.FC<CertificateViewerModalProps> = ({ certificate, onClose }) => {
  useEffect(() => {
    if (certificate) {
      document.body.style.overflow = 'hidden';
      getLenis()?.stop();
    } else {
      document.body.style.overflow = '';
      getLenis()?.start();
    }
    return () => { 
      document.body.style.overflow = ''; 
      getLenis()?.start();
    };
  }, [certificate]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const isImage = certificate?.url?.endsWith('.jpg') || certificate?.url?.endsWith('.png') || certificate?.url?.endsWith('.jpeg');

  const modalContent = (
    <AnimatePresence>
      {certificate && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-slate-950/90 backdrop-blur-md"
          />

      <div 
        className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 cursor-zoom-out"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-5xl h-[85vh] flex flex-col glass-panel bg-slate-900 border border-white/20 shadow-2xl rounded-2xl cursor-auto overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10 bg-slate-950/50">
            <div>
              <h3 className="font-display font-bold text-white text-lg">{certificate.title}</h3>
              <p className="font-mono text-xs text-slate-400">{certificate.issuer} &bull; {certificate.year}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={onClose} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Viewer Content */}
          <div className="flex-1 overflow-hidden relative bg-black/50 flex items-center justify-center">
            {isImage ? (
              <img 
                src={certificate.url} 
                alt={certificate.title} 
                className="max-w-full max-h-full object-contain p-4"
              />
            ) : (
              <iframe 
                src={`${certificate.url}#toolbar=0&navpanes=0&scrollbar=0`}
                className="w-full h-full border-none"
                title={certificate.title}
              />
            )}
          </div>
        </motion.div>
      </div>
      </>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
};
