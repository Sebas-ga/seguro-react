import React from 'react';
import { formatearPrecio } from '../../utils/calculos';

const ModalConfirmacion = ({ 
  show, 
  onHide, 
  cobertura, 
  onConfirm,
  esActualizacion = false 
}) => {
  if (!show) return null;

  return (
    <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow compact-modal">
          {/* Header del Modal */}
          <div className="modal-header bg-success text-white py-2">
            <h6 className="modal-title mb-0 fw-semibold">
              <i className="bi bi-check-circle-fill me-2"></i>
              {esActualizacion ? '✅ Cotización Actualizada' : '¡Excelente Elección!'}
            </h6>
            <button 
              type="button" 
              className="btn-close btn-close-white" 
              onClick={onHide}
            ></button>
          </div>
          
          {/* Body del Modal */}
          <div className="modal-body p-3">
            <div className="text-center mb-3">
              <div className="fs-1 text-success mb-2">
                {cobertura.icono}
              </div>
              <h5 className="fw-bold text-dark mb-1">{cobertura.nombre}</h5>
              <p className="text-muted small mb-2">{cobertura.descripcion}</p>
            </div>

            {/* Precio */}
            <div className="card bg-light border-0 mb-3 py-2">
              <div className="card-body text-center p-2">
                <span className="text-muted small">Precio final:</span>
                <div className="h4 fw-bold text-success mb-0">
                  {formatearPrecio(cobertura.precioFinal)}
                </div>
                <span className="text-muted small">por año</span>
              </div>
            </div>

            {/* Características */}
            <div className="mb-3">
              <h6 className="fw-semibold text-dark mb-2 small">
                <i className="bi bi-list-check me-1 text-success"></i>
                Características incluidas:
              </h6>
              <div className="row g-1">
                {cobertura.coberturasIncluidas.slice(0, 6).map((item, index) => (
                  <div key={index} className="col-12 col-sm-6">
                    <div className="d-flex align-items-center p-1 bg-white rounded border">
                      <i className="bi bi-check-circle-fill text-success me-1 small"></i>
                      <small className="text-dark">{item}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mensaje de confirmación */}
            <div className="alert alert-info border-0 py-2 mb-0">
              <div className="d-flex align-items-center">
                <i className="bi bi-info-circle-fill text-info me-2 small"></i>
                <div>
                  <small className="fw-semibold">
                    {esActualizacion ? 'Cotización actualizada en' : 'Guardado en'} tu historial
                  </small>
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer del Modal */}
          <div className="modal-footer py-2">
            <button 
              type="button" 
              className="btn btn-outline-secondary btn-sm" 
              onClick={onHide}
            >
              <i className="bi bi-arrow-left me-1"></i>
              {esActualizacion ? 'Mantener anterior' : 'Ver otras opciones'}
            </button>
            <button 
              type="button" 
              className="btn btn-success btn-sm" 
              onClick={onConfirm}
            >
              <i className="bi bi-check-lg me-1"></i>
              {esActualizacion ? 'Seleccionar' : '¡Perfecto!'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmacion;