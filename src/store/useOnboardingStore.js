import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useOnboardingStore = create(
  persist(
    (set) => ({
      visto: false,
      completar: () => set({ visto: true }),
      reset: () => set({ visto: false })
    }),
    { name: 'pos-onboarding' }
  )
);
