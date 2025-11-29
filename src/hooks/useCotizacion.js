import { useState, useContext,useEffect } from 'react';
import { calcularTodasCoberturas, formatearPrecio } from '../utils/calculos';
import { HistorialContext } from '../context/HistorialContext';

export const useCotizacion = () => {
  const [datosUsuario, setDatosUsuario] = useState({
    nombre: '',
    edad: '',
    tipoPropiedad: 'casa',
    ubicacion: 'urbana',
    historialReclamaciones: '0',
    metrosCuadrados: ''
  });

  const [cotizaciones, setCotizaciones] = useState([]);
  const [errores, setErrores] = useState({});
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [mostrarFormulario, setMostrarFormulario] = useState(true);
  const [coberturaSeleccionada, setCoberturaSeleccionada] = useState(null);
  const [mostrarModalConfirmacion, setMostrarModalConfirmacion] = useState(false);
  const [cotizacionActualId, setCotizacionActualId] = useState(null); // ✅ Nuevo estado

  const historialContext = useContext(HistorialContext);
  // 
  useEffect(() => {
    console.log('🔄 useCotizacion inicializado - Reseteando estados');
    // me aseguro de que el formulario se muestre al cargar
    setMostrarFormulario(true);
    setMostrarResultados(false);
    setCargando(false);
    setCoberturaSeleccionada(null);
    setMostrarModalConfirmacion(false);
  }, []); 

  const actualizarDatos = (nuevosDatos) => {
    setDatosUsuario(prev => ({ ...prev, ...nuevosDatos }));
  };

  const calcularCotizacion = () => {
    setCargando(true);
    setMostrarResultados(false);
    setMostrarFormulario(false);
    setCotizacionActualId(null); 
    
    setTimeout(() => {
      try {
        const resultados = calcularTodasCoberturas(datosUsuario);
        setCotizaciones(resultados);
        setMostrarResultados(true);
      } catch (error) {
        console.error('Error calculando cotizaciones:', error);
        setErrores({ general: 'Error al calcular las cotizaciones' });
        setMostrarFormulario(true);
      } finally {
        setCargando(false);
      }
    }, 1500);
  };

  const seleccionarCobertura = (cobertura) => {
    console.log('🎯 Seleccionando cobertura:', cobertura);
    setCoberturaSeleccionada(cobertura);
    
    //Guarda el historial solo si es una nueva selección
    if (historialContext && historialContext.agregarAlHistorial) {
      // Si ya hay una cotización actual, actualiza en lugar de crear una nueva
      if (cotizacionActualId) {
        console.log('🔄 Actualizando cotización existente en historial');
        // Primero elimino la anterior
        historialContext.eliminarDelHistorial(cotizacionActualId);
      }
      
      //console.log(' Guardando en historial...');
      const historialId = historialContext.agregarAlHistorial(datosUsuario, cotizaciones, cobertura);
      setCotizacionActualId(historialId); 
      console.log('✅ Guardado en historial con ID:', historialId);
    } else {
      console.warn('⚠️ Contexto de historial no disponible');
    }
    
    setMostrarModalConfirmacion(true);
  };

  const confirmarSeleccion = () => {
    setMostrarModalConfirmacion(false);
    // La cotización ya está guardada, listo no hacer nada más
  };

  const cancelarSeleccion = () => {
    setMostrarModalConfirmacion(false);
    setCoberturaSeleccionada(null);
    
    // si se cancela, elimino la cotización del historial si se había guardado
    if (cotizacionActualId && historialContext) {
      historialContext.eliminarDelHistorial(cotizacionActualId);
      setCotizacionActualId(null);
    }
  };

  const reiniciarCotizacion = () => {
    setDatosUsuario({
      nombre: '',
      edad: '',
      tipoPropiedad: 'casa',
      ubicacion: 'urbana',
      historialReclamaciones: '0',
      metrosCuadrados: ''
    });
    setCotizaciones([]);
    setErrores({});
    setMostrarResultados(false);
    setMostrarFormulario(true);
    setCoberturaSeleccionada(null);
    setMostrarModalConfirmacion(false);
    setCotizacionActualId(null); //
  };

  const editarDatos = () => {
    setMostrarFormulario(true);
    setMostrarResultados(false);
  };

  const cargarCotizacionDesdeHistorial = (cotizacionGuardada) => {
    console.log('🔄 Cargando desde historial:', cotizacionGuardada);
    setDatosUsuario(cotizacionGuardada.datosUsuario);
    setCotizaciones(cotizacionGuardada.cotizaciones);
    setMostrarFormulario(false);
    setMostrarResultados(true);
    setCotizacionActualId(cotizacionGuardada.id); 
    
    if (cotizacionGuardada.coberturaSeleccionada) {
      setCoberturaSeleccionada(cotizacionGuardada.coberturaSeleccionada);
    }
  };

  return {
    datosUsuario,
    actualizarDatos,
    cotizaciones,
    errores,
    mostrarResultados,
    mostrarFormulario,
    cargando,
    coberturaSeleccionada,
    mostrarModalConfirmacion,
    cotizacionActualId, 
    calcularCotizacion,
    reiniciarCotizacion,
    editarDatos,
    seleccionarCobertura,
    confirmarSeleccion,
    cancelarSeleccion,
    cargarCotizacionDesdeHistorial,
    formatearPrecio
  };
};