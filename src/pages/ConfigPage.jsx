import { useState } from 'react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import Switch from '../components/ui/Switch';
import AlertModal from '../components/ui/AlertModal';
import { useConfigStore } from '../store/useConfigStore';
import { useOnboardingStore } from '../store/useOnboardingStore';
import { CURRENCIES } from '../data/currencies';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function ConfigPage() {
  const { negocio, moneda, impuestoPorcentaje, setNegocio, setMoneda, setImpuesto } =
    useConfigStore();
  const onboardingVisto = useOnboardingStore((s) => s.visto);
  const resetOnboarding = useOnboardingStore((s) => s.reset);
  const [resetModal, setResetModal] = useState(false);
  const navigate = useNavigate();

  const handleSave = () => {
    toast.success('Configuración guardada');
  };

  return (
    <Layout title="Configuración">
      <div className="mx-auto max-w-2xl space-y-6 px-4 pt-4">
        <section className="rounded-2xl bg-white p-5 shadow-sm">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-coffee-500">
            <span className="material-icons text-[18px]">storefront</span>
            Datos del negocio
          </h2>
          <div className="space-y-3">
            <Field
              label="Nombre"
              value={negocio.nombre}
              onChange={(v) => setNegocio({ nombre: v })}
            />
            <Field
              label="Dirección"
              value={negocio.direccion}
              onChange={(v) => setNegocio({ direccion: v })}
            />
            <Field
              label="Teléfono"
              value={negocio.telefono}
              onChange={(v) => setNegocio({ telefono: v })}
            />
          </div>
        </section>

        <section className="rounded-2xl bg-white p-5 shadow-sm">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-coffee-500">
            <span className="material-icons text-[18px]">payments</span>
            Moneda e impuestos
          </h2>

          <div className="space-y-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-coffee-700">
                Moneda
              </label>
              <select
                value={moneda}
                onChange={(e) => setMoneda(e.target.value)}
                className="w-full rounded-xl border border-coffee-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-coffee-500"
              >
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} - {c.label} ({c.symbol})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-coffee-700">
                Impuesto (%)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={impuestoPorcentaje}
                onChange={(e) => setImpuesto(e.target.value)}
                className="w-full rounded-xl border border-coffee-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-coffee-500"
              />
            </div>
          </div>
        </section>

        <section className="rounded-2xl bg-white p-5 shadow-sm">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-coffee-500">
            <span className="material-icons text-[18px]">help_outline</span>
            Guía
          </h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-coffee-800">Guía paso a paso</p>
              <p className="text-xs text-coffee-500">
                {onboardingVisto ? 'Ya vista' : 'Pendiente'}
              </p>
            </div>
            <Button
              variant="outline"
              icon="restart_alt"
              onClick={() => setResetModal(true)}
            >
              Ver de nuevo
            </Button>
          </div>
        </section>

        <Button variant="primary" className="w-full" icon="save" onClick={handleSave}>
          Guardar cambios
        </Button>
      </div>

      <AlertModal
        open={resetModal}
        onClose={() => setResetModal(false)}
        type="info"
        title="Mostrar guía"
        message="Se reiniciará la guía paso a paso. ¿Deseas continuar?"
        confirmText="Sí, mostrar"
        cancelText="Cancelar"
        onConfirm={() => {
          resetOnboarding();
          navigate('/');
        }}
      />
    </Layout>
  );
}

function Field({ label, value, onChange }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-coffee-700">
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-coffee-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-coffee-500"
      />
    </div>
  );
}
