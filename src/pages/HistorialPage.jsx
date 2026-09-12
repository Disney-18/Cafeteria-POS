import Layout from '../components/layout/Layout';
import SalesHistory from '../components/historial/SalesHistory';
import { useSalesStore } from '../store/useSalesStore';

export default function HistorialPage() {
  const sales = useSalesStore((s) => s.sales);

  return (
    <Layout title="Historial de Ventas">
      <div className="mx-auto max-w-6xl px-4 pt-4">
        <SalesHistory sales={sales} />
      </div>
    </Layout>
  );
}
