import { formatCurrency } from '../../utils/formatCurrency';
import { useConfigStore } from '../../store/useConfigStore';

export default function CartItem({ item, onInc, onDec, onRemove }) {
  const moneda = useConfigStore((s) => s.moneda);

  return (
    <div className="flex items-center gap-3 border-b border-coffee-100 py-3 last:border-0">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-coffee-100 text-coffee-600">
        <span className="material-icons text-[20px]">{item.icono || 'coffee'}</span>
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-coffee-800">
          {item.nombre}
        </p>
        <p className="text-xs text-coffee-500">
          {formatCurrency(item.precio, moneda)} c/u
        </p>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onDec(item.id)}
          className="flex h-7 w-7 items-center justify-center rounded-full bg-coffee-100 text-coffee-700 hover:bg-coffee-200"
        >
          <span className="material-icons text-[16px]">remove</span>
        </button>
        <span className="w-7 text-center text-sm font-bold text-coffee-800">
          {item.cantidad}
        </span>
        <button
          onClick={() => onInc(item.id)}
          disabled={item.cantidad >= item.stock}
          className="flex h-7 w-7 items-center justify-center rounded-full bg-coffee-100 text-coffee-700 hover:bg-coffee-200 disabled:opacity-40"
        >
          <span className="material-icons text-[16px]">add</span>
        </button>
      </div>

      <div className="flex flex-col items-end">
        <p className="text-sm font-bold text-coffee-800">
          {formatCurrency(item.precio * item.cantidad, moneda)}
        </p>
        <button
          onClick={() => onRemove(item.id)}
          className="text-xs text-red-500 hover:underline"
        >
          Quitar
        </button>
      </div>
    </div>
  );
}
