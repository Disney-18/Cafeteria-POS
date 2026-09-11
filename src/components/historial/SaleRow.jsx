import { formatDateTime } from '../../utils/formatDate';
import { formatCurrency } from '../../utils/formatCurrency';
import { useConfigStore } from '../../store/useConfigStore';

const METHOD_LABEL = {
  efectivo: 'Efectivo',
  tarjeta: 'Tarjeta',
  transferencia: 'Transferencia'
};

export default function SaleRow({ sale }) {
  const moneda = useConfigStore((s) => s.moneda);
  const itemsCount = sale.items.reduce((s, i) => s + i.cantidad, 0);

  return (
    <div className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm">
      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-coffee-100 text-coffee-600">
        <span className="material-icons">receipt_long</span>
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-coffee-800">{sale.numero}</p>
        <p className="text-xs text-coffee-500">{formatDateTime(sale.fecha)}</p>
        <div className="mt-0.5 flex items-center gap-2 text-xs text-coffee-500">
          <span>{itemsCount} productos</span>
          <span>·</span>
          <span>{METHOD_LABEL[sale.metodoPago] || sale.metodoPago}</span>
          {sale.mesa && (
            <>
              <span>·</span>
              <span>Mesa {sale.mesa}</span>
            </>
          )}
        </div>
      </div>

      <p className="text-sm font-bold text-coffee-700">
        {formatCurrency(sale.total, moneda)}
      </p>
    </div>
  );
}
