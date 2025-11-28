import React from 'react';

const ModalConfirmacionEliminar = ({ 
  show, 
  onHide, 
  onConfirm,
  tipo = 'item', // 'item' para eliminar uno, 'todo' para limpiar todo
  itemNombre = '' 
}) => {
  if (!show) return null;

  const esLimpiarTodo = tipo === 'todo';
  const titulo = esLimpiarTodo ? 'Limpiar Historial' : 'Eliminar Cotización';
  const mensaje = esLimpiarTodo 
    ? '¿Estás seguro de que quieres limpiar todo el historial?'
    : `¿Estás seguro de que quieres eliminar la cotización de "${itemNombre}"?`;
  const textoConfirmar = esLimpiarTodo ? 'Sí, limpiar todo' : 'Sí, eliminar';
  const colorBoton = esLimpiarTodo ? 'danger' : 'warning';

  return (
    <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow">
          {/* Header del Modal */}
          <div className={`modal-header bg-${colorBoton} text-white py-3`}>
            <h5 className="modal-title fw-semibold">
              <i className={`bi bi-${esLimpiarTodo ? 'trash' : 'exclamation-triangle'}-fill me-2`}></i>
              {titulo}
            </h5>
            <button 
              type="button" 
              className="btn-close btn-close-white" 
              onClick={onHide}
            ></button>
          </div>
          
          {/* Body del Modal */}
          <div className="modal-body p-4 text-center">
            <div className={`display-1 text-${colorBoton} mb-3`}>
              {esLimpiarTodo ? '🗑️' : '⚠️'}
            </div>
            
            <h6 className="fw-semibold text-dark mb-3">
              {mensaje}
            </h6>
            
            <p className="text-muted small mb-0">
              {esLimpiarTodo 
                ? 'Esta acción no se puede deshacer y perderás todas tus cotizaciones guardadas.'
                : 'Esta acción no se puede deshacer.'
              }
            </p>
          </div>
          
          {/* Footer del Modal */}
          <div className="modal-footer border-0">
            <button 
              type="button" 
              className="btn btn-outline-secondary" 
              onClick={onHide}
            >
              <i className="bi bi-x-circle me-2"></i>
              Cancelar
            </button>
            <button 
              type="button" 
              className={`btn btn-${colorBoton}`} 
              onClick={onConfirm}
            >
              <i className="bi bi-check-lg me-2"></i>
              {textoConfirmar}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmacionEliminar;