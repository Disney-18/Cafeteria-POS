import SaleRow from './SaleRow';

export default function SalesHistory({ sales }) {
  if (sales.length === 0) {
    return (
      <div className="flex flex-col items-center py-16 text-coffee-400">
        <span className="material-icons text-5xl">receipt_long</span>
        <p className="mt-3 text-sm">Aún no hay ventas registradas</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {sales.map((s) => (
        <SaleRow key={s.id} sale={s} />
      ))}
    </div>
  );
}
