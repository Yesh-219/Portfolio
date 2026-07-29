import { create } from 'zustand';

export const useUIStore = create((set) => ({
  activeSection: 'hero',
  spotlightPos: { x: 0, y: 0 },
  audioMuted: true,
  loading: true,

  setActiveSection: (section) => set({ activeSection: section }),
  setSpotlightPos: (pos) => set({ spotlightPos: pos }),
  toggleAudio: () => set((state) => ({ audioMuted: !state.audioMuted })),
  setLoading: (status) => set({ loading: status }),
}));
