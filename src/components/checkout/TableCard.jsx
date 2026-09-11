import { formatCurrency } from '../../utils/formatCurrency';
import { useConfigStore } from '../../store/useConfigStore';

export default function TableCard({ table, onClick }) {
  const moneda = useConfigStore((s) => s.moneda);
  const ocupada = table.estado === 'ocupada';

  return (
    <div
      onClick={() => onClick(table)}
      className={`cursor-pointer rounded-2xl p-4 text-center shadow-sm transition-all hover:shadow-md active:scale-95 ${
        ocupada ? 'bg-amber-50 border border-amber-200' : 'bg-white border border-coffee-100'
      }`}
    >
      <div
        className={`mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full ${
          ocupada ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600'
        }`}
      >
        <span className="material-icons text-2xl">table_restaurant</span>
      </div>
      <p className="text-sm font-bold text-coffee-800">Mesa {table.id}</p>
      <p className={`text-xs ${ocupada ? 'text-amber-600' : 'text-green-600'}`}>
        {ocupada ? 'Ocupada' : 'Libre'}
      </p>
      {ocupada && (
        <p className="mt-1 text-sm font-bold text-coffee-700">
          {formatCurrency(table.total, moneda)}
        </p>
      )}
    </div>
  );
}
