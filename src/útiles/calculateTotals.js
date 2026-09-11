export function calculateTotals(items, taxPercent = 0) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.precio * item.cantidad,
    0
  );
  const impuesto = +(subtotal * (taxPercent / 100)).toFixed(2);
  const total = +(subtotal + impuesto).toFixed(2);
  return { subtotal, impuesto, total };
}
