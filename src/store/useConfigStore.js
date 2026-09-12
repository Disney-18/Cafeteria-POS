import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DEFAULT_CURRENCY } from '../data/currencies';

const DEFAULT_NEGOCIO = {
  nombre: 'Mi Cafetería',
  direccion: 'Calle Principal #123',
  telefono: '+53 5555 5555'
};

export const useConfigStore = create(
  persist(
    (set, get) => ({
      negocio: { ...DEFAULT_NEGOCIO },
      moneda: DEFAULT_CURRENCY,
      impuestoPorcentaje: 10,

      setNegocio: (negocio) =>
        set((s) => ({ negocio: { ...DEFAULT_NEGOCIO, ...s.negocio, ...negocio } })),

      setMoneda: (moneda) => set({ moneda }),

      setImpuesto: (impuestoPorcentaje) =>
        set({ impuestoPorcentaje: Number(impuestoPorcentaje) || 0 }),

      reset: () => set({
        negocio: { ...DEFAULT_NEGOCIO },
        moneda: DEFAULT_CURRENCY,
        impuestoPorcentaje: 10
      })
    }),
    {
      name: 'pos-config',
      onRehydrateStorage: () => (state) => {
        if (state) {
          if (!state.negocio || typeof state.negocio !== 'object') {
            state.negocio = { ...DEFAULT_NEGOCIO };
          }
          if (!state.moneda) state.moneda = DEFAULT_CURRENCY;
          if (typeof state.impuestoPorcentaje !== 'number') {
            state.impuestoPorcentaje = 10;
          }
        }
      }
    }
  )
);
