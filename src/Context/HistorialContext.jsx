import React, { createContext, useContext, useState, useEffect } from 'react';

export const HistorialContext = createContext();

export const useHistorialContext = () => {
  const context = useContext(HistorialContext);
  if (!context) {
    throw new Error('useHistorialContext debe ser usado dentro de HistorialProvider');
  }
  return context;
};

export const HistorialProvider = ({ children }) => {
  const [historial, setHistorial] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false); // ✅ Nuevo estado para controlar carga

  // Cargar historial desde localStorage al inicializar - SOLO UNA VEZ
  useEffect(() => {
    console.log('🔄 Cargando historial desde localStorage...');
    const historialGuardado = localStorage.getItem('historialCotizaciones');
    
    if (historialGuardado) {
      try {
        const historialParseado = JSON.parse(historialGuardado);
        console.log('📂 Historial cargado:', historialParseado);
        setHistorial(historialParseado);
      } catch (error) {
        console.error('❌ Error cargando historial:', error);
        setHistorial([]);
      }
    } else {
      console.log('📂 No hay historial guardado en localStorage');
    }
    
    setIsLoaded(true); // ✅ Marcar como cargado
  }, []); // ✅ Array de dependencias vacío = se ejecuta solo una vez

  // Guardar en localStorage cuando cambie el historial - PERO SOLO SI YA SE CARGÓ
  useEffect(() => {
    if (isLoaded) { // ✅ Solo guardar si ya cargamos los datos iniciales
      try {
        console.log('💾 Guardando historial en localStorage:', historial);
        localStorage.setItem('historialCotizaciones', JSON.stringify(historial));
      } catch (error) {
        console.error('❌ Error guardando historial:', error);
      }
    }
  }, [historial, isLoaded]); // ✅ Depende de historial Y de isLoaded

  const agregarAlHistorial = (datosUsuario, cotizaciones, coberturaSeleccionada) => {
    console.log('🔵 Agregando al historial...');
    
    const nuevaCotizacion = {
      id: Date.now().toString(),
      fecha: new Date().toLocaleString('es-ES'),
      datosUsuario: { ...datosUsuario },
      cotizaciones: cotizaciones.map(cot => ({
        id: cot.id,
        nombre: cot.nombre,
        precioFinal: Number(cot.precioFinal),
        precioBase: Number(cot.precioBase),
        descripcion: cot.descripcion,
        coberturasIncluidas: [...cot.coberturasIncluidas],
        icono: cot.icono,
        color: cot.color
      })),
      coberturaSeleccionada: coberturaSeleccionada ? {
        id: coberturaSeleccionada.id,
        nombre: coberturaSeleccionada.nombre,
        precioFinal: Number(coberturaSeleccionada.precioFinal),
        descripcion: coberturaSeleccionada.descripcion,
        icono: coberturaSeleccionada.icono,
        color: coberturaSeleccionada.color
      } : null
    };

    console.log('🟢 Nueva cotización:', nuevaCotizacion);
    
    setHistorial(prev => {
      const nuevoHistorial = [nuevaCotizacion, ...prev];
      console.log('📊 Historial actualizado:', nuevoHistorial);
      return nuevoHistorial;
    });
    
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

  const value = {
    historial,
    agregarAlHistorial,
    eliminarDelHistorial,
    limpiarHistorial,
    obtenerCotizacionPorId
  };

  return (
    <HistorialContext.Provider value={value}>
      {children}
    </HistorialContext.Provider>
  );
};