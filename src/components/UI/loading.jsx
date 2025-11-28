import React from 'react';

const Loading = ({ mensaje = "Calculando tu cotización" }) => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          <div className="card border-0 shadow text-center py-5">
            <div className="card-body">
              <div className="spinner-border text-primary mb-3" style={{width: '3rem', height: '3rem'}} role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
              <h5 className="text-primary">{mensaje}</h5>
              <p className="text-muted mb-0">Estamos procesando tu información...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;