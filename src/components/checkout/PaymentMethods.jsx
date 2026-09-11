const METHODS = [
  { key: 'efectivo', label: 'Efectivo', icon: 'payments' },
  { key: 'tarjeta', label: 'Tarjeta', icon: 'credit_card' },
  { key: 'transferencia', label: 'Transferencia', icon: 'account_balance' }
];

export default function PaymentMethods({ value, onChange }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {METHODS.map((m) => (
        <button
          key={m.key}
          type="button"
          onClick={() => onChange(m.key)}
          className={`flex flex-col items-center gap-1 rounded-xl border p-3 text-xs font-medium transition ${
            value === m.key
              ? 'border-coffee-500 bg-coffee-100 text-coffee-700'
              : 'border-coffee-200 bg-white text-coffee-500 hover:bg-coffee-50'
          }`}
        >
          <span className="material-icons text-[22px]">{m.icon}</span>
          {m.label}
        </button>
      ))}
    </div>
  );
}
