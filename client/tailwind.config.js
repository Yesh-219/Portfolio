/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
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
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'SF Pro Display', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      boxShadow: {
        glass: '0 20px 50px rgba(0, 0, 0, 0.5)',
        auroraGlow: '0 0 40px rgba(139, 92, 246, 0.25)',
        tealGlow: '0 0 30px rgba(20, 184, 166, 0.25)',
      },
      backdropBlur: {
        xs: '4px',
        glass: '20px',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
