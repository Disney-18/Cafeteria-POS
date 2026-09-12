import { useState } from 'react';
import Layout from '../components/layout/Layout';
import TableGrid from '../components/mesas/TableGrid';
import TableDetailModal from '../components/mesas/TableDetailModal';
import Chip from '../components/ui/Chip';
import { useTableStore } from '../store/useTableStore';

const FILTERS = [
  { key: 'todas', label: 'Todas' },
  { key: 'libres', label: 'Libres' },
  { key: 'ocupadas', label: 'Ocupadas' }
];

export default function MesasPage() {
  const tables = useTableStore((s) => s.tables);
  const [filter, setFilter] = useState('todas');
  const [selected, setSelected] = useState(null);

  const filtered = tables.filter((t) => {
    if (filter === 'libres') return t.estado === 'libre';
    if (filter === 'ocupadas') return t.estado === 'ocupada';
    return true;
  });

  return (
    <Layout title="Gestión de Mesas">
      <div className="mx-auto max-w-6xl px-4 pt-4">
        <div className="mb-4 flex gap-2">
          {FILTERS.map((f) => (
            <Chip
              key={f.key}
              active={filter === f.key}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </Chip>
          ))}
        </div>

        <TableGrid tables={filtered} onSelect={setSelected} />
      </div>

      <TableDetailModal
        table={selected}
        open={!!selected}
        onClose={() => setSelected(null)}
      />
    </Layout>
  );
}
