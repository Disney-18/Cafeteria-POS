import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import VentaPage from './pages/VentaPage';
import MesasPage from './pages/MesasPage';
import ProductosPage from './pages/ProductosPage';
import ReportesPage from './pages/ReportesPage';
import HistorialPage from './pages/HistorialPage';
import ConfigPage from './pages/ConfigPage';
import Onboarding from './components/onboarding/Onboarding';
import { useOnboardingStore } from './store/useOnboardingStore';

export default function App() {
  const visto = useOnboardingStore((s) => s.visto);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    if (!visto) setShowOnboarding(true);
  }, [visto]);

  return (
    <>
      {showOnboarding && (
        <Onboarding onFinish={() => setShowOnboarding(false)} />
      )}

      <Routes>
        <Route path="/" element={<VentaPage />} />
        <Route path="/mesas" element={<MesasPage />} />
        <Route path="/productos" element={<ProductosPage />} />
        <Route path="/reportes" element={<ReportesPage />} />
        <Route path="/historial" element={<HistorialPage />} />
        <Route path="/config" element={<ConfigPage />} />
      </Routes>
    </>
  );
}
