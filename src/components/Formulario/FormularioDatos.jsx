import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { esquemaValidacion } from '../../utils/esquemaValidacion';
import './FormularioDatos.css';

const FormularioDatos = ({ 
  datosUsuario, 
  actualizarDatos, 
  cargando, 
  calcularCotizacion 
}) => {
  const initialValues = {
    nombre: datosUsuario.nombre || '',
    edad: datosUsuario.edad || '',
    tipoPropiedad: datosUsuario.tipoPropiedad || 'casa',
    ubicacion: datosUsuario.ubicacion || 'urbana',
    historialReclamaciones: datosUsuario.historialReclamaciones || '0',
    metrosCuadrados: datosUsuario.metrosCuadrados || ''
  };

  const handleSubmit = (values, { setSubmitting }) => {
    actualizarDatos(values);
    calcularCotizacion();
    setSubmitting(false);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div className="card shadow-lg border-0 compact-form">
            <div className="card-header bg-primary text-white text-center py-3">
              <h4 className="mb-0 fw-semibold">
                <i className="bi bi-clipboard-data me-2"></i>
                Datos personales para la cotización 
              </h4>
            </div>
            
            <div className="card-body p-3">
              <Formik
                initialValues={initialValues}
                validationSchema={esquemaValidacion}
                onSubmit={handleSubmit}
                enableReinitialize
              >
                {({ isSubmitting, values, handleChange, handleBlur }) => (
                  <Form>
                    {/* Fila 1: Nombre y Edad */}
                    <div className="row g-2 mb-3">
                      <div className="col-12 col-sm-6">
                        <label htmlFor="nombre" className="form-label small fw-semibold text-muted">
                          Nombre completo
                        </label>
                        <Field
                          type="text"
                          id="nombre"
                          name="nombre"
                          placeholder="Ej: Juan Pérez"
                          className={`form-control ${values.nombre && values.nombre.trim() ? 'is-valid' : ''}`}
                        />
                        <ErrorMessage name="nombre" component="div" className="text-danger small mt-1" />
                      </div>
                      
                      <div className="col-12 col-sm-6">
                        <label htmlFor="edad" className="form-label small fw-semibold text-muted">
                          Edad
                        </label>
                        <Field
                          type="number"
                          id="edad"
                          name="edad"
                          min="18"
                          max="100"
                          placeholder="30"
                          className={`form-control ${values.edad ? 'is-valid' : ''}`}
                        />
                        <ErrorMessage name="edad" component="div" className="text-danger small mt-1" />
                      </div>
                    </div>

                    {/* Fila 2: Tipo Propiedad y Metros */}
                    <div className="row g-2 mb-3">
                      <div className="col-12 col-sm-6">
                        <label htmlFor="tipoPropiedad" className="form-label small fw-semibold text-muted">
                          Tipo de propiedad
                        </label>
                        <Field as="select" id="tipoPropiedad" name="tipoPropiedad" className="form-select">
                          <option value="casa">🏠 Casa</option>
                          <option value="apartamento">🏢Departamento</option>
                          <option value="local">🏪 Local</option>
                        </Field>
                      </div>
                      
                      <div className="col-12 col-sm-6">
                        <label htmlFor="metrosCuadrados" className="form-label small fw-semibold text-muted">
                          Metros cuadrados
                        </label>
                        <Field
                          type="number"
                          id="metrosCuadrados"
                          name="metrosCuadrados"
                          min="20"
                          max="1000"
                          placeholder="80"
                          className={`form-control ${values.metrosCuadrados ? 'is-valid' : ''}`}
                        />
                        <ErrorMessage name="metrosCuadrados" component="div" className="text-danger small mt-1" />
                      </div>
                    </div>

                    {/* Ubicación - Más compacta */}
                    <div className="mb-3">
                      <label className="form-label small fw-semibold text-muted mb-2">
                        Ubicación
                      </label>
                      <div className="row g-2">
                        <div className="col-6">
                          <div className="form-check card h-100 m-0 location-card">
                            <Field
                              type="radio"
                              name="ubicacion"
                              value="urbana"
                              id="urbana"
                              className="form-check-input"
                            />
                            <label htmlFor="urbana" className="form-check-label card-body text-center p-2">
                              <i className="bi bi-building text-primary fs-5"></i>
                              <div className="small mt-1">Urbana</div>
                            </label>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="form-check card h-100 m-0 location-card">
                            <Field
                              type="radio"
                              name="ubicacion"
                              value="rural"
                              id="rural"
                              className="form-check-input"
                            />
                            <label htmlFor="rural" className="form-check-label card-body text-center p-2">
                              <i className="bi bi-tree text-success fs-5"></i>
                              <div className="small mt-1">Rural</div>
                            </label>
                          </div>
                        </div>
                      </div>
                      <ErrorMessage name="ubicacion" component="div" className="text-danger small mt-1" />
                    </div>

                    {/* Historial de Reclamaciones - Más pequeño */}
                    <div className="mb-4">
                      <label htmlFor="historialReclamaciones" className="form-label small fw-semibold text-muted">
                        Reclamaciones (últimos 5 años)
                      </label>
                      <Field
                        type="number"
                        id="historialReclamaciones"
                        name="historialReclamaciones"
                        min="0"
                        max="10"
                        placeholder="0"
                        className={`form-control ${values.historialReclamaciones ? 'is-valid' : ''}`}
                      />
                      <div className="form-text small text-muted">
                        Cantidad de reclamaciones anteriores
                      </div>
                      <ErrorMessage name="historialReclamaciones" component="div" className="text-danger small mt-1" />
                    </div>

                    {/* Botón de Envío */}
                    <button 
                      type="submit" 
                      className={`btn btn-primary w-100 py-2 fw-semibold ${cargando ? 'disabled' : ''}`}
                      disabled={cargando || isSubmitting}
                    >
                      {cargando ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          Calculando...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-lightning-charge me-2"></i>
                          Calcular Cotización..
                        </>
                      )}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormularioDatos;