export default function StatCard({ icon, label, value, color = 'bg-coffee-100 text-coffee-700' }) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <div className={`mb-2 flex h-10 w-10 items-center justify-center rounded-xl ${color}`}>
        <span className="material-icons">{icon}</span>
      </div>
      <p className="text-xs text-coffee-500">{label}</p>
      <p className="mt-1 text-lg font-bold text-coffee-800">{value}</p>
    </div>
  );
}
