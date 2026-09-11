import { stockStatus } from '../../utils/stockStatus';
import { formatCurrency } from '../../utils/formatCurrency';
import { useConfigStore } from '../../store/useConfigStore';

export default function ProductCard({ product, onAdd, onEdit }) {
  const moneda = useConfigStore((s) => s.moneda);
  const status = stockStatus(product.stock);
  const disabled = product.stock <= 0;

  return (
    <div
      onClick={() => !disabled && onAdd(product)}
      onDoubleClick={() => onEdit?.(product)}
      className={`relative flex flex-col rounded-2xl bg-white p-4 shadow-sm transition-all ${
        disabled
          ? 'cursor-not-allowed opacity-60'
          : 'cursor-pointer hover:shadow-md active:scale-95'
      }`}
    >
      <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-coffee-100 text-coffee-600">
        <span className="material-icons text-3xl">{product.icono || 'coffee'}</span>
      </div>

      <h3 className="mb-1 line-clamp-2 text-sm font-semibold text-coffee-800">
        {product.nombre}
      </h3>

      <p className="mb-2 text-base font-bold text-coffee-600">
        {formatCurrency(product.precio, moneda)}
      </p>

      <div className="mt-auto flex items-center justify-between">
        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${status.color}`}>
          {status.label}
        </span>
        <span className="text-xs text-coffee-500">Stock: {product.stock}</span>
      </div>

      {disabled && (
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white/70">
          <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white">
            AGOTADO
          </span>
        </div>
      )}
    </div>
  );
}
