export default function Chip({ active, children, count, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex-shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all ${
        active
          ? 'bg-coffee-500 text-white shadow'
          : 'bg-white text-coffee-600 hover:bg-coffee-100 border border-coffee-200'
      }`}
    >
      {children}
      {typeof count === 'number' && (
        <span
          className={`ml-2 rounded-full px-1.5 py-0.5 text-xs ${
            active ? 'bg-white/20' : 'bg-coffee-100 text-coffee-700'
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );
}
