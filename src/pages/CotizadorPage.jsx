import React from 'react';
import FormularioDatos from '../components/Formulario/FormularioDatos';
import ListaCoberturas from '../components/Coberturas/ListaCoberturas';
import ResumenCotizacion from '../components/UI/ResumenCotizacion';
import Loading from '../components/UI/Loading';
import ModalConfirmacion from '../components/UI/ModalConfirmacion';
import { useCotizacion } from '../hooks/useCotizacion';

const CotizadorPage = () => {
  const {
    datosUsuario,
    actualizarDatos,
    cotizaciones,
    errores,
    mostrarResultados,
    mostrarFormulario,
    cargando,
    calcularCotizacion,
    reiniciarCotizacion,
    editarDatos,
    seleccionarCobertura,
    coberturaSeleccionada,
    mostrarModalConfirmacion,
    confirmarSeleccion,
    cancelarSeleccion,
    cotizacionActualId //estado de cotización actual
  } = useCotizacion();

  return (
    <>
      {errores.general && (
        <div className="container mb-4">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8">
              <div className="alert alert-danger alert-dismissible fade show" role="alert">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                <strong>Error:</strong> {errores.general}
                <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
              </div>
            </div>
          </div>
        </div>
      )}

      {mostrarFormulario && (
        <FormularioDatos 
          datosUsuario={datosUsuario}
          actualizarDatos={actualizarDatos}
          cargando={cargando}
          calcularCotizacion={calcularCotizacion}
        />
      )}

      {cargando && <Loading />}

      {mostrarResultados && (
        <>
          <ResumenCotizacion 
            datosUsuario={datosUsuario}
            onEditar={editarDatos}
          />
          
          <ListaCoberturas 
            cotizaciones={cotizaciones}
            onSeleccionarCobertura={seleccionarCobertura}
          />
          
          <div className="container text-center mt-4">
            <button 
              onClick={reiniciarCotizacion}
              className="btn btn-outline-primary btn-lg"
            >
              <i className="bi bi-arrow-repeat me-2"></i>
              Realizar Nueva Cotización
            </button>
          </div>
        </>
      )}

      {/* Modal de Confirmación */}
      <ModalConfirmacion 
        show={mostrarModalConfirmacion}
        onHide={cancelarSeleccion}
        cobertura={coberturaSeleccionada}
        onConfirm={confirmarSeleccion}
        esActualizacion={!!cotizacionActualId} // ✅ Pasar si es actualización
      />
    </>
  );
};

export default CotizadorPage;