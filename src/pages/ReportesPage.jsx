import Layout from '../components/layout/Layout';
import DailyStats from '../components/reportes/DailyStats';
import SalesHistory from '../components/historial/SalesHistory';
import { useSalesStore } from '../store/useSalesStore';

export default function ReportesPage() {
  const last10 = useSalesStore((s) => s.getLast10());

  return (
    <Layout title="Reportes">
      <div className="mx-auto max-w-6xl space-y-6 px-4 pt-4">
        <section>
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-coffee-500">
            Estadísticas del día
          </h2>
          <DailyStats />
        </section>

        <section>
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-coffee-500">
            Últimas 10 ventas
          </h2>
          <SalesHistory sales={last10} />
        </section>
      </div>
    </Layout>
  );
}
