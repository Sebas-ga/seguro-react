import { FACTORES_AJUSTE,COBERTURAS } from '../data/coberturasData';

export const calcularPrima = (datosUsuario, precioBase) => {
  let prima = precioBase;
  
  // Factor por edad
  const edad = parseInt(datosUsuario.edad);
  if (edad >= 18 && edad <= 24) {
    prima *= FACTORES_AJUSTE.edad.joven;
  } else if (edad >= 61) {
    prima *= FACTORES_AJUSTE.edad.mayor;
  }
  
  // Factor por tipo de propiedad
  prima *= FACTORES_AJUSTE.tipoPropiedad[datosUsuario.tipoPropiedad];
  
  // Factor por ubicación
  prima *= FACTORES_AJUSTE.ubicacion[datosUsuario.ubicacion];
  
  // Factor por historial de reclamaciones
  const reclamaciones = parseInt(datosUsuario.historialReclamaciones);
  if (reclamaciones === 0) {
    prima *= FACTORES_AJUSTE.historialReclamaciones[0];
  } else if (reclamaciones === 1) {
    prima *= FACTORES_AJUSTE.historialReclamaciones[1];
  } else if (reclamaciones === 2) {
    prima *= FACTORES_AJUSTE.historialReclamaciones[2];
  } else {
    prima *= FACTORES_AJUSTE.historialReclamaciones["3+"];
  }
  
  // Factor por metros cuadrados
  const metros = parseInt(datosUsuario.metrosCuadrados) || 0;
  prima += metros * FACTORES_AJUSTE.metrosCuadrados.factor;
  
  return Math.round(prima * 100) / 100; // Redondear a 2 decimales
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