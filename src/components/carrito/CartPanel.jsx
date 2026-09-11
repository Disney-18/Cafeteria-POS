import { useState } from 'react';
import { useCartStore } from '../../store/useCartStore';
import { useConfigStore } from '../../store/useConfigStore';
import { calculateTotals } from '../../utils/calculateTotals';
import { formatCurrency } from '../../utils/formatCurrency';
import Button from '../ui/Button';
import AlertModal from '../ui/AlertModal';
import CartItem from './CartItem';
import CheckoutModal from '../checkout/CheckoutModal';

export default function CartPanel() {
  const { items, isOpen, closeCart, incrementItem, decrementItem, removeItem, clearCart } =
    useCartStore();
  const impuestoPorcentaje = useConfigStore((s) => s.impuestoPorcentaje);
  const moneda = useConfigStore((s) => s.moneda);

  const [confirmClear, setConfirmClear] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const { subtotal, impuesto, total } = calculateTotals(items, impuestoPorcentaje);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/50 animate-fade-in"
        onClick={closeCart}
      />
      <div className="fixed bottom-0 left-0 right-0 z-50 max-h-[85vh] animate-slide-up rounded-t-3xl bg-white shadow-2xl">
        <div className="mx-auto max-w-2xl">
          <div className="flex items-center justify-between border-b border-coffee-100 px-5 py-4">
            <div className="flex items-center gap-2">
              <span className="material-icons text-coffee-600">shopping_cart</span>
              <h2 className="text-base font-bold text-coffee-800">Carrito</h2>
              <span className="rounded-full bg-coffee-100 px-2 py-0.5 text-xs font-medium text-coffee-700">
                {items.length} items
              </span>
            </div>
            <button
              onClick={closeCart}
              className="rounded-lg p-1.5 text-coffee-500 hover:bg-coffee-100"
            >
              <span className="material-icons">close</span>
            </button>
          </div>

          <div className="max-h-[40vh] overflow-y-auto px-5">
            {items.length === 0 ? (
              <div className="flex flex-col items-center py-12 text-coffee-400">
                <span className="material-icons text-5xl">remove_shopping_cart</span>
                <p className="mt-3 text-sm">El carrito está vacío</p>
              </div>
            ) : (
              items.map((it) => (
                <CartItem
                  key={it.id}
                  item={it}
                  onInc={incrementItem}
                  onDec={decrementItem}
                  onRemove={removeItem}
                />
              ))
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t border-coffee-100 px-5 py-4">
              <div className="mb-3 space-y-1.5">
                <Row label="Subtotal" value={formatCurrency(subtotal, moneda)} />
                <Row
                  label={`Impuesto (${impuestoPorcentaje}%)`}
                  value={formatCurrency(impuesto, moneda)}
                />
                <Row
                  label="Total"
                  value={formatCurrency(total, moneda)}
                  bold
                />
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setConfirmClear(true)}
                  icon="delete_sweep"
                >
                  Limpiar
                </Button>
                <Button
                  variant="primary"
                  className="flex-1"
                  icon="point_of_sale"
                  onClick={() => setCheckoutOpen(true)}
                >
                  Cobrar
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <AlertModal
        open={confirmClear}
        onClose={() => setConfirmClear(false)}
        type="warning"
        title="Limpiar carrito"
        message="Se eliminarán todos los productos agregados. Esta acción no se puede deshacer."
        confirmText="Sí, limpiar"
        cancelText="Cancelar"
        onConfirm={clearCart}
      />

      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
      />
    </>
  );
}

function Row({ label, value, bold }) {
  return (
    <div className="flex justify-between text-sm">
      <span className={bold ? 'font-bold text-coffee-800' : 'text-coffee-600'}>
        {label}
      </span>
      <span className={bold ? 'font-bold text-coffee-800' : 'text-coffee-700'}>
        {value}
      </span>
    </div>
  );
}
