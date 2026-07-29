// Apple & AI OS Design Tokens & Configuration

export const DESIGN_TOKENS = {
  colors: {
    bgPrimary: '#05070E',
    bgSecondary: '#0B0F19',
    glassCard: 'rgba(15, 23, 42, 0.55)',
    glassHover: 'rgba(30, 41, 59, 0.70)',
    borderGlass: 'rgba(255, 255, 255, 0.12)',
    borderGlow: 'rgba(59, 130, 246, 0.35)',
    auroraBlue: '#3B82F6',
    royalPurple: '#8B5CF6',
    tealAccent: '#14B8A6',
    softWhite: '#F8FAFC',
    slateMuted: '#94A3B8',
  },
  typography: {
    fontSans: "'Inter', system-ui, sans-serif",
    fontDisplay: "'Outfit', 'SF Pro Display', sans-serif",
    fontMono: "'JetBrains Mono', 'Fira Code', monospace",
    scale: {
      display: 'font-display font-extrabold text-4xl sm:text-6xl tracking-tight text-gradient',
      h1: 'font-display font-bold text-3xl sm:text-4xl text-white tracking-tight',
      h2: 'font-display font-semibold text-2xl text-white',
      h3: 'font-sans font-semibold text-xl text-slate-100',
      body: 'font-sans text-sm sm:text-base text-slate-300 leading-relaxed',
      caption: 'font-mono text-xs text-slate-400',
      monoCode: 'font-mono text-xs text-tealAccent',
    }
  },
  shadows: {
    glass: '0 20px 50px rgba(0, 0, 0, 0.5)',
    auroraGlow: '0 0 40px rgba(139, 92, 246, 0.25)',
    tealGlow: '0 0 30px rgba(20, 184, 166, 0.25)',
  },
  blur: {
    glass: '20px',
    orb: '120px',
  },
  radii: {
    sm: '0.5rem',  // 8px
    md: '1rem',    // 16px
    lg: '1.5rem',  // 24px
    full: '9999px',
  }
};
