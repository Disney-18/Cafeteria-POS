import StatCard from './StatCard';
import { formatCurrency } from '../../utils/formatCurrency';
import { useConfigStore } from '../../store/useConfigStore';
import { useProductStore } from '../../store/useProductStore';
import { useSalesStore } from '../../store/useSalesStore';

export default function DailyStats() {
  const moneda = useConfigStore((s) => s.moneda);
  const products = useProductStore((s) => s.products);
  const { total, count, ticketPromedio } = useSalesStore((s) => s.getTodayStats());

  const stockTotal = products.reduce((s, p) => s + p.stock, 0);

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <StatCard
        icon="attach_money"
        label="Ventas del día"
        value={formatCurrency(total, moneda)}
        color="bg-green-100 text-green-700"
      />
      <StatCard
        icon="receipt"
        label="Órdenes"
        value={count}
        color="bg-blue-100 text-blue-700"
      />
      <StatCard
        icon="inventory_2"
        label="Productos en stock"
        value={stockTotal}
        color="bg-amber-100 text-amber-700"
      />
      <StatCard
        icon="trending_up"
        label="Ticket promedio"
        value={formatCurrency(ticketPromedio, moneda)}
        color="bg-purple-100 text-purple-700"
      />
    </div>
  );
}
