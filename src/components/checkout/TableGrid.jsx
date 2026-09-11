import TableCard from './TableCard';

export default function TableGrid({ tables, onSelect }) {
  if (tables.length === 0) {
    return (
      <div className="flex flex-col items-center py-16 text-coffee-400">
        <span className="material-icons text-5xl">table_restaurant</span>
        <p className="mt-3 text-sm">No hay mesas en este filtro</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {tables.map((t) => (
        <TableCard key={t.id} table={t} onClick={onSelect} />
      ))}
    </div>
  );
}
