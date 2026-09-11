import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DEFAULT_PRODUCTS } from '../data/defaultProducts';

const generateId = () => `p_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

export const useProductStore = create(
  persist(
    (set, get) => ({
      products: DEFAULT_PRODUCTS,

      addProduct: (data) =>
        set((s) => ({
          products: [{ ...data, id: generateId(), activo: true }, ...s.products]
        })),

      updateProduct: (id, data) =>
        set((s) => ({
          products: s.products.map((p) => (p.id === id ? { ...p, ...data } : p))
        })),

      deleteProduct: (id) =>
        set((s) => ({ products: s.products.filter((p) => p.id !== id) })),

      decrementStock: (id, cantidad) =>
        set((s) => ({
          products: s.products.map((p) =>
            p.id === id
              ? { ...p, stock: Math.max(0, p.stock - cantidad) }
              : p
          )
        })),

      decrementMany: (items) => {
        items.forEach((it) => get().decrementStock(it.id, it.cantidad));
      },

      getProduct: (id) => get().products.find((p) => p.id === id),

      resetProducts: () => set({ products: DEFAULT_PRODUCTS })
    }),
    { name: 'pos-products' }
  )
);
