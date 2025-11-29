import { FACTORES_AJUSTE,COBERTURAS } from '../data/coberturasData';

export const calcularPrima = (datosUsuario, precioBase) => {
    let prima = precioBase;
 
  const edad = parseInt(datosUsuario.edad);
  const tipoPropiedad = datosUsuario.tipoPropiedad;
  const ubicacion = datosUsuario.ubicacion;
  const reclamaciones = parseInt(datosUsuario.historialReclamaciones);
  const metros = parseInt(datosUsuario.metrosCuadrados) || 0;

  
  // por edad
 
  if (edad >= 18 && edad <= 24) {
    prima *= FACTORES_AJUSTE.edad.joven;
  } else if (edad >= 61) {
    prima *= FACTORES_AJUSTE.edad.mayor;
     console.log('📝 DATOS PROCESADOS:', { edad, tipoPropiedad, ubicacion, reclamaciones, metros }); // 
  }
  
  // por tipo de propiedad
  prima *= FACTORES_AJUSTE.tipoPropiedad[datosUsuario.tipoPropiedad];
  
  // por ubicación
  prima *= FACTORES_AJUSTE.ubicacion[datosUsuario.ubicacion];
  
  // por reclamaciones
  
  if (reclamaciones === 0) {
    prima *= FACTORES_AJUSTE.historialReclamaciones[0];
  } else if (reclamaciones === 1) {
    prima *= FACTORES_AJUSTE.historialReclamaciones[1];
  } else if (reclamaciones === 2) {
    prima *= FACTORES_AJUSTE.historialReclamaciones[2];
  } else {
    prima *= FACTORES_AJUSTE.historialReclamaciones["3+"];
  }
  
  // por m2
  
  prima += metros * FACTORES_AJUSTE.metrosCuadrados.factor;
  
  return Math.round(prima * 100) / 100; 
};

export const calcularTodasCoberturas = (datosUsuario) => {
  
  return COBERTURAS.map(cobertura => ({
    ...cobertura,
    precioFinal: calcularPrima(datosUsuario, cobertura.precioBase),
    precioBase: cobertura.precioBase
  }));
};

export const formatearPrecio = (precio) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS'
  }).format(precio);
};