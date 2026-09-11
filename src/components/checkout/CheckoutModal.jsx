import { useMemo, useState } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import PaymentMethods from './PaymentMethods';
import TicketPreview from './TicketPreview';
import AlertModal from '../ui/AlertModal';

import { useCartStore } from '../../store/useCartStore';
import { useConfigStore } from '../../store/useConfigStore';
import { useProductStore } from '../../store/useProductStore';
import { useSalesStore } from '../../store/useSalesStore';
import { useTableStore } from '../../store/useTableStore';

import { calculateTotals } from '../../utils/calculateTotals';
import { formatCurrency } from '../../utils/formatCurrency';
import { generateTicketNumber } from '../../utils/generateTicketNumber';
import { printTicket } from '../../utils/printTicket';
import toast from 'react-hot-toast';

export default function CheckoutModal({ open, onClose }) {
  const { items, clearCart } = useCartStore();
  const { impuestoPorcentaje, moneda } = useConfigStore();
  const decrementMany = useProductStore((s) => s.decrementMany);
  const addSale = useSalesStore((s) => s.addSale);
  const tables = useTableStore((s) => s.tables);
  const addItemsToTable = useTableStore((s) => s.addItemsToTable);
  const openTable = useTableStore((s) => s.openTable);

  const [metodoPago, setMetodoPago] = useState('efectivo');
  const [tipo, setTipo] = useState('llevar');
  const [mesaId, setMesaId] = useState('');
  const [cliente, setCliente] = useState('');
  const [recibido, setRecibido] = useState('');
  const [alert, setAlert] = useState(null);
  const [lastSale, setLastSale] = useState(null);

  const { subtotal, impuesto, total } = useMemo(
    () => calculateTotals(items, impuestoPorcentaje),
    [items, impuestoPorcentaje]
  );

  const cambio = useMemo(() => {
    const r = Number(recibido) || 0;
    return Math.max(0, r - total);
  }, [recibido, total]);

  const reset = () => {
    setMetodoPago('efectivo');
    setTipo('llevar');
    setMesaId('');
    setCliente('');
    setRecibido('');
    setLastSale(null);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const validate = () => {
    if (items.length === 0) {
      setAlert({ type: 'error', title: 'Carrito vacío', message: 'Agrega productos antes de cobrar.' });
      return false;
    }
    if (tipo === 'mesa' && !mesaId) {
      setAlert({ type: 'error', title: 'Mesa requerida', message: 'Selecciona una mesa para esta venta.' });
      return false;
    }
    if (metodoPago === 'efectivo' && Number(recibido) < total) {
      setAlert({
        type: 'error',
        title: 'Monto insuficiente',
        message: 'El monto recibido es menor al total a pagar.'
      });
      return false;
    }
    return true;
  };

  const handleConfirm = () => {
    if (!validate()) return;

    const sale = {
      id: `s_${Date.now()}`,
      numero: generateTicketNumber(),
      fecha: new Date().toISOString(),
      items: items.map((i) => ({ ...i })),
      subtotal,
      impuesto,
      total,
      metodoPago,
      recibido: metodoPago === 'efectivo' ? Number(recibido) : total,
      cambio: metodoPago === 'efectivo' ? cambio : 0,
      mesa: tipo === 'mesa' ? Number(mesaId) : null,
      cliente: cliente.trim(),
      tipo
    };

    addSale(sale);
    decrementMany(items);

    if (tipo === 'mesa') {
      const table = tables.find((t) => t.id === Number(mesaId));
      if (table?.estado === 'libre') openTable(Number(mesaId), cliente.trim());
      addItemsToTable(Number(mesaId), items);
    }

    clearCart();
    setLastSale(sale);
    toast.success('Venta registrada');
  };

  if (lastSale) {
    return (
      <Modal open={open} onClose={handleClose} size="md">
        <div className="p-6">
          <div className="mb-4 flex items-center justify-center gap-2 text-green-600">
            <span className="material-icons text-3xl">check_circle</span>
            <h2 className="text-lg font-bold">Venta completada</h2>
          </div>
          <TicketPreview sale={lastSale} />
          <div className="mt-4 flex gap-2">
            <Button variant="outline" className="flex-1" icon="print" onClick={printTicket}>
              Imprimir
            </Button>
            <Button variant="primary" className="flex-1" onClick={handleClose}>
              Cerrar
            </Button>
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <Modal open={open} onClose={handleClose} size="md">
      <div className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-coffee-800">Cobrar</h2>
          <button onClick={handleClose} className="rounded-lg p-1.5 text-coffee-500 hover:bg-coffee-100">
            <span className="material-icons">close</span>
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-coffee-700">
              Tipo de venta
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setTipo('llevar')}
                className={`rounded-xl border p-3 text-sm font-medium ${
                  tipo === 'llevar'
                    ? 'border-coffee-500 bg-coffee-100 text-coffee-700'
                    : 'border-coffee-200 bg-white text-coffee-500'
                }`}
              >
                <span className="material-icons mb-1 block">takeout_dining</span>
                Para llevar
              </button>
              <button
                type="button"
                onClick={() => setTipo('mesa')}
                className={`rounded-xl border p-3 text-sm font-medium ${
                  tipo === 'mesa'
                    ? 'border-coffee-500 bg-coffee-100 text-coffee-700'
                    : 'border-coffee-200 bg-white text-coffee-500'
                }`}
              >
                <span className="material-icons mb-1 block">table_restaurant</span>
                En mesa
              </button>
            </div>
          </div>

          {tipo === 'mesa' && (
            <div>
              <label className="mb-1 block text-sm font-medium text-coffee-700">
                Mesa
              </label>
              <select
                value={mesaId}
                onChange={(e) => setMesaId(e.target.value)}
                className="w-full rounded-xl border border-coffee-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-coffee-500"
              >
                <option value="">Selecciona una mesa</option>
                {tables.map((t) => (
                  <option key={t.id} value={t.id}>
                    Mesa {t.id} {t.estado === 'ocupada' ? '(ocupada)' : ''}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="mb-1 block text-sm font-medium text-coffee-700">
              Cliente (opcional)
            </label>
            <input
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
              placeholder="Nombre del cliente"
              className="w-full rounded-xl border border-coffee-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-coffee-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-coffee-700">
              Método de pago
            </label>
            <PaymentMethods value={metodoPago} onChange={setMetodoPago} />
          </div>

          {metodoPago === 'efectivo' && (
            <div>
              <label className="mb-1 block text-sm font-medium text-coffee-700">
                Monto recibido
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={recibido}
                onChange={(e) => setRecibido(e.target.value)}
                placeholder={total.toFixed(2)}
                className="w-full rounded-xl border border-coffee-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-coffee-500"
              />
              <p className="mt-1 text-xs text-coffee-500">
                Cambio: {formatCurrency(cambio, moneda)}
              </p>
            </div>
          )}

          <div className="rounded-xl bg-coffee-50 p-4">
            <Row label="Subtotal" value={formatCurrency(subtotal, moneda)} />
            <Row label={`Impuesto (${impuestoPorcentaje}%)`} value={formatCurrency(impuesto, moneda)} />
            <Row label="Total" value={formatCurrency(total, moneda)} bold />
          </div>

          <Button variant="primary" className="w-full" icon="check_circle" onClick={handleConfirm}>
            Confirmar venta
          </Button>
        </div>
      </div>

      <AlertModal
        open={!!alert}
        onClose={() => setAlert(null)}
        type={alert?.type}
        title={alert?.title}
        message={alert?.message}
      />
    </Modal>
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
