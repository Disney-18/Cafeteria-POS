import { useConfigStore } from '../../store/useConfigStore';

export default function Header({ title }) {
  const nombre = useConfigStore((s) => s.negocio.nombre);

  return (
    <header className="sticky top-0 z-30 border-b border-coffee-100 bg-white/95 px-4 py-3 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-coffee-500 text-white">
            <span className="material-icons">local_cafe</span>
          </div>
          <div>
            <h1 className="text-base font-bold leading-tight text-coffee-800">
              {title || 'Punto de Venta'}
            </h1>
            <p className="text-xs text-coffee-500">{nombre}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
