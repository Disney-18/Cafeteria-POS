import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),

      addItem: (product, cantidad = 1) =>
        set((s) => {
          const existing = s.items.find((i) => i.id === product.id);
          if (existing) {
            const nuevaCantidad = Math.min(
              existing.cantidad + cantidad,
              product.stock
            );
            return {
              items: s.items.map((i) =>
                i.id === product.id ? { ...i, cantidad: nuevaCantidad } : i
              )
            };
          }
          return {
            items: [
              ...s.items,
              {
                id: product.id,
                nombre: product.nombre,
                precio: product.precio,
                icono: product.icono,
                stock: product.stock,
                cantidad: Math.min(cantidad, product.stock)
              }
            ]
          };
        }),

      incrementItem: (id) =>
        set((s) => ({
          items: s.items.map((i) =>
            i.id === id
              ? { ...i, cantidad: Math.min(i.cantidad + 1, i.stock) }
              : i
          )
        })),

      decrementItem: (id) =>
        set((s) => ({
          items: s.items
            .map((i) =>
              i.id === id ? { ...i, cantidad: i.cantidad - 1 } : i
            )
            .filter((i) => i.cantidad > 0)
        })),

      removeItem: (id) =>
        set((s) => ({ items: s.items.filter((i) => i.id !== id) })),

      clearCart: () => set({ items: [] }),

      getCount: () => get().items.reduce((sum, i) => sum + i.cantidad, 0)
    }),
    { name: 'pos-cart' }
  )
);
