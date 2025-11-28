import React from 'react';
import './ResumenCotizacion.css';

const ResumenCotizacion = ({ datosUsuario, onEditar }) => {
  const getTipoPropiedadTexto = (tipo) => {
    const tipos = {
      casa: '🏠 Casa',
      apartamento: '🏢 Apartamento', 
      local: '🏪 Local Comercial'
    };
    return tipos[tipo] || tipo;
  };

  const getUbicacionTexto = (ubicacion) => {
    return ubicacion === 'urbana' ? '🏙️ Urbana' : '🌳 Rural';
  };

  return (
    <div className="container mb-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8">
          <div className="card border-primary shadow">
            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">
                <i className="bi bi-file-text me-2"></i>
                Resumen de tu Cotización
              </h5>
              <button 
                className="btn btn-light btn-sm"
                onClick={onEditar}
              >
                <i className="bi bi-pencil me-1"></i>
                Editar
              </button>
            </div>
            
            <div className="card-body">
              <div className="row g-3">
                <div className="col-12 col-sm-6">
                  <div className="d-flex justify-content-between border-bottom pb-2">
                    <span className="fw-semibold">Nombre:</span>
                    <span>{datosUsuario.nombre}</span>
                  </div>
                </div>
                
                <div className="col-12 col-sm-6">
                  <div className="d-flex justify-content-between border-bottom pb-2">
                    <span className="fw-semibold">Edad:</span>
                    <span>{datosUsuario.edad} años</span>
                  </div>
                </div>
                
                <div className="col-12 col-sm-6">
                  <div className="d-flex justify-content-between border-bottom pb-2">
                    <span className="fw-semibold">Propiedad:</span>
                    <span>{getTipoPropiedadTexto(datosUsuario.tipoPropiedad)}</span>
                  </div>
                </div>
                
                <div className="col-12 col-sm-6">
                  <div className="d-flex justify-content-between border-bottom pb-2">
                    <span className="fw-semibold">Ubicación:</span>
                    <span>{getUbicacionTexto(datosUsuario.ubicacion)}</span>
                  </div>
                </div>
                
                <div className="col-12 col-sm-6">
                  <div className="d-flex justify-content-between border-bottom pb-2">
                    <span className="fw-semibold">Reclamaciones:</span>
                    <span>{datosUsuario.historialReclamaciones}</span>
                  </div>
                </div>
                
                <div className="col-12 col-sm-6">
                  <div className="d-flex justify-content-between border-bottom pb-2">
                    <span className="fw-semibold">Metros cuadrados:</span>
                    <span>{datosUsuario.metrosCuadrados} m²</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumenCotizacion;