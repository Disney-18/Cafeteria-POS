import { useState } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import AlertModal from '../ui/AlertModal';
import { formatCurrency } from '../../utils/formatCurrency';
import { useConfigStore } from '../../store/useConfigStore';
import { useTableStore } from '../../store/useTableStore';
import { useCartStore } from '../../store/useCartStore';

export default function TableDetailModal({ table, open, onClose }) {
  const moneda = useConfigStore((s) => s.moneda);
  const releaseTable = useTableStore((s) => s.releaseTable);
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const [confirmRelease, setConfirmRelease] = useState(false);

  if (!table) return null;
  const ocupada = table.estado === 'ocupada';

  const handleAddMore = () => {
    table.items.forEach((it) => {
      addItem(
        {
          id: it.id,
          nombre: it.nombre,
          precio: it.precio,
          icono: it.icono,
          stock: it.stock ?? 999
        },
        it.cantidad
      );
    });
    onClose();
    openCart();
  };

  return (
    <>
      <Modal open={open} onClose={onClose} size="md">
        <div className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-coffee-800">Mesa {table.id}</h2>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-coffee-500 hover:bg-coffee-100"
            >
              <span className="material-icons">close</span>
            </button>
          </div>

          <div className="mb-4 flex items-center gap-3">
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                ocupada ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
              }`}
            >
              {ocupada ? 'Ocupada' : 'Libre'}
            </span>
            {table.cliente && (
              <span className="text-sm text-coffee-600">Cliente: {table.cliente}</span>
            )}
          </div>

          {ocupada && table.items.length > 0 ? (
            <>
              <div className="mb-4 max-h-60 space-y-2 overflow-y-auto">
                {table.items.map((it, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-lg bg-coffee-50 px-3 py-2"
                  >
                    <div>
                      <p className="text-sm font-medium text-coffee-800">{it.nombre}</p>
                      <p className="text-xs text-coffee-500">
                        {it.cantidad} x {formatCurrency(it.precio, moneda)}
                      </p>
                    </div>
                    <p className="text-sm font-bold text-coffee-700">
                      {formatCurrency(it.precio * it.cantidad, moneda)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mb-4 flex justify-between rounded-xl bg-coffee-100 px-4 py-3">
                <span className="font-bold text-coffee-800">Total</span>
                <span className="font-bold text-coffee-800">
                  {formatCurrency(table.total, moneda)}
                </span>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  icon="add"
                  onClick={handleAddMore}
                >
                  Agregar más
                </Button>
                <Button
                  variant="danger"
                  className="flex-1"
                  icon="check_circle"
                  onClick={() => setConfirmRelease(true)}
                >
                  Liberar
                </Button>
              </div>
            </>
          ) : (
            <p className="py-6 text-center text-sm text-coffee-500">
              Esta mesa está libre. Asigna productos desde el carrito.
            </p>
          )}
        </div>
      </Modal>

      <AlertModal
        open={confirmRelease}
        onClose={() => setConfirmRelease(false)}
        type="warning"
        title="Liberar mesa"
        message="Se perderá la cuenta actual de esta mesa. Esta acción no se puede deshacer."
        confirmText="Sí, liberar"
        cancelText="Cancelar"
        onConfirm={() => {
          releaseTable(table.id);
          onClose();
        }}
      />
    </>
  );
}
