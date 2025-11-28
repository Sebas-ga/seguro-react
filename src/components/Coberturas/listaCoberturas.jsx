import React from 'react';
import { formatearPrecio } from '../../utils/calculos';
import './ListaCoberturas.css';

const ListaCoberturas = ({ cotizaciones, onSeleccionarCobertura }) => {
  const handleSeleccionarCobertura = (cobertura) => {
    if (typeof onSeleccionarCobertura === 'function') {
      onSeleccionarCobertura(cobertura);
    } else {
      console.error('onSeleccionarCobertura no es una función');
      alert(`Has seleccionado: ${cobertura.nombre}\nPrecio: ${formatearPrecio(cobertura.precioFinal)}`);
    }
  };

  if (!cotizaciones || cotizaciones.length === 0) {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8">
            <div className="alert alert-info text-center py-4">
              <i className="bi bi-info-circle display-4 text-info mb-3"></i>
              <h3>No hay cotizaciones disponibles</h3>
              <p className="mb-0">Complete el formulario para generar las cotizaciones</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12 text-center mb-4">
           <h2 className="display-5 fw-bold" style={{ color: '#1a365d' }}>
            <i className="bi bi-graph-up me-3"></i>
            Tus Opciones de Cobertura
          </h2>
          <p className="lead text-muted">
            Hemos calculado estas opciones personalizadas para ti
          </p>
        </div>
      </div>
      
      <div className="row g-4">
        {cotizaciones.map((cobertura) => (
          <div key={cobertura.id} className="col-12 col-md-6 col-lg-4">
            <div 
              className="card h-100 shadow-sm border-0 hover-shadow"
              style={{ borderLeft: `4px solid ${cobertura.color}` }}
            >
              <div className="card-header bg-transparent border-0 pb-0">
                <div className="d-flex align-items-center">
                  <span className="display-6">{cobertura.icono}</span>
                  <h5 className="card-title mb-0 ms-3">{cobertura.nombre}</h5>
                </div>
              </div>
              
              <div className="card-body pt-0">
                <p className="card-text text-muted small">{cobertura.descripcion}</p>
                
                <div className="text-center my-4 p-3 bg-light rounded">
                  <div className="h2 fw-bold text-dark mb-0">
                    {formatearPrecio(cobertura.precioFinal)}
                  </div>
                  <small className="text-muted">por año</small>
                </div>
                
                <div className="mb-3">
                  <h6 className="fw-semibold text-success">
                    <i className="bi bi-check-circle me-2"></i>
                    Incluye:
                  </h6>
                  <ul className="list-unstyled small">
                    {cobertura.coberturasIncluidas.map((item, index) => (
                      <li key={index} className="mb-1">
                        <i className="bi bi-check text-success me-2"></i>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="card-footer bg-transparent border-0 pt-0">
               <button 
                 className="btn btn-success w-100 py-3 fw-semibold hover-lift"
                 onClick={() => handleSeleccionarCobertura(cobertura)}
               >
                <i className="bi bi-check-circle me-2"></i>
                  Seleccionar Plan
              </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaCoberturas;