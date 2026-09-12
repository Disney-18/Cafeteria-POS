export function stockStatus(stock) {
  if (stock <= 0) return { key: 'out', label: 'Agotado', color: 'bg-red-100 text-red-700' };
  if (stock <= 10) return { key: 'low', label: 'Stock bajo', color: 'bg-amber-100 text-amber-700' };
  return { key: 'ok', label: 'Disponible', color: 'bg-green-100 text-green-700' };
}
