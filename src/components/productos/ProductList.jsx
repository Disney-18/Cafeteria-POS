import { formatCurrency } from '../../utils/formatCurrency';
import { stockStatus } from '../../utils/stockStatus';
import { useConfigStore } from '../../store/useConfigStore';
import Badge from '../ui/Badge';

export default function ProductList({ products, onEdit, onDelete }) {
  const moneda = useConfigStore((s) => s.moneda);

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-coffee-400">
        <span className="material-icons text-5xl">inventory_2</span>
        <p className="mt-3 text-sm">No hay productos registrados</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {products.map((p) => {
        const status = stockStatus(p.stock);
        return (
          <div
            key={p.id}
            className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm"
          >
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-coffee-100 text-coffee-600">
              <span className="material-icons">{p.icono || 'coffee'}</span>
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-coffee-800">
                {p.nombre}
              </p>
              <div className="mt-0.5 flex items-center gap-2">
                <span className="text-xs text-coffee-500">{p.categoria}</span>
                <Badge color={status.color}>{status.label}</Badge>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <p className="text-sm font-bold text-coffee-700">
                {formatCurrency(p.precio, moneda)}
              </p>
              <p className="text-xs text-coffee-500">Stock: {p.stock}</p>
            </div>

            <div className="flex flex-col gap-1">
              <button
                onClick={() => onEdit(p)}
                className="rounded-lg p-1.5 text-coffee-500 hover:bg-coffee-100"
              >
                <span className="material-icons text-[18px]">edit</span>
              </button>
              <button
                onClick={() => onDelete(p)}
                className="rounded-lg p-1.5 text-red-500 hover:bg-red-50"
              >
                <span className="material-icons text-[18px]">delete</span>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
