import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHistorialContext } from '../context/HistorialContext';
import { useCotizacion } from '../hooks/useCotizacion';
import { formatearPrecio } from '../utils/calculos';
import ModalConfirmacionEliminar from '../components/UI/ModalConfirmacionEliminar';
import './HistorialPage.css';

const HistorialPage = () => {
  const navigate = useNavigate();
  const { historial, eliminarDelHistorial, limpiarHistorial } = useHistorialContext();
  const { cargarCotizacionDesdeHistorial } = useCotizacion();

  // ✅ Estados para los modales de confirmación
  const [showModalEliminar, setShowModalEliminar] = useState(false);
  const [showModalLimpiarTodo, setShowModalLimpiarTodo] = useState(false);
  const [itemAEliminar, setItemAEliminar] = useState(null);

  console.log('📋 Historial actual:', historial);

  const handleVolverACotizacion = (cotizacionGuardada) => {
    console.log('🔄 Volviendo a cotización:', cotizacionGuardada);
    cargarCotizacionDesdeHistorial(cotizacionGuardada);
    navigate('/Cotizador-seguro');
  };

  // ✅ Función para abrir modal de eliminar item
  const handleAbrirModalEliminar = (item, event) => {
    event.stopPropagation();
    setItemAEliminar(item);
    setShowModalEliminar(true);
  };

  // ✅ Función para confirmar eliminación de item
  const handleConfirmarEliminar = () => {
    if (itemAEliminar) {
      eliminarDelHistorial(itemAEliminar.id);
      setItemAEliminar(null);
    }
    setShowModalEliminar(false);
  };

  // ✅ Función para cancelar eliminación
  const handleCancelarEliminar = () => {
    setItemAEliminar(null);
    setShowModalEliminar(false);
  };

  // ✅ Función para abrir modal de limpiar todo
  const handleAbrirModalLimpiarTodo = () => {
    setShowModalLimpiarTodo(true);
  };

  // ✅ Función para confirmar limpiar todo
  const handleConfirmarLimpiarTodo = () => {
    limpiarHistorial();
    setShowModalLimpiarTodo(false);
  };

  // ✅ Función para cancelar limpiar todo
  const handleCancelarLimpiarTodo = () => {
    setShowModalLimpiarTodo(false);
  };

  if (historial.length === 0) {
    return (
      <div className="historial-container">
        <div className="historial-header">
          <h1>📋 Historial de Cotizaciones</h1>
          <button onClick={() => navigate('/Cotizador-seguro')} className="btn btn-primary">
            ← Volver al Cotizador
          </button>
        </div>
        
        <div className="sin-historial">
          <div className="icono-grande">📊</div>
          <h2>No hay cotizaciones en el historial</h2>
          <p>Realiza una cotización y selecciona una cobertura para verla aquí</p>
          <button onClick={() => navigate('/Cotizador-seguro')} className="btn btn-primary">
            Crear Mi Primera Cotización
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="historial-container">
      <div className="historial-header">
        <h1>📋 Historial de Cotizaciones</h1>
        <div className="acciones-header">
          <button onClick={handleAbrirModalLimpiarTodo} className="btn btn-danger">
            🗑️ Limpiar Historial
          </button>
          <button onClick={() => navigate('/Cotizador-seguro')} className="btn btn-primary">
            ← Volver al Cotizador
          </button>
        </div>
      </div>

      <div className="estadisticas-historial">
        <div className="estadistica">
          <span className="numero">{historial.length}</span>
          <span className="label">Total de cotizaciones</span>
        </div>
        <div className="estadistica">
          <span className="numero">
            {historial.filter(item => item.coberturaSeleccionada).length}
          </span>
          <span className="label">Cotizaciones seleccionadas</span>
        </div>
      </div>

      <div className="lista-historial">
        {historial.map((item) => (
          <div 
            key={item.id} 
            className={`tarjeta-historial ${item.coberturaSeleccionada ? 'seleccionada' : ''}`}
            onClick={() => handleVolverACotizacion(item)}
          >
            <div className="header-historial">
              <div className="info-principal">
                <h3>{item.datosUsuario.nombre || 'Cotización sin nombre'}</h3>
                <span className="fecha">{item.fecha}</span>
              </div>
              
              <div className="acciones-historial">
                {item.coberturaSeleccionada && (
                  <span className="badge-seleccionada">
                    ✅ {item.coberturaSeleccionada.nombre}
                  </span>
                )}
                <button 
                  onClick={(e) => handleAbrirModalEliminar(item, e)}
                  className="btn-eliminar"
                  title="Eliminar cotización"
                >
                  🗑️
                </button>
              </div>
            </div>

            <div className="detalles-historial">
              <div className="detalle">
                <span className="etiqueta">Propiedad:</span>
                <span className="valor">
                  {item.datosUsuario.tipoPropiedad === 'casa' ? '🏠 Casa' : 
                   item.datosUsuario.tipoPropiedad === 'apartamento' ? '🏢 Apartamento' : '🏪 Local'}
                </span>
              </div>
              
              <div className="detalle">
                <span className="etiqueta">Ubicación:</span>
                <span className="valor">
                  {item.datosUsuario.ubicacion === 'urbana' ? '🏙️ Urbana' : '🌳 Rural'}
                </span>
              </div>
              
              <div className="detalle">
                <span className="etiqueta">Metros:</span>
                <span className="valor">{item.datosUsuario.metrosCuadrados} m²</span>
              </div>

              {item.coberturaSeleccionada && (
                <div className="detalle precio-final">
                  <span className="etiqueta">Precio seleccionado:</span>
                  <span className="valor precio">
                    {formatearPrecio(item.coberturaSeleccionada.precioFinal)}
                  </span>
                </div>
              )}
            </div>

            <div className="footer-historial">
              <span className="hint">Haz clic para ver detalles y editar</span>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Modal para eliminar item individual */}
      <ModalConfirmacionEliminar 
        show={showModalEliminar}
        onHide={handleCancelarEliminar}
        onConfirm={handleConfirmarEliminar}
        tipo="item"
        itemNombre={itemAEliminar?.datosUsuario.nombre || 'Cotización sin nombre'}
      />

      {/* ✅ Modal para limpiar todo el historial */}
      <ModalConfirmacionEliminar 
        show={showModalLimpiarTodo}
        onHide={handleCancelarLimpiarTodo}
        onConfirm={handleConfirmarLimpiarTodo}
        tipo="todo"
      />
    </div>
  );
};

export default HistorialPage;