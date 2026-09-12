import { useMemo, useState } from 'react';
import Layout from '../components/layout/Layout';
import CategoryChips from '../components/productos/CategoryChips';
import ProductGrid from '../components/productos/ProductGrid';
import CartFAB from '../components/carrito/CartFAB';
import CartPanel from '../components/carrito/CartPanel';
import AlertModal from '../components/ui/AlertModal';

import { useProductStore } from '../store/useProductStore';
import { useCartStore } from '../store/useCartStore';
import { CATEGORIES } from '../data/defaultProducts';
import toast from 'react-hot-toast';

export default function VentaPage() {
  const products = useProductStore((s) => s.products);
  const addItem = useCartStore((s) => s.addItem);
  const cartItems = useCartStore((s) => s.items);

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Todas');
  const [alert, setAlert] = useState(null);

  const counts = useMemo(() => {
    const c = { Todas: products.length };
    CATEGORIES.forEach((cat) => {
      c[cat] = products.filter((p) => p.categoria === cat).length;
    });
    return c;
  }, [products]);

  const filtered = useMemo(() => {
    let list = products;
    if (category !== 'Todas') list = list.filter((p) => p.categoria === category);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) => p.nombre.toLowerCase().includes(q));
    }
    return list;
  }, [products, category, search]);

  const handleAdd = (product) => {
    const inCart = cartItems.find((i) => i.id === product.id)?.cantidad || 0;
    if (inCart + 1 > product.stock) {
      setAlert({
        type: 'warning',
        title: 'Stock insuficiente',
        message: `Solo hay ${product.stock} unidades disponibles de ${product.nombre}.`
      });
      return;
    }
    addItem(product);
    toast.success(`${product.nombre} agregado`);
  };

  return (
    <Layout title="Punto de Venta">
      <div className="mx-auto max-w-6xl px-4 pt-4">
        <div className="relative mb-4">
          <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-coffee-400">
            search
          </span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar productos..."
            className="w-full rounded-xl border border-coffee-200 bg-white py-3 pl-11 pr-4 text-sm outline-none focus:border-coffee-500"
          />
        </div>

        <div className="mb-4">
          <CategoryChips
            categories={CATEGORIES}
            active={category}
            onChange={setCategory}
            counts={counts}
          />
        </div>

        <ProductGrid products={filtered} onAdd={handleAdd} />
      </div>

      <CartFAB />
      <CartPanel />

      <AlertModal
        open={!!alert}
        onClose={() => setAlert(null)}
        type={alert?.type}
        title={alert?.title}
        message={alert?.message}
      />
    </Layout>
  );
}
