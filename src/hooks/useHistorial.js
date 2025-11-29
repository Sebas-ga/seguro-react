import { useState, useEffect } from 'react';

export const useHistorial = () => {
  const [historial, setHistorial] = useState([]);

  // Carga historial desde localStorage 
  useEffect(() => {
    const historialGuardado = localStorage.getItem('historialCotizaciones');
    if (historialGuardado) {
      try {
        setHistorial(JSON.parse(historialGuardado));
      } catch (error) {
        console.error('Error cargando historial:', error);
        setHistorial([]);
      }
    }
  }, []);

  // Guarda en localStorage cuando cambie el historial
  useEffect(() => {
    try {
      localStorage.setItem('historialCotizaciones', JSON.stringify(historial));
    } catch (error) {
      console.error('Error guardando historial:', error);
    }
  }, [historial]);

  const agregarAlHistorial = (datosUsuario, cotizaciones, coberturaSeleccionada) => {
    const nuevaCotizacion = {
      id: Date.now().toString(),
      fecha: new Date().toLocaleString('es-ES'),
      datosUsuario: { ...datosUsuario },
      cotizaciones: cotizaciones.map(cot => ({
        ...cot,
        precioFinal: Number(cot.precioFinal),
        precioBase: Number(cot.precioBase)
      })),
      coberturaSeleccionada: coberturaSeleccionada ? {
        ...coberturaSeleccionada,
        precioFinal: Number(coberturaSeleccionada.precioFinal)
      } : null
    };

    setHistorial(prev => [nuevaCotizacion, ...prev]);
    return nuevaCotizacion.id;
  };

  const eliminarDelHistorial = (id) => {
    setHistorial(prev => prev.filter(item => item.id !== id));
  };

  const limpiarHistorial = () => {
    setHistorial([]);
  };

  const obtenerCotizacionPorId = (id) => {
    return historial.find(item => item.id === id);
  };

  return {
    historial,
    agregarAlHistorial,
    eliminarDelHistorial,
    limpiarHistorial,
    obtenerCotizacionPorId
  };
};