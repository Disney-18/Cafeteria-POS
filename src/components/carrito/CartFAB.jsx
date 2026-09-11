import { useCartStore } from '../../store/useCartStore';

export default function CartFAB() {
  const items = useCartStore((s) => s.items);
  const toggleCart = useCartStore((s) => s.toggleCart);
  const count = items.reduce((s, i) => s + i.cantidad, 0);

  if (count === 0) return null;

  return (
    <button
      onClick={toggleCart}
      className="fixed bottom-24 right-4 z-40 flex h-14 items-center gap-2 rounded-full bg-coffee-500 px-5 text-white shadow-lg transition-all hover:bg-coffee-600 active:scale-95"
    >
      <span className="material-icons">shopping_cart</span>
      <span className="font-bold">{count}</span>
    </button>
  );
}
