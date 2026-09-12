import { useEffect, useState, Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import VentaPage from './pages/VentaPage';
import MesasPage from './pages/MesasPage';
import ProductosPage from './pages/ProductosPage';
import ReportesPage from './pages/ReportesPage';
import HistorialPage from './pages/HistorialPage';
import ConfigPage from './pages/ConfigPage';
import Onboarding from './components/onboarding/Onboarding';
import { useOnboardingStore } from './store/useOnboardingStore';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('Error capturado:', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 24, fontFamily: 'sans-serif', color: '#2B1D14' }}>
          <h2 style={{ color: '#c00' }}>Algo se rompió</h2>
          <p><strong>Mensaje:</strong> {String(this.state.error.message)}</p>
          <pre style={{
            background: '#f5f5f5',
            padding: 12,
            borderRadius: 8,
            overflow: 'auto',
            fontSize: 12
          }}>
            {String(this.state.error.stack)}
          </pre>
          <button
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
            style={{
              marginTop: 16,
              padding: '10px 16px',
              background: '#6F4E37',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              fontSize: 14
            }}
          >
            Borrar datos y recargar
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const visto = useOnboardingStore((s) => s.visto);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    if (!visto) setShowOnboarding(true);
  }, [visto]);

  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  );
}
