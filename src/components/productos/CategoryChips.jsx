import Chip from '../ui/Chip';

export default function CategoryChips({ categories, active, onChange, counts }) {
  return (
    <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-2">
      <Chip
        active={active === 'Todas'}
        onClick={() => onChange('Todas')}
        count={counts?.Todas}
      >
        Todas
      </Chip>
      {categories.map((cat) => (
        <Chip
          key={cat}
          active={active === cat}
          onClick={() => onChange(cat)}
          count={counts?.[cat]}
        >
          {cat}
        </Chip>
      ))}
    </div>
  );
}
