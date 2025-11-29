import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { HistorialProvider } from './context/HistorialContext';
import CotizadorPage from './pages/CotizadorPage';
import HistorialPage from './pages/HistorialPage';
import './index.css';

function Navigation() {
  const location = useLocation();

  return (
    <nav className="nav nav-pills justify-content-center">
      <Link 
        to="/cotizador-seguro"  // ruta raíz
        className={`nav-link ${location.pathname === '/cotizador-seguro' ? 'active bg-white text-primary' : 'text-white'}`}
      >
        <i className="bi bi-house me-2"></i>
        Cotizador
      </Link>
      <Link 
        to="/historial"  // ruta historial
        className={`nav-link ${location.pathname === '/historial' ? 'active bg-white text-primary' : 'text-white'}`}
      >
        <i className="bi bi-clock-history me-2"></i>
        Historial
      </Link>
    </nav>
  );
}

function App() {
  return (
    <HistorialProvider>
      <div className="min-vh-100" style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <header className="pt-4 pb-3">
          <div className="container">
            <div className="text-center text-white">
              <h1 className="display-4 fw-bold mb-2">
                <i className="bi bi-shield-check me-3"></i>
                Cotizador de Seguros
              </h1>
              <p className="lead mb-3 opacity-75">
                Obtén tu cotización personalizada en segundos
              </p>
              <Navigation />
            </div>
          </div>
        </header>

        <main className="py-3" style={{ minHeight: 'calc(100vh - 200px)' }}>
          <Routes>
            <Route path="/cotizador-seguro" element={<CotizadorPage />} /> 
            <Route path="/historial" element={<HistorialPage />} /> 
          </Routes>
        </main>

        <footer className="py-4 mt-5">
          <div className="container">
            <div className="text-center text-white opacity-75">
              <p className="mb-0">
                © 2025 Cotizador de Seguros - Todos los derechos reservados
              </p>
            </div>
          </div>
        </footer>
      </div>
    </HistorialProvider>
  );
}

export default App;