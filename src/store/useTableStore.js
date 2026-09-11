import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createDefaultTables } from '../data/defaultTables';

export const useTableStore = create(
  persist(
    (set, get) => ({
      tables: createDefaultTables(),

      openTable: (id, cliente = '') =>
        set((s) => ({
          tables: s.tables.map((t) =>
            t.id === id
              ? {
                  ...t,
                  estado: 'ocupada',
                  cliente,
                  abiertaEn: t.abiertaEn || new Date().toISOString()
                }
              : t
          )
        })),

      addItemsToTable: (id, items) =>
        set((s) => ({
          tables: s.tables.map((t) => {
            if (t.id !== id) return t;
            const merged = [...t.items];
            items.forEach((newItem) => {
              const existing = merged.find((m) => m.id === newItem.id);
              if (existing) {
                existing.cantidad += newItem.cantidad;
              } else {
                merged.push({ ...newItem });
              }
            });
            const total = merged.reduce(
              (sum, i) => sum + i.precio * i.cantidad,
              0
            );
            return { ...t, items: merged, total, estado: 'ocupada' };
          })
        })),

      releaseTable: (id) =>
        set((s) => ({
          tables: s.tables.map((t) =>
            t.id === id
              ? {
                  id: t.id,
                  estado: 'libre',
                  items: [],
                  total: 0,
                  cliente: '',
                  abiertaEn: null
                }
              : t
          )
        })),

      getTable: (id) => get().tables.find((t) => t.id === id),

      resetTables: () => set({ tables: createDefaultTables() })
    }),
    { name: 'pos-tables' }
  )
);
