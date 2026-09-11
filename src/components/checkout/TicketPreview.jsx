import { formatDateTime } from '../../utils/formatDate';
import { formatCurrency } from '../../utils/formatCurrency';
import { useConfigStore } from '../../store/useConfigStore';

export default function TicketPreview({ sale }) {
  const { negocio, moneda } = useConfigStore();

  if (!sale) return null;

  return (
    <div
      id="print-ticket"
      className="mx-auto max-w-xs rounded-lg border border-coffee-200 bg-white p-4 font-mono text-xs text-coffee-800"
    >
      <div className="text-center">
        <h3 className="text-sm font-bold uppercase">{negocio.nombre}</h3>
        <p>{negocio.direccion}</p>
        <p>Tel: {negocio.telefono}</p>
      </div>

      <div className="my-3 border-t border-dashed border-coffee-300" />

      <div className="space-y-0.5">
        <Line label="Ticket" value={sale.numero} />
        <Line label="Fecha" value={formatDateTime(sale.fecha)} />
        {sale.mesa && <Line label="Mesa" value={sale.mesa} />}
        {sale.cliente && <Line label="Cliente" value={sale.cliente} />}
        <Line label="Tipo" value={sale.tipo === 'mesa' ? 'En mesa' : 'Para llevar'} />
      </div>

      <div className="my-3 border-t border-dashed border-coffee-300" />

      <table className="w-full">
        <thead>
          <tr className="border-b border-dashed border-coffee-300">
            <th className="pb-1 text-left font-bold">Cant</th>
            <th className="pb-1 text-left font-bold">Producto</th>
            <th className="pb-1 text-right font-bold">Importe</th>
          </tr>
        </thead>
        <tbody>
          {sale.items.map((it, i) => (
            <tr key={i}>
              <td className="py-0.5">{it.cantidad}</td>
              <td className="py-0.5">{it.nombre}</td>
              <td className="py-0.5 text-right">
                {formatCurrency(it.precio * it.cantidad, moneda)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="my-3 border-t border-dashed border-coffee-300" />

      <div className="space-y-0.5">
        <Line label="Subtotal" value={formatCurrency(sale.subtotal, moneda)} />
        <Line label="Impuesto" value={formatCurrency(sale.impuesto, moneda)} />
        <Line label="TOTAL" value={formatCurrency(sale.total, moneda)} bold />
        <Line label="Método" value={sale.metodoPago.toUpperCase()} />
        {sale.metodoPago === 'efectivo' && (
          <>
            <Line label="Recibido" value={formatCurrency(sale.recibido, moneda)} />
            <Line label="Cambio" value={formatCurrency(sale.cambio, moneda)} />
          </>
        )}
      </div>

      <div className="my-3 border-t border-dashed border-coffee-300" />
      <p className="text-center">¡Gracias por su compra!</p>
    </div>
  );
}

function Line({ label, value, bold }) {
  return (
    <div className={`flex justify-between ${bold ? 'font-bold' : ''}`}>
      <span>{label}:</span>
      <span>{value}</span>
    </div>
  );
}
