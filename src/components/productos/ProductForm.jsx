import { useState } from 'react';
import { CATEGORIES, ICON_OPTIONS } from '../../data/defaultProducts';
import Button from '../ui/Button';

const EMPTY = {
  nombre: '',
  categoria: 'Cafés',
  precio: 0,
  stock: 0,
  icono: 'coffee'
};

export default function ProductForm({ initial, onSubmit, onCancel }) {
  const [form, setForm] = useState(initial || EMPTY);
  const [error, setError] = useState('');

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre.trim()) return setError('El nombre es obligatorio');
    if (form.precio < 0) return setError('El precio no puede ser negativo');
    if (form.stock < 0) return setError('El stock no puede ser negativo');
    setError('');
    onSubmit({
      ...form,
      nombre: form.nombre.trim(),
      precio: Number(form.precio),
      stock: Number(form.stock)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6">
      <h2 className="text-lg font-bold text-coffee-800">
        {initial ? 'Editar producto' : 'Nuevo producto'}
      </h2>

      {error && (
        <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
          {error}
        </div>
      )}

      <div>
        <label className="mb-1 block text-sm font-medium text-coffee-700">
          Nombre
        </label>
        <input
          value={form.nombre}
          onChange={(e) => update('nombre', e.target.value)}
          className="w-full rounded-xl border border-coffee-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-coffee-500"
          placeholder="Ej: Capuchino"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-coffee-700">
          Categoría
        </label>
        <select
          value={form.categoria}
          onChange={(e) => update('categoria', e.target.value)}
          className="w-full rounded-xl border border-coffee-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-coffee-500"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-sm font-medium text-coffee-700">
            Precio
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={form.precio}
            onChange={(e) => update('precio', e.target.value)}
            className="w-full rounded-xl border border-coffee-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-coffee-500"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-coffee-700">
            Stock
          </label>
          <input
            type="number"
            min="0"
            value={form.stock}
            onChange={(e) => update('stock', e.target.value)}
            className="w-full rounded-xl border border-coffee-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-coffee-500"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-coffee-700">
          Icono
        </label>
        <div className="grid grid-cols-6 gap-2">
          {ICON_OPTIONS.map((ic) => (
            <button
              key={ic}
              type="button"
              onClick={() => update('icono', ic)}
              className={`flex h-11 items-center justify-center rounded-xl border transition ${
                form.icono === ic
                  ? 'border-coffee-500 bg-coffee-100 text-coffee-700'
                  : 'border-coffee-200 bg-white text-coffee-500 hover:bg-coffee-50'
              }`}
            >
              <span className="material-icons">{ic}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
        )}
        <Button type="submit" variant="primary" icon="save">
          Guardar
        </Button>
      </div>
    </form>
  );
}
