import { create } from 'zustand';

export const useOSStore = create((set) => ({
  activeModal: null, // 'project' | 'resume' | 'terminal' | null
  activeProject: null,
  isResumeWindowOpen: false,

  openProjectModal: (project) => set({ activeModal: 'project', activeProject: project }),
  closeModal: () => set({ activeModal: null, activeProject: null }),
  toggleResumeWindow: () => set((state) => ({ isResumeWindowOpen: !state.isResumeWindowOpen })),
}));
