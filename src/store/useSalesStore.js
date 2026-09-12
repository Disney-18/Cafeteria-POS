import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { formatDayKey } from '../utils/formatDate';

export const useSalesStore = create(
  persist(
    (set, get) => ({
      sales: [],

      addSale: (sale) => set((s) => ({ sales: [sale, ...s.sales] })),

      getTodaySales: () => {
        const today = formatDayKey();
        return get().sales.filter((s) => formatDayKey(s.fecha) === today);
      },

      getLast10: () => get().sales.slice(0, 10),

      getTodayStats: () => {
        const today = get().getTodaySales();
        const total = today.reduce((sum, s) => sum + s.total, 0);
        const count = today.length;
        const ticketPromedio = count > 0 ? total / count : 0;
        return { total, count, ticketPromedio };
      },

      clearSales: () => set({ sales: [] })
    }),
    {
      name: 'pos-sales',
      onRehydrateStorage: () => (state) => {
        if (state && !Array.isArray(state.sales)) {
          state.sales = [];
        }
      }
    }
  )
);
