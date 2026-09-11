import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DEFAULT_CURRENCY } from '../data/currencies';

export const useConfigStore = create(
  persist(
    (set) => ({
      negocio: {
        nombre: 'Mi Cafetería',
        direccion: 'Calle Principal #123',
        telefono: '+53 5555 5555'
      },
      moneda: DEFAULT_CURRENCY,
      impuestoPorcentaje: 10,
      setNegocio: (negocio) =>
        set((s) => ({ negocio: { ...s.negocio, ...negocio } })),
      setMoneda: (moneda) => set({ moneda }),
      setImpuesto: (impuestoPorcentaje) =>
        set({ impuestoPorcentaje: Number(impuestoPorcentaje) || 0 })
    }),
    { name: 'pos-config' }
  )
);
